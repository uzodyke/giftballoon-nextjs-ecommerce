import { Heart, Star, Gift, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            About GiftBalloon
          </h1>
          <p className="text-xl text-center text-gray-600">
            Creating magical moments with beautiful balloon arrangements
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-4">
              GiftBalloon was born from a passion for creating unforgettable moments. We believe that every celebration, no matter how big or small, deserves to be special and memorable.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              What started as a small idea has grown into London's premier balloon arrangement service, specializing in personalized designs that bring joy and wonder to any occasion.
            </p>
            <p className="text-lg text-gray-600">
              Each balloon arrangement is carefully crafted with love, attention to detail, and a commitment to making your special moments truly extraordinary.
            </p>
          </div>
          <div className="bg-pink-50 rounded-lg p-8">
            <img
              src="/images/love-bouquet-30.jpg"
              alt="About GiftBalloon"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Love & Care</h3>
              <p className="text-gray-600">Every arrangement is made with love and attention to detail</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">We use only the finest materials and balloons for lasting beauty</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalization</h3>
              <p className="text-gray-600">Custom designs tailored to your unique vision and occasion</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Joy</h3>
              <p className="text-gray-600">Your happiness and satisfaction is our ultimate goal</p>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-gray-50 rounded-lg p-8 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Balloon Arrangements</h3>
              <p className="text-gray-600 mb-4">
                From intimate gatherings to grand celebrations, we create custom balloon arrangements that perfectly match your vision and theme.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Birthday celebrations</li>
                <li>• Wedding decorations</li>
                <li>• Corporate events</li>
                <li>• Anniversary surprises</li>
                <li>• Baby showers</li>
                <li>• Graduation parties</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery & Setup</h3>
              <p className="text-gray-600 mb-4">
                We provide professional delivery and setup services throughout London, ensuring your balloons arrive perfect and on time.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Same-day delivery available</li>
                <li>• Professional installation</li>
                <li>• London-wide coverage</li>
                <li>• Flexible timing options</li>
                <li>• Special event coordination</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-pink-600 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Let's bring your vision to life with stunning balloon arrangements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Our Collection
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}