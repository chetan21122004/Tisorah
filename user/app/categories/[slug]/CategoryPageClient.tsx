'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { getCategoryBySlug, getProductsByCategory, getCategoriesByParent } from '@/lib/supabase'
import { Category, Product } from '@/types/database'
import { Search, Filter, Grid, List, Star, ArrowRight, Heart, Package, Gift, Settings, Palette, ChevronRight } from 'lucide-react'

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'ready-to-gift':
      return <Gift className="w-8 h-8 text-[#AD9660]" />
    case 'semi-customised':
      return <Settings className="w-8 h-8 text-[#AD9660]" />
    case 'custom-curated':
      return <Palette className="w-8 h-8 text-[#AD9660]" />
    default:
      return <Package className="w-8 h-8 text-[#AD9660]" />
  }
}

export default function CategoryPageClient() {
  const params = useParams()
  const slug = params.slug as string

  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState('all')

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const categoryData = await getCategoryBySlug(slug)
        if (categoryData) {
          setCategory(categoryData)
          
          // Load products for this category
          const productsData = await getProductsByCategory(categoryData.id)
          setProducts(productsData)

          // Load subcategories if this is a main or secondary category
          if (categoryData.level === 'main' || categoryData.level === 'secondary') {
            const subcategoriesData = await getCategoriesByParent(categoryData.id)
            setSubcategories(subcategoriesData)
          }
        }
      } catch (error) {
        console.error('Error loading category data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategoryData()
  }, [slug])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesPrice = true
    if (priceRange !== 'all') {
      const price = product.price
      switch (priceRange) {
        case 'under-500':
          matchesPrice = price < 500
          break
        case '500-1000':
          matchesPrice = price >= 500 && price <= 1000
          break
        case '1000-2500':
          matchesPrice = price >= 1000 && price <= 2500
          break
        case '2500+':
          matchesPrice = price > 2500
          break
      }
    }
    
    return matchesSearch && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AD9660] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading category...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-[#323433] mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
            <Link href="/categories">
              <Button className="bg-[#AD9660] hover:bg-[#8B7A4F] text-white">
                Browse All Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            {getCategoryIcon(category.slug)}
          </div>
          <h1 className="text-4xl font-serif font-light text-[#323433] mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            {category.description || `Explore our ${category.name.toLowerCase()} collection`}
          </p>
          <Badge variant="secondary" className="mb-4">
            {category.type === 'edible' ? 'Edible' : 'Non-edible'} • {category.level}
          </Badge>
        </div>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#323433] mb-6 text-center">
              Subcategories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {subcategories.map((subcat) => (
                <Link key={subcat.id} href={`/categories/${subcat.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 h-full">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-serif font-light text-[#323433] mb-2 group-hover:text-[#AD9660] transition-colors">
                        {subcat.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {subcat.description || `Explore ${subcat.name.toLowerCase()}`}
                      </p>
                      <div className="flex items-center justify-center text-[#AD9660] group-hover:text-[#8B7A4F] transition-colors">
                        <span className="text-sm font-medium">View Products</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <Separator className="my-8" />
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
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
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-500">Under ₹500</SelectItem>
                <SelectItem value="500-1000">₹500 - ₹1,000</SelectItem>
                <SelectItem value="1000-2500">₹1,000 - ₹2,500</SelectItem>
                <SelectItem value="2500+">₹2,500+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <Image
                    src={product.display_image || '/placeholder.svg'}
                    alt={product.name}
                    width={400}
                    height={300}
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
                    <Badge className="absolute top-3 left-3 bg-[#AD9660]">Featured</Badge>
                  )}
                  {product.customizable && (
                    <Badge className="absolute bottom-3 left-3 bg-blue-600">Customizable</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-serif font-light text-[#323433] group-hover:text-[#AD9660] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews || 0})</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-lg font-medium text-[#323433]">
                          {product.has_price_range 
                            ? `₹${product.price_min} - ₹${product.price_max}`
                            : `₹${product.price}`
                          }
                        </p>
                        <p className="text-xs text-gray-500">
                          MOQ: {product.moq || 25} pieces
                        </p>
                      </div>
                      <Link href={`/products/${product.id}`}>
                        <Button size="sm" className="bg-[#AD9660] hover:bg-[#8B7A4F] text-white">
                          View Details
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-light text-[#323433] mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters.</p>
            <Link href="/categories">
              <Button className="bg-[#AD9660] hover:bg-[#8B7A4F] text-white">
                Browse All Categories
              </Button>
            </Link>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-gray-50 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-serif font-light text-[#323433] mb-4">
            Need Custom Solutions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our team can help you create the perfect custom corporate gifts for your specific needs
          </p>
          <Link href="/contact">
            <Button className="bg-[#AD9660] hover:bg-[#8B7A4F] text-white px-8">
              Get Custom Quote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 