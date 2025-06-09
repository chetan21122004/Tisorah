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
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          category: string
          moq: string | null
          delivery: string | null
          rating: number | null
          featured: boolean | null
          customizable: boolean | null
          images: string[] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          category: string
          moq?: string | null
          delivery?: string | null
          rating?: number | null
          featured?: boolean | null
          customizable?: boolean | null
          images?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          category?: string
          moq?: string | null
          delivery?: string | null
          rating?: number | null
          featured?: boolean | null
          customizable?: boolean | null
          images?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_product_category"
            columns: ["category"]
            referencedRelation: "gift_categories"
            referencedColumns: ["slug"]
          }
        ]
      }
      gift_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          count: number | null
          image_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          count?: number | null
          image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          count?: number | null
          image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string
          message: string | null
          budget: string | null
          timeline: string | null
          event_type: string | null
          customization: boolean | null
          branding: boolean | null
          packaging: boolean | null
          shortlisted_products: Json
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company: string
          message?: string | null
          budget?: string | null
          timeline?: string | null
          event_type?: string | null
          customization?: boolean | null
          branding?: boolean | null
          packaging?: boolean | null
          shortlisted_products: Json
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string
          message?: string | null
          budget?: string | null
          timeline?: string | null
          event_type?: string | null
          customization?: boolean | null
          branding?: boolean | null
          packaging?: boolean | null
          shortlisted_products?: Json
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
        Relationships: []
      }
      blog_categories: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image: string
          author: string
          author_image: string
          published_at: string | null
          category_id: number | null
          reading_time: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: number
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image: string
          author: string
          author_image: string
          published_at?: string | null
          category_id?: number | null
          reading_time: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          cover_image?: string
          author?: string
          author_image?: string
          published_at?: string | null
          category_id?: number | null
          reading_time?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          }
        ]
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