import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import "@/styles/patterns.css"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/LandingPage/Navbar"
import Footer from '@/components/LandingPage/Footer'
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
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
      <body className={`${poppins.variable} font-sans antialiased`}>
      <link href="https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Cursive:wght@400..700&display=swap" rel="stylesheet" />
        <Navbar></Navbar>
        <main>{children}</main>
<Footer />
        
        <Toaster />
      </body>
    </html>
  )
}
