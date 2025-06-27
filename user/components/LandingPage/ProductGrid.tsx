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

const ProductGrid: React.FC<ProductGridProps> = ({  products }) => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-full  mx-auto sm:px-24">
        <h2 className="text-2xl md:text-4xl font-normal text-center mx-auto w-full md:w-1/2  text-gray-900  mb-6  font-edu-cursive">Corporate Gifts – India’s Most Trusted Gifting Brand</h2>
        <p className="text-center text-gray-500 font-light  mx-auto mb-6 opacity-80 text-sm md:text-base">
        Looking for unique and premium corporate gift hampers? Explore our top gifting options for employees and clients at affordable prices across India.
      </p>
        <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5  gap-x-4">
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
      className="rounded-xl overflow-hidden flex ml-6 md:ml-0 flex-col pb-4 transition-transform duration-300 hover:scale-105 group"
      style={{ minHeight: 420, maxWidth: 340 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-64 mb-3  ">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-64 object-cover object-center rounded-xl absolute left-0 top-0 transition-all duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <img
          src={hoverImage}
          alt={product.name + ' alt'}
          className={`w-full h-64 object-cover object-center rounded-xl absolute left-0 top-0 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute top-3 left-3 z-10">
          <div className="backdrop-blur-sm bg-white/40 border border-white/30 text-gray-900 font-light text-base px-4  rounded-tr-xl rounded-bl-xl font-sans shadow-sm" style={{letterSpacing: 0.2}}>
            Best Seller
          </div>
        </div>
      </div>
      <div className="px-4 flex flex-col flex-1 transform scale-[0.952] will-change-transform">
        <h3 className="font-normal text-lg text-gray-900 font-sans leading-snug break-words line-clamp-2 text-left">{product.name}</h3>
        <span className="text-sm font-normal text-gray-600  italic">coporate gift</span>
        <span className="text-lg font-light text-gray-900 mb-2 text-left">₹{product.price.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ProductGrid; 