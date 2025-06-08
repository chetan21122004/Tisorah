import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Users, Package, Gift, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PackagesPage() {
  const packages = [
    {
      id: 1,
      name: "Starter Package",
      description: "Perfect for small teams and startups",
      price: "$35-50",
      originalPrice: "$45-65",
      minOrder: "25 pieces",
      rating: 4.7,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=400",
      popular: false,
      features: ["Welcome notebook with logo", "Branded pen", "Company stickers", "Welcome card", "Basic gift box"],
      occasions: ["Onboarding", "Small Events"],
      deliveryTime: "5-7 days",
    },
    {
      id: 2,
      name: "Professional Package",
      description: "Comprehensive solution for growing companies",
      price: "$65-85",
      originalPrice: "$80-105",
      minOrder: "50 pieces",
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=400",
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
      price: "$120-180",
      originalPrice: "$150-220",
      minOrder: "15 pieces",
      rating: 4.8,
      reviews: 67,
      image: "/placeholder.svg?height=300&width=400",
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
      price: "$45-70",
      originalPrice: "$60-90",
      minOrder: "30 pieces",
      rating: 4.6,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=400",
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
      price: "$55-75",
      originalPrice: "$70-95",
      minOrder: "20 pieces",
      rating: 4.8,
      reviews: 98,
      image: "/placeholder.svg?height=300&width=400",
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
      price: "$40-60",
      originalPrice: "$55-80",
      minOrder: "40 pieces",
      rating: 4.5,
      reviews: 76,
      image: "/placeholder.svg?height=300&width=400",
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
    },
    {
      title: "New Year Onboarding",
      description: "Free customization on orders above $1000",
      validUntil: "January 31, 2025",
      code: "NEWYEAR2025",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F4F4F4] py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 relative">
            <div className="w-20 h-20 bg-[#E6E2DD] rounded-sm flex items-center justify-center">
              <Package className="w-10 h-10 text-[#323433]" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-20 h-20 border border-[#AD9660] rounded-sm"></div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#323433] mb-2 font-serif">Corporate Packages</h1>
          <p className="text-[#1E2A47] font-medium text-lg mb-6 font-sans">Pre-Designed Gift Solutions</p>
          <div className="max-w-3xl mx-auto relative">
            <div className="h-px w-24 bg-[#AD9660] absolute left-1/2 -translate-x-1/2 -top-4"></div>
            <p className="text-xl text-[#323433] font-light leading-relaxed">
              Choose from our carefully curated corporate gift packages, designed to make every occasion special while
              staying within your budget.
            </p>
          </div>
        </div>

        {/* Seasonal Offers */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {seasonalOffers.map((offer, index) => (
            <Card key={index} className="bg-[#1E2A47] text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 font-serif">{offer.title}</h3>
                    <p className="text-[#F4F4F4] mb-2 font-light">{offer.description}</p>
                    <p className="text-sm text-[#E6E2DD]">Valid until {offer.validUntil}</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/10 border border-[#AD9660] p-3">
                      <div className="text-sm text-[#E6E2DD]">Use Code</div>
                      <div className="font-bold text-lg">{offer.code}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`group hover:shadow-md transition-all duration-300 border-0 shadow-sm bg-white relative ${
                pkg.popular ? "ring-1 ring-[#AD9660]" : ""
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#AD9660] text-white px-4 py-1 font-light">
                  Most Popular
                </Badge>
              )}
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 px-2 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#AD9660] fill-current" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-[#323433] mb-2 font-serif">{pkg.name}</h3>
                    <p className="text-[#323433] text-sm mb-3 font-light">{pkg.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      {pkg.occasions.map((occasion, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-[#C8C2B6] text-[#323433]">
                          {occasion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#1E2A47] font-serif">{pkg.price}</span>
                      <span className="text-sm text-[#AB8E76] line-through">{pkg.originalPrice}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#323433] font-light">Min Order:</span>
                      <span className="font-medium">{pkg.minOrder}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#323433] font-light">Delivery:</span>
                      <span className="font-medium">{pkg.deliveryTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#323433] font-light">Reviews:</span>
                      <span className="font-medium">{pkg.reviews} reviews</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-[#323433]">What's Included:</h4>
                    <ul className="space-y-1">
                      {pkg.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-[#323433] font-light">
                          <CheckCircle className="w-4 h-4 text-[#AD9660] flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {pkg.features.length > 4 && (
                        <li className="text-sm text-[#1E2A47] font-medium">+{pkg.features.length - 4} more items</li>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-[#1E2A47] hover:bg-[#323433] text-white">
                      <Link href={`/packages/${pkg.id}`} className="flex items-center gap-2">
                        View Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full border-[#AD9660] text-[#323433] hover:bg-[#E6E2DD]">
                      <Link href="/quote">Request Custom Quote</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white p-8 mb-16 border border-[#E6E2DD]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#323433] mb-4 font-serif relative inline-block">
              Why Choose Our Corporate Packages?
              <div className="absolute -bottom-3 left-0 right-0 h-px bg-[#AD9660]"></div>
            </h2>
            <p className="text-lg text-[#323433] font-light mt-6">Designed with your business needs in mind</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E6E2DD] rounded-sm flex items-center justify-center mx-auto mb-4 relative">
                <Package className="w-8 h-8 text-[#1E2A47]" />
                <div className="absolute -bottom-1 -right-1 w-16 h-16 border border-[#AD9660] rounded-sm"></div>
              </div>
              <h3 className="text-xl font-semibold text-[#323433] mb-3 font-serif">Curated Selection</h3>
              <p className="text-[#323433] font-light">
                Each package is carefully curated by our experts to ensure maximum impact and value for your investment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#E6E2DD] rounded-sm flex items-center justify-center mx-auto mb-4 relative">
                <Users className="w-8 h-8 text-[#1E2A47]" />
                <div className="absolute -bottom-1 -right-1 w-16 h-16 border border-[#AD9660] rounded-sm"></div>
              </div>
              <h3 className="text-xl font-semibold text-[#323433] mb-3 font-serif">Scalable Solutions</h3>
              <p className="text-[#323433] font-light">
                From small teams to large corporations, our packages can be scaled to meet your specific requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#E6E2DD] rounded-sm flex items-center justify-center mx-auto mb-4 relative">
                <Gift className="w-8 h-8 text-[#1E2A47]" />
                <div className="absolute -bottom-1 -right-1 w-16 h-16 border border-[#AD9660] rounded-sm"></div>
              </div>
              <h3 className="text-xl font-semibold text-[#323433] mb-3 font-serif">Custom Branding</h3>
              <p className="text-[#323433] font-light">
                All packages include custom branding options to ensure your company's identity shines through.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
