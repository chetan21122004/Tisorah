"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Linkedin,
  ArrowRight,
  Users,
  CheckCircle,
  Star,
  Crown,
  Award,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    subject: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      subject: ""
    })
    // Show success message (would be implemented with a toast in production)
    alert("Your message has been sent successfully. We'll get back to you shortly!")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactMethods = [
    {
      icon: <Phone className="w-7 h-7 text-[#AD9660]" />,
      title: "Concierge Service",
      details: ["+91 93701 72365"],
      description: "Available Monday to Friday, 9AM-6PM IST",
      premium: "Priority Response"
    },
    {
      icon: <Mail className="w-7 h-7 text-[#AD9660]" />,
      title: "Executive Email",
      details: ["hello@tisorahbox.com"],
      description: "Dedicated support for premium clients",
      premium: "24-Hour Response"
    },
    {
      icon: <MapPin className="w-7 h-7 text-[#AD9660]" />,
      title: "Private Showroom",
      details: ["Pancard Club Road, Baner", "Pune - 411045, Maharashtra"],
      description: "Exclusive appointments for discerning clients",
      premium: "By Invitation Only"
    },
  ]

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM IST", type: "Premium Hours" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM IST", type: "Exclusive Consultations" },
    { day: "Sunday", hours: "Closed", type: "Private Events Only" },
  ]

  const luxuryFeatures = [
    {
      icon: <Crown className="w-6 h-6 text-[#AD9660]" />,
      title: "White Glove Service",
      description: "Personalized attention for every detail"
    },
    {
      icon: <Award className="w-6 h-6 text-[#AD9660]" />,
      title: "Curated Excellence",
      description: "Handpicked premium selections"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#AD9660]" />,
      title: "Bespoke Solutions",
      description: "Tailored to your unique requirements"
    }
  ]

  const faqItems = [
    {
      question: "What makes Tisorah's service premium?",
      answer: "We offer white-glove service with dedicated account managers, premium packaging, and exclusive access to luxury gift collections. Every client receives personalized attention and bespoke solutions tailored to their specific requirements."
    },
    {
      question: "Do you offer exclusive corporate packages?",
      answer: "Yes, we provide exclusive corporate packages for discerning clients, including limited edition items, custom branding solutions, and priority access to our premium collections. Our executive team works closely with you to create memorable experiences."
    },
    {
      question: "What is your premium delivery service?",
      answer: "Our premium delivery service includes white-glove handling, signature packaging, and flexible scheduling. We offer same-day delivery in select cities and international shipping with full tracking and insurance coverage."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEFEFE] via-[#F8F7F4] to-[#F5F4F0]">
      {/* Hero Section */}
      <section className="relative py-10 md:py-15 overflow-hidden bg-gradient-to-br from-[#1E2A47] via-[#2A3B5C] to-[#1E2A47]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A47]/95 via-[#2A3B5C]/90 to-[#1E2A47]/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(173,150,96,0.15)_0%,transparent_70%)]"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#AD9660] rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-[#AD9660] rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-[#AD9660] rounded-full opacity-50 animate-pulse delay-500"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <Crown className="w-5 h-5 text-[#AD9660]" />
              <span className="text-white font-medium tracking-wider text-sm">PREMIUM CORPORATE GIFTING</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light text-white font-serif mb-8 leading-tight">
              Elevate Your
              <span className="block text-transparent bg-gradient-to-r from-[#AD9660] via-[#D4C291] to-[#AD9660] bg-clip-text italic">
                Corporate Legacy
              </span>
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto mb-12">
              Experience the pinnacle of corporate gifting excellence. Where sophistication meets personalization, 
              and every detail reflects your commitment to quality.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#AD9660]" />
                <span>Luxury Curated</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#AD9660]" />
                <span>White Glove Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#AD9660]" />
                <span>Bespoke Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-32 -mt-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border border-gray-200 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group hover:-translate-y-2">
                <CardContent className="p-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#AD9660]/10 to-[#AD9660]/5 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-[#AD9660]/20">
                    {method.icon}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-light text-[#1E2A47] font-serif">{method.title}</h3>
                      <div className="px-3 py-1 bg-[#AD9660]/10 rounded-full">
                        <span className="text-[#AD9660] text-xs font-medium">{method.premium}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {method.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-800 font-light text-lg">{detail}</p>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 text-sm font-light leading-relaxed">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Features */}
      <section className="py-24 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-[#1E2A47] mb-4 font-serif">The Tisorah Experience</h2>
              <p className="text-gray-600 font-light text-lg">Uncompromising quality in every interaction</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {luxuryFeatures.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#AD9660]/10 to-[#AD9660]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-[#AD9660]/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-light text-[#1E2A47] mb-3 font-serif">{feature.title}</h3>
                  <p className="text-gray-600 font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-32 relative bg-gradient-to-b from-[#F8F7F4] to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#AD9660]/10 rounded-full mb-8 border border-[#AD9660]/20">
                  <Mail className="w-5 h-5 text-[#AD9660]" />
                  <span className="text-[#AD9660] font-medium tracking-wider text-sm">EXCLUSIVE CONSULTATION</span>
                </div>
                <h2 className="text-5xl font-light text-[#1E2A47] mb-6 font-serif">Begin Your Journey</h2>
                <p className="text-gray-700 font-light text-xl leading-relaxed">
                  Share your vision with our luxury consultants. Every detail matters in creating 
                  an extraordinary corporate gifting experience.
                </p>
              </div>

              <Card className="border border-gray-200 bg-white shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-12">
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <Label htmlFor="name" className="text-[#1E2A47] font-medium text-sm tracking-wider uppercase">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-[#AD9660] focus:ring-2 focus:ring-[#AD9660]/20 transition-all duration-300 h-14 text-base rounded-2xl"
                          placeholder="Your distinguished name"
                        />
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="email" className="text-[#1E2A47] font-medium text-sm tracking-wider uppercase">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-[#AD9660] focus:ring-2 focus:ring-[#AD9660]/20 transition-all duration-300 h-14 text-base rounded-2xl"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <Label htmlFor="company" className="text-[#1E2A47] font-medium text-sm tracking-wider uppercase">Company Name</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-[#AD9660] focus:ring-2 focus:ring-[#AD9660]/20 transition-all duration-300 h-14 text-base rounded-2xl"
                          placeholder="Your esteemed organization"
                        />
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="phone" className="text-[#1E2A47] font-medium text-sm tracking-wider uppercase">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-[#AD9660] focus:ring-2 focus:ring-[#AD9660]/20 transition-all duration-300 h-14 text-base rounded-2xl"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="subject" className="text-[#1E2A47] font-medium text-sm tracking-wider uppercase">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                        className="border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-[#AD9660] focus:ring-2 focus:ring-[#AD9660]/20 transition-all duration-300 h-14 text-base rounded-2xl"
                        placeholder="How may we elevate your corporate gifting?"
                      />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="message" className="text-[#1E2A47] font-medium text-sm tracking-wider uppercase">Your Vision *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        placeholder="Share your requirements, preferences, and vision for the perfect corporate gifting experience..."
                        className="border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-[#AD9660] focus:ring-2 focus:ring-[#AD9660]/20 transition-all duration-300 min-h-[240px] text-base rounded-2xl resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#AD9660] to-[#8d7c50] hover:from-[#8d7c50] hover:to-[#AD9660] text-white h-16 px-12 font-medium transition-all duration-500 flex items-center gap-4 group text-base rounded-2xl shadow-lg hover:shadow-xl"
                    >
                      <Send className="w-6 h-6" />
                      <span className="tracking-wider">INITIATE CONSULTATION</span>
                      <ArrowRight className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="space-y-10">
              {/* Office Hours */}
              <Card className="border border-gray-200 bg-white shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#AD9660]/10 to-[#AD9660]/5 rounded-2xl flex items-center justify-center border border-[#AD9660]/20">
                      <Clock className="w-6 h-6 text-[#AD9660]" />
                    </div>
                    <h3 className="text-2xl font-light text-[#1E2A47] font-serif">Consultation Hours</h3>
                  </div>
                  <div className="space-y-6">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="py-4 border-b border-gray-200 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-light text-[#1E2A47] text-lg">{schedule.day}</span>
                          <span className="text-gray-600 font-light">{schedule.hours}</span>
                        </div>
                        <span className="text-[#AD9660] text-sm font-medium">{schedule.type}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border border-gray-200 bg-white shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#AD9660]/10 to-[#AD9660]/5 rounded-2xl flex items-center justify-center border border-[#AD9660]/20">
                      <Users className="w-6 h-6 text-[#AD9660]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-[#1E2A47] font-serif">Professional Network</h3>
                      <p className="text-gray-600 font-light">Connect with us on LinkedIn</p>
                    </div>
                  </div>
                  <div className="flex">
                    <a 
                      href="https://www.linkedin.com/company/tisorahbox/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#AD9660]/10 to-[#AD9660]/5 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#AD9660] hover:to-[#8d7c50] transition-all duration-500 group border border-[#AD9660]/20"
                    >
                      <Linkedin className="w-6 h-6 text-[#AD9660] group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-32 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#AD9660]/10 rounded-full mb-8 border border-[#AD9660]/20">
              <MapPin className="w-5 h-5 text-[#AD9660]" />
              <span className="text-[#AD9660] font-medium tracking-wider text-sm">PRIVATE SHOWROOM</span>
            </div>
            <h2 className="text-5xl font-light text-[#1E2A47] mb-8 font-serif">Visit Our Sanctuary</h2>
            <p className="text-gray-700 font-light text-xl leading-relaxed max-w-3xl mx-auto">
              Experience our curated collections in an intimate setting designed for discerning clients. 
              Private consultations available by appointment.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.545383111343!2d73.7755954751926!3d18.55899158254206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2beb7facd51ff%3A0x258d1e2a94e302ab!2sPan%20Card%20Club%20Rd%2C%20Baner%2C%20Pune%2C%20Maharashtra%20411045!5e1!3m2!1sen!2sin!4v1751469275539!5m2!1sen!2sin"
              width="100%"
              height="700"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative bg-gradient-to-b from-[#F8F7F4] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#AD9660]/10 rounded-full mb-8 border border-[#AD9660]/20">
                <CheckCircle className="w-5 h-5 text-[#AD9660]" />
                <span className="text-[#AD9660] font-medium tracking-wider text-sm">FREQUENTLY ASKED</span>
              </div>
              <h2 className="text-5xl font-light text-[#1E2A47] mb-8 font-serif">Exclusive Insights</h2>
              <p className="text-gray-700 font-light text-xl leading-relaxed max-w-3xl mx-auto">
                Discover what sets our premium corporate gifting service apart from the ordinary.
              </p>
            </div>

            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <Card key={index} className="border border-gray-200 bg-white shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-10">
                    <div className="flex items-start gap-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#AD9660]/10 to-[#AD9660]/5 rounded-2xl flex items-center justify-center flex-shrink-0 mt-2 border border-[#AD9660]/20">
                        <CheckCircle className="w-6 h-6 text-[#AD9660]" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-light text-[#1E2A47] mb-4 font-serif">{item.question}</h4>
                        <p className="text-gray-700 font-light text-lg leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 