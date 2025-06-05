"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Grid, List, Star, ArrowRight, Gift, Cake, PartyPopper, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BirthdayGiftsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [giftType, setGiftType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

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
      icon: <Cake className="w-6 h-6 text-[#AD9660]" />,
      title: "Memorable Celebrations",
      description: "Create lasting memories with thoughtfully curated birthday gifts",
    },
    {
      icon: <PartyPopper className="w-6 h-6 text-[#AD9660]" />,
      title: "Boost Team Morale",
      description: "Show appreciation and strengthen workplace relationships",
    },
    {
      icon: <Gift className="w-6 h-6 text-[#AD9660]" />,
      title: "Personalized Touch",
      description: "Custom branding and personalization options available",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = giftType === "all" || product.type === giftType
    
    let matchesPrice = true
    if (priceRange === "under-40") {
      matchesPrice = parseInt(product.price.replace(/\$|-.*/g, "")) < 40
    } else if (priceRange === "40-70") {
      const minPrice = parseInt(product.price.replace(/\$|-.*/g, ""))
      matchesPrice = minPrice >= 40 && minPrice <= 70
    } else if (priceRange === "70+") {
      matchesPrice = parseInt(product.price.replace(/\$|-.*/g, "")) > 70
    }
    
    return matchesSearch && matchesType && matchesPrice
  })

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Hero Section */}
      <div className="relative bg-[#1E2A47] text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl lg:text-6xl font-medium mb-4">Birthday Gifts</h1>
            <p className="text-xl font-light text-[#E6E2DD] mb-8 leading-relaxed">
              Elevate your corporate celebrations with our exquisite collection of birthday gifts, 
              meticulously curated to create memorable moments for your valued team members.
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#AD9660] hover:bg-[#C8C2B6] text-white border-none">
                Request Quote
              </Button>
              <Button variant="outline" className="border-[#AD9660] text-[#AD9660] hover:bg-[#AD9660] hover:text-white">
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl text-[#323433] text-center mb-2">Why Choose Our Birthday Gifts</h2>
          <div className="w-24 h-1 bg-[#AD9660] mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none rounded-none shadow-md hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#E6E2DD] rounded-full flex items-center justify-center mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#323433] mb-3">{benefit.title}</h3>
                  <p className="text-[#323433] text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <h2 className="font-serif text-3xl text-[#323433] mb-4 lg:mb-0">Our Collection</h2>
            
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search gifts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#C8C2B6] rounded-none focus:border-[#AD9660] focus:ring-[#AD9660] w-[200px]"
                />
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="lg:hidden border-[#C8C2B6] text-[#323433]"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <div className="hidden lg:flex items-center gap-4">
                <Select value={giftType} onValueChange={setGiftType}>
                  <SelectTrigger className="w-[150px] border-[#C8C2B6] rounded-none focus:border-[#AD9660] focus:ring-[#AD9660]">
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
                  <SelectTrigger className="w-[150px] border-[#C8C2B6] rounded-none focus:border-[#AD9660] focus:ring-[#AD9660]">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-40">Under $40</SelectItem>
                    <SelectItem value="40-70">$40 - $70</SelectItem>
                    <SelectItem value="70+">$70+</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-2 border border-[#C8C2B6] p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`p-1 ${viewMode === "grid" ? "bg-[#AD9660] text-white" : "text-[#323433]"}`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`p-1 ${viewMode === "list" ? "bg-[#AD9660] text-white" : "text-[#323433]"}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mb-6 p-4 border border-[#C8C2B6] bg-white">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#323433] mb-1 block">Gift Type</label>
                  <Select value={giftType} onValueChange={setGiftType}>
                    <SelectTrigger className="w-full border-[#C8C2B6] rounded-none focus:border-[#AD9660] focus:ring-[#AD9660]">
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
                </div>
                
                <div>
                  <label className="text-sm text-[#323433] mb-1 block">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="w-full border-[#C8C2B6] rounded-none focus:border-[#AD9660] focus:ring-[#AD9660]">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-40">Under $40</SelectItem>
                      <SelectItem value="40-70">$40 - $70</SelectItem>
                      <SelectItem value="70+">$70+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-[#323433] mb-1 block">View Mode</label>
                  <div className="flex items-center gap-2 border border-[#C8C2B6] p-1 w-fit">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`p-1 ${viewMode === "grid" ? "bg-[#AD9660] text-white" : "text-[#323433]"}`}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`p-1 ${viewMode === "list" ? "bg-[#AD9660] text-white" : "text-[#323433]"}`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <p className="text-[#323433] font-light">Showing {filteredProducts.length} birthday gift options</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`group border-none rounded-none shadow-md hover:shadow-xl transition-all duration-300 ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className={`w-full object-cover ${
                      viewMode === "list" ? "h-full" : "h-64"
                    }`}
                  />
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-[#AD9660] text-white font-light rounded-none px-3 py-1">
                      Featured
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-[#323433] rounded-full h-8 w-8"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-[#AD9660] fill-[#AD9660]" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#323433] mb-2">{product.name}</h3>
                  <p className="text-[#323433] text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price Range:</span>
                      <span className="font-medium text-[#323433]">{product.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">MOQ:</span>
                      <span className="font-medium text-[#323433]">{product.moq}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium text-[#323433]">{product.delivery}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-[#323433] hover:bg-[#1E2A47] text-white rounded-none">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1 border-[#323433] text-[#323433] hover:bg-[#323433] hover:text-white rounded-none">
                      Request Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-[#1E2A47] text-white p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">Looking for Custom Birthday Solutions?</h2>
            <p className="text-[#E6E2DD] mb-8 leading-relaxed">
              Our team of experts can help you create personalized birthday gift experiences 
              that align perfectly with your company culture and values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#AD9660] hover:bg-[#C8C2B6] text-white rounded-none">
                Schedule Consultation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1E2A47] rounded-none">
                View Corporate Packages
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
