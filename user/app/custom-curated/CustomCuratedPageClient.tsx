"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Package, 
  Star, 
  ArrowRight, 
  Palette, 
  Users, 
  Award, 
  Sparkles,
  CheckCircle,
  Clock,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

interface Product {
  id: string
  name: string
  description: string
  price: string
  price_min?: string
  price_max?: string
  has_price_range?: boolean
  display_image?: string
  hover_image?: string
  images: string[]
  delivery?: string
  moq?: string
  rating?: number
  reviews?: number
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function CustomCuratedPageClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [mobilePageIndex, setMobilePageIndex] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fetchCustomCuratedProducts = async () => {
      try {
        const supabase = createClientComponentClient()
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(
            `primary_category.eq.55555555-5555-5555-5555-555555555555,` +
            `primary_category.eq.b3333333-3333-3333-3333-333333333333,` +
            `primary_category.eq.b6666666-6666-6666-6666-666666666666,` +
            `main_category.eq.55555555-5555-5555-5555-555555555555,` +
            `secondary_category.eq.55555555-5555-5555-5555-555555555555`
          )
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching custom curated products:', error)
          return
        }

        const uniqueProducts = data?.filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id)
        ) || []

        setProducts(uniqueProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomCuratedProducts()
  }, [])

  // Mobile pagination
  const mobileProducts = products.slice(0, 8)
  const totalMobilePages = Math.ceil(mobileProducts.length / 4)
  const mobileVisibleProducts = mobileProducts.slice(mobilePageIndex * 4, mobilePageIndex * 4 + 4)

  const nextMobilePage = () => {
    setMobilePageIndex((prev) => (prev + 1) % totalMobilePages)
  }

  const prevMobilePage = () => {
    setMobilePageIndex((prev) => (prev === 0 ? totalMobilePages - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] via-white to-[#E6E2DD]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Art Deco Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 border border-[#AD9660] transform rotate-45 -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-[#323433] transform rotate-12 translate-x-24 translate-y-24"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-[#AB8E76] transform -rotate-12"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp} className="mb-6">
              <nav className="flex justify-center items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-[#AD9660] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#AD9660]">Custom Curated</span>
              </nav>
            </motion.div>

            {/* Hero Content */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-[#AD9660] mr-3" />
                <span className="text-sm uppercase tracking-wider text-[#AD9660] font-light">
                  Bespoke Luxury
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] mb-6 leading-tight">
                Custom Curated
                <span className="block text-[#AD9660]">Gift Experiences</span>
              </h1>
              
              <p className="text-lg md:text-xl text-[#1E2A47]/70 font-light max-w-3xl mx-auto leading-relaxed">
                Meticulously crafted, one-of-a-kind hampers designed to reflect your brand's personality 
                and create unforgettable moments for your most valued relationships.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#AD9660]/10 rounded-full flex items-center justify-center mb-4">
                  <Palette className="w-8 h-8 text-[#AD9660]" />
                </div>
                <h3 className="text-lg font-medium text-[#323433] mb-2">Fully Customized</h3>
                <p className="text-sm text-[#1E2A47]/70 font-light">
                  Every element tailored to your specifications and brand identity
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#AD9660]/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-[#AD9660]" />
                </div>
                <h3 className="text-lg font-medium text-[#323433] mb-2">Personal Stylist</h3>
                <p className="text-sm text-[#1E2A47]/70 font-light">
                  Dedicated product stylist to curate the perfect selection
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#AD9660]/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-[#AD9660]" />
                </div>
                <h3 className="text-lg font-medium text-[#323433] mb-2">Premium Quality</h3>
                <p className="text-sm text-[#1E2A47]/70 font-light">
                  Luxury products and elegant packaging for maximum impact
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-[#323433] hover:bg-black text-white px-8 py-6 rounded-md flex items-center gap-2 transition-all duration-300 group"
              >
                <Link href="/quote">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="border-[#323433] text-[#323433] hover:bg-[#323433] hover:text-white px-8 py-6 rounded-md transition-all duration-300"
              >
                <Link href="/contact">
                  <span>Speak to Stylist</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="w-12 h-[1px] bg-[#AD9660] mx-auto mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] mb-4">
              Curated Collection
            </h2>
            <p className="text-[#1E2A47]/70 font-light max-w-2xl mx-auto">
              Explore our showcase of custom curated experiences, each thoughtfully designed 
              to create lasting impressions and strengthen business relationships.
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {Array(10).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No Products Found</h3>
              <p className="text-gray-500">Custom curated products will be available soon.</p>
            </div>
          ) : (
            <>
              {/* Mobile Grid */}
              {isMobile ? (
                <div className="relative">
                  {/* Navigation Arrows */}
                  <button 
                    onClick={prevMobilePage}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#323433]" />
                  </button>
                  
                  <button 
                    onClick={nextMobilePage}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4 text-[#323433]" />
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    {mobileVisibleProducts.map((product, index) => (
                      <ProductCard 
                        key={`${mobilePageIndex}-${index}`}
                        product={product}
                        isMobile={true}
                      />
                    ))}
                  </div>

                  {/* Pagination Dots */}
                  {totalMobilePages > 1 && (
                    <div className="flex justify-center mt-6 gap-1.5">
                      {Array.from({ length: totalMobilePages }).map((_, idx) => (
                        <button
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            mobilePageIndex === idx ? 'bg-[#AD9660] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          onClick={() => setMobilePageIndex(idx)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Desktop Grid - 5 columns
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      isMobile={false}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F4F4F4] via-white to-[#E6E2DD]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="w-12 h-[1px] bg-[#AD9660] mx-auto mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] mb-4">
              Our Curation Process
            </h2>
            <p className="text-[#1E2A47]/70 font-light max-w-2xl mx-auto">
              From initial consultation to final delivery, we ensure every detail 
              reflects your vision and exceeds expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Understanding your vision, requirements, and brand identity"
              },
              {
                step: "02", 
                title: "Curation",
                description: "Our stylists handpick products that align with your goals"
              },
              {
                step: "03",
                title: "Customization", 
                description: "Branding, packaging, and personalization to perfection"
              },
              {
                step: "04",
                title: "Delivery",
                description: "Careful packaging and timely delivery to create wow moments"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.2, duration: 0.6 }
                  }
                }}
              >
                <div className="w-16 h-16 bg-[#AD9660]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#AD9660] font-['Frank_Ruhl_Libre'] text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-medium text-[#323433] mb-3">{item.title}</h3>
                <p className="text-sm text-[#1E2A47]/70 font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  )
}

interface ProductCardProps {
  product: Product
  isMobile: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false)
  const displayImage = product.display_image || product.images?.[0]
  const hoverImage = product.hover_image || product.display_image

  const formatPrice = (product: Product) => {
    if (product.has_price_range && product.price_min && product.price_max) {
      return `₹${parseInt(product.price_min).toLocaleString()} - ₹${parseInt(product.price_max).toLocaleString()}`
    } else {
      return `₹${parseInt(product.price).toLocaleString()}`
    }
  }

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        className="group relative overflow-hidden bg-white rounded-lg transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className={`relative ${isMobile ? 'h-32 sm:h-36' : 'h-40 sm:h-48 md:h-64'} overflow-hidden`}>
          <div className="absolute inset-0 p-4">
            {displayImage && (
              <>
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  className={`object-contain transition-opacity duration-500 ${
                    isHovered && hoverImage ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {hoverImage && hoverImage !== displayImage && (
                  <Image
                    src={hoverImage}
                    alt={`${product.name} hover`}
                    fill
                    className={`object-contain transition-opacity duration-500 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </>
            )}
          </div>
          
          {/* Badge */}
          <div className="absolute top-2 left-2">
            <div className="bg-[#AD9660]/90 text-white text-xs px-3 py-1 rounded-full">
              Custom Curated
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-[#323433] mb-2 line-clamp-2 group-hover:text-[#AD9660] transition-colors duration-300">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-light text-[#AD9660]">
              {formatPrice(product)}
            </span>
            {product.moq && (
              <div className="flex items-center text-xs text-gray-500">
                <Package className="w-3 h-3 mr-1" />
                <span>MOQ: {product.moq}</span>
              </div>
            )}
          </div>

          {product.delivery && (
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Clock className="w-3 h-3 mr-1" />
              <span>{product.delivery}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span className="text-gray-600">Customizable</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#AD9660] group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Art Deco Corner Accent */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-[#AD9660]/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </motion.div>
    </Link>
  )
} 