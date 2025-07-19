'use client'

import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { format } from 'date-fns'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRight } from 'lucide-react'

interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string
  category: any
  reading_time: string
  author: string
  author_image: string
  published_at: Date
}

interface BlogCarouselProps {
  posts: BlogPost[]
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section className="py-10 md:py-5 bg-gradient-to-b from-[#F4F4F4] to-white overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-[1px] bg-[#AD9660]"></div>
              <span className="ml-4 text-sm uppercase tracking-wider text-[#AD9660] font-light">Our Blog</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-[#323433]">
              TisorahBox Insights
            </h2>
            <p className="text-[#323433]/70 max-w-xl text-lg font-light">
              Expert perspectives on corporate gifting strategies and industry trends.
            </p>
          </div>
          <Link href="/blog">
            <button className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-light tracking-wide text-white bg-[#323433] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#1E2A47]">
              <span className="relative flex items-center">
                View All Articles
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {posts.map((post, idx) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <article className="relative bg-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E6E2DD] h-[420px]">
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-[#323433]/5"></div>
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="object-cover w-full h-full transform transition-transform duration-700 ease-out scale-100 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <div className="relative p-5">
                      {/* Category and Reading Time */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 text-[11px] tracking-wide font-light bg-[#AD9660]/5 text-[#AD9660] rounded-full">
                          {post.category}
                        </span>
                        <span className="text-[#323433]/60 text-[11px] font-light">{post.reading_time}</span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-base font-serif text-[#323433] mb-2 group-hover:text-[#AD9660] transition-colors duration-300 line-clamp-2 font-light leading-snug min-h-[40px]">
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-[#323433]/70 text-xs mb-4 line-clamp-2 font-light min-h-[32px]">
                        {post.excerpt}
                      </p>
                      
                      {/* Author Info */}
                      <div className="flex items-center pt-3 border-t border-[#E6E2DD] mt-auto">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3 ring-1 ring-[#AD9660]/5">
                          <img
                            src={post.author_image}
                            alt={post.author}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-light text-[#323433] truncate">{post.author}</p>
                          <p className="text-[11px] text-[#323433]/60 font-light">
                            {format(new Date(post.published_at), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-3 h-10 w-10 border-[#E6E2DD] bg-white hover:bg-[#F4F4F4] text-[#323433]" />
            <CarouselNext className="-right-3 h-10 w-10 border-[#E6E2DD] bg-white hover:bg-[#F4F4F4] text-[#323433]" />
          </div>
        </Carousel>
      </div>
    </section>
  )
} 