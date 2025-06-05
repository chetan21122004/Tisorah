'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value ?? ''
        },
        set(name: string, value: string, options: any) {
          // In server actions, we don't need to set cookies directly
          // They are handled by the middleware
        },
        remove(name: string, options: any) {
          // In server actions, we don't need to remove cookies directly
          // They are handled by the middleware
        },
      },
    }
  )
}

export async function getFeaturedProducts() {
  const supabase = await createServerSupabaseClient()
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .limit(4)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching featured products:", error)
    return []
  }

  return products
} 