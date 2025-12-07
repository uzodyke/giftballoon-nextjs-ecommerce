import Link from 'next/link'
import { Building2, Users, Award, Briefcase, Phone, Mail, Star, TrendingUp } from 'lucide-react'

export default function CorporateEventsPage() {
  const corporatePackages = [
    {
      name: 'Office Celebration',
      price: '£75',
      description: 'Perfect for team achievements and milestones',
      features: [
        'Company color branding',
        'Professional balloon displays',
        'Achievement banners',
        'Setup in office space'
      ]
    },
    {
      name: 'Conference & Launch',
      price: '£199',
      description: 'For product launches and major events',
      features: [
        'Large-scale installations',
        'Brand logo integration',
        'Welcome displays',
        'Photo opportunities',
        'Professional styling team'
      ]
    },
    {
      name: 'Enterprise Solution',
      price: 'From £299',
      description: 'Complete event management',
      features: [
        'Multi-location setup',
        'Custom brand balloons',
        'Event planning consultation',
        'Full venue transformation',
        'Dedicated project manager'
      ]
    }
  ]

  const eventTypes = [
    {
      icon: Award,
      title: 'Company Achievements',
      description: 'Celebrate milestones, awards, and business successes',
      examples: ['Award ceremonies', 'Goal achievements', 'Anniversary celebrations', 'IPO launches']
    },
    {
      icon: Users,
      title: 'Team Building Events',
      description: 'Enhance team morale with festive decorations',
      examples: ['Team parties', 'Holiday celebrations', 'Welcome events', 'Retirement parties']
    },
    {
      icon: TrendingUp,
      title: 'Product Launches',
      description: 'Make your launch memorable with impactful displays',
      examples: ['Product unveils', 'Service launches', 'Campaign kickoffs', 'Brand reveals']
    },
    {
      icon: Building2,
      title: 'Corporate Conferences',
      description: 'Professional setups for business gatherings',
      examples: ['Annual conferences', 'Shareholder meetings', 'Trade shows', 'Networking events']
    }
  ]

  const brandingOptions = [
    'Custom company colors',
    'Logo balloon printing',
    'Corporate message displays',
    'Brand-consistent styling',
    'Professional color palettes',
    'Industry-appropriate themes'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Building2 className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Corporate Event Balloons
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Elevate your corporate events with professional balloon displays.
              From office celebrations to major product launches, we bring sophistication and impact to your business events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop?category=corporate"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Corporate Options
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Packages */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Corporate Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional balloon solutions designed for business environments and corporate culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corporatePackages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Types */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Corporate Event Types
            </h2>
            <p className="text-xl text-gray-600">
              Professional balloon services for every type of business event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventTypes.map((event, index) => {
              const IconComponent = event.icon
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {event.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Branding Options */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Brand Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seamlessly incorporate your company branding into every balloon display
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">{option}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Businesses Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Professional Service',
                description: 'Reliable, punctual, and business-appropriate presentations'
              },
              {
                icon: Users,
                title: 'Team Expertise',
                description: 'Experienced professionals who understand corporate environments'
              },
              {
                icon: Building2,
                title: 'Scalable Solutions',
                description: 'From small office parties to large corporate conferences'
              },
              {
                icon: Briefcase,
                title: 'Brand Focused',
                description: 'Every design reflects and enhances your company image'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how we've helped businesses create memorable events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tech Startup IPO Launch</h3>
              <p className="text-gray-600 mb-4">
                "The balloon displays created an amazing atmosphere for our IPO announcement.
                Professional, on-brand, and absolutely stunning. Our investors were impressed!"
              </p>
              <p className="font-semibold text-blue-600">- Sarah Chen, CEO TechInnovate</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Annual Conference Setup</h3>
              <p className="text-gray-600 mb-4">
                "Exceptional service from start to finish. The team transformed our conference
                venue and handled everything professionally. Will definitely use again."
              </p>
              <p className="font-semibold text-blue-600">- Michael Roberts, Event Director</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Elevate Your Corporate Event?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your event goals and create a professional balloon solution that enhances your brand.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>07459665002</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@giftedballoon.com</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/shop"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Corporate Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}