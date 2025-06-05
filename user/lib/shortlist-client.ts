import { createClient } from '@/utils/supabase/client'

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
  category: string
}

// Get shortlist from localStorage
export function getShortlist(): ShortlistItem[] {
  if (typeof window === 'undefined') return []
  const shortlist = localStorage.getItem('shortlist')
  return shortlist ? JSON.parse(shortlist) : []
}

// Check if item is in shortlist
export function isInShortlist(productId: string): boolean {
  const shortlist = getShortlist()
  return shortlist.some(item => item.id === productId)
}

// Add item to shortlist
export function addToShortlist(item: ShortlistItem): void {
  const shortlist = getShortlist()
  if (!isInShortlist(item.id)) {
    shortlist.push(item)
    localStorage.setItem('shortlist', JSON.stringify(shortlist))
    // Dispatch event for components to update
    window.dispatchEvent(new Event('shortlistUpdated'))
  }
}

// Remove item from shortlist
export function removeFromShortlist(productId: string): void {
  const shortlist = getShortlist()
  const updatedShortlist = shortlist.filter(item => item.id !== productId)
  localStorage.setItem('shortlist', JSON.stringify(updatedShortlist))
  // Dispatch event for components to update
  window.dispatchEvent(new Event('shortlistUpdated'))
}

// Clear entire shortlist
export function clearShortlist(): void {
  localStorage.removeItem('shortlist')
  // Dispatch event for components to update
  window.dispatchEvent(new Event('shortlistUpdated'))
}

// Update item quantity in shortlist
export function updateShortlistItemQuantity(productId: string, quantity: number): void {
  const shortlist = getShortlist()
  const updatedShortlist = shortlist.map(item => 
    item.id === productId ? { ...item, quantity } : item
  )
  localStorage.setItem('shortlist', JSON.stringify(updatedShortlist))
  // Dispatch event for components to update
  window.dispatchEvent(new Event('shortlistUpdated'))
}

// Get total items count in shortlist
export function getShortlistCount(): number {
  return getShortlist().length
}

// Get total value of shortlist
export function getShortlistTotal(): number {
  return getShortlist().reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''))
    return total + (price * item.quantity)
  }, 0)
} 