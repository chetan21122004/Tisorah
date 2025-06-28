"use client";

import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, MessageCircle, Check, Clock, Award, Shield, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const QuoteCTA: FC = () => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className="py-6 md:py-12 bg-gradient-to-br from-[#F8F7F5]/50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 left-0 w-32 h-32 border border-[#AD9660]/10 rotate-45 -translate-x-16 -translate-y-16"
        animate={{ rotate: [45, 60, 45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-64 h-64 border-2 border-[#AD9660]/5 rounded-full translate-x-1/3 translate-y-1/3"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-16 max-w-6xl mx-auto">
          <motion.div 
            className="w-full md:w-3/5 space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full bg-[#F0EBE1] text-[#AD9660] font-medium text-xs md:text-sm">
              <Package className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> Premium Corporate Gifting Solutions
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] leading-tight">
              Transform Your Corporate <span className="text-[#AD9660]">Gifting Experience</span> Today
            </h2>
            
            <p className="text-sm md:text-lg text-gray-600 font-light">
              Join over 500+ companies who trust us with their corporate gifting needs. 
              Get customized solutions that perfectly align with your brand values and budget requirements.
            </p>
            
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-5">
              <StatItem 
                icon={<Clock className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />}
                value="48 Hours" 
                label="Quick Turnaround Time" 
              />
              <StatItem 
                icon={<Award className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />}
                value="500+" 
                label="Happy Corporate Clients" 
              />
              <StatItem 
                icon={<Shield className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />}
                value="100%" 
                label="Quality Guaranteed" 
              />
              <StatItem 
                icon={<Package className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />}
                value="5000+" 
                label="Products Delivered" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <FeatureItem text="Custom Branding & Packaging" />
              <FeatureItem text="Bulk Order Discounts" />
              <FeatureItem text="Pan-India Delivery" />
              <FeatureItem text="Sustainable & Premium Options" />
            </div>
            
            <div className="flex flex-col xs:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <Button className="h-10 md:h-12 px-4 md:px-8 bg-[#AD9660] hover:bg-[#8d7c50] text-white rounded-md flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base">
                <Link href="/quote" className="flex items-center gap-2 w-full justify-center">
                  <span className="font-medium">Get Your Free Quote Now</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </Button>
              
              {isMobile ? (
                <Button variant="outline" className="h-10 md:h-12 px-4 md:px-8 border-[#323433] text-[#323433] hover:bg-[#323433] hover:text-white rounded-md transition-all duration-300 text-sm md:text-base">
                  <Link href="tel:+918088848484" className="flex items-center justify-center gap-2 w-full">
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-medium">Call Us Now</span>
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="h-10 md:h-12 px-4 md:px-8 border-[#323433] text-[#323433] hover:bg-[#323433] hover:text-white rounded-md transition-all duration-300 text-sm md:text-base">
                  <Link href="tel:+918088848484" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-medium">Call Us: +91 80888 48484</span>
                  </Link>
                </Button>
              )}
            </div>
            
            <p className="text-xs md:text-sm text-gray-500 italic">
              "We respond to all quote requests within 24 hours with a detailed proposal tailored to your needs."
            </p>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-2/5 relative mt-6 md:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div 
              className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-square shadow-xl border-4 md:border-8 border-white"
              animate={isHovered ? { scale: 1.03 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image 
                src="https://corporategiftsbyconfetti.in/cdn/shop/files/Exemplary.png?v=1713181877&width=500" 
                alt="Corporate Gifting Solutions" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/60 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                <div className="text-white text-sm sm:text-base md:text-xl font-light font-['Frank_Ruhl_Libre']">
                  Customized Corporate Gift Boxes
                </div>
                <div className="flex items-center gap-2 mt-1 md:mt-2">
                  <div className="px-2 md:px-3 py-0.5 md:py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px] md:text-xs">
                    Premium Quality
                  </div>
                  <div className="px-2 md:px-3 py-0.5 md:py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px] md:text-xs">
                    Branded
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute top-2 md:top-4 right-2 md:right-4 bg-white p-2 md:p-4 rounded-lg md:rounded-xl shadow-lg"
              animate={isHovered ? { y: -5 } : { y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <Package className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />
                <span className="font-medium text-xs md:text-sm">Premium Quality</span>
              </div>
              <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">Customized for your brand</p>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-2 md:-bottom-4 -left-2 md:-left-4 bg-[#AD9660] text-white p-2 md:p-4 rounded-lg md:rounded-xl shadow-lg transform rotate-3"
              animate={isHovered ? { rotate: 6, scale: 1.05 } : { rotate: 3, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-lg md:text-2xl font-bold">30% OFF</div>
              <p className="text-[10px] md:text-xs">On Bulk Orders</p>
            </motion.div>
            
            <motion.div 
              className="absolute -top-2 -right-2 w-16 md:w-24 h-16 md:h-24 rotate-12"
              animate={isHovered ? { rotate: 18 } : { rotate: 12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full bg-[#323433] text-white rounded-full flex flex-col items-center justify-center transform rotate-[-12deg]">
                <span className="text-[8px] md:text-xs font-light">Limited Time</span>
                <span className="text-sm md:text-lg font-medium">OFFER</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface FeatureItemProps {
  text: string;
}

const FeatureItem: FC<FeatureItemProps> = ({ text }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <div className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#E6E2DD]">
        <Check className="w-2 h-2 md:w-3 md:h-3 text-[#AD9660]" />
      </div>
      <span className="text-[10px] xs:text-xs md:text-sm text-gray-700 font-medium">{text}</span>
    </div>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem: FC<StatItemProps> = ({ icon, value, label }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 bg-[#F0EBE1]/50 p-2 md:p-3 rounded-lg">
      <div className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <div className="font-medium text-xs sm:text-sm md:text-lg text-[#323433]">{value}</div>
        <div className="text-[8px] xs:text-[10px] md:text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export default QuoteCTA; 