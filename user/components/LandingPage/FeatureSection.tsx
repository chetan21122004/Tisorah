'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IconGift, IconGiftCard, IconConfetti, IconStars } from '@tabler/icons-react'

interface FeatureProps {
  title: string
  description: string
  image: string
  isReversed?: boolean
  ctaLink?: string
  ctaText?: string
  highlightedText?: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
}

const decorativeIcons = [
  { Icon: IconGift, color: "#AD9660" },
  { Icon: IconGiftCard, color: "#323433" },
  { Icon: IconConfetti, color: "#AB8E76" },
  { Icon: IconStars, color: "#C8C2B6" }
]

export default function FeatureSection({
  title,
  description,
  image,
  isReversed = false,
  ctaLink,
  ctaText = "Learn More",
  highlightedText
}: FeatureProps) {
  return (
    <div className="w-full relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 transform -translate-x-1/2 opacity-5">
          <IconGift size={120} stroke={1} />
        </div>
        <div className="absolute bottom-0 right-1/4 transform translate-x-1/2 opacity-5">
          <IconGiftCard size={120} stroke={1} />
        </div>
      </div>

      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 relative z-10`}>
        {/* Image Section */}
        <motion.div 
          className="w-full md:w-1/2 group"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-[#323433]/5 z-10"></div>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
            </motion.div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#AD9660]/30 rounded-tl-lg"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#AD9660]/30 rounded-br-lg"></div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="w-full md:w-1/2 text-center md:text-left"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center md:justify-start mb-6">
            <motion.div 
              className="w-12 h-[1px] bg-[#AD9660]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
            <motion.span 
              className="ml-4 text-sm uppercase tracking-wider text-[#AD9660] font-light flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <IconGift size={16} className="mr-2" />
              Corporate Gifting
            </motion.span>
          </div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-serif mb-6 text-[#323433] font-light leading-tight"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            className="text-[#323433]/70 text-base md:text-lg max-w-xl mx-auto md:mx-0 font-light leading-relaxed mb-8"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            {highlightedText ? (
              <>
                {description.split(highlightedText)[0]}
                <span className="text-[#AD9660]">{highlightedText}</span>
                {description.split(highlightedText)[1]}
              </>
            ) : (
              description
            )}
          </motion.p>

          {ctaLink && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link href={ctaLink}>
                <button className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-light tracking-wide text-[#323433] border border-[#323433] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#323433] hover:text-white">
                  <span className="absolute inset-0 w-full h-full bg-[#AD9660] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  <span className="relative flex items-center">
                    {ctaText}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
            </motion.div>
          )}

          {/* Floating Icons */}
          {decorativeIcons.map(({ Icon, color }, index) => (
            <motion.div
              key={index}
              className="absolute hidden md:block"
              style={{
                top: `${20 + index * 25}%`,
                left: isReversed ? `${85 + Math.random() * 10}%` : `${-5 - Math.random() * 10}%`,
                color
              }}
              animate={{
                y: [0, 10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.5
              }}
            >
              <Icon size={24} className="opacity-20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 