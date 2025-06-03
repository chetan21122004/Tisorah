"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  Heart,
  Share2,
  Package,
  Truck,
  Shield,
  Award,
  Clock,
  CheckCircle,
  Plus,
  Minus,
  Gift,
  MessageCircle,
  Mail,
  Check,
  ArrowLeft,
  Users,
  Calendar,
  Zap,
  ThumbsUp,
  Eye,
  Info,
  MessageSquare,
  ShoppingBag,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { addToShortlist, isInShortlist, type ShortlistItem } from "@/lib/shortlist"
import { useToast } from "@/hooks/use-toast"
import { getProduct, getProducts } from '@/lib/api'
import { notFound } from 'next/navigation'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price_range: {
    min: number
    max: number
  } | null
  minimum_order_quantity: number
  images?: string[]
  colors?: string[]
  sizes?: string[]
  category?: {
    id: string
    name: string
  }
  related_products?: Array<{
    id: string
    name: string
    slug: string
    price_range: {
      min: number
      max: number
    } | null
    images?: string[]
  }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const productData = await getProduct(params.slug)

  if (!productData) {
    notFound()
  }

  const product = productData as Product

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(product.minimum_order_quantity || 25)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0])
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0])
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [isInShortlistState, setIsInShortlistState] = useState(false)
  const [isAddingToShortlist, setIsAddingToShortlist] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const { toast } = useToast()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imageRef.current || !isZoomed) return

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }

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

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false)
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  // Check if item is in shortlist on component mount
  useEffect(() => {
    setIsInShortlistState(isInShortlist(product.id))
  }, [product.id])

  // Listen for shortlist updates
  useEffect(() => {
    const handleShortlistUpdate = () => {
      setIsInShortlistState(isInShortlist(product.id))
    }

    window.addEventListener("shortlistUpdated", handleShortlistUpdate)
    return () => window.removeEventListener("shortlistUpdated", handleShortlistUpdate)
  }, [product.id])

  const handleAddToShortlist = async () => {
    setIsAddingToShortlist(true)

    const shortlistItem: ShortlistItem = {
      id: product.id,
      name: product.name,
      price_range: product.price_range,
      image: product.images?.[0] ?? "/placeholder.png",
      quantity: quantity,
      minimum_order_quantity: product.minimum_order_quantity,
      category: product.category?.name,
    }

    try {
      addToShortlist(shortlistItem)
      toast({
        title: "Added to Shortlist!",
        description: `${product.name} has been added to your shortlist.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to shortlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingToShortlist(false)
    }
  }

  const handleRequestQuote = () => {
    // Add to shortlist first if not already added
    if (!isInShortlistState) {
      handleAddToShortlist()
    }
    // Redirect to quote page
    window.location.href = "/quote"
  }

  const formatPriceRange = (range: { min: number; max: number } | null) => {
    if (!range) return "Price on request"
    if (range.min === range.max) return `₹${range.min.toLocaleString()}`
    return `₹${range.min.toLocaleString()} - ₹${range.max.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back to Products */}
      <div className="container py-6">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="container pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div
              ref={imageRef}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={product.images?.[selectedImage] ?? "/placeholder.png"}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : undefined
                }
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 ${
                    selectedImage === index ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              <div className="mt-4">
                <Badge variant="secondary" className="text-lg">
                  {formatPriceRange(product.price_range)}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Customization Options */}
            <div className="space-y-4">
              {product.colors && product.colors.length > 0 && (
                <div>
                  <Label>Color</Label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.colors.map((color: string) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <Label>Size</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size: string) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Quantity</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(quantity - 1, product.minimum_order_quantity || 25))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      if (!isNaN(value) && value >= (product.minimum_order_quantity || 25)) {
                        setQuantity(value)
                      }
                    }}
                    className="w-20 text-center"
                  />
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Minimum order quantity: {product.minimum_order_quantity || 25}
                </p>
              </div>

              <div>
                <Label>Special Requirements</Label>
                <Textarea placeholder="Any specific customization requirements or notes..." />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleRequestQuote}
              >
                Request Quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`flex-1 ${isInShortlistState ? "bg-gray-100" : ""}`}
                onClick={handleAddToShortlist}
                disabled={isAddingToShortlist || isInShortlistState}
              >
                {isInShortlistState ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    In Shortlist
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" />
                    Add to Shortlist
                  </>
                )}
              </Button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm font-medium">
                    <Package className="mr-2 h-5 w-5" />
                    Bulk Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Special pricing available for large quantities
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm font-medium">
                    <Truck className="mr-2 h-5 w-5" />
                    Fast Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Quick turnaround on bulk orders
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm font-medium">
                    <Shield className="mr-2 h-5 w-5" />
                    Quality Assured
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Premium materials and craftsmanship
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm font-medium">
                    <Award className="mr-2 h-5 w-5" />
                    Custom Branding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Personalized with your logo and colors
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.related_products?.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.slug}`}>
                <Card className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.images?.[0] || "/placeholder.png"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{relatedProduct.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{formatPriceRange(relatedProduct.price_range)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 