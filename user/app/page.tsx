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
import ContactForm from '@/components/LandingPage/ContactForm'
import React from 'react'
import ProductGrid from '@/components/LandingPage/ProductGrid'
import NewArrival from '@/components/LandingPage/NewArrival'
import OurClient from "@/components/LandingPage/OurClient"
import { format } from "date-fns"
import { getAllBlogPosts } from "@/lib/blog-service"
import { EXAMPLE_BLOGS } from "@/utils/blog-constants"
import { ArtDecoBorder, GeometricCornerAccent, LinearPatternBackground, PatternDivider } from "@/components/PatternBackground"


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

  // Fetch blog posts
  const fetchedBlogs = await getAllBlogPosts({ limit: 3 });
  const blogs = fetchedBlogs.length > 0 ? fetchedBlogs : EXAMPLE_BLOGS.slice(0, 3);

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

  // Main product categories showcasing Tisorah's extensive range
  const productCategories = [
    {
      name: "Coasters",
      image: "https://images.unsplash.com/photo-1607213371167-50b4da219081?q=80&w=600&auto=format&fit=crop",
      description: "Premium cork coasters in various designs including Natural, Chocochip, Olive, and UV printed collections.",
      link: "/categories/coasters"
    },
    {
      name: "Gifting Combos & Hampers",
      image: "https://images.unsplash.com/photo-1575384043001-f37f48135558?q=80&w=600&auto=format&fit=crop",
      description: "Pre-curated and customizable gift sets featuring cork diaries, coasters, seed pens, and premium accessories.",
      link: "/categories/hampers"
    },
    {
      name: "Diaries & Notebooks",
      image: "https://images.unsplash.com/photo-1598367815716-89be7df82844?q=80&w=600&auto=format&fit=crop",
      description: "Cork Premium Diaries, planners, and notebooks in various styles and sizes with customization options.",
      link: "/categories/diaries"
    },
    {
      name: "Desktop & Office Accessories",
      image: "https://images.unsplash.com/photo-1616628188539-a154ee70b5c0?q=80&w=600&auto=format&fit=crop",
      description: "Elegant cork desk organizers, pen holders, mouse pads, and professional accessories.",
      link: "/categories/office"
    },
    {
      name: "Planters & Home Decor",
      image: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?q=80&w=600&auto=format&fit=crop",
      description: "Decorative cork planters, tabletop designs, and unique home decor items for every space.",
      link: "/categories/planters"
    },
    {
      name: "Drinkware & Bottles",
      image: "https://images.unsplash.com/photo-1609709295838-8ea766ead359?q=80&w=600&auto=format&fit=crop",
      description: "Sophisticated Borosil glass bottles with veneer, vacuum mugs, and elegant drinkware.",
      link: "/categories/drinkware"
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
      {/* Hero Section */}
      <HeroSection/>
      
      {/* Product Categories Showcase */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">Discover Our Collections</h2>
              <p className="text-center text-gray-500 max-w-2xl mb-4">
                Explore our meticulously curated product categories, crafted with sustainable materials and elegant design
              </p>
              <LinearPatternBackground className="w-32 h-1 mx-auto"></LinearPatternBackground>
            </div>

            {/* Featured Categories - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {productCategories.slice(0, 3).map((category, idx) => (
                <Link href={category.link} key={idx}>
                  <ArtDecoBorder className="h-full bg-white overflow-hidden transition-all hover:shadow-md group">
                    <div className="p-0 h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <Image 
                          src={category.image} 
                          alt={category.name} 
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-medium px-6 py-2 border border-white/50 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Explore Collection
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center mb-2">
                          <GeometricCornerAccent className="h-4 w-4 text-secondary mr-2" />
                          <h3 className="font-serif text-lg">{category.name}</h3>
                        </div>
                        <p className="text-gray-500 text-sm flex-grow">{category.description}</p>
                      </div>
                    </div>
                  </ArtDecoBorder>
                </Link>
              ))}
            </div>

            {/* Featured Categories - Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {productCategories.slice(3, 6).map((category, idx) => (
                <Link href={category.link} key={idx}>
                  <ArtDecoBorder className="h-full bg-white overflow-hidden transition-all hover:shadow-md group">
                    <div className="p-0 h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <Image 
                          src={category.image} 
                          alt={category.name} 
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-medium px-6 py-2 border border-white/50 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Explore Collection
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center mb-2">
                          <GeometricCornerAccent className="h-4 w-4 text-secondary mr-2" />
                          <h3 className="font-serif text-lg">{category.name}</h3>
                        </div>
                        <p className="text-gray-500 text-sm flex-grow">{category.description}</p>
                      </div>
                    </div>
                  </ArtDecoBorder>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/collections">
                <Button variant="outline" className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white px-8 group">
                  View All Collections
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>
      
      {/* Trending Products Section */}
      <div className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <ProductGrid title="Trending Today" products={trendingProducts} />
        </div>
      </div>
      
      {/* Our Offerings Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">Our Offerings</h2>
              <p className="text-center text-gray-500 max-w-2xl mb-4">
                Bespoke Gifts and Eco-friendly gifts, meticulously crafted to boost your brand's sophistication.
              </p>
              <LinearPatternBackground className="w-32 h-1 mx-auto"></LinearPatternBackground>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offerings.map((card, idx) => (
                <ArtDecoBorder key={idx} className="bg-white overflow-hidden transition-all hover:shadow-md">
                  <div className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={card.image} 
                        alt={card.title} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-serif text-lg mb-2">{card.title}</h3>
                      <p className="text-gray-500 text-sm mb-4">{card.desc}</p>
                      <button className="bg-black text-white rounded-full px-5 md:px-7 py-2 text-xs md:text-sm font-medium transition hover:bg-white hover:text-black duration-300 w-full md:w-auto">KNOW MORE</button>
                    </div>
                  </div>
                </ArtDecoBorder>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Categories Display */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">Product Categories</h2>
              <LinearPatternBackground className="w-32 h-1 mx-auto"></LinearPatternBackground>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4">
                <div className="relative group overflow-hidden rounded-2xl">
                  <Image 
                    src="https://www.boxupgifting.com/cdn/shop/files/quokkabottles-LGPLafOVhqY-unsplash_copy_222d70ad-99f7-4de2-b07c-56c34b9fc8e4.jpg?v=1744178433" 
                    alt="Journal" 
                    width={500}
                    height={300}
                    className="w-full h-[214px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
                    <h3 className="text-gray-800 font-medium">Journal</h3>
                  </div>
                </div>
                
                <div className="relative group overflow-hidden rounded-lg">
                  <Image 
                    src="https://www.boxupgifting.com/cdn/shop/files/quokkabottles-LGPLafOVhqY-unsplash_copy_222d70ad-99f7-4de2-b07c-56c34b9fc8e4.jpg?v=1744178433" 
                    alt="Drinkware" 
                    width={500}
                    height={500}
                    className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
                    <h3 className="text-gray-800 font-medium">Drinkware</h3>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-xl mb-4 font-serif">Custom-branded gifts that connect with your audience.</h3>
                  <Button variant="default" className="bg-secondary hover:bg-secondary/90 text-white rounded-full">
                    Explore
                  </Button>
                </div>
                <div className="relative group overflow-hidden rounded-lg">
                  <Image 
                    src="https://www.boxupgifting.com/cdn/shop/files/Magnetic_charger_cable_holder_-_1_2_99287279-cc16-4f06-8d3d-8506f6347a50.jpg?v=1744178647" 
                    alt="Electronic Gadgets" 
                    width={500}
                    height={600}
                    className="w-full h-[450px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
                    <h3 className="text-gray-800 font-medium">Electronic Gadgets</h3>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="relative group overflow-hidden rounded-lg">
                  <Image 
                    src="https://www.boxupgifting.com/cdn/shop/files/Tea_ceramic_cups_-_set_of_two_-_2_copy_2f7a4acc-f87d-4526-bd0d-13856992d8d9.jpg?v=1744178455" 
                    alt="Coffee & Tea Delights" 
                    width={500}
                    height={300}
                    className="w-full h-[214px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
                    <h3 className="text-gray-800 font-medium">Coffee & Tea Delights</h3>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-lg">
                  <Image 
                    src="https://www.boxupgifting.com/cdn/shop/files/joyce-g-3y9ymqvRR_s-unsplash_copy_2accb539-f2c2-4e4b-8997-f7751abc1209.jpg?v=1744178278" 
                    alt="Lights & Lamps" 
                    width={500}
                    height={500}
                    className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
                    <h3 className="text-gray-800 font-medium">Lights & Lamps</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   
      
      {/* Our Clients Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <OurClient />
        </div>
      </section>
      
      {/* Specialty Gifting Solutions */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">Specialty Gifting Solutions</h2>
              <LinearPatternBackground className="w-32 h-1 mx-auto"></LinearPatternBackground>
            </div>
            
            {/* Bulk Gifting Section */}
            <div className="flex flex-col items-center max-w-5xl mx-auto mb-16">
              <div className="w-full">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                  <div className="w-full md:w-1/2">
                    <ArtDecoBorder className="p-0">
                      <Image 
                        src="https://www.boxupgifting.com/cdn/shop/files/Bulk_Corporate_Gifting.jpg?v=1725348252"
                        alt="Bulk Gifting"
                        width={600}
                        height={400}
                        className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover"
                      />
                    </ArtDecoBorder>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-serif mb-4">Bulk Gifting</h3>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto md:mx-0">
                      We bring to the table a range of <span className="font-medium">bulk corporate gifts</span> for employees that will redefine your relationship with them. A brand-new way to cherish, honour and acknowledge your employees that is hassle free and premium!
                    </p>
                    <div className="mt-6">
                      <Link href="/bulk-orders">
                        <Button variant="outline" className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WFH Employee Gifting Section */}
            <div className="flex flex-col items-center max-w-5xl mx-auto mb-16">
              <div className="w-full">
                <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12">
                  <div className="w-full md:w-1/2">
                    <ArtDecoBorder className="p-0">
                      <Image 
                        src="https://www.boxupgifting.com/cdn/shop/files/WFH_Employee_Gifting.jpg?v=1725348290"
                        alt="WFH Employee Gifting"
                        width={600}
                        height={400}
                        className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover"
                      />
                    </ArtDecoBorder>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-serif mb-4">WFH Employee Gifting</h3>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto md:mx-0">
                      Connect with your remote family through WFH employee gifts that are unique and utilitarian! Share the company values and foster a sense of belonging with company gifts that show you value and revere your employees.
                    </p>
                    <div className="mt-6">
                      <Link href="/categories/work-from-home">
                        <Button variant="outline" className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white">
                          Explore Options
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Positive Company Culture Section */}
            <div className="flex flex-col items-center max-w-5xl mx-auto mb-16">
              <div className="w-full">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                  <div className="w-full md:w-1/2">
                    <ArtDecoBorder className="p-0">
                      <Image 
                        src="https://www.boxupgifting.com/cdn/shop/files/Positive_Company_Culture.jpg"
                        alt="Positive Company Culture"
                        width={600}
                        height={400}
                        className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover"
                      />
                    </ArtDecoBorder>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-serif mb-4">Positive Company Culture</h3>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto md:mx-0">
                      We bring to the table a range of <span className="font-medium">bulk corporate gifts</span> for employees that will redefine your relationship with them. A brand-new way to cherish, honour and acknowledge your employees that is hassle free and premium!
                    </p>
                    <div className="mt-6">
                      <Link href="/categories/recognition">
                        <Button variant="outline" className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white">
                          View Solutions
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Recognition Section */}
            <div className="flex flex-col items-center max-w-5xl mx-auto">
              <div className="w-full">
                <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12">
                  <div className="w-full md:w-1/2">
                    <ArtDecoBorder className="p-0">
                      <Image 
                        src="https://www.boxupgifting.com/cdn/shop/files/Brand_Recognition.jpg"
                        alt="Brand Recognition"
                        width={600}
                        height={400}
                        className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover"
                      />
                    </ArtDecoBorder>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-serif mb-4">Brand Recognition</h3>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto md:mx-0">
                      Connect with your remote family through WFH employee gifts that are unique and utilitarian! Share the company values and foster a sense of belonging with company gifts that show you value and revere your employees.
                    </p>
                    <div className="mt-6">
                      <Link href="/categories/branding">
                        <Button variant="outline" className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white">
                          Discover More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Insights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">Tisorah Insights</h2>
              <p className="text-center text-gray-500 max-w-2xl mb-4">
                Expert perspectives on corporate gifting strategies and industry trends
              </p>
              <LinearPatternBackground className="w-32 h-1 mx-auto"></LinearPatternBackground>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <ArtDecoBorder key={blog.id} className="group bg-white overflow-hidden transition-all hover:shadow-md">
                  <Link href={`/blog/${blog.slug}`} className="block">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="inline-block px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-gray-400 text-xs">{blog.reading_time}</span>
                      </div>
                      <h3 className="font-serif text-lg mb-2 text-primary group-hover:text-secondary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center pt-3 border-t border-gray-100">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                          <Image 
                            src={blog.author_image}
                            alt={blog.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{blog.author}</p>
                          <p className="text-xs text-gray-400">
                            {format(blog.published_at, 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ArtDecoBorder>
              ))}
            </div>
            
            <div className="flex justify-center mt-10">
              <Link href="/blog">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white group gap-2">
                  View All Articles
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col items-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">Client Testimonials</h2>
                <p className="text-center text-gray-500 max-w-2xl mb-4">
                  What our valued customers have to say about their experience
                </p>
                <LinearPatternBackground className="w-32 h-1 mx-auto"></LinearPatternBackground>
              </div>
              <Testimonials testimonials={testimonials} />
            </div>
          </div>
        </section>
      )}
      
      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">Get In Touch</h2>
              <p className="text-center text-gray-500 max-w-2xl mb-4">
                We'd love to hear from you. Contact us for a consultation or quote.
              </p>
              <LinearPatternBackground className="w-32 h-1 mx-auto"></LinearPatternBackground>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
