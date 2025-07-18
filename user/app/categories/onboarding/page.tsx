"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Grid, List, Star, ArrowRight, UserPlus, Briefcase, Gift, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getProductsByCategory, getGiftCategoryBySlug } from "@/lib/supabase"
import type { Product, GiftCategory } from "@/types/database"

export default function OnboardingGiftsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [giftType, setGiftType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<GiftCategory | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Fetch category data
      const category = await getGiftCategoryBySlug('onboarding')
      setCategoryData(category)
      
      // Fetch products
      const productsData = await getProductsByCategory('onboarding')
      
      setProducts(productsData.map((product: Product) => ({
        id: product.id,
        name: product.name,
        price: `$${product.price}`,
        moq: product.moq || "25 pieces",
        rating: product.rating || 4.8,
        reviews: Math.floor(Math.random() * 150) + 50,
        image: product.images?.[0] || "/placeholder.svg?height=300&width=300",
        description: product.description,
        delivery: product.delivery || "5-7 days",
        customizable: product.customizable || true,
        featured: product.featured || false,
        type: ["welcome", "premium", "tech", "stationery", "wellness"][Math.floor(Math.random() * 5)]
      })))
      
      setLoading(false)
    }
    
    fetchData()
  }, [])

  const benefits = [
    {
      icon: <UserPlus className="w-6 h-6 text-indigo-600" />,
      title: "First Impression",
      description: "Make a lasting first impression on new employees",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
      title: "Company Culture",
      description: "Introduce company culture and values from day one",
    },
    {
      icon: <Gift className="w-6 h-6 text-indigo-600" />,
      title: "Employee Retention",
      description: "Improve retention with thoughtful welcome gifts",
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Onboarding Welcome Gifts</h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              {categoryData?.description || "Make new employees feel valued from day one with our premium onboarding gifts, designed to welcome and integrate them into your company culture."}
            </p>
            <div className="flex gap-4">
              <Button className="bg-white text-indigo-700 hover:bg-gray-100">
                Request Quote
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                View Catalog
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Why Onboarding Gifts Matter</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">Onboarding Gift Collection</h2>
            
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search gifts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="under-40">Under $40</SelectItem>
                  <SelectItem value="40-70">$40-$70</SelectItem>
                  <SelectItem value="70+">$70+</SelectItem>
                </SelectContent>
              </Select>
              <Select value={giftType} onValueChange={setGiftType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Gift Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="welcome">Welcome Kits</SelectItem>
                  <SelectItem value="premium">Premium Packages</SelectItem>
                  <SelectItem value="tech">Tech Gifts</SelectItem>
                  <SelectItem value="stationery">Stationery</SelectItem>
                  <SelectItem value="wellness">Wellness</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
