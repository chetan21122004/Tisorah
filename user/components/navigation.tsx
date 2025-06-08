"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
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
import { Menu, Search, Heart, Phone, ArrowRight, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { getShortlistCount } from "@/lib/shortlist-client"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [shortlistCount, setShortlistCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Popular search suggestions
  const popularSearches = [
    { term: "Executive Gifts", url: "/search?q=executive" },
    { term: "Awards", url: "/search?q=awards" },
    { term: "Diwali Collection", url: "/search?q=diwali" },
    { term: "Corporate Hampers", url: "/search?q=hampers" },
  ]

  useEffect(() => {
    // Initial count
    setShortlistCount(getShortlistCount())

    // Listen for shortlist updates
    const handleShortlistUpdate = () => {
      setShortlistCount(getShortlistCount())
    }

    // Focus search input when opened
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }

    window.addEventListener("shortlistUpdated", handleShortlistUpdate)
    
    return () => {
      window.removeEventListener("shortlistUpdated", handleShortlistUpdate)
    }
  }, [isSearchOpen])

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

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
    <>
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
                      className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral-50 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                        pathname === "/" ? "text-[#AD9660] font-semibold" : "text-[#1E2A47]"
                      }`}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="h-12 px-6 rounded-lg hover:bg-neutral-50 hover:text-[#AD9660] transition-all duration-200 text-[#1E2A47]"
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
                    className="h-12 px-6 rounded-lg hover:bg-neutral-50 hover:text-[#AD9660] transition-all duration-200 text-[#1E2A47]"
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
                      className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral-50 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
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
                      className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral-50 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                        pathname === "/products" ? "text-[#AD9660] font-semibold" : "text-[#1E2A47]"
                      }`}
                    >
                      Products
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink 
                      className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral-50 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
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
                      className={`group inline-flex h-12 w-max items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral-50 hover:text-[#AD9660] focus:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                        pathname === "/contact" ? "text-[#AD9660] font-semibold" : "text-[#1E2A47]"
                      }`}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Search and Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-full hover:bg-neutral-100 text-[#1E2A47] hover:text-[#AD9660] transition-all duration-200"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
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
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-full hover:bg-neutral-100 text-[#1E2A47] hover:text-[#AD9660]"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
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
                        <Link href="/search" className="flex-1" onClick={() => setIsOpen(false)}>
                          <Button 
                            variant="outline" 
                            className="w-full border-[#1E2A47] text-[#1E2A47]"
                          >
                            <Search className="h-4 w-4 mr-2" />
                            Search
                          </Button>
                        </Link>
                      </div>
                      <Button 
                        className="w-full bg-[#AD9660] hover:bg-[#AD9660]/90 text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Request Consultation
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col">
          <div className="container mx-auto px-4 pt-8 pb-20">
            {/* Close button */}
            <div className="flex justify-end mb-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/10 h-10 w-10 rounded-full"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Search form */}
            <div className="max-w-3xl mx-auto w-full">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">
                Discover Exquisite Corporate Gifts
              </h2>
              
              <form onSubmit={handleSearchSubmit} className="mb-10">
                <div className="flex items-center relative">
                  <Search className="absolute left-5 text-neutral-400 h-5 w-5" />
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search for products, collections, or categories..."
                    className="pl-12 py-6 bg-white/10 border-0 text-white text-lg placeholder:text-neutral-400 rounded-full focus-visible:ring-[#AD9660] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="submit"
                    className="absolute right-2 bg-[#AD9660] hover:bg-[#AD9660]/90 text-white rounded-full"
                  >
                    Search
                  </Button>
                </div>
              </form>
              
              {/* Popular searches */}
              <div className="text-center">
                <h3 className="text-neutral-400 text-sm uppercase tracking-wider mb-4">Popular Searches</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {popularSearches.map((item, index) => (
                    <Link
                      key={index}
                      href={item.url}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      {item.term}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Categories quick access */}
              <div className="mt-16">
                <h3 className="text-neutral-400 text-sm uppercase tracking-wider mb-4 text-center">Browse Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={category.href}
                      className="group p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-center"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <h4 className="text-white font-medium mb-1">{category.name}</h4>
                      <p className="text-neutral-400 text-sm group-hover:text-neutral-300 transition-colors">
                        {category.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
