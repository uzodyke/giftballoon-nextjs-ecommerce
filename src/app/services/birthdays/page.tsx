import Link from 'next/link'
import { Calendar, PartyPopper, Gift, Cake, Phone, Mail, Star } from 'lucide-react'

export default function BirthdaysPage() {
  const birthdayPackages = [
    {
      name: 'Kids Party Special',
      price: '£45',
      age: 'Ages 1-12',
      description: 'Perfect for little ones\' special day',
      features: [
        'Colorful number balloons',
        'Character-themed options',
        'Party favor balloons',
        'Safe, child-friendly materials'
      ]
    },
    {
      name: 'Teen Celebration',
      price: '£65',
      age: 'Ages 13-17',
      description: 'Trendy and Instagram-ready',
      features: [
        'Metallic balloon numbers',
        'Photo booth backdrop',
        'Trendy color schemes',
        'LED light-up options'
      ]
    },
    {
      name: 'Adult Milestone',
      price: '£85',
      age: '18+',
      description: 'Elegant celebrations for grown-ups',
      features: [
        'Sophisticated color palettes',
        'Large number displays',
        'Premium foil balloons',
        'Venue styling included'
      ]
    }
  ]

  const ageGroups = [
    {
      title: 'Baby & Toddler (1-3)',
      description: 'Soft, safe balloons in gentle pastels',
      themes: ['Animals', 'Rainbow', 'First Birthday', 'Fairy Tale']
    },
    {
      title: 'Kids (4-12)',
      description: 'Fun character themes and bright colors',
      themes: ['Superheroes', 'Princess', 'Sports', 'Dinosaurs', 'Unicorns']
    },
    {
      title: 'Teens (13-17)',
      description: 'Modern and social media worthy',
      themes: ['Minimalist', 'Neon', 'Metallic', 'Ombre']
    },
    {
      title: 'Adults (18+)',
      description: 'Elegant and sophisticated designs',
      themes: ['Black & Gold', 'Rose Gold', 'Milestone Numbers', 'Custom Messages']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Cake className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Birthday Balloon Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Make every birthday unforgettable with our spectacular balloon arrangements.
              From first birthdays to milestone celebrations, we create the perfect party atmosphere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop?category=birthdays"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Shop Birthday Balloons
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Plan Custom Party
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Age-Specific Packages */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Birthday Packages by Age
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specially designed packages for every age group, ensuring the perfect celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {birthdayPackages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {pkg.age}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-purple-600 mb-2">{pkg.price}</div>
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 text-purple-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center block"
                  >
                    Choose This Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Age Groups & Themes */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Themes by Age Group
            </h2>
            <p className="text-xl text-gray-600">
              Age-appropriate themes and designs for every birthday celebration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ageGroups.map((group, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{group.title}</h3>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="flex flex-wrap gap-2">
                  {group.themes.map((theme, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Birthday Party Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Age-Specific Design',
                description: 'Perfectly tailored decorations for every age milestone'
              },
              {
                icon: PartyPopper,
                title: 'Party Ready',
                description: 'Complete setups that transform any space into a party venue'
              },
              {
                icon: Gift,
                title: 'Custom Numbers',
                description: 'Large, impressive number balloons in your choice of colors'
              },
              {
                icon: Cake,
                title: 'Photo Moments',
                description: 'Instagram-worthy backdrops for those special birthday photos'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Popular Add-Ons */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Add-Ons
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your birthday celebration with these extras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Number Balloons',
                price: 'From £15',
                description: 'Giant foil numbers in gold, silver, or colors'
              },
              {
                title: 'Photo Booth Kit',
                price: 'From £25',
                description: 'Balloon backdrop with props and accessories'
              },
              {
                title: 'Party Favors',
                price: 'From £3 each',
                description: 'Mini balloon gifts for party guests'
              }
            ].map((addon, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{addon.title}</h3>
                <div className="text-2xl font-bold text-purple-600 mb-2">{addon.price}</div>
                <p className="text-gray-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Plan the Perfect Birthday?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Let's create an unforgettable celebration that the birthday star will remember forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>07459665002</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>tigrexmove@gmail.com</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Plan My Party
            </Link>
            <Link
              href="/shop"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Shop Birthday Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}