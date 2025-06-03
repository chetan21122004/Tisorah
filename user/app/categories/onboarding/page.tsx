"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Star, ArrowRight, Users, Package, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OnboardingGiftsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  const products = [
    {
      id: 1,
      name: "Premium Welcome Kit",
      price: "$45-65",
      moq: "25 pieces",
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=300",
      description: "Complete onboarding package with branded items and welcome materials",
      delivery: "5-7 days",
      featured: true,
    },
    {
      id: 2,
      name: "Executive Welcome Package",
      price: "$85-120",
      moq: "15 pieces",
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      description: "Luxury onboarding gifts for senior positions",
      delivery: "7-10 days",
      featured: true,
    },
    {
      id: 3,
      name: "Starter Kit Essentials",
      price: "$25-40",
      moq: "50 pieces",
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      description: "Basic onboarding essentials for new employees",
      delivery: "3-5 days",
      featured: false,
    },
    {
      id: 4,
      name: "Remote Worker Welcome Kit",
      price: "$55-75",
      moq: "20 pieces",
      rating: 4.7,
      reviews: 98,
      image: "/placeholder.svg?height=300&width=300",
      description: "Perfect for remote and hybrid employees",
      delivery: "5-7 days",
      featured: false,
    },
    {
      id: 5,
      name: "Tech Professional Kit",
      price: "$70-95",
      moq: "30 pieces",
      rating: 4.8,
      reviews: 76,
      image: "/placeholder.svg?height=300&width=300",
      description: "Tech-focused welcome gifts for IT professionals",
      delivery: "7-10 days",
      featured: false,
    },
    {
      id: 6,
      name: "Eco-Friendly Welcome Set",
      price: "$40-60",
      moq: "25 pieces",
      rating: 4.5,
      reviews: 112,
      image: "/placeholder.svg?height=300&width=300",
      description: "Sustainable onboarding gifts for eco-conscious companies",
      delivery: "5-7 days",
      featured: false,
    },
  ]

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-teal-600" />,
      title: "First Impression",
      description: "Create a lasting positive first impression that sets the tone for employee engagement",
    },
    {
      icon: <Package className="w-8 h-8 text-amber-600" />,
      title: "Brand Connection",
      description: "Help new employees feel connected to your company culture and values from day one",
    },
    {
      icon: <Clock className="w-8 h-8 text-rose-600" />,
      title: "Faster Integration",
      description: "Accelerate the onboarding process and help new hires feel welcomed and valued",
    },
  ]

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Onboarding Gifts</h1>
              <p className="text-teal-600 font-medium">Welcome New Team Members</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Make a memorable first impression with our carefully curated onboarding gift collections. From welcome kits
            to executive packages, help new employees feel valued from their very first day.
          </p>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search onboarding gifts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Onboarding Gifts Matter</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.featured && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                      Featured
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-6">
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
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reviews:</span>
                      <span className="font-medium text-gray-900">{product.reviews} reviews</span>
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
