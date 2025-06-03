import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type Category = {
  id: string
  name: string
  description: string | null
  slug: string
  image_url: string | null
  created_at: string | null
  updated_at: string | null
}

export type Product = {
  id: string
  name: string
  description: string | null
  slug: string
  price_range: { min: number; max: number } | null
  minimum_order_quantity: number
  category_id: string | null
  images: string[] | null
  customization_options: Array<{ name: string; options: string[] }> | null
  specifications: Record<string, any> | null
  is_featured: boolean
  created_at: string | null
  updated_at: string | null
  category?: Category
} 