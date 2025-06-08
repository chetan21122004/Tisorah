import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import type { BlogPost } from '@/types/blog'
import { EXAMPLE_BLOGS } from '@/utils/blog-constants'
import { getAllBlogPosts } from '@/lib/blog-service'

export default async function BlogPage() {
  // Fetch all blog posts
  const fetchedBlogs = await getAllBlogPosts();
  
  // Use example blogs as fallback if no blogs were fetched
  const blogs = fetchedBlogs.length > 0 ? fetchedBlogs : EXAMPLE_BLOGS;

  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E2A47] mb-4">Tisorah Insights</h1>
            <p className="text-lg text-neutral-600 mb-8">Expert perspectives on corporate gifting strategies and industry trends.</p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {blogs.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <div className="relative h-[400px] lg:h-full rounded-xl overflow-hidden shadow-md">
                <Image 
                  src={blogs[0].cover_image} 
                  alt={blogs[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-[#AD9660]/10 text-[#AD9660] rounded-full">
                    {blogs[0].category}
                  </span>
                  <span className="ml-3 text-neutral-500 text-sm">{blogs[0].reading_time}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1E2A47] mb-4">
                  {blogs[0].title}
                </h2>
                <p className="text-neutral-600 mb-6">
                  {blogs[0].excerpt}
                </p>
                <div className="flex items-center mb-6">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image 
                      src={blogs[0].author_image} 
                      alt={blogs[0].author} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[#1E2A47]">{blogs[0].author}</p>
                    <p className="text-sm text-neutral-500">
                      {format(blogs[0].published_at, 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div>
                  <Link 
                    href={`/blog/${blogs[0].slug}`}
                    className="inline-flex items-center px-6 py-3 rounded-full text-white bg-[#AD9660] hover:bg-[#AD9660]/90 transition-colors shadow-sm font-medium"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E2A47] mb-10 border-b border-neutral-200 pb-4">Latest Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(1).map((blog) => (
                <Link href={`/blog/${blog.slug}`} key={blog.id} className="group">
                  <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-200">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image 
                        src={blog.cover_image} 
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="px-3 py-1 text-xs font-medium bg-[#AD9660]/10 text-[#AD9660] rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-neutral-500 text-xs">{blog.reading_time}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1E2A47] mb-2 group-hover:text-[#AD9660] transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center pt-3 border-t border-neutral-100">
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