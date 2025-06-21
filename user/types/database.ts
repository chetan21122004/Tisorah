export interface Product {
  id: string
  name: string
  description?: string | null
  price: number
  original_price?: number
  images?: string[] | null
  category?: string
  main_category?: string
  sub_category?: string
  main_category_info?: CategoryInfo
  sub_category_info?: CategoryInfo
  rating?: number | null
  reviews?: number | null
  discount?: string
  moq?: string | number | null
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

export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
      }
      testimonials: {
        Row: Testimonial
        Insert: Omit<Testimonial, 'id' | 'created_at'>
        Update: Partial<Omit<Testimonial, 'id' | 'created_at'>>
      }
      gift_categories: {
        Row: GiftCategory
        Insert: Omit<GiftCategory, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<GiftCategory, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
} 