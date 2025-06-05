"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Eye, ArrowLeft, Package, Clock, User, Mail, Phone, Building } from "lucide-react"

export default function AdminPage() {
  const [quoteRequests, setQuoteRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuoteRequests() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('quote_requests')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching quote requests:', error)
          return
        }

        setQuoteRequests(data || [])
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuoteRequests()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <Package className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300 font-medium text-xl">Manage Quote Requests</p>
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
          <span className="text-gray-900">Admin</span>
        </nav>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quote Requests</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading quote requests...</p>
            </div>
          ) : quoteRequests.length === 0 ? (
            <Card className="shadow-md border-0">
              <CardContent className="p-12 text-center">
                <p className="text-gray-600 text-lg">No quote requests found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {quoteRequests.map((quote) => (
                <Card key={quote.id} className="shadow-md border-0 overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{quote.company}</CardTitle>
                      <Badge className={getStatusColor(quote.status || 'pending')}>
                        {quote.status ? quote.status.charAt(0).toUpperCase() + quote.status.slice(1) : 'Pending'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Contact Name</p>
                            <p className="font-medium">{quote.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{quote.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{quote.phone || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Company</p>
                            <p className="font-medium">{quote.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Submitted On</p>
                            <p className="font-medium">
                              {new Date(quote.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Products</p>
                            <p className="font-medium">
                              {quote.shortlisted_products.length} items
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {quote.message && (
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-500 mb-2">Message</p>
                        <p className="text-gray-700">{quote.message}</p>
                      </div>
                    )}
                    
                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 