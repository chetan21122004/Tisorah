"use client"

import React from 'react'
import { Search, User, ShoppingBag, ChevronDown, Menu } from "lucide-react"
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


// Mega menu data for 'Shop Gifts'
const shopGiftsMenu = [
    {
      title: 'SHOP BY RECIPIENT',
      items: [
        'Gifts for Women', 'Gifts for Men', 'Gifts for Husband', 'Gifts for Wife',
        'Gifts for Boyfriend', 'Gifts for Girlfriend', 'Gifts for Parents',
        'Gifts for Couple', 'Gifts for Moms to be', 'Gifts for Kids', 'Baby Gifts',
      ],
    },
    {
      title: 'SHOP BY OCCASION',
      items: [
        'Thank You', 'Birthday', 'Anniversary / Wedding', 'Housewarming Gifts',
        'Get Well Soon Gifts', 'Celebrations Gift Box', 'Gifts for New Born Baby', 'Self Care Hampers',
      ],
    },
    {
      title: 'SHOP BY INTEREST',
      items: [
        'Love', 'Dry Fruits', 'Gourmet', 'Gifts for Coffee Lovers', 'Chocolate Gift Boxes',
        'Gifts for Fitness Freaks', 'Eco-friendly Gifts', 'Gifts for Colleagues',
      ],
    },
    {
      title: 'BY PRICE',
      items: [
        'Gifts Under Rs 999', 'Rs 1000 to Rs 2000', 'Rs 2000 to Rs 3000', 'Above Rs 3000+',
      ],
    },
    {
      title: '',
      items: [
        'PERSONALISED GIFTS', 'HOME DECOR GIFTS', 'NEW ARRIVALS', 'LUXE COLLECTIVE',
        'BEST SELLERS', 'GIFT CARDS', 'SAME DAY DELIVERY IN BANGALORE',
      ],
    },
  ];
  
  // Navigation links for the main menu (excluding Shop Gifts)
  const navLinks = [
    { label: 'Make Your Own Hamper', href: '#' },
    { label: 'All Gifts', href: '#' },
    { label: 'New Arrivals', href: '#' },
    { label: 'Corporate Gifting', href: '#' },
  ];


const Navbar = () => {
    const menuRef = useRef(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Animate the mega menu popup when it appears
  useGSAP(() => {
    if (menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: 20 },
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
              <User className="h-7 w-7 hover:opacity-60 transition-all duration-300 text-gray-700" />
              <ShoppingBag className="h-7 w-7 hover:opacity-60 transition-all duration-300 text-gray-700" />
            </div>

            {/* Mobile right icons only */}
            <div className="flex md:hidden items-center space-x-4">
              <User className="h-7 w-7 hover:opacity-60 transition-all duration-300 text-gray-700" />
              <ShoppingBag className="h-7 w-7 hover:opacity-60 transition-all duration-300 text-gray-700" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu - Desktop only */}
      <nav className="border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 lg:px-8">
          <div className="flex items-center justify-end space-x-8 ">
            <NavigationMenu>
              <NavigationMenuList className="space-x-8">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-gray-900 bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                    Shop Gifts
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="fixed left-1/2 top-52 z-50 flex justify-center items-center -translate-x-1/2 w-auto">
                      <div
                        ref={menuRef}
                        key={Math.random()} // this retriggers on each open
                        className="flex gap-20 px-6 py-6 bg-white shadow-xl rounded-xl z-50"
                      >
                        {shopGiftsMenu.map((col, idx) => (
                          <div key={idx} className="min-w-[150px]">
                            {col.title && (
                              <div className="font-serif text-[15px] mb-1 tracking-tight leading-tight">{col.title}</div>
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
                      className="text-md font-medium text-gray-700 hover:text-gray-900 py-2 flex flex-col items-center "
                    >
                      <p className="group">{link.label}</p>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
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