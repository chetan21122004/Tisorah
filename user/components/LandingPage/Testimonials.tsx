"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 640) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, testimonials.length]);

  const nextSlide = () => {
    const maxIndex = testimonials.length - slidesToShow;
    setCurrentIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    const maxIndex = testimonials.length - slidesToShow;
    setCurrentIndex(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + slidesToShow);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex + slidesToShow < testimonials.length;

  return (
    <section className="py-4 md:py-10 bg-gradient-to-b from-white to-[#F4F4F4]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-3 md:px-4 py-1 rounded-full bg-[#F0EBE1] text-[#AD9660] text-xs md:text-sm mb-3 md:mb-4">
            <Star className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> Client Testimonials
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-[#323433] mb-3 md:mb-4">
            What Our <span className="text-[#AD9660]">Happy Clients</span> Say
          </h2>
          
        </div>
        
        <div className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={sliderRef}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={!canGoLeft}
            className={`absolute -left-2 md:-left-10 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white border border-gray-200 rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center shadow-md transition-all duration-200 ${canGoLeft ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#323433]" />
          </button>
          
          {/* Testimonials Slider */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ 
                x: `-${currentIndex * (100 / slidesToShow)}%` 
              }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id} 
                  className="flex-shrink-0 px-2 md:px-4"
                  style={{ width: `${100 / slidesToShow}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <button
            onClick={nextSlide}
            disabled={!canGoRight}
            className={`absolute -right-2 md:-right-10 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white border border-gray-200 rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center shadow-md transition-all duration-200 ${canGoRight ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#323433]" />
          </button>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 gap-1.5">
            {Array.from({ length: Math.ceil(testimonials.length / slidesToShow) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                  Math.floor(currentIndex / slidesToShow) === index 
                    ? 'bg-[#AD9660] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => goToSlide(index * slidesToShow)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Join over 500+ satisfied corporate clients who trust us with their gifting needs
          </p>
          <button className="bg-[#AD9660] hover:bg-[#8d7c50] text-white px-6 md:px-8 py-2 md:py-3 rounded-md transition-all duration-300 text-sm md:text-base font-medium">
            Request a Free Consultation
          </button>
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: TestimonialData
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 h-full flex flex-col relative">
      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="w-8 h-8 md:w-12 md:h-12 text-[#AD9660]" />
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-[#F0EBE1]">
          <img 
            src={testimonial.avatar_url || '/placeholder-user.jpg'} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-base md:text-lg text-[#323433]">{testimonial.name}</h3>
          <p className="text-xs md:text-sm text-gray-500">{testimonial.position}, {testimonial.company}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3 h-3 md:w-4 md:h-4 ${i < testimonial.rating ? 'text-[#AD9660]' : 'text-gray-300'}`} 
            fill={i < testimonial.rating ? '#AD9660' : 'none'} 
          />
        ))}
      </div>
      
      <p className="text-xs md:text-sm text-gray-600 flex-grow mb-4 line-clamp-4">
        "{testimonial.content}"
      </p>
      
      {testimonial.product_bought && (
        <div className="text-[10px] md:text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
          Purchased: {testimonial.product_bought}
        </div>
      )}
    </div>
  )
}

export default Testimonials 