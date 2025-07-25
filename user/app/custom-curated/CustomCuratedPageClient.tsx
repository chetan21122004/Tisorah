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
  Shield
} from 'lucide-react'

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

  useEffect(() => {
    const fetchCustomCuratedProducts = async () => {
      try {
        const supabase = createClientComponentClient()
        
        // Fetch products from custom curated categories
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

        // Remove duplicates based on product ID
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

  const formatPrice = (product: Product) => {
    if (product.has_price_range && product.price_min && product.price_max) {
      return `₹${parseInt(product.price_min).toLocaleString()} - ₹${parseInt(product.price_max).toLocaleString()}`
    } else {
      return `₹${parseInt(product.price).toLocaleString()}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] via-white to-[#E6E2DD]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #AD9660 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, #AB8E76 0%, transparent 50%)
            `,
            backgroundSize: '400px 400px, 300px 300px'
          }} />
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
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-[#323433] mb-6 leading-tight">
                Custom Curated
                <span className="block text-[#AD9660]">Gift Experiences</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Meticulously crafted, one-of-a-kind hampers designed to reflect your brand's personality 
                and create unforgettable moments for your most valued relationships.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#AD9660]/10 rounded-full flex items-center justify-center mb-4">
                  <Palette className="w-8 h-8 text-[#AD9660]" />
                </div>
                <h3 className="text-lg font-medium text-[#323433] mb-2">Fully Customized</h3>
                <p className="text-sm text-gray-600 font-light">
                  Every element tailored to your specifications and brand identity
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#AD9660]/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-[#AD9660]" />
                </div>
                <h3 className="text-lg font-medium text-[#323433] mb-2">Personal Stylist</h3>
                <p className="text-sm text-gray-600 font-light">
                  Dedicated product stylist to curate the perfect selection
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#AD9660]/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-[#AD9660]" />
                </div>
                <h3 className="text-lg font-medium text-[#323433] mb-2">Premium Quality</h3>
                <p className="text-sm text-gray-600 font-light">
                  Luxury products and elegant packaging for maximum impact
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-[#323433] hover:bg-black text-white px-8 py-6 rounded-md flex items-center gap-2 transition-all duration-300"
              >
                <Link href="/quote">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="w-12 h-[1px] bg-[#AD9660] mx-auto mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#323433] mb-4">
              Curated Collection
            </h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              Explore our showcase of custom curated experiences, each thoughtfully designed 
              to create lasting impressions and strengthen business relationships.
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No Products Found</h3>
              <p className="text-gray-500">Custom curated products will be available soon.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {products.map((product, index) => {
                const displayImage = product.display_image || product.images?.[0]
                const hoverImage = product.hover_image || product.display_image

                return (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <Link href={`/products/${product.id}`}>
                      <Card 
                        className="group cursor-pointer transition-all duration-500 hover:shadow-xl border-0 bg-white overflow-hidden"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-gray-50">
                          {displayImage ? (
                            <>
                              <Image 
                                src={displayImage}
                                alt={product.name}
                                fill
                                className={`object-contain p-4 transition-opacity duration-500 ${
                                  hoveredProduct === product.id ? 'opacity-0' : 'opacity-100'
                                }`}
                              />
                              {hoverImage && hoverImage !== displayImage && (
                                <Image
                                  src={hoverImage}
                                  alt={`${product.name} hover`}
                                  fill
                                  className={`object-contain p-4 transition-opacity duration-500 ${
                                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                                  }`}
                                />
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-16 h-16 text-gray-300" />
                            </div>
                          )}
                          
                          {/* Badges */}
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-[#AD9660]/90 text-white border-0">
                              Custom Curated
                            </Badge>
                          </div>

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <CardContent className="p-6">
                          <h3 className="font-medium text-[#323433] text-lg mb-3 line-clamp-2 group-hover:text-[#AD9660] transition-colors duration-300">
                            {product.name}
                          </h3>
                          
                          <p className="text-sm text-gray-600 font-light mb-4 line-clamp-3 leading-relaxed">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-medium text-[#AD9660]">
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
                            <div className="flex items-center text-xs text-gray-500 mb-4">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{product.delivery}</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-xs text-gray-600">Customizable</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#AD9660] group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Process Section */}
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
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#323433] mb-4">
              Our Curation Process
            </h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
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
                  <span className="text-[#AD9660] font-serif text-lg font-medium">{item.step}</span>
                </div>
                <h3 className="text-lg font-medium text-[#323433] mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#323433] to-[#1E2A47]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-6">
              Ready to Create Something Extraordinary?
            </h2>
            <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto mb-8">
              Let our product stylists help you curate the perfect gift experience 
              that reflects your brand and delights your recipients.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-[#AD9660] hover:bg-[#AB8E76] text-white px-8 py-6 rounded-md transition-all duration-300"
              >
                <Link href="/quote">
                  <span>Start Your Custom Project</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#323433] px-8 py-6 rounded-md transition-all duration-300"
              >
                <Link href="/contact">
                  <span>Schedule Consultation</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 