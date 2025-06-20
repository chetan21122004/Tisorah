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
import ProductGrid from '@/components/LandingPage/ProductGrid'

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    discount?: number;
    rating: number;
    reviews: number;
  };
  index: number;
  products: any[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, products }) => {
  const [hovered, setHovered] = useState(false);
  const nextIndex = (index + 1) % products.length;
  const hoverImage = products[nextIndex].image;
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col pb-4 transition-transform duration-300 hover:scale-105 group"
      style={{ minHeight: 420, maxWidth: 340 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="mt-4">
      <div className="relative h-64 mb-3">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-64 object-cover object-center rounded-xl absolute left-0 top-0 transition-all duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}
          style={{ background: '#f7f7f7' }}
        />
        <img
          src={hoverImage}
          alt={product.name + ' alt'}
          className={`w-full h-64 object-cover object-center rounded-xl absolute left-0 top-0 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: '#f7f7f7' }}
        />
      </div>
      </Link>
      <div className="px-4 flex flex-col flex-1 transform scale-[0.952] will-change-transform">
        <h3 className="font-normal text-lg text-gray-900 mb-2 font-sans leading-snug break-words line-clamp-2 text-left">{product.name}</h3>
        <span className="text-lg font-normal text-gray-900 mb-2 text-left">₹{product.price.toLocaleString()}</span>
        <div className="flex items-center text-left">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < product.rating ? 'text-[#B8860B] fill-[#B8860B]' : 'text-gray-300'}`}
                strokeWidth={i < product.rating ? 0 : 1.5}
              />
            ))}
          </div>
          <span className="text-base text-gray-700 font-sans mr-1">{product.rating}</span>
          <span className="text-sm text-gray-400 font-sans">({product.reviews})</span>
        </div>
        <Link href={`/${product.id}`} className="mt-4">
          
        </Link>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState("all")
  const [wishlist, setWishlist] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [visibleProducts, setVisibleProducts] = useState(6)
  const [sortBy, setSortBy] = useState("featured")

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

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    let matchesPrice = true;
    if (priceRange === "under-500") {
      matchesPrice = product.price < 500;
    } else if (priceRange === "500-1000") {
      matchesPrice = product.price >= 500 && product.price <= 1000;
    } else if (priceRange === "1000-2000") {
      matchesPrice = product.price > 1000 && product.price <= 2000;
    } else if (priceRange === "2000-5000") {
      matchesPrice = product.price > 2000 && product.price <= 5000;
    } else if (priceRange === "5000+") {
      matchesPrice = product.price > 5000;
    }
    return matchesSearch && matchesCategory && matchesPrice;
  })

  // Sorting logic
  if (sortBy === "price-low") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    filteredProducts = filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  } else if (sortBy === "newest") {
    filteredProducts = filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } else if (sortBy === "featured") {
    filteredProducts = filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  }

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
      <div className="space-y-4 mb-6 ">
        <h4 className="font-medium text-[#323433]">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(prev =>
                      checked
                        ? [...prev, category.id]
                        : prev.filter(id => id !== category.id)
                    );
                  }}
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
            <SelectItem value="under-500">Under ₹500</SelectItem>
            <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
            <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
            <SelectItem value="2000-5000">₹2000 - ₹5000</SelectItem>
            <SelectItem value="5000+">₹5000+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )

  return (
    <div className="min-h-screen pt-12 mb-10 ">

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
            <Card className="sticky top-24 border-[#C8C2B6] bg-white rounded-2xl overflow-hidden" style={{ height: 'fit-content', maxHeight: 'calc(100vh - 6rem)', overflow: 'visible' }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#AD9660]/10 flex items-center justify-center">
                    <Filter className="h-5 w-5 text-[#AD9660]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#323433]">Filters</h3>
                </div>
                <FiltersContent />
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
              <Select value={sortBy} onValueChange={setSortBy}>
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
                    setSelectedCategories([])
                    setPriceRange("all")
                  }}
                  className="border-[#C8C2B6] hover:bg-[#E6E2DD] rounded-xl h-12 px-8"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
                {filteredProducts.slice(0, visibleProducts).map((product, index, arr) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg',
                      price: product.price,
                      discount: undefined,
                      rating: product.rating || 0,
                      reviews: 0,
                    }}
                    index={index}
                    products={arr.map(p => ({
                      id: p.id,
                      name: p.name,
                      image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder.svg',
                      price: p.price,
                      discount: undefined,
                      rating: p.rating || 0,
                      reviews: 0,
                    }))}
                  />
                ))}
              </div>
            )}
                {/* Load More */}
                {visibleProducts < filteredProducts.length && (
                  <div className="text-center mt-12">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={loadMore}
                      className="h-12 px-8  border-[#C8C2B6] hover:bg-[#E6E2DD] text-[#323433] rounded-xl"
                    >
                      Load More Products
                    </Button>
                  </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
} 