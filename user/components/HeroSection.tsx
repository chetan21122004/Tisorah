"use client"

import HeroSlider from "@/components/HeroSlider"

const categories = [
  {
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    alt: "Executive Gifts",
    title: "Executive Gifts",
    price: "Starting ₹2,999",
    link: "/categories/executive"
  },
  {
    img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
    alt: "Festival Gifts",
    title: "Festival Gifts",
    price: "Starting ₹1,999",
    link: "/categories/festival"
  },
  {
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
    alt: "Awards & Recognition",
    title: "Awards",
    price: "Starting ₹4,999",
    link: "/categories/awards"
  },
  {
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    alt: "Corporate Events",
    title: "Event Gifts",
    price: "Starting ₹2,499",
    link: "/categories/events"
  }
]

export default function HeroSection() {
  return (
    <section className="bg-white my-12">
      {/* Main Banner Slider */}
      <HeroSlider />

      {/* Categories Grid */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-4">
              <div className="relative h-48 mb-4 rounded-lg  overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.alt}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-medium text-[#1E2A47]">{cat.title}</h3>
              <p className="text-sm text-[#1E2A47]/60 mb-2">{cat.price}</p>
              <a 
                href={cat.link}
                className="text-[#AD9660] text-sm font-medium hover:underline"
              >
                Shop Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 