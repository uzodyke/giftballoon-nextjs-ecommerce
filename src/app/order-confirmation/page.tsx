'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Clock, Mail, Phone, Truck } from 'lucide-react'
import type { Order } from '@/lib/types'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const clientSecret = searchParams.get('payment_intent_client_secret')

  const [order, setOrder] = useState<Order | null>(null)

  const estimatedDelivery = '3-5 business days'

  useEffect(() => {
    if (!orderId || !clientSecret) return

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `/api/orders/${encodeURIComponent(orderId)}?cs=${encodeURIComponent(clientSecret)}`
        )
        if (res.ok) {
          setOrder(await res.json())
        }
      } catch (err) {
        console.error('Failed to load order:', err)
      }
    }

    fetchOrder()
  }, [orderId, clientSecret])

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn't find your order. Please check your email for confirmation details.
            </p>
            <Link
              href="/shop"
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <p className="text-lg text-gray-600">
            Order #<span className="font-mono font-semibold">{orderId}</span>
          </p>
        </div>

        {/* Order Summary + Delivery */}
        {order && order.items && order.items.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {order.items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} <span className="text-gray-500">× {item.quantity}</span>
                  </span>
                  <span className="font-medium text-gray-900">
                    £{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>£{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : `£${order.deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-gray-900 border-t pt-2">
                <span>Total</span>
                <span>£{order.total.toFixed(2)}</span>
              </div>
            </div>

            {order.deliveryAddress && order.deliveryAddress.line1 && (
              <div className="border-t mt-4 pt-4">
                <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4" />
                  Delivering to
                </h4>
                <address className="text-sm text-gray-600 not-italic leading-relaxed">
                  {order.customer?.name && <div>{order.customer.name}</div>}
                  <div>{order.deliveryAddress.line1}</div>
                  {order.deliveryAddress.line2 && <div>{order.deliveryAddress.line2}</div>}
                  <div>
                    {order.deliveryAddress.city}, {order.deliveryAddress.postal_code}
                  </div>
                </address>
              </div>
            )}
          </div>
        )}

        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Processing</h3>
              <p className="text-sm text-gray-600">Your order is being prepared</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Delivery</h3>
              <p className="text-sm text-gray-600">{estimatedDelivery}</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Confirmed</h3>
              <p className="text-sm text-gray-600">Payment processed successfully</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-pink-600 text-sm font-semibold">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Confirmation</p>
                  <p className="text-sm text-gray-600">You'll receive an email confirmation with your order details</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-pink-600 text-sm font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Preparation</p>
                  <p className="text-sm text-gray-600">Our team will prepare your balloon arrangement with care</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-pink-600 text-sm font-semibold">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Delivery</p>
                  <p className="text-sm text-gray-600">Your order will be delivered within {estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-pink-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-600">tigrexmove@gmail.com</p>
                <p className="text-xs text-gray-500">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-pink-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Phone Support</p>
                <p className="text-sm text-gray-600">07459665002</p>
                <p className="text-xs text-gray-500">Mon-Sat 9AM-6PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-center"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="border-2 border-pink-600 text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 hover:text-white transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>

        {/* Order Details Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Questions about your order? Reference your order number:{' '}
            <span className="font-mono font-semibold text-gray-700">{orderId}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading Order Details...</h1>
            <p className="text-gray-600">Please wait while we retrieve your order information.</p>
          </div>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}