import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import type { BlogPost } from '@/types/blog'
import { EXAMPLE_BLOGS } from '@/utils/blog-constants'
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog-service'

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  // Fetch the blog post
  const fetchedBlog = await getBlogPostBySlug(params.slug);
  
  // Use example blog as fallback if not found
  const blog = fetchedBlog || EXAMPLE_BLOGS.find(blog => blog.slug === params.slug);
  
  // If no blog found, show 404
  if (!blog) {
    notFound();
  }
  
  // Fetch related blogs
  let relatedBlogs: BlogPost[] = [];
  
  if (fetchedBlog && 'categoryId' in fetchedBlog && fetchedBlog.categoryId) {
    // If we have a real blog post from Supabase, get related posts
    relatedBlogs = await getRelatedBlogPosts(fetchedBlog.categoryId, fetchedBlog.id);
  }
  
  // If no related blogs found, use example blogs
  if (relatedBlogs.length === 0) {
    relatedBlogs = EXAMPLE_BLOGS
      .filter(item => item.category === blog.category && item.id !== blog.id)
      .slice(0, 3);
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link 
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-[#AD9660] hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to all articles
              </Link>
            </div>
            
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-[#AD9660]/10 text-[#AD9660] rounded-full mr-3">
                {blog.category}
              </span>
              <span className="text-neutral-500 text-sm">{blog.reading_time}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E2A47] mb-6">
              {blog.title}
            </h1>
            
            <div className="flex items-center mb-8">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                <Image 
                  src={blog.author_image} 
                  alt={blog.author} 
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-[#1E2A47]">{blog.author}</p>
                <p className="text-sm text-neutral-500">
                  {format(blog.published_at, 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
              <Image 
                src={blog.cover_image} 
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none prose-headings:text-[#1E2A47] prose-p:text-neutral-700">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-neutral-50 border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-[#1E2A47] mb-10">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <Link href={`/blog/${relatedBlog.slug}`} key={relatedBlog.id} className="group">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-200">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image 
                          src={relatedBlog.cover_image} 
                          alt={relatedBlog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="px-3 py-1 text-xs font-medium bg-[#AD9660]/10 text-[#AD9660] rounded-full">
                            {relatedBlog.category}
                          </span>
                          <span className="text-neutral-500 text-xs">{relatedBlog.reading_time}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1E2A47] mb-2 group-hover:text-[#AD9660] transition-colors">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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