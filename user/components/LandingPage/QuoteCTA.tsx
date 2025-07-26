"use client";

import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, Phone, ShoppingBag, Star, Users, Truck, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useShortlist } from '@/lib/ShortlistContext';

const QuoteCTA: FC = () => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const { shortlist } = useShortlist();
  const hasShortlistedItems = shortlist && shortlist.length > 0;
  
  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-[#F4F4F4] via-white to-[#E6E2DD]/30 relative overflow-hidden">
      {/* Art Deco geometric elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 border border-[#AD9660] transform rotate-45 -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-[#323433] transform rotate-12 translate-x-24 translate-y-24"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-[#AB8E76] transform -rotate-12"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#AD9660]/10 text-[#AD9660] font-medium text-sm mb-4">
              <Star className="w-4 h-4 mr-2" />
              Bespoke Corporate Gifting Excellence
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] leading-tight mb-4">
              Elevate Your Brand Through 
              <span className="text-[#AD9660] block md:inline"> Thoughtful Gifting</span>
            </h2>
            <p className="text-lg text-[#1E2A47]/70 font-light max-w-2xl mx-auto">
              Trusted by 40+ elite clients for premium, customized corporate gifting solutions 
              that reflect your brand's sophistication and values.
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left content */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Key stats in clean grid */}
              <div className="grid grid-cols-2 gap-4">
                <StatCard 
                  icon={<Users className="w-5 h-5 text-[#AD9660]" />}
                  value="40K+" 
                  label="Luxury Boxes Delivered" 
                />
                <StatCard 
                  icon={<Award className="w-5 h-5 text-[#AD9660]" />}
                  value="3+" 
                  label="Years of Excellence" 
                />
                <StatCard 
                  icon={<Package className="w-5 h-5 text-[#AD9660]" />}
                  value="100%" 
                  label="Bespoke Curation" 
                />
                <StatCard 
                  icon={<Truck className="w-5 h-5 text-[#AD9660]" />}
                  value="Pan-India" 
                  label="Premium Delivery" 
                />
              </div>

              {/* Key features */}
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#E6E2DD]">
                <h3 className="font-['Frank_Ruhl_Libre'] text-lg font-medium text-[#323433] mb-4">
                  Our Expertise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FeatureItem text="Custom Branding & Logo Integration" />
                  <FeatureItem text="Sustainable Luxury Packaging" />
                  <FeatureItem text="Wellness & Gourmet Curation" />
                  <FeatureItem text="Art Deco Aesthetic Design" />
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {hasShortlistedItems ? (
                  <Button className="h-12 px-6 bg-[#AD9660] hover:bg-[#8d7c50] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group">
                    <Link href="/quote?type=shortlist" className="flex items-center gap-2 w-full justify-center">
                      <ShoppingBag className="w-5 h-5" />
                      <span className="font-medium">Quote Shortlisted Items</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                ) : (
                  <Button className="h-12 px-6 bg-[#AD9660] hover:bg-[#8d7c50] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group">
                    <Link href="/quote" className="flex items-center gap-2 w-full justify-center">
                      <span className="font-medium">Get Bespoke Quote</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
                
                <Button variant="outline" className="h-12 px-6 border-[#323433] text-[#323433] hover:bg-[#323433] hover:text-white rounded-lg transition-all duration-300">
                  <Link href="tel:+919860002313" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">{isMobile ? 'Call Now' : '+91 93701 72365'}</span>
                  </Link>
                </Button>
              </div>

              <p className="text-sm text-[#1E2A47]/60 italic border-l-2 border-[#AD9660] pl-4">
                "We curate each gift box as a celebration of thoughtfulness, creativity, and elegance — 
                ensuring every unboxing experience tells your brand's story."
              </p>
            </motion.div>

            {/* Right visual */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <motion.div
                  className="aspect-[4/3] relative"
                  animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image 
                    src="https://corporategiftsbyconfetti.in/cdn/shop/files/Exemplary.png?v=1713181877&width=500" 
                    alt="Bespoke Corporate Gift Boxes - Tisorah" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/50 via-transparent to-transparent"></div>
                  
                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white font-['Frank_Ruhl_Libre'] text-xl font-light mb-2">
                      Luxury Corporate Gifting
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                        Bespoke
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                        Premium
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating quality badge */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-[#AD9660] text-white p-4 rounded-xl shadow-lg"
                animate={isHovered ? { scale: 1.05, rotate: 3 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">Premium</div>
                  <div className="text-xs opacity-90">Quality</div>
                </div>
              </motion.div>

              {/* Art Deco corner accent */}
              <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-4 border-b-4 border-[#AD9660] opacity-60"></div>
            </motion.div>
          </div>
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
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-[#AD9660] rounded-full flex-shrink-0"></div>
      <span className="text-sm text-[#323433] font-medium">{text}</span>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#E6E2DD]/50 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F4F4F4] flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="font-['Frank_Ruhl_Libre'] font-medium text-lg text-[#323433]">{value}</div>
          <div className="text-xs text-[#1E2A47]/70 font-medium">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCTA; 