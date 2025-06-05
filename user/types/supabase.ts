export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          benefits: string[] | null
          category: string
          created_at: string | null
          customizable: boolean | null
          description: string | null
          discount: string | null
          features: Json | null
          id: string
          images: string[] | null
          in_stock: boolean | null
          long_description: string | null
          moq: number
          name: string
          original_price: number
          price: number
          rating: number | null
          reviews: number | null
          specifications: Json | null
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          category: string
          created_at?: string | null
          customizable?: boolean | null
          description?: string | null
          discount?: string | null
          features?: Json | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          long_description?: string | null
          moq?: number
          name: string
          original_price: number
          price: number
          rating?: number | null
          reviews?: number | null
          specifications?: Json | null
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          category?: string
          created_at?: string | null
          customizable?: boolean | null
          description?: string | null
          discount?: string | null
          features?: Json | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          long_description?: string | null
          moq?: number
          name?: string
          original_price?: number
          price?: number
          rating?: number | null
          reviews?: number | null
          specifications?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          branding: boolean | null
          budget: string | null
          company: string
          created_at: string | null
          customization: boolean | null
          email: string
          event_type: string | null
          id: string
          message: string | null
          name: string
          packaging: boolean | null
          phone: string | null
          shortlisted_products: Json
          status: string | null
          timeline: string | null
          updated_at: string | null
        }
        Insert: {
          branding?: boolean | null
          budget?: string | null
          company: string
          created_at?: string | null
          customization?: boolean | null
          email: string
          event_type?: string | null
          id?: string
          message?: string | null
          name: string
          packaging?: boolean | null
          phone?: string | null
          shortlisted_products: Json
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
        }
        Update: {
          branding?: boolean | null
          budget?: string | null
          company?: string
          created_at?: string | null
          customization?: boolean | null
          email?: string
          event_type?: string | null
          id?: string
          message?: string | null
          name?: string
          packaging?: boolean | null
          phone?: string | null
          shortlisted_products?: Json
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
        }
        Relationships: []
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