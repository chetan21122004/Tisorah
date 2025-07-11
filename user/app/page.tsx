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

export default async function HomePage() {
  // Fetch trending products from Supabase
  const supabaseProducts = await getFeaturedProducts();
  const trendingProducts = supabaseProducts
    .map((product: any) => ({
      name: product.name,
      image: product.display_image || product.images?.[0] || '/placeholder.svg',
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
      image: product.display_image || product.images?.[0] || '/placeholder.svg',
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




      {/* How It Works Section */}
      <HowItWorks />


      {/* Hamper Curation Process Section */}
      <section className="py-6 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#323433] font-light mb-4">
              Premium <span className="text-[#AD9660]">Hamper Curation</span> Process
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              From concept to delivery, we ensure every hamper tells a unique story
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
                  The process of curating the perfect hamper begins with ideation, where we brainstorm and conceptualize the best gift options for each occasion.
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
                  Our team of designers then meticulously crafts the hamper, ensuring that every detail is thoughtfully considered and executed.
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
                  We then incorporate the client's branding and personalization to make the hamper truly unique and reflective of their style and preferences.
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

                <p className="text-gray-600 text-sm md:text-base mb-4">
                  Finally, we carefully pack and ship the hamper, ensuring that it arrives at its destination in pristine condition, ready to delight the recipient.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link href="/quote">
              <Button className="bg-[#AD9660] hover:bg-[#8d7c50] text-white px-8 py-3 rounded-sm shadow-sm flex items-center gap-2 mx-auto group transition-all duration-300">
                <span>Start Your Custom Hamper</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Why Us - Cork Sustainable Gifting Section */}
      <section className="py-6 bg-white relative overflow-hidden">
        {/* Modern abstract background element */}
        <div className="absolute -right-40 -top-40 w-80 h-80 bg-[#F0EBE1] rounded-full opacity-20"></div>
        <div className="absolute -left-20 bottom-0 w-60 h-60 bg-[#AD9660]/10 rounded-full"></div>

        <div className="container mx-auto px-4 md:px-6 relative">
          {/* Modern header with accent line */}
          <div className="max-w-xl mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#AD9660]"></div>
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#AD9660] font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#323433] font-light leading-tight">
              Sustainable Cork-Based <span className="text-[#AD9660]">Corporate Gifting</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-0 shadow-lg rounded-sm overflow-hidden">
            {/* Left column - Image with overlay */}
            <div className="lg:w-1/3 relative">
              <div className="h-full min-h-[400px] lg:min-h-0 relative">
                <Image
                  src="https://www.boxupgifting.com/cdn/shop/files/Custom_curated.jpg?v=1685185266&width=1240"
                  alt="Premium Cork Products"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/90 via-[#323433]/50 to-[#323433]/20 flex flex-col justify-end p-6 md:p-8">
                  <div className="text-white">
                    <h3 className="text-xl md:text-2xl font-serif font-light mb-3">
                      Eco-Conscious Excellence
                    </h3>
                    <p className="text-sm text-white/90 mb-4">
                      Our cork-based gifting solutions align with modern corporate values of sustainability and environmental responsibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle column - Description */}
            <div className="lg:w-1/3 bg-white p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-[#F0EBE1] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#AD9660]">
                      <path d="m9 12 2 2 4-4"></path><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    </svg>
                  </div>
                  <h4 className="text-sm font-medium text-[#323433]">Sustainable Choice</h4>
                </div>
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  Our cork-based corporate gifting solution is an innovative and sustainable choice that aligns with eco-conscious values. Cork products offer a unique and environmentally friendly option.
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  We strive to create an array of customized cork sustainable gifting options. Our team of expert designers continuously work to create alternatives to plastic and other materials with eco-friendly cork.
                </p>
              </div>

              <Link href="/quote" className="mt-6">
                <Button className="bg-[#323433] hover:bg-black text-white px-6 py-2 flex items-center gap-2 group transition-all duration-300 shadow-sm">
                  <span>Explore Cork Options</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>

            {/* Right column - Benefits */}
            <div className="lg:w-1/3 bg-[#FAFAFA] p-6 md:p-8 border-l border-gray-100">
              <h3 className="text-lg font-medium text-[#323433] mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#AD9660] block"></span>
                Key Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F0EBE1] flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#AD9660]">
                      <path d="M12 2v8"></path><path d="M22 22H2"></path><path d="M16 6 7 22"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Renewable resource harvested without harming trees</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F0EBE1] flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#AD9660]">
                      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Low environmental impact with minimal waste</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F0EBE1] flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#AD9660]">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Demonstrates corporate responsibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F0EBE1] flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#AD9660]">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Durable and resistant to wear and moisture</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-[#323433] mb-3">Gifting Categories</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white shadow-sm p-3 text-center rounded-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
                      <Gift className="w-4 h-4 text-[#AD9660]" />
                    </div>
                    <span className="text-xs text-gray-600">Seasonal Gifting</span>
                  </div>
                  <div className="bg-white shadow-sm p-3 text-center rounded-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-[#AD9660]" />
                    </div>
                    <span className="text-xs text-gray-600">Corporate Kits</span>
                  </div>
                  <div className="bg-white shadow-sm p-3 text-center rounded-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
                      <Award className="w-4 h-4 text-[#AD9660]" />
                    </div>
                    <span className="text-xs text-gray-600">Recognition</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Quote CTA Section */}
      <QuoteCTA />

      {/* Trending Products Section */}
      <div className="px-4 md:px-0">
        <ProductGrid title="Trending Today" products={trendingProducts} />
      </div>

      {/* Our Clients Section */}
      {/* <div className="bg-white">
        <OurClient />
      </div> */}

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

          </div>

          <FeatureSection
            title="Bulk Corporate Gifting Solutions"
            description="We bring to the table a range of bulk corporate gifts for employees that will redefine your relationship with them. A brand-new way to cherish, honour and acknowledge your employees that is hassle free and premium!"
            image="https://www.boxupgifting.com/cdn/shop/files/Bulk_Corporate_Gifting.jpg?v=1725348252"
            highlightedText="bulk corporate gifts"
            ctaLink="/quote"
            ctaText="Request Quote Now"
          />

          <FeatureSection
            title="WFH Employee Gifting"
            description="Connect with your remote family through WFH employee gifts that are unique and utilitarian! Share the company values and foster a sense of belonging with company gifts that show you value and revere your employees."
            image="https://www.boxupgifting.com/cdn/shop/files/WFH_Employee_Gifting.jpg?v=1725348290"
            isReversed
            ctaLink="/quote"
            ctaText="Get Custom WFH Gifts"
          />

          <FeatureSection
            title="Foster Positive Company Culture"
            description="Create a vibrant and engaging workplace environment through thoughtfully curated gifts that inspire and motivate. Our corporate gifting solutions help build stronger teams and celebrate achievements."
            image="./display_images/image2.png"
            ctaLink="/quote"
            ctaText="Request Culture Kits"
          />

          <FeatureSection
            title="Enhance Brand Recognition"
            description="Elevate your brand presence with our premium customization options. From elegant corporate merchandise to bespoke gift packages, we help you create memorable brand experiences that resonate with your audience."
            image="https://www.boxupgifting.com/cdn/shop/files/Brand_Recognition.jpg"
            isReversed
            ctaLink="/quote"
            ctaText="Get Branded Solutions"
          />
        </div>
      </section>

      {/* Gifting Section */}



      {/* Blog Section */}
      <BlogCarousel posts={latestBlogPosts} />

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  )
}
