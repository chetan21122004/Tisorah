"use client"

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface Product {
  name: string;
  image: string;
  price: number;
  discount?: number;
  rating?: number;
  reviews?: number;
}

interface NewArrivalProps {
  products: Product[];
}

const NewArrival: React.FC<NewArrivalProps> = ({ products }) => {
  // Repeat products to always show 8 cards
  let repeated: Product[] = [];
  if (products.length > 0) {
    while (repeated.length < 8) {
      for (let i = 0; i < products.length && repeated.length < 8; i++) {
        repeated.push(products[i]);
      }
    }
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-normal text-center text-gray-900 mb-12 font-edu-cursive">New Arrival Gifts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
          {repeated.map((product, index) => (
            <NewArrivalCard key={index} product={product} index={index} products={repeated} />
          ))}
        </div>
      </div>
    </section>
  );
};

const NewArrivalCard: React.FC<{ product: Product; index: number; products: Product[] }> = ({ product, index, products }) => {
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
      </div>
      <div className="px-4 flex flex-col flex-1 transform scale-[0.952] will-change-transform">
        <h3 className="font-normal text-lg text-gray-900 mb-2 font-sans leading-snug break-words line-clamp-2 text-left">{product.name}</h3>
        <span className="text-lg font-normal text-gray-900 mb-2 text-left">₹{product.price.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default NewArrival; 