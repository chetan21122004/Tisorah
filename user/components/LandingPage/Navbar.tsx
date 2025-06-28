"use client"

import React from 'react'
import { Search, User, ShoppingBag, ChevronDown, Menu, PhoneCall, Facebook, Instagram, Linkedin, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useShortlist } from "@/lib/ShortlistContext"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"


// Mega menu data for 'Promotional Gifts'
const shopGiftsMenu = [
  {
    title: 'Edibles',
    items: [
      'Chocolates',
      'Yoga Bars',
      'Dry Fruits',
      'Snack',
      'Cookies',
      'Tea',
      'Coffee',
      'Granola',
      'Mouth Freshners',
      'Waffles',
      'Perfumes',
      'Green Tea',
      'Makhana',
      'Zafran',
      'Apple Chips',
      'Cookies Baked'
    ],
  },
  {
    title: 'Non-Edibles',
    items: [
      'Bottles',
      'Mugs',
      'Boxes',
      'Diyas',
      'Candles',
      'Plants',
      'Bags',
      'Stationery',
      'Home Décor',
      'Kitchen Appliances',
      'Electronic Appliances',
      'Handmade Soaps',
      'Incense Sticks',
      'Brass Items'
    ],
  },
  {
    title: 'Sub-Categories',
    items: [
      'Wooden Bottles',
      'Sippers',
      'Thermus',
      'Ceramic Mugs',
      'Patola Art Tray',
      'Duffle Bags',
      'Handbags',
      'Pens',
      'Diary',
      'Key Chains',
      'Brass Infuser'
    ],
  }
];
  
// Navigation links for the main menu
const navLinks = [
  { label: 'Home ', href: '/' },
  { label: 'Bulk Orders', href: '/bulk-orders' },
  { label: 'Corporate Packages', href: '/packages' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Social media links
const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

// Mega menu data for 'Corporate Gifts'
const corporateGiftsMenu = [
  {
    title: 'By Occasion',
    items: [
      'Work Anniversary',
      'Employee Recognition',
      'Onboarding Kits',
      'Festival Gifts',
      'Event Gifts'
    ],
  },
  {
    title: 'By Category',
    items: [
      'Executive Gifts',
      'Team Gifts',
      'Client Appreciation',
      'Welcome Kits',
      'Custom Branding'
    ],
  },
  {
    title: 'Special Solutions',
    items: [
      'Bulk Customization',
      'Branded Merchandise',
      'Sustainable Gifts',
      'Premium Collections',
      'International Shipping'
    ],
  }
];


const Navbar = () => {
    const menuRef = useRef<HTMLDivElement>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { shortlist } = useShortlist()
    const [searchQuery, setSearchQuery] = useState('')
    const pathname = usePathname()
    const router = useRouter()

  // Animate the mega menu popup when it appears
  useGSAP(() => {
    if (menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.4, 
          ease: "power3.out",
          stagger: {
            amount: 0.1,
            from: "start"
          }
        }
      );

      // Animate the menu items with staggered effect
      const menuItems = menuRef.current.querySelectorAll('li');
      gsap.fromTo(
        menuItems,
        { opacity: 0, x: -10 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.3, 
          stagger: 0.03,
          delay: 0.2,
          ease: "power2.out" 
        }
      );

      // Animate the headers
      const headers = menuRef.current.querySelectorAll('div[class*="text-[16px]"]');
      gsap.fromTo(
        headers,
        { opacity: 0, y: -5 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.3,
          stagger: 0.1,
          delay: 0.1,
          ease: "power2.out" 
        }
      );
    }
  }, { scope: menuRef, dependencies: [] });
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
    
  return (
    <div className="sticky top-0 left-0 bg-white z-50">
    

      <header className="shadow-sm">
        {/* Desktop Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 hidden md:block">
          <div className="flex items-center justify-between h-20">
            {/* Logo at left */}
            <div className="flex items-center flex-col justify-center flex-shrink-0 gap-0">
              <Link href="/" className='flex items-center justify-center flex-col'>
                <Image src="/logo.png" alt="BoxUp Logo" width={220} height={40} className=" w-auto h-[80px]" />
              </Link>
            </div>

            {/* Desktop search and icons */}
            <div className="hidden md:flex items-center space-x-6">
              <form onSubmit={handleSearch} className="relative w-[300px]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 focus:ring-0 py-6 rounded-3xl outline-none border bg-gray-50 hover:border-gray-200 transition-colors"
                />
              </form>
              
              <div className="flex items-center space-x-4">
                <Link href="/quote">
                  <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
                    Request Quote
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-gray-700" />
                <div className="flex flex-col">
                  <span className="text-md font-semibold text-gray-700">+9194016464</span>
                  <span className="text-xs tracking-tight font-light text-gray-500">Call us for bulk orders</span>
                </div>
              </div>
              <Link href="/account">
                <User className="h-7 w-7 hover:opacity-60 transition-all duration-300 text-gray-700" />
              </Link>
              <Link href="/shortlist" className="relative">
                <ShoppingBag className="h-7 w-7 hover:opacity-60 transition-all duration-300 text-gray-700" />
                {shortlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-[#AD9660] text-white text-xs h-5 w-5 flex items-center justify-center rounded-full p-0">
                    {shortlist.length}
                  </Badge>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden p-4 flex items-center justify-between">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2 rounded-md text-gray-700"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link href="/" className="flex items-center justify-center">
            <Image src="/logo.png" alt="Tisorah Logo" width={140} height={30} className="w-auto h-[50px]" />
          </Link>
          
          <div className="flex items-center gap-3">
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5 text-gray-700" />
            </Link>
            <Link href="/shortlist" className="relative" aria-label="Shortlist">
              <ShoppingBag className="h-5 w-5 text-gray-700" />
              {shortlist.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-[#AD9660] text-white text-xs h-4 w-4 flex items-center justify-center rounded-full p-0">
                  {shortlist.length}
                </Badge>
              )}
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <Image src="/logo.png" alt="Tisorah Logo" width={140} height={30} className="w-auto h-[50px]" />
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-700"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <form onSubmit={handleSearch} className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-2 text-sm rounded-lg w-full"
                />
              </form>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <Link 
                      key={index} 
                      href={link.href}
                      className={`block py-2 border-b border-gray-100 text-base ${
                        pathname === link.href ? 'text-[#AD9660] font-medium' : 'text-gray-700'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <Link 
                    href="/quote"
                    className="block w-full py-3 px-4 bg-[#AD9660] text-white text-center rounded-md font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Request Quote
                  </Link>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <PhoneCall className="h-4 w-4 text-[#AD9660]" />
                    <div>
                      <a href="tel:+9194016464" className="text-sm font-medium">+91 94016464</a>
                      <p className="text-xs text-gray-500">Call us for bulk orders</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#AD9660]" />
                    <a href="mailto:info@tisorah.com" className="text-sm">info@tisorah.com</a>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    {socialLinks.map((social, index) => (
                      <Link 
                        key={index} 
                        href={social.href}
                        aria-label={social.label}
                        className="bg-gray-100 p-2 rounded-full"
                      >
                        <social.icon className="h-4 w-4 text-gray-700" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NavigationMenu className="py-2">
              <NavigationMenuList className="flex justify-between w-full">
                {/* Regular navigation links */}
                {navLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-[#AD9660] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          pathname === link.href ? 'text-[#AD9660]' : 'text-gray-700'
                        }`}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                {/* Promotional Gifts Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-[#AD9660]">
                    Promotional Gifts
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div ref={menuRef} className="w-[800px] p-6 grid grid-cols-3 gap-6">
                      {shopGiftsMenu.map((section, index) => (
                        <div key={index}>
                          <div className="text-[16px] font-medium text-gray-700 mb-3">{section.title}</div>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <Link href={`/products?category=${encodeURIComponent(item.toLowerCase())}`} className="text-sm text-gray-600 hover:text-[#AD9660]">
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Corporate Gifts Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-[#AD9660]">
                    Corporate Gifts
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div ref={menuRef} className="w-[800px] p-6 grid grid-cols-3 gap-6">
                      {corporateGiftsMenu.map((section, index) => (
                        <div key={index}>
                          <div className="text-[16px] font-medium text-gray-700 mb-3">{section.title}</div>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <Link href={`/products?category=${encodeURIComponent(item.toLowerCase())}`} className="text-sm text-gray-600 hover:text-[#AD9660]">
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar