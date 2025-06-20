"use client"

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface Product {
  name: string;
  image: string;
  price: number;
  discount?: number;
  rating: number;
  reviews: number;
}

interface ProductGridProps {
  title: string;
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto sm:px-4">
        <h2 className="text-5xl font-normal text-center text-gray-900 mb-12 font-edu-cursive">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} products={products} />
          ))}
        </div>
        <div className="flex justify-center ">
          <button className="bg-white border border-black text-black font-bold text-lg px-8 py-3 rounded-full transition hover:bg-[#f5f5f5]">
            View More
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
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col pb-4 transition-transform duration-300 hover:scale-105 group"
      style={{ minHeight: 420, maxWidth: 340 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-64 mb-3">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-64 object-cover object-center rounded-xl absolute left-0 top-0 transition-all duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}
          style={{ background: '#f7f7f7' }}
        />
        <img
          src={hoverImage}
          alt={product.name + ' alt'}
          className={`w-full h-64 object-cover object-center rounded-xl absolute left-0 top-0 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: '#f7f7f7' }}
        />
        <div className="absolute top-3 left-3 z-10">
          <div className="backdrop-blur-sm bg-white/40 border border-white/30 text-gray-900 font-light text-base px-4 py-2 rounded-tr-xl rounded-bl-xl font-sans shadow-sm" style={{letterSpacing: 0.2}}>
            Best Seller
          </div>
        </div>
      </div>
      <div className="px-4 flex flex-col flex-1 transform scale-[0.952] will-change-transform">
        <h3 className="font-normal text-lg text-gray-900 mb-2 font-sans leading-snug break-words line-clamp-2 text-left">{product.name}</h3>
        <span className="text-lg font-normal text-gray-900 mb-2 text-left">₹{product.price.toLocaleString()}</span>
        <div className="flex items-center text-left">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < product.rating ? 'text-[#B8860B] fill-[#B8860B]' : 'text-gray-300'}`}
                strokeWidth={i < product.rating ? 0 : 1.5}
              />
            ))}
          </div>
          <span className="text-base text-gray-700 font-sans mr-1">{product.rating}</span>
          <span className="text-sm text-gray-400 font-sans">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid; 