'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Star, Plus } from 'lucide-react'
import { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import ImageZoom from './ImageZoom'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [selectedOptions, setSelectedOptions] = useState<{
    style?: string
    size?: string
    color?: string
  }>({})
  const [quantity, setQuantity] = useState(1)

  // Calculate total price including options
  const getPrice = () => {
    let totalPrice = product.price

    if (selectedOptions.style && product.options?.styles) {
      const styleOption = product.options.styles.find(s => s.name === selectedOptions.style)
      if (styleOption) totalPrice += styleOption.price
    }

    if (selectedOptions.size && product.options?.sizes) {
      const sizeOption = product.options.sizes.find(s => s.name === selectedOptions.size)
      if (sizeOption) totalPrice += sizeOption.price
    }

    if (selectedOptions.color && product.options?.colors) {
      const colorOption = product.options.colors.find(c => c.name === selectedOptions.color)
      if (colorOption) totalPrice += colorOption.price
    }

    return totalPrice
  }

  const handleAddToCart = () => {
    const finalPrice = getPrice()
    addItem({
      id: `${product.id}-${JSON.stringify(selectedOptions)}`,
      name: product.name,
      price: finalPrice,
      quantity,
      image: product.image,
      selectedOptions
    })

    // Reset form
    setQuantity(1)
    setSelectedOptions({})
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Product Image with Zoom */}
      <div className="relative h-64 bg-gray-100">
        <ImageZoom
          src={product.image}
          alt={product.name}
          width={400}
          height={256}
          className="w-full h-full object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <span className="text-sm bg-pink-100 text-pink-600 px-2 py-1 rounded-lg ml-2">
            {product.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Product Options */}
        <div className="space-y-3 mb-4">
          {/* Style Options */}
          {product.options?.styles && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Style
              </label>
              <select
                value={selectedOptions.style || ''}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, style: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">Select Style</option>
                {product.options.styles.map((style) => (
                  <option key={style.name} value={style.name}>
                    {style.name} {style.price > 0 && `(+£${style.price.toFixed(2)})`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Size Options */}
          {product.options?.sizes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <select
                value={selectedOptions.size || ''}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, size: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">Select Size</option>
                {product.options.sizes.map((size) => (
                  <option key={size.name} value={size.name}>
                    {size.name} {size.price > 0 && `(+£${size.price.toFixed(2)})`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Color Options */}
          {product.options?.colors && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <select
                value={selectedOptions.color || ''}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, color: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">Select Color</option>
                {product.options.colors.map((color) => (
                  <option key={color.name} value={color.name}>
                    {color.name} {color.price > 0 && `(+£${color.price.toFixed(2)})`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              £{getPrice().toFixed(2)}
            </span>
            {quantity > 1 && (
              <span className="text-sm text-gray-500 ml-2">
                (£{(getPrice() * quantity).toFixed(2)} total)
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>

        {/* View Details Link */}
        <Link
          href={`/product/${product.id}`}
          className="block mt-3 text-center text-pink-600 hover:text-pink-700 font-medium text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}