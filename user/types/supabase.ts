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
          published_at: string
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
          published_at?: string
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
          published_at?: string
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
        Relationships: []
      }
      quote_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          message: string
          quantity: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          message: string
          quantity?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          message?: string
          quantity?: number | null
          created_at?: string | null
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
          image: string | null
          featured: boolean
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          position: string
          company: string
          content: string
          image?: string | null
          featured?: boolean
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          position?: string
          company?: string
          content?: string
          image?: string | null
          featured?: boolean
          created_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
} 