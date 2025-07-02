"use client";

import Link from "next/link"
import Image from "next/image"
import { Gift, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowRight, Twitter, ChevronRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-[#323433] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#AD9660]/20 via-[#AD9660] to-[#AD9660]/20"></div>
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#AD9660]/5 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#AD9660]/5 transform -translate-x-1/2 translate-y-1/2"></div>
      
      {/* Pre-footer CTA */}
      <div className="relative bg-[#F0EBE1] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div className="md:w-2/3 text-center md:text-left" variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] mb-3">
                Ready to <span className="text-[#AD9660]">Elevate</span> Your Corporate Gifting?
              </h2>
              <p className="text-sm md:text-base text-[#323433]/70">
                Get a personalized quote tailored to your specific requirements and budget.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button className="bg-[#AD9660] hover:bg-[#8d7c50] text-white px-6 py-3 md:py-6 rounded-md flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Link href="/quote" className="flex items-center gap-2">
                  <span className="font-medium">Request Free Quote</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="font-serif text-3xl tracking-wide text-white">
                <span className="font-light tracking-tight">TISO</span><span className="font-light tracking-tighter">RAH</span>
                <span className="font-light">BOX</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Crafting extraordinary corporate relationships through sophisticated, premium gifting solutions that
              embody elegance and distinction.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#AD9660] flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#AD9660] flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#AD9660] flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#AD9660] flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-['Frank_Ruhl_Libre'] relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-[#AD9660]">
              Collections
            </h3>
            <div className="space-y-3">
              <FooterLink href="/about" text="Our Heritage" />
              <FooterLink href="/categories" text="Gift Collections" />
              <FooterLink href="/packages" text="Executive Packages" />
              <FooterLink href="/customization" text="Bespoke Solutions" />
              <FooterLink href="/portfolio" text="Portfolio" />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-['Frank_Ruhl_Libre'] relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-[#AD9660]">
              Services
            </h3>
            <div className="space-y-3">
              <FooterLink href="/quote" text="Consultation Services" />
              <FooterLink href="/bulk-orders" text="Volume Solutions" />
              <FooterLink href="/faq" text="Frequently Asked Questions" />
              <FooterLink href="/blog" text="Insights & Inspiration" />
              <FooterLink href="/contact" text="Contact Support" />
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-['Frank_Ruhl_Libre'] relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-[#AD9660]">
              Connect With Us
            </h3>
          <div className="space-y-4">
              <a href="tel:+919370172365" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#AD9660] flex items-center justify-center transition-colors duration-300">
                  <Phone className="h-3 w-3 text-white" />
              </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">+91 93701 72365</span>
              </a>
              <a href="mailto:hello@tisorahbox.com" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#AD9660] flex items-center justify-center transition-colors duration-300">
                  <Mail className="h-3 w-3 text-white" />
              </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">hello@tisorahbox.com</span>
              </a>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-1">
                  <MapPin className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-300 text-sm">
                  Pancard Club Road, Baner,
                  <br />
                  Pune - 411045, Maharashtra, India
                </span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-base font-medium mb-3">Exclusive Updates</h4>
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <div className="relative flex-grow">
                <Input
                  type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10 h-11"
                    required
                />
              </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#AD9660] hover:bg-[#8d7c50] text-white h-11 px-4"
                >
                  {isSubmitting ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-2">
                Stay updated with our latest collections and offers
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tisorah. All rights reserved. Crafted with excellence.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string;
  text: string;
}

const FooterLink = ({ href, text }: FooterLinkProps) => (
  <Link 
    href={href} 
    className="flex items-center text-gray-300 hover:text-white transition-all duration-300 group"
  >
    <ChevronRight className="h-3 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 text-[#AD9660] transition-all duration-300" />
    <span className="group-hover:translate-x-1 transition-transform duration-300">{text}</span>
  </Link>
);