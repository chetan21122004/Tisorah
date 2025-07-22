"use client"

import React, { ReactNode } from 'react'
import { usePageLoading } from '@/hooks/use-page-loading'
import PremiumPreloader from './PremiumPreloader'
import Navbar from './Navbar'
import Footer from './Footer'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import StarFollower from './StarFollower'

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { isLoading, setIsLoading } = usePageLoading()

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      <PremiumPreloader 
        isLoading={isLoading} 
        onLoadingComplete={handleLoadingComplete}
      />
      <div className={`transition-all duration-1000 ease-out ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <StarFollower />
      </div>
    </>
  )
} 