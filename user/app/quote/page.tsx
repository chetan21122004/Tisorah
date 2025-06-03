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
      message: `${formData.message}\n\nAdditional Details:\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\nEvent Type: ${formData.eventType}\nCustomization: ${formData.customization ? "Yes" : "No"}\nBranding: ${formData.branding ? "Yes" : "No"}\nPackaging: ${formData.packaging ? "Yes" : "No"}`,
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white">Request Consultation</h1>
                <p className="text-blue-100 font-medium text-xl">Discover Bespoke Corporate Gifting Solutions</p>
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
          <span className="text-gray-900">Request Quote</span>
        </nav>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <Card className="shadow-xl border-0 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prompt Excellence</h3>
              <p className="text-gray-600">Get your quote within 24 hours</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bespoke Consultation</h3>
              <p className="text-gray-600">Personalized recommendations</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusive Pricing</h3>
              <p className="text-gray-600">Competitive bulk discounts</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tailored Excellence</h3>
              <p className="text-gray-600">Tailored to your needs</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Mail className="w-8 h-8 text-blue-600" />
                  Consultation Request Form
                </CardTitle>
                <p className="text-gray-600 text-lg">
                  Fill out the form below and we'll get back to you with a personalized quote
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuote} className="space-y-8">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                      <Phone className="w-6 h-6 text-blue-600" />
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
                          className="h-12"
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
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-green-600" />
                      Project Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
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
                            <SelectItem value="onboarding">Employee Onboarding</SelectItem>
                            <SelectItem value="festival">Festival Celebration</SelectItem>
                            <SelectItem value="recognition">Employee Recognition</SelectItem>
                            <SelectItem value="birthday">Birthday Gifts</SelectItem>
                            <SelectItem value="corporate-event">Corporate Event</SelectItem>
                            <SelectItem value="client-gifting">Client Gifting</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      Additional Services
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="customization"
                          checked={formData.customization}
                          onCheckedChange={(checked) => handleInputChange("customization", checked as boolean)}
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
                      className="flex-1 bg-blue-600 hover:bg-blue-700 h-16 text-xl"
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
                      className="flex-1 border-green-500 text-green-600 hover:bg-green-50 h-16 text-xl"
                    >
                      <MessageCircle className="w-6 h-6 mr-3" />💬 Chat on WhatsApp
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
              <Card className="shadow-xl border-0 sticky top-8">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Calculator className="w-7 h-7 text-teal-600" />
                    Quote Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {shortlistedProducts.length > 0 ? (
                    <div className="space-y-6">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
                          <div className="text-blue-700 text-sm">Items</div>
                        </div>
                        <div className="text-center p-4 bg-teal-50 rounded-xl">
                          <div className="text-2xl font-bold text-teal-600">₹{totalValue.toLocaleString()}</div>
                          <div className="text-teal-700 text-sm">Total Value</div>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Selected Items:</h4>
                        {shortlistedProducts.slice(0, 3).map((product) => (
                          <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
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
              <Card className="shadow-xl border-0">
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get your perfect corporate gifts</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Submit Request</h3>
              <p className="text-gray-600">Fill out the quote form with your requirements</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Review</h3>
              <p className="text-gray-600">Our team reviews and prepares personalized recommendations</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Receive Quote</h3>
              <p className="text-gray-600">Get detailed pricing and product suggestions within 24 hours</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Place Order</h3>
              <p className="text-gray-600">Approve the quote and we'll handle the rest</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
