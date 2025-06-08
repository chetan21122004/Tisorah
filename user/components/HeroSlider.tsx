"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

// Banner data with improved imagery and messaging
const bannerData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
    title: "Premium Corporate Gifts",
    subtitle: "Elevate your brand with our exclusive collection",
    buttonText: "Explore Collection",
    buttonLink: "/sale",
    align: "left",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    title: "Executive Excellence",
    subtitle: "Sophisticated gifts starting at ₹2,999",
    buttonText: "View Selection",
    buttonLink: "/categories/executive",
    align: "center",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
    title: "Festival Special",
    subtitle: "Early access to our curated festive collection",
    buttonText: "Shop Now",
    buttonLink: "/categories/festival",
    align: "right",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000) // Change slide every 6 seconds

    return () => clearInterval(timer)
  }, [])

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % bannerData.length)
    
    // Reset animation lock after transition completes
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length)
    
    // Reset animation lock after transition completes
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating])

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return
    
    setIsAnimating(true)
    setCurrentSlide(index)
    
    // Reset animation lock after transition completes
    setTimeout(() => setIsAnimating(false), 600)
  }, [currentSlide, isAnimating])

  // Get alignment class based on banner data
  const getAlignmentClass = (align: string) => {
    switch(align) {
      case 'left':
        return 'items-start text-left';
      case 'right':
        return 'items-end text-right';
      default:
        return 'items-center text-center';
    }
  }

  return (
    <section className="relative">
      {/* Banner Image */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {bannerData.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            
            {/* Banner Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6">
                <div className={`max-w-lg flex flex-col ${getAlignmentClass(banner.align)}`}>
                  <div 
                    className={`transition-all duration-700 delay-100 transform ${
                      index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                      {banner.title}
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl mb-8 max-w-md">
                      {banner.subtitle}
                    </p>
                    <Button 
                      size="lg"
                      className="bg-[#AD9660] hover:bg-[#AD9660]/90 text-white rounded-full px-8 transition-transform hover:scale-105 group"
                    >
                      <Link href={banner.buttonLink} className="flex items-center gap-2">
                        {banner.buttonText}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Controls - More elegant and minimal */}
      <div className="absolute inset-y-0 left-4 md:left-8 flex items-center">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-4 md:right-8 flex items-center">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Slider Indicators - More modern and elegant */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#AD9660] w-10"
                : "bg-white/40 hover:bg-white/60 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  )
} 