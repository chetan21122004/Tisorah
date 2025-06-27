"use client"

import HeroSlider from "@/components/HeroSlider"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Banner slides for the hero slider
const bannerSlides = [
  {
    image: "https://corporategiftsbyconfetti.in/cdn/shop/files/Artboard_2_copy_6corp_85822496-b5e4-4579-b3db-0489eab16bd7.webp?v=1718692062&width=2000",
    title: "Elevate Your Corporate Gifting",
    description: "Curated luxury gifts that make a lasting impression for every corporate occasion",
    buttonText: "Explore Collections",
    buttonLink: "/categories",
    align: "left"
  },
  {
    image: "https://www.boxupgifting.com/cdn/shop/files/Corporate_Compressed_copy_120d4d8f-0b6b-42d7-a84e-a10eaae409be.jpg?v=1733485155",
    title: "Premium Corporate Gifts",
    description: "Thoughtfully designed gifts for recognition, events, and employee engagement",
    buttonText: "Request Quote",
    buttonLink: "/quote",
    align: "center"
  },
  {
    image: "https://corporategiftsbyconfetti.in/cdn/shop/files/banner_4_6692d39c-d5bf-44d4-9b94-9bcdb3129766.jpg?v=1701962949&width=1400",
    title: "Premium Corporate Gifts",
    description: "Thoughtfully designed gifts for recognition, events, and employee engagement",
    buttonText: "Request Quote",
    buttonLink: "/quote",
    align: "center"
  },
];

interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  rating?: number;
  reviews?: number;
}

// Category cards data
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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
          .from('products')
          .select('id, name, images, price, rating')
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) {
          console.error('Error fetching products:', error);
          return;
        }
        
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);
  
  return (
    <section className="relative bg-[#F4F4F4]">
      {/* Hero Slider */}
      <div className="relative w-full overflow-hidden">
        <HeroSlider slides={bannerSlides} />
      </div>
      
      {/* Featured Products Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-3xl font-semibold font-edu-cursive text-[#323433] mb-2 font-[Poppins]">
              Featured Collections
            </h2>
            <div className="w-24 h-1 bg-[#AD9660] mb-6"></div>
            <p className="text-center text-gray-500 font-light max-w-3xl mx-auto mb-8">
              Explore our curated selection of premium corporate gifts designed to impress your clients and motivate your team.
            </p>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {isLoading ? (
              // Loading skeleton
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-64 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              featuredProducts.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group">
                  <div 
                    className="rounded-xl overflow-hidden flex flex-col pb-4 transition-transform duration-300 hover:scale-105 bg-white shadow-sm hover:shadow-md"
                    style={{ minHeight: 380 }}
                  >
                    <div className="relative h-64 mb-3">
                      {product.images && product.images[0] ? (
                        <Image 
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                          style={{ background: '#f7f7f7' }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <div className="backdrop-blur-sm bg-white/40 border border-white/30 text-gray-900 font-light text-xs px-3 py-1 rounded-tr-xl rounded-bl-xl">
                          Best Seller
                        </div>
                      </div>
                    </div>
                    <div className="px-4 flex flex-col flex-1">
                      <h3 className="font-medium text-base text-[#323433] leading-snug line-clamp-2 mb-1">{product.name}</h3>
                      <span className="text-xs text-gray-600 italic">corporate gift</span>
                      <span className="text-lg font-medium text-[#AD9660] mt-2">₹{product.price}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          
          <div className="flex justify-center mt-10">
            <Button 
              asChild
              className="bg-white hover:bg-[#f5f5f5] text-[#323433] border border-[#323433] px-8 py-6 rounded-full"
            >
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E6E2DD] opacity-30 -skew-x-12 transform origin-top-right z-0" />
    </section>
  )
} 