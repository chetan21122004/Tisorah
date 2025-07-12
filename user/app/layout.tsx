import type React from "react"
import type { Metadata } from "next"
import { Poppins, Frank_Ruhl_Libre } from "next/font/google"
import "./globals.css"
import "@/styles/patterns.css"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/LandingPage/Navbar"
import Footer from '@/components/LandingPage/Footer'
import { Toaster as SonnerToaster } from "sonner"
import { ShortlistProvider } from "@/lib/ShortlistContext"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import StarFollower from "@/components/LandingPage/StarFollower"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["latin"],
  variable: "--font-frank-ruhl",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Premium Corporate Gifts India | Luxury Corporate Gifting Solutions - Tisorah",
    template: "%s | Tisorah Corporate Gifts"
  },
  description: "India's trusted premium corporate gifting company. Explore 10,000+ luxury corporate gifts, customized gift hampers, branded merchandise, and bulk gifting solutions for employees, clients & business partners. Same-day delivery in major cities.",
  keywords: "corporate gifts india, premium corporate gifts, luxury corporate gifting, corporate gift hampers, branded corporate gifts, bulk corporate gifts, employee gifting solutions, client appreciation gifts, diwali corporate gifts, new year corporate gifts, customized corporate gifts, corporate gift manufacturers india, corporate gifting companies, business gifts india, promotional gifts, executive gifts, sustainable corporate gifts, eco-friendly corporate gifts, corporate gift ideas, corporate gift suppliers india",
  authors: [{ name: "Tisorah Corporate Gifts" }],
  creator: "Tisorah",
  publisher: "Tisorah Corporate Gifts India",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tisorahbox.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Premium Corporate Gifts India | Luxury Corporate Gifting - Tisorah",
    description: "India's trusted premium corporate gifting company. 10,000+ luxury gifts, customized hampers & branded merchandise for employees & clients.",
    url: 'https://tisorahbox.com',
    siteName: 'Tisorah Corporate Gifts',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tisorah - Premium Corporate Gifts India',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premium Corporate Gifts India | Tisorah",
    description: "India's trusted premium corporate gifting company. 10,000+ luxury gifts & customized solutions.",
    images: ['/twitter-image.jpg'],
    creator: '@tisorah',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable} ${frankRuhlLibre.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Tisorah Corporate Gifts",
              "alternateName": "Tisorah",
              "url": "https://tisorahbox.com",
              "logo": "https://tisorahbox.com/logo.png",
              "description": "India's trusted premium corporate gifting company offering luxury gifts, customized hampers, and branded merchandise for businesses.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "India"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["en", "hi"]
              },
              "sameAs": [
                "https://www.facebook.com/tisorah",
                "https://www.instagram.com/tisorah",
                "https://www.linkedin.com/company/tisorah",
                "https://twitter.com/tisorah"
              ],
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "INR",
                "lowPrice": "100",
                "highPrice": "50000",
                "offerCount": "10000"
              }
            })
          }}
        />
      </head>
      <body className={poppins.className}>
        <ShortlistProvider>
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <StarFollower />
          <Toaster />
          <SonnerToaster />
        </ShortlistProvider>
      </body>
    </html>
  )
}
