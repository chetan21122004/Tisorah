"use client"

import { useActiveCategories } from "@/hooks/use-active-categories"
import Link from "next/link"

export default function TestCategoriesPage() {
  const { 
    categories, 
    loading, 
    error, 
    getSecondaryCategories, 
    getTertiaryCategories 
  } = useActiveCategories()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#AD9660] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading categories</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  const edibleCategories = getSecondaryCategories('edible')
  const nonEdibleCategories = getSecondaryCategories('non_edible')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-12">Active Categories Test</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Edible Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#AD9660] mb-6">Edible Gifts</h2>
            {edibleCategories.length === 0 ? (
              <p className="text-gray-500">No edible categories with products found.</p>
            ) : (
              <div className="space-y-4">
                {edibleCategories.map((category) => {
                  const tertiaryCategories = getTertiaryCategories(category.id)
                  
                  return (
                    <div key={category.id} className="border-b border-gray-100 pb-4">
                      <h3 className="font-medium text-gray-800 mb-2">
                        <Link 
                          href={`/products?search=${encodeURIComponent(category.name)}`}
                          className="hover:text-[#AD9660] transition-colors"
                        >
                          {category.name} ({category.product_count} products)
                        </Link>
                      </h3>
                      {tertiaryCategories.length > 0 && (
                        <ul className="ml-4 space-y-1">
                          {tertiaryCategories.map((tertiary) => (
                            <li key={tertiary.id} className="text-sm text-gray-600">
                              • <Link 
                                  href={`/products?search=${encodeURIComponent(tertiary.name)}`}
                                  className="hover:text-[#AD9660] transition-colors"
                                >
                                  {tertiary.name} ({tertiary.product_count})
                                </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Non-Edible Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#AD9660] mb-6">Non-Edible Gifts</h2>
            {nonEdibleCategories.length === 0 ? (
              <p className="text-gray-500">No non-edible categories with products found.</p>
            ) : (
              <div className="space-y-4">
                {nonEdibleCategories.map((category) => {
                  const tertiaryCategories = getTertiaryCategories(category.id)
                  
                  return (
                    <div key={category.id} className="border-b border-gray-100 pb-4">
                      <h3 className="font-medium text-gray-800 mb-2">
                        <Link 
                          href={`/products?search=${encodeURIComponent(category.name)}`}
                          className="hover:text-[#AD9660] transition-colors"
                        >
                          {category.name} ({category.product_count} products)
                        </Link>
                      </h3>
                      {tertiaryCategories.length > 0 && (
                        <ul className="ml-4 space-y-1">
                          {tertiaryCategories.map((tertiary) => (
                            <li key={tertiary.id} className="text-sm text-gray-600">
                              • <Link 
                                  href={`/products?search=${encodeURIComponent(tertiary.name)}`}
                                  className="hover:text-[#AD9660] transition-colors"
                                >
                                  {tertiary.name} ({tertiary.product_count})
                                </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Total Categories:</strong> {categories.length}
            </div>
            <div>
              <strong>Edible Categories:</strong> {edibleCategories.length}
            </div>
            <div>
              <strong>Non-Edible Categories:</strong> {nonEdibleCategories.length}
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">How it works:</h3>
            <p className="text-sm text-blue-700">
              Click on any category name above to navigate to the products page with that category pre-filled in the search bar. 
              This demonstrates the same functionality as the navbar dropdown menus.
            </p>
          </div>
          
          <details className="mt-4">
            <summary className="cursor-pointer font-medium">View All Categories (JSON)</summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify(categories, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  )
} 