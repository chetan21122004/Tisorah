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
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Executive Welcome Collection",
      price: "₹4,999",
      originalPrice: "₹6,499",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center",
      rating: 4.9,
      reviews: 124,
      badge: "Signature",
      discount: "23% OFF",
      inStock: true,
    },
    {
      id: 2,
      name: "Luxury Executive Hamper",
      price: "₹7,999",
      originalPrice: "₹10,499",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop&crop=center",
      rating: 4.9,
      reviews: 89,
      badge: "Exclusive",
      discount: "24% OFF",
      inStock: true,
    },
    {
      id: 3,
      name: "Bespoke Branding Set",
      price: "₹3,499",
      originalPrice: "₹4,499",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center",
      rating: 4.8,
      reviews: 156,
      badge: "Popular",
      discount: "22% OFF",
      inStock: true,
    },
    {
      id: 4,
      name: "Recognition Trophy Collection",
      price: "₹5,499",
      originalPrice: "₹7,199",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=300&fit=crop&crop=center",
      rating: 4.7,
      reviews: 203,
      badge: "Premium",
      discount: "24% OFF",
      inStock: true,
    },
  ]

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

  const testimonials = [
    {
      name: "Rajesh Sharma",
      position: "Chief Executive Officer",
      company: "TechVision Industries",
      content:
        "Tisorah's exceptional attention to detail and sophisticated curation elevated our client appreciation program beyond expectations. Their commitment to excellence mirrors our own organizational values.",
      rating: 5,
      productBought: "Executive Welcome Collection",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    },
    {
      name: "Priya Mehta",
      position: "Head of Human Resources",
      company: "Innovation Dynamics",
      content:
        "The bespoke solutions provided by Tisorah transformed our employee recognition initiatives. Each gift reflects the premium quality and thoughtfulness that defines our corporate culture.",
      rating: 5,
      productBought: "Luxury Executive Hamper",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    },
    {
      name: "Arjun Patel",
      position: "Managing Director",
      company: "Heritage Enterprises",
      content:
        "Tisorah's festival collections beautifully honor our cultural traditions while maintaining the sophistication our organization demands. Truly exceptional craftsmanship and service.",
      rating: 5,
      productBought: "Festival Celebration Collection",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
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
    <div className="min-h-screen">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
          title="WhatsApp Consultation"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Button
          className="bg-secondary hover:bg-secondary/90 text-white rounded-full w-14 h-14 shadow-lg"
          title="View Curated Selection"
        >
          <Link href="/shortlist">
            <Heart className="w-6 h-6" />
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral via-white to-neutral-200 py-8 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Promotional Banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-accent text-white px-6 py-3 rounded-full text-sm font-medium animate-pulse">
              <Zap className="w-4 h-4" />
              <span>✨ Exclusive Collection: Up to 25% OFF Premium Selections | Limited Period</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600 font-medium">4.9/5 from 2,500+ distinguished clients</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-tight">
                  Exquisite Corporate Gifts
                  <span className="block text-secondary">Starting at ₹2,999</span>
                </h1>

                <p className="text-xl text-neutral-600 leading-relaxed">
                  Discover our curated collection of sophisticated corporate gifts that elevate business relationships
                  and embody excellence.
                  <span className="block font-semibold text-secondary mt-2">
                    Complimentary delivery on orders above ₹5,000
                  </span>
                </p>
              </div>

              {/* Enhanced Search Bar */}
              <div className="relative">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <Input
                      placeholder="Discover exceptional gifts by occasion or preference..."
                      className="pl-12 pr-4 py-4 text-lg border-2 border-neutral-300 focus:border-secondary rounded-xl bg-white shadow-sm"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-xl shadow-lg"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-neutral-300 hover:border-secondary px-4 py-4 rounded-xl"
                  >
                    <Filter className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Quick Categories */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-neutral-700">Explore Collections:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {quickCategories.map((category, index) => (
                    <Link key={index} href={category.link}>
                      <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200 hover:border-secondary hover:bg-neutral-50 cursor-pointer transition-all duration-200 shadow-sm">
                        <span className="text-lg">{category.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-primary">{category.name}</div>
                          <div className="text-xs text-neutral-500">{category.count} items</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-xl shadow-lg"
                >
                  <Link href="/categories" className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Explore Collections
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-secondary text-secondary hover:bg-secondary/10 px-8 py-4 rounded-xl"
                >
                  <Link href="/shortlist" className="flex items-center gap-2">
                    ❤️ Curated Selection
                  </Link>
                </Button>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex-1"
                >
                  <Link href="https://wa.me/919860002313" className="flex items-center gap-2">
                    💬 WhatsApp Consultation
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl shadow-lg flex-1"
                >
                  <Link href="/quote" className="flex items-center gap-2">
                    📨 Request Consultation
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-neutral-600 font-medium">Secure Transactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-accent" />
                  <span className="text-sm text-neutral-600 font-medium">Complimentary Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-neutral-600 font-medium">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right Content - Featured Products Grid */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <h3 className="text-2xl font-bold text-primary">Featured Collections</h3>
                </div>
                <p className="text-neutral-600">Most coveted selections this season</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.map((product, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white relative overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <Link href={`/products/${product.id}`}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={200}
                            height={160}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        <Badge className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1">
                          {product.discount}
                        </Badge>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button size="sm" variant="ghost" className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
                            <Link href={`/products/${product.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <Link href={`/products/${product.id}`}>
                          <h4 className="font-semibold text-primary mb-2 text-sm leading-tight hover:text-secondary">
                            {product.name}
                          </h4>
                        </Link>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-secondary fill-current" />
                          ))}
                          <span className="text-xs text-neutral-600">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-lg font-bold text-secondary">{product.price}</span>
                            <span className="text-sm text-neutral-500 line-through ml-2">{product.originalPrice}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <Button size="sm" className="w-full bg-secondary hover:bg-secondary/90 text-white">
                            <Link href={`/products/${product.id}`} className="flex items-center gap-1">
                              View Details
                            </Link>
                          </Button>
                          <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-white">
                            <Check className="w-3 h-3 mr-1" />
                            Add to Selection
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                  <Link href="/products" className="flex items-center justify-center gap-2">
                    Explore All Collections <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-neutral-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">1000+</div>
              <div className="text-sm text-neutral-600">Curated Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">10K+</div>
              <div className="text-sm text-neutral-600">Satisfied Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-500 mb-1">50+</div>
              <div className="text-sm text-neutral-600">Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">4.9★</div>
              <div className="text-sm text-neutral-600">Excellence Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border-r border-white/20">
              <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Uncompromising Quality</h3>
              <p className="text-neutral-300">
                Meticulously curated products that embody sophistication and reflect your organization's commitment to
                excellence
              </p>
            </div>

            <div className="text-center p-6 border-r border-white/20">
              <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Corporate Expertise</h3>
              <p className="text-neutral-300">
                Over a decade of distinguished service in corporate gifting with 500+ satisfied clients across diverse
                industries
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dedicated Partnership</h3>
              <p className="text-neutral-300">
                Personal account management and round-the-clock support ensuring your gifting initiatives exceed
                expectations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Curated Collections</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover our meticulously crafted collections, each designed to elevate your corporate relationships and
              celebrate meaningful moments with distinction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm font-semibold">{collection.productCount}</div>
                      <div className="text-xs opacity-90">Starting {collection.startingPrice}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-2">{collection.title}</h3>
                    <p className="text-neutral-600 mb-4">{collection.description}</p>
                    <div className="flex items-center justify-between">
                      <Link
                        href={collection.link}
                        className="text-secondary hover:text-secondary/80 font-medium flex items-center gap-2"
                      >
                        Explore Collection <ArrowRight className="w-4 h-4" />
                      </Link>
                      <span className="text-sm font-semibold text-primary">{collection.startingPrice}+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-xl">
              <Link href="/categories" className="flex items-center gap-2">
                View All Collections <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
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
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-primary">{testimonial.name}</div>
                      <div className="text-sm text-neutral-600">{testimonial.position}</div>
                      <div className="text-sm text-secondary font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-secondary fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-600 mb-4 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="text-sm text-secondary font-medium">Collection: {testimonial.productBought}</div>
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
      <section className="py-20 bg-gradient-to-br from-secondary via-accent to-primary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Main CTA Content */}
            <div className="mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Elevate Your Corporate Relationships
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Subscribe to our exclusive newsletter and be the first to discover new collections, receive special
                offers, and access sophisticated corporate gifting insights.
              </p>

              {/* Newsletter Signup */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 text-lg rounded-xl border-0 text-primary bg-white/95 backdrop-blur-sm shadow-lg"
                />
                <Button
                  size="lg"
                  className="bg-white text-secondary hover:bg-neutral-100 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>

              <p className="text-lg text-white/80 mb-8 font-medium">
                🎁 Receive exclusive access to our premium collections and special pricing
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="https://wa.me/919860002313" className="flex items-center justify-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-bold text-lg">💬 WhatsApp Consultation</div>
                    <div className="text-sm opacity-90">Immediate expert assistance</div>
                  </div>
                </Link>
              </Button>

              <Button
                size="lg"
                className="bg-white text-secondary hover:bg-neutral-100 px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/quote" className="flex items-center justify-center gap-3">
                  <Mail className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-bold text-lg">📨 Request Consultation</div>
                    <div className="text-sm opacity-90">Bespoke solutions for your organization</div>
                  </div>
                </Link>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">24/7</div>
                  <div className="text-white/80 text-sm">Expert Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">Free</div>
                  <div className="text-white/80 text-sm">Delivery Above ₹5K</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">1000+</div>
                  <div className="text-white/80 text-sm">Curated Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                  <div className="text-white/80 text-sm">Excellence Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
