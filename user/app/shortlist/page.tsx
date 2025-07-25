"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Heart, Mail, Trash2, Plus, Minus, Gift, ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useShortlist } from "@/lib/ShortlistContext"

interface PriceRange {
  min: number;
  max: number;
  isRange: boolean;
}

export default function ShortlistPage() {
  const { shortlist, removeFromShortlist, clearShortlist, updateQuantity } = useShortlist()
  const { toast } = useToast()
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalAmountRange, setTotalAmountRange] = useState<PriceRange>({ min: 0, max: 0, isRange: false })

  // Helper function to parse price from string (handles both single prices and ranges)
  const parsePrice = (priceString: string): PriceRange => {
    // Remove currency symbols and spaces
    const cleanPrice = priceString.replace(/[₹,\s]/g, "")
    
    // Check if it's a price range (contains "-")
    if (cleanPrice.includes("-")) {
      const [minStr, maxStr] = cleanPrice.split("-").map(p => p.trim())
      const min = parseFloat(minStr)
      const max = parseFloat(maxStr)
      return {
        min: isNaN(min) ? 0 : min,
        max: isNaN(max) ? 0 : max,
        isRange: true
      }
    }
    
    // Single price
    const price = parseFloat(cleanPrice)
    const value = isNaN(price) ? 0 : price
    return {
      min: value,
      max: value,
      isRange: false
    }
  }

  useEffect(() => {
    const newTotalQuantity = shortlist.reduce((sum, item) => sum + item.quantity, 0)
    
    // Calculate total amount range
    const newTotalAmountRange = shortlist.reduce((total, item) => {
      const priceRange = parsePrice(item.price)
      return {
        min: total.min + (priceRange.min * item.quantity),
        max: total.max + (priceRange.max * item.quantity),
        isRange: total.isRange || priceRange.isRange
      }
    }, { min: 0, max: 0, isRange: false })

    setTotalQuantity(newTotalQuantity)
    setTotalAmountRange(newTotalAmountRange)
  }, [shortlist])

  const handleRemoveItem = (id: string) => {
    removeFromShortlist(id)
    toast({
      title: "Item removed",
      description: "Item has been removed from your shortlist",
    })
  }

  const handleIncrement = (id: string, currentQuantity: number) => {
    if (currentQuantity < 999) { // Increased limit for bulk orders
      updateQuantity(id, currentQuantity + 1)
    }
  }

  const handleDecrement = (id: string, currentQuantity: number, moq: number) => {
    if (currentQuantity > moq) {
      updateQuantity(id, currentQuantity - 1)
    }
  }

  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatPriceRange = (range: PriceRange): string => {
    if (!range.isRange || range.min === range.max) {
      return formatPrice(range.min)
    }
    return `${formatPrice(range.min)} - ${formatPrice(range.max)}`
  }

  if (shortlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F4F4]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-xl mx-auto">
            <div className="w-24 h-24 bg-[#E6E2DD] rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-[#1E2A47]" />
            </div>
            <h2 className="text-4xl font-medium text-[#323433] mb-4 font-['Frank_Ruhl_Libre']">Your Shortlist is Empty</h2>
            <p className="text-[#1E2A47] mb-8 font-['Poppins'] text-lg">Start adding items to your shortlist.</p>
            <Link href="/products">
              <Button className="bg-[#1E2A47] hover:bg-[#323433] text-white font-['Poppins'] transition-all duration-300 h-12 px-8">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-medium text-[#323433] font-['Frank_Ruhl_Libre']">Your Shortlist</h1>
            <Badge variant="secondary" className="bg-[#E6E2DD] text-[#AD9660]">
              {shortlist.length} {shortlist.length === 1 ? 'item' : 'items'}
            </Badge>
          </div>
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={clearShortlist}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Product Grid */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {shortlist.map((item) => {
                const priceRange = parsePrice(item.price)
                const subtotalRange = {
                  min: priceRange.min * item.quantity,
                  max: priceRange.max * item.quantity,
                  isRange: priceRange.isRange
                }
                return (
                  <Card key={item.id} className="overflow-hidden border-[#E6E2DD] hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-square">
                          <Image
                            src={item.image || "/placeholder.jpg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 text-red-600 hover:bg-red-50 bg-white/80 backdrop-blur-sm h-8 w-8 p-0"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-[#323433] font-['Frank_Ruhl_Libre'] truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-[#1E2A47]/60 font-['Poppins'] mb-2">
                            {item.category}
                          </p>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-[#AD9660]">
                              {item.price}
                            </span>
                            <div className="flex items-center bg-[#F8F8F8] rounded-lg border border-[#E6E2DD]">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 rounded-l-lg hover:bg-[#E6E2DD]"
                                onClick={() => handleDecrement(item.id, item.quantity, item.moq)}
                                disabled={item.quantity <= item.moq}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <p className="w-10 text-center text-sm font-medium select-none m-0">
                                {item.quantity}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 rounded-r-lg hover:bg-[#E6E2DD]"
                                onClick={() => handleIncrement(item.id, item.quantity)}
                                disabled={item.quantity >= 999}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          {item.moq > 1 && (
                            <div className="text-xs text-orange-600 mb-1">
                              MOQ: {item.moq} pieces
                            </div>
                          )}
                          <div className="text-xs text-[#1E2A47]/60 font-semibold">
                            Subtotal: <span className="text-[#323433]">{formatPriceRange(subtotalRange)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Summary Card */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="border-[#E6E2DD] sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium text-[#323433] font-['Frank_Ruhl_Libre']">Summary</h3>
                  <Badge variant="secondary" className="bg-[#E6E2DD] text-[#AD9660]">
                    {totalQuantity} {totalQuantity === 1 ? 'unit' : 'units'}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-['Poppins']">
                    <span className="text-[#1E2A47]/60">Unique Items</span>
                    <span className="font-medium text-[#323433]">{shortlist.length}</span>
                  </div>
                  <div className="flex justify-between text-sm font-['Poppins']">
                    <span className="text-[#1E2A47]/60">Total Quantity</span>
                    <span className="font-medium text-[#323433]">{totalQuantity}</span>
                  </div>
                  <div className="flex justify-between text-sm font-['Poppins']">
                    <span className="text-[#1E2A47]/60">Average per Item</span>
                    <span className="font-medium text-[#323433]">
                      {shortlist.length > 0 ? (totalQuantity / shortlist.length).toFixed(1) : '0'}
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between text-lg font-semibold font-['Frank_Ruhl_Libre']">
                    <span>Estimated Total</span>
                    <span className="text-[#AD9660] text-xl">{formatPriceRange(totalAmountRange)}</span>
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-2">
                    *Final pricing may vary based on customization and quantity
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Link href="/quote" className="w-full">
                    <Button className="w-full bg-[#1E2A47] hover:bg-[#323433] h-11">
                      <Mail className="w-4 h-4 mr-2" />
                      Request Quote ({totalQuantity} {totalQuantity === 1 ? 'unit' : 'units'})
                    </Button>
                  </Link>
                  <Link href="/products" className="w-full">
                    <Button variant="outline" className="w-full my-4 border-[#1E2A47] text-[#1E2A47] hover:bg-[#E6E2DD] h-11">
                      <Gift className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
