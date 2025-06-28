import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, MessageCircle, Check, Clock, Award, Shield } from 'lucide-react';

const QuoteCTA: FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8F7F5]/50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border border-[#AD9660]/10 rotate-45 -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 border-2 border-[#AD9660]/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 max-w-6xl mx-auto">
          <div className="w-full md:w-3/5 space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F0EBE1] text-[#AD9660] font-medium text-sm">
              <Package className="w-4 h-4 mr-2" /> Premium Corporate Gifting Solutions
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] leading-tight">
              Transform Your Corporate <span className="text-[#AD9660]">Gifting Experience</span> Today
            </h2>
            
            <p className="text-lg text-gray-600 font-light">
              Join over 500+ companies who trust us with their corporate gifting needs. 
              Get customized solutions that perfectly align with your brand values and budget requirements.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <StatItem 
                icon={<Clock className="w-5 h-5 text-[#AD9660]" />}
                value="48 Hours" 
                label="Quick Turnaround Time" 
              />
              <StatItem 
                icon={<Award className="w-5 h-5 text-[#AD9660]" />}
                value="500+" 
                label="Happy Corporate Clients" 
              />
              <StatItem 
                icon={<Shield className="w-5 h-5 text-[#AD9660]" />}
                value="100%" 
                label="Quality Guaranteed" 
              />
              <StatItem 
                icon={<Package className="w-5 h-5 text-[#AD9660]" />}
                value="5000+" 
                label="Products Delivered" 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <FeatureItem text="Custom Branding & Packaging" />
              <FeatureItem text="Bulk Order Discounts" />
              <FeatureItem text="Pan-India Delivery" />
              <FeatureItem text="Sustainable & Premium Options" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="h-14 px-8 bg-[#AD9660] hover:bg-[#8d7c50] text-white rounded-md flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="/quote" className="flex items-center gap-2">
                  <span className="font-medium text-base">Get Your Free Quote Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button variant="outline" className="h-14 px-8 border-[#323433] text-[#323433] hover:bg-[#323433] hover:text-white rounded-md transition-all duration-300">
                <Link href="tel:+918088848484" className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium text-base">Call Us: +91 80888 48484</span>
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 italic">
              "We respond to all quote requests within 24 hours with a detailed proposal tailored to your needs."
            </p>
          </div>
          
          <div className="w-full md:w-2/5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square shadow-xl border-8 border-white">
              <Image 
                src="https://corporategiftsbyconfetti.in/cdn/shop/files/Exemplary.png?v=1713181877&width=500" 
                alt="Corporate Gifting Solutions" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/60 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-white text-xl font-light font-['Frank_Ruhl_Libre']">
                  Customized Corporate Gift Boxes
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                    Premium Quality
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                    Branded
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#AD9660]" />
                <span className="font-medium text-sm">Premium Quality</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Customized for your brand</p>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-[#AD9660] text-white p-4 rounded-xl shadow-lg transform rotate-3">
              <div className="text-2xl font-bold">30% OFF</div>
              <p className="text-xs">On Bulk Orders</p>
            </div>
            
            <div className="absolute -top-2 -right-2 w-24 h-24 rotate-12">
              <div className="w-full h-full bg-[#323433] text-white rounded-full flex flex-col items-center justify-center transform rotate-[-12deg]">
                <span className="text-xs font-light">Limited Time</span>
                <span className="text-lg font-medium">OFFER</span>
              </div>
            </div>
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
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E6E2DD]">
        <Check className="w-4 h-4 text-[#AD9660]" />
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
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
    <div className="flex items-center gap-3 bg-[#F0EBE1]/50 p-3 rounded-lg">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <div className="font-medium text-lg text-[#323433]">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export default QuoteCTA; 