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
import { getFeaturedProducts, getLatestProducts, getTestimonials } from "./actions"
import { getAllBlogPosts } from "@/lib/blog-service"
import { format } from 'date-fns'

import Gifting from '@/components/LandingPage/Gifting'
import Testimonials from '@/components/LandingPage/Testimonials'
import ContactForm from '@/components/LandingPage/ContactForm'
import React from 'react'
import ProductGrid from '@/components/LandingPage/ProductGrid'
import NewArrival from '@/components/LandingPage/NewArrival'
import OurClient from "@/components/LandingPage/OurClient"


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
  const latestBlogPosts = await getAllBlogPosts({ limit: 3 });

  const services = [
    {
      title: "Bespoke Corporate Solutions",
      description: "Tailored gifting programs that reflect your organization's unique identity and values",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      link: "/services/corporate-gifting",
      icon: <Gift className="w-8 h-8 text-secondary" />,
      clients: "500+ Distinguished Clients",
      rating: 4.9,
    },
    {
      title: "Volume Excellence Program",
      description: "Sophisticated solutions for large-scale requirements with exclusive pricing advantages",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=center",
      link: "/bulk-orders",
      icon: <Package className="w-8 h-8 text-accent" />,
      clients: "350+ Enterprise Partners",
      rating: 4.8,
    },
    {
      title: "Artisanal Customization",
      description: "Meticulous personalization services that transform gifts into meaningful brand ambassadors",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
      link: "/customization",
      icon: <Palette className="w-8 h-8 text-neutral-500" />,
      clients: "450+ Satisfied Partners",
      rating: 4.9,
    },
    {
      title: "Recognition Excellence",
      description: "Comprehensive programs that celebrate achievements and foster organizational culture",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=center",
      link: "/services/recognition",
      icon: <Award className="w-8 h-8 text-secondary" />,
      clients: "300+ Corporate Programs",
      rating: 4.8,
    },
  ]

  const giftCategories = [
    {
      label: 'Employee Welcome kits',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Eco Friendly Gifts',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Client Gifts',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Employee Gifts',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Drinkware',
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Promotional Gifts',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80',
    },
  ]

  // Occasion-wise gifts data
  const occasionGifts = [
    {
      label: 'Birthday',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Happy_birthday-rafiki.png?v=1736240900',
    },
    {
      label: 'Work Anniversary',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Work_Anniversary.png?v=1736240917',
    },
    {
      label: 'Rewards and Recognition',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Rewards_and_Recognition.png?v=1736240932',
    },
    {
      label: 'Employee Onboarding',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Employee_Onboarding_aeb3ed63-0ceb-4d55-9058-136583b8e7c1.png?v=1736240876',
    },
    {
      label: 'Client Appreciation',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Client_Appreciation_7f2b79cc-0947-4a67-b7cf-cab0a5c14e68.png?v=1736240974',
    },
    {
      label: 'Events',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Corporate_Events_7bf08475-18f0-4df1-9d0f-74630cacf7bd.png?v=1736241000',
    },
  ];

  // Our Offerings data
  const offerings = [
    {
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
      title: 'Make Your Gift Hamper',
      desc: 'Tailor your corporate gifting with premium products and customisation.',
    },
    {
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
      title: 'Promotional Gifts',
      desc: 'Make a difference with promotional gifts that feature elegance, luxury and functionality.',
    },
    {
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      title: 'Sustainable Gifts',
      desc: 'Choose gifts with our Eco-Friendly gifts that leave a positive impact.',
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



      {/* Our Offerings Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#F4F4F4] rounded-[40%] -translate-x-32 -translate-y-32 blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-[#F4F4F4] rounded-[40%] translate-x-48 translate-y-48 blur-3xl opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#AD9660]/10 to-transparent"></div>
        </div>

        <div className="container relative mx-auto px-4 ">
          <div className="flex flex-col items-center mb-20">


            <h2 className="text-4xl md:text-5xl font-light text-[#323433] mb-6 font-['Frank_Ruhl_Libre'] text-center leading-tight">
              Our Offerings
            </h2>

            <p className="text-gray-600 text-center max-w-2xl mx-auto font-light leading-relaxed">
              Explore our curated collection of premium corporate gifts, each designed to make a lasting impression
            </p>
          </div>

          {/* Offerings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
              >
                <div className="relative h-80 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image
                    src={offering.image}
                    alt={offering.title}
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light text-[#323433] mb-3 font-['Frank_Ruhl_Libre']">
                    {offering.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    {offering.desc}
                  </p>
                  <div className="flex items-center">
                    <span className="text-[#AD9660] text-sm tracking-wider font-light">Explore More</span>
                    <div className="ml-3 w-6 h-[1px] bg-[#AD9660] transform transition-transform duration-300 group-hover:w-8"></div>
                  </div>
                </div>

                {/* Decorative border effect */}
                <div className="absolute inset-0 rounded-2xl border border-[#AD9660]/0 group-hover:border-[#AD9660]/20 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>


{/*  Gifting categories */}
      <section className="py-16 bg-[#F4F4F4] relative overflow-hidden">
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

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Gifting />
      </div>



      {/* Our Clients Section */}
      <div className="bg-white">
        <OurClient />
      </div>

      {/* Blog Section */}
      <div className="py-12 md:py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-2">Tisorah Insights</h2>
              <p className="text-gray-500 max-w-xl">
                Expert perspectives on corporate gifting strategies and industry trends.
              </p>
            </div>
            <Link href="/blog">
              <button className="mt-4 md:mt-0 bg-black text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-[#9e865a] transition-colors">
                View All Articles
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {latestBlogPosts.length > 0 ? (
              latestBlogPosts.map((post, idx) => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-200 h-full">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="px-3 py-1 text-xs font-medium bg-[#AD9660]/10 text-[#AD9660] rounded-full">
                          {post.category}
                        </span>
                        <span className="text-neutral-500 text-xs">{post.reading_time}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1E2A47] mb-2 group-hover:text-[#AD9660] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center pt-3 border-t border-neutral-100">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                          <img
                            src={post.author_image}
                            alt={post.author}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1E2A47]">{post.author}</p>
                          <p className="text-xs text-neutral-500">
                            {format(post.published_at, 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback if no posts are fetched
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No blog posts available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-8 md:py-12 space-y-12 md:space-y-24">
        <div className="max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6">
          {/* Bulk Gifting Section */}
          <div className="flex flex-col items-center max-w-5xl mx-auto mb-12 md:mb-24">
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src="https://www.boxupgifting.com/cdn/shop/files/Bulk_Corporate_Gifting.jpg?v=1725348252"
                    alt="Bulk Gifting"
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl shadow-sm"
                  />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-serif mb-4">Bulk Gifting</h2>
                  <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto md:mx-0 opacity-80">
                    We bring to the table a range of <span className="font-medium">bulk corporate gifts</span> for employees that will redefine your relationship with them. A brand-new way to cherish, honour and acknowledge your employees that is hassle free and premium!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WFH Employee Gifting Section */}
          <div className="flex flex-col items-center max-w-5xl mx-auto mb-12 md:mb-24">
            <div className="w-full">
              <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src="https://www.boxupgifting.com/cdn/shop/files/WFH_Employee_Gifting.jpg?v=1725348290"
                    alt="WFH Employee Gifting"
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl shadow-sm"
                  />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-serif mb-4">WFH Employee Gifting</h2>
                  <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto md:mx-0 opacity-80">
                    Connect with your remote family through WFH employee gifts that are unique and utilitarian! Share the company values and foster a sense of belonging with company gifts that show you value and revere your employees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Positive Company Culture Section */}
          <div className="flex flex-col items-center max-w-5xl mx-auto mb-12 md:mb-24">
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src="https://www.boxupgifting.com/cdn/shop/files/Positive_Company_Culture.jpg"
                    alt="Positive Company Culture"
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl shadow-sm"
                  />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-serif mb-4">Positive Company Culture</h2>
                  <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto md:mx-0 opacity-80">
                    We bring to the table a range of <span className="font-medium">bulk corporate gifts</span> for employees that will redefine your relationship with them. A brand-new way to cherish, honour and acknowledge your employees that is hassle free and premium!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Recognition Section */}
          <div className="flex flex-col items-center max-w-5xl mx-auto">
            <div className="w-full">
              <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src="https://www.boxupgifting.com/cdn/shop/files/Brand_Recognition.jpg"
                    alt="Brand Recognition"
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl shadow-sm"
                  />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-serif mb-4">Brand Recognition</h2>
                  <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto md:mx-0 opacity-80">
                    Connect with your remote family through WFH employee gifts that are unique and utilitarian! Share the company values and foster a sense of belonging with company gifts that show you value and revere your employees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


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
