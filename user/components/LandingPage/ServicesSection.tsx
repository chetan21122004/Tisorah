"use client";

import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Briefcase, Award, Package, Palette, ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const ServicesSection: FC = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const services = [
    {
      title: "Corporate Branding",
      description: "Transform ordinary products into powerful brand ambassadors with our custom branding solutions. Perfect for enhancing brand recall and employee pride.",
      icon: <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />,
      image: "https://corporategiftsbyconfetti.in/cdn/shop/files/Exemplary.png?v=1713181877&width=500",
      alt: "Corporate Branding Solutions",
      benefits: ["Logo customization", "Brand color matching", "Premium packaging"]
    },
    {
      title: "Recognition Awards",
      description: "Celebrate achievements with premium recognition gifts that inspire and motivate. Our awards create a culture of appreciation and excellence.",
      icon: <Award className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />,
      image: "https://corporategiftsbyconfetti.in/cdn/shop/files/KeepRocking.png?v=1713177837&width=500",
      alt: "Employee Recognition Gifts",
      benefits: ["Personalized awards", "Achievement certificates", "Premium gift boxes"]
    },
    {
      title: "Welcome Kits",
      description: "Create an exceptional onboarding experience with our thoughtfully curated welcome kits. Make new team members feel valued from day one.",
      icon: <Package className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />,
      image: "https://corporategiftsbyconfetti.in/cdn/shop/files/WorkEssentials.png?v=1713001095&width=500",
      alt: "Welcome Kits",
      benefits: ["Branded essentials", "Personalized welcome notes", "Utility-focused items"]
    },
    {
      title: "Custom Hampers",
      description: "Create memorable gifting experiences with our bespoke gift hampers. Perfect for festivals, client appreciation, or celebrating corporate milestones.",
      icon: <Palette className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />,
      image: "https://www.boxupgifting.com/cdn/shop/files/joyce-g-3y9ymqvRR_s-unsplash_copy_2accb539-f2c2-4e4b-8997-f7751abc1209.jpg?v=1744178278",
      alt: "Customized Gift Hampers",
      benefits: ["Theme-based curation", "Luxury packaging", "Personalized messaging"]
    }
  ];

  return (
    <section className="relative bg-white overflow-hidden py-6 ">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 opacity-10"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <Image 
          src="/geometry_pattern.jpg" 
          alt="Decorative pattern" 
          width={256} 
          height={256} 
          className="object-cover"
        />
      </motion.div>
      <motion.div 
        className="absolute bottom-0 right-0 w-40 h-40 md:w-80 md:h-80 opacity-10"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      >
        <Image 
          src="/geometry_pattern.jpg" 
          alt="Decorative pattern" 
          width={320} 
          height={320} 
          className="object-cover"
        />
      </motion.div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-3 md:px-4 py-1 rounded-full bg-[#F0EBE1] text-[#AD9660] text-xs md:text-sm mb-3 md:mb-4">
            <Gift className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> Premium Corporate Solutions
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-[#323433] mb-3 md:mb-4">
            Elevate Your <span className="text-[#AD9660]">Corporate Gifting</span> Strategy
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mb-4 md:mb-8">
            Transform ordinary corporate occasions into memorable experiences with our premium gifting solutions tailored to your brand's unique identity and objectives.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-2 md:mb-4">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Star className="w-3 h-3 md:w-4 md:h-4 text-[#AD9660] mr-1 md:mr-2" />
              <span className="text-xs md:text-sm text-gray-700">500+ Happy Clients</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Check className="w-3 h-3 md:w-4 md:h-4 text-[#AD9660] mr-1 md:mr-2" />
              <span className="text-xs md:text-sm text-gray-700">Premium Quality Guaranteed</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Package className="w-3 h-3 md:w-4 md:h-4 text-[#AD9660] mr-1 md:mr-2" />
              <span className="text-xs md:text-sm text-gray-700">Pan-India Delivery</span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Services grid - optimized for mobile with horizontal scrolling on small screens */}
        {isMobile ? (
          <div className="overflow-x-auto pb-6 -mx-4 px-4">
            <div className="flex space-x-4" style={{ minWidth: 'max-content' }}>
              {services.map((service, index) => (
                <div key={index} className="w-[280px]">
                  <ServiceCard 
                    {...service}
                    isActive={activeIndex === index}
                    onHover={() => setActiveIndex(index)}
                    onLeave={() => setActiveIndex(null)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {services.map((_, index) => (
                <button 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${activeIndex === index ? 'bg-[#AD9660] w-4' : 'bg-gray-300'}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                {...service}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                onLeave={() => setActiveIndex(null)}
              />
            ))}
          </div>
        )}
        
        {/* Enhanced CTA Section */}
        <motion.div 
          className="mt-6 md:mt-10 bg-[#F0EBE1] rounded-lg md:rounded-xl p-4 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <div className="md:w-2/3">
              <h3 className="text-xl md:text-3xl font-serif font-light text-[#323433] mb-2 md:mb-3">
                Ready for a <span className="text-[#AD9660]">Custom Solution?</span>
              </h3>
              <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">
                Our corporate gifting experts will help you create the perfect gifting strategy tailored to your specific requirements and budget. Get a personalized quote today!
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <motion.div 
                  className="flex items-center gap-1 md:gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-2 h-2 md:w-3 md:h-3 text-[#AD9660]" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-700">Free consultation</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1 md:gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-2 h-2 md:w-3 md:h-3 text-[#AD9660]" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-700">No minimum order</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1 md:gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-2 h-2 md:w-3 md:h-3 text-[#AD9660]" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-700">Bulk discounts available</span>
                </motion.div>
              </div>
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full md:w-auto bg-[#AD9660] hover:bg-[#8d7c50] text-white px-4 md:px-8 py-2 md:py-6 rounded-md flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base">
                  <Link href="/quote" className="flex items-center gap-2">
                    <span className="font-medium">Request Free Consultation</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  alt: string;
  benefits: string[];
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

const ServiceCard: FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon, 
  image, 
  alt, 
  benefits,
  isActive,
  onHover,
  onLeave
}) => {
  return (
    <motion.div 
      className="group h-full"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col ${isActive ? 'ring-2 ring-[#AD9660]/50' : ''}`}>
        <div className="relative h-40 md:h-52 overflow-hidden">
          <Image 
            src={image} 
            alt={alt} 
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-3 md:p-4 w-full">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button variant="secondary" size="sm" className="w-full bg-white/80 backdrop-blur-sm hover:bg-white text-[#323433] font-medium text-xs md:text-sm py-1 md:py-2">
                  <Link href="/quote" className="flex items-center justify-center gap-1 md:gap-2 w-full">
                    <span>Get Quote</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="p-3 md:p-6 flex flex-col flex-grow">
          <div className="flex items-center mb-2 md:mb-3">
            <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#F0EBE1] flex items-center justify-center mr-2 md:mr-3">
              {icon}
            </div>
            <h3 className="font-['Frank_Ruhl_Libre'] text-base md:text-xl text-[#323433] font-medium">{title}</h3>
          </div>
          
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 flex-grow">
            {description}
          </p>
          
          <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="flex items-start gap-1 md:gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Check className="w-3 h-3 md:w-4 md:h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                <span className="text-[10px] md:text-xs text-gray-600">{benefit}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="inline-flex items-center text-[#323433] hover:text-[#AD9660] transition-colors group-hover:text-[#AD9660] font-medium text-xs md:text-sm"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/quote" className="flex items-center">
              <span className="mr-1 md:mr-2">Request Custom Quote</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesSection; 