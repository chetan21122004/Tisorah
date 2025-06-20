"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react"
import { getProducts } from "@/lib/supabase"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: string
  price: number
  images: string[] | null
  featured: boolean | null
  customizable: boolean | null
  created_at: string | null
  gift_categories: {
    name: string
  } | null
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data as Product[])
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadProducts()
  }, [])
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.gift_categories?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 relative">
      <div className="pattern-dots pattern-opacity-10 pattern-secondary absolute inset-0 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-primary">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog.</p>
        </div>
        <div className="mt-4 flex space-x-2 md:mt-0">
          <Link href="/dashboard/products/new">
            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 bg-white border-neutral-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-white border-neutral-200">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-neutral-200">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 8].map((item) => (
            <Card key={item} className="overflow-hidden border-neutral-200 bg-white">
              <div className="aspect-square w-full bg-neutral-100 animate-pulse" />
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="h-5 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 bg-neutral-200 rounded w-2/3 animate-pulse" />
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-4 bg-neutral-200 rounded w-1/4 animate-pulse" />
                    <div className="h-8 w-8 bg-neutral-200 rounded-full animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No products found. Try adjusting your search.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Link href={`/dashboard/products/${product.id}`} key={product.id}>
                <Card className="overflow-hidden border-neutral-200 bg-white hover:border-secondary/50 transition-colors">
                  <div className="aspect-square w-full bg-neutral-100 relative">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                    {product.featured && (
                      <div className="absolute top-2 right-2 bg-secondary text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{product.name}</h3>
                      </div>
                      <div className="text-sm text-muted-foreground">{product.gift_categories?.name || product.category}</div>
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">₹{product.price.toLocaleString('en-IN')}</div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Edit product</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
