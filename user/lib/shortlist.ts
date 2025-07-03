"use client"

import { submitQuoteRequestToSupabase } from "./supabase"

export interface ShortlistItem {
  id: string
  name: string
  price: string
  originalPrice: string
  image: string
  rating: number
  reviews: number
  discount: string
  quantity: number
  moq: number
  category?: string
}

export interface QuoteRequest {
  name: string
  email: string
  phone: string
  company: string
  message: string
  budget?: string
  timeline?: string
  event_type?: string
  customization?: boolean
  branding?: boolean
  packaging?: boolean
  items: ShortlistItem[]
}

// Shortlist management functions
export const getShortlist = (): ShortlistItem[] => {
  if (typeof window === "undefined") return []
  try {
    const shortlist = localStorage.getItem("shortlist")
    return shortlist ? JSON.parse(shortlist) : []
  } catch {
    return []
  }
}

export const addToShortlist = (item: ShortlistItem): void => {
  if (typeof window === "undefined") return
  try {
    const currentShortlist = getShortlist()
    const existingItemIndex = currentShortlist.findIndex((shortlistItem) => shortlistItem.id === item.id)

    if (existingItemIndex >= 0) {
      // Update existing item
      currentShortlist[existingItemIndex] = item
    } else {
      // Add new item
      currentShortlist.push(item)
    }

    localStorage.setItem("shortlist", JSON.stringify(currentShortlist))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("shortlistUpdated", { detail: currentShortlist }))
  } catch (error) {
    console.error("Error adding to shortlist:", error)
  }
}

export const removeFromShortlist = (itemId: string): void => {
  if (typeof window === "undefined") return
  try {
    const currentShortlist = getShortlist()
    const updatedShortlist = currentShortlist.filter((item) => item.id !== itemId)
    localStorage.setItem("shortlist", JSON.stringify(updatedShortlist))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("shortlistUpdated", { detail: updatedShortlist }))
  } catch (error) {
    console.error("Error removing from shortlist:", error)
  }
}

export const clearShortlist = (): void => {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem("shortlist")
    window.dispatchEvent(new CustomEvent("shortlistUpdated", { detail: [] }))
  } catch (error) {
    console.error("Error clearing shortlist:", error)
  }
}

export const isInShortlist = (itemId: string): boolean => {
  const shortlist = getShortlist()
  return shortlist.some((item) => item.id === itemId)
}

export const getShortlistCount = (): number => {
  return getShortlist().length
}

// Quote request function
export const submitQuoteRequest = async (quoteData: QuoteRequest): Promise<{ success: boolean; message: string }> => {
  try {
    // Format the data for Supabase
    const supabaseQuoteData = {
      name: quoteData.name,
      email: quoteData.email,
      phone: quoteData.phone,
      company: quoteData.company,
      message: quoteData.message,
      budget: quoteData.budget || "",
      timeline: quoteData.timeline || "",
      event_type: quoteData.event_type || "",
      customization: quoteData.customization || false,
      branding: quoteData.branding || false,
      packaging: quoteData.packaging || false,
      shortlisted_products: quoteData.items || []
    }

    // Submit to Supabase
    const result = await submitQuoteRequestToSupabase(supabaseQuoteData)

    if (result.success && quoteData.items.length > 0) {
      // Only clear shortlist if this was a shortlist quote
      clearShortlist()
    }

    return {
      success: result.success,
      message: result.message,
    }
  } catch (error) {
    console.error("Error submitting quote request:", error)
    return {
      success: false,
      message: "Failed to submit quote request. Please try again.",
    }
  }
}
