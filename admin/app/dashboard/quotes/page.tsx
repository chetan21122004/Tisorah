"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Search, SlidersHorizontal } from "lucide-react"
import { getQuoteRequests, updateQuoteRequestStatus } from "@/lib/supabase"
import Link from "next/link"

interface QuoteRequest {
  id: string
  name: string
  company: string
  email: string
  phone: string | null
  message: string | null
  budget: string | null
  timeline: string | null
  event_type: string | null
  shortlisted_products: any
  status: string | null
  created_at: string | null
  updated_at: string | null
}

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadQuotes() {
      try {
        const data = await getQuoteRequests()
        setQuotes(data as QuoteRequest[])
      } catch (error) {
        console.error("Error loading quote requests:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadQuotes()
  }, [])
  
  const filteredQuotes = quotes.filter(quote => 
    quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (quote.id || "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Function to get badge color based on status
  const getBadgeClass = (status: string | null) => {
    switch(status?.toLowerCase()) {
      case 'approved':
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case 'rejected':
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case 'in-progress':
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case 'completed':
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      default:
        return "bg-amber-100 text-amber-800 hover:bg-amber-100" // pending or any other status
    }
  }

  // Function to format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-8 relative">
      <div className="pattern-dots pattern-opacity-10 pattern-secondary absolute inset-0 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-primary">Quote Requests</h1>
          <p className="text-muted-foreground mt-1">Manage customer quote requests and inquiries.</p>
        </div>
        <div className="mt-4 flex space-x-2 md:mt-0">
          <Button variant="outline" size="sm" className="bg-white border-neutral-200">
            <Calendar className="mr-2 h-4 w-4" />
            Filter by date
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-neutral-200">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search quotes..."
            className="pl-8 bg-white border-neutral-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-white border-neutral-200">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter by status
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="border-neutral-200 bg-white">
              <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
                <div className="space-y-1">
                  <div className="h-5 w-40 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse" />
                </div>
                <div className="h-6 w-20 bg-neutral-200 rounded-full animate-pulse" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-4 bg-neutral-200 rounded animate-pulse" />
                    ))}
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <div className="h-8 w-24 bg-neutral-200 rounded animate-pulse" />
                    <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredQuotes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No quote requests found. Try adjusting your search.</p>
            </div>
          ) : (
            filteredQuotes.map((quote) => (
              <Link href={`/dashboard/quotes/${quote.id}`} key={quote.id}>
                <Card className="border-neutral-200 bg-white hover:border-secondary/50 transition-colors">
                  <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
                    <div>
                      <CardTitle className="text-base font-medium">{quote.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">{quote.company}</div>
                    </div>
                    <Badge 
                      className={getBadgeClass(quote.status)}
                    >
                      {quote.status?.charAt(0).toUpperCase() + quote.status?.slice(1) || "Pending"}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Email</div>
                        <div className="font-medium truncate">{quote.email}</div>
                        
                        <div className="text-muted-foreground">Products</div>
                        <div className="font-medium">
                          {quote.shortlisted_products && Array.isArray(quote.shortlisted_products) 
                            ? quote.shortlisted_products.length 
                            : 'N/A'}
                        </div>
                        
                        {quote.budget && (
                          <>
                            <div className="text-muted-foreground">Budget</div>
                            <div className="font-medium">{quote.budget}</div>
                          </>
                        )}
                        
                        <div className="text-muted-foreground">Date</div>
                        <div className="font-medium">{formatDate(quote.created_at)}</div>
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" size="sm" className="bg-white border-neutral-200">
                          View Details
                        </Button>
                        <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white">
                          Respond
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
