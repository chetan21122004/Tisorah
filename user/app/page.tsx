import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Star,
  Shield,
  Truck,
  ArrowRight,
  Award,
  Users,
  Package,
  Gift,
  Briefcase,
  Palette,
  MessageSquare,
  Mail,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import HeroSection from "../components/HeroSection"
import { getFeaturedProducts, getLatestProducts, getTestimonials, getCategories, getMainCategories } from "./actions"
import { getAllBlogPosts } from "@/lib/blog-service"
import { format } from 'date-fns'

import Gifting from '@/components/LandingPage/Gifting'
import Testimonials from '@/components/LandingPage/Testimonials'
import ContactForm from '@/components/LandingPage/ContactForm'
import React from 'react'
import ProductGrid from '@/components/LandingPage/ProductGrid'
import NewArrival from '@/components/LandingPage/NewArrival'
import OurClient from "@/components/LandingPage/OurClient"
import BlogCarousel from "@/components/LandingPage/BlogCarousel"
import FeatureSection from "@/components/LandingPage/FeatureSection"


export default async function HomePage() {
  // Fetch trending products from Supabase
  const supabaseProducts = await getFeaturedProducts();
  const trendingProducts = supabaseProducts
    .map((product: any) => ({
      name: product.name,
      image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg',
      price: product.price,
      discount: undefined, // You can calculate discount if you have originalPrice
      rating: product.rating || 0,
      reviews: 0, // Supabase schema does not have reviews, so default to 0
    }))
    .slice(0, 10);
  const latestProductsRaw = await getLatestProducts();
  const latestProducts = latestProductsRaw
    .map((product: any) => ({
      name: product.name,
      image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg',
      price: product.price,
      discount: undefined,
      rating: product.rating || 0,
      reviews: 0,
    }))
    .slice(0, 8);

  const testimonialsRaw = await getTestimonials();
  const testimonials = (testimonialsRaw || []).map((t: any) => ({
    id: t.id,
    name: t.name,
    position: t.position,
    company: t.company,
    avatar_url: t.avatar_url || null,
    rating: t.rating || 5,
    content: t.content,
    product_bought: t.product_bought || '',
    created_at: t.created_at,
  }));

  // Fetch latest blog posts
  const latestBlogPosts = await getAllBlogPosts({ limit: 9 });

  const categories = await getCategories();
  const mainCategories = await getMainCategories();

  // Filter categories for curated section
  const curatedCategories = categories.filter(cat => 
    ['Journal', 'Drinkware', 'Electronic Gadgets', 'Coffee & Tea Delights', 'Lights & Lamps'].includes(cat.name)
  ).map(cat => ({
    name: cat.name,
    image: cat.image_url || '/placeholder.jpg',
    slug: cat.slug
  }));

  const corporateOccasions = [
    {
      label: 'Employee Onboarding',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Employee_Onboarding_aeb3ed63-0ceb-4d55-9058-136583b8e7c1.png?v=1736240876',
    },
    {
      label: 'Work Anniversary',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Work_Anniversary.png?v=1736240917',
    },
    {
      label: 'Rewards & Recognition',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Rewards_and_Recognition.png?v=1736240932',
    },
    {
      label: 'Client Appreciation',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Client_Appreciation_7f2b79cc-0947-4a67-b7cf-cab0a5c14e68.png?v=1736240974',
    },
    {
      label: 'Corporate Events',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Corporate_Events_7bf08475-18f0-4df1-9d0f-74630cacf7bd.png?v=1736241000',
    },
    {
      label: 'Team Building',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Employee_Onboarding_aeb3ed63-0ceb-4d55-9058-136583b8e7c1.png?v=1736240876',
    },
  ];

  // Get main categories for offerings section
  const offerings = mainCategories.slice(0, 3).map(cat => ({
    image: cat.image_url || '/placeholder.jpg',
    title: cat.name,
    desc: cat.description || `Premium ${cat.name.toLowerCase()} for your organization.`
  }));

  // Updated occasion-wise gifts to focus on corporate occasions
  const occasionGifts = [
    {
      label: 'Employee Onboarding',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Employee_Onboarding_aeb3ed63-0ceb-4d55-9058-136583b8e7c1.png?v=1736240876',
    },
    {
      label: 'Work Anniversary',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Work_Anniversary.png?v=1736240917',
    },
    {
      label: 'Rewards & Recognition',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Rewards_and_Recognition.png?v=1736240932',
    },
    {
      label: 'Client Appreciation',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Client_Appreciation_7f2b79cc-0947-4a67-b7cf-cab0a5c14e68.png?v=1736240974',
    },
    {
      label: 'Corporate Events',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Corporate_Events_7bf08475-18f0-4df1-9d0f-74630cacf7bd.png?v=1736241000',
    },
    {
      label: 'Team Building',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Employee_Onboarding_aeb3ed63-0ceb-4d55-9058-136583b8e7c1.png?v=1736240876',
    },
  ];

  // Updated offerings to focus on corporate solutions
  const offeringsSection = [
    {
      image: 'https://corporategiftsbyconfetti.in/cdn/shop/files/Exemplary.png?v=1713181877&width=400',
      title: 'Corporate Merchandise',
      desc: 'Premium branded merchandise and promotional items for your organization.',
    },
    {
      image: 'https://corporategiftsbyconfetti.in/cdn/shop/files/KeepRocking.png?v=1713177837&width=400',
      title: 'Recognition Awards',
      desc: 'Elegant awards and trophies to celebrate achievements and milestones.',
    },
    {
      image: 'https://corporategiftsbyconfetti.in/cdn/shop/files/WorkEssentials.png?v=1713001095&width=400',
      title: 'Welcome Kits',
      desc: 'Thoughtfully curated onboarding kits to welcome new team members.',
    },
  ];

  // Card component for offerings
  function OfferingCard({ image, title, desc }: { image: string; title: string; desc: string }) {
    return (
      <div className="flex flex-col items-center justify-center bg-white shadow-sm p-4 md:p-6 md:hover:scale-[1.05] transition-all duration-300 w-full md:w-96 mx-auto rounded-2xl">
        <img src={image} alt={title} className="w-full h-40 md:h-48 object-cover rounded-xl" />
        <div className="flex flex-col items-center px-2 md:px-4 py-4">
          <h3 className="text-base md:text-lg font-serif text-black opacity-80 mb-2 text-center">{title}</h3>
          <p className="text-xs md:text-sm text-gray-500 mb-5 text-center">{desc}</p>
          <button className="bg-black text-white rounded-full px-5 md:px-7 py-2 text-xs md:text-sm font-medium transition hover:bg-white hover:text-black duration-300 w-full md:w-auto">KNOW MORE</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      <HeroSection />
      <div className="px-4 md:px-0">
        <ProductGrid title="Trending Today" products={trendingProducts} />
      </div>

      <section className="py-16 bg-[#F4F4F4]/30 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 border border-[#AD9660]/5 rotate-45 -translate-y-1/2 translate-x-1/2 rounded-[30%]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 border border-[#AD9660]/5 rotate-45 translate-y-1/2 -translate-x-1/2 rounded-[30%]"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#AD9660] to-transparent mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre'] text-center">
              Curated Gift Categories
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto font-light mb-10">
              Custom-branded gifts that connect with your audience
            </p>
          </div>
          
          <div className="hero-section text-center flex gap-6 max-w-6xl items-center justify-center mx-auto flex-col md:flex-row px-2">
            <div className="flex flex-col gap-6 md:w-1/2 w-full">
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="https://www.boxupgifting.com/cdn/shop/files/quokkabottles-LGPLafOVhqY-unsplash_copy_222d70ad-99f7-4de2-b07c-56c34b9fc8e4.jpg?v=1744178433"
                  alt="Journal"
                  className="w-full h-[214px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/70 via-[#323433]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-light text-xl font-['Frank_Ruhl_Libre']">Journal</h3>
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-[#AD9660] text-xs tracking-wider font-light">Explore</span>
                      <div className="ml-2 w-4 h-[1px] bg-[#AD9660] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-[#AD9660]/0 group-hover:border-[#AD9660]/20 transition-all duration-500"></div>
              </div>

              {/* Drinkware Category */}
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="https://www.boxupgifting.com/cdn/shop/files/quokkabottles-LGPLafOVhqY-unsplash_copy_222d70ad-99f7-4de2-b07c-56c34b9fc8e4.jpg?v=1744178433"
                  alt="Drinkware"
                  className="w-full h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/70 via-[#323433]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-light text-xl font-['Frank_Ruhl_Libre']">Drinkware</h3>
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-[#AD9660] text-xs tracking-wider font-light">Explore</span>
                      <div className="ml-2 w-4 h-[1px] bg-[#AD9660] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-[#AD9660]/0 group-hover:border-[#AD9660]/20 transition-all duration-500"></div>
              </div>
            </div>

            <div className="flex flex-col gap-8 md:w-1/2 w-full">
              <div className="text-left">
                <h3 className="text-2xl mb-4 font-light text-[#323433] font-['Frank_Ruhl_Libre']">Custom-branded gifts that connect with your audience.</h3>
                <button className="bg-[#AD9660] text-white px-8 py-3 rounded-full hover:bg-[#9e865a] transition-all duration-300 flex items-center group">
                  <span className="mr-2">Explore Collection</span>
                  <div className="w-4 h-[1px] bg-white transform transition-all duration-300 group-hover:w-6"></div>
                </button>
              </div>
              {/* Electronic Gadgets Category */}
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="https://www.boxupgifting.com/cdn/shop/files/Magnetic_charger_cable_holder_-_1_2_99287279-cc16-4f06-8d3d-8506f6347a50.jpg?v=1744178647"
                  alt="Electronic Gadgets"
                  className="w-full h-[450px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/70 via-[#323433]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-light text-xl font-['Frank_Ruhl_Libre']">Electronic Gadgets</h3>
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-[#AD9660] text-xs tracking-wider font-light">Explore</span>
                      <div className="ml-2 w-4 h-[1px] bg-[#AD9660] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-[#AD9660]/0 group-hover:border-[#AD9660]/20 transition-all duration-500"></div>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:w-1/2 w-full">
              {/* Coffee & Tea Delights Category */}
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="https://www.boxupgifting.com/cdn/shop/files/Tea_ceramic_cups_-_set_of_two_-_2_copy_2f7a4acc-f87d-4526-bd0d-13856992d8d9.jpg?v=1744178455"
                  alt="Coffee & Tea Delights"
                  className="w-full h-[214px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/70 via-[#323433]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-light text-xl font-['Frank_Ruhl_Libre']">Coffee & Tea Delights</h3>
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-[#AD9660] text-xs tracking-wider font-light">Explore</span>
                      <div className="ml-2 w-4 h-[1px] bg-[#AD9660] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-[#AD9660]/0 group-hover:border-[#AD9660]/20 transition-all duration-500"></div>
              </div>
              {/* Lights & Lamps Category */}
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="https://www.boxupgifting.com/cdn/shop/files/joyce-g-3y9ymqvRR_s-unsplash_copy_2accb539-f2c2-4e4b-8997-f7751abc1209.jpg?v=1744178278"
                  alt="Lights & Lamps"
                  className="w-full h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/70 via-[#323433]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-light text-xl font-['Frank_Ruhl_Libre']">Lights & Lamps</h3>
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-[#AD9660] text-xs tracking-wider font-light">Explore</span>
                      <div className="ml-2 w-4 h-[1px] bg-[#AD9660] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-[#AD9660]/0 group-hover:border-[#AD9660]/20 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="">
        <Gifting />
      </div>

      {/* Our Clients Section */}
      <div className="bg-white">
        <OurClient />
      </div>

      {/* Blog Section */}
      <BlogCarousel posts={latestBlogPosts} />

      {/* Features Section */}
  
      {/* Contact Form Section */}
      <ContactForm />

      {testimonials && testimonials.length > 0 && (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Testimonials testimonials={testimonials} />
        </div>
      )}

    
    </div>
  )
}
