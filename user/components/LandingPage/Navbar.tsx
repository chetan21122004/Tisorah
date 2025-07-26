"use client"

import React from 'react'
import { Search, User, ShoppingBag, ChevronDown, Menu, PhoneCall, Facebook, Instagram, Linkedin, Mail, X, Sparkles } from "lucide-react"
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
import { useRef, useState, useEffect, useMemo } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useShortlist } from "@/lib/ShortlistContext"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { useActiveCategories } from "@/hooks/use-active-categories"

// Update the navigation links array
const navLinks = [
  { label: 'Home', href: '/' },
  // { label: 'Bulk Orders', href: '/bulk-orders' },
  // { label: 'Corporate Packages', href: '/packages' },
  // { label: 'Portfolio', href: '/portfolio' },
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

// Popular search terms and suggestions
const popularSearches = [
  'Chocolate', 'Coffee', 'Tea', 'Mugs', 'Bottles', 'Bags', 'Candles', 
  'Plants', 'Diyas', 'Dry Fruits', 'Cookies', 'Stationery', 'Home Décor'
];

// Highlight matching text in search results
const highlightMatch = (text: string, searchTerm: string) => {
  if (!searchTerm || searchTerm.length < 2) return text
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
        {part}
      </mark>
    ) : part
  )
}

const Navbar = () => {
    const menuRef = useRef<HTMLDivElement>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { shortlist } = useShortlist()
    const [searchQuery, setSearchQuery] = useState('')
    const [mobileSearchQuery, setMobileSearchQuery] = useState('')
    const [showDesktopSuggestions, setShowDesktopSuggestions] = useState(false)
    const [showMobileSuggestions, setShowMobileSuggestions] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { 
      categories, 
      loading, 
      error, 
      getSecondaryCategories, 
      getTertiaryCategories 
    } = useActiveCategories()

    // Generate search suggestions based on categories and popular searches
    const getSearchSuggestions = (query: string) => {
      if (!query || query.length < 2) return []
      
      const suggestions = new Set<string>()
      const lowerQuery = query.toLowerCase()
      
      // Add matching popular searches
      popularSearches.forEach(term => {
        if (term.toLowerCase().includes(lowerQuery)) {
          suggestions.add(term)
        }
      })
      
      // Add matching categories
      if (!loading && !error) {
        // Add secondary categories
        const allSecondaryCategories = [
          ...getSecondaryCategories('edible'),
          ...getSecondaryCategories('non_edible')
        ]
        
        allSecondaryCategories.forEach(category => {
          if (category.name.toLowerCase().includes(lowerQuery)) {
            suggestions.add(category.name)
          }
        })
        
        // Add tertiary categories
        allSecondaryCategories.forEach(category => {
          const tertiaryCategories = getTertiaryCategories(category.id)
          tertiaryCategories.forEach(tertiary => {
            if (tertiary.name.toLowerCase().includes(lowerQuery)) {
              suggestions.add(tertiary.name)
            }
          })
        })
      }
      
      return Array.from(suggestions).slice(0, 8)
    }

    // Get suggestions for desktop search
    const desktopSuggestions = useMemo(() => 
      getSearchSuggestions(searchQuery), 
      [searchQuery, categories, loading, error]
    )

    // Get suggestions for mobile search
    const mobileSuggestions = useMemo(() => 
      getSearchSuggestions(mobileSearchQuery), 
      [mobileSearchQuery, categories, loading, error]
    )

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
  
  // Handle desktop search form submission
  const handleDesktopSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowDesktopSuggestions(false)
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Handle mobile search form submission
  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (mobileSearchQuery.trim()) {
      setShowMobileSuggestions(false)
      setMobileMenuOpen(false)
      router.push(`/products?search=${encodeURIComponent(mobileSearchQuery.trim())}`)
    }
  }

  // Handle suggestion selection for desktop
  const handleDesktopSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowDesktopSuggestions(false)
    // Immediately navigate to products page with the selected suggestion
    router.push(`/products?search=${encodeURIComponent(suggestion)}`)
  }

  // Handle suggestion selection for mobile
  const handleMobileSuggestionSelect = (suggestion: string) => {
    setMobileSearchQuery(suggestion)
    setShowMobileSuggestions(false)
    setMobileMenuOpen(false)
    // Immediately navigate to products page with the selected suggestion
    router.push(`/products?search=${encodeURIComponent(suggestion)}`)
  }

  // Clear desktop search
  const clearDesktopSearch = () => {
    setSearchQuery('')
    setShowDesktopSuggestions(false)
  }

  // Clear mobile search
  const clearMobileSearch = () => {
    setMobileSearchQuery('')
    setShowMobileSuggestions(false)
  }

  // Function to render dynamic mega menu
  const renderMegaMenu = (type: 'edible' | 'non_edible') => {
    if (loading) return <div className="p-8 text-center text-gray-500">Loading categories...</div>
    if (error) return <div className="p-8 text-center text-red-500">Error loading categories</div>

    const secondaryCategories = getSecondaryCategories(type)
    
    if (secondaryCategories.length === 0) {
      return <div className="p-8 text-center text-gray-500">No categories available</div>
    }

    // Group categories into columns (max 4 columns)
    const columnsCount = Math.min(4, secondaryCategories.length)
    const itemsPerColumn = Math.ceil(secondaryCategories.length / columnsCount)
    
    const columns = []
    for (let i = 0; i < columnsCount; i++) {
      const startIndex = i * itemsPerColumn
      const columnCategories = secondaryCategories.slice(startIndex, startIndex + itemsPerColumn)
      columns.push(columnCategories)
    }

    const gridColsClass = columnsCount === 1 ? 'grid-cols-1' : 
                         columnsCount === 2 ? 'grid-cols-2' : 
                         columnsCount === 3 ? 'grid-cols-3' : 'grid-cols-4'

    return (
      <div className={`relative p-8 grid ${gridColsClass} gap-8`}>
        {columns.map((columnCategories, columnIndex) => (
          <div key={columnIndex} className="space-y-6">
            {columnCategories.map((category) => {
              const tertiaryCategories = getTertiaryCategories(category.id)
              
              return (
                <div key={category.id} className="space-y-4">
                  <h3 className="text-[16px] font-medium text-gray-800 pb-2 border-b border-gray-100">
                    <Link 
                      href={`/products?search=${encodeURIComponent(category.name)}`}
                      className="hover:text-[#AD9660] transition-colors"
                    >
                      {category.name}
                    </Link>
                    <span className="text-xs text-gray-400 ml-2">({category.product_count})</span>
                  </h3>
                  <ul className="space-y-2">
                    {tertiaryCategories.length > 0 ? (
                      tertiaryCategories.map((tertiaryCategory) => (
                        <li key={tertiaryCategory.id} 
                            className="transform transition-transform duration-200 hover:translate-x-2"
                        >
                          <Link 
                            href={`/products?search=${encodeURIComponent(tertiaryCategory.name)}`}
                            className="text-sm text-gray-600 hover:text-[#AD9660] transition-all duration-200 flex items-center group"
                          >
                            <span className="h-[2px] w-0 bg-[#AD9660] group-hover:w-3 transition-all duration-200 mr-0 group-hover:mr-2 opacity-0 group-hover:opacity-100"></span>
                            {tertiaryCategory.name}
                            <span className="text-xs text-gray-400 ml-1">({tertiaryCategory.product_count})</span>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="transform transition-transform duration-200 hover:translate-x-2">
                        <Link 
                          href={`/products?search=${encodeURIComponent(category.name)}`}
                          className="text-sm text-gray-600 hover:text-[#AD9660] transition-all duration-200 flex items-center group"
                        >
                          <span className="h-[2px] w-0 bg-[#AD9660] group-hover:w-3 transition-all duration-200 mr-0 group-hover:mr-2 opacity-0 group-hover:opacity-100"></span>
                          View All {category.name}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )
            })}
          </div>
        ))}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#AD9660]/20 via-[#AD9660]/40 to-[#AD9660]/20"></div>
      </div>
    )
  }

  // Render search suggestions dropdown
  const renderSearchSuggestions = (suggestions: string[], onSelect: (suggestion: string) => void, isMobile = false) => (
    <div className={`absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto ${isMobile ? 'rounded-lg' : ''}`}>
      <div className="p-2">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Sparkles className="w-3 h-3" />
          <span>Suggestions</span>
        </div>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onMouseDown={(e) => {
              // Prevent blur event from firing before click
              e.preventDefault()
            }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onSelect(suggestion)
            }}
            className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm transition-colors duration-150 flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-3 h-3 text-gray-400" />
            <span>{highlightMatch(suggestion, isMobile ? mobileSearchQuery : searchQuery)}</span>
          </button>
        ))}
      </div>
    </div>
  )
    
  return (
    <div className="sticky top-0 left-0 bg-white z-50">
    

      <header className="shadow-sm">
        {/* Desktop Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 hidden md:block">
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo at left */}
            <div className="flex items-center flex-col justify-center flex-shrink-0 gap-0">
              <Link href="/" className='flex items-center justify-center flex-col'>
                <div className="font-serif text-3xl tracking-wide text-[#323433]">
                  <span className="font-light">Tisorah</span>
                  <span className="text-[#AD9660] font-medium">Box</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-500 font-light">Premium Corporate Gifts</div>
              </Link>
            </div>

            {/* Desktop search and icons */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <form onSubmit={handleDesktopSearch} className="relative w-[300px]">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Search products, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowDesktopSuggestions(searchQuery.length >= 2)}
                    onBlur={() => setTimeout(() => setShowDesktopSuggestions(false), 150)}
                    className="pl-12 pr-10 focus:ring-0 py-2 rounded-3xl outline-none border bg-gray-50 hover:border-gray-200 transition-colors"
                  />
                  {/* Clear search button */}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearDesktopSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </form>
                
                {/* Desktop Search Suggestions */}
                {showDesktopSuggestions && desktopSuggestions.length > 0 && 
                  renderSearchSuggestions(desktopSuggestions, handleDesktopSuggestionSelect)
                }
              </div>
              
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
                  <span className="text-md font-semibold text-gray-700">+91 93701 72365</span>
                  <span className="text-xs tracking-tight font-light text-gray-500">Call us for bulk orders</span>
                </div>
              </div>
           
           
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
            <div className="font-serif text-2xl tracking-wide text-[#323433]">
              <span className="font-light">Tisorah</span>
              <span className="text-[#AD9660] font-medium">Box</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link href="/products" aria-label="Search">
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
                <div className="font-serif text-2xl tracking-wide text-[#323433]">
                  <span className="font-light">Tisorah</span>
                  <span className="text-[#AD9660] font-medium">Box</span>
                </div>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-700"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="relative mb-6">
                <form onSubmit={handleMobileSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search products, categories..."
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                                         onFocus={() => setShowMobileSuggestions(mobileSearchQuery.length >= 2)}
                     onBlur={() => setTimeout(() => setShowMobileSuggestions(false), 150)}
                    className="pl-10 pr-10 py-3 text-sm rounded-lg w-full border-2 border-gray-200 focus:border-[#AD9660] transition-colors"
                  />
                  {/* Clear search button */}
                  {mobileSearchQuery && (
                    <button
                      type="button"
                      onClick={clearMobileSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </form>
                
                {/* Mobile Search Suggestions */}
                {showMobileSuggestions && mobileSuggestions.length > 0 && 
                  renderSearchSuggestions(mobileSuggestions, handleMobileSuggestionSelect, true)
                }
              </div>
              
              <div className="space-y-6">
                {/* Mobile Category Links */}
                {!loading && !error && (
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-2">
                      <h3 className="font-medium text-gray-800 mb-2">Edible Gifts</h3>
                      {getSecondaryCategories('edible').map((category) => (
                        <Link
                          key={category.id}
                          href={`/products?search=${encodeURIComponent(category.name)}`}
                          className="block py-1 text-sm text-gray-600 hover:text-[#AD9660]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {category.name} ({category.product_count})
                        </Link>
                      ))}
                    </div>
                    
                    <div className="border-b border-gray-100 pb-2">
                      <h3 className="font-medium text-gray-800 mb-2">Non-Edible Gifts</h3>
                      {getSecondaryCategories('non_edible').map((category) => (
                        <Link
                          key={category.id}
                          href={`/products?search=${encodeURIComponent(category.name)}`}
                          className="block py-1 text-sm text-gray-600 hover:text-[#AD9660]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {category.name} ({category.product_count})
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
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
                      <a href="tel:+919370172365" className="text-sm font-medium">+91 93701 72365</a>
                      <p className="text-xs text-gray-500">Call us for bulk orders</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#AD9660]" />
                    <a href="mailto:hello@tisorahbox.com" className="text-sm">hello@tisorahbox.com</a>
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
          <div className="max-w-7xl items-center justify-center flex mx-auto px-4 sm:px-6 lg:px-8">
            <NavigationMenu className="py-0">
              <NavigationMenuList className="flex justify-between w-full">

       {/* Edible Gifts Dropdown */}
       <NavigationMenuItem className="relative">
                  <button className="peer inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#AD9660] transition-colors">
                    Edible Gifts <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
                  </button>
                  <div className="absolute invisible opacity-0 peer-hover:visible mt-2
                  peer-hover:opacity-100 hover:visible hover:opacity-100 top-[90%]
                   w-[1000px] bg-white shadow-lg rounded-xl 
                   transition-all duration-300 transform origin-top peer-hover:translate-y-0 
                   translate-y-[-20px] z-50 border border-gray-100">
                    {renderMegaMenu('edible')}
                  </div>
                </NavigationMenuItem>


  {/* Non-Edible Gifts Dropdown */}
  <NavigationMenuItem className="relative">
                  <button className="peer inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#AD9660] transition-colors">
                    Non-Edible Gifts <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
                  </button>
                  <div className="absolute invisible opacity-0 peer-hover:visible mt-2
                  peer-hover:opacity-100 hover:visible hover:opacity-100 top-[90%]
                   w-[1000px] bg-white shadow-lg rounded-xl 
                   transition-all duration-300 transform origin-top peer-hover:translate-y-0 
                   translate-y-[-20px] z-50 border border-gray-100">
                    {renderMegaMenu('non_edible')}
                  </div>
                </NavigationMenuItem>

         

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
                
              
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar