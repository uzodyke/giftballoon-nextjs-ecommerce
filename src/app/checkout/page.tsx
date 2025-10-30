'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise, stripeConfig, calculateOrderTotal } from '@/lib/stripe'
import { useCart } from '@/context/CartContext'
import CheckoutForm from '@/components/CheckoutForm'
import { Loader2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, getTotalPrice } = useCart()
  const [clientSecret, setClientSecret] = useState('')
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const subtotal = getTotalPrice()
  const { deliveryFee, total } = calculateOrderTotal(subtotal)

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      router.push('/cart')
      return
    }

    // Create payment intent
    const createPaymentIntent = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total,
            currency: 'gbp',
            orderDetails: {
              items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                selectedOptions: item.selectedOptions
              })),
              subtotal,
              deliveryFee,
              total
            }
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create payment intent')
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
        setOrderId(data.orderId)
      } catch (err) {
        console.error('Payment intent creation error:', err)
        setError(err instanceof Error ? err.message : 'Failed to initialize payment')
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [cartItems, total, subtotal, deliveryFee, router])

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link
              href="/shop"
              className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-pink-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Preparing your checkout...
            </h2>
            <p className="text-gray-600">Please wait while we set up your payment.</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Checkout Error
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/cart"
                className="border-2 border-pink-600 text-pink-600 px-6 py-2 rounded-lg hover:bg-pink-600 hover:text-white transition-colors"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order securely with Stripe</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                      <div className="text-sm text-gray-600">
                        {Object.entries(item.selectedOptions).map(([key, value]) =>
                          value && (
                            <span key={key} className="mr-3">
                              {key}: {value}
                            </span>
                          )
                        )}
                      </div>
                    )}
                    <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium text-gray-900">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    `£${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900 border-t pt-2">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>

            {orderId && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  Order ID: <span className="font-mono font-medium">{orderId}</span>
                </div>
              </div>
            )}
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>

            {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: stripeConfig.appearance,
                  locale: stripeConfig.locale,
                }}
              >
                <CheckoutForm
                  clientSecret={clientSecret}
                  orderId={orderId}
                  total={total}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}