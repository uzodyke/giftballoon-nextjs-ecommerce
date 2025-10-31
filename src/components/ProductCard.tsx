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
    balloonType?: string
    customMessage?: string
    deliveryDate?: string
  }>({})
  const [quantity, setQuantity] = useState(1)

  // Calculate total price including options
  const getPrice = () => {
    let totalPrice = product.price

    // Add balloon type pricing if available
    if (selectedOptions.balloonType && product.options?.styles) {
      const balloonOption = product.options.styles.find(s => s.name === selectedOptions.balloonType)
      if (balloonOption) totalPrice += balloonOption.price
    }

    return totalPrice
  }

  const handleAddToCart = () => {
    // Validate required fields
    if (!selectedOptions.balloonType && product.options?.styles) {
      alert('Please select a balloon type')
      return
    }
    if (!selectedOptions.deliveryDate) {
      alert('Please select a delivery date')
      return
    }

    const finalPrice = getPrice()
    addItem({
      id: `${product.id}-${JSON.stringify(selectedOptions)}`,
      name: product.name,
      price: finalPrice,
      quantity,
      image: product.image,
      selectedOptions
    })

    // Show success message
    alert(`Added ${product.name} to cart! 🎈`)

    // Reset form
    setQuantity(1)
    setSelectedOptions({})
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100">
      {/* Product Image */}
      <div className="aspect-square relative">
        <img
          src={product.image}
          alt={product.name}
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

        {/* Customization Options */}
        <div className="space-y-3 mb-4">
          {/* Balloon Type */}
          {product.options?.styles && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Balloon Type
              </label>
              <select
                value={selectedOptions.balloonType || ''}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, balloonType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">Select Balloon Type</option>
                {product.options.styles.map((style) => (
                  <option key={style.name} value={style.name}>
                    {style.name} {style.price > 0 && `(+£${style.price.toFixed(2)})`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Custom Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom Message <span className="text-gray-500">(30 chars max)</span>
            </label>
            <input
              type="text"
              maxLength={30}
              placeholder="Enter your custom message..."
              value={selectedOptions.customMessage || ''}
              onChange={(e) => setSelectedOptions(prev => ({ ...prev, customMessage: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            <div className="text-xs text-gray-500 mt-1">
              {(selectedOptions.customMessage || '').length}/30 characters
            </div>
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Date
            </label>
            <input
              type="date"
              min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              value={selectedOptions.deliveryDate || ''}
              onChange={(e) => setSelectedOptions(prev => ({ ...prev, deliveryDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                -
              </button>
              <span className="text-lg font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
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
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
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