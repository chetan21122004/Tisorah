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
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  Building,
  Users,
  CheckCircle,
  Calendar,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ContactPage() {
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
      icon: <Phone className="w-6 h-6 text-[#AD9660]" />,
      title: "Phone",
      details: ["+91 93701 72365"],
      description: "Mon-Fri, 9AM-6PM IST",
    },
    {
      icon: <Mail className="w-6 h-6 text-[#AD9660]" />,
      title: "Email",
      details: ["hello@tisorahbox.com"],
      description: "We aim to respond within 24 hours",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#AD9660]" />,
      title: "Office",
      details: ["Pancard Club Road, Baner", "Pune - 411045, Maharashtra"],
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

  const faqItems = [
    {
      question: "What is the minimum order quantity?",
      answer: "Our minimum order quantity varies by product, but typically starts at 25 units for corporate gifting solutions."
    },
    {
      question: "How long does customization take?",
      answer: "Customization timelines depend on the complexity and quantity of your order. Simple branding can be completed in 7-10 business days, while more complex projects may take 2-3 weeks."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary based on destination and order size."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#1E2A47] py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596079890744-c1a0462d0975?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A47] via-[#1E2A47]/95 to-[#1E2A47]"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-sm border border-[#AD9660]/20">
                <Mail className="w-5 h-5 text-[#AD9660]" />
                <span className="text-[#E6E2DD] font-light font-serif">Let's Start a Conversation</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white font-serif mb-6">
              Connect with <span className="text-[#AD9660]">Tisorah</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#E6E2DD]/90 leading-relaxed font-light max-w-2xl mx-auto">
              Experience our commitment to excellence in corporate gifting. We're here to help you create meaningful
              connections through thoughtfully curated gifts.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border border-[#AD9660]/20 shadow-lg hover:shadow-xl transition-all hover:border-[#AD9660]/50 bg-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#F8F7F4] rounded-full flex items-center justify-center mb-6 border border-[#AD9660]/20">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-light text-[#323433] mb-4 font-serif">{method.title}</h3>
                  <div className="space-y-2 mb-4">
                    {method.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-900 font-light">{detail}</p>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm font-light">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-[#F8F7F4]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-[2px] bg-[#AD9660]"></div>
                  <span className="text-xs uppercase tracking-wider text-[#AD9660] font-medium">Get in Touch</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-[#323433] mb-4 font-serif">Send us a Message</h2>
                <p className="text-gray-600 font-light">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <Card className="border border-[#AD9660]/10 shadow-md bg-white">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#323433] font-light">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="border-[#AD9660]/20 focus:border-[#AD9660] h-12 font-light"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#323433] font-light">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="border-[#AD9660]/20 focus:border-[#AD9660] h-12 font-light"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-[#323433] font-light">Company Name</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="border-[#AD9660]/20 focus:border-[#AD9660] h-12 font-light"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#323433] font-light">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="border-[#AD9660]/20 focus:border-[#AD9660] h-12 font-light"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-[#323433] font-light">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                        className="border-[#AD9660]/20 focus:border-[#AD9660] h-12 font-light"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#323433] font-light">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        placeholder="Tell us about your corporate gifting needs..."
                        className="border-[#AD9660]/20 focus:border-[#AD9660] min-h-[160px] font-light"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-[#AD9660] hover:bg-[#8d7c50] text-white h-12 px-8 font-light transition-all flex items-center gap-2 group"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="border border-[#AD9660]/20 shadow-md bg-white overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#F8F7F4] rounded-full flex items-center justify-center border border-[#AD9660]/20">
                      <Clock className="w-5 h-5 text-[#AD9660]" />
                    </div>
                    <h3 className="text-xl font-light text-[#323433] font-serif">Office Hours</h3>
                  </div>
                  <div className="space-y-4">
                    {officeHours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 border-b border-[#AD9660]/10 last:border-b-0"
                      >
                        <span className="font-light text-[#323433]">{schedule.day}</span>
                        <span className="text-gray-600 font-light">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="border border-[#AD9660]/20 shadow-md bg-white overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#F8F7F4] rounded-full flex items-center justify-center border border-[#AD9660]/20">
                      <ArrowRight className="w-5 h-5 text-[#AD9660]" />
                    </div>
                    <h3 className="text-xl font-light text-[#323433] font-serif">Quick Links</h3>
                  </div>
                  <div className="space-y-4">
                    {quickLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-center justify-between p-4 border border-[#AD9660]/20 hover:border-[#AD9660] transition-all group/link rounded-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-[#AD9660]">{link.icon}</div>
                          <span className="font-light text-[#323433]">{link.title}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#AD9660] transform transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border border-[#AD9660]/20 shadow-md bg-white overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#F8F7F4] rounded-full flex items-center justify-center border border-[#AD9660]/20">
                      <Users className="w-5 h-5 text-[#AD9660]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-light text-[#323433] font-serif">Connect With Us</h3>
                      <p className="text-gray-600 font-light text-sm">Follow us for updates and inspiration</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-[#F8F7F4] flex items-center justify-center hover:bg-[#AD9660] hover:text-white transition-colors duration-300 border border-[#AD9660]/20">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#F8F7F4] flex items-center justify-center hover:bg-[#AD9660] hover:text-white transition-colors duration-300 border border-[#AD9660]/20">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#F8F7F4] flex items-center justify-center hover:bg-[#AD9660] hover:text-white transition-colors duration-300 border border-[#AD9660]/20">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#F8F7F4] flex items-center justify-center hover:bg-[#AD9660] hover:text-white transition-colors duration-300 border border-[#AD9660]/20">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-[2px] bg-[#AD9660]"></div>
              <span className="text-xs uppercase tracking-wider text-[#AD9660] font-medium">Our Location</span>
              <div className="w-10 h-[2px] bg-[#AD9660]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-[#323433] mb-4 font-serif">Visit Our Office</h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              Schedule an appointment to discuss your corporate gifting needs in person at our Pune office.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg border border-[#AD9660]/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.545383111343!2d73.7755954751926!3d18.55899158254206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2beb7facd51ff%3A0x258d1e2a94e302ab!2sPan%20Card%20Club%20Rd%2C%20Baner%2C%20Pune%2C%20Maharashtra%20411045!5e1!3m2!1sen!2sin!4v1751469275539!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#F8F7F4]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-[2px] bg-[#AD9660]"></div>
                <span className="text-xs uppercase tracking-wider text-[#AD9660] font-medium">FAQ</span>
                <div className="w-10 h-[2px] bg-[#AD9660]"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-[#323433] mb-4 font-serif">Frequently Asked Questions</h2>
              <p className="text-gray-600 font-light max-w-2xl mx-auto">
                Find answers to commonly asked questions about our corporate gifting services.
              </p>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index} className="border border-[#AD9660]/20 shadow-sm bg-white overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#F8F7F4] rounded-full flex items-center justify-center border border-[#AD9660]/20 flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-[#AD9660]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-[#323433] mb-2">{item.question}</h4>
                        <p className="text-gray-600 font-light">{item.answer}</p>
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
