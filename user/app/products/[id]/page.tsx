"use client"

import type React from "react"
import type { Product } from "@/types/database"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Heart,
  Package,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Plus,
  Minus,
  MessageCircle,
  Mail,
  ArrowLeft,
  ThumbsUp,
  Loader2,
  ShoppingBag,
  Check,
  ChevronRight,
  Share2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useShortlist, type ShortlistItem } from "@/lib/ShortlistContext"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/utils/supabase/client"
import { motion } from "framer-motion"
import { getRelatedProducts } from "@/app/actions"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const pathname = usePathname()
  const productId = pathname.split('/').pop() || params.id
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(25)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("description")
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loadingRelated, setLoadingRelated] = useState(true)
  const imageRef = useRef<HTMLDivElement>(null)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const { toast } = useToast()
  const { addToShortlist, isInShortlist, removeFromShortlist } = useShortlist()
  const [isInShortlistState, setIsInShortlistState] = useState(false)
  const [isAddingToShortlist, setIsAddingToShortlist] = useState(false)

  // Fetch product data from Supabase
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const supabase = createClient()
        const { data: productData, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single()
        if (error) throw error
        if (productData) {
          const transformedProduct: Product = {
            ...productData,
            features: Array.isArray(productData.features) ? productData.features : null,
            specifications: typeof productData.specifications === 'object' ? productData.specifications : null,
            benefits: Array.isArray(productData.benefits) ? productData.benefits : null,
            is_featured: productData.is_featured ?? false,
            delivery: productData.delivery || "5-7 business days"
          }
          setProduct(transformedProduct)
          if (transformedProduct.moq && typeof transformedProduct.moq === 'number') {
            setQuantity(transformedProduct.moq)
          }
          
          // After getting the product, fetch related products
          fetchRelatedProducts(transformedProduct.id, transformedProduct.category || null)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        toast({
          title: "Error",
          description: "Failed to load product details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [productId, toast])
  
  // Fetch related products
  async function fetchRelatedProducts(id: string, category: string | null) {
    try {
      setLoadingRelated(true)
      const data = await getRelatedProducts(id, category)
      setRelatedProducts(data)
    } catch (error) {
      console.error('Error fetching related products:', error)
    } finally {
      setLoadingRelated(false)
    }
  }

  // Helper function to format price values
  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString()}`
  }

  // Display price based on whether it's a range or single price
  const displayPrice = () => {
    if (product?.has_price_range && product?.price_min && product?.price_max) {
      return (
        <div className="flex flex-col">
          <div className="text-3xl font-semibold text-gray-900">
            {formatPrice(product.price_min)} - {formatPrice(product.price_max)}
          </div>
          {product.moq && (
            <div className="text-sm text-gray-600 mt-1">
              MOQ: {product.moq} {product.moq === 1 ? 'piece' : 'pieces'}
            </div>
          )}
          {product.original_price && (
            <div className="flex items-center mt-1">
              <span className="text-lg text-gray-500 line-through mr-2">
                {formatPrice(product.original_price)}
              </span>
              {product.discount && (
                <Badge className="bg-red-100 text-red-800 border-red-200">{product.discount}</Badge>
              )}
            </div>
          )}
        </div>
      );
    } else if (product) {
      return (
        <div className="flex flex-col">
          <div className="text-3xl font-semibold text-gray-900">
            {formatPrice(product.price)}
          </div>
          {product.moq && (
            <div className="text-sm text-gray-600 mt-1">
              MOQ: {product.moq} {product.moq === 1 ? 'piece' : 'pieces'}
            </div>
          )}
          {product.original_price && (
            <div className="flex items-center mt-1">
              <span className="text-lg text-gray-500 line-through mr-2">
                {formatPrice(product.original_price)}
              </span>
              {product.discount && (
                <Badge className="bg-red-100 text-red-800 border-red-200">{product.discount}</Badge>
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imageRef.current || !isZoomed) return
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      animationRef.current = requestAnimationFrame(() => {
        if (!imageRef.current) return
        const rect = imageRef.current.getBoundingClientRect()
        const x = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 0), 100)
        const y = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 0), 100)
        setZoomPosition({ x, y })
      })
    },
    [isZoomed],
  )

  const handleMouseEnter = useCallback(() => setIsZoomed(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false)
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
  }, [])

  // Update shortlist state when product changes
  useEffect(() => {
    if (product) {
      setIsInShortlistState(isInShortlist(product.id))
    }
  }, [product, isInShortlist])

  const handleAddToShortlist = async () => {
    if (!product) return
    setIsAddingToShortlist(true)
    try {
      const shortlistItem: ShortlistItem = {
        id: product.id,
        name: product.name,
        price: product.has_price_range 
          ? `${formatPrice(product.price_min || 0)} - ${formatPrice(product.price_max || 0)}`
          : formatPrice(product.price),
        originalPrice: formatPrice(product.original_price || product.price),
        image: product.images && product.images.length > 0 ? product.images[0] : "",
        rating: product.rating || 4.5,
        reviews: product.reviews || 0,
        discount: product.discount || (product.original_price ? `${Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF` : undefined),
        quantity: quantity,
        moq: product.moq || 1,
        category: product.category,
      }
      
      if (isInShortlistState) {
        removeFromShortlist(product.id)
        setIsInShortlistState(false)
      } else {
        addToShortlist(shortlistItem)
        setIsInShortlistState(true)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update shortlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingToShortlist(false)
    }
  }

  const handleRequestQuote = () => {
    if (!isInShortlistState) handleAddToShortlist()
    window.location.href = "/quote"
  }

  // Helper function to safely get rating for star display
  const getRating = (rating: number | null | undefined): number => rating ?? 4.5
  const getStarFill = (index: number, rating: number | null | undefined): string =>
    index < Math.floor(getRating(rating)) ? "text-[#AD9660] fill-current" : "text-gray-300"
  const getReviews = (reviews: number | null | undefined): number => reviews ?? 0
  const getProductName = (product: Product | null): string => product?.name ?? "Product"

  // Reviews data - static but could be fetched from DB in future
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechCorp",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Excellent quality and our new employees loved these welcome kits. Great attention to detail and the customization was perfect. The packaging was premium and made a great first impression.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "StartupXYZ",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Professional packaging and high-quality items. Will definitely order again. The wireless charging pad was a hit with our tech-savvy team.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "InnovateCo",
      rating: 4,
      date: "2024-01-05",
      comment:
        "Good value for money. The customization options were perfect for our brand. Only minor issue was delivery took an extra day.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 4,
      name: "David Park",
      company: "GrowthLabs",
      rating: 5,
      date: "2023-12-28",
      comment:
        "Outstanding quality! The eco-friendly materials align perfectly with our company values. Highly recommend for any company looking to make a great first impression.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      verified: true,
    },
  ]

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <div className="text-center">
          <div className="relative mb-6 mx-auto w-16 h-16">
            <div className="absolute inset-0 border-2 border-[#AD9660] rounded-full opacity-25 animate-ping"></div>
            <div className="absolute inset-0 border-2 border-[#AD9660] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-['Frank_Ruhl_Libre'] font-medium text-[#323433] mb-2">Loading Product Details</h2>
          <p className="text-gray-500 font-light">Please wait while we fetch the product information</p>
        </div>
      </div>
    )
  }

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-[#E6E2DD] rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-[#AD9660]" />
          </div>
          <h2 className="text-3xl font-['Frank_Ruhl_Libre'] font-medium text-[#323433] mb-4">Product Not Found</h2>
          <p className="text-gray-500 mb-8 font-light">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/categories">
            <Button className="bg-[#AD9660] hover:bg-[#8A784F] text-white rounded-none px-6">
              Browse Our Collection
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Reusable card for related/similar products
  function RelatedProductCard({ item }: { item: any }) {
    return (
      <div className="group overflow-hidden">
        <Link href={`/products/${item.id}`} className="block">
          <div className="relative aspect-square mb-3 overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {item.discount && (
              <div className="absolute top-3 left-3 bg-[#323433] text-white text-xs px-2 py-1">
                {item.discount}
              </div>
            )}
          </div>
          <h3 className="text-sm font-medium text-[#323433] line-clamp-2 group-hover:text-[#AD9660] transition-colors">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-[#AD9660] fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1">{item.rating}</span>
          </div>
          <div className="mt-1">
            <span className="text-sm font-medium">{item.price}</span>
            {item.originalPrice && (
              <span className="text-xs text-gray-500 line-through ml-2">{item.originalPrice}</span>
            )}
          </div>
        </Link>
      </div>
    )
  }

  
  return (
    <div className="min-h-screen bg-white">
      {/* Floating Action Buttons - Made smaller and more subtle */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 shadow-md"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 shadow-md"
          title="View Shortlist"
        >
          <Link href="/shortlist">
            <Heart className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#F4F4F4] border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#AD9660] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            <Link href="/categories" className="hover:text-[#AD9660] transition-colors">
              Categories
            </Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            {product?.category && (
              <>
                <Link 
                  href={`/categories/${product.category?.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="hover:text-[#AD9660] transition-colors"
                >
                  {product.category}
                </Link>
                <ChevronRight className="w-3 h-3 mx-2" />
              </>
            )}
            <span className="text-[#323433] font-medium truncate max-w-[200px]">{product?.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden bg-[#F4F4F4]"
            >
              <div
                ref={imageRef}
                className="relative overflow-hidden cursor-zoom-in"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                <div
                  className="relative w-full aspect-square"
                  style={{
                    transform: isZoomed ? `scale(1.5)` : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: isZoomed ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Image
                    src={
                      selectedImage === 0 && product?.display_image
                        ? product.display_image
                        : selectedImage > 0 && product?.images?.[selectedImage - 1]
                        ? product.images[selectedImage - 1]
                        : product?.display_image || "/placeholder.jpg"
                    }
                    alt={product?.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4 text-[#323433]" />
                </button>
                <button
                  className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                    isInShortlistState
                      ? "bg-[#AD9660] text-white hover:bg-[#8A784F]"
                      : "bg-white/80 text-[#323433] hover:bg-white"
                  }`}
                  onClick={handleAddToShortlist}
                  disabled={isAddingToShortlist}
                  aria-label={isInShortlistState ? "Remove from shortlist" : "Add to shortlist"}
                >
                  <Heart className={`w-4 h-4 ${isInShortlistState ? "fill-current" : ""}`} />
                </button>
              </div>
            </motion.div>

            {/* Thumbnail Images */}
            {((product?.display_image || product?.images?.length) && 
              ((product?.display_image ? 1 : 0) + (product?.images?.length || 0)) > 1) && (
              <div 
                ref={thumbnailsRef}
                className="grid grid-cols-5 gap-2 md:gap-4"
              >
                {/* Display image as first thumbnail */}
                {product?.display_image && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    key="display-image"
                    onClick={() => setSelectedImage(0)}
                    className={`relative aspect-square overflow-hidden border-2 ${
                      selectedImage === 0
                        ? "border-[#AD9660]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image 
                      src={product.display_image} 
                      alt={`${product.name} main`} 
                      fill 
                      className="object-cover" 
                    />
                  </motion.button>
                )}
                
                {/* Additional images */}
                {product?.images?.map((image: string, index: number) => (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
                    key={`additional-${index}`}
                    onClick={() => setSelectedImage(index + 1)}
                    className={`relative aspect-square overflow-hidden border-2 ${
                      selectedImage === index + 1
                        ? "border-[#AD9660]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image 
                      src={image} 
                      alt={`${product.name} ${index + 2}`} 
                      fill 
                      className="object-cover" 
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              {product?.category && (
                <div className="mb-2">
                  <Badge className="bg-[#E6E2DD] hover:bg-[#E6E2DD] text-[#323433] rounded-sm px-3 font-normal">
                    {product.category}
                  </Badge>
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-['Frank_Ruhl_Libre'] font-medium text-[#323433] mb-4">
                {product?.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${getStarFill(i, product?.rating)}`}
                    />
                  ))}
                  <span className="text-sm font-medium text-gray-700 ml-2">
                    {getRating(product?.rating).toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-gray-500">SKU: {product.id.slice(-8).toUpperCase()}</span>
              </div>

              <div className="mb-6">
                {/* Price section - Updated */}
                {displayPrice()}
                
                {/* MOQ Section - New */}
                {product.moq && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-amber-600 mr-2" />
                      <span className="font-medium">Minimum Order Quantity: {product.moq} {product.moq === 1 ? 'piece' : 'pieces'}</span>
                    </div>
                  </div>
                )}
                
                {/* Volume pricing - New */}
                {product?.has_price_range && product?.price_min && product?.price_max && (
                  <div className="mt-4 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3">Volume Pricing</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 text-sm">
                        <span className="font-medium">Quantity</span>
                        <span className="font-medium">Price per unit</span>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 text-sm">
                        <span>{product.moq || 1}-99 pieces</span>
                        <span>{formatPrice(product.price_max)}</span>
                      </div>
                      <div className="grid grid-cols-2 text-sm">
                        <span>100-499 pieces</span>
                        <span>{formatPrice((product.price_min + product.price_max) / 2)}</span>
                      </div>
                      <div className="grid grid-cols-2 text-sm">
                        <span>500+ pieces</span>
                        <span>{formatPrice(product.price_min)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Contact us for custom pricing on larger quantities.
                    </p>
                  </div>
                )}
              </div>

              {product.description && (
                <div className="border-t border-b border-gray-200 py-6 mb-6">
                  <p className="text-gray-600 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-6">
                <Label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </Label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-md"
                    onClick={() => setQuantity(Math.max((product.moq || 1), quantity - 1))}
                    disabled={quantity <= (product.moq || 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= (product.moq || 1)) {
                        setQuantity(val);
                      }
                    }}
                    className="w-20 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min={product.moq || 1}
                  />
                  <Button variant="outline" size="icon" className="rounded-r-md" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="h-12 bg-[#323433] hover:bg-black text-white rounded-none flex-1 relative overflow-hidden group"
                  onClick={handleAddToShortlist}
                  disabled={isAddingToShortlist}
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-[#AD9660] group-hover:translate-x-full group-hover:skew-x-12"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    {isAddingToShortlist ? (
                      "Processing..."
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        {isInShortlistState ? "Added to Shortlist" : "Add to Shortlist"}
                      </>
                    )}
                  </span>
                </Button>
                <Button
                  className="h-12 bg-[#AD9660] hover:bg-[#8A784F] text-white rounded-none flex-1"
                  onClick={handleRequestQuote}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Request Quote
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-['Frank_Ruhl_Libre'] font-medium text-[#323433]">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features ? (
                  product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-[#AD9660] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-[#AD9660] mt-0.5 flex-shrink-0" />
                    <span>Premium quality materials ensure durability and longevity</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-['Frank_Ruhl_Libre'] font-medium text-[#323433]">
                Shipping Information
              </h3>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#AD9660] mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">Free Shipping</p>
                  <p className="text-gray-600 text-sm">
                    On bulk orders over ₹5,000. Standard delivery in {product.delivery || "5-7 business days"}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full" onValueChange={setActiveTab}>
            <div className="border-b border-gray-200">
              <div className="container mx-auto px-4">
                <TabsList className="flex h-14 w-full bg-transparent space-x-8">
                  <TabsTrigger 
                    value="description" 
                    className={`pb-4 rounded-none border-b-2 data-[state=active]:border-[#AD9660] data-[state=active]:text-[#323433] font-medium px-0 text-gray-500 text-base`}
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger 
                    value="specifications" 
                    className={`pb-4 rounded-none border-b-2 data-[state=active]:border-[#AD9660] data-[state=active]:text-[#323433] font-medium px-0 text-gray-500 text-base`}
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="customization" 
                    className={`pb-4 rounded-none border-b-2 data-[state=active]:border-[#AD9660] data-[state=active]:text-[#323433] font-medium px-0 text-gray-500 text-base`}
                  >
                    Customization Options
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className={`pb-4 rounded-none border-b-2 data-[state=active]:border-[#AD9660] data-[state=active]:text-[#323433] font-medium px-0 text-gray-500 text-base`}
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <div className="container mx-auto px-4 py-8">
              <TabsContent value="description" className="mt-0">
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-['Frank_Ruhl_Libre'] font-medium text-[#323433] mb-6">Product Description</h3>
                  <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                    <p>{product.description || "This premium corporate gift combines elegance with functionality, making it the perfect choice for expressing gratitude to clients, recognizing employees, or celebrating company milestones."}</p>
                    
                    <p>Our products are designed with attention to detail and crafted from high-quality materials to ensure a luxurious experience that reflects your company's standards of excellence.</p>
                    
                    {product.benefits && product.benefits.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-xl font-medium text-[#323433] mb-4">Key Benefits</h4>
                        <ul className="space-y-2">
                          {product.benefits.map((benefit: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-[#AD9660] mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-0">
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-['Frank_Ruhl_Libre'] font-medium text-[#323433] mb-6">Product Specifications</h3>
                  
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <div className="overflow-hidden border border-gray-200 rounded-sm">
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <div key={key} className={`flex ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                          <div className="w-1/3 p-4 font-medium text-[#323433] border-r border-gray-200">
                            {key}
                          </div>
                          <div className="w-2/3 p-4 text-gray-600">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-hidden border border-gray-200 rounded-sm">
                      <div className="flex bg-gray-50">
                        <div className="w-1/3 p-4 font-medium text-[#323433] border-r border-gray-200">Materials</div>
                        <div className="w-2/3 p-4 text-gray-600">Premium quality materials</div>
                      </div>
                      <div className="flex bg-white">
                        <div className="w-1/3 p-4 font-medium text-[#323433] border-r border-gray-200">Dimensions</div>
                        <div className="w-2/3 p-4 text-gray-600">Varies by customization</div>
                      </div>
                      <div className="flex bg-gray-50">
                        <div className="w-1/3 p-4 font-medium text-[#323433] border-r border-gray-200">Weight</div>
                        <div className="w-2/3 p-4 text-gray-600">Varies by customization</div>
                      </div>
                      <div className="flex bg-white">
                        <div className="w-1/3 p-4 font-medium text-[#323433] border-r border-gray-200">Package Contents</div>
                        <div className="w-2/3 p-4 text-gray-600">Gift item with premium packaging</div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="customization" className="mt-0">
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-['Frank_Ruhl_Libre'] font-medium text-[#323433] mb-6">Customization Options</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-[#E6E2DD] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#AD9660]"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-[#323433] mb-2">Logo Branding</h4>
                        <p className="text-gray-600">Add your company logo using premium techniques like embossing, debossing, laser engraving, or premium printing for a sophisticated touch.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-[#E6E2DD] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#AD9660]"><path d="M2 8h20M2 16h20"></path><path d="M13 12h9"></path><circle cx="9" cy="12" r="1"></circle></svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-[#323433] mb-2">Color Selection</h4>
                        <p className="text-gray-600">Choose from a curated palette of colors that align with your brand identity or match specific campaign themes.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-[#E6E2DD] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#AD9660]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-[#323433] mb-2">Custom Messaging</h4>
                        <p className="text-gray-600">Include personalized messages, employee names, or special congratulatory notes to create a more meaningful gift experience.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-[#E6E2DD] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#AD9660]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" x2="12" y1="22" y2="12"></line></svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-[#323433] mb-2">Premium Packaging</h4>
                        <p className="text-gray-600">Elevate the unboxing experience with custom packaging featuring your brand colors, logo, and premium materials.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-[#F4F4F4] p-6">
                    <p className="text-[#323433] font-medium">Need a custom solution?</p>
                    <p className="text-gray-600 mb-4">Our team can work with you to create completely bespoke corporate gifts tailored to your specific requirements.</p>
                    <Button className="bg-[#AD9660] hover:bg-[#8A784F] rounded-none">
                      Contact for Custom Orders
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <div className="max-w-3xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-['Frank_Ruhl_Libre'] font-medium text-[#323433]">Customer Reviews</h3>
                    <Button variant="outline" size="sm" className="border-[#AD9660] text-[#AD9660] hover:bg-[#AD9660] hover:text-white">
                      Write a Review
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#F4F4F4] p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl font-medium text-[#323433]">
                          {product.rating || 4.8}
                        </span>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < Math.floor(getRating(product.rating)) ? 'text-[#AD9660] fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">Based on {product.reviews || 24} reviews</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-2 text-sm">
                            <span className="w-12">{stars} stars</span>
                            <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#AD9660] rounded-full"
                                style={{ width: `${stars === 5 ? 68 : stars === 4 ? 22 : stars === 3 ? 8 : 2}%` }}
                              />
                            </div>
                            <span className="text-gray-500 w-8">{stars === 5 ? 68 : stars === 4 ? 22 : stars === 3 ? 8 : 2}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-[#F4F4F4] p-6">
                      <h4 className="text-lg font-medium text-[#323433] mb-4">Review Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-white text-[#323433] hover:bg-gray-100">Premium quality</Badge>
                        <Badge className="bg-white text-[#323433] hover:bg-gray-100">Great customer service</Badge>
                        <Badge className="bg-white text-[#323433] hover:bg-gray-100">Fast shipping</Badge>
                        <Badge className="bg-white text-[#323433] hover:bg-gray-100">Excellent packaging</Badge>
                        <Badge className="bg-white text-[#323433] hover:bg-gray-100">Good value</Badge>
                        <Badge className="bg-white text-[#323433] hover:bg-gray-100">Professional</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start gap-3 mb-3">
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-[#323433]">{review.name}</div>
                            <div className="text-sm text-gray-500">{review.company}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-[#AD9660] fill-current' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                          </div>
                          {review.verified && (
                            <Badge className="ml-auto bg-[#E6E2DD] text-[#323433] hover:bg-[#E6E2DD]">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        {/* You Might Also Like Section */}
        <div className="bg-[#F4F4F4] mt-16 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-['Frank_Ruhl_Libre'] font-medium text-[#323433]">You Might Also Like</h2>
              <Link href="/categories" className="text-[#AD9660] font-medium flex items-center hover:underline">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            {loadingRelated ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="space-y-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : relatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <RelatedProductCard 
                    key={item.id} 
                    item={{
                      id: item.id,
                      name: item.name,
                      price: formatPrice(item.price),
                      originalPrice: item.original_price ? formatPrice(item.original_price) : undefined,
                      image: item.display_image || (item.images && item.images.length > 0 ? item.images[0] : '/placeholder.jpg'),
                      rating: item.rating || 4.5,
                      discount: item.discount || (item.original_price ? `${Math.round(((item.original_price - item.price) / item.original_price) * 100)}% OFF` : undefined),
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No related products found</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Corporate Gifting CTA */}
        <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-['Frank_Ruhl_Libre'] font-medium text-[#323433] mb-4">
            Need Help with Corporate Gifting?
          </h2>
          <p className="text-gray-600 mb-8">
            Our corporate gifting experts are here to help you find the perfect solution for recognizing employees, 
            appreciating clients, or celebrating company milestones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#323433] hover:bg-black text-white rounded-none h-12">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with an Expert
            </Button>
            <Button className="bg-[#AD9660] hover:bg-[#8A784F] text-white rounded-none h-12">
              <Mail className="w-4 h-4 mr-2" />
              Request Bulk Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
