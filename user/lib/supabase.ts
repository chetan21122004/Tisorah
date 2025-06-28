import { createClient as createClientBrowser } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/utils/supabase/server'
import type { Database } from '@/types/supabase'
import type { Product, GiftCategory } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create default client instance
const supabase = createClientBrowser<Database>(supabaseUrl, supabaseKey)

// Export default client
export default supabase

// Client-side Supabase instance
export const createBrowserClient = () => {
  return createClientBrowser<Database>(supabaseUrl, supabaseKey)
}

// Server-side Supabase instance
export const createServerSupabaseClient = () => {
  return createServerClient()
}

// Gift category related functions
export async function getGiftCategories(): Promise<GiftCategory[]> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('gift_categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching gift categories:', error)
    return []
  }

  return data
}

export async function getGiftCategoryBySlug(slug: string): Promise<GiftCategory | null> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('gift_categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching gift category:', error)
    return null
  }

  return data
}

// Product related functions
export async function getProducts(): Promise<Product[]> {
  const supabase = createBrowserClient()
  try {
    // Get all products
  const { data, error } = await supabase
    .from('products')
      .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

    return data as Product[]
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
  
  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
  
  return data
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createBrowserClient()
  try {
  const { data, error } = await supabase
    .from('products')
      .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

    return data as Product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Quote request functions
export async function submitQuoteRequestToSupabase(quoteData: {
  name: string
  email: string
  phone: string
  company: string
  message: string
  budget?: string
  timeline?: string
  event_type?: string
  customization: boolean
  branding: boolean
  packaging: boolean
  shortlisted_products: any[]
}) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('quote_requests')
    .insert([quoteData])
    .select()
  
  if (error) {
    console.error('Error submitting quote request:', error)
    return { success: false, message: error.message }
  }
  
  return { 
    success: true, 
    message: 'Quote request submitted successfully! We\'ll get back to you within 24 hours.',
    data
  }
} 