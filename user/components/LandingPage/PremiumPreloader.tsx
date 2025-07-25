"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface PremiumPreloaderProps {
  onLoadingComplete?: () => void
}

export default function PremiumPreloader({ onLoadingComplete }: PremiumPreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)

  const loadingMessages = [
    "Crafting Excellence...",
    "Curating Premium Gifts...",
    "Preparing Luxury Experience...",
    "Almost Ready..."
  ]

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete?.()
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    // Show logo after initial animation
    setTimeout(() => setShowLogo(true), 300)

    // Cycle through loading messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 800)

    return () => {
      clearInterval(interval)
      clearInterval(messageInterval)
    }
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1E2A47] via-[#323433] to-[#1E2A47]"
    >
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(173, 150, 96, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(173, 150, 96, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(244, 244, 244, 0.1) 0%, transparent 60%)
          `,
          backgroundSize: '400px 400px, 300px 300px, 500px 500px'
        }} />
      </div>

      {/* Luxury Shimmer Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10px] opacity-40"
          animate={{
            background: [
              'linear-gradient(45deg, transparent 30%, rgba(173, 150, 96, 0.2) 50%, transparent 70%)',
              'linear-gradient(45deg, transparent 60%, rgba(173, 150, 96, 0.3) 80%, transparent 100%)',
              'linear-gradient(45deg, transparent 30%, rgba(173, 150, 96, 0.2) 50%, transparent 70%)'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={showLogo ? { 
            scale: 1, 
            rotate: 0,
            transition: { 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              duration: 1.2 
            }
          } : {}}
          className="relative"
        >
          <div className="relative w-40 h-40 md:w-52 md:h-52">
            {/* Decorative Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-[#AD9660] rounded-full opacity-40"
              style={{
                borderStyle: 'dashed',
                borderSpacing: '15px'
              }}
            />
            
            {/* Logo */}
            <div className="absolute inset-4 bg-white rounded-full shadow-2xl flex items-center justify-center border border-[#AD9660]/30">
              <Image
                src="/logo.png"
                alt="TisorahBox"
                width={160}
                height={160}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showLogo ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.5, duration: 0.8 }
          } : {}}
          className="text-center"
        >
          <p className="text-sm md:text-base font-sans text-[#AD9660] font-light tracking-[0.2em] mt-1">
          PREMIUM CORPORATE GIFTS
          </p>
        </motion.div>

        {/* Elegant Separator Line */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={showLogo ? { 
            opacity: 1, 
            width: 120,
            transition: { delay: 0.8, duration: 0.8 }
          } : {}}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#AD9660] to-transparent"
        />

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showLogo ? { 
            opacity: 1,
            transition: { delay: 1.2, duration: 0.6 }
          } : {}}
          className="text-center"
        >
          <motion.p 
            key={messageIndex}
            className="text-sm font-sans text-[#E6E2DD] font-light tracking-[0.15em]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {loadingMessages[messageIndex]}
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={showLogo ? { 
            opacity: 0.8, 
            scale: 1,
            transition: { delay: 1.5, duration: 0.8 }
          } : {}}
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#AD9660]"
        />
        
        {/* Bottom Right Corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={showLogo ? { 
            opacity: 0.8, 
            scale: 1,
            transition: { delay: 1.7, duration: 0.8 }
          } : {}}
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#AD9660]"
        />
      </div>

      {/* Elegant Particle Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#AD9660] rounded-full opacity-60"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-5, 5, -5],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
} 