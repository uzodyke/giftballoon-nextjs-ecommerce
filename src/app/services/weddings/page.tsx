import Link from 'next/link'
import { Heart, Star, Gift, Camera, Phone, Mail } from 'lucide-react'

export default function WeddingsPage() {
  const weddingPackages = [
    {
      name: 'Romantic Elegance',
      price: '£89',
      description: 'Perfect for intimate ceremonies',
      features: [
        'Heart-shaped balloon bouquet',
        'Custom color matching',
        'Satin ribbons & weights',
        'Venue delivery included'
      ]
    },
    {
      name: 'Grand Celebration',
      price: '£149',
      description: 'For larger wedding celebrations',
      features: [
        'Premium balloon arch',
        'Table centerpieces',
        'Photo backdrop balloons',
        'Bridal party accessories',
        'Setup & styling service'
      ]
    },
    {
      name: 'Custom Wedding',
      price: 'From £199',
      description: 'Completely bespoke arrangements',
      features: [
        'Personal consultation',
        'Unlimited color options',
        'Custom shapes & sizes',
        'Full venue decoration',
        'Professional installation'
      ]
    }
  ]

  const testimonials = [
    {
      name: 'Sarah & James',
      text: 'The balloon arrangements made our wedding day absolutely magical. Every detail was perfect!',
      rating: 5
    },
    {
      name: 'Emma & David',
      text: 'Professional service from start to finish. Our guests are still talking about the beautiful displays.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Wedding Balloon Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100 max-w-3xl mx-auto">
              Create magical moments with our romantic balloon arrangements.
              From intimate ceremonies to grand celebrations, we make your special day unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop?category=weddings"
                className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
              >
                Shop Wedding Balloons
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
              >
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wedding Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our curated packages or create something completely unique for your special day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weddingPackages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-pink-600 mb-2">{pkg.price}</div>
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 text-pink-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-center block"
                  >
                    Get This Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Wedding Service?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Romantic Designs',
                description: 'Specially crafted arrangements that capture the romance of your special day'
              },
              {
                icon: Star,
                title: 'Premium Quality',
                description: 'Only the finest balloons and materials for your wedding celebration'
              },
              {
                icon: Gift,
                title: 'Custom Colors',
                description: 'Perfect color matching to complement your wedding theme and palette'
              },
              {
                icon: Camera,
                title: 'Photo Ready',
                description: 'Stunning displays that create perfect backdrops for your wedding photos'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Happy Couples
            </h2>
            <p className="text-xl text-gray-600">
              Hear from couples who made their day special with our balloon arrangements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Plan Your Perfect Day?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Let's discuss your vision and create something magical together.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>07459665002</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@giftballoon.com</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/shop"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}