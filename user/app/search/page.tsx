import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Star,
  Heart,
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { searchProducts, type SearchParams } from "../actions"
import PatternBackground from "@/components/PatternBackground"

// Force dynamic rendering for search page
export const dynamic = 'force-dynamic'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Get search results
  const { products, count } = await searchProducts(searchParams)
  
  // Pagination
  const page = parseInt(searchParams.page || '1')
  const pageSize = 12
  const totalPages = Math.ceil(count / pageSize)
  
  // Generate pagination URLs
  const generatePageUrl = (pageNum: number) => {
    const params = new URLSearchParams()
    if (searchParams.q) params.set('q', searchParams.q)
    if (searchParams.category) params.set('category', searchParams.category)
    if (searchParams.price) params.set('price', searchParams.price)
    if (searchParams.sort) params.set('sort', searchParams.sort)
    params.set('page', pageNum.toString())
    return `?${params.toString()}`
  }

  // Active filters
  const hasActiveFilters = searchParams.category || searchParams.price || searchParams.sort
  
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-[#1E2A47] py-20 relative">
        <PatternBackground className="opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {searchParams.q 
                ? `Search Results for "${searchParams.q}"`
                : searchParams.category
                  ? `${searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)} Gifts`
                  : "All Products"}
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Discover our curated collection of premium corporate gifts
            </p>
            
            {/* Search Form */}
            <form action="/search" className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1E2A47]/40 w-5 h-5" />
                  <Input
                    name="q"
                    defaultValue={searchParams.q || ''}
                    placeholder="Search for gifts, awards, hampers..."
                    className="pl-12 pr-4 py-6 border-transparent bg-white rounded-xl text-[#1E2A47] text-lg placeholder:text-[#1E2A47]/40 focus-visible:ring-[#AD9660]"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-[#AD9660] hover:bg-[#AD9660]/90 text-white px-6 py-3 rounded-xl"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#1E2A47] text-lg">Filters</h3>
                {hasActiveFilters && (
                  <Link 
                    href={`/search${searchParams.q ? `?q=${searchParams.q}` : ''}`}
                    className="text-sm text-[#AD9660] hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Clear all
                  </Link>
                )}
              </div>
              
              <form action="/search" className="space-y-6">
                {/* Preserve search query if exists */}
                {searchParams.q && (
                  <input type="hidden" name="q" value={searchParams.q} />
                )}
                
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-[#1E2A47] mb-3">Categories</h4>
                  <div className="space-y-2">
                    {['executive', 'festivals', 'awards', 'events'].map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={category}
                          name="category"
                          value={category}
                          defaultChecked={searchParams.category === category}
                          className="w-4 h-4 text-[#AD9660] border-neutral-300 focus:ring-[#AD9660]"
                        />
                        <label htmlFor={category} className="ml-2 text-[#1E2A47]">
                          {category.charAt(0).toUpperCase() + category.slice(1)} Gifts
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-[#1E2A47] mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { value: '0-2000', label: 'Under ₹2,000' },
                      { value: '2000-5000', label: '₹2,000 - ₹5,000' },
                      { value: '5000-10000', label: '₹5,000 - ₹10,000' },
                      { value: '10000+', label: 'Above ₹10,000' }
                    ].map((priceRange) => (
                      <div key={priceRange.value} className="flex items-center">
                        <input
                          type="radio"
                          id={priceRange.value}
                          name="price"
                          value={priceRange.value}
                          defaultChecked={searchParams.price === priceRange.value}
                          className="w-4 h-4 text-[#AD9660] border-neutral-300 focus:ring-[#AD9660]"
                        />
                        <label htmlFor={priceRange.value} className="ml-2 text-[#1E2A47]">
                          {priceRange.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sort By */}
                <div>
                  <h4 className="font-medium text-[#1E2A47] mb-3">Sort By</h4>
                  <select
                    name="sort"
                    defaultValue={searchParams.sort || 'newest'}
                    className="w-full p-2 border border-neutral-200 rounded-lg text-[#1E2A47] focus:ring-[#AD9660] focus:border-[#AD9660]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="popular">Popularity</option>
                  </select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#1E2A47] hover:bg-[#1E2A47]/90 text-white"
                >
                  Apply Filters
                </Button>
              </form>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {/* Results Summary */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#1E2A47]">
                  {count} {count === 1 ? 'Product' : 'Products'} Found
                </h2>
                <p className="text-[#1E2A47]/60">
                  {searchParams.q && `Search results for "${searchParams.q}"`}
                </p>
              </div>
              
              {/* Active Filters */}
              <div className="flex flex-wrap gap-2">
                {searchParams.category && (
                  <Badge className="bg-[#1E2A47]/10 text-[#1E2A47] hover:bg-[#1E2A47]/20 px-3 py-1">
                    {searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)}
                    <Link href={`/search?${new URLSearchParams({
                      ...(searchParams.q ? { q: searchParams.q } : {}),
                      ...(searchParams.price ? { price: searchParams.price } : {}),
                      ...(searchParams.sort ? { sort: searchParams.sort } : {})
                    }).toString()}`}>
                      <X className="ml-1 w-3 h-3" />
                    </Link>
                  </Badge>
                )}
                
                {searchParams.price && (
                  <Badge className="bg-[#1E2A47]/10 text-[#1E2A47] hover:bg-[#1E2A47]/20 px-3 py-1">
                    {searchParams.price === '0-2000' ? 'Under ₹2,000' : 
                     searchParams.price === '2000-5000' ? '₹2,000 - ₹5,000' :
                     searchParams.price === '5000-10000' ? '₹5,000 - ₹10,000' :
                     'Above ₹10,000'}
                    <Link href={`/search?${new URLSearchParams({
                      ...(searchParams.q ? { q: searchParams.q } : {}),
                      ...(searchParams.category ? { category: searchParams.category } : {}),
                      ...(searchParams.sort ? { sort: searchParams.sort } : {})
                    }).toString()}`}>
                      <X className="ml-1 w-3 h-3" />
                    </Link>
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                className="w-full border-[#1E2A47] text-[#1E2A47] flex items-center justify-center gap-2"
                onClick={() => {
                  // This would be handled with client-side JS to show mobile filters
                  // In a real implementation, you'd use useState and a modal/drawer
                }}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filter & Sort
              </Button>
            </div>
            
            {/* Product Grid */}
            {products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-neutral-100">
                <div className="w-16 h-16 bg-[#1E2A47]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#1E2A47]/40" />
                </div>
                <h3 className="text-xl font-bold text-[#1E2A47] mb-2">No products found</h3>
                <p className="text-[#1E2A47]/60 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button asChild className="bg-[#AD9660] hover:bg-[#AD9660]/90 text-white">
                  <Link href="/products">View All Products</Link>
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-lg transition-all duration-300 border-[#E6E2DD] bg-white relative overflow-hidden rounded-lg"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <Link href={`/products/${product.id}`}>
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={product.images?.[0] || "/placeholder.jpg"}
                              alt={product.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/90 hover:bg-white rounded-full shadow-sm"
                        >
                          <Heart className="w-4 h-4 text-[#1E2A47]" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <Link href={`/products/${product.id}`}>
                          <h4 className="font-medium text-[#1E2A47] text-base leading-tight hover:text-[#AD9660] line-clamp-2">
                            {product.title}
                          </h4>
                        </Link>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-[#AD9660] fill-current" />
                          ))}
                          <span className="text-xs text-[#1E2A47]/60">(0)</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="space-x-2">
                            <span className="text-lg font-bold text-[#AD9660]">₹{product.price}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-8 h-8 p-0 hover:bg-[#1E2A47]/5 rounded-full"
                          >
                            <Link href={`/products/${product.id}`}>
                              <ChevronRight className="w-4 h-4 text-[#1E2A47]" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-12 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  className={`w-10 h-10 rounded-lg ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  asChild={page !== 1}
                >
                  {page !== 1 ? (
                    <Link href={generatePageUrl(page - 1)}>
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  ) : (
                    <ChevronLeft className="w-4 h-4" />
                  )}
                </Button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? "default" : "outline"}
                        className={`w-10 h-10 rounded-lg ${
                          pageNum === page
                            ? "bg-[#1E2A47] text-white"
                            : "text-[#1E2A47]"
                        }`}
                        asChild={pageNum !== page}
                      >
                        {pageNum !== page ? (
                          <Link href={generatePageUrl(pageNum)}>
                            {pageNum}
                          </Link>
                        ) : (
                          <span>{pageNum}</span>
                        )}
                      </Button>
                    )
                  } else if (
                    (pageNum === 2 && page > 3) ||
                    (pageNum === totalPages - 1 && page < totalPages - 2)
                  ) {
                    // Show ellipsis
                    return <span key={pageNum} className="px-1">...</span>
                  } else {
                    return null
                  }
                })}
                
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === totalPages}
                  className={`w-10 h-10 rounded-lg ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                  asChild={page !== totalPages}
                >
                  {page !== totalPages ? (
                    <Link href={generatePageUrl(page + 1)}>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 