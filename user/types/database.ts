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
          type: 'edible' | 'non_edible' | null
          level: 'main' | 'primary' | 'secondary' | null
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
          type?: 'edible' | 'non_edible' | null
          level?: 'main' | 'primary' | 'secondary' | null
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
          type?: 'edible' | 'non_edible' | null
          level?: 'main' | 'primary' | 'secondary' | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          delivery: string | null
          rating: number | null
          featured: boolean | null
          customizable: boolean | null
          images: string[] | null
          created_at: string | null
          updated_at: string | null
          main_category: string | null
          reviews: number | null
          price_min: number | null
          price_max: number | null
          has_price_range: boolean | null
          moq: number | null
          display_image: string | null
          hover_image: string | null
          primary_category: string | null
          secondary_category: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          delivery?: string | null
          rating?: number | null
          featured?: boolean | null
          customizable?: boolean | null
          images?: string[] | null
          created_at?: string | null
          updated_at?: string | null
          main_category?: string | null
          reviews?: number | null
          price_min?: number | null
          price_max?: number | null
          has_price_range?: boolean | null
          moq?: number | null
          display_image?: string | null
          hover_image?: string | null
          primary_category?: string | null
          secondary_category?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          delivery?: string | null
          rating?: number | null
          featured?: boolean | null
          customizable?: boolean | null
          images?: string[] | null
          created_at?: string | null
          updated_at?: string | null
          main_category?: string | null
          reviews?: number | null
          price_min?: number | null
          price_max?: number | null
          has_price_range?: boolean | null
          moq?: number | null
          display_image?: string | null
          hover_image?: string | null
          primary_category?: string | null
          secondary_category?: string | null
        }
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
          shortlisted_products: any
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
          shortlisted_products: any
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
          shortlisted_products?: any
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
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

// Main Category Types
export type MainCategory = 'ready-to-gift' | 'semi-customised' | 'custom-curated'

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: string;
  type: 'edible' | 'non_edible';
  level: 'main' | 'secondary' | 'tertiary' | 'quaternary';
  count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_min?: number;
  price_max?: number;
  has_price_range?: boolean;
  moq?: number;
  delivery?: string;
  rating?: number;
  reviews?: number;
  featured?: boolean;
  customizable?: boolean;
  images?: string[];
  display_image?: string;
  hover_image?: string;
  main_category?: string;
  primary_category?: string;
  secondary_category?: string;
  created_at?: string;
  updated_at?: string;
  // Category information from joins
  main_category_info?: Category;
  primary_category_info?: Category;
  secondary_category_info?: Category;
}

export interface ProductWithCategory extends Product {
  main_category_info?: Category
  primary_category_info?: Category
  secondary_category_info?: Category
} 