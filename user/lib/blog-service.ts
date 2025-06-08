'use server'

import { createClient } from '@/utils/supabase/server'
import type { BlogPost } from '@/types/blog'

/**
 * Fetch all blog posts with optional filtering
 */
export async function getAllBlogPosts({
  limit,
  categoryId,
  excludeIds = []
}: {
  limit?: number,
  categoryId?: number,
  excludeIds?: number[]
} = {}) {
  try {
    const supabase = await createClient()
    
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories(id, name)
      `)
      .order('published_at', { ascending: false })
    
    // Apply category filter
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    
    // Exclude specific blog posts
    if (excludeIds.length > 0) {
      query = query.not('id', 'in', `(${excludeIds.join(',')})`)
    }
    
    // Apply limit
    if (limit) {
      query = query.limit(limit)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }
    
    // Transform data to BlogPost type
    return data.map(post => {
      const category = post.blog_categories ? (post.blog_categories as any).name : 'Uncategorized'
      
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image: post.cover_image,
        author: post.author,
        author_image: post.author_image,
        published_at: new Date(post.published_at),
        category: category,
        reading_time: post.reading_time
      }
    })
  } catch (error) {
    console.error('Error in getAllBlogPosts:', error)
    return []
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories(id, name)
      `)
      .eq('slug', slug)
      .single()
    
    if (error || !data) {
      console.error('Error fetching blog post:', error)
      return null
    }
    
    // Transform data to BlogPost type
    const category = data.blog_categories ? (data.blog_categories as any).name : 'Uncategorized'
    
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      cover_image: data.cover_image,
      author: data.author,
      author_image: data.author_image,
      published_at: new Date(data.published_at),
      category: category,
      reading_time: data.reading_time,
      categoryId: data.blog_categories ? (data.blog_categories as any).id : null
    }
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error)
    return null
  }
}

/**
 * Fetch related blog posts based on category
 */
export async function getRelatedBlogPosts(categoryId: number, currentPostId: number, limit: number = 3) {
  try {
    return await getAllBlogPosts({ 
      categoryId, 
      excludeIds: [currentPostId],
      limit
    })
  } catch (error) {
    console.error('Error in getRelatedBlogPosts:', error)
    return []
  }
}

/**
 * Fetch all blog categories
 */
export async function getAllCategories() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) {
      console.error('Error fetching blog categories:', error)
      return []
    }
    
    return data
  } catch (error) {
    console.error('Error in getAllCategories:', error)
    return []
  }
} 