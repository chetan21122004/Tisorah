"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Mail,
  MessageCircle,
  ArrowLeft,
  Clock,
  Users,
  Award,
  Calculator,
  ShoppingBag,
  Gift,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getShortlist, submitQuoteRequest, type ShortlistItem, type QuoteRequest } from "@/lib/shortlist"
import { useToast } from "@/hooks/use-toast"

export default function QuotePage() {
  const [shortlistedProducts, setShortlistedProducts] = useState<ShortlistItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    budget: "",
    timeline: "",
    eventType: "",
    customization: false,
    branding: false,
    packaging: false,
  })
  const { toast } = useToast()

  // Load shortlist on component mount
  useEffect(() => {
    setShortlistedProducts(getShortlist())
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
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

    setIsSubmitting(true)

    const quoteData: QuoteRequest = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
      budget: formData.budget,
      timeline: formData.timeline,
      event_type: formData.eventType,
      customization: formData.customization,
      branding: formData.branding,
      packaging: formData.packaging,
      items: shortlistedProducts,
    }

    try {
      const result = await submitQuoteRequest(quoteData)

      if (result.success) {
        toast({
          title: "Consultation Request Submitted!",
          description: result.message,
        })

        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          budget: "",
          timeline: "",
          eventType: "",
          customization: false,
          branding: false,
          packaging: false,
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
      <div className="bg-[#1E2A47] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-16 h-16 bg-[#AD9660]/10 rounded-sm flex items-center justify-center border border-[#AD9660]/20">
                <Mail className="w-8 h-8 text-[#AD9660]" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-white font-['Frank_Ruhl_Libre'] mb-3">Corporate Consultation</h1>
            <p className="text-[#E6E2DD] font-light text-lg font-['Poppins'] max-w-2xl mx-auto">Discover tailored corporate gifting solutions for your business</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-16">
          <Link href="/" className="hover:text-teal-600 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">Request Quote</span>
        </nav>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <Card className="shadow-none border border-[#AD9660]/20 text-center hover:border-[#AD9660] hover:bg-[#F4F4F4] transition-all">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-[#1E2A47]/5 rounded-sm flex items-center justify-center mx-auto mb-4 border border-[#1E2A47]/10">
                <Clock className="w-7 h-7 text-[#1E2A47]" />
              </div>
              <h3 className="text-lg font-light text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">24-Hour Response</h3>
              <p className="text-gray-600 font-['Poppins'] text-sm">Swift professional consultation</p>
            </CardContent>
          </Card>

          <Card className="shadow-none border border-[#AD9660]/20 text-center hover:border-[#AD9660] hover:bg-[#F4F4F4] transition-all">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-[#1E2A47]/5 rounded-sm flex items-center justify-center mx-auto mb-4 border border-[#1E2A47]/10">
                <Users className="w-7 h-7 text-[#1E2A47]" />
              </div>
              <h3 className="text-lg font-light text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">Expert Guidance</h3>
              <p className="text-gray-600 font-['Poppins'] text-sm">Strategic recommendations</p>
            </CardContent>
          </Card>

          <Card className="shadow-none border border-[#AD9660]/20 text-center hover:border-[#AD9660] hover:bg-[#F4F4F4] transition-all">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-[#1E2A47]/5 rounded-sm flex items-center justify-center mx-auto mb-4 border border-[#1E2A47]/10">
                <Award className="w-7 h-7 text-[#1E2A47]" />
              </div>
              <h3 className="text-lg font-light text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">Premium Solutions</h3>
              <p className="text-gray-600 font-['Poppins'] text-sm">Corporate pricing benefits</p>
            </CardContent>
          </Card>

          <Card className="shadow-none border border-[#AD9660]/20 text-center hover:border-[#AD9660] hover:bg-[#F4F4F4] transition-all">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-[#1E2A47]/5 rounded-sm flex items-center justify-center mx-auto mb-4 border border-[#1E2A47]/10">
                <Gift className="w-7 h-7 text-[#1E2A47]" />
              </div>
              <h3 className="text-lg font-light text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">Customization</h3>
              <p className="text-gray-600 font-['Poppins'] text-sm">Tailored to your brand</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-none border border-[#AD9660]/20">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl flex items-center gap-3 font-['Frank_Ruhl_Libre'] font-light">
                  <Mail className="w-8 h-8 text-[#AD9660]" />
                  Consultation Request Form
                </CardTitle>
                <p className="text-gray-600 text-lg font-['Poppins'] font-light">
                  Fill out the form below and we'll get back to you with a personalized quote
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuote} className="space-y-8">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-2xl font-light text-[#323433] mb-6 flex items-center gap-3 font-['Frank_Ruhl_Libre']">
                      <Phone className="w-6 h-6 text-[#AD9660]" />
                      Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          className="h-12 border-[#AD9660]/20 focus:border-[#AD9660] focus:ring-[#AD9660]/20 font-['Poppins']"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                        <Input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Enter your company name"
                          className="h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-2xl font-light text-[#323433] mb-6 flex items-center gap-3 font-['Frank_Ruhl_Libre']">
                      <MapPin className="w-6 h-6 text-[#AD9660]" />
                      Project Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger className="h-12 border-[#AD9660]/20 focus:border-[#AD9660] focus:ring-[#AD9660]/20 font-['Poppins']">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent className="font-['Poppins']">
                            <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                            <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                            <SelectItem value="1l-2l">₹1,00,000 - ₹2,00,000</SelectItem>
                            <SelectItem value="2l-5l">₹2,00,000 - ₹5,00,000</SelectItem>
                            <SelectItem value="above-5l">Above ₹5,00,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                        <Select
                          value={formData.timeline}
                          onValueChange={(value) => handleInputChange("timeline", value)}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                            <SelectItem value="normal">Normal (2-4 weeks)</SelectItem>
                            <SelectItem value="flexible">Flexible (1-2 months)</SelectItem>
                            <SelectItem value="planning">Planning (2+ months)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event/Occasion Type</label>
                        <Select
                          value={formData.eventType}
                          onValueChange={(value) => handleInputChange("eventType", value)}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="onboarding">Employee Onboarding Kits</SelectItem>
                            <SelectItem value="corporate-milestone">Corporate Milestones</SelectItem>
                            <SelectItem value="recognition">Employee Recognition</SelectItem>
                            <SelectItem value="executive-gifts">Executive Gifts</SelectItem>
                            <SelectItem value="corporate-event">Corporate Events</SelectItem>
                            <SelectItem value="client-appreciation">Client Appreciation</SelectItem>
                            <SelectItem value="seasonal">Seasonal Corporate</SelectItem>
                            <SelectItem value="other">Other Business Events</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div>
                    <h3 className="text-2xl font-light text-[#323433] mb-6 flex items-center gap-3 font-['Frank_Ruhl_Libre']">
                      <Calendar className="w-6 h-6 text-[#AD9660]" />
                      Additional Services
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="customization"
                          checked={formData.customization}
                          onCheckedChange={(checked) => handleInputChange("customization", checked as boolean)}
                          className="border-[#AD9660]/20 text-[#AD9660] focus:ring-[#AD9660]/20"
                        />
                        <label htmlFor="customization" className="text-lg text-gray-700">
                          Custom Logo/Branding Required
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="branding"
                          checked={formData.branding}
                          onCheckedChange={(checked) => handleInputChange("branding", checked as boolean)}
                        />
                        <label htmlFor="branding" className="text-lg text-gray-700">
                          Premium Branding & Design Services
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="packaging"
                          checked={formData.packaging}
                          onCheckedChange={(checked) => handleInputChange("packaging", checked as boolean)}
                        />
                        <label htmlFor="packaging" className="text-lg text-gray-700">
                          Custom Packaging & Gift Wrapping
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requirements & Message
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your specific requirements, customization needs, delivery preferences, or any other details that would help us provide you with the best quote..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <Button
                      type="submit"
                      className="flex-1 bg-[#1E2A47] hover:bg-[#323433] h-12 text-base font-['Poppins'] font-light transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <>
                          <Mail className="w-5 h-5 mr-2" />
                          Submit Request
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-[#AD9660] text-[#AD9660] hover:bg-[#AD9660]/5 h-12 text-base font-['Poppins'] font-light transition-all"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Inquiry
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Quote Summary */}
          <div>
            <div className="space-y-8">
              {/* Summary Card */}
              <Card className="shadow-none border border-[#AD9660]/20 sticky top-8">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl flex items-center gap-3 font-['Frank_Ruhl_Libre'] font-light">
                    <Calculator className="w-7 h-7 text-[#AD9660]" />
                    Quote Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {shortlistedProducts.length > 0 ? (
                    <div className="space-y-6">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-[#1E2A47]/5 rounded-none border border-[#1E2A47]/10">
                          <div className="text-2xl font-light text-[#1E2A47] font-['Frank_Ruhl_Libre']">{totalItems}</div>
                          <div className="text-[#323433] text-sm font-['Poppins']">Items</div>
                        </div>
                        <div className="text-center p-4 bg-[#AD9660]/5 rounded-none border border-[#AD9660]/10">
                          <div className="text-2xl font-light text-[#AD9660] font-['Frank_Ruhl_Libre']">₹{totalValue.toLocaleString()}</div>
                          <div className="text-[#323433] text-sm font-['Poppins']">Total Value</div>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Selected Items:</h4>
                        {shortlistedProducts.slice(0, 3).map((product) => (
                          <div key={product.id} className="flex items-center gap-3 p-3 bg-[#F4F4F4] rounded-none border border-[#E6E2DD]">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm truncate">{product.name}</div>
                              <div className="text-gray-600 text-xs">Qty: {product.quantity}</div>
                            </div>
                            <div className="text-teal-600 font-semibold text-sm">{product.price}</div>
                          </div>
                        ))}
                        {shortlistedProducts.length > 3 && (
                          <div className="text-center text-gray-500 text-sm">
                            +{shortlistedProducts.length - 3} more items
                          </div>
                        )}
                      </div>

                      {/* Totals */}
                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-medium">₹{totalValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Savings:</span>
                          <span className="font-medium">₹{totalSavings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-3 border-t">
                          <span>Estimated Total:</span>
                          <span className="text-teal-600">₹{totalValue.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <Link href="/shortlist">
                          <Button variant="outline" className="w-full">
                            View Full Shortlist
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No items in shortlist</p>
                      <Link href="/categories">
                        <Button className="bg-teal-600 hover:bg-teal-700">Browse Products</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="shadow-none border border-[#AD9660]/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
                  <p className="text-gray-600 mb-6">Our experts are here to assist you</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3 text-gray-700">
                      <Phone className="w-5 h-5" />
                      <span>+91 98600 02313</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-gray-700">
                      <Mail className="w-5 h-5" />
                      <span>quotes@tisorah.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-[#323433] mb-3 font-['Frank_Ruhl_Libre']">Consultation Process</h2>
            <p className="text-base text-gray-600 font-['Poppins'] font-light">Simple steps to corporate gifting excellence</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#1E2A47]/5 rounded-sm flex items-center justify-center mx-auto mb-4 border border-[#1E2A47]/10">
                <span className="text-lg font-light text-[#1E2A47] font-['Frank_Ruhl_Libre']">1</span>
              </div>
              <h3 className="text-lg font-light text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">Submit Request</h3>
              <p className="text-gray-600 font-['Poppins'] text-sm">Share your requirements</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#1E2A47]/5 rounded-sm flex items-center justify-center mx-auto mb-4 border border-[#1E2A47]/10">
                <span className="text-lg font-light text-[#1E2A47] font-['Frank_Ruhl_Libre']">2</span>
              </div>
              <h3 className="text-lg font-light text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">Expert Review</h3>
              <p className="text-gray-600 font-['Poppins'] text-sm">Professional assessment</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#1E2A47]/5 rounded-sm flex items-center justify-center mx-auto mb-4 border border-[#1E2A47]/10">
                <span className="text-lg font-light text-[#1E2A47] font-['Frank_Ruhl_Libre']">3</span>
              </div>
              <h3 className="text-lg font-light text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">Receive Quote</h3>
              <p className="text-gray-600 font-['Poppins'] text-sm">Detailed pricing</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#1E2A47]/5 rounded-sm flex items-center justify-center mx-auto mb-4 border border-[#1E2A47]/10">
                <span className="text-lg font-light text-[#1E2A47] font-['Frank_Ruhl_Libre']">4</span>
              </div>
              <h3 className="text-lg font-light text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">Finalize</h3>
              <p className="text-gray-600 font-['Poppins'] text-sm">Seamless execution</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
