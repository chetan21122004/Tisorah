"use client"

import React, { useState } from 'react';
import { Star, Package } from 'lucide-react';

interface Product {
  name: string;
  image: string;
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

const   ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <section className="py-6 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          {/* Decorative line above title */}
          <div className="w-16 h-[1px] bg-[#AD9660] mb-8"></div>
          
          <h2 className="text-3xl md:text-4xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre'] text-center">
            Corporate Gifts – India's Most Trusted Gifting Brand
          </h2>
          
          {/* Decorative geometric element */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rotate-45 bg-[#AD9660]/20"></div>
            <div className="w-2 h-2 rotate-45 bg-[#AD9660]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#AD9660]/20"></div>
          </div>
          
          <p className="text-center text-gray-500 font-light max-w-3xl mx-auto  text-base leading-relaxed">
            Looking for unique and premium corporate gift hampers? Explore our top gifting options for employees and clients at affordable prices across India.
          </p>
        </div>

        {/* Product Grid with refined spacing and layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} products={products} />
          ))}
        </div>

        {/* Elegant CTA button */}
        <div className="flex justify-center">
          <button className="group relative bg-white hover:bg-[#AD9660] text-[#323433] hover:text-white border border-[#323433] px-12 py-4 rounded-none transition-all duration-300">
            <span className="relative z-10 font-light tracking-wider text-sm uppercase">View All..!</span>
            <div className="absolute inset-0 border border-[#AD9660] -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product; index: number; products: Product[] }> = ({ product, index, products }) => {
  const [hovered, setHovered] = useState(false);
  const nextIndex = (index + 1) % products.length;
  const hoverImage = products[nextIndex].image;
  
  // Format price display based on whether it's a range or single price
  const formatPrice = () => {
    if (product.has_price_range && product.price_min && product.price_max) {
      return (
        <span className="text-lg font-light text-[#AD9660]">
          ₹{product.price_min.toLocaleString()} - ₹{product.price_max.toLocaleString()}
        </span>
      );
    } else {
      return (
        <span className="text-lg font-light text-[#AD9660]">
          ₹{product.price.toLocaleString()}
        </span>
      );
    }
  };
  
  return (
    <div
      className="group relative overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02]"
      style={{ minHeight: 380 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-64 mb-4 bg-white">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-contain p-2 transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <img
          src={hoverImage}
          alt={product.name + ' alt'}
          className={`absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        />
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
          {formatPrice()}
          <div className="w-6 h-[1px] bg-[#AD9660]/20"></div>
        </div>
        
        {/* MOQ Information */}
        {product.moq && (
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <Package className="w-3 h-3 mr-1" />
            <span>MOQ: {product.moq} {product.moq === 1 ? 'piece' : 'pieces'}</span>
          </div>
        )}
      </div>

      {/* Geometric decorative element on hover */}
      <div className="absolute -bottom-full right-0 w-12 h-12 border border-[#AD9660]/20 rotate-45 group-hover:-translate-y-12 transition-transform duration-500"></div>
    </div>
  );
};

export default ProductGrid; 