"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Package,
  Truck,
  Shield,
  Headphones,
  TrendingDown,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Building,
  Gift,
} from "lucide-react"

export default function BulkOrdersPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    category: "",
    quantity: "",
    budget: "",
    timeline: "",
    requirements: "",
    urgentDelivery: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const benefits = [
    {
      icon: <TrendingDown className="w-8 h-8 text-[#1E2A47]" />,
      title: "Volume Discounts",
      description: "Save up to 30% on bulk orders",
      detail: "The more you order, the more you save",
    },
    {
      icon: <Truck className="w-8 h-8 text-[#1E2A47]" />,
      title: "Shipping",
      description: "Complimentary delivery on 100+ pieces",
      detail: "Fast and reliable nationwide delivery",
    },
    {
      icon: <Headphones className="w-8 h-8 text-[#1E2A47]" />,
      title: "Dedicated Support",
      description: "Personal account manager assigned",
      detail: "Priority customer service and support",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#1E2A47]" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guaranteed",
      detail: "Premium quality products every time",
    },
  ]

  const pricingTiers = [
    {
      name: "Starter Bulk",
      range: "50-199 pieces",
      discount: "5-10% OFF",
      features: ["Basic customization", "Standard delivery", "Email support"],
      popular: false,
    },
    {
      name: "Business Bulk",
      range: "200-499 pieces",
      discount: "10-15% OFF",
      features: ["Advanced customization", "Priority delivery", "Phone support", "Account manager"],
      popular: true,
    },
    {
      name: "Enterprise Bulk",
      range: "500-999 pieces",
      discount: "15-20% OFF",
      features: ["Premium customization", "Express delivery", "Dedicated support", "Quality assurance"],
      popular: false,
    },
    {
      name: "Corporate Bulk",
      range: "1000+ pieces",
      discount: "20-30% OFF",
      features: ["Full customization", "White-glove service", "24/7 support", "Custom packaging"],
      popular: false,
    },
  ]

  const popularCategories = [
    {
      name: "Employee Onboarding",
      description: "Welcome kits and starter packages",
      minOrder: "50 pieces",
      priceRange: "$25-60",
      icon: <Users className="w-6 h-6 text-[#1E2A47]" />,
    },
    {
      name: "Corporate Events",
      description: "Conference bags and event merchandise",
      minOrder: "100 pieces",
      priceRange: "$15-45",
      icon: <Building className="w-6 h-6 text-[#1E2A47]" />,
    },
    {
      name: "Client Appreciation",
      description: "Premium gifts for valued clients",
      minOrder: "25 pieces",
      priceRange: "$40-120",
      icon: <Gift className="w-6 h-6 text-[#1E2A47]" />,
    },
    {
      name: "Festival Hampers",
      description: "Seasonal celebration packages",
      minOrder: "75 pieces",
      priceRange: "$35-85",
      icon: <Package className="w-6 h-6 text-[#1E2A47]" />,
    },
  ]

  const processSteps = [
    {
      step: "1",
      title: "Submit Requirements",
      description: "Tell us about your bulk order needs and preferences",
    },
    {
      step: "2",
      title: "Get Custom Quote",
      description: "Receive detailed pricing with volume discounts within 24 hours",
    },
    {
      step: "3",
      title: "Approve & Order",
      description: "Review samples, approve design, and confirm your bulk order",
    },
    {
      step: "4",
      title: "Fast Delivery",
      description: "Receive your professionally packaged bulk order on time",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F4F4F4] py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-block mb-6 relative">
              <div className="w-20 h-20 bg-[#E6E2DD] rounded-sm flex items-center justify-center">
                <Package className="w-10 h-10 text-[#323433]" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 border border-[#AD9660] rounded-sm"></div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#323433] mb-2 font-serif">Bulk Orders</h1>
            <p className="text-xl text-[#1E2A47] font-medium mb-6">Volume Discounts & Premium Service</p>
            <div className="max-w-3xl mx-auto relative">
              <div className="h-px w-24 bg-[#AD9660] absolute left-1/2 -translate-x-1/2 -top-4"></div>
              <p className="text-lg text-[#323433] font-light leading-relaxed">
                Save more with our bulk ordering service. Perfect for large corporate events, employee onboarding programs,
                and client appreciation campaigns. Get volume discounts up to 30% off with dedicated support.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#E6E2DD] rounded-sm flex items-center justify-center mx-auto mb-4 relative">
                  {benefit.icon}
                  <div className="absolute -bottom-1 -right-1 w-16 h-16 border border-[#AD9660] rounded-sm"></div>
                </div>
                <h3 className="text-lg font-semibold text-[#323433] mb-2 font-serif">{benefit.title}</h3>
                <p className="text-[#1E2A47] font-medium mb-1">{benefit.description}</p>
                <p className="text-[#323433] text-sm font-light">{benefit.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Tiers */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#323433] text-center mb-12 relative inline-block">
              Volume Pricing Tiers
              <div className="absolute -bottom-3 left-0 right-0 h-px bg-[#AD9660]"></div>
            </h2>
            <p className="text-lg text-[#323433] font-light mt-8">The more you order, the more you save</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`border-0 shadow-sm hover:shadow-md transition-all bg-white ${tier.popular ? "ring-1 ring-[#AD9660]" : ""}`}
              >
                <CardContent className="p-6">
                  {tier.popular && (
                    <div className="bg-[#AD9660] text-white text-xs font-medium px-3 py-1 inline-block mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-[#323433] mb-2 font-serif">{tier.name}</h3>
                  <p className="text-[#323433] mb-2 font-light">{tier.range}</p>
                  <p className="text-2xl font-bold text-[#1E2A47] mb-4 font-serif">{tier.discount}</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#323433] font-light">
                        <CheckCircle className="w-4 h-4 text-[#AD9660]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#323433] text-center mb-12 relative inline-block">
              Popular Bulk Categories
              <div className="absolute -bottom-3 left-0 right-0 h-px bg-[#AD9660]"></div>
            </h2>
            <p className="text-lg text-[#323433] font-light mt-8">Most ordered categories for bulk purchases</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow group cursor-pointer bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#E6E2DD] rounded-sm flex items-center justify-center mb-4 group-hover:bg-[#E6E2DD] transition-colors relative">
                    {category.icon}
                    <div className="absolute -bottom-1 -right-1 w-12 h-12 border border-[#AD9660] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#323433] mb-2 font-serif">{category.name}</h3>
                  <p className="text-[#323433] text-sm mb-3 font-light">{category.description}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#323433] font-light">Min Order:</span>
                      <span className="font-medium">{category.minOrder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#323433] font-light">Price Range:</span>
                      <span className="font-medium">{category.priceRange}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Quote Form */}
          <div>
            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#323433] mb-2 font-serif">Request Bulk Quote</h2>
                  <p className="text-[#323433] font-light">Get a custom quote with volume discounts for your bulk order</p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName" className="text-[#323433]">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="Your company name"
                        required
                        className="border-[#C8C2B6] focus:border-[#AD9660] focus:ring-[#AD9660]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName" className="text-[#323433]">Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="border-[#C8C2B6] focus:border-[#AD9660] focus:ring-[#AD9660]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-[#323433]">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="border-[#C8C2B6] focus:border-[#AD9660] focus:ring-[#AD9660]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-[#323433]">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="border-[#C8C2B6] focus:border-[#AD9660] focus:ring-[#AD9660]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-[#323433]">Product Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="border-[#C8C2B6] focus:ring-[#AD9660]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onboarding">Employee Onboarding</SelectItem>
                          <SelectItem value="events">Corporate Events</SelectItem>
                          <SelectItem value="appreciation">Client Appreciation</SelectItem>
                          <SelectItem value="festivals">Festival Hampers</SelectItem>
                          <SelectItem value="recognition">Employee Recognition</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quantity" className="text-[#323433]">Quantity Needed *</Label>
                      <Select value={formData.quantity} onValueChange={(value) => handleInputChange("quantity", value)}>
                        <SelectTrigger className="border-[#C8C2B6] focus:ring-[#AD9660]">
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50-99">50-99 pieces</SelectItem>
                          <SelectItem value="100-199">100-199 pieces</SelectItem>
                          <SelectItem value="200-499">200-499 pieces</SelectItem>
                          <SelectItem value="500-999">500-999 pieces</SelectItem>
                          <SelectItem value="1000+">1000+ pieces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget" className="text-[#323433]">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger className="border-[#C8C2B6] focus:ring-[#AD9660]">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k+">$50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline" className="text-[#323433]">Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="border-[#C8C2B6] focus:ring-[#AD9660]">
                          <SelectValue placeholder="When do you need this?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                          <SelectItem value="3-4weeks">3-4 weeks</SelectItem>
                          <SelectItem value="1-2months">1-2 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="requirements" className="text-[#323433]">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      placeholder="Tell us about your specific needs, customization requirements, branding guidelines, etc."
                      rows={4}
                      className="border-[#C8C2B6] focus:border-[#AD9660] focus:ring-[#AD9660]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgentDelivery"
                      checked={formData.urgentDelivery}
                      onCheckedChange={(checked) => handleInputChange("urgentDelivery", checked as boolean)}
                      className="text-[#1E2A47] border-[#C8C2B6] focus:ring-[#AD9660]"
                    />
                    <Label htmlFor="urgentDelivery" className="text-sm text-[#323433] font-light">
                      This is an urgent order (additional charges may apply)
                    </Label>
                  </div>

                  <Button className="w-full bg-[#1E2A47] hover:bg-[#323433] h-12 text-white">
                    Get Bulk Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Process Steps */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#323433] mb-4 font-serif relative inline-block">
                How It Works
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#AD9660]"></div>
              </h2>
              <p className="text-[#323433] font-light mt-6">Simple 4-step process to get your bulk order</p>
            </div>

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-[#323433] text-white flex items-center justify-center font-bold text-lg flex-shrink-0 relative">
                    {step.step}
                    <div className="absolute -bottom-1 -right-1 w-12 h-12 border border-[#AD9660]"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#323433] mb-1 font-serif">{step.title}</h3>
                    <p className="text-[#323433] font-light">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="mt-8 border-0 bg-[#E6E2DD]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-[#1E2A47]" />
                  <h3 className="text-lg font-semibold text-[#323433] font-serif">Quick Response Time</h3>
                </div>
                <p className="text-[#323433] mb-4 font-light">
                  We respond to all bulk order inquiries within 24 hours with detailed quotes and recommendations.
                </p>
                <div className="flex items-center gap-2 text-sm text-[#1E2A47] font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Free consultation included</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
