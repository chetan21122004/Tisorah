"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Star, ArrowRight, Award, Trophy, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RecognitionGiftsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  const products = [
    {
      id: 1,
      name: "Crystal Excellence Award",
      price: "$75-120",
      moq: "10 pieces",
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      description: "Premium crystal award with custom engraving for top performers",
      delivery: "7-10 days",
      category: "Awards",
      featured: true,
    },
    {
      id: 2,
      name: "Executive Recognition Set",
      price: "$95-150",
      moq: "5 pieces",
      rating: 4.8,
      reviews: 67,
      image: "/placeholder.svg?height=300&width=300",
      description: "Luxury gift set with leather portfolio and premium accessories",
      delivery: "10-14 days",
      category: "Executive",
      featured: true,
    },
    {
      id: 3,
      name: "Team Achievement Plaque",
      price: "$45-75",
      moq: "15 pieces",
      rating: 4.7,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=300",
      description: "Wooden plaque with metal nameplate for team recognition",
      delivery: "5-7 days",
      category: "Plaques",
      featured: false,
    },
    {
      id: 4,
      name: "Performance Trophy",
      price: "$35-60",
      moq: "20 pieces",
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      description: "Metal trophy with custom engraving for individual achievements",
      delivery: "7-10 days",
      category: "Trophies",
      featured: false,
    },
    {
      id: 5,
      name: "Milestone Celebration Box",
      price: "$55-85",
      moq: "25 pieces",
      rating: 4.8,
      reviews: 98,
      image: "/placeholder.svg?height=300&width=300",
      description: "Special gift box for work anniversaries and milestones",
      delivery: "5-7 days",
      category: "Milestone",
      featured: false,
    },
    {
      id: 6,
      name: "Innovation Award Set",
      price: "$85-130",
      moq: "8 pieces",
      rating: 4.9,
      reviews: 76,
      image: "/placeholder.svg?height=300&width=300",
      description: "Modern design award for innovation and creativity recognition",
      delivery: "10-14 days",
      category: "Innovation",
      featured: true,
    },
  ]

  const benefits = [
    {
      icon: <Award className="w-8 h-8 text-teal-600" />,
      title: "Boost Morale",
      description: "Recognize achievements and boost employee morale with meaningful recognition gifts",
    },
    {
      icon: <Trophy className="w-8 h-8 text-amber-600" />,
      title: "Retain Talent",
      description: "Show appreciation for top performers and increase employee retention rates",
    },
    {
      icon: <Target className="w-8 h-8 text-rose-600" />,
      title: "Drive Performance",
      description: "Motivate teams to achieve higher performance through recognition programs",
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
              <Award className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Employee Recognition</h1>
              <p className="text-teal-600 font-medium">Celebrate Outstanding Performance</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Recognize and reward exceptional performance with our premium recognition gifts. From crystal awards to
            executive gift sets, show your top performers how much their contributions matter.
          </p>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search recognition gifts..."
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
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Recognition Matters</h2>
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
                  <div className="absolute top-3 right-12 bg-teal-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                    {product.category}
                  </div>
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
