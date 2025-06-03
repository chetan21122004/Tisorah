"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Grid, List, Star, ArrowRight, Gift, Cake, PartyPopper } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BirthdayGiftsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [giftType, setGiftType] = useState("all")

  const products = [
    {
      id: 1,
      name: "Birthday Celebration Box",
      price: "$30-50",
      moq: "20 pieces",
      rating: 4.8,
      reviews: 92,
      image: "/placeholder.svg?height=300&width=300",
      description: "Complete birthday celebration package with cake voucher, personalized card, and gift items",
      delivery: "3-5 days",
      customizable: true,
      featured: true,
      type: "celebration",
    },
    {
      id: 2,
      name: "Premium Birthday Hamper",
      price: "$60-85",
      moq: "15 pieces",
      rating: 4.9,
      reviews: 78,
      image: "/placeholder.svg?height=300&width=300",
      description: "Luxury birthday hamper with gourmet treats, premium gifts, and personalized message",
      delivery: "5-7 days",
      customizable: true,
      featured: true,
      type: "hamper",
    },
    {
      id: 3,
      name: "Personalized Birthday Mug Set",
      price: "$25-35",
      moq: "30 pieces",
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      description: "Custom printed mugs with employee names and birthday wishes",
      delivery: "7-10 days",
      customizable: true,
      featured: false,
      type: "personalized",
    },
    {
      id: 4,
      name: "Birthday Desk Accessories",
      price: "$40-60",
      moq: "25 pieces",
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      description: "Professional desk accessories with birthday theme and company branding",
      delivery: "5-7 days",
      customizable: true,
      featured: false,
      type: "accessories",
    },
    {
      id: 5,
      name: "Birthday Wellness Kit",
      price: "$45-70",
      moq: "20 pieces",
      rating: 4.8,
      reviews: 67,
      image: "/placeholder.svg?height=300&width=300",
      description: "Wellness-focused birthday gifts including spa items, healthy snacks, and relaxation products",
      delivery: "3-5 days",
      customizable: true,
      featured: true,
      type: "wellness",
    },
    {
      id: 6,
      name: "Birthday Tech Bundle",
      price: "$80-120",
      moq: "10 pieces",
      rating: 4.9,
      reviews: 45,
      image: "/placeholder.svg?height=300&width=300",
      description: "Modern tech accessories perfect for birthday celebrations in the workplace",
      delivery: "5-7 days",
      customizable: true,
      featured: true,
      type: "tech",
    },
  ]

  const benefits = [
    {
      icon: <Cake className="w-6 h-6 text-teal-600" />,
      title: "Memorable Celebrations",
      description: "Create lasting memories with thoughtfully curated birthday gifts",
    },
    {
      icon: <PartyPopper className="w-6 h-6 text-teal-600" />,
      title: "Boost Team Morale",
      description: "Show appreciation and strengthen workplace relationships",
    },
    {
      icon: <Gift className="w-6 h-6 text-teal-600" />,
      title: "Personalized Touch",
      description: "Custom branding and personalization options available",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = giftType === "all" || product.type === giftType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <Cake className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Birthday Gifts</h1>
              <p className="text-xl text-pink-600 font-medium">Celebrate Every Milestone</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Make every birthday special with our curated collection of corporate birthday gifts. From personalized items
            to celebration packages, we help you show appreciation for your team members on their special day.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search birthday gifts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select value={giftType} onValueChange={setGiftType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Gift Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="celebration">Celebration Boxes</SelectItem>
                <SelectItem value="hamper">Premium Hampers</SelectItem>
                <SelectItem value="personalized">Personalized Items</SelectItem>
                <SelectItem value="accessories">Desk Accessories</SelectItem>
                <SelectItem value="wellness">Wellness Kits</SelectItem>
                <SelectItem value="tech">Tech Bundles</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-40">Under $40</SelectItem>
                <SelectItem value="40-70">$40 - $70</SelectItem>
                <SelectItem value="70+">$70+</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-2"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <p className="text-gray-600">Showing {filteredProducts.length} birthday gift options</p>
        </div>

        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-md ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === "list" ? "h-full rounded-l-lg" : "h-48 rounded-t-lg"
                    }`}
                  />
                  {product.featured && <Badge className="absolute top-3 left-3 bg-pink-500 text-white">Featured</Badge>}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  {product.customizable && (
                    <Badge className="absolute bottom-3 left-3 bg-teal-600 text-white">Customizable</Badge>
                  )}
                </div>
                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 text-sm">{product.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price Range:</span>
                      <span className="font-medium text-gray-900">{product.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">MOQ:</span>
                      <span className="font-medium text-gray-900">{product.moq}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium text-gray-900">{product.delivery}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                      <Link href={`/products/${product.id}`} className="flex items-center gap-2">
                        View Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  )
}
