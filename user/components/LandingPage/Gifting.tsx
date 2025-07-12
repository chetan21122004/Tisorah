'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { IconGift, IconArrowRight, IconPackage, IconPalette, IconChevronRight, IconChevronLeft } from '@tabler/icons-react'
import { useIsMobile } from '@/hooks/use-mobile'

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
    title: 'Ready to Gift',
    image: './display_images/image.png',
    alt: 'Ready to ship gifts',
    text: 'We have a range of ready-to-ship, pre-curated hampers that have been thoughtfully assembled for every occasion imaginable, keeping in mind different clients. Perfectly suitable for a quick purchase or a tight schedule.',
    buttonText: 'Explore Options',
    icon: IconPackage,
  },
  {
    title: 'Semi-Customized',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Semi-Customized.jpg?v=1685185187&width=1240',
    alt: 'Semi customized gifts',
    text: 'Do you see a hamper that you like? We can have your branding on the products you see in a hamper and make it feel like your very own. Adding branding on the products is a small detail that will go a long way.',
    buttonText: 'Customize Now',
    icon: IconPalette,
  },
  {
    title: 'Hamper Curation',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Custom_curated.jpg?v=1685185266&width=1240',
    alt: 'Hamper curation services',
    text: 'Our Products stylist will help you curate truly one-of-a-kind hampers for the most important people in your life - be it family, friends, clients, or your employees, we\'re here to curate a hamper that fits your style, personality, and budget.',
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
        <div className="relative h-48 sm:h-56 md:h-72 overflow-hidden">
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
        <div className="p-5 md:p-8">
          {/* Icon and Title */}
          <motion.div 
            className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.2 }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#AD9660]/10 flex items-center justify-center">
              <Icon size={16} className="text-[#AD9660] md:text-lg" />
            </div>
            <div>
              <div className="w-6 md:w-8 h-[1px] bg-[#AD9660]/30 mb-1 md:mb-2"></div>
              <h3 className="text-lg md:text-xl font-light text-[#323433] font-['Frank_Ruhl_Libre']">{title}</h3>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-xs md:text-sm text-gray-600 mb-5 md:mb-8 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.2 }}
          >
            {text}
          </motion.p>

          <motion.button 
            className="w-full bg-transparent border border-[#AD9660] text-[#323433] px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-[#AD9660] hover:text-white transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
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
            <span className="mr-2 text-xs md:text-sm tracking-wide font-light relative z-10">{buttonText}</span>
            <motion.div
              className="w-3 md:w-4 h-[1px] bg-current relative z-10"
              whileHover={{ width: "20px" }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  </motion.div>
)

const Gifting = () => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  
  const nextSlide = () => {
    if (currentIndex < giftingCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(giftingCards.length - 1);
    }
  };
  
  // Auto slide for mobile with improved performance
  useEffect(() => {
    // Disable auto-sliding completely on mobile to prevent scroll issues
    return;
    
    /* Original auto-sliding code commented out
    if (isMobile) {
      const autoSlideTimer = setTimeout(() => {
        // Use requestAnimationFrame for better performance
        window.requestAnimationFrame(() => {
          nextSlide();
        });
      }, 7000); // Increased from 5000ms to 7000ms for better performance
      
      return () => clearTimeout(autoSlideTimer);
    }
    */
  }, [currentIndex, isMobile]);
  
  // Update animation when current index changes
  useEffect(() => {
    if (isMobile) {
      controls.start({ x: `${-currentIndex * 100}%` });
    }
  }, [currentIndex, controls, isMobile]);

  return (
    <section className="bg-white relative overflow-hidden py-8 md:py-10 pb-0">
      {/* Decorative elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 border border-[#AD9660]/5 rounded-[30%]"
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
          className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 border border-[#AD9660]/5 rounded-[30%]"
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
          className="flex flex-col items-center mb-8 md:mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div
            className="w-10 md:w-12 h-[1px]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: "linear-gradient(to right, transparent, #AD9660, transparent)"
            }}
          />
          
          <motion.div 
            className="flex items-center gap-2 mt-4 md:mt-6 mb-3 md:mb-4"
            variants={fadeInUp}
          >
            <IconGift size={16} className="text-[#AD9660] md:w-5 md:h-5" />
            <span className="text-xs md:text-sm uppercase tracking-wider text-[#AD9660] font-light">Our Services</span>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#323433] mb-3 md:mb-4 text-center"
            variants={fadeInUp}
          >
            The Art of Corporate Gifting
          </motion.h2>
          
          <motion.p
            className="text-gray-600 font-light max-w-2xl mx-auto text-center text-xs md:text-sm lg:text-base"
            variants={fadeInUp}
          >
            Elevating corporate relationships through meticulously curated gift experiences
          </motion.p>
        </motion.div>
        
        {/* Mobile Slider */}
        {isMobile ? (
          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200"
              aria-label="Previous service"
            >
              <IconChevronLeft size={16} className="text-[#323433]" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200"
              aria-label="Next service"
            >
              <IconChevronRight size={16} className="text-[#323433]" />
            </button>
            
            <div className="overflow-hidden">
              <div className="w-full px-2">
                <GiftCard {...giftingCards[currentIndex]} index={currentIndex} />
              </div>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 gap-1.5">
              {giftingCards.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'bg-[#AD9660] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {giftingCards.map((card, idx) => (
            <GiftCard key={idx} {...card} index={idx} />
          ))}
        </div>
        )}
      </div>
    </section>
  )
}

export default Gifting