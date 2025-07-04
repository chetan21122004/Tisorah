"use client"

import HeroSlider from "@/components/HeroSlider"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Package, Check, Star, ArrowRight, Shield, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { preserveScroll } from "@/lib/utils"

// Banner slides for the hero slider
const bannerSlides = [
  {
    image: "./banners/banner_01.png",
    title: "Premium Corporate Gifts",
    description: "Elevate your brand with customized corporate gifts that leave a lasting impression",
    buttonText: "Get Free Quote",
    buttonLink: "/quote",
    align: "center"
  },
  {
    image: "./banners/banner_02.png",
    title: "Employee Recognition Gifts",
    description: "Celebrate achievements and milestones with thoughtfully curated gift boxes",
    buttonText: "Request Quote Now",
    buttonLink: "/quote",
    align: "center"
  },
  {
    image: "./banners/banner_03.png",
    title: "Bulk Corporate Gifting",
    description: "Save up to 30% on bulk orders with our volume discount pricing",
    buttonText: "Get Volume Pricing",
    buttonLink: "/quote",
    align: "center"
  },
  {
    image: "./banners/banner_04.png",
    title: "Custom Branded Merchandise",
    description: "Transform ordinary products into powerful brand ambassadors",
    buttonText: "Start Your Project",
    buttonLink: "/quote",
    align: "center"
  },

];

interface Product {
  id: string;
  name: string;
  images: string[];
  display_image?: string | null;
  hover_image?: string | null;
  price: number;
  price_min?: number | null;
  price_max?: number | null;
  has_price_range?: boolean | null;
  moq?: number | null;
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
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePageIndex, setMobilePageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
          .from('products')
          .select('id, name, images, display_image, hover_image, price, price_min, price_max, has_price_range, moq, rating, reviews')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(10);
          
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Format price display based on whether it's a range or single price
  const formatPrice = (product: Product) => {
    if (product.has_price_range && product.price_min && product.price_max) {
      return `₹${product.price_min.toLocaleString()} - ₹${product.price_max.toLocaleString()}`;
    } else {
      return `₹${product.price.toLocaleString()}`;
    }
  };
  
  // Auto-sliding functionality only for mobile view
  useEffect(() => {
    // Completely disable auto-sliding on mobile to prevent scroll issues
    return;
    
    /* Original code commented out
    if (!isMobile || isPaused || isLoading || featuredProducts.length === 0) return;
    
    // Use a longer interval for mobile to reduce performance impact
    const interval = setInterval(() => {
      // Store scroll position before animation
      const restoreScroll = preserveScroll();
      
      // Use requestAnimationFrame to optimize performance
      window.requestAnimationFrame(() => {
        setMobilePageIndex(prev => (prev + 1) % Math.ceil(Math.min(featuredProducts.length, 8) / 4));
        
        // Restore scroll position after state update
        if (restoreScroll) {
          setTimeout(restoreScroll, 10);
        }
      });
    }, 7000); // Increased from 5000ms to 7000ms for better performance
    
    return () => clearInterval(interval);
    */
  }, [isPaused, isLoading, isMobile, featuredProducts.length]);
  
  return (
    <section className="relative bg-[#F4F4F4]">
      {/* Hero Slider */}
      <div className="relative w-full overflow-hidden">
        <HeroSlider slides={bannerSlides} />
        
        {/* Trust badges overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent">
          <div className="container mx-auto px-4 py-2 md:py-3">
            <div className="flex flex-wrap justify-center gap-2 md:gap-8 text-white">
              <div className="flex items-center">
                <Shield className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-[#AD9660]" />
                <span className="text-[10px] md:text-sm font-light">Premium Quality</span>
              </div>
              <div className="flex items-center">
                <Check className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-[#AD9660]" />
                <span className="text-[10px] md:text-sm font-light">Custom Branding</span>
              </div>
              <div className="flex items-center">
                <Star className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-[#AD9660]" />
                <span className="text-[10px] md:text-sm font-light">Trusted by 500+ Companies</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-[#AD9660]" />
                <span className="text-[10px] md:text-sm font-light">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      
      {/* Featured Products Section */}
      <div className="bg-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Decorative line above title */}
            <div className="w-12 h-[1px] bg-[#AD9660] mb-6"></div>
            
            <h2 className="text-2xl md:text-4xl font-light text-[#323433] mb-3 md:mb-4 font-['Frank_Ruhl_Libre'] text-center">
              Featured Collections
            </h2>
            
            {/* Decorative geometric element */}
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-2 h-2 rotate-45 bg-[#AD9660]/20"></div>
              <div className="w-2 h-2 rotate-45 bg-[#AD9660]"></div>
              <div className="w-2 h-2 rotate-45 bg-[#AD9660]/20"></div>
            </div>
            
            <p className="text-center text-gray-500 font-light max-w-3xl mx-auto mb-8 md:mb-12 text-sm md:text-base leading-relaxed">
              Explore our curated selection of premium corporate gifts designed to impress your clients and motivate your team.
            </p>
          </div>
          
          {/* Product Grid with Auto-Sliding */}
          <div className="relative mb-6 md:mb-8">
            {/* Only show navigation arrows if not loading and have products */}
            {!isLoading && featuredProducts.length > 0 && (
              <>
                <button 
                  onClick={() => {
                    if (isMobile) {
                      setMobilePageIndex(prev => prev === 0 ? Math.ceil(Math.min(featuredProducts.length, 8) / 4) - 1 : prev - 1);
                    } else {
                      setCurrentSlide(prev => prev === 0 ? 1 : 0);
                    }
                  }}
                  className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-200"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#323433]" />
                </button>
                
                <button 
                  onClick={() => {
                    if (isMobile) {
                      setMobilePageIndex(prev => (prev + 1) % Math.ceil(Math.min(featuredProducts.length, 8) / 4));
                    } else {
                      setCurrentSlide(prev => prev === 0 ? 1 : 0);
                    }
                  }}
                  className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-200"
                  aria-label="Next products"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#323433]" />
                </button>
              </>
            )}

            {/* Mobile and Desktop Views */}
            <div 
              className="overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {isLoading ? (
                // Loading skeleton
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
                  {Array(isMobile ? 4 : 5).fill(0).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 h-40 md:h-64 mb-4"></div>
                      <div className="h-3 md:h-4 bg-gray-200 w-3/4 mb-2"></div>
                      <div className="h-3 md:h-4 bg-gray-200 w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                isMobile ? (
                  // Mobile View (2x2 Grid with Auto-Sliding) - Show only 8 products
                  <div className="grid grid-cols-2 gap-4">
                    {featuredProducts
                      .slice(0, 8) // Limit to 8 products for mobile
                      .slice(mobilePageIndex * 4, mobilePageIndex * 4 + 4)
                      .map((product, index) => {
                        // Use display_image as primary, fallback to first image, then placeholder
                        const displayImage = product.display_image || product.images?.[0];
                        // Use hover_image as hover, fallback to display_image
                        const hoverImage = product.hover_image || product.display_image;
                        
                        return (
                          <Link href={`/products/${product.id}`} key={`mobile-${product.id}`}>
                            <div
                              className="group relative overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02]"
                              style={{ height: '100%' }}
                            >
                              <div className="relative h-32 sm:h-36 mb-3 bg-white">
                                {displayImage ? (
                                  <>
                                    <Image 
                                      src={displayImage}
                                      alt={product.name}
                                      fill
                                      className="w-full h-full object-contain p-2 transition-opacity duration-500 group-hover:opacity-0"
                                    />
                                    {hoverImage && hoverImage !== displayImage && (
                                      <Image
                                        src={hoverImage}
                                        alt={product.name + ' hover'}
                                        fill
                                        className="absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                      />
                                    )}
                                  </>
                                ) : (
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">No image</span>
                                  </div>
                                )}
                                {/* Elegant badge design */}
                                <div className="absolute top-2 left-0">
                                  <div className="bg-white/90 backdrop-blur-sm border-l-2 border-[#AD9660] text-[#323433] font-light text-[10px] px-2 py-1">
                                    Best Seller
                                  </div>
                                </div>
                              </div>

                              {/* Product details with refined typography */}
                              <div className="px-1 flex flex-col flex-1">
                                <h3 className="font-light text-xs text-[#323433] leading-snug line-clamp-2 mb-1 group-hover:text-[#AD9660] transition-colors duration-300">
                                  {product.name}
                                </h3>
                                <span className="text-[8px] text-gray-500 font-light tracking-wide uppercase">corporate gift</span>
                                <div className="mt-2 flex items-center justify-between">
                                  <span className="text-sm font-light text-[#AD9660]">{formatPrice(product)}</span>
                                  <div className="w-4 h-[1px] bg-[#AD9660]/20"></div>
                                </div>
                                
                                {/* MOQ Information */}
                                {product.moq && (
                                  <div className="mt-1 flex items-center text-[8px] text-gray-500">
                                    <Package className="w-2 h-2 mr-1" />
                                    <span>MOQ: {product.moq} {product.moq === 1 ? 'piece' : 'pieces'}</span>
                                  </div>
                                )}
                              </div>

                              {/* Geometric decorative element on hover */}
                              <div className="absolute -bottom-full right-0 w-8 h-8 border border-[#AD9660]/20 rotate-45 group-hover:-translate-y-8 transition-transform duration-500"></div>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : (
                  // Desktop View (Static Grid) - Show all 10 products
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
                    {featuredProducts.map((product, index) => {
                      // Use display_image as primary, fallback to first image, then placeholder
                      const displayImage = product.display_image || product.images?.[0];
                      // Use hover_image as hover, fallback to display_image
                      const hoverImage = product.hover_image || product.display_image;
                      
                      return (
                        <Link href={`/products/${product.id}`} key={product.id}>
                          <div
                            className="group relative overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02]"
                            style={{ minHeight: 280, height: '100%' }}
                          >
                            <div className="relative h-40 md:h-64 mb-3 md:mb-4 bg-white">
                              {displayImage ? (
                                <>
                                  <Image 
                                    src={displayImage}
                                    alt={product.name}
                                    fill
                                    className={`w-full h-full object-contain p-2 transition-opacity duration-500 group-hover:opacity-0`}
                                  />
                                  {hoverImage && hoverImage !== displayImage && (
                                    <Image
                                      src={hoverImage}
                                      alt={product.name + ' hover'}
                                      fill
                                      className={`absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-500 opacity-0 group-hover:opacity-100`}
                                    />
                                  )}
                                </>
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-gray-400 text-xs md:text-base">No image</span>
                                </div>
                              )}
                              {/* Elegant badge design */}
                              <div className="absolute top-2 md:top-4 left-0">
                                <div className="bg-white/90 backdrop-blur-sm border-l-2 border-[#AD9660] text-[#323433] font-light text-[10px] md:text-xs px-2 md:px-4 py-1 md:py-2">
                                  Best Seller
                                </div>
                              </div>
                            </div>

                            {/* Product details with refined typography */}
                            <div className="px-1 md:px-2 flex flex-col flex-1">
                              <h3 className="font-light text-sm md:text-base text-[#323433] leading-snug line-clamp-2 mb-1 md:mb-2 group-hover:text-[#AD9660] transition-colors duration-300">
                                {product.name}
                              </h3>
                              <span className="text-[10px] md:text-xs text-gray-500 font-light tracking-wide uppercase">corporate gift</span>
                              <div className="mt-2 md:mt-3 flex items-center justify-between">
                                <span className="text-sm md:text-lg font-light text-[#AD9660]">{formatPrice(product)}</span>
                                <div className="w-4 md:w-6 h-[1px] bg-[#AD9660]/20"></div>
                              </div>
                              
                              {/* MOQ Information */}
                              {product.moq && (
                                <div className="mt-1 md:mt-2 flex items-center text-[10px] md:text-xs text-gray-500">
                                  <Package className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                                  <span>MOQ: {product.moq} {product.moq === 1 ? 'piece' : 'pieces'}</span>
                                </div>
                              )}
                            </div>

                            {/* Geometric decorative element on hover */}
                            <div className="absolute -bottom-full right-0 w-8 md:w-12 h-8 md:h-12 border border-[#AD9660]/20 rotate-45 group-hover:-translate-y-8 md:group-hover:-translate-y-12 transition-transform duration-500"></div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )
              )}
            </div>
            
            {/* Pagination Dots - Only for mobile view */}
            {!isLoading && featuredProducts.length > 0 && isMobile && (
              <div className="flex justify-center mt-6 gap-1.5">
                {Array.from({ length: Math.ceil(Math.min(featuredProducts.length, 8) / 4) }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                      mobilePageIndex === idx 
                        ? 'bg-[#AD9660] scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setMobilePageIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Dual CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            <Button 
              asChild
              className="bg-[#323433] hover:bg-black text-white px-6 md:px-10 py-2 md:py-6 rounded-md flex items-center gap-2 transition-all duration-300 text-sm md:text-base"
            >
              <Link href="/quote">
                <span>Request Custom Quote</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              className="border-[#323433] text-[#323433] hover:bg-[#323433] hover:text-white px-6 md:px-10 py-2 md:py-6 rounded-md transition-all duration-300 text-sm md:text-base"
            >
              <Link href="/products">
                <span>Browse All Products</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 