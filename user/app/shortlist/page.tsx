"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Mail, Trash2, Plus, Minus, ArrowLeft } from "lucide-react"
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
  const { toast } = useToast()

  useEffect(() => {
    // Initial load
    setItems(getShortlist())

    // Listen for shortlist updates
    const handleShortlistUpdate = () => {
      setItems(getShortlist())
    }

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
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Shortlist is Empty</h2>
            <p className="text-gray-600 mb-8">Start adding items to your shortlist to request a quote.</p>
            <Link href="/categories">
              <Button className="bg-teal-600 hover:bg-teal-700">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white">Your Shortlist</h1>
                <p className="text-teal-100 font-medium text-xl">{items.length} Items Selected</p>
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

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Shortlist Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-8">
                    <div className="relative w-40 h-40">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                      {item.discount && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          {item.discount}
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/products/${item.id}`}>
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-teal-600">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-gray-600">{item.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-gray-600 ml-2">{item.reviews} reviews</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, Math.max(item.moq, item.quantity - 5))}
                            className="w-10 h-10 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(item.id, Math.max(item.moq, parseInt(e.target.value) || item.moq))
                            }
                            className="w-20 text-center"
                            min={item.moq}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 5)}
                            className="w-10 h-10 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-gray-600">MOQ: {item.moq}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-teal-600">{item.price}</div>
                          <div className="text-gray-500 line-through">{item.originalPrice}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Card */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-semibold text-gray-900">{items.length}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Total Quantity</span>
                    <span className="font-semibold text-gray-900">
                      {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl pt-4 border-t">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="font-bold text-teal-600">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Link href="/quote">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 h-12 text-lg">
                      <Mail className="w-5 h-5 mr-2" />
                      Request Quote
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-600 hover:bg-red-50 h-12 text-lg"
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
