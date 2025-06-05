"use client"

import dynamic from "next/dynamic"

// Dynamically import the HeroSlider component with no SSR
const HeroSlider = dynamic(() => import("./HeroSlider"), {
  ssr: false,
})

export default function HeroSection() {
  return (
    <section className="bg-white">
      {/* Main Banner Slider */}
      <HeroSlider />

      {/* Categories Grid */}
      {/* <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-4">
            <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
                alt="Executive Gifts"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-medium text-[#1E2A47]">Executive Gifts</h3>
            <p className="text-sm text-[#1E2A47]/60 mb-2">Starting ₹2,999</p>
            <a 
              href="/categories/executive"
              className="text-[#AD9660] text-sm font-medium hover:underline"
            >
              Shop Now
            </a>
          </div>

          <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-4">
            <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0"
                alt="Festival Gifts"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-medium text-[#1E2A47]">Festival Gifts</h3>
            <p className="text-sm text-[#1E2A47]/60 mb-2">Starting ₹1,999</p>
            <a 
              href="/categories/festival"
              className="text-[#AD9660] text-sm font-medium hover:underline"
            >
              Shop Now
            </a>
          </div>

          <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-4">
            <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44"
                alt="Awards & Recognition"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-medium text-[#1E2A47]">Awards</h3>
            <p className="text-sm text-[#1E2A47]/60 mb-2">Starting ₹4,999</p>
            <a 
              href="/categories/awards"
              className="text-[#AD9660] text-sm font-medium hover:underline"
            >
              Shop Now
            </a>
          </div>

          <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-4">
            <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865"
                alt="Corporate Events"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-medium text-[#1E2A47]">Event Gifts</h3>
            <p className="text-sm text-[#1E2A47]/60 mb-2">Starting ₹2,499</p>
            <a 
              href="/categories/events"
              className="text-[#AD9660] text-sm font-medium hover:underline"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div> */}
    </section>
  )
} 