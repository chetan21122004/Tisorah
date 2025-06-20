"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, Heart, Phone, ArrowRight } from "lucide-react"
import { getShortlistCount } from "@/lib/shortlist-client"
import SearchBar from "@/components/SearchBar"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [shortlistCount, setShortlistCount] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    // Initial count
    setShortlistCount(getShortlistCount())

    // Listen for shortlist updates
    const handleShortlistUpdate = () => {
      setShortlistCount(getShortlistCount())
    }

    window.addEventListener("shortlistUpdated", handleShortlistUpdate)
    
    return () => {
      window.removeEventListener("shortlistUpdated", handleShortlistUpdate)
    }
  }, [])

  const categories = [
    { name: "Executive Onboarding", href: "/categories/onboarding", description: "Sophisticated welcome experiences for new executives" },
    { name: "Festival Celebrations", href: "/categories/festivals", description: "Exquisite gifts for cultural and seasonal festivities" },
    { name: "Recognition & Awards", href: "/categories/recognition", description: "Memorable tokens for exceptional achievements" },
    { name: "Corporate Events", href: "/categories/events", description: "Premium keepsakes for organizational gatherings" },
    { name: "Milestone Celebrations", href: "/categories/birthdays", description: "Elegant gifts for important company milestones" },
  ]

  const services = [
    { name: "Bespoke Customization", href: "/customization", description: "Tailored solutions with your corporate identity" },
    { name: "Executive Collections", href: "/packages", description: "Curated packages for distinguished professionals" },
    { name: "Volume Solutions", href: "/bulk-orders", description: "Premium bulk gifting with exclusive pricing" },
    { name: "Consultation Services", href: "/quote", description: "Expert guidance for corporate gifting strategies" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-40 h-16">
              <Image
                src="/logo.png"
                alt="Tisorah Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex items-center space-x-1">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                      pathname === "/" ? "text-[#AD9660] font-semibold" : "text-[#1E2A47]"
                    }`}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="h-12 px-6 rounded-lg hover:text-[#AD9660] transition-all duration-200 text-[#1E2A47]"
                >
                  Collections
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] gap-3 p-6 bg-white shadow-xl rounded-xl border-0">
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-[#1E2A47] mb-2">Curated Collections</h4>
                      <p className="text-xs text-neutral-500">Sophisticated gifts for every corporate occasion</p>
                    </div>
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-neutral-50 hover:text-[#AD9660] focus:bg-neutral-50 focus:text-[#AD9660] border border-transparent hover:border-neutral-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium leading-none group-hover:text-[#AD9660] transition-colors">
                            {category.name}
                          </div>
                          <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#AD9660] group-hover:translate-x-1 transition-all" />
                        </div>
                        <div className="text-xs text-neutral-500 mt-2">{category.description}</div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="h-12 px-6 rounded-lg hover:text-[#AD9660] transition-all duration-200 text-[#1E2A47]"
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] gap-3 p-6 bg-white shadow-xl rounded-xl border-0">
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-[#1E2A47] mb-2">Exclusive Services</h4>
                      <p className="text-xs text-neutral-500">Comprehensive corporate gifting solutions</p>
                    </div>
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-neutral-50 hover:text-[#AD9660] focus:bg-neutral-50 focus:text-[#AD9660] border border-transparent hover:border-neutral-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium leading-none group-hover:text-[#AD9660] transition-colors">
                            {service.name}
                          </div>
                          <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#AD9660] group-hover:translate-x-1 transition-all" />
                        </div>
                        <div className="text-xs text-neutral-500 mt-2">{service.description}</div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/portfolio" legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                      pathname === "/portfolio" ? "text-[#AD9660] font-semibold" : "text-[#1E2A47]"
                    }`}
                  >
                    Portfolio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                      pathname === "/products" ? "text-[#AD9660] font-semibold" : "text-[#1E2A47]"
                    }`}
                  >
                    Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                      pathname === "/blog" ? "text-[#AD9660] font-semibold" : "text-[#1E2A47]"
                    }`}
                  >
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                      pathname === "/about" ? "text-[#AD9660] font-semibold" : "text-[#1E2A47]"
                    }`}
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                      pathname === "/contact" ? "text-[#AD9660] font-semibold" : "text-[#1E2A47]"
                    }`}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="hidden lg:block mx-4">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/shortlist">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-full hover:bg-neutral-100 text-[#1E2A47] hover:text-[#AD9660] transition-all duration-200 relative"
              >
                <Heart className="h-5 w-5" />
                {shortlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#AD9660] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {shortlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button 
              className="bg-[#AD9660] hover:bg-[#AD9660]/90 text-white px-5 h-10 rounded-full shadow-sm hover:shadow transition-all duration-200 font-medium"
            >
              <Phone className="h-4 w-4 mr-2" />
              Consultation
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[#1E2A47]"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  <div className="border-b p-4">
                    <div className="relative w-32 h-12 mx-auto">
                      <Image
                        src="/logo.png"
                        alt="Tisorah Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6 flex-1 overflow-auto">
                    {/* Mobile Search */}
                    <div className="mb-6">
                      <SearchBar />
                    </div>
                    <nav className="flex flex-col space-y-6">
                      <Link 
                        href="/" 
                        className={`text-lg font-medium transition-colors ${pathname === "/" ? "text-[#AD9660]" : ""}`}
                        onClick={() => setIsOpen(false)}
                      >
                        Home
                      </Link>
                      
                      <div className="space-y-4">
                        <div className="text-lg font-medium text-[#1E2A47]">Collections</div>
                        <div className="grid gap-3">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              className="group flex items-center justify-between p-3 text-sm text-neutral-600 hover:text-[#AD9660] bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <span>{category.name}</span>
                              <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#AD9660] group-hover:translate-x-1 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-lg font-medium text-[#1E2A47]">Services</div>
                        <div className="grid gap-3">
                          {services.map((service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              className="group flex items-center justify-between p-3 text-sm text-neutral-600 hover:text-[#AD9660] bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <span>{service.name}</span>
                              <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#AD9660] group-hover:translate-x-1 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      <Link 
                        href="/portfolio" 
                        className={`text-lg font-medium transition-colors ${pathname === "/portfolio" ? "text-[#AD9660]" : ""}`}
                        onClick={() => setIsOpen(false)}
                      >
                        Portfolio
                      </Link>
                      <Link 
                        href="/products" 
                        className={`text-lg font-medium transition-colors ${pathname === "/products" ? "text-[#AD9660]" : ""}`}
                        onClick={() => setIsOpen(false)}
                      >
                        Products
                      </Link>
                      <Link 
                        href="/blog" 
                        className={`text-lg font-medium transition-colors ${pathname === "/blog" ? "text-[#AD9660]" : ""}`}
                        onClick={() => setIsOpen(false)}
                      >
                        Blog
                      </Link>
                      <Link 
                        href="/about" 
                        className={`text-lg font-medium transition-colors ${pathname === "/about" ? "text-[#AD9660]" : ""}`}
                        onClick={() => setIsOpen(false)}
                      >
                        About
                      </Link>
                      <Link 
                        href="/contact" 
                        className={`text-lg font-medium transition-colors ${pathname === "/contact" ? "text-[#AD9660]" : ""}`}
                        onClick={() => setIsOpen(false)}
                      >
                        Contact
                      </Link>
                    </nav>
                  </div>
                  
                  <div className="p-6 border-t mt-auto">
                    <div className="flex justify-between gap-4 mb-6">
                      <Link href="/shortlist" className="flex-1" onClick={() => setIsOpen(false)}>
                        <Button 
                          variant="outline" 
                          className="w-full border-[#1E2A47] text-[#1E2A47]"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Shortlist
                          {shortlistCount > 0 && (
                            <span className="ml-2 bg-[#AD9660] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                              {shortlistCount}
                            </span>
                          )}
                        </Button>
                      </Link>
                      <Button 
                        className="flex-1 bg-[#AD9660] hover:bg-[#AD9660]/90 text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Consultation
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
