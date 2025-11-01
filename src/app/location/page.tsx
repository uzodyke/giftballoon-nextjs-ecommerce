import { MapPin, Clock, Phone, Mail } from 'lucide-react'

export default function Location() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Our Location
          </h1>
          <p className="text-xl text-center text-pink-100">
            Visit us or let us deliver to you
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Location Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Find Us</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-pink-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    GiftBalloon Studio<br />
                    London, UK
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-pink-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">07459665002</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-pink-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@giftballoon.co.uk</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-pink-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Hours</h3>
                  <div className="text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Delivery Areas</h2>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">We Deliver Throughout London</h3>
              <p className="text-gray-600 mb-4">
                We offer delivery services across London and surrounding areas. Same-day delivery available for orders placed before 2 PM.
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900">Free Delivery Zones:</h4>
                  <p className="text-gray-600">Central London, Zone 1-2</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Standard Delivery (£5):</h4>
                  <p className="text-gray-600">Zone 3-4, Greater London</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Extended Delivery (£10):</h4>
                  <p className="text-gray-600">Zone 5-6, Outer London</p>
                </div>
              </div>
            </div>

            <div className="bg-pink-50 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Special Arrangements</h3>
              <p className="text-gray-600">
                Need delivery outside our standard areas? Contact us at 07459665002 and we'll work out a special arrangement for your event.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}