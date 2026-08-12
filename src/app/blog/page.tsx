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
    {
      title: 'Balloon Delivery London: Your Complete Guide to Sending Balloons Across the Capital',
      description: 'Everything you need to know about balloon delivery in London — delivery areas and postcodes, same-day and scheduled options, and how to order the perfect surprise.',
      slug: 'balloon-delivery-london',
      category: 'Delivery',
    },
    {
      title: 'Balloon Arrangements London: Stunning Designs for Every Celebration',
      description: 'Explore beautiful balloon arrangements in London — bouquets, arches, columns and centrepieces, plus custom designs and setup for events across the capital.',
      slug: 'balloon-arrangements-london',
      category: 'Arrangements',
    },
    {
      title: 'Personalised Balloons London: Custom Balloon Gifts Made Personal',
      description: 'Create custom, personalised balloons in London with names, messages, photos and gifts inside. Perfect bespoke balloon gifts delivered across the city.',
      slug: 'personalised-balloons-london',
      category: 'Personalization',
    },
    {
      title: 'Helium Balloon Delivery London: Fresh, Floating Balloons to Your Door',
      description: 'Pre-inflated helium balloon delivery across London — quality helium, long float times, and balloons that arrive ready to celebrate. Same-day options available.',
      slug: 'helium-balloon-delivery-london',
      category: 'Delivery',
    },
    {
      title: 'Same Day Balloon Delivery London: Last-Minute Gifts That Still Wow',
      description: 'Need balloons today? Discover same day balloon delivery across London — order cut-offs, covered areas, and how to send a stunning last-minute surprise.',
      slug: 'same-day-balloon-delivery-london',
      category: 'Delivery',
    },
    {
      title: 'Birthday Balloons London: Make Every Birthday Unforgettable',
      description: 'Birthday balloon ideas for every age in London — number balloons, themed and personalised designs, plus surprise delivery across the capital.',
      slug: 'birthday-balloons-london',
      category: 'Occasions',
    },
    {
      title: 'Wedding Balloon Decorations London: Elegant Displays for Your Big Day',
      description: 'Sophisticated wedding balloon decorations in London — arches, garlands, backdrops and centrepieces, with on-site setup at venues across the capital.',
      slug: 'wedding-balloon-decorations-london',
      category: 'Weddings',
    },
    {
      title: 'Graduation Balloons London: Celebrate Academic Success in Style',
      description: 'Graduation balloon ideas and delivery in London — caps, year numbers and personalised congratulations, delivered near universities across the city.',
      slug: 'graduation-balloons-london',
      category: 'Occasions',
    },
    {
      title: 'Corporate Event Balloons London: Professional Displays That Impress',
      description: 'Branded, professional balloon displays for corporate events in London — product launches, conferences and openings, with pro delivery and setup.',
      slug: 'corporate-event-balloons-london',
      category: 'Corporate',
    },
    {
      title: 'Anniversary & Valentine\'s Balloons London: Romantic Gifts Delivered',
      description: 'Romantic anniversary and Valentine\'s balloons in London — heart designs, stuffed balloons and personalised love messages, delivered with a surprise.',
      slug: 'anniversary-valentines-balloons-london',
      category: 'Romance',
    },
    {
      title: 'Stuffed Balloons London: The Ultimate Surprise-Inside Gift',
      description: 'Discover stuffed balloons in London — a large balloon with gifts, teddies or confetti sealed inside for an unforgettable reveal, delivered across the city.',
      slug: 'stuffed-balloons-london',
      category: 'Gift Ideas',
    },
    {
      title: 'Teddy Balloon Gifts London: Cuddly Surprises Delivered with Love',
      description: 'Teddy balloon gifts in London — adorable bears paired with or tucked inside balloons, perfect for new babies, birthdays and romance, delivered citywide.',
      slug: 'teddy-balloon-gift-london',
      category: 'Gift Ideas',
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