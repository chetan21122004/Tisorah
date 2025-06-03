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
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
              <Package className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Corporate Packages</h1>
              <p className="text-teal-600 font-medium text-lg">Pre-Designed Gift Solutions</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully curated corporate gift packages, designed to make every occasion special while
            staying within your budget.
          </p>
        </div>

        {/* Seasonal Offers */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {seasonalOffers.map((offer, index) => (
            <Card key={index} className="bg-gradient-to-r from-teal-600 to-teal-700 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-teal-100 mb-2">{offer.description}</p>
                    <p className="text-sm text-teal-200">Valid until {offer.validUntil}</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="text-sm text-teal-100">Use Code</div>
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
              className={`group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg relative ${
                pkg.popular ? "ring-2 ring-teal-600" : ""
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white px-4 py-1">
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
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 rounded-lg px-2 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      {pkg.occasions.map((occasion, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {occasion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-teal-600">{pkg.price}</span>
                      <span className="text-sm text-gray-500 line-through">{pkg.originalPrice}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Min Order:</span>
                      <span className="font-medium">{pkg.minOrder}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium">{pkg.deliveryTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Reviews:</span>
                      <span className="font-medium">{pkg.reviews} reviews</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-gray-900">What's Included:</h4>
                    <ul className="space-y-1">
                      {pkg.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {pkg.features.length > 4 && (
                        <li className="text-sm text-teal-600 font-medium">+{pkg.features.length - 4} more items</li>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <Link href={`/packages/${pkg.id}`} className="flex items-center gap-2">
                        View Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Link href="/quote">Request Custom Quote</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Corporate Packages?</h2>
            <p className="text-lg text-gray-600">Designed with your business needs in mind</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Curated Selection</h3>
              <p className="text-gray-600">
                Each package is carefully curated by our experts to ensure maximum impact and value for your investment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Scalable Solutions</h3>
              <p className="text-gray-600">
                From small teams to large corporations, our packages can be scaled to meet your specific requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Branding</h3>
              <p className="text-gray-600">
                All packages include custom branding options to ensure your company's identity shines through.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
