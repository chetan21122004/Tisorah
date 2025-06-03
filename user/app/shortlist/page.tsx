"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  Heart,
  Trash2,
  ArrowRight,
  Mail,
  MessageCircle,
  ArrowLeft,
  ShoppingBag,
  Calculator,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  getShortlist,
  removeFromShortlist,
  clearShortlist,
  submitQuoteRequest,
  type ShortlistItem,
  type QuoteRequest,
} from "@/lib/shortlist"
import { useToast } from "@/hooks/use-toast"

export default function ShortlistPage() {
  const [shortlistedProducts, setShortlistedProducts] = useState<ShortlistItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const { toast } = useToast()

  // Load shortlist on component mount
  useEffect(() => {
    setShortlistedProducts(getShortlist())
  }, [])

  // Listen for shortlist updates
  useEffect(() => {
    const handleShortlistUpdate = (event: CustomEvent) => {
      setShortlistedProducts(event.detail)
    }

    window.addEventListener("shortlistUpdated", handleShortlistUpdate as EventListener)
    return () => window.removeEventListener("shortlistUpdated", handleShortlistUpdate as EventListener)
  }, [])

  const handleRemoveItem = (itemId: string) => {
    removeFromShortlist(itemId)
    toast({
      title: "Item Removed",
      description: "Item has been removed from your shortlist.",
    })
  }

  const handleClearShortlist = () => {
    clearShortlist()
    toast({
      title: "Shortlist Cleared",
      description: "All items have been removed from your shortlist.",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (shortlistedProducts.length === 0) {
      toast({
        title: "Empty Shortlist",
        description: "Please add items to your shortlist before requesting a quote.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const quoteData: QuoteRequest = {
      ...formData,
      items: shortlistedProducts,
    }

    try {
      const result = await submitQuoteRequest(quoteData)

      if (result.success) {
        toast({
          title: "Quote Request Submitted!",
          description: result.message,
        })

        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate totals
  const totalItems = shortlistedProducts.length
  const totalValue = shortlistedProducts.reduce((sum, product) => {
    const price = Number.parseInt(product.price.replace("₹", "").replace(",", ""))
    return sum + price * product.quantity
  }, 0)
  const totalOriginalValue = shortlistedProducts.reduce((sum, product) => {
    const originalPrice = Number.parseInt(product.originalPrice.replace("₹", "").replace(",", ""))
    return sum + originalPrice * product.quantity
  }, 0)
  const totalSavings = totalOriginalValue - totalValue

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white">Your Curated Selection</h1>
                <p className="text-red-100 font-medium text-xl">Exquisite choices tailored for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-16">
          <Link href="/" className="hover:text-teal-600 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">Shortlist</span>
        </nav>

        {shortlistedProducts.length > 0 ? (
          <>
            {/* Stats Section */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <Card className="shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{totalItems}</div>
                  <div className="text-gray-600">Curated Items</div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-teal-600" />
                  </div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">₹{totalValue.toLocaleString()}</div>
                  <div className="text-gray-600">Investment Value</div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">₹{totalSavings.toLocaleString()}</div>
                  <div className="text-gray-600">Exclusive Savings</div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {(shortlistedProducts.reduce((sum, p) => sum + p.rating, 0) / shortlistedProducts.length).toFixed(
                      1,
                    )}
                  </div>
                  <div className="text-gray-600">Excellence Rating</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Shortlisted Products */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Selected Items</h2>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50"
                    onClick={handleClearShortlist}
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-8">
                  {shortlistedProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden shadow-xl border-0">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-80">
                            <Link href={`/products/${product.id}`}>
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={320}
                                height={240}
                                className="w-full h-60 md:h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </Link>
                            <Badge className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-xl">
                              {product.discount}
                            </Badge>
                          </div>

                          <div className="flex-1 p-8">
                            <div className="flex items-start justify-between mb-6">
                              <div>
                                <Link href={`/products/${product.id}`}>
                                  <h3 className="text-2xl font-bold text-gray-900 hover:text-teal-600 mb-2">
                                    {product.name}
                                  </h3>
                                </Link>
                                {product.category && (
                                  <Badge className="bg-teal-100 text-teal-800 mb-4">{product.category}</Badge>
                                )}
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-5 h-5 ${
                                          i < Math.floor(product.rating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-gray-600">({product.reviews} reviews)</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:bg-red-50 w-12 h-12 rounded-full"
                                onClick={() => handleRemoveItem(product.id)}
                              >
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-teal-600">{product.price}</span>
                                <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-gray-600 text-lg">Quantity: {product.quantity}</div>
                                <div className="text-gray-500">MOQ: {product.moq}</div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-bold text-gray-900">
                                Total: ₹
                                {(
                                  Number.parseInt(product.price.replace("₹", "").replace(",", "")) * product.quantity
                                ).toLocaleString()}
                              </div>
                              <div className="flex gap-3">
                                <Button size="sm" variant="outline" className="border-blue-500 text-blue-600">
                                  <Link href={`/products/${product.id}`} className="flex items-center">
                                    View Details
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quote Request Form */}
              <div>
                <Card className="shadow-xl border-0 sticky top-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Mail className="w-7 h-7 text-blue-600" />
                      Request Consultation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitQuote} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email"
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                        <Input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Enter your company name"
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specific Requirements</label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Tell us about your specific requirements, customization needs, delivery timeline, etc."
                          className="min-h-[120px]"
                        />
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Quote Summary</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Items:</span>
                            <span className="font-medium">{totalItems}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">₹{totalValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-green-600">
                            <span>Savings:</span>
                            <span className="font-medium">₹{totalSavings.toLocaleString()}</span>
                          </div>
                          <div className="border-t pt-3 flex justify-between text-lg font-bold">
                            <span>Total Value:</span>
                            <span className="text-teal-600">₹{totalValue.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Mail className="w-6 h-6 mr-3" />📨 Submit Consultation Request
                          </>
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-green-500 text-green-600 hover:bg-green-50 h-14 text-lg"
                      >
                        <MessageCircle className="w-6 h-6 mr-3" />💬 Chat on WhatsApp
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-24">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Collection Awaits</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Explore our curated selection of premium corporate gifts and add items to your collection to request a
              personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 px-12 py-6 rounded-2xl text-xl">
                <Link href="/categories" className="flex items-center">
                  Explore Collections
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50 px-12 py-6 rounded-2xl text-xl"
              >
                <Link href="/" className="flex items-center">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
      <Link
        href={`https://wa.me/+919860002313`}
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>
    </div>
  )
}
