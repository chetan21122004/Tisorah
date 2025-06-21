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
     <div className='bg-black'>
       <div className="w-full mx-auto flex justify-between items-center px-4 md:px-8 bg-black text-white py-2 text-sm">
       
         <div className="flex items-center mx-auto ">
           <span>WE DO BULK & CORPORATE GIFTING TOO</span>
           <Link href="/quote">
             <Button size="sm" className="text-white m-1 border-white hover:text-black">
               Enquire Now
             </Button>
           </Link>
         </div>
       </div>
     </div>

      <header className="">
        {/* Desktop Header */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-0 pb-8 hidden md:block">
          <div className="flex ixtems-center justify-between h-20">
            {/* Logo at left */}
            <div className="flex items-center flex-col justify-center flex-shrink-0 gap-0">
              <Link href="/" className='flex items-center  flex-col'>
                <Image src="/logo.png" alt="BoxUp Logo" width={220} height={40} className="-mb-5 w-auto h-[80px]" />
                <span className="text-xs opacity-80 hidden mx-auto sm:block">Premium gifting</span>
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
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#AD9660] hover:bg-[#AD9660]"
                    variant="secondary"
                  >
                    {shortlist.length}
                  </Badge>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <div className="flex flex-col items-center justify-center">
              <Link href="/" className='flex items-center flex-col'>
                <Image src="/logo.png" alt="BoxUp Logo" width={150} height={40} />
                <span className="text-xs opacity-80 text-center -mt-5">Premium gifting</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/search">
                <Search className="h-6 w-6 text-gray-700" />
              </Link>
              <Link href="/shortlist" className="relative">
                <ShoppingBag className="h-6 w-6 text-gray-700" />
                {shortlist.length > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 bg-[#AD9660] hover:bg-[#AD9660]"
                    variant="secondary"
                  >
                    {shortlist.length}
                  </Badge>
                )}
              </Link>
            </div>
          </div>

        
        </div>
      </header>

      {/* Navigation Menu - Desktop only */}
      <nav className="border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 lg:px-8">
          <div className="flex items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-gray-900 bg-transparent hover:bg-transparent  data-[active]:bg-transparent data-[state=open]:bg-transparent">
                     Gift Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="fixed left-1/2 top-44 z-50 flex justify-center items-center -translate-x-1/2 w-auto">
                      <div
                        ref={menuRef}
                        key={Math.random()} // this retriggers on each open
                        className="flex gap-10 font-gallery px-8 py-8 bg-white shadow-xl rounded-xl z-50 border-t-2 border-[#AD9660]"
                      >
                        {/* Edibles Column */}
                        <div className="min-w-[200px]">
                          <div className="text-[16px] mb-3 tracking-tight font-gallery font-semibold leading-tight text-gray-800 border-b pb-2">Edibles</div>
                          <div className="grid grid-cols-2 gap-x-6">
                            <ul className="space-y-1.5">
                              {shopGiftsMenu[0].items.slice(0, Math.ceil(shopGiftsMenu[0].items.length/2)).map((item, i) => (
                                <li key={i}>
                                  <NavigationMenuLink className="flex items-center px-1 py-0.5 text-[14px] leading-tight text-gray-700 hover:text-[#AD9660] transition-colors duration-200 cursor-pointer">
                                    <span className="w-1 h-1 bg-[#AD9660] rounded-full mr-2 opacity-70"></span>
                                    {item}
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                            <ul className="space-y-1.5">
                              {shopGiftsMenu[0].items.slice(Math.ceil(shopGiftsMenu[0].items.length/2)).map((item, i) => (
                                <li key={i}>
                                  <NavigationMenuLink className="flex items-center px-1 py-0.5 text-[14px] leading-tight text-gray-700 hover:text-[#AD9660] transition-colors duration-200 cursor-pointer">
                                    <span className="w-1 h-1 bg-[#AD9660] rounded-full mr-2 opacity-70"></span>
                                    {item}
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {/* Non-Edibles Column */}
                        <div className="min-w-[180px]">
                          <div className="text-[16px] mb-3 tracking-tight font-gallery font-semibold leading-tight text-gray-800 border-b pb-2">Non-Edibles</div>
                          <ul className="space-y-1.5">
                            {shopGiftsMenu[1].items.map((item, i) => (
                              <li key={i}>
                                <NavigationMenuLink className="flex items-center px-1 py-0.5 text-[14px] leading-tight text-gray-700 hover:text-[#AD9660] transition-colors duration-200 cursor-pointer">
                                  <span className="w-1 h-1 bg-[#AD9660] rounded-full mr-2 opacity-70"></span>
                                  {item}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Sub-Categories Column */}
                        <div className="min-w-[180px]">
                          <div className="text-[16px] mb-3 tracking-tight font-gallery font-semibold leading-tight text-gray-800 border-b pb-2">Sub-Categories</div>
                          <ul className="space-y-1.5">
                            {shopGiftsMenu[2].items.map((item, i) => (
                              <li key={i}>
                                <NavigationMenuLink className="flex items-center px-1 py-0.5 text-[14px] leading-tight text-gray-700 hover:text-[#AD9660] transition-colors duration-200 cursor-pointer">
                                  <span className="w-1 h-1 bg-[#AD9660] rounded-full mr-2 opacity-70"></span>
                                  {item}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>


             




              
                {navLinks.map((link, idx) => (
                  <NavigationMenuItem key={idx}>
                    <Link 
                      href={link.href} 
                      className={`text-sm font-medium relative  py-2 px-1 ${
                        pathname === link.href ? 'text-[#AD9660]' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {link.label}
                      <span 
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#AD9660] transform origin-left transition-all duration-300 ease-out ${
                          pathname === link.href 
                            ? 'scale-x-100' 
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </Link>
                  </NavigationMenuItem>
                ))}

                <button className='text-xs font-medium text-white bg-black/80
                 px-5 py-2 rounded-[100px] hover:text-gray-900 py-24flex flex-col items-center '>
                  <Link href="/contact">Download catlog</Link>
                </button>
              </NavigationMenuList>
            </NavigationMenu>

          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <Image src="/logo.png" alt="BoxUp Logo" width={120} height={30} />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </form>

              <div className="flex items-center gap-2 py-2">
                <PhoneCall className="h-5 w-5 text-gray-700" />
                <div className="flex flex-col">
                  <span className="text-md font-semibold text-gray-700">+9194016464</span>
                  <span className="text-xs tracking-tight font-light text-gray-500">Call us for bulk orders</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-sm">Gifts Categories </p>
                {shopGiftsMenu.map((section, idx) => (
                  <div key={idx} className="pl-4 space-y-1">
                    <p className="text-sm text-gray-600">{section.title}</p>
                    {section.items.slice(0, 5).map((item, i) => (
                      <Link key={i} href="#" className="block text-sm text-gray-700 hover:text-gray-900 py-1">
                        {item}
                      </Link>
                    ))}
                    {section.items.length > 5 && (
                      <Link href="#" className="block text-sm text-blue-600 hover:text-blue-800 py-1">
                        View all ({section.items.length})
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className={`block text-sm font-medium py-2 relative ${
                      pathname === link.href 
                        ? 'text-[#AD9660]' 
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      {link.label}
                      {pathname === link.href && (
                        <span className="ml-2 w-1 h-4 bg-[#AD9660] rounded-full" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="space-y-2 pt-4">
                <Link href="/quote">
                  <Button className="w-full" variant="outline">
                    Request Quote
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Download Catalog
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link href="/account" className="flex items-center gap-2 text-gray-700">
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </Link>
                <Link href="/shortlist" className="flex items-center gap-2 text-gray-700 relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Shortlist</span>
                  {shortlist.length > 0 && (
                    <Badge 
                      className="absolute -top-2 left-4 h-5 w-5 flex items-center justify-center p-0 bg-[#AD9660] hover:bg-[#AD9660]"
                      variant="secondary"
                    >
                      {shortlist.length}
                    </Badge>
                  )}
                </Link>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, idx) => (
                <Link key={idx} href={social.href} className="text-gray-600 hover:text-gray-900">
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Categories Dropdown */}
      <div className="md:hidden border-t">
        <div className="p-4">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-2 rounded-md hover:bg-gray-50 transition-all">
              <span className="font-medium text-gray-800">Gift Categories</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="mt-3 space-y-4 bg-white rounded-md overflow-hidden transition-all max-h-0 group-open:max-h-[1000px] duration-500 ease-in-out">
              <div className="p-3 border-l-2 border-[#AD9660]">
                <h4 className="font-semibold text-sm text-gray-800">Edibles</h4>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {shopGiftsMenu[0].items.slice(0, 8).map((item, i) => (
                    <Link key={i} href="#" className="text-sm text-gray-700 hover:text-[#AD9660] py-1 transition-colors flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {item}
                    </Link>
                  ))}
                  {shopGiftsMenu[0].items.length > 8 && (
                    <Link href="#" className="text-sm text-[#AD9660] hover:text-[#8a7a4d] py-1 transition-colors mt-1 font-medium">
                      View all ({shopGiftsMenu[0].items.length})
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="p-3 border-l-2 border-[#AD9660]">
                <h4 className="font-semibold text-sm text-gray-800">Non-Edibles</h4>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {shopGiftsMenu[1].items.slice(0, 8).map((item, i) => (
                    <Link key={i} href="#" className="text-sm text-gray-700 hover:text-[#AD9660] py-1 transition-colors flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {item}
                    </Link>
                  ))}
                  {shopGiftsMenu[1].items.length > 8 && (
                    <Link href="#" className="text-sm text-[#AD9660] hover:text-[#8a7a4d] py-1 transition-colors mt-1 font-medium">
                      View all ({shopGiftsMenu[1].items.length})
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default Navbar