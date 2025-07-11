"use client"

import type React from "react"
import type { Product } from "@/types/database"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Award,
  Settings,
  Palette,
  MessageSquare,
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
          <div className="text-2xl font-semibold text-gray-900">
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
          <div className="text-2xl font-semibold text-gray-900">
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

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative mb-6 mx-auto w-16 h-16">
            <div className="absolute inset-0 border-2 border-[#AD9660] rounded-full opacity-25 animate-ping"></div>
            <div className="absolute inset-0 border-2 border-[#AD9660] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-medium text-[#323433] mb-2">Loading Product Details</h2>
          <p className="text-gray-500">Please wait while we fetch the product information</p>
        </div>
      </div>
    )
  }

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-medium text-[#323433] mb-4">Product Not Found</h2>
          <p className="text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/categories">
            <Button className="bg-[#AD9660] hover:bg-[#8A784F] text-white px-6">
              Browse Our Collection
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Reusable card for related/similar products
  function RelatedProductCard({ item }: { item: any }) {
    const relatedDisplayImage = item.display_image || item.image || item.images?.[0] || '/placeholder.svg';
    
    return (
      <Link href={`/products/${item.id}`}>
        <div className="group relative overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02]" style={{ height: '100%' }}>
                    <div className="relative h-40 md:h-48 mb-3 md:mb-4 bg-white">
            <Image
              src={relatedDisplayImage}
              alt={item.name}
              fill
              className="w-full h-full object-contain p-2 transition-opacity duration-500 group-hover:opacity-0"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            {item.hover_image && item.hover_image !== relatedDisplayImage && (
              <Image
                src={item.hover_image}
                alt={item.name + ' hover'}
                fill
                className="absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            )}
            
            {/* Elegant badge design */}
            <div className="absolute top-2 md:top-4 left-0">
              <div className="bg-white/90 backdrop-blur-sm border-l-2 border-[#AD9660] text-[#323433] font-light text-[10px] md:text-xs px-2 md:px-4 py-1 md:py-2">
                Best Seller
          </div>
            </div>
          </div>

          {/* Product details with refined typography */}
          <div className="px-1 md:px-2 flex flex-col flex-1">
            <h3 className="font-light text-sm md:text-base text-[#323433] leading-snug line-clamp-2 mb-1 md:mb-2 group-hover:text-[#AD9660] transition-colors duration-300">
            {item.name}
          </h3>

            <div className="mt-2 md:mt-3 flex items-center justify-between">
              <span className="text-sm md:text-lg font-light text-[#AD9660]">{item.price}</span>
              <div className="w-4 md:w-6 h-[1px] bg-[#AD9660]/20"></div>
            </div>
            
            {/* MOQ Information if available */}
            {item.moq && (
              <div className="mt-1 md:mt-2 flex items-center text-[10px] md:text-xs text-gray-500">
                <Package className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                <span>MOQ: {item.moq} {item.moq === 1 ? 'piece' : 'pieces'}</span>
          </div>
            )}
          </div>

          {/* Geometric decorative element on hover */}
          <div className="absolute -bottom-full right-0 w-8 md:w-12 h-8 md:h-12 border border-[#AD9660]/20 rotate-45 group-hover:-translate-y-8 md:group-hover:-translate-y-12 transition-transform duration-500"></div>
      </div>
      </Link>
    )
  }

  
  return (
    <div className="min-h-screen bg-white">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button
          size="icon"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 shadow-lg"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
        <Link href="/shortlist">
        <Button
            size="icon"
            className="bg-[#AD9660] hover:bg-[#8A784F] text-white rounded-full w-12 h-12 shadow-lg"
          title="View Shortlist"
        >
            <Heart className="w-5 h-5" />
        </Button>
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-[#AD9660] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-[#AD9660] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            {product?.category && (
              <>
                <Link 
                  href={`/categories/${product.category?.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="hover:text-[#AD9660] transition-colors"
                >
                  {product.category}
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
              </>
            )}
            <span className="text-[#323433] font-medium truncate">{product?.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Images - Smaller and more compact */}
          <div className="lg:col-span-5">
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5 }}
                className="relative bg-gray-50 rounded-lg overflow-hidden"
            >
              <div
                ref={imageRef}
                  className="relative cursor-zoom-in"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                <div
                    className="relative w-full aspect-[4/3]"
                  style={{
                    transform: isZoomed ? `scale(1.5)` : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transition: isZoomed ? "none" : "transform 0.3s ease",
                  }}
                >
                  <Image
                    src={
                      selectedImage === 0 && product?.display_image
                        ? product.display_image
                        : selectedImage > 0 && product?.images?.[selectedImage - 1]
                        ? product.images[selectedImage - 1]
                        : product?.display_image || product?.images?.[0] || "/placeholder.svg"
                    }
                    alt={product?.name}
                    fill
                    className="object-contain"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
              </div>
              
                <div className="absolute top-3 right-3 flex gap-2">
                <button
                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4 text-[#323433]" />
                </button>
                <button
                    className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm ${
                    isInShortlistState
                      ? "bg-[#AD9660] text-white hover:bg-[#8A784F]"
                        : "bg-white/90 text-[#323433] hover:bg-white"
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
                  className="grid grid-cols-4 gap-2"
              >
                {/* Display image as first thumbnail */}
                {product?.display_image && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    key="display-image"
                    onClick={() => setSelectedImage(0)}
                      className={`relative aspect-square overflow-hidden rounded-md border-2 ${
                      selectedImage === 0
                        ? "border-[#AD9660]"
                          : "border-gray-200 hover:border-gray-300"
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
                  {product?.images?.slice(0, 3).map((image: string, index: number) => (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
                    key={`additional-${index}`}
                    onClick={() => setSelectedImage(index + 1)}
                      className={`relative aspect-square overflow-hidden rounded-md border-2 ${
                      selectedImage === index + 1
                        ? "border-[#AD9660]"
                          : "border-gray-200 hover:border-gray-300"
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
          </div>

          {/* Product Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header Section */}
            <div>
              {product?.category && (
                <Badge variant="secondary" className="mb-3 bg-gray-100 text-gray-700 hover:bg-gray-100">
                    {product.category}
                  </Badge>
              )}

              <h1 className="text-2xl md:text-3xl font-semibold text-[#323433] mb-3">
                {product?.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
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
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">SKU: {product.id.slice(-8).toUpperCase()}</span>
              </div>

              {/* Price Section */}
              <div className="mb-6">
                {displayPrice()}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
              )}
            </div>
                
            {/* MOQ and Volume Pricing */}
            <div className="space-y-4">
                {product.moq && (
                <div className="flex items-center p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <Package className="w-5 h-5 text-amber-600 mr-3" />
                  <span className="text-sm">
                    <span className="font-medium">Minimum Order:</span> {product.moq} {product.moq === 1 ? 'piece' : 'pieces'}
                  </span>
                  </div>
                )}
                
                {product?.has_price_range && product?.price_min && product?.price_max && (
                <Card className="border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3 text-[#323433]">Volume Pricing</h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 font-medium text-gray-700 pb-2 border-b">
                        <span>Quantity</span>
                        <span>Price per unit</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span>{product.moq || 1}-99 pieces</span>
                        <span>{formatPrice(product.price_max)}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span>100-499 pieces</span>
                        <span>{formatPrice((product.price_min + product.price_max) / 2)}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span>500+ pieces</span>
                        <span>{formatPrice(product.price_min)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Contact us for custom pricing on larger quantities.
                    </p>
                  </CardContent>
                </Card>
                )}
              </div>

              {/* Quantity Selector */}
            <div>
                <Label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </Label>
              <div className="flex items-center w-fit">
                  <Button
                    variant="outline"
                    size="icon"
                  className="h-10 w-10 rounded-l-md border-r-0"
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
                  className="w-20 h-10 rounded-none text-center border-x-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min={product.moq || 1}
                  />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 rounded-r-md border-l-0" 
                  onClick={() => setQuantity(quantity + 1)}
                >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                className="h-11 bg-[#323433] hover:bg-black text-white flex-1"
                  onClick={handleAddToShortlist}
                  disabled={isAddingToShortlist}
                >
                    {isAddingToShortlist ? (
                      "Processing..."
                    ) : (
                      <>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                        {isInShortlistState ? "Added to Shortlist" : "Add to Shortlist"}
                      </>
                    )}
                </Button>
                <Button
                className="h-11 bg-[#AD9660] hover:bg-[#8A784F] text-white flex-1"
                  onClick={handleRequestQuote}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Request Quote
                </Button>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Truck className="w-5 h-5 text-[#AD9660]" />
                <div>
                <p className="text-sm font-medium text-gray-800">Free Shipping</p>
                <p className="text-xs text-gray-600">
                  Standard delivery in {product.delivery || "7-15 business days"}
                  </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Features */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-5 h-5 text-[#AD9660] mr-2" />
                <h3 className="text-lg font-semibold text-[#323433]">Features</h3>
              </div>
              <ul className="space-y-3">
                {product.features && product.features.length > 0 ? (
                  product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                            </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                      <span>Premium quality materials</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                      <span>Professional packaging</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                      <span>Customization available</span>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-[#AD9660] mr-2" />
                <h3 className="text-lg font-semibold text-[#323433]">Specifications</h3>
              </div>
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}:</span>
                      <span className="text-gray-800 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span className="text-gray-800 font-medium">Premium Quality</span>
                      </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="text-gray-800 font-medium">Varies</span>
                      </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Packaging:</span>
                    <span className="text-gray-800 font-medium">Premium Box</span>
                      </div>
                    </div>
                  )}
            </CardContent>
          </Card>

          {/* Customization */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Palette className="w-5 h-5 text-[#AD9660] mr-2" />
                <h3 className="text-lg font-semibold text-[#323433]">Customization</h3>
                      </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Logo branding available</span>
                      </div>
                <div className="flex items-start gap-2">
                  <Palette className="w-4 h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Custom color options</span>
                    </div>
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Personalized messaging</span>
                      </div>
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Premium packaging</span>
                      </div>
                    </div>
              <Button variant="outline" className="w-full mt-4 border-[#AD9660] text-[#AD9660] hover:bg-[#AD9660] hover:text-white">
                Request Custom Quote
                    </Button>
            </CardContent>
          </Card>
                  </div>
        
        {/* Related Products Section */}
        <div className="mt-16">
            <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#323433]">You Might Also Like</h2>
            <Link href="/products" className="text-[#AD9660] font-medium flex items-center hover:underline">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            {loadingRelated ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="space-y-4 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg"></div>
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
        
        {/* Corporate Gifting CTA */}
        <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#323433] mb-4">
            Need Help with Corporate Gifting?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our corporate gifting experts are here to help you find the perfect solution for recognizing employees, 
            appreciating clients, or celebrating company milestones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#323433] hover:bg-black text-white h-11">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with an Expert
            </Button>
            <Button className="bg-[#AD9660] hover:bg-[#8A784F] text-white h-11">
              <Mail className="w-4 h-4 mr-2" />
              Request Bulk Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
