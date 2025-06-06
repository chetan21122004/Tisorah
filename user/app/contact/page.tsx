"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
  Building,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6 text-[#AD9660]" />,
      title: "Phone",
      details: ["+91 98600 02313"],
      description: "Mon-Fri, 9AM-6PM IST",
    },
    {
      icon: <Mail className="w-6 h-6 text-[#AD9660]" />,
      title: "Email",
      details: ["info@tisorah.com"],
      description: "We aim to respond within 24 hours",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#AD9660]" />,
      title: "Office",
      details: ["12/14, Laxmi Narayan Nagar, Erandwane", "Pune - 411004, Maharashtra"],
      description: "Visits by appointment only",
    },
  ]

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM IST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM IST" },
    { day: "Sunday", hours: "Closed" },
  ]

  const quickLinks = [
    { title: "Request a Quote", href: "/quote", icon: <MessageCircle className="w-4 h-4" /> },
    { title: "View Portfolio", href: "/portfolio", icon: <Users className="w-4 h-4" /> },
    { title: "Corporate Packages", href: "/packages", icon: <Building className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Hero Section */}
      <section className="relative bg-[#1E2A47] py-24">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A47] via-[#1E2A47]/95 to-[#1E2A47]"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-none border border-[#AD9660]/20">
                <Mail className="w-5 h-5 text-[#AD9660]" />
                <span className="text-[#E6E2DD] font-light font-['Poppins']">Let's Start a Conversation</span>
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-light text-white font-['Frank_Ruhl_Libre'] mb-6">
              Connect with <span className="text-[#AD9660]">Tisorah</span>
            </h1>
            <p className="text-xl text-[#E6E2DD]/90 leading-relaxed font-['Poppins'] font-light max-w-2xl mx-auto">
              Experience our commitment to excellence in corporate gifting. We're here to help you create meaningful
              connections through thoughtfully curated gifts.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1E2A47]/5 -rotate-3 transform transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white border border-[#AD9660]/20 p-8 transition-all group-hover:border-[#AD9660]">
                    <div className="w-16 h-16 bg-[#1E2A47] rounded-none flex items-center justify-center mb-6">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre']">{method.title}</h3>
                    <div className="space-y-2 mb-4">
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-900 font-['Poppins'] font-light">{detail}</p>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm font-['Poppins'] font-light">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-12">
                <div className="inline-block mb-6">
                  <div className="flex items-center gap-2 bg-[#1E2A47]/5 px-4 py-2 border border-[#1E2A47]/10">
                    <MessageCircle className="w-5 h-5 text-[#1E2A47]" />
                    <span className="text-[#1E2A47] font-light font-['Poppins']">Get in Touch</span>
                  </div>
                </div>
                <h2 className="text-4xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre']">Send us a Message</h2>
                <p className="text-gray-600 font-['Poppins'] font-light">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#323433] font-['Poppins'] font-light">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="border-[#AD9660]/20 focus:border-[#AD9660] h-12 font-['Poppins'] font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#323433] font-['Poppins'] font-light">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="border-[#AD9660]/20 focus:border-[#AD9660] h-12 font-['Poppins'] font-light"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-[#323433] font-['Poppins'] font-light">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="border-[#AD9660]/20 focus:border-[#AD9660] h-12 font-['Poppins'] font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#323433] font-['Poppins'] font-light">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-[#AD9660]/20 focus:border-[#AD9660] h-12 font-['Poppins'] font-light"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#323433] font-['Poppins'] font-light">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    placeholder="Tell us about your corporate gifting needs..."
                    className="border-[#AD9660]/20 focus:border-[#AD9660] min-h-[160px] font-['Poppins'] font-light"
                  />
                </div>
                <Button type="submit" className="bg-[#1E2A47] hover:bg-[#323433] h-12 px-8 font-['Poppins'] font-light transition-all">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1E2A47]/5 rotate-2 transform transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white border border-[#AD9660]/20 p-8 transition-all group-hover:border-[#AD9660]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#1E2A47] rounded-none flex items-center justify-center">
                        <Clock className="w-6 h-6 text-[#AD9660]" />
                      </div>
                      <h3 className="text-xl font-light text-[#323433] font-['Frank_Ruhl_Libre']">Office Hours</h3>
                    </div>
                    <div className="space-y-4">
                      {officeHours.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-3 border-b border-[#AD9660]/10 last:border-b-0"
                        >
                          <span className="font-['Poppins'] font-light text-[#323433]">{schedule.day}</span>
                          <span className="text-gray-600 font-['Poppins'] font-light">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1E2A47]/5 -rotate-2 transform transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white border border-[#AD9660]/20 p-8 transition-all group-hover:border-[#AD9660]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#1E2A47] rounded-none flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-[#AD9660]" />
                      </div>
                      <h3 className="text-xl font-light text-[#323433] font-['Frank_Ruhl_Libre']">Quick Links</h3>
                    </div>
                    <div className="space-y-4">
                      {quickLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className="flex items-center justify-between p-4 border border-[#AD9660]/20 hover:border-[#AD9660] transition-all group/link"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-[#AD9660]">{link.icon}</div>
                            <span className="font-['Poppins'] font-light text-[#323433]">{link.title}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#AD9660] transform transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1E2A47]/5 rotate-1 transform transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white border border-[#AD9660]/20 p-8 transition-all group-hover:border-[#AD9660]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#1E2A47] rounded-none flex items-center justify-center">
                        <Users className="w-6 h-6 text-[#AD9660]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-[#323433] font-['Frank_Ruhl_Libre']">Connect With Us</h3>
                        <p className="text-gray-600 font-['Poppins'] font-light text-sm">Follow us for updates and inspiration</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <Button variant="outline" className="border-[#AD9660]/20 hover:border-[#AD9660] hover:bg-[#1E2A47]/5">
                        <Facebook className="w-5 h-5 text-[#323433]" />
                      </Button>
                      <Button variant="outline" className="border-[#AD9660]/20 hover:border-[#AD9660] hover:bg-[#1E2A47]/5">
                        <Instagram className="w-5 h-5 text-[#323433]" />
                      </Button>
                      <Button variant="outline" className="border-[#AD9660]/20 hover:border-[#AD9660] hover:bg-[#1E2A47]/5">
                        <Linkedin className="w-5 h-5 text-[#323433]" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-[#1E2A47]/5 px-4 py-2 border border-[#1E2A47]/10">
                <MapPin className="w-5 h-5 text-[#1E2A47]" />
                <span className="text-[#1E2A47] font-light font-['Poppins']">Our Location</span>
              </div>
            </div>
            <h2 className="text-4xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre']">Visit Our Office</h2>
            <p className="text-gray-600 font-['Poppins'] font-light">
              Schedule an appointment to discuss your corporate gifting needs in person.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-[#1E2A47]/5 rotate-1 transform"></div>
            <div className="relative bg-white border border-[#AD9660]/20 p-1">
              <div className="bg-gray-200 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#AD9660] mx-auto mb-4" />
                  <p className="text-gray-600 font-['Poppins'] font-light">Map integration coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
