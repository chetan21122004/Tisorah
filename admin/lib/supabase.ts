import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for working with Supabase data

// Products
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, gift_categories(name)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data;
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, gift_categories(name)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

export async function createProduct(product: any) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    return null;
  }

  return data;
}

export async function updateProduct(id: string, product: any) {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }

  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  return true;
}

// Categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('gift_categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
}

export async function getCategoryById(id: string) {
  const { data, error } = await supabase
    .from('gift_categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data;
}

export async function createCategory(category: any) {
  const { data, error } = await supabase
    .from('gift_categories')
    .insert(category)
    .select()
    .single();

  if (error) {
    console.error('Error creating category:', error);
    return null;
  }

  return data;
}

export async function updateCategory(id: string, category: any) {
  const { data, error } = await supabase
    .from('gift_categories')
    .update(category)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating category:', error);
    return null;
  }

  return data;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from('gift_categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    return false;
  }

  return true;
}

// Quote Requests
export async function getQuoteRequests() {
  const { data, error } = await supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quote requests:', error);
    return [];
  }

  return data;
}

export async function getQuoteRequestById(id: string) {
  const { data, error } = await supabase
    .from('quote_requests')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching quote request:', error);
    return null;
  }

  return data;
}

export async function updateQuoteRequestStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from('quote_requests')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating quote request status:', error);
    return null;
  }

  return data;
}

// Testimonials
export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data;
}

export async function getTestimonialById(id: string) {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching testimonial:', error);
    return null;
  }

  return data;
}

export async function createTestimonial(testimonial: any) {
  const { data, error } = await supabase
    .from('testimonials')
    .insert(testimonial)
    .select()
    .single();

  if (error) {
    console.error('Error creating testimonial:', error);
    return null;
  }

  return data;
}

export async function updateTestimonial(id: string, testimonial: any) {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating testimonial:', error);
    return null;
  }

  return data;
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting testimonial:', error);
    return false;
  }

  return true;
}

// Blog
export async function getBlogCategories() {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }

  return data;
}

export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name)')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data;
}

export async function getBlogPostById(id: number) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
}

export async function createBlogPost(post: any) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    return null;
  }

  return data;
}

export async function updateBlogPost(id: number, post: any) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    return null;
  }

  return data;
}

export async function deleteBlogPost(id: number) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }

  return true;
} 