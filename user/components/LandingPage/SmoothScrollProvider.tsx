"use client"

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Wait a bit for the page to load before initializing smooth scrolling
    const initTimer = setTimeout(() => {
      // Initialize Lenis
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      // Animation frame function
      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      // Store lenis instance for cleanup
      return () => {
        lenis.destroy()
      }
    }, 1000) // Wait 1 second before initializing

    return () => {
      clearTimeout(initTimer)
    }
  }, [])

  return <>{children}</>
} 