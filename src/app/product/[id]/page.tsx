'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, Plus, ArrowLeft, Heart, Share2, ShoppingCart } from 'lucide-react'
import { getProductById } from '@/data/products'
import { useCart } from '@/context/CartContext'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const productId = params.id as string

  const product = getProductById(productId)

  const [selectedOptions, setSelectedOptions] = useState<{
    message?: string
    occasion?: string
  }>({})
  const [customMessage, setCustomMessage] = useState('')
  const [selectedOccasion, setSelectedOccasion] = useState('')
  const [quantity, setQuantity] = useState(1)

  const occasions = [
    'Birthday',
    'Anniversary',
    'Wedding',
    'Valentine\'s Day',
    'Mother\'s Day',
    'Father\'s Day',
    'Graduation',
    'New Baby',
    'Get Well Soon',
    'Congratulations',
    'Thank You',
    'Just Because',
    'Corporate Event',
    'Grand Opening',
    'Retirement',
    'Promotion',
    'Other'
  ]


  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Link
              href="/shop"
              className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors inline-block"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Calculate total price including options
  const getPrice = () => {
    return product.price
  }

  const validateForm = () => {
    if (!selectedOccasion) {
      alert('Please select an occasion')
      return false
    }
    return true
  }

  const handleAddToCart = () => {
    if (!validateForm()) return

    const finalPrice = getPrice()
    addItem({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: finalPrice,
      quantity,
      image: product.image,
      selectedOptions: {
        message: customMessage,
        occasion: selectedOccasion
      }
    })

    alert(`Added ${product.name} to cart! 🎈`)
  }

  const handleBuyNow = () => {
    if (!validateForm()) return

    // Add to cart
    const finalPrice = getPrice()
    addItem({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: finalPrice,
      quantity,
      image: product.image,
      selectedOptions: {
        message: customMessage,
        occasion: selectedOccasion
      }
    })

    // Redirect to checkout
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
              />
            </div>

            {/* Additional images if available */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                    In Stock
                  </span>
                ) : (
                  <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.9/5 from 127 reviews)</span>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div>
              <span className="text-4xl font-bold text-gray-900">
                £{getPrice().toFixed(2)}
              </span>
              {quantity > 1 && (
                <span className="text-lg text-gray-500 ml-3">
                  (£{(getPrice() * quantity).toFixed(2)} total)
                </span>
              )}
            </div>

            {/* Product Options */}
            <div className="space-y-4">

              {/* Occasion Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's this for? *
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Select an occasion</option>
                  {occasions.map((occasion) => (
                    <option key={occasion} value={occasion}>{occasion}</option>
                  ))}
                </select>
              </div>

              {/* Custom Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Message <span className="text-gray-500">(30 chars max)</span>
                </label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="Enter your message..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {customMessage.length}/30 characters
                </div>
              </div>


              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-pink-600">£{(getPrice() * quantity).toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </button>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Link
                  href="/cart"
                  className="border-2 border-pink-600 text-pink-600 py-3 rounded-lg font-semibold hover:bg-pink-600 hover:text-white transition-colors text-center"
                >
                  View Cart
                </Link>
                <Link
                  href="/shop"
                  className="border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-4">
              <div className="text-sm text-gray-600">
                <p><strong>Free delivery</strong> on orders over £50</p>
                <p><strong>Same day delivery</strong> available in London</p>
                <p><strong>Custom arrangements</strong> available on request</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}