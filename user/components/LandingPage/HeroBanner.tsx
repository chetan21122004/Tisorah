import Link from "next/link";
import { Gift, Clock, Phone, ArrowRight } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-[#323433] to-[#1E2A47] text-white overflow-hidden border-b border-[#AD9660]/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 px-4 md:px-8">
          <div className="flex-1 mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="w-10 h-10 rounded-full bg-[#AD9660]/10 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-[#AD9660]" />
                </div>
              </div>
              <div className="md:ml-4">
                <h2 className="text-xl md:text-2xl font-['Frank_Ruhl_Libre'] font-light leading-tight">
                  Premium Corporate Gifting <span className="text-[#AD9660]">Solutions</span>
                </h2>
                <div className="flex items-center mt-1">
                  <div className="h-4 w-[2px] bg-[#AD9660] mr-2"></div>
                  <p className="text-sm text-[#E6E2DD]">
                    <span className="font-medium">20% OFF</span> on your first bulk order
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 md:space-x-8">
            <div className="hidden md:flex items-center border-r border-[#AD9660]/20 pr-6">
              <div className="bg-[#AD9660]/10 p-2 rounded-full mr-3">
                <Clock className="w-4 h-4 text-[#AD9660]" />
              </div>
              <div>
                <p className="text-xs text-[#E6E2DD]/70">Business Hours</p>
                <p className="text-sm font-medium">Mon-Fri: 9AM-6PM</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-[#AD9660]/10 p-2 rounded-full mr-3">
                <Phone className="w-4 h-4 text-[#AD9660]" />
              </div>
              <div>
                <p className="text-xs text-[#E6E2DD]/70">Call Us Now</p>
                <Link href="tel:+918088848484" className="text-sm font-medium hover:text-[#AD9660] transition-colors">
                  +91 8088848484
                </Link>
              </div>
            </div>
            
            <Link 
              href="/quote" 
              className="hidden md:inline-flex items-center bg-[#AD9660] hover:bg-[#9e865a] px-5 py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span className="mr-2 text-sm font-medium">Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 