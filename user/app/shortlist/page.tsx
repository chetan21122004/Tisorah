"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Heart, Mail, Trash2, Plus, Minus, ArrowLeft, Gift, ShoppingBag, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  getShortlist,
  removeFromShortlist,
  updateShortlistItemQuantity,
  clearShortlist,
  type ShortlistItem
} from "@/lib/shortlist-client"

export default function ShortlistPage() {
  const [items, setItems] = useState<ShortlistItem[]>([])
  const [suggestedProducts, setSuggestedProducts] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Initial load
    setItems(getShortlist())

    // Listen for shortlist updates
    const handleShortlistUpdate = () => {
      setItems(getShortlist())
    }

    // Fetch suggested products
    const fetchSuggestedProducts = async () => {
      try {
        const response = await fetch('/api/products/suggested?limit=4')
        const data = await response.json()
        setSuggestedProducts(data)
      } catch (error) {
        console.error('Error fetching suggested products:', error)
      }
    }

    fetchSuggestedProducts()
    window.addEventListener("shortlistUpdated", handleShortlistUpdate)
    return () => window.removeEventListener("shortlistUpdated", handleShortlistUpdate)
  }, [])

  const handleRemoveItem = (id: string) => {
    removeFromShortlist(id)
    toast({
      title: "Item Removed",
      description: "The item has been removed from your shortlist.",
    })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateShortlistItemQuantity(id, quantity)
  }

  const handleClearShortlist = () => {
    clearShortlist()
    toast({
      title: "Shortlist Cleared",
      description: "All items have been removed from your shortlist.",
    })
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ""))
      return total + price * item.quantity
    }, 0)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F4F4]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-xl mx-auto">
            <div className="w-24 h-24 bg-[#E6E2DD] rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-[#1E2A47]" />
            </div>
            <h2 className="text-4xl font-medium text-[#323433] mb-4 font-['Frank_Ruhl_Libre']">Your Shortlist is Empty</h2>
            <p className="text-[#1E2A47] mb-8 font-['Poppins'] text-lg">Start adding items to your shortlist to request a quote.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories">
                <Button className="bg-[#1E2A47] hover:bg-[#323433] text-white font-['Poppins'] transition-all duration-300 h-12 px-8">
                  <Package className="w-5 h-5 mr-2" />
                  Browse Collections
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="border-[#1E2A47] text-[#1E2A47] hover:bg-[#E6E2DD] font-['Poppins'] transition-all duration-300 h-12 px-8">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Hero Section */}
      <div className="bg-[#1E2A47] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-4 mb-6 bg-[#E6E2DD]/10 px-8 py-4 rounded-2xl">
              <div className="w-16 h-16 bg-[#E6E2DD]/20 rounded-xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-[#E6E2DD]" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl lg:text-5xl font-medium text-[#F4F4F4] font-['Frank_Ruhl_Libre']">Your Shortlist</h1>
                <p className="text-[#E6E2DD] font-['Poppins'] text-lg">{items.length} Items Selected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-[#323433] mb-12 font-['Poppins']">
          <Link href="/" className="hover:text-[#AD9660] flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1E2A47]">Shortlist</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shortlist Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden border-[#E6E2DD] bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-48 h-48">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-xl"
                      />
                      {item.discount && (
                        <Badge className="absolute top-3 left-3 bg-[#AD9660] text-white px-3 py-1 text-sm font-medium">
                          {item.discount}
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/products/${item.id}`}>
                            <h3 className="text-2xl font-medium text-[#323433] hover:text-[#AD9660] transition-colors font-['Frank_Ruhl_Libre']">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-[#1E2A47] font-['Poppins'] mt-1">{item.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-[#323433] hover:text-[#AD9660] hover:bg-[#E6E2DD] transition-all rounded-xl"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < item.rating ? "text-[#AD9660] fill-current" : "text-[#C8C2B6]"
                              }`}
                            />
                          ))}
                          <span className="text-[#1E2A47] ml-2 font-['Poppins'] text-sm">{item.reviews} reviews</span>
                        </div>
                      </div>
                      <Separator className="my-4 bg-[#E6E2DD]" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, Math.max(item.moq, item.quantity - 5))}
                            className="w-10 h-10 p-0 border-[#E6E2DD] text-[#323433] hover:border-[#AD9660] hover:text-[#AD9660] rounded-xl"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(item.id, Math.max(item.moq, parseInt(e.target.value) || item.moq))
                            }
                            className="w-20 text-center border-[#E6E2DD] font-['Poppins'] rounded-xl"
                            min={item.moq}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 5)}
                            className="w-10 h-10 p-0 border-[#E6E2DD] text-[#323433] hover:border-[#AD9660] hover:text-[#AD9660] rounded-xl"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-[#1E2A47] font-['Poppins']">MOQ: {item.moq}</span>
                        </div>
                        <div className="text-right font-['Frank_Ruhl_Libre']">
                          <div className="text-2xl font-medium text-[#AD9660]">{item.price}</div>
                          {item.originalPrice && (
                            <div className="text-[#C8C2B6] line-through text-sm">{item.originalPrice}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Suggested Products */}
            <div className="mt-12">
              <h3 className="text-2xl font-medium text-[#323433] mb-6 font-['Frank_Ruhl_Libre']">You May Also Like</h3>
              <div className="grid grid-cols-2 gap-6">
                {suggestedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden border-[#E6E2DD] bg-white hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="relative w-full h-48 mb-4">
                        <Image
                          src={product.image || "/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                        {product.discount && (
                          <Badge className="absolute top-2 right-2 bg-[#AD9660] text-white">
                            {product.discount}
                          </Badge>
                        )}
                      </div>
                      <Link href={`/products/${product.id}`}>
                        <h4 className="text-lg font-medium text-[#323433] hover:text-[#AD9660] transition-colors font-['Frank_Ruhl_Libre'] mb-1">
                          {product.name}
                        </h4>
                      </Link>
                      <p className="text-[#1E2A47] font-['Poppins'] text-sm mb-2">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-[#AD9660] font-['Frank_Ruhl_Libre'] font-medium">{product.price}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:text-[#AD9660] hover:bg-[#E6E2DD] rounded-xl"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div>
            <Card className="sticky top-8 border-[#E6E2DD] bg-white overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-medium text-[#323433] mb-6 font-['Frank_Ruhl_Libre']">Order Summary</h3>
                <div className="space-y-4 mb-8 font-['Poppins']">
                  <div className="flex justify-between text-lg">
                    <span className="text-[#1E2A47]">Total Items</span>
                    <span className="font-medium text-[#323433]">{items.length}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-[#1E2A47]">Total Quantity</span>
                    <span className="font-medium text-[#323433]">
                      {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <Separator className="my-4 bg-[#E6E2DD]" />
                  <div className="flex justify-between text-xl">
                    <span className="font-medium text-[#323433]">Total Amount</span>
                    <span className="font-medium text-[#AD9660]">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-[#F4F4F4] rounded-xl p-4 mb-8">
                  <h4 className="font-medium text-[#323433] mb-3 font-['Frank_Ruhl_Libre']">Benefits</h4>
                  <ul className="space-y-2 text-sm font-['Poppins']">
                    <li className="flex items-center gap-2 text-[#1E2A47]">
                      <Gift className="w-4 h-4 text-[#AD9660]" />
                      Custom branding options available
                    </li>
                    <li className="flex items-center gap-2 text-[#1E2A47]">
                      <Package className="w-4 h-4 text-[#AD9660]" />
                      Bulk order discounts
                    </li>
                    <li className="flex items-center gap-2 text-[#1E2A47]">
                      <ShoppingBag className="w-4 h-4 text-[#AD9660]" />
                      Premium packaging included
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <Link href="/quote" className="block">
                    <Button className="w-full bg-[#1E2A47] hover:bg-[#323433] h-12 text-lg font-['Poppins'] transition-all duration-300 rounded-xl">
                      <Mail className="w-5 h-5 mr-2" />
                      Request Quote
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-[#323433] text-[#323433] hover:bg-[#E6E2DD] h-12 text-lg font-['Poppins'] transition-all duration-300 rounded-xl"
                    onClick={handleClearShortlist}
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Clear Shortlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
