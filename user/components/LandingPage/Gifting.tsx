'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IconGift, IconArrowRight, IconPackage, IconPalette } from '@tabler/icons-react'

interface GiftCard {
  title: string
  image: string
  alt: string
  text: string
  buttonText: string
  icon: React.ElementType
}

interface GiftCardProps extends GiftCard {
  index: number
}

const giftingCards: GiftCard[] = [
  {
    title: 'Ready to Ship',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Ready_to_ship.jpg?v=1685185091',
    alt: 'Ready to ship gifts',
    text: 'Experience our curated collection of ready-to-ship corporate gifts, meticulously handcrafted and elegantly assembled for every occasion.',
    buttonText: 'Explore Options',
    icon: IconPackage,
  },
  {
    title: 'Semi-Customized',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Semi-Customized.jpg?v=1685185187&width=1240',
    alt: 'Semi customized gifts',
    text: 'Transform our exquisite hampers into your own by incorporating your distinctive branding, creating a perfect blend of luxury and personalization.',
    buttonText: 'Customize Now',
    icon: IconPalette,
  },
  {
    title: 'Custom Curated',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Custom_curated.jpg?v=1685185266&width=1240',
    alt: 'Custom curated gifts',
    text: 'Our expert stylists craft bespoke gift experiences, creating unique hampers that reflect your appreciation for clients, employees, and loved ones.',
    buttonText: 'Start Creating',
    icon: IconGift,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

const GiftCard = ({ title, image, alt, text, buttonText, icon: Icon, index }: GiftCardProps) => (
  <motion.div
    className="group relative"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
  >
    <motion.div 
      className="bg-white rounded-xl overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Decorative border */}
        <motion.div
          className="absolute inset-0 border-2 rounded-xl z-10"
          initial={{ borderColor: "rgba(173, 150, 96, 0)" }}
          whileHover={{ borderColor: "rgba(173, 150, 96, 0.2)" }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Image container */}
        <div className="relative h-72 overflow-hidden">
          <motion.img 
            src={image} 
            alt={alt} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#323433]/70 via-[#323433]/20 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Icon and Title */}
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#AD9660]/10 flex items-center justify-center">
              <Icon size={20} className="text-[#AD9660]" />
            </div>
            <div>
              <div className="w-8 h-[1px] bg-[#AD9660]/30 mb-2"></div>
              <h3 className="text-xl font-light text-[#323433] font-['Frank_Ruhl_Libre']">{title}</h3>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 mb-8 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.2 }}
          >
            {text}
          </motion.p>

          <motion.button 
            className="w-full bg-transparent border border-[#AD9660] text-[#323433] px-8 py-3 rounded-full hover:bg-[#AD9660] hover:text-white transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#AD9660]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ opacity: 0.1 }}
            />
            <span className="mr-2 text-sm tracking-wide font-light relative z-10">{buttonText}</span>
            <motion.div
              className="w-4 h-[1px] bg-current relative z-10"
              whileHover={{ width: "24px" }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  </motion.div>
)

const Gifting = () => {
  return (
    <section className="bg-white relative overflow-hidden py-10 pb-0">
      {/* Decorative elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 border border-[#AD9660]/5 rounded-[30%]"
          animate={{ 
            rotate: [45, 90, 45],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 border border-[#AD9660]/5 rounded-[30%]"
          animate={{ 
            rotate: [-45, -90, -45],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, rgba(173, 150, 96, 0.1), transparent)"
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="flex flex-col items-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div
            className="w-12 h-[1px]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: "linear-gradient(to right, transparent, #AD9660, transparent)"
            }}
          />
          
          <motion.div 
            className="flex items-center gap-2 mt-6 mb-4"
            variants={fadeInUp}
          >
            <IconGift size={20} className="text-[#AD9660]" />
            <span className="text-sm uppercase tracking-wider text-[#AD9660] font-light">Our Services</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre'] text-center"
            variants={fadeInUp}
          >
            The Art of Corporate Gifting
          </motion.h2>
          
          <motion.p
            className="text-gray-600 font-light max-w-2xl mx-auto text-center text-sm md:text-base"
            variants={fadeInUp}
          >
            Elevating corporate relationships through meticulously curated gift experiences
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {giftingCards.map((card, idx) => (
            <GiftCard key={idx} {...card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gifting