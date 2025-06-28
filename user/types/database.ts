export interface Product {
  id: string
  name: string
  description?: string | null
  price: number
  original_price?: number
  price_min?: number | null
  price_max?: number | null
  has_price_range?: boolean | null
  images?: string[] | null
  category?: string
  main_category?: string
  sub_category?: string
  main_category_info?: CategoryInfo
  sub_category_info?: CategoryInfo
  rating?: number | null
  reviews?: number | null
  discount?: string
  moq?: number | null
  features?: string[] | null
  specifications?: Record<string, string> | null
  benefits?: string[] | null
  is_featured?: boolean | null
  delivery?: string | null
  customizable?: boolean | null
  featured?: boolean | null
  created_at?: string | null
  updated_at?: string | null
}

export interface CategoryInfo {
  id: string
  name: string
  slug: string
}

export interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  image: string | null
  featured: boolean
  created_at: string | null
}

export interface GiftCategory {
  id: string
  name: string
  slug: string
  description: string | null
  count: number | null
  image_url: string | null
  created_at: string | null
  updated_at: string | null
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          created_at: string | null
          updated_at: string | null
          count: number | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          created_at?: string | null
          updated_at?: string | null
          count?: number | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          created_at?: string | null
          updated_at?: string | null
          count?: number | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          price_min: number | null
          price_max: number | null
          has_price_range: boolean | null
          moq: number | null
          delivery: string | null
          rating: number | null
          featured: boolean | null
          customizable: boolean | null
          images: string[] | null
          created_at: string | null
          updated_at: string | null
          main_category: string | null
          sub_category: string | null
          reviews: number | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          price_min?: number | null
          price_max?: number | null
          has_price_range?: boolean | null
          moq?: number | null
          delivery?: string | null
          rating?: number | null
          featured?: boolean | null
          customizable?: boolean | null
          images?: string[] | null
          created_at?: string | null
          updated_at?: string | null
          main_category?: string | null
          sub_category?: string | null
          reviews?: number | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          price_min?: number | null
          price_max?: number | null
          has_price_range?: boolean | null
          moq?: number | null
          delivery?: string | null
          rating?: number | null
          featured?: boolean | null
          customizable?: boolean | null
          images?: string[] | null
          created_at?: string | null
          updated_at?: string | null
          main_category?: string | null
          sub_category?: string | null
          reviews?: number | null
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          position: string
          company: string
          content: string
          rating: number
          product_bought: string
          avatar_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          position: string
          company: string
          content: string
          rating: number
          product_bought: string
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          position?: string
          company?: string
          content?: string
          rating?: number
          product_bought?: string
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      gift_categories: {
        Row: GiftCategory
        Insert: Omit<GiftCategory, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<GiftCategory, 'id' | 'created_at' | 'updated_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 