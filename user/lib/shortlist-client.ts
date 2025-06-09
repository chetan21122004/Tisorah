"use client"

import { Product } from "@/types/database"

// Custom event for shortlist updates
const shortlistUpdateEvent = new Event('shortlistUpdated')

// Get shortlisted products from localStorage
export function getShortlistedProducts(): Product[] {
  if (typeof window === 'undefined') return []
  
  const shortlist = localStorage.getItem('shortlist')
  return shortlist ? JSON.parse(shortlist) : []
}

// Get shortlist count
export function getShortlistCount(): number {
  return getShortlistedProducts().length
}

// Add product to shortlist
export function addToShortlist(product: Product): void {
  if (typeof window === 'undefined') return
  
  const shortlist = getShortlistedProducts()
  
  // Check if product is already in shortlist
  if (!shortlist.some(item => item.id === product.id)) {
    shortlist.push(product)
    localStorage.setItem('shortlist', JSON.stringify(shortlist))
    window.dispatchEvent(shortlistUpdateEvent)
  }
}

// Remove product from shortlist
export function removeFromShortlist(productId: string): void {
  if (typeof window === 'undefined') return
  
  const shortlist = getShortlistedProducts()
  const updatedShortlist = shortlist.filter(item => item.id !== productId)
  localStorage.setItem('shortlist', JSON.stringify(updatedShortlist))
  window.dispatchEvent(shortlistUpdateEvent)
}

// Check if product is in shortlist
export function isInShortlist(productId: string): boolean {
  const shortlist = getShortlistedProducts()
  return shortlist.some(item => item.id === productId)
}

// Clear shortlist
export function clearShortlist(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('shortlist')
  window.dispatchEvent(shortlistUpdateEvent)
} 