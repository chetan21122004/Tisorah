"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export interface Category {
  id: string
  name: string
  slug: string
  type: 'edible' | 'non_edible'
  level: 'main' | 'secondary' | 'tertiary' | 'quaternary'
  parent_id: string | null
  product_count: number
}

export const useActiveCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActiveCategories = async () => {
      try {
        const supabase = createClient()
        
        // Try RPC function first
        const { data: rpcData, error: rpcError } = await supabase.rpc('get_active_categories')
        
        if (!rpcError && rpcData) {
          setCategories(rpcData)
          return
        }

        // Fallback to direct query
        const { data: categoriesData, error: queryError } = await supabase
          .from('categories')
          .select('*')
          .order('type')
          .order('level')
          .order('name')

        if (queryError) {
          throw queryError
        }

        // Get product counts for each category
        const categoriesWithCounts = await Promise.all(
          (categoriesData || []).map(async (category) => {
            const { count } = await supabase
              .from('products')
              .select('*', { count: 'exact', head: true })
              .or(`main_category.eq.${category.id},primary_category.eq.${category.id},secondary_category.eq.${category.id}`)

            return {
              id: category.id,
              name: category.name,
              slug: category.slug,
              type: category.type,
              level: category.level,
              parent_id: category.parent_id,
              product_count: count || 0
            }
          })
        )

        setCategories(categoriesWithCounts.filter(cat => cat.product_count > 0))
      } catch (err) {
        console.error('Error fetching active categories:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch categories')
      } finally {
        setLoading(false)
      }
    }

    fetchActiveCategories()
  }, [])

  const getEdibleCategories = () => categories.filter(cat => cat.type === 'edible')
  const getNonEdibleCategories = () => categories.filter(cat => cat.type === 'non_edible')
  
  const getCategoriesByParent = (parentId: string | null) => 
    categories.filter(cat => cat.parent_id === parentId)

  const getSecondaryCategories = (type: 'edible' | 'non_edible') =>
    categories.filter(cat => cat.type === type && cat.level === 'secondary' && cat.product_count > 0)

  const getTertiaryCategories = (parentId: string) =>
    categories.filter(cat => cat.parent_id === parentId && cat.level === 'tertiary' && cat.product_count > 0)

  return {
    categories,
    loading,
    error,
    getEdibleCategories,
    getNonEdibleCategories,
    getCategoriesByParent,
    getSecondaryCategories,
    getTertiaryCategories
  }
} 