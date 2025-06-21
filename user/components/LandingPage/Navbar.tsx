"use client"

import React from 'react'
import { Search, User, ShoppingBag, ChevronDown, Menu, PhoneCall } from "lucide-react"
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


// Mega menu data for 'Promotional Gifts'
const shopGiftsMenu = [
  {
    title: 'Work & Desk Essentials',
    items: [
      'Desk Essentials', 'Journal', 'Pens', 'Stationery & Accessories',
    ],
  },
  {
    title: 'Home & Living',
    items: [
      'Planters & Pots', 'Photo Frames', 'Lights & Lamps', 'Home & Decor', 'Fragrance',
    ],
  },
  {
    title: 'Lifestyle & Accessories',
    items: [
      'Travel', 'Keychains', 'Lifestyle',
    ],
  },
  {
    title: 'Gourmet & Edible Treats',
    items: [
      'Chocolates', 'Coffee & Tea Delights', 'Gourmet Snacks', 'Healthy Munchies', 'Nuts & Seeds',
    ],
  },
  {
    title: 'Drinkware',
    items: [
      'Drinkware',
    ],
  },
  {
    title: 'Electronic Gadgets',
    items: [
      'Electronic Gadgets',
    ],
  },
  {
    title: 'Eco-Friendly Gifts',
    items: [
      'Eco-Friendly Gifts',
    ],
  },
];
  
// Navigation links for the main menu (excluding Shop Gifts)
const navLinks = [
  { label: 'Bulk Gifting', href: '#' },
  { label: 'Client Gifting', href: '#' },
  { label: 'Employee Gifting', href: '#' },
  { label: 'Case Studies', href: '#' },
  { label: 'Bulk Enquiry', href: '#' },
  { label: 'About Us', href: '#' },
];

// Mega menu data for 'Corporate Gifts'
const corporateGiftsMenu = [
  {
    title: 'By Celebration',
    items: [
      'Work Anniversary Gifts', 'Rewards and Recognition', 'Executive Gifts',
    ],
  },
  {
    title: 'By Price',
    items: [
      'Under 1000', 'Under 2500', 'Under 3000', 'Above 3000',
    ],
  },
  {
    title: 'Welcome Kit',
    items: [
      'Welcome Kit' ,'Real Estate Gifts','Branded Gifts','Eco Friendly Gifts','Thank You Gifts','Thank You Gifts','Architecture Gifts'
    ],
  },
];


const Navbar = () => {
    const menuRef = useRef(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { shortlist } = useShortlist()

  // Animate the mega menu popup when it appears
  useGSAP(() => {
    if (menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, { scope: menuRef, dependencies: [] });
  
    
    
  return (
    <div className="sticky top-0 left-0 bg-white z-50">
     <div className='bg-black'>
     <div className="w-2/3 mx-auto  md:w-full bg-black text-white text-center py-3 text-md font-light tracking-wide">
        WE DO BULK & CORPORATE GIFTING TOO &nbsp; <span className="underline cursor-pointer font-semibold">Enquire Now</span>
      </div>
     </div>

      <header className="border-b border-gray-100 px-4">
        <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo at left */}
            <div className="flex items-center flex-col flex-shrink-0 gap-0">
              <Image src="/logo.png" alt="BoxUp Logo" width={220} height={40} className="-mb-2 w-auto h-[80px]" />
              <p className="text-xs opacity-80 hidden sm:block">luxary gifiting</p>
            </div>

            {/* Hamburger for mobile */}
            <div className="flex-1 flex justify-end md:hidden">
              <button
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open menu"
              >
                <Menu className="h-7 w-7 text-gray-700" />
              </button>
            </div>

            {/* Desktop search and icons */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative w-68">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="pl-12 focus:ring-0 py-6 rounded-3xl outline-none border bg-gray-50 hover:border-gray-200 transition-colors"
                />
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-gray-700" />
                <div className="flex flex-col">
                  <span className="text-md font-semibold text-gray-700">+9194016464</span>
                  <span className="text-xs tracking-tight font-light text-gray-500">Call us for bulk orders</span>
                </div>
              </div>
              <User className="h-7 w-7 hover:opacity-60 transition-all duration-300 text-gray-700" />
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

            {/* Mobile right icons only */}
            <div className="flex md:hidden items-center space-x-4">
              <User className="h-7 w-7 hover:opacity-60 transition-all duration-300 text-gray-700" />
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
      </header>

      {/* Navigation Menu - Desktop only */}
      <nav className="border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 lg:px-8">
          <div className="flex items-center justify-end space-x-4 ">
            <NavigationMenu>
              <NavigationMenuList className="space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs font-medium text-gray-700 hover:text-gray-900 bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                  Promotional Gifts
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="fixed left-1/2 top-44 z-50 flex justify-center items-center -translate-x-1/2 w-auto">
                      <div
                        ref={menuRef}
                        key={Math.random()} // this retriggers on each open
                        className="flex gap-10 font-gallery px-6 py-6 bg-white shadow-xl rounded-xl z-50"
                      >
                        {shopGiftsMenu.map((col, idx) => (
                          <div key={idx} className="min-w-[150px]">
                            {col.title && (
                              <div className=" text-[15px] mb-1 tracking-tight font-gallery  leading-tight">{col.title}</div>
                            )}
                            <ul className="space-y-0.5">
                              {col.items.map((item, i) => (
                                <li key={i}>
                                  <NavigationMenuLink className="block px-1 py-0.5 text-[14px] leading-tight text-gray-800 hover:underline transition-all duration-300 cursor-pointer">
                                    {item}
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>


                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs font-medium text-gray-700 hover:text-gray-900 bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                 Corporate Gifts
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="fixed left-1/2 top-44 z-50 flex justify-center items-center -translate-x-1/2 w-auto">
                      <div
                        ref={menuRef}
                        key={Math.random()} // this retriggers on each open
                        className="flex gap-10 font-gallery px-6 py-6 bg-white shadow-xl rounded-xl z-50"
                      >
                        {corporateGiftsMenu.map((col, idx) => (
                          <div key={idx} className="min-w-[150px]">
                            {col.title && (
                              <div className=" text-[15px] mb-1 tracking-tight font-gallery  leading-tight">{col.title}</div>
                            )}
                            <ul className="space-y-0.5">
                              {col.items.map((item, i) => (
                                <li key={i}>
                                  <NavigationMenuLink className="block px-1 py-0.5 text-[14px] leading-tight text-gray-800 hover:underline transition-all duration-300 cursor-pointer">
                                    {item}
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>




              
                {navLinks.map((link, idx) => (
                  <NavigationMenuItem key={idx}>
                    <NavigationMenuLink
                      href={link.href}
                      className="text-xs font-medium text-gray-700 hover:text-gray-900 py-24flex flex-col items-center "
                    >
                      <p className={`${idx % 2 ===0 ? 'underline' :'none'}`}>{link.label}</p>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <button className='text-xs font-medium text-white bg-black/80 px-5 py-2 rounded-[100px] hover:text-gray-900 py-24flex flex-col items-center '>download catlog</button>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40" onClick={() => setMobileMenuOpen(false)} />
      )}
      {/* Mobile menu drawer */}
      <div className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col p-6 pt-10 space-y-6">
          <button className="self-end mb-4" onClick={() => setMobileMenuOpen(false)}>
            <span className="text-2xl">&times;</span>
          </button>
          <div className="flex flex-col space-y-4">
            <div className="font-bold text-lg mb-2">Menu</div>
            <div className="border-b mb-2" />
            <div className="font-medium text-gray-700">Shop Gifts</div>
            {navLinks.map((link, idx) => (
              <a key={idx} href={link.href} className="text-gray-700 py-2 hover:underline">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar