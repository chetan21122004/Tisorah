"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Banner data
const bannerData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
    title: "Premium Corporate Gifts",
    subtitle: "Up to 40% off on exclusive collections",
    buttonText: "Shop Now",
    buttonLink: "/sale",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    title: "Executive Collection",
    subtitle: "Discover our premium range starting ₹2,999",
    buttonText: "Explore Now",
    buttonLink: "/categories/executive",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
    title: "Festival Special",
    subtitle: "Early bird offers on festive gifts",
    buttonText: "View Offers",
    buttonLink: "/categories/festival",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        {bannerData.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            
            {/* Banner Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg">
                  <div className={`transition-all duration-500 transform ${
                    index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}>
                    <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      {banner.title}
                    </h1>
                    <p className="text-white/90 text-lg mb-6">
                      {banner.subtitle}
                    </p>
                    <Button 
                      size="lg"
                      className="bg-white text-[#1E2A47] hover:bg-white/90"
                    >
                      <Link href={banner.buttonLink}>{banner.buttonText}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-white/80 hover:bg-white ml-2"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4 text-[#1E2A47]" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-white/80 hover:bg-white mr-2"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4 text-[#1E2A47]" />
        </Button>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 