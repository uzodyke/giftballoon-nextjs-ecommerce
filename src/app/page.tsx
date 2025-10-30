import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, Gift, MapPin } from 'lucide-react'
import { products } from '@/data/products'

export default function Home() {
  // Featured products for hero section
  const featuredProducts = [
    products.find(p => p.id === 'luxury-stuffed-balloons'),
    products.find(p => p.id === 'golden-treasure-balloon')
  ].filter(Boolean)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Personalised Love
                <span className="text-pink-600"> Balloon Bouquet</span>
              </h1>
              <p className="text-xl text-gray-700 mb-4">
                From £25
              </p>
              <p className="text-lg text-gray-600 mb-8">
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
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <Image
                  src="/images/love-bouquet-30.jpg"
                  alt="Personalised Love Balloon Bouquet"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
                <p className="text-gray-700">Beautiful balloon arrangements coming soon!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-pink-600 mb-4">£{product.price.toFixed(2)}</p>
                  <Link
                    href={`/product/${product.id}`}
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalised Balloon Collection Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Personalised Balloon Collection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-xl font-bold text-pink-600 mb-3">£{product.price.toFixed(2)}</p>
                  <Link
                    href={`/product/${product.id}`}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors inline-block text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              View All Products
            </Link>
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