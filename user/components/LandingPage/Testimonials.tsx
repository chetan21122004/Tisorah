"use client"
import React, { useState } from 'react'

// Add type for testimonial data
interface TestimonialData {
  id: string
  name: string
  position: string
  company: string
  avatar_url: string | null
  rating: number
  content: string
  product_bought: string
  created_at: string
}

interface TestimonialsProps {
  testimonials: TestimonialData[]
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [start, setStart] = useState(0)
  const visible = testimonials.slice(start, start + 3)
  const canGoLeft = start > 0
  const canGoRight = start + 3 < testimonials.length

  const handleLeft = () => {
    if (canGoLeft) setStart(start - 1)
  }
  const handleRight = () => {
    if (canGoRight) setStart(start + 1)
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const mobileVisible = testimonials.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl md:text-5xl font-edu-cursive  mb-12">What our happy customers says</h2>
      <div className="relative flex items-center">
        <button
          onClick={handleLeft}
          disabled={!canGoLeft}
          className={`hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 z-20 bg-white border-2 border-gray-700 rounded-full w-12 h-12 items-center justify-center shadow-lg text-3xl font-light text-gray-700 hover:bg-gray-100 transition-all duration-200 ${canGoLeft ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
          aria-label="Previous testimonials"
        >
          &lt;
        </button>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(
              typeof window !== 'undefined' && window.innerWidth < 768
                ? mobileVisible
                : visible
            ).map((t, idx) => (
              <div key={idx} className="bg-white border rounded-lg shadow-md p-8 flex flex-col items-center text-center">
                <img src={t.avatar_url || '/placeholder.svg'} alt={t.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 mb-4" />
                <h3 className="text-xl font-edu-cursive mb-1">{t.name}</h3>
                <div className="text-sm text-gray-600 mb-2 font-medium">{t.position}</div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mb-1">5.0 rating</div>
                <p className="text-gray-700 text-sm whitespace-pre-line mb-4">{t.content}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleRight}
          disabled={!canGoRight}
          className={`hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 z-20 bg-white border-2 border-gray-700 rounded-full w-12 h-12 items-center justify-center shadow-lg text-3xl font-light text-gray-700 hover:bg-gray-100 transition-all duration-200 ${canGoRight ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
          aria-label="Next testimonials"
        >
          &gt;
        </button>
      </div>
    </section>
  )
}

export default Testimonials 