'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'
import { createClient } from "@/lib/supabase/server"

export async function createServerSupabaseClient() {
  return createServerComponentClient<Database>({ cookies })
}

export async function getFeaturedProducts() {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: products, error } = await supabase
      .from('products')
      .select()
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(10)

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

export interface SearchParams {
  q?: string;
  category?: string;
  price?: string;
  sort?: string;
  page?: string;
}

export async function searchProducts(params: SearchParams) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Start building the query
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
    
    // Add search term filter if provided
    if (params.q) {
      query = query.or(`title.ilike.%${params.q}%,description.ilike.%${params.q}%`)
    }
    
    // Add category filter if provided
    if (params.category && params.category !== '') {
      query = query.eq('category', params.category)
    }
    
    // Add price range filter if provided
    if (params.price && params.price !== '') {
      const priceRange = params.price.split('-')
      if (priceRange.length === 2) {
        const minPrice = parseInt(priceRange[0])
        const maxPrice = parseInt(priceRange[1])
        query = query.gte('price', minPrice).lte('price', maxPrice)
      } else if (params.price === '10000+') {
        query = query.gte('price', 10000)
      } else if (params.price === '0-2000') {
        query = query.lte('price', 2000)
      }
    }
    
    // Add sorting
    if (params.sort) {
      switch (params.sort) {
        case 'price_low':
          query = query.order('price', { ascending: true })
          break
        case 'price_high':
          query = query.order('price', { ascending: false })
          break
        case 'newest':
          query = query.order('created_at', { ascending: false })
          break
        case 'popular':
          // Since there's no reviews field, default to created_at
          query = query.order('created_at', { ascending: false })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }
    } else {
      query = query.order('created_at', { ascending: false })
    }
    
    // Handle pagination
    const page = parseInt(params.page || '1')
    const pageSize = 12
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    
    query = query.range(from, to)
    
    const { data: products, error, count } = await query
    
    if (error) {
      console.error('Error searching products:', error)
      return { products: [], count: 0 }
    }
    
    return { 
      products: products || [],
      count: count || 0
    }
  } catch (error) {
    console.error('Error in searchProducts:', error)
    return { products: [], count: 0 }
  }
}

export async function getLatestProducts() {
  const supabase = await createServerSupabaseClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(8);

  if (error) {
    console.error('Error fetching latest products:', error);
    return [];
  }
  return products || [];
}

export async function getTestimonials() {
  const supabase = await createServerSupabaseClient();
  const { data: testimonials, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  return testimonials || [];
}

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  count: number;
};

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return categories;
}

export async function getMainCategories(): Promise<Category[]> {
  const supabase = createClient();
  
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .is("parent_id", null)
    .order("name");

  if (error) {
    console.error("Error fetching main categories:", error);
    return [];
  }

  return categories;
}

export async function getSubCategories(parentId: string): Promise<Category[]> {
  const supabase = createClient();
  
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("parent_id", parentId)
    .order("name");

  if (error) {
    console.error("Error fetching sub categories:", error);
    return [];
  }

  return categories;
} 