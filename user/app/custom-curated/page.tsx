import React from 'react'
import { Metadata } from 'next/metadata'
import CustomCuratedPageClient from './CustomCuratedPageClient'

export const metadata: Metadata = {
  title: "Custom Curated Corporate Gifts | Bespoke Luxury Gift Solutions - TisorahBox",
  description: "Discover our premium custom curated corporate gifts collection. Fully customized and curated gift experiences tailored to your brand and recipients. Perfect for executives, clients, and special occasions.",
  keywords: "custom curated gifts, bespoke corporate gifts, luxury customized hampers, personalized gift experiences, executive gifts, custom corporate packages",
  alternates: {
    canonical: '/custom-curated',
  }
}

export default function CustomCuratedPage() {
  return <CustomCuratedPageClient />
} 