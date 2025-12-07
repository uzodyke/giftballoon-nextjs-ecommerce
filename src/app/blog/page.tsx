import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Balloon Gift Blog - Expert Tips & Ideas | GiftBalloon',
  description: 'Discover expert balloon gift ideas, delivery guides, and celebration tips. From balloon bouquets to personalized arrangements, find everything you need for perfect balloon gifts.',
  keywords: 'balloon gifts, balloon blog, balloon delivery tips, balloon arrangements, celebration ideas',
};

export default function BlogIndexPage() {
  const blogPosts = [
    {
      title: 'Balloon in a Box: The Ultimate Surprise Gift Guide',
      description: 'Discover why balloon in a box gifts are the perfect surprise for any occasion. Learn about styles, delivery options, and how to create unforgettable moments.',
      slug: 'balloon-in-a-box',
      category: 'Gift Ideas',
    },
    {
      title: 'Balloon in a Box Delivery: Complete Guide to Sending Surprise Balloon Gifts',
      description: 'Expert guide to balloon in a box delivery services. Learn about same-day options, nationwide shipping, and how to send the perfect surprise.',
      slug: 'balloon-in-a-box-delivery',
      category: 'Delivery',
    },
    {
      title: 'Personalized Balloon in a Box: Create Custom Balloon Gifts That Tell Your Story',
      description: 'Learn how to create stunning personalized balloon gifts. From custom messages to photo balloons, discover unique balloon arrangements that wow.',
      slug: 'personalized-balloon-in-a-box',
      category: 'Personalization',
    },
    {
      title: 'Inflated Balloon Delivery: Professional Helium Balloon Services',
      description: 'Complete guide to inflated balloon delivery services. Learn about helium quality, float times, care tips, and professional balloon services.',
      slug: 'inflated-balloon-delivery',
      category: 'Delivery',
    },
    {
      title: 'Balloon Bouquets: Beautiful Balloon Arrangements for Every Celebration',
      description: 'Discover stunning balloon bouquets perfect for birthdays, anniversaries, and special events. Learn about styles, delivery options, and design tips.',
      slug: 'balloon-bouquets',
      category: 'Arrangements',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Balloon Gift Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Expert tips, guides, and inspiration for creating unforgettable balloon gifts.
          From delivery options to personalization ideas, discover everything you need
          to make your celebrations extra special.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-3">
                <span className="inline-block bg-pink-100 text-pink-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold"
              >
                Read More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-pink-50 rounded-lg p-8 mt-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with Balloon Gift Ideas
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest balloon gift inspiration, delivery tips, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button className="bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Create Your Perfect Balloon Gift?
        </h2>
        <p className="text-gray-600 mb-6">
          Browse our collection of beautiful balloon arrangements and surprise someone special today.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors"
        >
          Shop Balloon Gifts
        </Link>
      </div>
    </div>
  );
}