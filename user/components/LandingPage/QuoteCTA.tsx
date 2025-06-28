import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, MessageCircle, Check } from 'lucide-react';

const QuoteCTA: FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#F8F7F5]/50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 max-w-6xl mx-auto">
          <div className="w-full md:w-3/5 space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F0EBE1] text-[#AD9660] font-medium text-sm">
              <Package className="w-4 h-4 mr-2" /> Premium Corporate Gifting Solutions
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] leading-tight">
              Ready to Elevate Your Corporate Gifting Game?
            </h2>
            
            <p className="text-lg text-gray-600 font-light">
              Save up to 90% with curated gifting solutions designed for every occasion.
              From eco-friendly essentials to premium hampers — all customizable with your brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button className="h-12 px-6 bg-[#323433] hover:bg-black text-white rounded-full flex items-center gap-2">
                <Link href="/quote" className="flex items-center gap-2">
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              
              <Button variant="outline" className="h-12 px-6 border-[#323433] text-[#323433] hover:bg-[#323433] hover:text-white rounded-full">
                <Link href="tel:+918088848484" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Call Us Now</span>
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <FeatureItem text="Custom Branding & Packaging" />
              <FeatureItem text="Bulk Order Discounts" />
              <FeatureItem text="Pan-India Delivery" />
              <FeatureItem text="Sustainable & Premium Options" />
            </div>
          </div>
          
          <div className="w-full md:w-2/5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square shadow-lg">
              <Image 
                src="https://corporategiftsbyconfetti.in/cdn/shop/files/Exemplary.png?v=1713181877&width=500" 
                alt="Corporate Gifting Solutions" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/60 to-transparent"></div>
            </div>
            
            <div className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#AD9660]" />
                <span className="font-medium text-sm">Premium Quality</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Customized for your brand</p>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-[#AD9660] text-white p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">90%</div>
              <p className="text-xs">Cost Savings</p>
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
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E6E2DD]">
        <Check className="w-3 h-3 text-[#AD9660]" />
      </div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
};

export default QuoteCTA; 