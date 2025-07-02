"use client";

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

export function QuotePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Don't auto-open on mobile to prevent scroll issues
    if (isMobile) return;
    
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isMobile]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast.success("Quote request received! We'll contact you within 24 hours.");
      
      // Reset and close after showing success
      setTimeout(() => {
        setIsOpen(false);
        // Reset form after closing
        setTimeout(() => {
          setFormData({
            name: "",
            phone: "",
            email: "",
            company: "",
            message: ""
          });
          setIsSubmitted(false);
        }, 300);
      }, 2000);
    } catch (error) {
      toast.error("There was an error sending your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render the popup at all on mobile
  if (isMobile) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className={`sm:max-w-[420px] !p-0 overflow-hidden bg-transparent border-none ${isMobile ? 'max-h-[90vh]' : ''}`}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white rounded-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              <button
                onClick={handleClose}
                className="absolute right-3 top-3 z-50 rounded-full p-1.5 hover:bg-black/5 transition-colors"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>

              <div className="bg-[#323433] p-4 md:p-6 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div className="w-full h-full border border-[#AD9660]/30 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 opacity-10">
                  <div className="w-full h-full border border-[#AD9660]/30 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                </div>
                
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <div className="w-8 h-[1px] bg-[#AD9660]"></div>
                  <span className="text-[#AD9660] text-xs font-light tracking-wider uppercase">Get Started</span>
                </div>
                <DialogTitle className="text-xl md:text-2xl font-light text-white font-['Frank_Ruhl_Libre']">
                  Request a Quote
                </DialogTitle>
                <p className="text-white/60 text-sm mt-1.5 font-light">
                  Let us help you create the perfect gifting experience
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
              <motion.div 
                    key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#F0EBE1] flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-[#AD9660]" />
                    </div>
                    <h3 className="text-xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] mb-2">
                      Thank You!
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Your quote request has been submitted successfully. Our team will contact you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 md:p-6 overflow-y-auto"
                    style={{ maxHeight: isMobile ? 'calc(70vh - 120px)' : 'auto' }}
                  >
                    <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-1">
                          <label htmlFor="name" className="text-xs text-gray-500 mb-1 block">
                            Your Name <span className="text-[#AD9660]">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full name"
                            required
                            className="h-10 text-sm border-gray-200 focus:border-[#AD9660] focus:ring-[#AD9660]/20 font-light bg-gray-50/30 rounded-md"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <label htmlFor="phone" className="text-xs text-gray-500 mb-1 block">
                            Phone Number <span className="text-[#AD9660]">*</span>
                          </label>
                      <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="For quick follow-up"
                            required
                            className="h-10 text-sm border-gray-200 focus:border-[#AD9660] focus:ring-[#AD9660]/20 font-light bg-gray-50/30 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                        <div>
                          <label htmlFor="email" className="text-xs text-gray-500 mb-1 block">
                            Email Address <span className="text-[#AD9660]">*</span>
                          </label>
                    <Input
                            id="email"
                            name="email"
                      type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Work email preferred"
                            required
                            className="h-10 text-sm border-gray-200 focus:border-[#AD9660] focus:ring-[#AD9660]/20 font-light bg-gray-50/30 rounded-md"
                    />
                        </div>
                        <div>
                          <label htmlFor="company" className="text-xs text-gray-500 mb-1 block">
                            Company Name <span className="text-[#AD9660]">*</span>
                          </label>
                    <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your organization"
                            required
                            className="h-10 text-sm border-gray-200 focus:border-[#AD9660] focus:ring-[#AD9660]/20 font-light bg-gray-50/30 rounded-md"
                    />
                        </div>
                        <div>
                          <label htmlFor="message" className="text-xs text-gray-500 mb-1 block">
                            Requirements
                          </label>
                    <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                      placeholder="Tell us about your gifting requirements..."
                            className="text-sm border-gray-200 focus:border-[#AD9660] focus:ring-[#AD9660]/20 min-h-[80px] font-light bg-gray-50/30 rounded-md resize-none"
                    />
                        </div>
                  </div>

                      <div className="pt-2">
                    <Button 
                      type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-[#AD9660] hover:bg-[#8d7c50] text-white h-11 rounded-md transition-colors duration-200 font-light text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                      Submit Request
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </>
                          )}
                    </Button>
                    <p className="text-[11px] text-gray-500 text-center mt-3 font-light">
                      We'll get back to you within 24 hours with a customized quote.
                    </p>
                  </div>
                </form>
              </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
} 