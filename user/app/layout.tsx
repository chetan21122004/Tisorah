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
})

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-frank-ruhl",
})

export const metadata: Metadata = {
  title: "Tisorah - Exquisite Corporate Gifting Solutions",
  description:
    "Discover sophisticated corporate gifting solutions that elevate your business relationships. Premium quality, bespoke customization, and unparalleled service excellence.",
  keywords: "luxury corporate gifts, premium business gifts, bespoke corporate solutions, executive gifting, Tisorah",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${frankRuhlLibre.variable} font-sans antialiased`}>
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
