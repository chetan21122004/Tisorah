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
  {
    image: "https://corporategiftsbyconfetti.in/cdn/shop/files/Artboard_16corp_0d2c4056-b183-4662-b656-1abb6d78cfe6.webp?v=1718692062&width=2000",
    title: "Premium Corporate Gifts",
    description: "Thoughtfully designed gifts for recognition, events, and employee engagement",
    buttonText: "Request Quote",
    buttonLink: "/quote",
    align: "center"
  },
  {
    image: "https://corporategiftsbyconfetti.in/cdn/shop/files/Untitled_design_9_1.jpg?v=1742302025&width=2000",
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
      <div className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            {/* Decorative line above title */}
            <div className="w-16 h-[1px] bg-[#AD9660] mb-8"></div>
            
            <h2 className="text-3xl md:text-4xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre'] text-center">
              Featured Collections
            </h2>
            
            {/* Decorative geometric element */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rotate-45 bg-[#AD9660]/20"></div>
              <div className="w-2 h-2 rotate-45 bg-[#AD9660]"></div>
              <div className="w-2 h-2 rotate-45 bg-[#AD9660]/20"></div>
            </div>
            
            <p className="text-center text-gray-500 font-light max-w-3xl mx-auto mb-12 text-base leading-relaxed">
              Explore our curated selection of premium corporate gifts designed to impress your clients and motivate your team.
            </p>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-4">
            {isLoading ? (
              // Loading skeleton
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-64 mb-4"></div>
                  <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-1/2"></div>
                </div>
              ))
            ) : (
              featuredProducts.map((product, index) => {
                const nextIndex = (index + 1) % featuredProducts.length;
                const hoverImage = featuredProducts[nextIndex]?.images?.[0];
                
                return (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <div
                      className="group relative overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02]"
                      style={{ minHeight: 380 }}
                    >
                      <div className="relative h-64 mb-4 bg-white">
                        {product.images && product.images[0] ? (
                          <>
                            <Image 
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className={`w-full h-full object-contain p-2 transition-opacity duration-500 group-hover:opacity-0`}
                            />
                            {hoverImage && (
                              <Image
                                src={hoverImage}
                                alt={product.name + ' alt'}
                                fill
                                className={`absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-500 opacity-0 group-hover:opacity-100`}
                              />
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        {/* Elegant badge design */}
                        <div className="absolute top-4 left-0">
                          <div className="bg-white/90 backdrop-blur-sm border-l-2 border-[#AD9660] text-[#323433] font-light text-xs px-4 py-2">
                            Best Seller
                          </div>
                        </div>
                      </div>

                      {/* Product details with refined typography */}
                      <div className="px-2 flex flex-col flex-1">
                        <h3 className="font-light text-base text-[#323433] leading-snug line-clamp-2 mb-2 group-hover:text-[#AD9660] transition-colors duration-300">
                          {product.name}
                        </h3>
                        <span className="text-xs text-gray-500 font-light tracking-wide uppercase">corporate gift</span>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-lg font-light text-[#AD9660]">₹{product.price}</span>
                          <div className="w-6 h-[1px] bg-[#AD9660]/20"></div>
                        </div>
                      </div>

                      {/* Geometric decorative element on hover */}
                      <div className="absolute -bottom-full right-0 w-12 h-12 border border-[#AD9660]/20 rotate-45 group-hover:-translate-y-12 transition-transform duration-500"></div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
          
          {/* Elegant CTA button */}
          <div className="flex justify-center">
            <Button 
              asChild
              className="group relative bg-white hover:bg-[#AD9660] text-[#323433] hover:text-white border border-[#323433] px-12 py-4 rounded-none transition-all duration-300"
            >
              <Link href="/products">
                <span className="relative z-10 font-light tracking-wider text-sm uppercase">View Products</span>
                <div className="absolute inset-0 border border-[#AD9660] -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      {/* <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E6E2DD] opacity-30 -skew-x-12 transform origin-top-right z-0" /> */}
    </section>
  )
} 