"use client"

import type React from "react"
import type { Product } from "@/types/database"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useShortlist, type ShortlistItem } from "@/lib/ShortlistContext"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/utils/supabase/client"

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
  const imageRef = useRef<HTMLDivElement>(null)
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
          if (transformedProduct.moq) setQuantity(transformedProduct.moq)
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

  // Helper function to format price values
  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString()}`
  }

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
        price: formatPrice(product.price),
        originalPrice: formatPrice(product.original_price || product.price),
        image: product.images && product.images.length > 0 ? product.images[0] : "",
        rating: product.rating || 4.5,
        reviews: product.reviews || 0,
        discount: product.discount || (product.original_price ? `${Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF` : undefined),
        quantity: quantity,
        moq: typeof product.moq === 'number' ? product.moq : 1,
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
  const getRating = (rating: number | null): number => rating ?? 4.5
  const getStarFill = (index: number, rating: number | null): string =>
    index < Math.floor(getRating(rating)) ? "text-yellow-400 fill-current" : "text-gray-300"
  const getReviews = (reviews: number | null): number => reviews ?? 0
  const getProductName = (product: Product | null): string => product?.name ?? "Product"

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-teal-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Loading Product Details...</h2>
        </div>
      </div>
    )
  }

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Package className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/categories">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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

  const relatedProducts = [
    {
      id: 2,
      name: "Executive Welcome Package",
      price: "₹4,999",
      originalPrice: "₹6,499",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop&crop=center",
      rating: 4.9,
      discount: "23% OFF",
    },
    {
      id: 3,
      name: "Starter Kit Essentials",
      price: "₹1,899",
      originalPrice: "₹2,399",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center",
      rating: 4.6,
      discount: "21% OFF",
    },
    {
      id: 4,
      name: "Remote Worker Kit",
      price: "₹3,299",
      originalPrice: "₹4,199",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=300&fit=crop&crop=center",
      rating: 4.7,
      discount: "21% OFF",
    },
    {
      id: 5,
      name: "Tech Enthusiast Bundle",
      price: "₹5,499",
      originalPrice: "₹7,199",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop&crop=center",
      rating: 4.8,
      discount: "24% OFF",
    },
  ]

  // Reusable card for related/similar products
  function RelatedProductCard({ item }: { item: any }) {
    return (
      <Card className="group">
        <CardContent className="p-3">
          <Link href={`/products/${item.id}`} className="flex flex-col">
            <div className="relative aspect-square mb-2">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform"
              />
              <Badge className="absolute top-2 left-2 text-xs bg-red-500 text-white">
                {item.discount}
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm group-hover:text-teal-600 line-clamp-2">{item.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600">{item.rating}</span>
              </div>
              <div>
                <span className="text-sm font-medium">{item.price}</span>
                <span className="text-xs text-gray-500 line-through ml-2">{item.originalPrice}</span>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
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

      {/* Breadcrumb - Made more compact */}
      <div className="container mx-auto px-4 py-2">
        <nav className="flex items-center space-x-2 text-xs text-gray-600">
          <Link href="/" className="hover:text-teal-600 flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-teal-600">Categories</Link>
          <span>/</span>
          <Link href="/categories/onboarding" className="hover:text-teal-600">{product?.category}</Link>
          <span>/</span>
          <span className="text-gray-900 font-edu-cursive text-lg md:text-xl">{product?.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Product Images - Made more compact */}
          <div className="md:col-span-7 space-y-4">
            <div className="relative">
              <div
                ref={imageRef}
                className="relative overflow-hidden rounded-lg shadow-md cursor-zoom-in bg-white"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                <div
                  className="relative w-full h-[400px]"
                  style={{
                    transform: isZoomed ? `scale(2)` : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: isZoomed ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Image
                    src={product?.images?.[selectedImage] || "/placeholder.jpg"}
                    alt={product?.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`absolute top-4 right-4 w-8 h-8 rounded-full shadow-sm ${
                  isInShortlistState
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-white/90 hover:bg-white text-gray-600"
                }`}
                onClick={handleAddToShortlist}
                disabled={isAddingToShortlist}
              >
                <Heart className={`w-4 h-4 ${isInShortlistState ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Thumbnail Images - Made more compact */}
            {product?.images && product.images.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-md border ${
                      selectedImage === index
                        ? "border-teal-600 ring-1 ring-teal-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Made more compact */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className="bg-teal-50 text-teal-700 px-2 py-1 text-xs">
                  {product?.category}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl  font-bold  text-gray-900 mb-4">{getProductName(product)}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${getStarFill(i, product?.rating)}`}
                    />
                  ))}
                  <span className="text-lg font-medium font-poppins text-gray-700 ml-2">
                    {getRating(product?.rating).toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-4 mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-medium font-poppins text-gray-900">{formatPrice(product?.price)}</span>
                </div>
                <p className="text-sm text-gray-700">Inclusive of all taxes</p>
              </div>

              {/* Quantity Selector - Made more compact */}
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="quantity" className="text-sm font-medium font-poppins">
                    Quantity (MOQ: {product?.moq} pieces)
                  </Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(Number(product?.moq) || 1, quantity - 5))}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(Number(product?.moq) || 1, Number.parseInt(e.target.value) || Number(product?.moq) || 1))
                      }
                      className="w-20 text-center h-8"
                      min={Number(product?.moq) || 1}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 5)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons - Side by side */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1 h-10 bg-teal-600 hover:bg-teal-700"
                    onClick={handleAddToShortlist}
                    disabled={isAddingToShortlist}
                  >
                    {isAddingToShortlist ? (
                      "Adding..."
                    ) : (
                      <>
                        <Heart className={`w-4 h-4 mr-2 ${isInShortlistState ? "fill-current" : ""}`} />
                        {isInShortlistState ? "Remove from Shortlist" : "Add to Shortlist"}
                      </>
                    )}
                  </Button>
                  <Button
                    className="flex-1 h-10 bg-blue-600 hover:bg-blue-700"
                    onClick={handleRequestQuote}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Request Quote
                  </Button>
                </div>
              </div>

              {/* Product Features - Made more compact */}
              <div className="space-y-4">
                <h3 className="text-xl  font-semibold font-poppins">About this item</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <section className="border-t border-gray-200 mt-8">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-12 gap-8">
              {/* Left Column - Details and Specifications */}
              <div className="md:col-span-8">
                {/* About This Item */}
                <div className="mb-8">
                  <h2 className="text-xl  font-semibold font-poppins mb-4">About This Item</h2>
                  <div className="space-y-4">
                    <p className="text-lg text-gray-600 leading-relaxed ">{product.description}</p>
                  </div>
                </div>

                {/* Customer Reviews */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Customer Reviews</h2>
                    <Button variant="outline" size="sm" className="text-sm">
                      Write a review
                    </Button>
                  </div>

                  {/* Reviews Summary */}
                  <div className="flex gap-8 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-medium text-gray-900 mb-1">
                        {product.rating}
                        <span className="text-lg text-gray-500">/5</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${getStarFill(i, product.rating)}`} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rating Distribution */}
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2 text-sm mb-1">
                        <Link href="#" className="hover:text-teal-600 min-w-[60px]">
                          {stars} stars
                        </Link>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                        </div>
                        <span className="text-gray-500 min-w-[40px]">{Math.floor(Math.random() * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-start gap-3 mb-2">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium text-sm">{review.name}</div>
                          <div className="text-xs text-gray-500">{review.company}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <div className="text-sm font-medium">
                          {review.rating}/5
                        </div>
                        {review.verified && (
                          <Badge className="bg-green-50 text-green-700 text-xs px-2">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{review.comment}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{review.date}</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Additional Info */}
              <div className="md:col-span-4">
                {/* Delivery Info */}
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium font-poppins mb-3">Delivery & Returns</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex gap-3">
                        <Truck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <div>
                          <div className="font-medium font-poppins">Free Delivery</div>
                          <div className="text-gray-500">On orders over ₹5,000</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <div>
                          <div className="font-medium font-poppins">Express Delivery Available</div>
                          <div className="text-gray-500">2-3 business days</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Shield className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <div>
                          <div className="font-medium font-poppins">30-Day Returns</div>
                          <div className="text-gray-500">Money-back guarantee</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* You Might Also Like Section */}
        <section className="bg-gray-50">x
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-edu-cursive font-semibold font-poppins">You Might Also Like</h2>
              <Button variant="ghost" size="sm" className="text-sm text-teal-600">
                View all
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedProducts.map((item) => (
                <RelatedProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Need Help Section - Simplified */}
        <section className="border-t border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl font-edu-cursive font-semibold font-poppins mb-4">Need Help?</h2>
              <p className="text-lg text-gray-600 mb-6 ">
                Our corporate gifting experts are here to help you find the perfect solution for your business needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </Button>
                <Button size="sm" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
