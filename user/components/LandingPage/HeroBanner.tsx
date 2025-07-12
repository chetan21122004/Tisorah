"use client";

import Link from "next/link";
import { Gift, Clock, Phone, ArrowRight, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();
  const [lastScrollY, setLastScrollY] = useState(0);
  const ticking = useRef(false);

  // Hide banner on scroll down for mobile with improved performance
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Only update state if there's a significant change
          if (Math.abs(currentScrollY - lastScrollY) > 10) {
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
              setIsVisible(false);
            } else {
              setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobile]);

  // If not visible on mobile, don't render at all to prevent layout shifts
  if (isMobile && !isVisible) {
    return null;
  }

  return (
    <section className="bg-gradient-to-r from-[#323433] to-[#1E2A47] text-white overflow-hidden border-b border-[#AD9660]/10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between  px-3 py-[6px] md:px-8">
          {/* Mobile View */}
          <div className="md:hidden flex items-center space-x-3 w-full">
            <div className="w-8 h-8 rounded-full bg-[#AD9660]/10 flex items-center justify-center flex-shrink-0">
              <Gift className="w-4 h-4 text-[#AD9660]" />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium leading-tight">
                <span className="text-[#AD9660]">20% OFF</span> first bulk order
              </p>
            </div>
            <Link 
              href="tel:+918088848484" 
              className="bg-[#AD9660]/10 p-1.5 rounded-full flex items-center justify-center"
              aria-label="Call us"
            >
              <Phone className="w-3.5 h-3.5 text-[#AD9660]" />
            </Link>
            <Link 
              href="/quote" 
              className="bg-[#AD9660] hover:bg-[#9e865a] px-3 py-1.5 rounded-md flex items-center transition-all text-xs font-medium"
            >
              Quote <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex flex-1 items-center">
            <div className="w-10 h-10 rounded-full bg-[#AD9660]/10 flex items-center justify-center">
              <Gift className="w-5 h-5 text-[#AD9660]" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl md:text-2xl font-serif font-light leading-tight">
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
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center border-r border-[#AD9660]/20 pr-6">
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
              className="inline-flex items-center bg-[#AD9660] hover:bg-[#9e865a] px-5 py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
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