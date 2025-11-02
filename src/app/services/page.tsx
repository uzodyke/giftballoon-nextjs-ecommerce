import Link from 'next/link'
import { Heart, Building2, Calendar, Sparkles } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      name: 'Wedding Balloons',
      description: 'Romantic balloon arrangements for your special day',
      icon: Heart,
      href: '/shop?category=weddings',
      features: ['Custom color matching', 'Venue decoration', 'Bridal bouquet alternatives']
    },
    {
      name: 'Corporate Events',
      description: 'Professional balloon displays for business occasions',
      icon: Building2,
      href: '/shop?category=corporate',
      features: ['Brand color matching', 'Logo balloons', 'Office celebrations']
    },
    {
      name: 'Birthday Parties',
      description: 'Fun and festive balloons for birthday celebrations',
      icon: Calendar,
      href: '/shop?category=birthdays',
      features: ['Age-specific designs', 'Number balloons', 'Theme packages']
    },
    {
      name: 'Special Occasions',
      description: 'Balloons for all life\'s memorable moments',
      icon: Sparkles,
      href: '/shop',
      features: ['Anniversary celebrations', 'Graduation parties', 'Holiday decorations']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional balloon arrangements for every occasion. From intimate celebrations to grand events,
            we create memorable experiences with our premium balloon decorations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-pink-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">{service.name}</h3>
                  </div>

                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-pink-600 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="inline-flex items-center bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                  >
                    Shop {service.name}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Need Something Custom?
          </h2>
          <p className="text-gray-600 mb-6">
            Have a unique event or special requirements? We offer custom balloon arrangements
            tailored to your specific needs and vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
            >
              Contact Us
            </Link>
            <Link
              href="/shop"
              className="border-2 border-pink-600 text-pink-600 px-8 py-3 rounded-lg hover:bg-pink-600 hover:text-white transition-colors font-medium"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}