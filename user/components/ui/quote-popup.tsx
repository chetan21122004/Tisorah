"use client";

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export function QuotePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[420px] !p-0 overflow-hidden bg-transparent border-none">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white rounded-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <button
                onClick={handleClose}
                className="absolute right-3 top-3 z-50 rounded-full p-1.5 hover:bg-black/5 transition-colors"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>

              <div className="bg-[#323433] p-6 relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-[1px] bg-[#AD9660]"></div>
                  <span className="text-[#AD9660] text-xs font-light tracking-wider uppercase">Get Started</span>
                </div>
                <DialogTitle className="text-xl font-light text-white font-['Frank_Ruhl_Libre']">
                  Request a Quote
                </DialogTitle>
                <p className="text-white/60 text-sm mt-1.5 font-light">
                  Let us help you create the perfect gifting experience
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="p-6"
              >
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 sm:col-span-1">
                      <Input
                        placeholder="Your Name"
                        className="h-10 text-sm border-gray-200 focus:border-[#AD9660] font-light bg-gray-50/30 rounded-md"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Input
                        placeholder="Contact Number"
                        className="h-10 text-sm border-gray-200 focus:border-[#AD9660] font-light bg-gray-50/30 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Company Email"
                      className="h-10 text-sm border-gray-200 focus:border-[#AD9660] font-light bg-gray-50/30 rounded-md"
                    />
                    <Input
                      placeholder="Company Name"
                      className="h-10 text-sm border-gray-200 focus:border-[#AD9660] font-light bg-gray-50/30 rounded-md"
                    />
                    <Textarea
                      placeholder="Tell us about your gifting requirements..."
                      className="text-sm border-gray-200 focus:border-[#AD9660] min-h-[90px] font-light bg-gray-50/30 rounded-md resize-none"
                    />
                  </div>

                  <div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#323433] hover:bg-black text-white h-10 rounded-md transition-colors duration-200 font-light text-sm"
                    >
                      Submit Request
                    </Button>
                    <p className="text-[11px] text-gray-500 text-center mt-3 font-light">
                      We'll get back to you within 24 hours with a customized quote.
                    </p>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
} 