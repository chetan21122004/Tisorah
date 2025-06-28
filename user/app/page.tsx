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
  Check,
  Headphones,
  PenTool,
  ClipboardCheck,
  PackageCheck,
  Phone,
  Clock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import HeroSection from "../components/HeroSection"
import { getFeaturedProducts, getLatestProducts, getTestimonials, getCategories, getMainCategories } from "./actions"
import { getAllBlogPosts } from "@/lib/blog-service"
import { format } from 'date-fns'

// Import modular components
import HeroBanner from '@/components/LandingPage/HeroBanner'
import Gifting from '@/components/LandingPage/Gifting'
import Testimonials from '@/components/LandingPage/Testimonials'
import ContactForm from '@/components/LandingPage/ContactForm'
import ProductGrid from '@/components/LandingPage/ProductGrid'
import NewArrival from '@/components/LandingPage/NewArrival'
import OurClient from "@/components/LandingPage/OurClient"
import BlogCarousel from "@/components/LandingPage/BlogCarousel"
import FeatureSection from "@/components/LandingPage/FeatureSection"
import CuratedCategories from "@/components/LandingPage/CuratedCategories"
import ServicesSection from "@/components/LandingPage/ServicesSection"
import QuoteCTA from "@/components/LandingPage/QuoteCTA"
import HowItWorks from "@/components/LandingPage/HowItWorks"
import { QuotePopup } from "@/components/ui/quote-popup"

export default async function HomePage() {
  // Fetch trending products from Supabase
  const supabaseProducts = await getFeaturedProducts();
  const trendingProducts = supabaseProducts
    .map((product: any) => ({
      name: product.name,
      image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg',
      price: product.price,
      price_min: product.price_min,
      price_max: product.price_max,
      has_price_range: product.has_price_range,
      discount: undefined, // You can calculate discount if you have originalPrice
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      moq: product.moq || 1,
    }))
    .slice(0, 10);
  const latestProductsRaw = await getLatestProducts();
  const latestProducts = latestProductsRaw
    .map((product: any) => ({
      name: product.name,
      image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg',
      price: product.price,
      price_min: product.price_min,
      price_max: product.price_max,
      has_price_range: product.has_price_range,
      discount: undefined,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      moq: product.moq || 1,
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

  return (
    <div className="min-h-screen">
      <QuotePopup />
      
      {/* Top Horizontal Banner Section */}
      <HeroBanner />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Trending Products Section */}
      <div className="px-4 md:px-0">
        <ProductGrid title="Trending Today" products={trendingProducts} />
      </div>

      {/* Curated Categories Section */}
      <CuratedCategories categories={curatedCategories} />

      {/* Services Section */}
      <ServicesSection />

      {/* Gifting Section */}
        <Gifting />

      {/* Quote CTA Section */}
      <QuoteCTA />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features Section */}
      <section className="py-10 md:py-12 bg-gradient-to-b from-white to-[#F4F4F4]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-[1px] bg-[#AD9660]"></div>
              <span className="mx-4 text-sm uppercase tracking-wider text-[#AD9660] font-light">Our Solutions</span>
              <div className="w-12 h-[1px] bg-[#AD9660]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#323433] font-light">
              Elevate Your Corporate Gifting Experience
            </h2>
            <p className="text-[#323433]/70 text-lg font-light">
              Discover our comprehensive range of corporate gifting solutions designed to strengthen relationships and create lasting impressions.
            </p>
          </div>

          <FeatureSection
            title="Bulk Corporate Gifting Solutions"
            description="We bring to the table a range of bulk corporate gifts for employees that will redefine your relationship with them. A brand-new way to cherish, honour and acknowledge your employees that is hassle free and premium!"
            image="https://www.boxupgifting.com/cdn/shop/files/Bulk_Corporate_Gifting.jpg?v=1725348252"
            highlightedText="bulk corporate gifts"
            ctaLink="/bulk-orders"
            ctaText="Explore Bulk Gifting"
          />

          <FeatureSection
            title="WFH Employee Gifting"
            description="Connect with your remote family through WFH employee gifts that are unique and utilitarian! Share the company values and foster a sense of belonging with company gifts that show you value and revere your employees."
            image="https://www.boxupgifting.com/cdn/shop/files/WFH_Employee_Gifting.jpg?v=1725348290"
            isReversed
            ctaLink="/categories/wfh-gifts"
            ctaText="View WFH Collection"
          />

          <FeatureSection
            title="Foster Positive Company Culture"
            description="Create a vibrant and engaging workplace environment through thoughtfully curated gifts that inspire and motivate. Our corporate gifting solutions help build stronger teams and celebrate achievements."
            image="https://www.boxupgifting.com/cdn/shop/files/Positive_Company_Culture.jpg"
            ctaLink="/categories/recognition"
            ctaText="Explore Recognition Gifts"
          />

          <FeatureSection
            title="Enhance Brand Recognition"
            description="Elevate your brand presence with our premium customization options. From elegant corporate merchandise to bespoke gift packages, we help you create memorable brand experiences that resonate with your audience."
            image="https://www.boxupgifting.com/cdn/shop/files/Brand_Recognition.jpg"
            isReversed
            ctaLink="/customization"
            ctaText="Discover Branding Options"
          />
        </div>
      </section>

      {/* Our Clients Section */}
      <div className="bg-white">
        <OurClient />
      </div>

      {/* Blog Section */}
      <BlogCarousel posts={latestBlogPosts} />
  
      {/* Contact Form Section */}
      <ContactForm />

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Testimonials testimonials={testimonials} />
        </div>
      )}
    </div>
  )
}
