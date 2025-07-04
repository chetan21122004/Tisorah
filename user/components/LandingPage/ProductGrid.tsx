"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Star, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { preserveScroll } from '@/lib/utils';

interface Product {
  name: string;
  image: string;
  display_image?: string | null;
  hover_image?: string | null;
  images?: string[] | null;
  price: number;
  price_min?: number | null;
  price_max?: number | null;
  has_price_range?: boolean | null;
  discount?: number;
  rating: number;
  reviews: number;
  moq?: number | null;
}

interface ProductGridProps {
  title: string;
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [mobilePageIndex, setMobilePageIndex] = useState(0);
  const isMobile = useIsMobile();
  const [isPaused, setIsPaused] = useState(false);
  
  // Calculate total pages for mobile view - show max 8 products on mobile
  const mobileProducts = products.slice(0, 8);
  const totalMobilePages = Math.ceil(mobileProducts.length / 4);
  
  // Mobile pagination navigation
  const nextMobilePage = () => {
    setMobilePageIndex((prev) => (prev + 1) % totalMobilePages);
  };
  
  const prevMobilePage = () => {
    setMobilePageIndex((prev) => (prev === 0 ? totalMobilePages - 1 : prev - 1));
  };
  
  // Auto-slide functionality - only for mobile
  useEffect(() => {
    // Completely disable auto-sliding to prevent scroll issues
    return;
    
    /* Original code commented out
    // Disable auto-sliding on mobile to prevent scroll issues
    if (!isMobile || isPaused || mobileProducts.length === 0) return;
    
    // Use setTimeout instead of interval for better control
    const autoSlideTimer = setTimeout(() => {
      // Store scroll position before animation
      const restoreScroll = preserveScroll();
      
      // Use requestAnimationFrame for smoother animation
      window.requestAnimationFrame(() => {
        nextMobilePage();
        
        // Restore scroll position after state update
        if (restoreScroll) {
          setTimeout(restoreScroll, 10);
        }
      });
    }, 8000); // Increase interval to reduce frequency
    
    return () => clearTimeout(autoSlideTimer);
    */
  }, [isPaused, isMobile, mobileProducts.length]);
  
  // Get visible products for mobile
  const mobileVisibleProducts = mobileProducts.slice(mobilePageIndex * 4, mobilePageIndex * 4 + 4);

  return (
    <section className="py-6 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8 md:mb-12">
          {/* Decorative line above title */}
          <div className="w-12 md:w-16 h-[1px] bg-[#AD9660] mb-6 md:mb-8"></div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#323433] mb-3 md:mb-4 font-['Frank_Ruhl_Libre'] text-center">
            Corporate Gifts – India's Most Trusted Gifting Brand
          </h2>
          
          {/* Decorative geometric element */}
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-2 h-2 rotate-45 bg-[#AD9660]/20"></div>
            <div className="w-2 h-2 rotate-45 bg-[#AD9660]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#AD9660]/20"></div>
          </div>
        </div>

        {/* Mobile Grid (2x2) with Auto-Sliding */}
        {isMobile ? (
          <div 
            className="mb-8 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Navigation Arrows */}
            <button 
              onClick={prevMobilePage}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-4 h-4 text-[#323433]" />
            </button>
            
            <button 
              onClick={nextMobilePage}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200"
              aria-label="Next products"
            >
              <ChevronRight className="w-4 h-4 text-[#323433]" />
            </button>
            
            <div className="overflow-hidden">
              <div className="grid grid-cols-2 gap-4">
                {mobileVisibleProducts.map((product, index) => (
                  <ProductCard 
                    key={`${mobilePageIndex}-${index}`} 
                    product={product} 
                    index={index} 
                    products={mobileProducts} 
                    isMobile={true} 
                  />
                ))}
              </div>
            </div>
            
            {/* Pagination Dots for mobile */}
            {totalMobilePages > 1 && (
              <div className="flex justify-center mt-6 gap-1.5">
                {Array.from({ length: totalMobilePages }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      mobilePageIndex === idx ? 'bg-[#AD9660] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setMobilePageIndex(idx)}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          // Desktop Static Grid - Show all products
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map((product, index) => (
              <ProductCard 
                key={index} 
                product={product} 
                index={index} 
                products={products} 
                isMobile={false} 
              />
            ))}
          </div>
        )}

        {/* Elegant CTA button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <button className="group relative bg-white hover:bg-[#AD9660] text-[#323433] hover:text-white border border-[#323433] px-8 md:px-12 py-3 md:py-4 rounded-none transition-all duration-300">
            <span className="relative z-10 font-light tracking-wider text-xs md:text-sm uppercase">View All..!</span>
            <div className="absolute inset-0 border border-[#AD9660] -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  index: number;
  products: Product[];
  isMobile: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, products, isMobile }) => {
  const [hovered, setHovered] = useState(false);
  
  // Use display_image as primary, fallback to image prop, then first additional image
  const displayImage = product.display_image || product.image || product.images?.[0];
  // Use hover_image as hover, fallback to display_image
  const hoverImage = product.hover_image || product.display_image || product.image;
  
  // Format price display based on whether it's a range or single price
  const formatPrice = () => {
    if (product.has_price_range && product.price_min && product.price_max) {
      return (
        <span className="text-sm md:text-lg font-light text-[#AD9660]">
          ₹{product.price_min.toLocaleString()} - ₹{product.price_max.toLocaleString()}
        </span>
      );
    } else {
      return (
        <span className="text-sm md:text-lg font-light text-[#AD9660]">
          ₹{product.price.toLocaleString()}
        </span>
      );
    }
  };
  
  return (
    <div
      className="group relative overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02] h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative ${isMobile ? 'h-32 sm:h-36' : 'h-40 sm:h-48 md:h-64'} mb-3 md:mb-4 bg-white`}>
        {displayImage ? (
          <>
            <img
              src={displayImage}
              alt={product.name}
              className={`w-full h-full object-contain p-2 transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}
            />
            {hoverImage && hoverImage !== displayImage && (
              <img
                src={hoverImage}
                alt={product.name + ' hover'}
                className={`absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
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
        <h3 className={`font-light ${isMobile ? 'text-xs' : 'text-sm md:text-base'} text-[#323433] leading-snug line-clamp-2 mb-1 md:mb-2 group-hover:text-[#AD9660] transition-colors duration-300`}>
          {product.name}
        </h3>
        <span className={`${isMobile ? 'text-[8px]' : 'text-[10px] md:text-xs'} text-gray-500 font-light tracking-wide uppercase`}>
          corporate gift
        </span>
        <div className="mt-2 md:mt-3 flex items-center justify-between">
          {formatPrice()}
          <div className="w-4 md:w-6 h-[1px] bg-[#AD9660]/20"></div>
        </div>
        
        {/* MOQ Information */}
        {product.moq && (
          <div className={`mt-1 md:mt-2 flex items-center ${isMobile ? 'text-[8px]' : 'text-[10px] md:text-xs'} text-gray-500`}>
            <Package className={`${isMobile ? 'w-2 h-2' : 'w-2 h-2 md:w-3 md:h-3'} mr-1`} />
            <span>MOQ: {product.moq} {product.moq === 1 ? 'piece' : 'pieces'}</span>
          </div>
        )}
      </div>

      {/* Geometric decorative element on hover */}
      <div className="absolute -bottom-full right-0 w-8 md:w-12 h-8 md:h-12 border border-[#AD9660]/20 rotate-45 group-hover:-translate-y-8 md:group-hover:-translate-y-12 transition-transform duration-500"></div>
    </div>
  );
};

export default ProductGrid; 