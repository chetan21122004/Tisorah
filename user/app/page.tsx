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
import ServicesSection from "@/components/LandingPage/ServicesSection"
import QuoteCTA from "@/components/LandingPage/QuoteCTA"
import HowItWorks from "@/components/LandingPage/HowItWorks"
import { QuotePopup } from "@/components/quote-popup"

export const metadata = {
  title: "Premium Corporate Gifts India | Luxury Corporate Gifting Solutions",
  description: "Discover India's most trusted premium corporate gifting company. 10,000+ luxury corporate gifts, customized hampers, branded merchandise for employees, clients & business partners. Get bulk discounts & same-day delivery.",
  keywords: "corporate gifts india, premium corporate gifts, luxury corporate gifting, corporate gift hampers",
  alternates: {
    canonical: 'https://tisorahbox.com',
  }
}

export default async function HomePage() {
  // Fetch trending products from Supabase
  const supabaseProducts = await getFeaturedProducts();
  const trendingProducts = supabaseProducts
    .map((product: any) => ({
      id: product.id,
      name: product.name,
      image: product.display_image || product.images?.[0] || '/placeholder.svg',
      display_image: product.display_image,
      hover_image: product.hover_image,
      images: product.images,
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
      id: product.id,
      name: product.name,
      image: product.display_image || product.images?.[0] || '/placeholder.svg',
      display_image: product.display_image,
      hover_image: product.hover_image,
      images: product.images,
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

      {/* Hero Section with SEO-optimized H1 */}
      <section className="relative">
        <HeroSection />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <h1 className="sr-only">Premium Corporate Gifts India - Luxury Corporate Gifting Solutions by Tisorah</h1>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-[#323433] mb-6">
              India's Most Trusted Premium Corporate Gifting Company
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Welcome to Tisorah - your partner in premium corporate gifting solutions. With over 10,000+ luxury corporate gifts, 
              we specialize in creating memorable gifting experiences for employees, clients, and business partners. From customized 
              gift hampers to branded merchandise, we offer comprehensive bulk gifting solutions with 1-2 week delivery across major Indian cities.
            </p>
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#AD9660] mb-2">10,000+</div>
                <p className="text-sm text-gray-600">Premium Gift Options</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#AD9660] mb-2">500+</div>
                <p className="text-sm text-gray-600">Corporate Clients</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#AD9660] mb-2">15+</div>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#AD9660] mb-2">100%</div>
                <p className="text-sm text-gray-600">Customization</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Corporate Gifting Process Section */}
      <section className="py-6 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#323433] font-light mb-4">
              Premium <span className="text-[#AD9660]">Corporate Gift Hamper</span> Curation Process
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              From concept to delivery, we ensure every corporate gift hamper tells your brand story
            </p>
          </div>

          {/* Process Steps - Responsive Grid/Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Step 1 - Ideation */}
            <div className="group relative">
              <div className="bg-white rounded-md shadow-sm p-6 md:p-8 h-full transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F0EBE1] flex items-center justify-center mr-4 group-hover:bg-[#AD9660]/20 transition-colors duration-300">
                    <span className="text-[#AD9660] font-medium">1</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#323433]">Ideation</h3>
                </div>

                <p className="text-gray-600 text-sm md:text-base mb-4">
                  We begin by understanding your corporate gifting needs, brand values, and budget to conceptualize the perfect luxury gifts for each occasion.
                </p>

                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#AD9660]">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 2 - Designing */}
            <div className="group relative">
              <div className="bg-white rounded-md shadow-sm p-6 md:p-8 h-full transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F0EBE1] flex items-center justify-center mr-4 group-hover:bg-[#AD9660]/20 transition-colors duration-300">
                    <span className="text-[#AD9660] font-medium">2</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#323433]">Designing</h3>
                </div>

                <p className="text-gray-600 text-sm md:text-base mb-4">
                  Our design team creates custom packaging and selects premium products that align with your brand identity and corporate gifting objectives.
                </p>

                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#AD9660]">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 3 - Branding */}
            <div className="group relative">
              <div className="bg-white rounded-md shadow-sm p-6 md:p-8 h-full transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F0EBE1] flex items-center justify-center mr-4 group-hover:bg-[#AD9660]/20 transition-colors duration-300">
                    <span className="text-[#AD9660] font-medium">3</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#323433]">Branding</h3>
                </div>

                <p className="text-gray-600 text-sm md:text-base mb-4">
                  We incorporate your company logo, colors, and messaging to create branded corporate gifts that strengthen your business relationships.
                </p>

                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#AD9660]">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 4 - Shipping */}
            <div className="group">
              <div className="bg-white rounded-md shadow-sm p-6 md:p-8 h-full transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F0EBE1] flex items-center justify-center mr-4 group-hover:bg-[#AD9660]/20 transition-colors duration-300">
                    <span className="text-[#AD9660] font-medium">4</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#323433]">Shipping</h3>
                </div>

                <p className="text-gray-600 text-sm md:text-base">
                  We ensure timely delivery of your corporate gifts across India with secure packaging and real-time tracking for bulk orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Gifting Solutions Section */}
      <section className="py-12 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-center text-[#323433] mb-4">
            Corporate Gifting Solutions for Every Occasion
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            From Diwali corporate gifts to employee recognition awards, we offer tailored gifting solutions 
            for all business occasions and celebrations throughout the year.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {corporateOccasions.map((occasion, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl">
                  <Image
                    src={occasion.image}
                    alt={`Corporate Gifts for ${occasion.label}`}
                    width={300}
                    height={200}
                    className="w-full h-32 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                    <h3 className="text-white text-sm md:text-lg font-medium p-4">
                      {occasion.label}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA Section */}
      <QuoteCTA />

      {/* Trending Corporate Gifts Section */}
      <div className="px-4 md:px-0">
        <ProductGrid title="Trending Corporate Gifts Today" products={trendingProducts} />
      </div>

      {/* Our Clients Section */}
      {/* <div className="bg-white">
        <OurClient />
      </div> */}

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[#323433] mb-4">
              Why Choose Tisorah for Corporate Gifting?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              As India's leading premium corporate gifting company, we combine luxury, customization, 
              and reliability to deliver exceptional gifting experiences for businesses across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#AD9660]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#AD9660]" />
              </div>
              <h3 className="text-xl font-medium text-[#323433] mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Curated selection of luxury corporate gifts from trusted brands and artisans across India.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#AD9660]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-[#AD9660]" />
              </div>
              <h3 className="text-xl font-medium text-[#323433] mb-2">100% Customization</h3>
              <p className="text-gray-600">
                Complete branding solutions with logo printing, custom packaging, and personalized messages.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#AD9660]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-[#AD9660]" />
              </div>
              <h3 className="text-xl font-medium text-[#323433] mb-2">Pan-India Delivery</h3>
              <p className="text-gray-600">
                Reliable bulk shipping across India with same-day delivery in Delhi, Mumbai, Bangalore & more.
              </p>
            </div>
          </div>

          <FeatureSection
            title="Foster Positive Company Culture with Corporate Gifts"
            description="Create a vibrant workplace environment through thoughtfully curated employee gifts. Our corporate gifting solutions help build stronger teams, celebrate achievements, and boost employee engagement with premium gift hampers."
            image="./display_images/image2.png"
            ctaLink="/quote"
            ctaText="Explore Employee Gifts"
          />

          <FeatureSection
            title="Enhance Brand Recognition with Branded Corporate Gifts"
            description="Elevate your brand presence with premium customized corporate merchandise. From luxury branded gifts to bespoke gift packages, we help create memorable brand experiences that resonate with clients and partners."
            image="https://www.boxupgifting.com/cdn/shop/files/Brand_Recognition.jpg"
            isReversed
            ctaLink="/quote"
            ctaText="Get Branded Solutions"
          />
        </div>
      </section>

      {/* Blog Section */}
      <BlogCarousel posts={latestBlogPosts} />

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  )
}
