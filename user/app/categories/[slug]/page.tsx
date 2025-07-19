import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryPageClient from './CategoryPageClient'
import { getCategoryBySlug } from '@/lib/supabase/server'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - TisorahBox',
      description: 'The category you are looking for does not exist.'
    }
  }

  return {
    title: `${category.name} - Corporate Gifts | TisorahBox`,
    description: category.description || `Explore our ${category.name.toLowerCase()} collection of premium corporate gifts`,
    keywords: `corporate gifts, ${category.name.toLowerCase()}, business gifts, custom gifts, premium gifts`,
    openGraph: {
      title: `${category.name} - Corporate Gifts | TisorahBox`,
      description: category.description || `Explore our ${category.name.toLowerCase()} collection of premium corporate gifts`,
      type: 'website',
      images: category.image_url ? [{ url: category.image_url }] : []
    }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }

  return <CategoryPageClient />
} 