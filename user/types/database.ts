export interface Product {
  id: string
  name: string
  category: string
  price: number
  original_price: number
  description: string | null
  long_description: string | null
  moq: number
  rating: number | null
  reviews: number | null
  customizable: boolean | null
  in_stock: boolean | null
  features: string[] | null
  specifications: Record<string, string> | null
  benefits: string[] | null
  images: string[] | null
  discount: string | null
  is_featured: boolean
  created_at: string | null
  updated_at: string | null
  delivery?: string
}

export interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  product_bought: string
  avatar_url: string | null
  created_at: string
  updated_at: string
} 