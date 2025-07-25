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
    display_image?: string | null;
    hover_image?: string | null;
    images?: string[] | null;
    price: number;
    price_min?: number | null;
    price_max?: number | null;
    has_price_range?: boolean | null;
    discount?: number;
    rating: number;
    reviews: number;
    category?: string;
    moq?: number | null;
    main_category_info?: any;
    primary_category_info?: any;
    secondary_category_info?: any;
  };
  index: number;
  products: any[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, products }) => {
  // Use display_image as primary, fallback to image prop, then first additional image
  const displayImage = product.display_image || product.image || product.images?.[0] || '/placeholder.svg';
  // Use hover_image as hover, fallback to display_image only if hover_image exists
  const hoverImage = product.hover_image || null;
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
        price: product.has_price_range 
          ? `₹${product.price_min?.toLocaleString()} - ₹${product.price_max?.toLocaleString()}`
          : `₹${product.price.toLocaleString()}`,
        originalPrice: `₹${product.price.toLocaleString()}`,
        image: displayImage,
        rating: product.rating,
        reviews: product.reviews,
        quantity: 1,
        moq: product.moq || 1,
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

  // Function to format price display
  const formatPrice = () => {
    if (product.has_price_range && product.price_min && product.price_max) {
      return (
        <span className="text-sm md:text-lg font-light text-[#AD9660]">
          ₹{product.price_min.toLocaleString()} - ₹{product.price_max.toLocaleString()}
        </span>
      );
    } else {
      return (
        <span className="text-sm md:text-lg font-light text-[#AD9660]">
          ₹{product.price.toLocaleString()}
        </span>
      );
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="group relative overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02]"
        style={{ height: '100%' }}
      >
        <div className="relative h-40 md:h-64 mb-3 md:mb-4 bg-white">
          <Image 
            src={displayImage}
            alt={product.name}
            fill
            className={`w-full h-full object-contain p-2 transition-opacity duration-500 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={product.name + ' hover'}
              fill
              className="absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          )}

          
          {/* Elegant badge design */}
          {/* <div className="absolute top-2 md:top-4 left-0">
            <div className="bg-white/90 backdrop-blur-sm border-l-2 border-[#AD9660] text-[#323433] font-light text-[10px] md:text-xs px-2 md:px-4 py-1 md:py-2">
              Best Seller
            </div>
          </div> */}
          
          {/* Heart button on hover */}
          <button 
            onClick={handleShortlistClick}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-sm ${
              isInShortlistState
                ? "bg-[#AD9660] text-white hover:bg-[#8A784F]"
                : "bg-white/90 text-[#323433] hover:bg-white opacity-0 group-hover:opacity-100"
            }`}
            aria-label={isInShortlistState ? "Remove from shortlist" : "Add to shortlist"}
          >
            <Heart className={`w-4 h-4 ${isInShortlistState ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Product details with refined typography */}
        <div className="px-1 md:px-2 flex flex-col flex-1">
          <h3 className="font-light text-sm md:text-base text-[#323433] leading-snug line-clamp-2 mb-1 md:mb-2 group-hover:text-[#AD9660] transition-colors duration-300">
            {product.name}
          </h3>

          <div className="mt-2 md:mt-3 flex items-center justify-between">
            {formatPrice()}
            <div className="w-4 md:w-6 h-[1px] bg-[#AD9660]/20"></div>
          </div>
          
          {/* MOQ Information */}
          {product.moq && (
            <div className="mt-1 md:mt-2 flex items-center text-[10px] md:text-xs text-gray-500">
              <Package className="w-2 h-2 md:w-3 md:h-3 mr-1" />
              <span>MOQ: {product.moq} {product.moq === 1 ? 'piece' : 'pieces'}</span>
            </div>
          )}
        </div>

        {/* Geometric decorative element on hover */}
        <div className="absolute -bottom-full right-0 w-8 md:w-12 h-8 md:h-12 border border-[#AD9660]/20 rotate-45 group-hover:-translate-y-8 md:group-hover:-translate-y-12 transition-transform duration-500"></div>
      </div>
    </Link>
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
  const [visibleProducts, setVisibleProducts] = useState(12)
  const [sortBy, setSortBy] = useState("featured")
  const [expandedSubcategories, setExpandedSubcategories] = useState(true)
  const [visibleSubcategories, setVisibleSubcategories] = useState(5)
  const [searchInputValue, setSearchInputValue] = useState("")
  const [loadingMore, setLoadingMore] = useState(false)

  // Get search query from URL
  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      setSearchTerm(searchQuery)
      setSearchInputValue(searchQuery)
    }
  }, [searchParams])

  // Filter products based on selected categories and search term
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
    let matchesCategory = true;
    if (selectedCategory === "edibles") {
      matchesCategory = product.main_category_info?.slug === "edible";
    } else if (selectedCategory === "non-edibles") {
      matchesCategory = product.main_category_info?.slug === "non-edible";
    }
    
    let matchesSubcategory = true;
    if (selectedSubcategories.length > 0) {
      // Check if product's primary_category or secondary_category matches any selected subcategory
      const productSubcategoryIds = [
        product.primary_category_info?.id,
        product.secondary_category_info?.id
      ].filter(Boolean);
      
      matchesSubcategory = selectedSubcategories.some(subcatId => 
        productSubcategoryIds.includes(subcatId)
      );
    }
    
    let matchesPrice = true;
    if (priceRange === "under-500") {
      if (product.has_price_range && product.price_min) {
        matchesPrice = product.price_min < 500;
      } else {
        matchesPrice = product.price < 500;
      }
    } else if (priceRange === "500-1000") {
      if (product.has_price_range && product.price_min && product.price_max) {
        matchesPrice = (product.price_min >= 500 && product.price_min <= 1000) || 
                      (product.price_max >= 500 && product.price_max <= 1000);
      } else {
        matchesPrice = product.price >= 500 && product.price <= 1000;
      }
    } else if (priceRange === "1000-2000") {
      if (product.has_price_range && product.price_min && product.price_max) {
        matchesPrice = (product.price_min > 1000 && product.price_min <= 2000) || 
                      (product.price_max > 1000 && product.price_max <= 2000);
      } else {
        matchesPrice = product.price > 1000 && product.price <= 2000;
      }
    } else if (priceRange === "2000-5000") {
      if (product.has_price_range && product.price_min && product.price_max) {
        matchesPrice = (product.price_min > 2000 && product.price_min <= 5000) || 
                      (product.price_max > 2000 && product.price_max <= 5000);
      } else {
        matchesPrice = product.price > 2000 && product.price <= 5000;
      }
    } else if (priceRange === "5000+") {
      if (product.has_price_range && product.price_min) {
        matchesPrice = product.price_min > 5000 || (product.price_max || 0) > 5000;
      } else {
        matchesPrice = product.price > 5000;
      }
    }
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
  });

  // Sorting logic
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  } else if (sortBy === "newest") {
    filteredProducts.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
  } else if (sortBy === "featured") {
    filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  }

  // Add scroll event listener for infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 500 || loadingMore) {
        return;
      }
      loadMore();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, filteredProducts]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getProducts()
        if (data && Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error('Invalid products data format:', data)
          setProducts([])
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
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
        .filter(p => p.main_category_info?.slug === "edible")
        .reduce((acc, product) => {
          // Check both primary and secondary categories
          const subcategories = [
            product.primary_category_info,
            product.secondary_category_info
          ].filter(Boolean);
          
          subcategories.forEach(subcat => {
            if (subcat) {
              const id = subcat.id;
              acc[id] = acc[id] || {
                id: id,
                name: subcat.name,
                slug: subcat.slug,
                count: 0
              };
              acc[id].count++;
            }
          });
          return acc;
        }, {} as Record<string, Subcategory>);
      
      setSubcategories(Object.values(subcategoryCounts));
    } else if (selectedCategory === "non-edibles") {
      // Group products by subcategory and count them
      const subcategoryCounts = products
        .filter(p => p.main_category_info?.slug === "non-edible")
        .reduce((acc, product) => {
          // Check both primary and secondary categories
          const subcategories = [
            product.primary_category_info,
            product.secondary_category_info
          ].filter(Boolean);
          
          subcategories.forEach(subcat => {
            if (subcat) {
              const id = subcat.id;
              acc[id] = acc[id] || {
                id: id,
                name: subcat.name,
                slug: subcat.slug,
                count: 0
              };
              acc[id].count++;
            }
          });
          return acc;
        }, {} as Record<string, Subcategory>);
      
      setSubcategories(Object.values(subcategoryCounts));
    } else {
      setSubcategories([]);
    }
  };

  // Count products in each category
  const ediblesCount = products.filter(p => 
    p.main_category_info?.slug === "edible"
  ).length;
  
  const nonEdiblesCount = products.filter(p => 
    p.main_category_info?.slug === "non-edible"
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

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const loadMore = async () => {
    if (visibleProducts >= filteredProducts.length || loadingMore) return;
    
    setLoadingMore(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setVisibleProducts(prev => prev + 12);
    setLoadingMore(false);
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
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your product search</SheetDescription>
                </SheetHeader>
                <FiltersContent />
                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button className="w-full">Apply Filters</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Sidebar for Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white p-6 border border-gray-100 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Filters</h2>
              <FiltersContent />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleSearch} className="relative flex-1">
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </form>
              
              <div className="flex gap-2 items-center">
                <Select 
                  value={priceRange} 
                  onValueChange={(value) => setPriceRange(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Price Range" />
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
            </div>
            
            {/* Products Display */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#AD9660]" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4 flex justify-center">
                  <Package className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                {/* Active Filters */}
                {selectedSubcategories.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm text-gray-500">Active filters:</span>
                      {selectedSubcategories.map((subcatId) => {
                        const subcat = subcategories.find(s => s.id === subcatId);
                        return (
                          <Badge key={subcatId} variant="secondary" className="flex items-center gap-1 px-2 py-1">
                            {subcat?.name}
                            <button onClick={() => toggleSubcategory(subcatId)}>
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        );
                      })}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => toggleAllSubcategories(false)}
                      >
                        Clear all
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Grid View */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.slice(0, visibleProducts).map((product, index) => {
                    const productImage = product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg';
                    return (
                      <ProductCard 
                        key={product.id} 
                        product={{
                          id: product.id,
                          name: product.name,
                          image: productImage,
                          display_image: product.display_image,
                          hover_image: product.hover_image,
                          images: product.images,
                          price: product.price,
                          price_min: product.price_min,
                          price_max: product.price_max,
                          has_price_range: product.has_price_range,
                          discount: undefined,
                          rating: product.rating || 0,
                          reviews: product.reviews || 0,
                          category: product.main_category_info?.name || '',
                          moq: product.moq,
                        }}
                        index={index}
                        products={filteredProducts.slice(0, visibleProducts).map(p => ({
                          id: p.id,
                          name: p.name,
                          image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder.svg',
                          display_image: p.display_image,
                          hover_image: p.hover_image,
                          images: p.images,
                          price: p.price,
                          price_min: p.price_min,
                          price_max: p.price_max,
                          has_price_range: p.has_price_range,
                          discount: undefined,
                          rating: p.rating || 0,
                          reviews: p.reviews || 0,
                          category: p.main_category_info?.name || '',
                          moq: p.moq,
                        }))}
                      />
                    );
                  })}
                </div>
                
                {/* Loading indicator for infinite scroll */}
                {loadingMore && (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-[#AD9660]" />
                    <span className="ml-2 text-sm text-gray-500">Loading more products...</span>
                  </div>
                )}
                
                {/* End of results message */}
                {visibleProducts >= filteredProducts.length && filteredProducts.length > 0 && (
                  <div className="text-center py-8 text-sm text-gray-500">
                    You've reached the end of the results
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