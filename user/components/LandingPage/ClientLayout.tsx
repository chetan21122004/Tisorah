"use client"

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import PremiumPreloader from './PremiumPreloader'
import Navbar from './Navbar'
import Footer from './Footer'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import StarFollower from './StarFollower'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showContent, setShowContent] = useState(false)
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    if (isHomePage) {
      // Check if we've navigated within this session
      const hasNavigated = sessionStorage.getItem('has-navigated')
      
      if (!hasNavigated) {
        // First visit or refresh - show preloader
        setShouldShowPreloader(true)
        setShowContent(false)
      } else {
        // We've navigated before in this session - skip preloader
        setShouldShowPreloader(false)
        setShowContent(true)
      }
    } else {
      // Not home page - show content immediately and mark as navigated
      sessionStorage.setItem('has-navigated', 'true')
      setShouldShowPreloader(false)
      setShowContent(true)
    }
  }, [isHomePage])

  // Track route changes to mark navigation
  useEffect(() => {
    if (!isHomePage) {
      sessionStorage.setItem('has-navigated', 'true')
    }
  }, [pathname, isHomePage])

  const handleLoadingComplete = () => {
    // Mark that we've now navigated (for subsequent visits to home page)
    sessionStorage.setItem('has-navigated', 'true')
    setShouldShowPreloader(false)
    setShowContent(true)
  }

  return (
    <>
      {/* Show preloader when needed */}
      {shouldShowPreloader && (
        <PremiumPreloader onLoadingComplete={handleLoadingComplete} />
      )}
      
      {/* Show content when ready */}
      {showContent && (
        <>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <StarFollower />
        </>
      )}
    </>
  )
} 