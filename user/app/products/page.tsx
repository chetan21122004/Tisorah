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
import { useShortlist } from "@/lib/ShortlistContext"
import { Product } from "@/types/database"
import { useSearchParams, useRouter } from "next/navigation"

// Define the category structure
const categoryStructure = {
  edibles: [
    'Chocolates',
    'Yoga Bars',
    'Dry Fruits',
    'Snack',
    'Cookies',
    'Tea',
    'Coffee',
    'Granola',
    'Mouth Freshners',
    'Waffles',
    'Perfumes', 
    'Green Tea',
    'Makhana',
    'Zafran',
    'Apple Chips',
    'Cookies Baked'
  ],
  nonEdibles: [
    'Bottles',
    'Mugs',
    'Boxes',
    'Diyas',
    'Candles',
    'Plants',
    'Bags',
    'Stationery',
    'Home Décor',
    'Kitchen Appliances',
    'Electronic Appliances',
    'Handmade Soaps',
    'Incense Sticks',
    'Brass Items'
  ]
};

// Define subcategory type
interface Subcategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    discount?: number;
    rating: number;
    reviews: number;
    category?: string;
  };
  index: number;
  products: any[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, products }) => {
  const [hovered, setHovered] = useState(false);
  const nextIndex = (index + 1) % products.length;
  const hoverImage = products[nextIndex].image;
  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();
  const [isInShortlistState, setIsInShortlistState] = useState(false);
  const [isAddingToShortlist, setIsAddingToShortlist] = useState(false);

  useEffect(() => {
    setIsInShortlistState(isInShortlist(product.id));
  }, [product.id, isInShortlist]);

  const handleShortlistClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the shortlist button
    setIsAddingToShortlist(true);
    try {
      const shortlistItem = {
        id: product.id,
        name: product.name,
        price: `₹${product.price.toLocaleString()}`,
        originalPrice: `₹${product.price.toLocaleString()}`,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        quantity: 1,
        moq: 1,
        category: product.category,
      };

      if (isInShortlistState) {
        removeFromShortlist(product.id);
        setIsInShortlistState(false);
      } else {
        addToShortlist(shortlistItem);
        setIsInShortlistState(true);
      }
    } finally {
      setIsAddingToShortlist(false);
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col pb-4 transition-transform duration-300 hover:scale-105 group relative"
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
        <h3 className="font-normal text-md text-gray-900 mb-2 font-sans leading-snug break-words line-clamp-2 text-left">{product.name}</h3>
        <span className="text-lg font-normal text-gray-900 mb-2 text-left">₹{product.price.toLocaleString()}</span>
        <div className="flex items-center justify-between">
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
          <Button
            variant="ghost"
            size="icon"
            className={`h-9 w-9 rounded-full transition-colors ${
              isInShortlistState 
                ? 'bg-[#AD9660] text-white hover:bg-[#8B7A4F]' 
                : 'hover:bg-[#E6E2DD]'
            }`}
            onClick={handleShortlistClick}
            disabled={isAddingToShortlist}
          >
            <Heart className={`w-5 h-5 ${isInShortlistState ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [priceRange, setPriceRange] = useState("all")
  const [wishlist, setWishlist] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [visibleProducts, setVisibleProducts] = useState(8)
  const [sortBy, setSortBy] = useState("featured")
  const [expandedSubcategories, setExpandedSubcategories] = useState(true)
  const [visibleSubcategories, setVisibleSubcategories] = useState(5)
  const [searchInputValue, setSearchInputValue] = useState("")

  // Get search query from URL
  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      setSearchTerm(searchQuery)
      setSearchInputValue(searchQuery)
    }
  }, [searchParams])

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

  // Reset subcategory when main category changes
  useEffect(() => {
    setSelectedSubcategories([]);
    updateSubcategories();
  }, [selectedCategory, products]);

  // Update subcategories based on selected main category
  const updateSubcategories = () => {
    if (selectedCategory === "edibles") {
      // Group products by subcategory and count them
      const subcategoryCounts = products
        .filter(p => p.main_category_info?.slug === "edible-items")
        .reduce((acc, product) => {
          if (product.sub_category_info) {
            const id = product.sub_category_info.id;
            acc[id] = acc[id] || {
              id: id,
              name: product.sub_category_info.name,
              slug: product.sub_category_info.slug,
              count: 0
            };
            acc[id].count++;
          }
          return acc;
        }, {} as Record<string, Subcategory>);
      
      setSubcategories(Object.values(subcategoryCounts));
    } else if (selectedCategory === "non-edibles") {
      // Group products by subcategory and count them
      const subcategoryCounts = products
        .filter(p => p.main_category_info?.slug === "non-edible-items")
        .reduce((acc, product) => {
          if (product.sub_category_info) {
            const id = product.sub_category_info.id;
            acc[id] = acc[id] || {
              id: id,
              name: product.sub_category_info.name,
              slug: product.sub_category_info.slug,
              count: 0
            };
            acc[id].count++;
          }
          return acc;
        }, {} as Record<string, Subcategory>);
      
      setSubcategories(Object.values(subcategoryCounts));
    } else {
      setSubcategories([]);
    }
  };

  // Count products in each category
  const ediblesCount = products.filter(p => 
    p.main_category_info?.slug === "edible-items"
  ).length;
  
  const nonEdiblesCount = products.filter(p => 
    p.main_category_info?.slug === "non-edible-items"
  ).length;

  // Toggle a subcategory selection
  const toggleSubcategory = (subcategoryId: string) => {
    setSelectedSubcategories(prev => {
      if (prev.includes(subcategoryId)) {
        return prev.filter(id => id !== subcategoryId);
      } else {
        return [...prev, subcategoryId];
      }
    });
  };

  // Select or deselect all subcategories
  const toggleAllSubcategories = (select: boolean) => {
    if (select) {
      const allSubcategoryIds = subcategories.map(subcat => subcat.id);
      setSelectedSubcategories(allSubcategoryIds);
    } else {
      setSelectedSubcategories([]);
    }
  };

  // Filter products based on selected categories and search term
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
    let matchesCategory = true;
    if (selectedCategory === "edibles") {
      matchesCategory = product.main_category_info?.slug === "edible-items";
    } else if (selectedCategory === "non-edibles") {
      matchesCategory = product.main_category_info?.slug === "non-edible-items";
    }
    
    let matchesSubcategory = true;
    if (selectedSubcategories.length > 0) {
      matchesSubcategory = selectedSubcategories.includes(product.sub_category || '');
    }
    
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
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
  });

  // Sorting logic
  if (sortBy === "price-low") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    filteredProducts = filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  } else if (sortBy === "newest") {
    filteredProducts = filteredProducts.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
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
    setVisibleProducts(prev => Math.min(prev + 8, filteredProducts.length))
  }

  const FiltersContent = () => (
    <>
      {/* Main Categories */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-[#323433]">Categories</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="all"
                checked={selectedCategory === "all"}
                onCheckedChange={() => {
                  setSelectedCategory("all");
                  setSelectedSubcategories([]);
                }}
                className="border-[#C8C2B6] data-[state=checked]:bg-[#AD9660] data-[state=checked]:border-[#AD9660]"
              />
              <label htmlFor="all" className="text-sm text-[#323433] cursor-pointer">
                All Products
              </label>
            </div>
            <span className="text-xs text-[#323433]/60">({products.length})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edibles"
                checked={selectedCategory === "edibles"}
                onCheckedChange={() => setSelectedCategory(selectedCategory === "edibles" ? "all" : "edibles")}
                className="border-[#C8C2B6] data-[state=checked]:bg-[#AD9660] data-[state=checked]:border-[#AD9660]"
              />
              <label htmlFor="edibles" className="text-sm text-[#323433] cursor-pointer">
                Edibles
              </label>
            </div>
            <span className="text-xs text-[#323433]/60">({ediblesCount})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="non-edibles"
                checked={selectedCategory === "non-edibles"}
                onCheckedChange={() => setSelectedCategory(selectedCategory === "non-edibles" ? "all" : "non-edibles")}
                className="border-[#C8C2B6] data-[state=checked]:bg-[#AD9660] data-[state=checked]:border-[#AD9660]"
              />
              <label htmlFor="non-edibles" className="text-sm text-[#323433] cursor-pointer">
                Non-Edibles
              </label>
            </div>
            <span className="text-xs text-[#323433]/60">({nonEdiblesCount})</span>
          </div>
        </div>
      </div>

      {/* Subcategories - Only show if a main category is selected */}
      {selectedCategory !== "all" && subcategories.length > 0 && (
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-[#323433]">Subcategories</h4>
            <button 
              onClick={() => setExpandedSubcategories(!expandedSubcategories)}
              className="text-xs text-[#AD9660] hover:text-[#8B7A4F] focus:outline-none flex items-center"
            >
              {expandedSubcategories ? 'Collapse' : 'Expand'}
              <ChevronDown className={`h-3 w-3 ml-1 transition-transform duration-300 ${expandedSubcategories ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${expandedSubcategories ? 'max-h-[500px]' : 'max-h-0'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all-subcategories"
                  checked={selectedSubcategories.length === subcategories.length && subcategories.length > 0}
                  onCheckedChange={(checked) => toggleAllSubcategories(!!checked)}
                  className="border-[#C8C2B6] data-[state=checked]:bg-[#AD9660] data-[state=checked]:border-[#AD9660]"
                />
                <label htmlFor="all-subcategories" className="text-sm text-[#323433] cursor-pointer">
                  Select All {selectedCategory === "edibles" ? "Edibles" : "Non-Edibles"}
                </label>
              </div>
              {selectedSubcategories.length > 0 && (
                <button 
                  onClick={() => setSelectedSubcategories([])}
                  className="text-xs text-[#AD9660] hover:text-[#8B7A4F] focus:outline-none"
                >
                  Clear All
                </button>
              )}
            </div>
            
            <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {subcategories.slice(0, expandedSubcategories ? subcategories.length : visibleSubcategories).map((subcat) => (
                <div key={subcat.id} className="flex items-center justify-between py-1.5 hover:bg-[#F7F6F4] rounded px-1 transition-colors duration-150">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={subcat.id}
                      checked={selectedSubcategories.includes(subcat.id)}
                      onCheckedChange={() => toggleSubcategory(subcat.id)}
                      className="border-[#C8C2B6] data-[state=checked]:bg-[#AD9660] data-[state=checked]:border-[#AD9660]"
                    />
                    <label htmlFor={subcat.id} className="text-sm text-[#323433] cursor-pointer">
                      {subcat.name}
                    </label>
                  </div>
                  <span className="text-xs text-[#323433]/60">({subcat.count})</span>
                </div>
              ))}
            </div>
            
            {!expandedSubcategories && subcategories.length > visibleSubcategories && (
              <button 
                onClick={() => setExpandedSubcategories(true)}
                className="text-xs text-[#AD9660] hover:text-[#8B7A4F] focus:outline-none mt-2 flex items-center transition-colors duration-200 hover:bg-[#F7F6F4] py-1.5 px-2 rounded w-full justify-center"
              >
                Show all {subcategories.length} subcategories <ChevronDown className="h-3 w-3 ml-1" />
              </button>
            )}
          </div>
        </div>
      )}

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

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(searchInputValue)
    
    // Update URL with search parameter
    const params = new URLSearchParams(searchParams.toString())
    if (searchInputValue) {
      params.set('search', searchInputValue)
    } else {
      params.delete('search')
    }
    
    // Update the URL without refreshing the page
    router.replace(`/products?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="min-h-screen pt-12 mb-10">
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        {/* Mobile Search and Filters */}
        <div className="lg:hidden space-y-4 bg-white rounded-2xl shadow-lg p-4 mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#323433]/50 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              className="pl-12 w-full border-[#C8C2B6] bg-white/50 focus:ring-[#AD9660] focus:border-[#AD9660] rounded-xl h-12"
            />
          </form>
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
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
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
            <Select value={sortBy} onValueChange={setSortBy}>
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
            <Card className="sticky top-24 border-[#C8C2B6] bg-white rounded-2xl overflow-hidden" style={{ height: 'fit-content', maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}>
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
              <form onSubmit={handleSearch} className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#323433]/50 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  className="pl-12 border-[#C8C2B6] bg-white/50 focus:ring-[#AD9660] focus:border-[#AD9660] rounded-xl h-12"
                />
              </form>
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

            {/* Category Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#323433]">
                {selectedCategory === "all" ? "All Products" : 
                 selectedCategory === "edibles" ? "Edibles" : "Non-Edibles"}
                {selectedSubcategories.length > 0 && subcategories.length > 0 && 
                 ` > ${selectedSubcategories.map(id => subcategories.find(s => s.id === id)?.name).join(', ')}`}
                {searchTerm && ` - Search: "${searchTerm}"`}
              </h2>
              <p className="text-[#323433]/70">
                Showing {filteredProducts.length} products
              </p>
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
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setSearchInputValue("")
                      setSelectedCategory("all")
                      setSelectedSubcategories([])
                      setPriceRange("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setSelectedCategory("edibles")
                    }}
                  >
                    Edibles Only
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setSelectedCategory("non-edibles")
                    }}
                  >
                    Non-Edibles Only
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
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
                      category: product.category
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
                      category: p.category
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
                      className="h-12 px-8 border-[#C8C2B6] hover:bg-[#E6E2DD] text-[#323433] rounded-xl"
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