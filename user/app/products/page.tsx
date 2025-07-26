"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
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
  Eye,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getProducts } from "@/lib/supabase"
import Fuse from 'fuse.js'
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ProductGrid from '@/components/LandingPage/ProductGrid'
import { useShortlist } from "@/lib/ShortlistContext"
import { Product } from "@/types/database"
import { useSearchParams, useRouter } from "next/navigation"

// Custom CSS for scrollbar
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #AD9660;
    border-radius: 2px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #8B7A4F;
  }
`;

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
  
  // Get search term from URL for highlighting
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

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
            {searchTerm ? highlightMatch(product.name, searchTerm) : product.name}
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

// Enhanced search configuration for Fuse.js
const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'description', weight: 0.3 },
    { name: 'keywords', weight: 0.5 },
    { name: 'main_category_info.name', weight: 0.4 },
    { name: 'primary_category_info.name', weight: 0.4 },
    { name: 'secondary_category_info.name', weight: 0.3 },
  ],
  threshold: 0.4, // Lower = more strict matching
  distance: 100,
  minMatchCharLength: 2,
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  findAllMatches: true,
}

// Search suggestions based on popular searches and categories
const getSearchSuggestions = (products: Product[], searchTerm: string) => {
  if (!searchTerm || searchTerm.length < 2) return []
  
  const suggestions = new Set<string>()
  const lowerSearch = searchTerm.toLowerCase()
  
  // Add product names that partially match
  products.forEach(product => {
    if (product.name?.toLowerCase().includes(lowerSearch)) {
      suggestions.add(product.name)
    }
    
    // Add category suggestions
    if (product.main_category_info?.name?.toLowerCase().includes(lowerSearch)) {
      suggestions.add(product.main_category_info.name)
    }
    if (product.primary_category_info?.name?.toLowerCase().includes(lowerSearch)) {
      suggestions.add(product.primary_category_info.name)
    }
    if (product.secondary_category_info?.name?.toLowerCase().includes(lowerSearch)) {
      suggestions.add(product.secondary_category_info.name)
    }
  })
  
  return Array.from(suggestions).slice(0, 8)
}

// Highlight matching text in search results
const highlightMatch = (text: string, searchTerm: string) => {
  if (!searchTerm || searchTerm.length < 2) return text
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
        {part}
      </mark>
    ) : part
  )
}

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
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Initialize Fuse.js instance
  const fuse = useMemo(() => {
    if (products.length === 0) return null
    
    // Enhance products with searchable keywords
    const enhancedProducts = products.map(product => ({
      ...product,
      keywords: [
        product.name,
        product.description,
        product.main_category_info?.name,
        product.primary_category_info?.name,
        product.secondary_category_info?.name,
        // Add common search terms and synonyms
        ...(product.name?.toLowerCase().includes('chocolate') ? ['sweet', 'dessert', 'cocoa'] : []),
        ...(product.name?.toLowerCase().includes('coffee') ? ['beverage', 'drink', 'caffeine'] : []),
        ...(product.name?.toLowerCase().includes('tea') ? ['beverage', 'drink', 'herbal'] : []),
        ...(product.name?.toLowerCase().includes('mug') ? ['cup', 'drinkware', 'ceramic'] : []),
        ...(product.name?.toLowerCase().includes('bottle') ? ['drinkware', 'hydration', 'water'] : []),
        ...(product.name?.toLowerCase().includes('bag') ? ['tote', 'carry', 'storage'] : []),
        ...(product.name?.toLowerCase().includes('candle') ? ['fragrance', 'aromatherapy', 'wax'] : []),
        ...(product.name?.toLowerCase().includes('plant') ? ['green', 'nature', 'succulent'] : []),
      ].filter(Boolean).join(' ')
    }))
    
    return new Fuse(enhancedProducts, fuseOptions)
  }, [products])

  // Get search query from URL
  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      setSearchTerm(searchQuery)
      setSearchInputValue(searchQuery)
    }
  }, [searchParams])

  // Update search suggestions when search input changes
  useEffect(() => {
    const suggestions = getSearchSuggestions(products, searchInputValue)
    setSearchSuggestions(suggestions)
  }, [searchInputValue, products])

  // Enhanced filtering with fuzzy search
  const filteredProducts = useMemo(() => {
    let results = products

    // Apply fuzzy search if search term exists
    if (searchTerm && searchTerm.length >= 2 && fuse) {
      setIsSearching(true)
      const searchResults = fuse.search(searchTerm)
      results = searchResults.map(result => result.item)
      setIsSearching(false)
    }

    // Apply category filters
    if (selectedCategory === "edibles") {
      results = results.filter(product => product.main_category_info?.slug === "edible")
    } else if (selectedCategory === "non-edibles") {
      results = results.filter(product => product.main_category_info?.slug === "non-edible")
    }
    
    // Apply subcategory filters
    if (selectedSubcategories.length > 0) {
      results = results.filter(product => {
      const productSubcategoryIds = [
        product.primary_category_info?.id,
        product.secondary_category_info?.id
        ].filter(Boolean)
      
        return selectedSubcategories.some(subcatId => 
        productSubcategoryIds.includes(subcatId)
        )
      })
    }

    // Apply price filters
    if (priceRange !== "all") {
      results = results.filter(product => {
        const price = product.has_price_range ? product.price_min || product.price : product.price
        const maxPrice = product.has_price_range ? product.price_max || product.price : product.price

        switch (priceRange) {
          case "under-500": return price < 500
          case "500-1000": return (price >= 500 && price <= 1000) || (maxPrice >= 500 && maxPrice <= 1000)
          case "1000-2000": return (price > 1000 && price <= 2000) || (maxPrice > 1000 && maxPrice <= 2000)
          case "2000-5000": return (price > 2000 && price <= 5000) || (maxPrice > 2000 && maxPrice <= 5000)
          case "5000+": return price > 5000 || maxPrice > 5000
          default: return true
        }
      })
    }

    return results
  }, [products, searchTerm, selectedCategory, selectedSubcategories, priceRange, fuse])

  // Apply sorting to filtered products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => {
          const priceA = a.has_price_range ? a.price_min || a.price : a.price;
          const priceB = b.has_price_range ? b.price_min || b.price : b.price;
          return priceA - priceB;
        });
      case "price-high":
        return sorted.sort((a, b) => {
          const priceA = a.has_price_range ? a.price_max || a.price : a.price;
          const priceB = b.has_price_range ? b.price_max || b.price : b.price;
          return priceB - priceA;
        });
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest":
        return sorted.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
      case "featured":
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

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
  }, [loadingMore, sortedProducts]);

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
    if (visibleProducts >= sortedProducts.length || loadingMore) return;
    
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

  // Handle search with debouncing
  const handleSearchChange = useCallback((value: string) => {
    setSearchInputValue(value)
    setShowSuggestions(value.length >= 2)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      setSearchTerm(value)
      
      // Update URL
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      router.replace(`/products?${params.toString()}`, { scroll: false })
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchParams, router])

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(searchInputValue)
    setShowSuggestions(false)
    
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

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setSearchInputValue(suggestion)
    setSearchTerm(suggestion)
    setShowSuggestions(false)
    
    // Update URL
    const params = new URLSearchParams(searchParams.toString())
    params.set('search', suggestion)
    router.replace(`/products?${params.toString()}`, { scroll: false })
  }

  // Clear search
  const clearSearch = () => {
    setSearchInputValue("")
    setSearchTerm("")
    setShowSuggestions(false)
    
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    router.replace(`/products?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="bg-white min-h-screen">
      <style>{customScrollbarStyles}</style>
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
            {/* Enhanced Search and Sort Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <form onSubmit={handleSearch} className="relative">
                <Input 
                  type="text" 
                    placeholder="Search products, categories, or keywords..." 
                    className="pl-10 pr-12 py-3 w-full text-base border-2 border-gray-200 focus:border-[#AD9660] transition-colors"
                  value={searchInputValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => setShowSuggestions(searchInputValue.length >= 2)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  
                  {/* Clear search button */}
                  {searchInputValue && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  
                  {/* Search loading indicator */}
                  {isSearching && (
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#AD9660]" />
                    </div>
                  )}
              </form>
              
                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                    <div className="p-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Sparkles className="w-3 h-3" />
                        <span>Suggestions</span>
                      </div>
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionSelect(suggestion)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm transition-colors duration-150 flex items-center gap-2"
                        >
                          <Search className="w-3 h-3 text-gray-400" />
                          <span>{highlightMatch(suggestion, searchInputValue)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 items-center">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Results Summary */}
            {searchTerm && (
              <div className="mb-4 p-3 bg-[#F7F6F4] rounded-md border-l-4 border-[#AD9660]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#AD9660]" />
                                         <span className="text-sm text-gray-700">
                       Showing {sortedProducts.length} results for "{searchTerm}"
                     </span>
                  </div>
                  <button
                    onClick={clearSearch}
                    className="text-xs text-[#AD9660] hover:text-[#8B7A4F] transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              </div>
            )}
            
            {/* Products Display */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#AD9660]" />
              </div>
            ) : sortedProducts.length === 0 ? (
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
                  {sortedProducts.slice(0, visibleProducts).map((product, index) => {
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
                        products={sortedProducts.slice(0, visibleProducts).map(p => ({
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
                {visibleProducts >= sortedProducts.length && sortedProducts.length > 0 && (
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