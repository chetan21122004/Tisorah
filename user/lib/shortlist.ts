"use client"

export type ShortlistItem = {
  id: string
  name: string
  price_range: {
    min: number
    max: number
  } | null
  image: string
  quantity: number
  minimum_order_quantity: number
  category?: string
}

export interface QuoteRequest {
  name: string
  email: string
  phone: string
  company: string
  message: string
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would send this to your backend
    console.log("Quote request submitted:", quoteData)

    return {
      success: true,
      message: "Quote request submitted successfully! We'll get back to you within 24 hours.",
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to submit quote request. Please try again.",
    }
  }
}
