import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import type { BlogPost } from '@/types/blog'
import { EXAMPLE_BLOGS } from '@/utils/blog-constants'

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  // Find the blog post from EXAMPLE_BLOGS
  const blog = EXAMPLE_BLOGS.find(blog => blog.slug === params.slug);
  
  // If no blog found, show 404
  if (!blog) {
    notFound();
  }
  
  // Get related blogs from the same category
  const relatedBlogs = EXAMPLE_BLOGS
    .filter(item => item.category === blog.category && item.id !== blog.id)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation Breadcrumb */}
      <section className="pt-28 pb-4 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Link 
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-[#AD9660] hover:text-[#AD9660]/80 transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-12 bg-gradient-to-b from-white to-neutral-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Category and Reading Time */}
            <div className="mb-8 flex items-center gap-4">
              <span className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#AD9660] to-[#AD9660]/80 text-white rounded-full shadow-sm">
                {blog.category}
              </span>
              <div className="flex items-center text-neutral-500 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {blog.reading_time}
              </div>
              <div className="flex items-center text-neutral-500 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {format(blog.published_at, 'MMMM d, yyyy')}
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E2A47] mb-8 leading-tight tracking-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-neutral-600 leading-relaxed max-w-4xl">
              {blog.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={blog.cover_image} 
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-xl max-w-none prose-headings:text-[#1E2A47] prose-headings:font-bold prose-p:text-neutral-700 prose-p:leading-relaxed prose-a:text-[#AD9660] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1E2A47] prose-blockquote:border-l-[#AD9660] prose-blockquote:bg-neutral-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-li:text-neutral-700">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>

            {/* Article Footer */}
            <div className="mt-16 pt-8 border-t border-neutral-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-neutral-500">
                  Published on {format(blog.published_at, 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-neutral-500">Share:</span>
                  <div className="flex gap-2">
                    <button className="p-2 text-neutral-400 hover:text-[#AD9660] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-[#AD9660] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-[#AD9660] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-100">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1E2A47] mb-4">Related Insights</h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                  Explore more expert insights and industry knowledge
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <Link href={`/blog/${relatedBlog.slug}`} key={relatedBlog.id} className="group">
                    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100 group-hover:border-[#AD9660]/20 h-full">
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image 
                          src={relatedBlog.cover_image} 
                          alt={relatedBlog.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-8">
                        <div className="mb-4 flex items-center justify-between">
                          <span className="px-3 py-1 text-xs font-semibold bg-[#AD9660]/10 text-[#AD9660] rounded-full">
                            {relatedBlog.category}
                          </span>
                          <span className="text-neutral-400 text-xs flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {relatedBlog.reading_time}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1E2A47] mb-3 group-hover:text-[#AD9660] transition-colors line-clamp-2 leading-tight">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                          {relatedBlog.excerpt}
                        </p>
                        <div className="mt-6 flex items-center text-[#AD9660] text-sm font-medium group-hover:gap-2 transition-all">
                          Read More
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
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
      <section className="py-20 bg-gradient-to-br from-[#1E2A47] via-[#1E2A47] to-[#2A3B5C] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Ahead of the Curve</h2>
              <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                Subscribe to receive premium insights, industry trends, and expert knowledge delivered directly to your inbox.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#AD9660] text-[#1E2A47] font-medium shadow-lg"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="px-8 py-4 bg-gradient-to-r from-[#AD9660] to-[#AD9660]/80 hover:from-[#AD9660]/90 hover:to-[#AD9660]/70 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
            <p className="text-neutral-400 text-sm mt-4">
              Join 10,000+ professionals who trust our insights
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 