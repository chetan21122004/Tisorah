'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getMainCategories, getCategoriesByParent } from '@/lib/supabase'
import { Category } from '@/types/database'
import { Gift, Settings, Palette, Utensils, Package } from 'lucide-react'

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'edible':
      return <Utensils className="w-16 h-16 text-[#AD9660] mb-6" />
    case 'non-edible':
      return <Package className="w-16 h-16 text-[#AD9660] mb-6" />
    case 'ready-to-gift':
      return <Gift className="w-16 h-16 text-[#AD9660] mb-6" />
    case 'semi-customised':
      return <Settings className="w-16 h-16 text-[#AD9660] mb-6" />
    case 'custom-curated':
      return <Palette className="w-16 h-16 text-[#AD9660] mb-6" />
    default:
      return <Package className="w-16 h-16 text-[#AD9660] mb-6" />
  }
}

const getCategoryColor = (slug: string) => {
  switch (slug) {
    case 'edible':
      return 'bg-green-50 border-green-200 hover:border-green-300'
    case 'non-edible':
      return 'bg-blue-50 border-blue-200 hover:border-blue-300'
    case 'ready-to-gift':
      return 'bg-purple-50 border-purple-200 hover:border-purple-300'
    case 'semi-customised':
      return 'bg-orange-50 border-orange-200 hover:border-orange-300'
    case 'custom-curated':
      return 'bg-pink-50 border-pink-200 hover:border-pink-300'
    default:
      return 'bg-gray-50 border-gray-200 hover:border-gray-300'
  }
}

export default function CategoriesPageClient() {
  const [mainCategories, setMainCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [subcategoryCounts, setSubcategoryCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const mainCats = await getMainCategories()
        setMainCategories(mainCats)
        
        // Get subcategory counts for each main category
        const counts: Record<string, number> = {}
        for (const cat of mainCats) {
          const subcats = await getCategoriesByParent(cat.id)
          counts[cat.id] = subcats.length
        }
        setSubcategoryCounts(counts)
      } catch (error) {
        console.error('Error loading categories:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AD9660] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-light text-[#323433] mb-6">
            Gift Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated collection of corporate gifts, organized by type and customization level
          </p>
        </div>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainCategories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className={`group hover:shadow-xl transition-all duration-300 h-full ${getCategoryColor(category.slug)}`}>
                <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    {getCategoryIcon(category.slug)}
                    <h3 className="text-2xl font-serif font-light text-[#323433] mb-4">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-6 text-base leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex justify-center gap-3 mb-6">
                      <Badge variant="secondary" className="text-xs">
                        {category.type === 'edible' ? 'Edible' : 'Non-edible'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {subcategoryCounts[category.id] || 0} subcategories
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-[#AD9660] hover:bg-[#8B7A4F] text-white group-hover:bg-[#8B7A4F] transition-colors">
                    Explore {category.name}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-[#323433] mb-4">
              Why Choose Our Corporate Gifts?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer premium quality gifts with flexible customization options to suit every corporate need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#AD9660] rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-light text-[#323433] mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                Carefully selected high-quality products that reflect your brand's excellence
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#AD9660] rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-light text-[#323433] mb-2">Customization Options</h3>
              <p className="text-gray-600 text-sm">
                From ready-to-gift to fully customized solutions tailored to your requirements
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#AD9660] rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-light text-[#323433] mb-2">Expert Curation</h3>
              <p className="text-gray-600 text-sm">
                Professional team to help you choose the perfect gifts for every occasion
              </p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-light text-[#323433] mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#AD9660] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h3 className="text-lg font-serif font-light text-[#323433] mb-2">Browse Categories</h3>
              <p className="text-gray-600 text-sm">
                Explore our 5 main categories to find the perfect gifts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#AD9660] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h3 className="text-lg font-serif font-light text-[#323433] mb-2">Select Products</h3>
              <p className="text-gray-600 text-sm">
                Choose from our curated selection of premium gifts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#AD9660] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h3 className="text-lg font-serif font-light text-[#323433] mb-2">Customize</h3>
              <p className="text-gray-600 text-sm">
                Add your branding or personalization as needed
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#AD9660] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                4
              </div>
              <h3 className="text-lg font-serif font-light text-[#323433] mb-2">Deliver</h3>
              <p className="text-gray-600 text-sm">
                Receive your beautifully packaged gifts on time
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-[#323433] text-white rounded-2xl p-12">
          <h2 className="text-3xl font-serif font-light mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our expert team is here to help you find the perfect corporate gifts for your specific needs and budget
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-[#AD9660] hover:bg-[#8B7A4F] text-white px-8 py-3">
                Get Expert Advice
              </Button>
            </Link>
            <Link href="/quote">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#323433] px-8 py-3">
                Request Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 