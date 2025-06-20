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

import Gifting from '@/components/LandingPage/Gifting'
import Testimonials from '@/components/LandingPage/Testimonials'
import React from 'react'
import ProductGrid from '@/components/LandingPage/ProductGrid'
import NewArrival from '@/components/LandingPage/NewArrival'


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
    .slice(0, 8);
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
          <h3 className="text-base md:text-lg font-bold text-black opacity-80 mb-2 text-center">{title}</h3>
          <p className="text-xs md:text-sm font-light text-gray-500 mb-5 text-center">{desc}</p>
          <button className="bg-black text-white rounded-full px-5 md:px-7 py-2 text-xs md:text-sm font-semibold transition hover:bg-white hover:text-black duration-300 w-full md:w-auto">KNOW MORE</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex overflow-x-auto md:overflow-x-visible justify-start md:justify-center gap-4 md:gap-10 my-4 md:my-8 px-4 md:px-0 md:flex-wrap no-scrollbar">
        {giftCategories.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center flex-shrink-0 w-20 md:w-24"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 bg-gray-100 flex items-center justify-center">
              <img
                src={cat.image}
                alt={cat.label}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="mt-2 md:mt-3 text-[10px] md:text-xs font-medium text-gray-800 text-center whitespace-nowrap">{cat.label}</span>
          </div>
        ))}
      </div>

      <HeroSection/>
      <div className="px-4 md:px-0">
        <ProductGrid title="Trending Today" products={trendingProducts} />
      </div>

      {/* Occasion-Wise Gifts Section */}
      <div className="my-8 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-edu-cursive text-center mb-6 md:mb-10">Occasion-Wise Gifts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {occasionGifts.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-24 md:h-28 object-contain rounded-xl transition-transform duration-200 hover:scale-105"
                loading="lazy"
              />
              <span className="mt-2 text-sm md:text-base font-medium text-gray-800 text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Our Offerings Section */}
      <div className="my-8 md:my-16 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-edu-cursive text-center mb-3 md:mb-4">Our Offerings</h2>
        <p className="text-center text-gray-500 font-light max-w-2xl mx-auto mb-6 md:mb-10 text-sm md:text-base px-4">
          Bespoke Gifts and Eco-friendly gifts, meticulously crafted to boost your brand's sophistication.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-6xl">
          {offerings.map((card, idx) => (
            <OfferingCard key={idx} {...card} />
          ))}
        </div>
      </div>

      <div className="layout">
        <div className="hero-section text-center pt-8 flex  gap-4 max-w-6xl items-center justify-center mx-auto flex-col md:flex-row px-2
        ">

          <div className="flex flex-col gap-4 md:w-1/2 w-full ">
          <div className="relative group overflow-hidden  rounded-2xl">
            <img 
              src="https://www.boxupgifting.com/cdn/shop/files/quokkabottles-LGPLafOVhqY-unsplash_copy_222d70ad-99f7-4de2-b07c-56c34b9fc8e4.jpg?v=1744178433" 
              alt="Journal" 
              className="w-full h-[214px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
              <h3 className="text-gray-800 font-medium">Journal</h3>
            </div>
          </div>

          {/* Drinkware Category */}
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src="https://www.boxupgifting.com/cdn/shop/files/quokkabottles-LGPLafOVhqY-unsplash_copy_222d70ad-99f7-4de2-b07c-56c34b9fc8e4.jpg?v=1744178433" 
              alt="Drinkware" 
              className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
              <h3 className="text-gray-800 font-medium">Drinkware</h3>
            </div>
          </div>
          </div>

        <div className="flex flex-col gap-8 md:w-1/2 w-full  ">
        <div>
        <h1 className="text-xl font-light mb-4 font-edu-cursive">Custom-branded gifts that connect with your audience.</h1>
          <button className="bg-[#B5995D] text-white px-8 py-3 rounded-3xl hover:bg-[#9e865a] transition">
            Explore
          </button>
        </div>
        {/* Electronic Gadgets Category */}
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src="https://www.boxupgifting.com/cdn/shop/files/Magnetic_charger_cable_holder_-_1_2_99287279-cc16-4f06-8d3d-8506f6347a50.jpg?v=1744178647" 
              alt="Electronic Gadgets" 
              className="w-full h-[450px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
              <h3 className="text-gray-800 font-medium">Electronic Gadgets</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-1/2 w-full ">
           {/* Coffee & Tea Delights Category */}
           <div className="relative group overflow-hidden rounded-lg">
              <img 
                src="https://www.boxupgifting.com/cdn/shop/files/Tea_ceramic_cups_-_set_of_two_-_2_copy_2f7a4acc-f87d-4526-bd0d-13856992d8d9.jpg?v=1744178455" 
                alt="Coffee & Tea Delights" 
                className="w-full h-[214px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
                <h3 className="text-gray-800 font-medium">Coffee & Tea Delights</h3>
              </div>
            </div>
              {/* Lights & Lamps Category */}
              <div className="relative group overflow-hidden rounded-lg">
              <img 
                src="https://www.boxupgifting.com/cdn/shop/files/joyce-g-3y9ymqvRR_s-unsplash_copy_2accb539-f2c2-4e4b-8997-f7751abc1209.jpg?v=1744178278" 
                alt="Lights & Lamps" 
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
                <h3 className="text-gray-800 font-medium">Lights & Lamps</h3>
              </div>
            </div>
        </div>
        
      </div>
      

    </div>



      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Gifting  />
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
                <h2 className="text-3xl md:text-4xl font-edu-cursive mb-4">Bulk Gifting</h2>
                <p className="text-gray-500 font-light text-sm md:text-base max-w-xl mx-auto md:mx-0 opacity-80">
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
                <h2 className="text-3xl md:text-4xl font-edu-cursive mb-4">WFH Employee Gifting</h2>
                <p className="text-gray-500 font-light text-sm md:text-base max-w-xl mx-auto md:mx-0 opacity-80">
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
                <h2 className="text-3xl md:text-4xl font-edu-cursive mb-4">Positive Company Culture</h2>
                <p className="text-gray-500 font-light text-sm md:text-base max-w-xl mx-auto md:mx-0 opacity-80">
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
                <h2 className="text-3xl md:text-4xl font-edu-cursive mb-4">Brand Recognition</h2>
                <p className="text-gray-500 font-light text-sm md:text-base max-w-xl mx-auto md:mx-0 opacity-80">
                  Connect with your remote family through WFH employee gifts that are unique and utilitarian! Share the company values and foster a sense of belonging with company gifts that show you value and revere your employees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      {testimonials && testimonials.length > 0 && (
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Testimonials testimonials={testimonials} />
        </div>
      )}
      

   

   

    </div>
  )
}
