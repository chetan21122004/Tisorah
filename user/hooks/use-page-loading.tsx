"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Set loading to true when pathname changes
    setIsLoading(true)

    // Check for images and components loading
    const checkAllLoaded = () => {
      const images = document.querySelectorAll('img')
      const heroSection = document.querySelector('[class*="hero"]') || document.querySelector('section')
      const loadingSkeletons = document.querySelectorAll('.animate-pulse')
      
      let imagesLoaded = 0
      const totalImages = images.length
      let checkCount = 0
      const maxChecks = 50 // Maximum checks to prevent infinite loops

      const finalCheck = () => {
        checkCount++
        
        // Wait for loading skeletons to disappear (hero section data loaded)
        const currentSkeletons = document.querySelectorAll('.animate-pulse')
        const hasContent = document.querySelectorAll('[class*="grid"] img').length > 0
        
        if (currentSkeletons.length === 0 && hasContent && heroSection) {
          // All content loaded
          setTimeout(() => setIsLoading(false), 800)
          return true
        } else if (checkCount < maxChecks) {
          // Check again in a bit
          setTimeout(finalCheck, 100)
          return false
        } else {
          // Fallback - force finish loading
          setTimeout(() => setIsLoading(false), 500)
          return true
        }
      }

      if (totalImages === 0) {
        // No images initially, but still wait for dynamic content
        setTimeout(finalCheck, 1000)
        return
      }

      const imageLoadHandler = () => {
        imagesLoaded++
        if (imagesLoaded >= totalImages) {
          // All initial images loaded, now check for dynamic content
          setTimeout(finalCheck, 500)
        }
      }

      images.forEach(img => {
        if (img.complete) {
          imageLoadHandler()
        } else {
          img.addEventListener('load', imageLoadHandler)
          img.addEventListener('error', imageLoadHandler) // Count errors as "loaded"
        }
      })

      // Fallback timer in case something goes wrong
      const fallbackTimer = setTimeout(() => {
        setIsLoading(false)
      }, 8000) // Maximum 8 seconds

      return () => {
        clearTimeout(fallbackTimer)
        images.forEach(img => {
          img.removeEventListener('load', imageLoadHandler)
          img.removeEventListener('error', imageLoadHandler)
        })
      }
    }

    // Wait for DOM to be ready first
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAllLoaded)
    } else {
      checkAllLoaded()
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', checkAllLoaded)
    }
  }, [pathname])

  return { isLoading, setIsLoading }
} 