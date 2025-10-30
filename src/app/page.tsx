import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, Gift, MapPin } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Create Magical
                <span className="text-pink-600"> Moments</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Beautiful balloon arrangements for every celebration. From intimate gatherings to grand events, we bring your vision to life with stunning balloon displays.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-center"
                >
                  Shop Now
                </Link>
                <Link
                  href="/services"
                  className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-600 hover:text-white transition-colors text-center"
                >
                  Our Services
                </Link>
              </div>
              <div className="flex items-center mt-8 space-x-6">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.9/5 Rating</span>
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">1000+</span> Happy Customers
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-pink-200 rounded-2xl shadow-2xl p-8 text-center">
                <div className="text-6xl mb-4">🎈</div>
                <p className="text-gray-700">Beautiful balloon arrangements coming soon!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GiftBalloon?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about creating unforgettable experiences through beautiful balloon decorations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the highest quality balloons and materials to ensure your decorations look stunning and last longer.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Designs</h3>
              <p className="text-gray-600">
                Every event is unique. We create personalized balloon arrangements that perfectly match your style and theme.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nationwide Delivery</h3>
              <p className="text-gray-600">
                We deliver across the UK, bringing beautiful balloon arrangements directly to your event location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-xl text-gray-600">
              From intimate celebrations to grand events, we have the perfect balloon arrangements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Weddings', emoji: '💒', href: '/services/weddings' },
              { name: 'Birthdays', emoji: '🎂', href: '/services/birthdays' },
              { name: 'Corporate Events', emoji: '🏢', href: '/services/corporate-events' },
              { name: 'Graduations', emoji: '🎓', href: '/services/graduations' }
            ].map((service) => (
              <Link key={service.name} href={service.href} className="group">
                <div className="relative overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-shadow bg-white p-8 text-center">
                  <div className="text-6xl mb-4">{service.emoji}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Browse our collection of beautiful balloon arrangements or contact us for a custom design consultation.
          </p>
          <Link
            href="/shop"
            className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  )
}