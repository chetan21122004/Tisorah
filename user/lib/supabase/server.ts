import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Category, Product } from '@/types/database'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Get main categories (Edible and Non-edible)
export async function getMainCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('level', 'main')
    .order('name')

  if (error) {
    console.error('Error fetching main categories:', error)
    return []
  }

  return data || []
}

// Get secondary categories (Ready to Gift, Semi-Customised, Custom Curated)
export async function getSecondaryCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('level', 'secondary')
    .order('name')

  if (error) {
    console.error('Error fetching secondary categories:', error)
    return []
  }

  return data || []
}

// Get categories by parent ID
export async function getCategoriesByParent(parentId: string): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('parent_id', parentId)
    .order('name')

  if (error) {
    console.error('Error fetching categories by parent:', error)
    return []
  }

  return data || []
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category by slug:', error)
    return null
  }

  return data
}

// Get products by main category (Edible or Non-edible)
export async function getProductsByMainCategory(mainCategoryId: string): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('main_category', mainCategoryId)
    .order('name')

  if (error) {
    console.error('Error fetching products by main category:', error)
    return []
  }

  return data || []
}

// Get products by secondary category (Ready to Gift, Semi-Customised, Custom Curated)
export async function getProductsBySecondaryCategory(secondaryCategoryId: string): Promise<Product[]> {
  const supabase = await createClient()
  
  // First get all tertiary categories under this secondary category
  const { data: tertiaryCategories, error: tertiaryError } = await supabase
    .from('categories')
    .select('id')
    .eq('parent_id', secondaryCategoryId)
    .eq('level', 'tertiary')

  if (tertiaryError) {
    console.error('Error fetching tertiary categories:', tertiaryError)
    return []
  }

  const tertiaryIds = tertiaryCategories?.map(cat => cat.id) || []
  
  // Get products from both secondary category and its tertiary subcategories
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`primary_category.eq.${secondaryCategoryId},primary_category.in.(${tertiaryIds.join(',')})`)
    .order('name')

  if (error) {
    console.error('Error fetching products by secondary category:', error)
    return []
  }

  return data || []
}

// Get all categories for navigation
export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('level', { ascending: true })
    .order('name')

  if (error) {
    console.error('Error fetching all categories:', error)
    return []
  }

  return data || []
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('name')

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data || []
}

// Get products with search and filters
export async function getProducts(options: {
  search?: string
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  limit?: number
  offset?: number
}): Promise<Product[]> {
  const supabase = await createClient()
  let query = supabase
    .from('products')
    .select('*')

  if (options.search) {
    query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`)
  }

  if (options.categoryId) {
    query = query.or(`main_category.eq.${options.categoryId},primary_category.eq.${options.categoryId},secondary_category.eq.${options.categoryId}`)
  }

  if (options.minPrice) {
    query = query.gte('price', options.minPrice)
  }

  if (options.maxPrice) {
    query = query.lte('price', options.maxPrice)
  }

  if (options.featured) {
    query = query.eq('featured', true)
  }

  if (options.limit) {
    query = query.limit(options.limit)
  }

  if (options.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 20) - 1)
  }

  const { data, error } = await query.order('name')

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
} 