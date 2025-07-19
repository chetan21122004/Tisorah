import { createClient } from '@supabase/supabase-js'
import { Category, Product } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Get main categories (Edible and Non-edible)
export async function getMainCategories(): Promise<Category[]> {
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

// Get products by category
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`main_category.eq.${categoryId},primary_category.eq.${categoryId},secondary_category.eq.${categoryId}`)
    .order('name')

  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }

  return data || []
}

// Get all products with search and filters
export async function getProducts(options: {
  search?: string
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  limit?: number
  offset?: number
} = {}): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select(`
      *,
      main_category_info:categories!products_main_category_fkey(*),
      primary_category_info:categories!products_primary_category_fkey(*),
      secondary_category_info:categories!products_secondary_category_fkey(*)
    `)

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

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('name')
    .limit(12)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data || []
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
} 