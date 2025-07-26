import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import type { BlogPost } from '@/types/blog'
import { EXAMPLE_BLOGS } from '@/utils/blog-constants'

// Static category mapping based on EXAMPLE_BLOGS categories
const BLOG_CATEGORIES = [
  { slug: 'corporate-gifting', name: 'Corporate Gifting', description: 'Expert insights on corporate gifting strategies and best practices.' },
  { slug: 'food-culture', name: 'Food & Culture', description: 'Exploring the cultural significance of food in corporate gifting.' },
  { slug: 'business-gifts', name: 'Business Gifts', description: 'Practical business gift solutions that make lasting impressions.' },
  { slug: 'luxury-gifting', name: 'Luxury Gifting', description: 'Premium luxury gifts for high-value business relationships.' },
  { slug: 'budget-planning', name: 'Budget Planning', description: 'Smart strategies for effective corporate gifting on any budget.' },
  { slug: 'festival-gifting', name: 'Festival Gifting', description: 'Celebrating Indian festivals through thoughtful corporate gifts.' }
]

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    slug: category.slug,
  }))
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Find the category from our static list
  const category = BLOG_CATEGORIES.find(cat => cat.slug === params.slug)
  
  if (!category) {
    // If category doesn't exist, show 404
    notFound()
  }
  
  // Filter blogs by category name
  const blogs = EXAMPLE_BLOGS.filter((blog: BlogPost) => 
    blog.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === params.slug ||
    blog.category.toLowerCase() === category.name.toLowerCase()
  )

  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-[#AD9660] hover:underline mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all articles
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E2A47] mb-4">{category.name}</h1>
            <p className="text-lg text-neutral-600 mb-8">{category.description || `Browse our articles about ${category.name.toLowerCase()}.`}</p>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog: BlogPost) => (
                  <Link href={`/blog/${blog.slug}`} key={blog.id} className="group">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-200 h-full flex flex-col">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image 
                          src={blog.cover_image} 
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="px-3 py-1 text-xs font-medium bg-[#AD9660]/10 text-[#AD9660] rounded-full">
                            {blog.category}
                          </span>
                          <span className="text-neutral-500 text-xs">{blog.reading_time}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1E2A47] mb-2 group-hover:text-[#AD9660] transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-grow">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center pt-3 border-t border-neutral-100 mt-auto">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                            <Image 
                              src={blog.author_image} 
                              alt={blog.author} 
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#1E2A47]">{blog.author}</p>
                            <p className="text-xs text-neutral-500">
                              {format(blog.published_at, 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-[#1E2A47] mb-4">No articles found</h2>
                <p className="text-neutral-600 mb-8">No articles are currently available in this category.</p>
                <Link 
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 rounded-full text-white bg-[#AD9660] hover:bg-[#AD9660]/90 transition-colors shadow-sm font-medium"
                >
                  View all articles
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-[#1E2A47]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-neutral-300 mb-8">Subscribe to our newsletter for the latest industry insights and corporate gifting trends.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#AD9660]"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-[#AD9660] hover:bg-[#AD9660]/90 text-white font-medium rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 