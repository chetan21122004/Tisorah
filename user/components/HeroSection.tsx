"use client"

import HeroSlider from "@/components/HeroSlider"
import Image from "next/image"

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

      <div className="flex flex-col w-full">
    

      <Image alt="hero" height={100} src="https://www.boxupgifting.com/cdn/shop/files/Corporate_Compressed_copy_120d4d8f-0b6b-42d7-a84e-a10eaae409be.jpg?v=1733485155" width={100} className="w-full h-1/2 hidden sm:block" />
      <Image alt="hero" height={100} src="https://www.boxupgifting.com/cdn/shop/files/Corporate_compressed_copy.jpg" width={100} className="w-full h-1/2  sm:hidden" />

      <Image alt="hero" height={100} src="https://cdn.shopify.com/s/files/1/0581/9754/0921/files/frame-5-1646052171479_1200x_1.png?v=1703229823" width={100} className="w-44 hidden sm:block left-1/2 relative -translate-x-1/2 -mt-24" />

      </div>


     
    </section>
  )
} 