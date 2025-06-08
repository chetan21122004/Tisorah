export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  author_image: string;
  published_at: Date;
  category: string;
  reading_time: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
} 