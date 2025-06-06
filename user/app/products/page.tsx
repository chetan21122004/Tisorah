"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Heart, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  ArrowRight, 
  Package, 
  Loader2,
  X,
  ChevronDown,
  SlidersHorizontal,
  Eye
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getProducts } from "@/lib/supabase"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [deliveryTime, setDeliveryTime] = useState("all")
  const [wishlist, setWishlist] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [visibleProducts, setVisibleProducts] = useState(6)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "onboarding", name: "Onboarding Gifts", count: products.filter(p => p.category === "onboarding").length },
    { id: "festivals", name: "Festival Celebrations", count: products.filter(p => p.category === "festivals").length },
    { id: "recognition", name: "Employee Recognition", count: products.filter(p => p.category === "recognition").length },
    { id: "events", name: "Corporate Events", count: products.filter(p => p.category === "events").length },
    { id: "birthdays", name: "Birthday Gifts", count: products.filter(p => p.category === "birthdays").length },
    { id: "appreciation", name: "Client Appreciation", count: products.filter(p => p.category === "appreciation").length },
    { id: "seasonal", name: "Seasonal Gifts", count: products.filter(p => p.category === "seasonal").length },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const loadMore = () => {
    setVisibleProducts(prev => Math.min(prev + 6, filteredProducts.length))
  }

  const FiltersContent = () => (
    <>
      {/* Categories */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-[#323433]">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategory === category.id}
                  onCheckedChange={() => setSelectedCategory(category.id)}
                  className="border-[#C8C2B6] data-[state=checked]:bg-[#AD9660] data-[state=checked]:border-[#AD9660]"
                />
                <label htmlFor={category.id} className="text-sm text-[#323433] cursor-pointer">
                  {category.name}
                </label>
              </div>
              <span className="text-xs text-[#323433]/60">({category.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-[#323433]">Price Range</h4>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="border-[#C8C2B6]">
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
        <h4 className="font-medium text-[#323433]">Delivery Time</h4>
        <Select value={deliveryTime} onValueChange={setDeliveryTime}>
          <SelectTrigger className="border-[#C8C2B6]">
            <SelectValue placeholder="Select delivery time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Time</SelectItem>
            <SelectItem value="1-3">1-3 days</SelectItem>
            <SelectItem value="3-5">3-5 days</SelectItem>
            <SelectItem value="5-7">5-7 days</SelectItem>
            <SelectItem value="7+">7+ days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )

  return (
    <div className="min-h-screen pt-12 bg-[#F4F4F4]">
      {/* Hero Section */}
      {/* <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A47] to-[#323433]">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(173,150,96,0.1),transparent_50%)]"
            style={{ mixBlendMode: 'overlay' }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#AD9660]/10 backdrop-blur-sm rounded-2xl mb-8 transform hover:scale-105 transition-all duration-300">
              <Package className="w-10 h-10 text-[#AD9660]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Our Products
            </h1>
            <p className="text-[#E6E2DD] text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Discover our curated collection of premium corporate gifting solutions
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F4F4F4] to-transparent"></div>
      </div> */}

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        {/* Mobile Search and Filters */}
        <div className="lg:hidden space-y-4 bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#323433]/50 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 w-full border-[#C8C2B6] bg-white/50 focus:ring-[#AD9660] focus:border-[#AD9660] rounded-xl h-12"
            />
          </div>
          <div className="flex gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex-1 border-[#C8C2B6] hover:bg-[#E6E2DD] rounded-xl h-12"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your product search</SheetDescription>
                </SheetHeader>
                <FiltersContent />
                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button className="w-full bg-[#1E2A47] hover:bg-[#1E2A47]/90 text-white rounded-xl h-12">
                      Apply Filters
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <Select defaultValue="featured">
              <SelectTrigger className="flex-1 border-[#C8C2B6] rounded-xl h-12">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <Card className="sticky top-24 border-[#C8C2B6] bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#AD9660]/10 flex items-center justify-center">
                    <Filter className="h-5 w-5 text-[#AD9660]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#323433]">Filters</h3>
                </div>
                <FiltersContent />
                <Button className="w-full bg-[#1E2A47] hover:bg-[#1E2A47]/90 text-white rounded-xl h-12 mt-6">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Desktop Search and Sort */}
            <div className="hidden lg:flex items-center gap-6 mb-8 bg-white rounded-2xl p-4 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#323433]/50 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 border-[#C8C2B6] bg-white/50 focus:ring-[#AD9660] focus:border-[#AD9660] rounded-xl h-12"
                />
              </div>
              <Select defaultValue="featured">
                <SelectTrigger className="w-48 border-[#C8C2B6] rounded-xl h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 border border-[#C8C2B6] rounded-xl p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`h-10 w-10 rounded-lg ${viewMode === "grid" ? "bg-[#1E2A47]" : ""}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`h-10 w-10 rounded-lg ${viewMode === "list" ? "bg-[#1E2A47]" : ""}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl">
                <Loader2 className="w-10 h-10 animate-spin text-[#AD9660] mb-4" />
                <p className="text-[#323433]/70">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="w-20 h-20 bg-[#E6E2DD] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-[#AD9660]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#323433] mb-3">No Products Found</h3>
                <p className="text-[#323433]/70 mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your search or filters.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setPriceRange("all")
                    setDeliveryTime("all")
                  }}
                  className="border-[#C8C2B6] hover:bg-[#E6E2DD] rounded-xl h-12 px-8"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6 px-1">
                  <p className="text-[#323433]/70">
                    Showing {Math.min(visibleProducts, filteredProducts.length)} of {filteredProducts.length} products
                  </p>
                </div>

                <div 
                  className={
                    viewMode === "grid" 
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                      : "space-y-4"
                  }
                >
                  {filteredProducts.slice(0, visibleProducts).map((product) => (
                    <Card
                      key={product.id}
                      className={`group hover:shadow-xl transition-all duration-500 border-[#C8C2B6] bg-white rounded-2xl overflow-hidden ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                    >
                      <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                        <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                          <Image
                            src={product.images?.[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                              viewMode === "list" ? "h-full rounded-l-2xl" : "h-48 sm:h-64"
                            }`}
                          />
                          {product.featured && (
                            <Badge className="absolute top-4 left-4 bg-[#AD9660] text-white px-3 py-1 rounded-lg">
                              Featured
                            </Badge>
                          )}
                          <div className="absolute top-4 right-4 flex flex-col gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleWishlist(product.id)}
                              className="h-12 w-12 rounded-xl bg-white/90 hover:bg-white hover:text-[#AD9660] backdrop-blur-sm transition-all duration-200"
                            >
                              <Heart 
                                className={`h-5 w-5 ${
                                  wishlist.includes(product.id) 
                                    ? "fill-[#AD9660] text-[#AD9660]" 
                                    : "text-[#323433]"
                                }`} 
                              />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-12 w-12 rounded-xl bg-white/90 hover:bg-white hover:text-[#AD9660] backdrop-blur-sm transition-all duration-200"
                                >
                                  <Eye className="h-5 w-5" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl p-0 rounded-2xl overflow-hidden">
                                <DialogHeader className="p-6 pb-0">
                                  <DialogTitle>Quick View</DialogTitle>
                                </DialogHeader>
                                <div className="grid md:grid-cols-2 gap-6 p-6">
                                  <div className="relative aspect-square rounded-xl overflow-hidden">
                                    <Image
                                      src={product.images?.[0] || "/placeholder.svg"}
                                      alt={product.name}
                                      fill
                                      className="object-cover"
                                    />
                                    {product.featured && (
                                      <Badge className="absolute top-4 left-4 bg-[#AD9660] text-white px-3 py-1 rounded-lg">
                                        Featured
                                      </Badge>
                                    )}
                                  </div>
                                  <div>
                                    <h2 className="text-2xl font-semibold text-[#323433] mb-2">{product.name}</h2>
                                    <div className="flex items-center gap-3 mb-4">
                                      <div className="flex items-center gap-1.5">
                                        <Star className="w-5 h-5 text-[#AD9660] fill-current" />
                                        <span className="font-medium text-[#323433]">{product.rating || 4.5}</span>
                                      </div>
                                      <span className="text-[#323433]/30">•</span>
                                      <span className="text-[#323433]/70 capitalize">{product.category}</span>
                                    </div>
                                    <p className="text-[#323433]/70 mb-8 leading-relaxed">{product.description}</p>
                                    <div className="space-y-4 mb-8">
                                      <div className="flex justify-between items-center pb-4 border-b border-[#C8C2B6]">
                                        <span className="text-[#323433]/70">Price</span>
                                        <span className="text-2xl font-semibold text-[#323433]">${product.price}</span>
                                      </div>
                                      {product.moq && (
                                        <div className="flex justify-between items-center pb-4 border-b border-[#C8C2B6]">
                                          <span className="text-[#323433]/70">Minimum Order</span>
                                          <span className="font-medium text-[#323433]">{product.moq}</span>
                                        </div>
                                      )}
                                      {product.delivery && (
                                        <div className="flex justify-between items-center pb-4 border-b border-[#C8C2B6]">
                                          <span className="text-[#323433]/70">Delivery Time</span>
                                          <span className="font-medium text-[#323433]">{product.delivery}</span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex gap-4">
                                      <Button className="flex-1 bg-[#1E2A47] hover:bg-[#1E2A47]/90 text-white h-12 rounded-xl">
                                        <Link href={`/products/${product.id}`} className="flex items-center gap-2">
                                          View Details <ArrowRight className="w-4 h-4" />
                                        </Link>
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        className="flex-1 border-[#C8C2B6] hover:bg-[#E6E2DD] h-12 rounded-xl"
                                        onClick={() => toggleWishlist(product.id)}
                                      >
                                        {wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          {product.customizable && (
                            <Badge className="absolute bottom-4 left-4 bg-[#1E2A47] text-white px-3 py-1 rounded-lg">
                              Customizable
                            </Badge>
                          )}
                        </div>
                        <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-[#323433] group-hover:text-[#AD9660] transition-colors">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-1.5 bg-[#AD9660]/10 px-2 py-1 rounded-lg">
                              <Star className="w-4 h-4 text-[#AD9660] fill-current" />
                              <span className="text-sm font-medium text-[#AD9660]">{product.rating || 4.5}</span>
                            </div>
                          </div>
                          <p className="text-[#323433]/70 mb-4 text-sm line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                          <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-sm">
                              <span className="text-[#323433]/70">Price:</span>
                              <span className="font-medium text-[#323433]">${product.price}</span>
                            </div>
                            {product.moq && (
                              <div className="flex justify-between text-sm">
                                <span className="text-[#323433]/70">MOQ:</span>
                                <span className="font-medium text-[#323433]">{product.moq}</span>
                              </div>
                            )}
                            {product.delivery && (
                              <div className="flex justify-between text-sm">
                                <span className="text-[#323433]/70">Delivery:</span>
                                <span className="font-medium text-[#323433]">{product.delivery}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <Button className="flex-1 bg-[#1E2A47] hover:bg-[#1E2A47]/90 text-white h-12 rounded-xl">
                              <Link href={`/products/${product.id}`} className="flex items-center gap-2">
                                View Details <ArrowRight className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1 border-[#C8C2B6] hover:bg-[#E6E2DD] h-12 rounded-xl"
                              onClick={() => toggleWishlist(product.id)}
                            >
                              {wishlist.includes(product.id) ? 'Remove' : 'Wishlist'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                {visibleProducts < filteredProducts.length && (
                  <div className="text-center mt-12">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={loadMore}
                      className="h-12 px-8 border-[#C8C2B6] hover:bg-[#E6E2DD] text-[#323433] rounded-xl"
                    >
                      Load More Products
                    </Button>
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