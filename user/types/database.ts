export interface Product {
  id: string
  name: string
  description?: string
  price: number
  original_price: number
  images?: string[]
  category?: string
  rating?: number
  reviews?: number
  discount?: string
  moq?: number
  features?: string[]
  specifications?: Record<string, string>
  benefits?: string[]
  is_featured?: boolean
  delivery?: string
  customizable?: boolean
  featured?: boolean
  created_at?: string
  updated_at: string | null
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