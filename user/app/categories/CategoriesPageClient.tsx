"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Search, Filter, Grid, List, Star, ArrowRight, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getGiftCategories, getProducts } from "@/lib/supabase"
import type { GiftCategory, Product } from "@/types/database"

export default function CategoriesPageClient() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [deliveryTime, setDeliveryTime] = useState("all")
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Fetch categories
      const categoriesData = await getGiftCategories()
      
      // Add "All Categories" option
      setCategories([
        { id: "all", name: "All Categories", count: categoriesData.reduce((sum, cat) => sum + (cat.count || 0), 0) },
        ...categoriesData.map((cat: GiftCategory) => ({
          id: cat.slug,
          name: cat.name,
          count: cat.count || 0,
          description: cat.description,
          image: cat.image_url
        }))
      ])
      
      // Fetch products
      const productsData = await getProducts()
      
      setProducts(productsData.map((product: Product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: `$${product.price}`,
        moq: product.moq || "25 pieces",
        rating: product.rating || 4.5,
        reviews: Math.floor(Math.random() * 150) + 50,
        image: product.images?.[0] || "/placeholder.svg?height=300&width=300",
        description: product.description,
        delivery: product.delivery || "5-7 days",
        customizable: product.customizable || false,
        featured: product.featured || false,
      })))
      
      setLoading(false)
    }
    
    fetchData()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Gift Categories</h1>
                  <p className="text-teal-600 font-medium">Premium Corporate Gifting Solutions</p>
                </div>
              </div>
              <p className="text-lg text-gray-600">
                Discover the perfect corporate gifts for every occasion and milestone
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
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
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-teal-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                </div>

                {/* Categories */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-gray-900">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategory === category.id}
                            onCheckedChange={() => setSelectedCategory(category.id)}
                          />
                          <label htmlFor={category.id} className="text-sm text-gray-700 cursor-pointer">
                            {category.name}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-gray-900">Price Range</h4>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-30">Under $30</SelectItem>
                      <SelectItem value="30-60">$30 - $60</SelectItem>
                      <SelectItem value="60-100">$60 - $100</SelectItem>
                      <SelectItem value="100+">$100+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Delivery Time */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-gray-900">Delivery Time</h4>
                  <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Time</SelectItem>
                      <SelectItem value="1-3">1-3 days</SelectItem>
                      <SelectItem value="3-7">3-7 days</SelectItem>
                      <SelectItem value="7-14">1-2 weeks</SelectItem>
                      <SelectItem value="14+">2+ weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-t-teal-600 border-teal-200 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : (
              <>
                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Products */}
                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        {product.featured && (
                          <Badge className="absolute top-3 left-3 bg-teal-600">Featured</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                              {product.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {product.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">({product.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <div>
                              <p className="text-lg font-bold text-gray-900">{product.price}</p>
                              <p className="text-xs text-gray-500">MOQ: {product.moq}</p>
                            </div>
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                              View Details
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 