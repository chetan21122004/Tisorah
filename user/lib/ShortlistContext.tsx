"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from '@/components/ui/use-toast'

export interface ShortlistItem {
  id: string
  name: string
  price: string
  originalPrice: string
  image: string
  rating: number
  reviews: number
  discount?: string
  quantity: number
  moq: number
  category?: string
}

interface ShortlistContextType {
  shortlist: ShortlistItem[]
  addToShortlist: (item: ShortlistItem) => void
  removeFromShortlist: (itemId: string) => void
  clearShortlist: () => void
  isInShortlist: (itemId: string) => boolean
  updateQuantity: (itemId: string, quantity: number) => void
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined)

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [shortlist, setShortlist] = useState<ShortlistItem[]>([])

  // Load shortlist from localStorage on mount
  useEffect(() => {
    const savedShortlist = localStorage.getItem('shortlist')
    if (savedShortlist) {
      try {
        setShortlist(JSON.parse(savedShortlist))
      } catch (error) {
        console.error('Error loading shortlist:', error)
      }
    }
  }, [])

  // Save shortlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shortlist', JSON.stringify(shortlist))
  }, [shortlist])

  const addToShortlist = (item: ShortlistItem) => {
    setShortlist(prev => {
      const existingItem = prev.find(i => i.id === item.id)
      if (existingItem) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)
      }
      return [...prev, item]
    })
    toast({
      title: "Added to Shortlist",
      description: `${item.name} has been added to your shortlist.`,
    })
  }

  const removeFromShortlist = (itemId: string) => {
    setShortlist(prev => prev.filter(item => item.id !== itemId))
    toast({
      title: "Removed from Shortlist",
      description: "Item has been removed from your shortlist.",
    })
  }

  const clearShortlist = () => {
    setShortlist([])
    toast({
      title: "Shortlist Cleared",
      description: "All items have been removed from your shortlist.",
    })
  }

  const isInShortlist = (itemId: string) => {
    return shortlist.some(item => item.id === itemId)
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    setShortlist(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  return (
    <ShortlistContext.Provider value={{
      shortlist,
      addToShortlist,
      removeFromShortlist,
      clearShortlist,
      isInShortlist,
      updateQuantity
    }}>
      {children}
    </ShortlistContext.Provider>
  )
}

export function useShortlist() {
  const context = useContext(ShortlistContext)
  if (context === undefined) {
    throw new Error('useShortlist must be used within a ShortlistProvider')
  }
  return context
} 