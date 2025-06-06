'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export async function createServerSupabaseClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = cookies()
          return cookieStore.get(name)?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          const cookieStore = cookies()
          cookieStore.set(name, value, options)
        },
        async remove(name: string, options: CookieOptions) {
          const cookieStore = cookies()
          cookieStore.delete(name)
        },
      },
    }
  )
}

export async function getFeaturedProducts() {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: products, error } = await supabase
      .from('products')
      .select()
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(8)

    if (error) {
      console.error('Error fetching featured products:', error)
      return []
    }

    return products || []
  } catch (error) {
    console.error('Error in getFeaturedProducts:', error)
    return []
  }
}

export async function getProducts() {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: products, error } = await supabase
      .from('products')
      .select()
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      return []
    }

    return products || []
  } catch (error) {
    console.error('Error in getProducts:', error)
    return []
  }
} 