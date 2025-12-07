import Link from 'next/link'
import { GraduationCap, Star, Award, Camera, Phone, Mail, Trophy, Book } from 'lucide-react'

export default function GraduationsPage() {
  const graduationPackages = [
    {
      name: 'School Graduation',
      price: '£55',
      level: 'Primary & Secondary',
      description: 'Celebrate academic achievements',
      features: [
        'School color balloons',
        'Graduation cap designs',
        'Class year numbers',
        'Achievement banners'
      ]
    },
    {
      name: 'University Graduate',
      price: '£85',
      level: 'Bachelor & Master',
      description: 'Mark this major milestone',
      features: [
        'University color scheme',
        'Degree-specific themes',
        'Photo booth backdrop',
        'Congratulations displays'
      ]
    },
    {
      name: 'Doctorate Celebration',
      price: '£120',
      level: 'PhD & Professional',
      description: 'Honor years of dedication',
      features: [
        'Premium balloon arrangements',
        'Custom academic regalia',
        'Professional presentation',
        'Multi-location setup'
      ]
    }
  ]

  const educationLevels = [
    {
      icon: Book,
      title: 'Primary School',
      description: 'Celebrating early academic milestones',
      colors: ['Bright primary colors', 'Fun character themes', 'Achievement medals'],
      popular: ['Year 6 leavers', 'Academic awards', 'Sports day victories']
    },
    {
      icon: GraduationCap,
      title: 'Secondary School',
      description: 'GCSE and A-Level celebrations',
      colors: ['School uniform colors', 'Sophisticated designs', 'Class year displays'],
      popular: ['GCSE results', 'A-Level completion', 'Prom celebrations']
    },
    {
      icon: Trophy,
      title: 'University',
      description: 'Bachelor and Master degree celebrations',
      colors: ['University colors', 'Academic regalia themes', 'Faculty-specific'],
      popular: ['Graduation ceremonies', 'Degree classifications', 'Faculty parties']
    },
    {
      icon: Award,
      title: 'Professional',
      description: 'Advanced degrees and certifications',
      colors: ['Professional palettes', 'Premium presentations', 'Achievement focus'],
      popular: ['PhD completions', 'Professional qualifications', 'Career milestones']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Graduation Celebration Balloons
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
              Honor academic achievements with our graduation balloon arrangements.
              From primary school milestones to doctorate degrees, we help celebrate every educational accomplishment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop?category=graduations"
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                Shop Graduation Balloons
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Plan Celebration
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Graduation Packages */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Graduation Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrate academic achievements at every level with our specialized graduation packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {graduationPackages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {pkg.level}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{pkg.price}</div>
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 text-emerald-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-center block"
                  >
                    Choose Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Levels */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Celebrations by Education Level
            </h2>
            <p className="text-xl text-gray-600">
              Tailored designs for every stage of academic achievement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationLevels.map((level, index) => {
              const IconComponent = level.icon
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{level.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-4">{level.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Color Schemes:</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {level.colors.map((color, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Popular Events:</h4>
                    <div className="flex flex-wrap gap-2">
                      {level.popular.map((event, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Graduation Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: GraduationCap,
                title: 'Academic Themes',
                description: 'Designs that honor educational achievements and milestones'
              },
              {
                icon: Camera,
                title: 'Photo Ready',
                description: 'Perfect backdrops for those important graduation photos'
              },
              {
                icon: Trophy,
                title: 'Achievement Focus',
                description: 'Highlight the hard work and dedication that led to success'
              },
              {
                icon: Star,
                title: 'Custom Colors',
                description: 'Match school colors and academic regalia perfectly'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Popular Graduation Themes */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Graduation Themes
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our most requested graduation celebration themes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Class of 2024',
                description: 'Year-specific displays with graduation caps and scrolls',
                price: 'From £45'
              },
              {
                title: 'School Colors',
                description: 'Custom arrangements in your institution\'s official colors',
                price: 'From £55'
              },
              {
                title: 'Achievement Stars',
                description: 'Star-themed displays celebrating academic excellence',
                price: 'From £40'
              },
              {
                title: 'Future Success',
                description: 'Forward-looking themes for new beginnings',
                price: 'From £50'
              },
              {
                title: 'Photo Booth',
                description: 'Interactive balloon backdrops for memorable photos',
                price: 'From £75'
              },
              {
                title: 'Family Celebration',
                description: 'Displays perfect for family graduation parties',
                price: 'From £65'
              }
            ].map((theme, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{theme.title}</h3>
                <p className="text-gray-600 mb-3">{theme.description}</p>
                <div className="text-lg font-semibold text-emerald-600">{theme.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Celebrate This Achievement?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Let's create a memorable graduation celebration that honors this important milestone.
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
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Plan Graduation Party
            </Link>
            <Link
              href="/shop"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Shop Graduation Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}