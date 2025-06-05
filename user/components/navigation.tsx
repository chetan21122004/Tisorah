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
import { Menu, Gift, Search, Heart, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { getShortlistCount } from "@/lib/shortlist-client"

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
    return () => window.removeEventListener("shortlistUpdated", handleShortlistUpdate)
  }, [])

  const categories = [
    { name: "Executive Onboarding", href: "/categories/onboarding" },
    { name: "Festival Celebrations", href: "/categories/festivals" },
    { name: "Recognition & Awards", href: "/categories/recognition" },
    { name: "Corporate Events", href: "/categories/events" },
    { name: "Milestone Celebrations", href: "/categories/birthdays" },
  ]

  const services = [
    { name: "Bespoke Customization", href: "/customization" },
    { name: "Executive Collections", href: "/packages" },
    { name: "Volume Solutions", href: "/bulk-orders" },
    { name: "Consultation Services", href: "/quote" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
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
                  <NavigationMenuLink className="group inline-flex h-12 w-max items-center justify-center rounded-lg bg-background px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral hover:text-primary focus:bg-neutral focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral data-[state=open]:bg-neutral">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-12 px-6 rounded-lg hover:bg-neutral hover:text-primary data-[state=open]:bg-neutral data-[state=open]:text-primary">
                  Collections
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[450px] gap-2 p-6 bg-white shadow-xl rounded-xl border-0">
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-primary mb-2">Curated Collections</h4>
                      <p className="text-xs text-neutral-500">Sophisticated gifts for every corporate occasion</p>
                    </div>
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-neutral hover:text-primary focus:bg-neutral focus:text-primary border border-transparent hover:border-neutral-300"
                      >
                        <div className="text-sm font-medium leading-none">{category.name}</div>
                        <div className="text-xs text-neutral-500 mt-1">Premium corporate solutions</div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-12 px-6 rounded-lg hover:bg-neutral hover:text-primary data-[state=open]:bg-neutral data-[state=open]:text-primary">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[450px] gap-2 p-6 bg-white shadow-xl rounded-xl border-0">
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-primary mb-2">Exclusive Services</h4>
                      <p className="text-xs text-neutral-500">Comprehensive corporate gifting solutions</p>
                    </div>
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-neutral hover:text-primary focus:bg-neutral focus:text-primary border border-transparent hover:border-neutral-300"
                      >
                        <div className="text-sm font-medium leading-none">{service.name}</div>
                        <div className="text-xs text-neutral-500 mt-1">Professional excellence</div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/portfolio" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-12 w-max items-center justify-center rounded-lg bg-background px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral hover:text-primary focus:bg-neutral focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral data-[state=open]:bg-neutral">
                    Portfolio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-12 w-max items-center justify-center rounded-lg bg-background px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral hover:text-primary focus:bg-neutral focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral data-[state=open]:bg-neutral">
                    Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-12 w-max items-center justify-center rounded-lg bg-background px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral hover:text-primary focus:bg-neutral focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral data-[state=open]:bg-neutral">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-12 w-max items-center justify-center rounded-lg bg-background px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral hover:text-primary focus:bg-neutral focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral data-[state=open]:bg-neutral">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4 group-focus-within:text-secondary transition-colors" />
              <Input
                type="search"
                placeholder="Discover exquisite gifts..."
                className="pl-12 w-72 h-12 rounded-xl border-neutral-300 focus:border-secondary focus:ring-secondary/20 bg-neutral-50 focus:bg-white transition-all duration-200"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-12 w-12 rounded-xl hover:bg-neutral hover:text-primary transition-all duration-200"
            >
              <Heart className="h-5 w-5" />
            </Button>
            {/* <Button className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white px-6 py-3 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
              <Phone className="h-4 w-4 mr-2" />
              Consultation
            </Button> */}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <div className="space-y-2">
                  <div className="text-lg font-medium">Collections</div>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block pl-4 text-sm text-neutral-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-medium">Services</div>
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block pl-4 text-sm text-neutral-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
                <Link href="/portfolio" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Portfolio
                </Link>
                <Link href="/products" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Products
                </Link>
                <Link href="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
                <Button className="bg-secondary hover:bg-secondary/90 mt-4">Consultation</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
