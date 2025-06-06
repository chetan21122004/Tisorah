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
          category: string
          created_at: string | null
          customizable: boolean | null
          delivery: string | null
          description: string | null
          featured: boolean | null
          id: string
          images: string[] | null
          moq: string | null
          name: string
          price: number
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          customizable?: boolean | null
          delivery?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          moq?: string | null
          name: string
          price: number
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          customizable?: boolean | null
          delivery?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          moq?: string | null
          name?: string
          price?: number
          rating?: number | null
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
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string
          content: string
          created_at: string | null
          id: string
          name: string
          position: string
          product_bought: string
          rating: number
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company: string
          content: string
          created_at?: string | null
          id?: string
          name: string
          position: string
          product_bought: string
          rating: number
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string
          content?: string
          created_at?: string | null
          id?: string
          name?: string
          position?: string
          product_bought?: string
          rating?: number
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