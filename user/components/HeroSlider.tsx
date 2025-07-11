"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface SlideType {
  id?: number;
  desktopImage: string;
  mobileImage: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  align?: string;
}

// Default banner data
const defaultBannerData: SlideType[] = [
  {
    id: 1,
    desktopImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
    mobileImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
    title: "Premium Corporate Gifts",
    subtitle: "Elevate your brand with our exclusive collection",
    buttonText: "Explore Collection",
    buttonLink: "/sale",
    align: "left",
  },
  {
    id: 2,
    desktopImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    mobileImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    title: "Executive Excellence",
    subtitle: "Sophisticated gifts starting at ₹2,999",
    buttonText: "View Selection",
    buttonLink: "/categories/executive",
    align: "center",
  },
  {
    id: 3,
    desktopImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
    mobileImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
    title: "Festival Special",
    subtitle: "Early access to our curated festive collection",
    buttonText: "Shop Now",
    buttonLink: "/categories/festival",
    align: "right",
  },
  {
    id: 4,
    desktopImage: "./banner/pink_bg_box.jpg",
    mobileImage: "./banner/pink_bg_box.jpg",
    title: "Festival Special",
    subtitle: "Early access to our curated festive collection",
    buttonText: "Shop Now",
    buttonLink: "/categories/festival",
    align: "right",
  },
]

interface HeroSliderProps {
  slides?: SlideType[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  // Use provided slides or fall back to default banner data
  const bannerData = slides || defaultBannerData;
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [aspectRatio, setAspectRatio] = useState("35.16%") // Default aspect ratio (910:320)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useIsMobile()
  const isPaused = useRef(false)

  // Handle window resize for adaptive height
  useEffect(() => {
    const updateAspectRatio = () => {
      const width = window.innerWidth;
      // Responsive aspect ratios based on screen size
      if (width < 640) { // Mobile
        setAspectRatio("133.49%") // 215:287 aspect ratio for mobile
      } else if (width < 1024) { // Tablet
        setAspectRatio("56.25%") // 16:9 aspect ratio
      } else { // Desktop
        setAspectRatio("35.16%") // 910:320 aspect ratio (≈2.84:1)
      }
    }
    
    updateAspectRatio()
    window.addEventListener("resize", updateAspectRatio)
    return () => window.removeEventListener("resize", updateAspectRatio)
  }, [])

  // Auto-play functionality with improved performance
  const startAutoPlay = useCallback(() => {
    // Don't auto-play on mobile to prevent scroll issues
    if (isMobile) return;
    
    // Clear any existing interval
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    
    // Set new interval - only for desktop
    autoPlayRef.current = setInterval(() => {
      if (!isPaused.current) {
        setCurrentSlide((prev) => (prev + 1) % bannerData.length)
      }
    }, 6000)
  }, [bannerData.length, isMobile])
  
  // Start/stop auto-play
  useEffect(() => {
    startAutoPlay()
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [startAutoPlay])

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % bannerData.length)
    
    // Reset animation lock after transition completes
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating, bannerData.length])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length)
    
    // Reset animation lock after transition completes
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating, bannerData.length])

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return
    
    setIsAnimating(true)
    setCurrentSlide(index)
    
    // Reset animation lock after transition completes
    setTimeout(() => setIsAnimating(false), 600)
  }, [currentSlide, isAnimating])

  return (
    <section 
      className="relative"
      onMouseEnter={() => { isPaused.current = true }}
      onMouseLeave={() => { isPaused.current = false }}
    >
      {/* Banner Image */}
      <div 
        ref={containerRef} 
        className="relative w-full overflow-hidden"
        style={{ paddingTop: aspectRatio }}
      >
        {bannerData.map((banner, index) => (
          <div   
            key={banner.id || index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <Image
              src={isMobile ? banner.mobileImage : banner.desktopImage}
              alt={banner.title}
              fill
              className="object-cover object-center"
              priority={index === currentSlide || index === (currentSlide + 1) % bannerData.length}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Slider Controls - More elegant and minimal */}
      <div className="absolute inset-y-0 left-2 md:left-8 flex items-center z-10">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-white" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-2 md:right-8 flex items-center z-10">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-white" />
        </Button>
      </div>

      {/* Slider Indicators - More modern and elegant */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#AD9660] w-6 md:w-10"
                : "bg-white/40 hover:bg-white/60 w-1.5 md:w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  )
}