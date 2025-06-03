import Link from "next/link"
import { Gift, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Gift className="h-8 w-8 text-secondary" />
              <div>
                <span className="text-xl font-bold leading-tight">Tisorah</span>
                <div className="text-sm text-secondary leading-tight">Exquisite Corporate Gifts</div>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Crafting extraordinary corporate relationships through sophisticated, premium gifting solutions that
              embody elegance and distinction.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-white hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-white hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-white hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Collections</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-neutral-300 hover:text-white transition-colors">
                Our Heritage
              </Link>
              <Link href="/categories" className="block text-neutral-300 hover:text-white transition-colors">
                Gift Collections
              </Link>
              <Link href="/packages" className="block text-neutral-300 hover:text-white transition-colors">
                Executive Packages
              </Link>
              <Link href="/customization" className="block text-neutral-300 hover:text-white transition-colors">
                Bespoke Solutions
              </Link>
              <Link href="/portfolio" className="block text-neutral-300 hover:text-white transition-colors">
                Portfolio
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <Link href="/quote" className="block text-neutral-300 hover:text-white transition-colors">
                Consultation Services
              </Link>
              <Link href="/bulk-orders" className="block text-neutral-300 hover:text-white transition-colors">
                Volume Solutions
              </Link>
              <Link href="/faq" className="block text-neutral-300 hover:text-white transition-colors">
                Frequently Asked Questions
              </Link>
              <Link href="/blog" className="block text-neutral-300 hover:text-white transition-colors">
                Insights & Inspiration
              </Link>
              <Link href="/contact" className="block text-neutral-300 hover:text-white transition-colors">
                Contact Support
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-secondary" />
                <span className="text-neutral-300">+91 98600 02313</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-secondary" />
                <span className="text-neutral-300">info@tisorah.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-secondary mt-1" />
                <span className="text-neutral-300 text-sm">
                  12/14, Laxmi Narayan Nagar, Erandwane,
                  <br />
                  Pune - 411004, Maharashtra, India
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Exclusive Updates</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-neutral-400"
                />
                <Button className="bg-secondary hover:bg-secondary/90">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} Tisorah. All rights reserved. Crafted with excellence.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
