import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  Star, 
  Users, 
  Package, 
  Gift, 
  ArrowRight,
  Clock,
  Check,
  Truck,
  Shield,
  Award
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { QuotePopup } from "@/components/quote-popup"

export default function PackagesPage() {
  const packages = [
    {
      id: 1,
      name: "Starter Package",
      description: "Perfect for small teams and startups",
      price: "₹3,500-5,000",
      originalPrice: "₹4,500-6,500",
      minOrder: "25 pieces",
      rating: 4.7,
      reviews: 89,
      image: "https://www.boxupgifting.com/cdn/shop/files/Employee_Onboarding_aeb3ed63-0ceb-4d55-9058-136583b8e7c1.png?v=1736240876",
      popular: false,
      features: ["Welcome notebook with logo", "Branded pen", "Company stickers", "Welcome card", "Basic gift box"],
      occasions: ["Onboarding", "Small Events"],
      deliveryTime: "5-7 days",
    },
    {
      id: 2,
      name: "Professional Package",
      description: "Comprehensive solution for growing companies",
      price: "₹6,500-8,500",
      originalPrice: "₹8,000-10,500",
      minOrder: "50 pieces",
      rating: 4.9,
      reviews: 156,
      image: "https://www.boxupgifting.com/cdn/shop/files/Work_Anniversary.png?v=1736240917",
      popular: true,
      features: [
        "Premium notebook with logo",
        "Stainless steel water bottle",
        "Wireless charging pad",
        "Branded tote bag",
        "Custom welcome card",
        "Premium gift box",
        "Branded pen set",
      ],
      occasions: ["Onboarding", "Recognition", "Client Gifts"],
      deliveryTime: "3-5 days",
    },
    {
      id: 3,
      name: "Executive Package",
      description: "Luxury gifts for senior leadership and VIP clients",
      price: "₹12,000-18,000",
      originalPrice: "₹15,000-22,000",
      minOrder: "15 pieces",
      rating: 4.8,
      reviews: 67,
      image: "https://www.boxupgifting.com/cdn/shop/files/Client_Appreciation_7f2b79cc-0947-4a67-b7cf-cab0a5c14e68.png?v=1736240974",
      popular: false,
      features: [
        "Leather portfolio with logo",
        "Premium pen set",
        "Bluetooth speaker",
        "Luxury notebook",
        "Custom crystal award",
        "Premium packaging",
        "Personalized message",
        "White-glove delivery",
      ],
      occasions: ["Executive Gifts", "Client Appreciation", "Awards"],
      deliveryTime: "7-10 days",
    },
    {
      id: 4,
      name: "Festival Celebration",
      description: "Special packages for holiday and festival celebrations",
      price: "₹4,500-7,000",
      originalPrice: "₹6,000-9,000",
      minOrder: "30 pieces",
      rating: 4.6,
      reviews: 124,
      image: "https://www.boxupgifting.com/cdn/shop/files/Corporate_Events_7bf08475-18f0-4df1-9d0f-74630cacf7bd.png?v=1736241000",
      popular: false,
      features: [
        "Festival-themed hamper",
        "Gourmet snacks",
        "Branded items",
        "Festive packaging",
        "Custom greeting card",
        "Seasonal decorations",
      ],
      occasions: ["Festivals", "Holidays", "Celebrations"],
      deliveryTime: "5-7 days",
    },
    {
      id: 5,
      name: "Remote Worker Kit",
      description: "Essential items for remote and hybrid employees",
      price: "₹5,500-7,500",
      originalPrice: "₹7,000-9,500",
      minOrder: "20 pieces",
      rating: 4.8,
      reviews: 98,
      image: "https://www.boxupgifting.com/cdn/shop/files/Employee_Onboarding_aeb3ed63-0ceb-4d55-9058-136583b8e7c1.png?v=1736240876",
      popular: false,
      features: [
        "Ergonomic mouse pad",
        "Blue light glasses",
        "Desk organizer",
        "Branded mug",
        "Notebook and pen",
        "Cable organizer",
        "Stress relief items",
      ],
      occasions: ["Remote Onboarding", "Work from Home"],
      deliveryTime: "3-5 days",
    },
    {
      id: 6,
      name: "Team Building Package",
      description: "Fun and engaging items for team building activities",
      price: "₹4,000-6,000",
      originalPrice: "₹5,500-8,000",
      minOrder: "40 pieces",
      rating: 4.5,
      reviews: 76,
      image: "https://www.boxupgifting.com/cdn/shop/files/Rewards_and_Recognition.png?v=1736240932",
      popular: false,
      features: [
        "Team t-shirts",
        "Fun desk accessories",
        "Puzzle games",
        "Branded water bottles",
        "Team photo frame",
        "Activity guidebook",
      ],
      occasions: ["Team Building", "Corporate Events"],
      deliveryTime: "7-10 days",
    },
  ]

  const seasonalOffers = [
    {
      title: "Holiday Season Special",
      description: "25% off on all festival packages",
      validUntil: "December 31, 2024",
      code: "HOLIDAY25",
      icon: <Gift className="w-12 h-12 text-[#AD9660]" />,
    },
    {
      title: "New Year Onboarding",
      description: "Free customization on orders above ₹1,00,000",
      validUntil: "January 31, 2025",
      code: "NEWYEAR2025",
      icon: <Package className="w-12 h-12 text-[#AD9660]" />,
    },
  ]

  const benefits = [
    {
      icon: <Shield className="w-6 h-6 text-[#AD9660]" />,
      title: "Quality Assured",
      description: "Premium products sourced from trusted partners",
    },
    {
      icon: <Truck className="w-6 h-6 text-[#AD9660]" />,
      title: "Fast Delivery",
      description: "Nationwide shipping with tracking",
    },
    {
      icon: <Award className="w-6 h-6 text-[#AD9660]" />,
      title: "Custom Branding",
      description: "Professional customization options",
    },
  ]

  return (
    <div className="min-h-screen">
      <QuotePopup />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#1E2A47] to-[#323433] overflow-hidden">
        {/* Abstract geometric patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#AD9660]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#AD9660]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5 bg-repeat"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 border border-[#AD9660]/20">
                <Package className="w-5 h-5 text-[#AD9660]" />
                <span className="text-[#E6E2DD] font-light tracking-wide">CURATED CORPORATE PACKAGES</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              Premium Corporate <br />
              <span className="text-[#AD9660]">Gift Collections</span>
            </h1>
            
            <p className="text-xl text-[#E6E2DD]/90 leading-relaxed font-light max-w-2xl mx-auto mb-12">
              Choose from our thoughtfully curated packages designed to make every corporate occasion memorable while maintaining your budget.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white border border-[#AD9660]/10 transition-all duration-300 hover:border-[#AD9660]/30 hover:shadow-lg">
                <div className="p-3 bg-[#F4F4F4] rounded-sm">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-serif text-[#323433] mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 font-light">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-16 bg-[#F4F4F4] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
              <span className="text-sm uppercase tracking-wider text-[#AD9660] font-light">Special Offers</span>
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
            </div>
            
            <h2 className="text-4xl font-serif text-[#323433] mb-6">
              Seasonal <span className="text-[#AD9660]">Promotions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {seasonalOffers.map((offer, index) => (
              <div key={index} className="bg-white border border-[#AD9660]/10 p-8 transition-all duration-300 hover:border-[#AD9660]/30 hover:shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-[#F4F4F4]">
                    {offer.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-[#323433] mb-2">{offer.title}</h3>
                    <p className="text-gray-600 font-light mb-4">{offer.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="bg-[#F4F4F4] px-4 py-2">
                        <span className="text-sm text-gray-600 font-light">Use Code</span>
                        <div className="text-lg font-medium text-[#AD9660]">{offer.code}</div>
                      </div>
                      <div className="text-sm text-gray-600 font-light">
                        Valid until {offer.validUntil}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
              <span className="text-sm uppercase tracking-wider text-[#AD9660] font-light">Our Packages</span>
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
            </div>
            
            <h2 className="text-4xl font-serif text-[#323433] mb-6">
              Curated <span className="text-[#AD9660]">Gift Collections</span>
            </h2>
            
            <p className="text-gray-600 font-light">
              Choose from our range of thoughtfully designed packages for every corporate occasion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`group bg-white border border-[#AD9660]/10 transition-all duration-300 hover:border-[#AD9660]/30 hover:shadow-lg relative ${
                  pkg.popular ? "border-[#AD9660]" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#AD9660] text-white px-6 py-1 text-sm font-light">
                    Most Popular
                  </div>
                )}

                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#AD9660] fill-current" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                    <span className="text-sm text-gray-600 font-light">({pkg.reviews})</span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif text-[#323433] mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 font-light mb-4">{pkg.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.occasions.map((occasion, index) => (
                        <span key={index} className="text-sm bg-[#F4F4F4] text-gray-600 px-3 py-1">
                          {occasion}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-serif text-[#323433]">{pkg.price}</div>
                      <div className="text-sm text-gray-500 line-through font-light">{pkg.originalPrice}</div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-light">
                      <Users className="w-4 h-4" />
                      <span>Min. Order: {pkg.minOrder}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-light">
                      <Clock className="w-4 h-4" />
                      <span>Delivery: {pkg.deliveryTime}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="text-sm font-medium text-[#323433]">Package Includes:</div>
                    <div className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600 font-light">
                          <Check className="w-4 h-4 text-[#AD9660]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-[#323433] hover:bg-black text-white flex items-center justify-center gap-2 group py-6">
                    <span>Request Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1E2A47] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#AD9660]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#AD9660]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif text-white mb-6">
              Need a <span className="text-[#AD9660]">Custom Package</span>?
            </h2>
            
            <p className="text-xl text-[#E6E2DD]/90 font-light mb-12">
              Let us help you create a personalized gifting solution that perfectly matches your requirements and budget.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Button className="bg-[#AD9660] hover:bg-[#8d7c50] text-white px-8 py-6 rounded-sm shadow-sm flex items-center gap-2 group transition-all duration-300">
                <span>Get Custom Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button variant="outline" className="border-[#AD9660] text-[#E6E2DD] hover:bg-[#AD9660]/10 px-8 py-6 rounded-sm">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
