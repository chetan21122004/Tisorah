import { createClient as createClientBrowser } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/utils/supabase/server'
import type { Database } from '@/types/supabase'
import type { Product } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase instance
export const createBrowserClient = () => {
  return createClientBrowser<Database>(supabaseUrl, supabaseKey)
}

// Server-side Supabase instance
export const createServerSupabaseClient = () => {
  return createServerClient()
}

// Product related functions
export async function getProducts(): Promise<Product[]> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  // Transform each product to match the Product type
  return data.map(item => ({
    ...item,
    features: Array.isArray(item.features) ? item.features : null,
    specifications: typeof item.specifications === 'object' ? item.specifications : null,
    benefits: Array.isArray(item.benefits) ? item.benefits : null,
    is_featured: item.is_featured ?? false,
    delivery: item.delivery || "5-7 business days"
  }))
}

export async function getProductsByCategory(category: string) {
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
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  // Transform the data to match the Product type
  const product: Product = {
    ...data,
    features: Array.isArray(data.features) ? data.features : null,
    specifications: typeof data.specifications === 'object' ? data.specifications : null,
    benefits: Array.isArray(data.benefits) ? data.benefits : null,
    is_featured: data.is_featured ?? false,
    delivery: data.delivery || "5-7 business days"
  }

  return product
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