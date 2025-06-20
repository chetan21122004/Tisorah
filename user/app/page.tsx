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
      <div className="flex flex-col items-center justify-center bg-white  shadow-sm p-0 md:p-2 hover:scale-[1.05] transition-all duration-300 w-96 mx-auto">
        <img src={image} alt={title} className="w-full rounded-2xl h-48 object-cover rounded-t-2xl" />
        <div className="flex flex-col items-center px-4 py-3">
          <h3 className="text-lg font-bold text-black opacity-80 mb-2 ">{title}</h3>
          <p className="text-sm font-light text-gray-500  mb-5">{desc}</p>
          <button className="bg-black text-white rounded-full px-7 py-2 text-sm font-semibold transition hover:bg-gray-900">KNOW MORE</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      
       <div className="flex flex-wrap justify-center gap-10 my-12">
        {giftCategories.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 bg-gray-100 flex items-center justify-center">
              <img src={cat.image} alt={cat.label} className="object-cover w-full h-full" />
            </div>
            <span className="mt-3 text-xs font-medium text-gray-800 text-center">{cat.label}</span>
          </div>
        ))}
      </div>
      
      <p className="text-center text-gray-500 font-light max-w-2xl mx-auto mb-6 opacity-80 text-sm md:text-base">
        Looking for unique and premium corporate gift hampers? Explore our top gifting options for employees and clients at affordable prices across India. Choose from a wide range of over 5,000 high-quality corporate gift products.
      </p>
      
      <HeroSection/>
      <ProductGrid title="Trending Today" products={trendingProducts} />

      {/* Occasion-Wise Gifts Section */}
      <div className="my-8">
        <h2 className="text-4xl font-edu-cursive text-center mb-10">Occasion-Wise Gifts</h2>
        <div className="flex flex-wrap justify-center gap-2 ">
          {occasionGifts.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center w-36 md:w-44">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-28  object-contain rounded-xl    transition-transform duration-200 hover:scale-105"
                loading="lazy"
              />
              <span className="mt-1 text-base md:text-sm font-medium text-gray-800 text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Our Offerings Section */}
      <div className="my-16">
        <h2 className="text-4xl font-edu-cursive text-center mb-2">Our Offerings</h2>
        <p className="text-center text-gray-500 font-light max-w-2xl mx-auto mb-10 text-sm md:text-base">
          Bespoke Gifts and Eco-friendly gifts, meticulously crafted to boost your brand's sophistication.
        </p>
        <div className="flex flex-col md:flex-row gap-2 mx-auto max-w-6xl justify-center items-center">
          {offerings.map((card, idx) => (
            <OfferingCard key={idx} {...card} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row mt-10 gap-2 mx-auto max-w-6xl justify-center items-center">
          {offerings.map((card, idx) => (
            <OfferingCard key={idx} {...card} />
          ))}
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Gifting  />
       </div>
       <section className="py-6 bg-[#323433]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative p-8 border-r border-white/10">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#AD9660]/20 to-transparent blur-xl"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-[#AD9660]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-10 h-10 text-[#AD9660]" />
                </div>
                <h3 className="font-frank-ruhl text-2xl font-medium text-white mb-4 font-edu-cursive">Uncompromising Quality</h3>
                <p className="font-poppins text-white/80 leading-relaxed">
                  Meticulously curated products that embody sophistication and reflect your organization's commitment to excellence
                </p>
              </div>
            </div>

            <div className="relative p-8 border-r border-white/10">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#AD9660]/20 to-transparent blur-xl"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-[#AD9660]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-10 h-10 text-[#AD9660]" />
                </div>
                <h3 className="font-frank-ruhl text-2xl font-medium text-white mb-4 font-edu-cursive">Corporate Expertise</h3>
                <p className="font-poppins text-white/80 leading-relaxed">
                  Over a decade of distinguished service in corporate gifting with 500+ satisfied clients across diverse industries
                </p>
              </div>
            </div>

            <div className="relative p-8">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#AD9660]/20 to-transparent blur-xl"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-[#AD9660]/10 rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-10 h-10 text-[#AD9660]" />
                </div>
                <h3 className="font-frank-ruhl text-2xl font-medium text-white mb-4 font-edu-cursive">Dedicated Partnership</h3>
                <p className="font-poppins text-white/80 leading-relaxed">
                  Personal account management and round-the-clock support ensuring your gifting initiatives exceed expectations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {testimonials && testimonials.length > 0 && (
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Testimonials testimonials={testimonials} />
        </div>
      )}
      

   

      {/* Services Section */}
      <section className="py-20 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-secondary/10 text-secondary mb-4">Exclusive Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-medium text-primary mb-4 font-edu-cursive">Corporate Gifting Excellence</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Beyond exceptional products, we offer comprehensive services designed to elevate your corporate gifting
              experience and strengthen your business relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-secondary fill-current" />
                        ))}
                        <span className="text-xs font-medium text-primary">{service.rating}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm font-semibold">{service.clients}</div>
                      <div className="text-xs opacity-90">Trusted Excellence</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                    </div>
                    <p className="text-neutral-600 mb-4">{service.description}</p>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                      <Link href={service.link} className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />📨 Request Consultation
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-xl">
              <Link href="/services" className="flex items-center gap-2">
                Explore All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

   
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#323433] via-[#1E2A47] to-[#AB8E76] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometric-pattern.svg')] opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-[#AD9660] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-[#E6E2DD] rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/10 text-white mb-8">Exclusive Membership</Badge>
            <h2 className="font-frank-ruhl text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Elevate Your Corporate Relationships
            </h2>
            <p className="font-poppins text-xl text-white/90 mb-12 leading-relaxed">
              Subscribe to our exclusive newsletter and be the first to discover new collections, receive special offers, and access sophisticated corporate gifting insights.
            </p>

            {/* Newsletter Signup */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-8">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-6 text-lg rounded-2xl border-0 bg-white/95 backdrop-blur-sm shadow-xl font-poppins"
              />
              <Button
                size="lg"
                className="bg-[#AD9660] hover:bg-[#AD9660]/90 text-white px-8 py-6 rounded-2xl font-bold shadow-xl"
              >
                Subscribe
              </Button>
            </div>

            <p className="font-poppins text-lg text-white/80 mb-12">
              🎁 Receive exclusive access to our premium collections and special pricing
            </p>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Button
                size="lg"
                className="bg-[#AD9660] hover:bg-[#AD9660]/90 text-white px-8 py-8 rounded-2xl shadow-xl group"
              >
                <Link href="https://wa.me/919860002313" className="flex items-center justify-center gap-4">
                  <MessageCircle className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-frank-ruhl font-bold text-lg">WhatsApp Consultation</div>
                    <div className="font-poppins text-sm opacity-90">Immediate expert assistance</div>
                  </div>
                </Link>
              </Button>

              <Button
                size="lg"
                className="bg-white text-[#323433] hover:bg-white/90 px-8 py-8 rounded-2xl shadow-xl group"
              >
                <Link href="/quote" className="flex items-center justify-center gap-4">
                  <Mail className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-frank-ruhl font-bold text-lg">Request Consultation</div>
                    <div className="font-poppins text-sm opacity-90">Bespoke solutions for your organization</div>
                  </div>
                </Link>
              </Button>
            </div>

            {/* Stats Section */}
            <div className="mt-16 pt-16 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="font-frank-ruhl text-3xl font-bold text-[#AD9660] mb-2">1000+</div>
                  <div className="font-poppins text-white/80">Curated Products</div>
                </div>
                <div className="text-center">
                  <div className="font-frank-ruhl text-3xl font-bold text-[#AD9660] mb-2">10K+</div>
                  <div className="font-poppins text-white/80">Satisfied Clients</div>
                </div>
                <div className="text-center">
                  <div className="font-frank-ruhl text-3xl font-bold text-[#AD9660] mb-2">50+</div>
                  <div className="font-poppins text-white/80">Cities Served</div>
                </div>
                <div className="text-center">
                  <div className="font-frank-ruhl text-3xl font-bold text-[#AD9660] mb-2">4.9★</div>
                  <div className="font-poppins text-white/80">Excellence Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
