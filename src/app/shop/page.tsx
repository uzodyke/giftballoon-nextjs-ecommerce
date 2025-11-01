'use client'

import { useState } from 'react'
import { Plus, Heart, Star, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'

export default function ShopPage() {
  const { addItem } = useCart()
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState(products[0])
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


  const getPrice = () => {
    return selectedProduct.price
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
      id: `${selectedProduct.id}-${Date.now()}`,
      name: selectedProduct.name,
      price: finalPrice,
      quantity,
      image: selectedProduct.image,
      selectedOptions: {
        message: customMessage,
        occasion: selectedOccasion
      }
    })

    alert(`Added ${selectedProduct.name} to cart! 🎈`)
  }

  const handleBuyNow = () => {
    if (!validateForm()) return

    // Add to cart
    const finalPrice = getPrice()
    addItem({
      id: `${selectedProduct.id}-${Date.now()}`,
      name: selectedProduct.name,
      price: finalPrice,
      quantity,
      image: selectedProduct.image,
      selectedOptions: {
        message: customMessage,
        occasion: selectedOccasion
      }
    })

    // Redirect to checkout
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Personalized Balloon Collection
          </h1>
          <p className="text-xl text-gray-600">
            Choose your balloon, add a custom message, and select delivery options
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Balloon Selection Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Balloon</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedProduct.id === product.id
                      ? 'ring-4 ring-pink-500 shadow-lg scale-105'
                      : 'shadow-md hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <div className="aspect-square relative bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedProduct.id === product.id && (
                      <div className="absolute inset-0 bg-pink-200 bg-opacity-20 flex items-center justify-center">
                        <div className="bg-white text-pink-600 rounded-full p-2 shadow-xl border-2 border-pink-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-white">
                    <h3 className="font-semibold text-sm text-gray-900 text-center truncate">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-pink-600 text-center">
                      £{product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customization Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Customize Your Order</h2>

              {/* Selected Product Display */}
              <div className="mb-6 p-4 bg-pink-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedProduct.name}</h3>
                    <p className="text-pink-600 font-bold">£{getPrice().toFixed(2)}</p>
                  </div>
                </div>
              </div>

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
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now
                  </button>
                </div>

                {/* Features */}
                <div className="text-sm text-gray-600 space-y-1 pt-4 border-t">
                  <p>✓ Professional vinyl lettering included</p>
                  <p>✓ Helium filling & decorative ribbon</p>
                  <p>✓ UK-wide delivery available</p>
                  <p>✓ 5-7 day float time guarantee</p>
                </div>

                {/* Payment Methods */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Payment Methods</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>💳 Cards</span>
                    <span>📱 Apple Pay</span>
                    <span>🔐 Google Pay</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Secured by Stripe • SSL Encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}