import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  TrendingUp,
  Clock,
  Shield,
  Truck,
  ArrowRight,
  Search,
  Filter,
  Zap,
  Award,
  Users,
  Package,
  Gift,
  Briefcase,
  Palette,
  MessageSquare,
  Check,
  Mail,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getFeaturedProducts, createServerSupabaseClient } from "./actions"
import type { Product, Testimonial } from "@/types/database"
import { cookies } from 'next/headers'
import HeroSection from "./components/HeroSection"
import HeroSlider from "@/components/HeroSlider"
import PatternBackground, { PatternDivider } from "@/components/PatternBackground"

// Add banner data
const bannerData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
    title: "Premium Corporate Gifts",
    subtitle: "Up to 40% off on exclusive collections",
    buttonText: "Shop Now",
    buttonLink: "/sale",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    title: "Executive Collection",
    subtitle: "Discover our premium range starting ₹2,999",
    buttonText: "Explore Now",
    buttonLink: "/categories/executive",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
    title: "Festival Special",
    subtitle: "Early bird offers on festive gifts",
    buttonText: "View Offers",
    buttonLink: "/categories/festival",
  },
]

// Add type for testimonial data
interface TestimonialData {
  id: string
  name: string
  position: string
  company: string
  avatar_url: string | null
  rating: number
  content: string
  product_bought: string
  created_at: string
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()
  const supabase = await createServerSupabaseClient()

  // Get testimonials with proper typing
  const { data: testimonials = [] } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  const collections = [
    {
      title: "Executive Onboarding",
      description: "Sophisticated welcome experiences for distinguished professionals",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&crop=center",
      link: "/categories/onboarding",
      productCount: "150+ Curated Items",
      startingPrice: "₹2,999",
    },
    {
      title: "Festival Celebrations",
      description: "Exquisite hampers that honor cultural traditions with elegance",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
      link: "/categories/festivals",
      productCount: "200+ Premium Options",
      startingPrice: "₹3,499",
    },
    {
      title: "Recognition & Awards",
      description: "Distinguished tokens of appreciation for exceptional achievements",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center",
      link: "/categories/recognition",
      productCount: "120+ Exclusive Pieces",
      startingPrice: "₹4,999",
    },
    {
      title: "Corporate Events",
      description: "Memorable keepsakes that elevate your corporate gatherings",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&crop=center",
      link: "/categories/events",
      productCount: "180+ Sophisticated Items",
      startingPrice: "₹2,499",
    },
  ]

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

  const quickCategories = [
    { name: "Executive Onboarding", icon: "👔", link: "/categories/onboarding", count: "150+" },
    { name: "Festival Celebrations", icon: "🎊", link: "/categories/festivals", count: "200+" },
    { name: "Recognition Awards", icon: "🏆", link: "/categories/recognition", count: "120+" },
    { name: "Corporate Events", icon: "🎪", link: "/categories/events", count: "180+" },
    { name: "Milestone Celebrations", icon: "🎂", link: "/categories/birthdays", count: "90+" },
    { name: "Volume Solutions", icon: "📦", link: "/bulk-orders", count: "500+" },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Floating Action Buttons - More subtle and modern */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button
          className="bg-[#1E2A47] hover:bg-[#1E2A47]/90 text-white rounded-full w-12 h-12 shadow-lg transition-transform hover:scale-105"
          title="WhatsApp Consultation"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
        <Button
          className="bg-[#AD9660] hover:bg-[#AD9660]/90 text-white rounded-full w-12 h-12 shadow-lg transition-transform hover:scale-105"
          title="View Curated Selection"
        >
          <Link href="/shortlist">
            <Heart className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <HeroSlider/>

    

      {/* Pattern Divider */}

      {/* Hero Section - E-commerce Style */}
      <section className="bg-white mt-4">
        {/* Main Banner Slider */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
                    alt="Executive Gifts"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-[#1E2A47]">Executive Gifts</h3>
                <p className="text-sm text-[#1E2A47]/60 mb-2">Starting ₹2,999</p>
                <Link 
                  href="/categories/executive"
                  className="text-[#AD9660] text-sm font-medium hover:underline"
                >
                  Shop Now
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0"
                    alt="Festival Gifts"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-[#1E2A47]">Festival Gifts</h3>
                <p className="text-sm text-[#1E2A47]/60 mb-2">Starting ₹1,999</p>
                <Link 
                  href="/categories/festival"
                  className="text-[#AD9660] text-sm font-medium hover:underline"
                >
                  Shop Now
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44"
                    alt="Awards & Recognition"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-[#1E2A47]">Awards</h3>
                <p className="text-sm text-[#1E2A47]/60 mb-2">Starting ₹4,999</p>
                <Link 
                  href="/categories/awards"
                  className="text-[#AD9660] text-sm font-medium hover:underline"
                >
                  Shop Now
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865"
                    alt="Corporate Events"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-[#1E2A47]">Event Gifts</h3>
                <p className="text-sm text-[#1E2A47]/60 mb-2">Starting ₹2,499</p>
                <Link 
                  href="/categories/events"
                  className="text-[#AD9660] text-sm font-medium hover:underline"
                >
                  Shop Now
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search Bar - Enhanced E-commerce Style */}
        <div className="container mx-auto px-4 mt-12 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#1E2A47]">Find Your Perfect Corporate Gift</h2>
                <p className="text-neutral-500">Discover our curated collection of premium gifts for every corporate occasion</p>
              </div>
              
              <form action="/search" className="mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1E2A47]/40 w-5 h-5" />
                    <Input
                      name="q"
                      placeholder="Search for executive gifts, awards, festival hampers..."
                      className="pl-12 pr-4 py-6 border-[#E6E2DD] bg-white rounded-xl text-[#1E2A47] text-lg placeholder:text-[#1E2A47]/40 focus-visible:ring-[#AD9660]"
                    />
                  </div>
                  <div className="flex gap-3">
                    <select 
                      name="category"
                      className="px-4 py-3 border border-[#E6E2DD] rounded-xl bg-white text-[#1E2A47] focus:ring-[#AD9660] focus:border-[#AD9660] outline-none"
                    >
                      <option value="">All Categories</option>
                      <option value="executive">Executive Gifts</option>
                      <option value="festivals">Festival Gifts</option>
                      <option value="awards">Recognition & Awards</option>
                      <option value="events">Corporate Events</option>
                    </select>
                    <select 
                      name="price"
                      className="px-4 py-3 border border-[#E6E2DD] rounded-xl bg-white text-[#1E2A47] focus:ring-[#AD9660] focus:border-[#AD9660] outline-none"
                    >
                      <option value="">All Prices</option>
                      <option value="0-2000">Under ₹2,000</option>
                      <option value="2000-5000">₹2,000 - ₹5,000</option>
                      <option value="5000-10000">₹5,000 - ₹10,000</option>
                      <option value="10000+">Above ₹10,000</option>
                    </select>
                    <Button type="submit" className="bg-[#AD9660] hover:bg-[#AD9660]/90 text-white px-6 py-3 rounded-xl min-w-[120px]">
                      Search
                    </Button>
                  </div>
                </div>
              </form>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-4 bg-[#F8F9FA] hover:bg-[#F0F1F3] rounded-xl transition-colors group cursor-pointer">
                  <Link href="/search?category=executive" className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#1E2A47]/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#AD9660]/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1E2A47] group-hover:text-[#AD9660] transition-colors"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
                    </div>
                    <h3 className="font-medium text-[#1E2A47] group-hover:text-[#AD9660] transition-colors">Premium Gifts</h3>
                    <p className="text-sm text-[#1E2A47]/60 mt-1">Starting at ₹2,999</p>
                  </Link>
                </div>
                
                <div className="p-4 bg-[#F8F9FA] hover:bg-[#F0F1F3] rounded-xl transition-colors group cursor-pointer">
                  <Link href="/search?category=festivals" className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#1E2A47]/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#AD9660]/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1E2A47] group-hover:text-[#AD9660] transition-colors"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="M16 6 8 14"/><path d="m8 6 8 8"/></svg>
                    </div>
                    <h3 className="font-medium text-[#1E2A47] group-hover:text-[#AD9660] transition-colors">Festival Gifts</h3>
                    <p className="text-sm text-[#1E2A47]/60 mt-1">Starting at ₹1,999</p>
                  </Link>
                </div>
                
                <div className="p-4 bg-[#F8F9FA] hover:bg-[#F0F1F3] rounded-xl transition-colors group cursor-pointer">
                  <Link href="/search?category=awards" className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#1E2A47]/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#AD9660]/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1E2A47] group-hover:text-[#AD9660] transition-colors"><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/><path d="M15 7a5 5 0 1 0-2.33 4.23"/></svg>
                    </div>
                    <h3 className="font-medium text-[#1E2A47] group-hover:text-[#AD9660] transition-colors">Awards</h3>
                    <p className="text-sm text-[#1E2A47]/60 mt-1">Starting at ₹4,999</p>
                  </Link>
                </div>
                
                <div className="p-4 bg-[#F8F9FA] hover:bg-[#F0F1F3] rounded-xl transition-colors group cursor-pointer">
                  <Link href="/search?category=events" className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#1E2A47]/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#AD9660]/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1E2A47] group-hover:text-[#AD9660] transition-colors"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                    </div>
                    <h3 className="font-medium text-[#1E2A47] group-hover:text-[#AD9660] transition-colors">Event Gifts</h3>
                    <p className="text-sm text-[#1E2A47]/60 mt-1">Starting at ₹2,499</p>
                  </Link>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-sm text-[#1E2A47]/60">Popular:</span>
                <Link href="/search?q=executive+sets" className="text-sm text-[#1E2A47] hover:text-[#AD9660] transition-colors">Executive Sets</Link>
                <span className="text-sm text-[#1E2A47]/30">•</span>
                <Link href="/search?q=awards" className="text-sm text-[#1E2A47] hover:text-[#AD9660] transition-colors">Awards</Link>
                <span className="text-sm text-[#1E2A47]/30">•</span>
                <Link href="/search?q=diwali+gifts" className="text-sm text-[#1E2A47] hover:text-[#AD9660] transition-colors">Diwali Gifts</Link>
                <span className="text-sm text-[#1E2A47]/30">•</span>
                <Link href="/search?q=corporate+hampers" className="text-sm text-[#1E2A47] hover:text-[#AD9660] transition-colors">Corporate Hampers</Link>
                <span className="text-sm text-[#1E2A47]/30">•</span>
                <Link href="/search?q=personalized+gifts" className="text-sm text-[#1E2A47] hover:text-[#AD9660] transition-colors">Personalized Gifts</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1E2A47]">Featured Products</h2>
              <p className="text-[#1E2A47]/60 mt-1">Handpicked premium corporate gifts</p>
            </div>
            <Button
              variant="outline"
              size="default"
              className="border-[#1E2A47] text-[#1E2A47] hover:bg-[#1E2A47]/5 rounded-lg hidden sm:flex"
            >
              <Link href="/products" className="flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-all duration-300 border-[#E6E2DD] bg-white relative overflow-hidden rounded-lg"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={product.images?.[0] || "/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    {product.discount && (
                      <Badge className="absolute top-3 left-3 bg-[#AD9660] text-white px-2 py-1 rounded-md text-xs">
                        {product.discount}
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/90 hover:bg-white rounded-full shadow-sm"
                    >
                      <Heart className="w-4 h-4 text-[#1E2A47]" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h4 className="font-medium text-[#1E2A47] text-base leading-tight hover:text-[#AD9660] line-clamp-2">
                        {product.name}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(Math.round(product.rating || 5))].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[#AD9660] fill-current" />
                      ))}
                      <span className="text-xs text-[#1E2A47]/60">({product.reviews || 0})</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="space-x-2">
                        <span className="text-lg font-bold text-[#AD9660]">₹{product.price}</span>
                        {product.original_price > product.price && (
                          <span className="text-sm text-[#1E2A47]/40 line-through">
                            ₹{product.original_price}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 hover:bg-[#1E2A47]/5 rounded-full"
                      >
                        <Link href={`/products/${product.id}`}>
                          <ChevronRight className="w-4 h-4 text-[#1E2A47]" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Button
              variant="outline"
              size="default"
              className="border-[#1E2A47] text-[#1E2A47] hover:bg-[#1E2A47]/5 rounded-lg w-full"
            >
              <Link href="/products" className="flex items-center justify-center gap-2">
                View All Products <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-6 bg-[#323433]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative p-8 border-r border-white/10">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#AD9660]/20 to-transparent blur-xl"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-[#AD9660]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-10 h-10 text-[#AD9660]" />
                </div>
                <h3 className="font-frank-ruhl text-2xl font-bold text-white mb-4">Uncompromising Quality</h3>
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
                <h3 className="font-frank-ruhl text-2xl font-bold text-white mb-4">Corporate Expertise</h3>
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
                <h3 className="font-frank-ruhl text-2xl font-bold text-white mb-4">Dedicated Partnership</h3>
                <p className="font-poppins text-white/80 leading-relaxed">
                  Personal account management and round-the-clock support ensuring your gifting initiatives exceed expectations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-24 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#AD9660]/10 text-[#AD9660] mb-4">Curated Excellence</Badge>
            <h2 className="font-frank-ruhl text-4xl lg:text-5xl font-bold text-[#323433] mb-6">Signature Collections</h2>
            <p className="font-poppins text-xl text-[#323433]/80 max-w-3xl mx-auto">
              Discover our meticulously crafted collections, each designed to elevate your corporate relationships and celebrate meaningful moments with distinction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white relative overflow-hidden rounded-2xl">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      width={400}
                      height={300}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="font-poppins font-medium">{collection.productCount}</div>
                      <div className="text-sm text-white/80">Starting {collection.startingPrice}</div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-frank-ruhl text-2xl font-bold text-[#323433] mb-3">{collection.title}</h3>
                    <p className="font-poppins text-[#323433]/70 mb-6 leading-relaxed">{collection.description}</p>
                    <Link
                      href={collection.link}
                      className="inline-flex items-center gap-2 text-[#AD9660] hover:text-[#AD9660]/80 font-medium transition-colors"
                    >
                      Explore Collection <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-secondary/10 text-secondary mb-4">Exclusive Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Corporate Gifting Excellence</h2>
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

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Why Distinguished Organizations Choose Tisorah
            </h2>
            <p className="text-xl text-neutral-600">Experience the pinnacle of corporate gifting excellence</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">1000+ Curated Products</h3>
              <p className="text-neutral-600">
                The most comprehensive collection of sophisticated corporate gifts with new arrivals each season.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Expedited Delivery</h3>
              <p className="text-neutral-600">
                Complimentary delivery on orders above ₹5,000 with express options available nationwide.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-neutral-500" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Uncompromising Quality</h3>
              <p className="text-neutral-600">
                Meticulously selected products with comprehensive quality assurance and satisfaction guarantee.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Dedicated Partnership</h3>
              <p className="text-neutral-600">
                Personal account management and round-the-clock support ensuring exceptional service excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Client Testimonials</h2>
            <p className="text-xl text-neutral-600">Authentic experiences from our distinguished clientele</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial: TestimonialData) => (
              <Card key={testimonial.id} className="bg-white shadow-xl border-0">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={testimonial.avatar_url || "/placeholder-avatar.png"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.position}</div>
                      <div className="text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4">{testimonial.content}</blockquote>
                  <div className="text-teal-600 font-medium">
                    Purchased: {testimonial.product_bought}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-3 rounded-xl"
            >
              <Link href="/testimonials" className="flex items-center gap-2">
                View All Testimonials <ArrowRight className="w-4 h-4" />
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
