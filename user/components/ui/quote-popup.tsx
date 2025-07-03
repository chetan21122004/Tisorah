"use client";

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X, ShoppingBag, Package } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useShortlist } from '@/lib/ShortlistContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { submitQuoteRequest, type QuoteRequest } from '@/lib/shortlist';

export function QuotePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { shortlist } = useShortlist();
  const hasShortlistedItems = shortlist && shortlist.length > 0;
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitQuick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const quoteData: QuoteRequest = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        items: [],
      };

      const result = await submitQuoteRequest(quoteData);

      if (result.success) {
        toast({
          title: "Quote Request Submitted!",
          description: result.message,
        });

        // Close the popup
        setIsOpen(false);

        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToQuote = (type: string) => {
    router.push(`/quote?type=${type}`);
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
                {hasShortlistedItems ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-[#F0EBE1] rounded-md">
                      <h3 className="text-base font-medium text-[#323433] mb-2">You have shortlisted products!</h3>
                      <p className="text-sm text-gray-600 mb-4">How would you like to proceed with your quote request?</p>
                      
                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-[#AD9660] hover:bg-[#8d7c50] text-white rounded-md flex items-center justify-center gap-2 h-10 transition-all"
                          onClick={() => navigateToQuote('shortlist')}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Quote with Shortlisted Items</span>
                        </Button>
                        
                        <Button 
                          variant="outline"
                          className="w-full border-[#323433] text-[#323433] hover:bg-[#323433] hover:text-white rounded-md flex items-center justify-center gap-2 h-10 transition-all"
                          onClick={() => navigateToQuote('custom')}
                        >
                          <Package className="w-4 h-4" />
                          <span>Custom Quote Request</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmitQuick}>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2 sm:col-span-1">
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="h-10 text-sm border-gray-200 focus:border-[#AD9660] font-light bg-gray-50/30 rounded-md"
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <Input
                          placeholder="Contact Number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="h-10 text-sm border-gray-200 focus:border-[#AD9660] font-light bg-gray-50/30 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Company Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="h-10 text-sm border-gray-200 focus:border-[#AD9660] font-light bg-gray-50/30 rounded-md"
                        required
                      />
                      <Input
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="h-10 text-sm border-gray-200 focus:border-[#AD9660] font-light bg-gray-50/30 rounded-md"
                        required
                      />
                      <Textarea
                        placeholder="Tell us about your gifting requirements..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="text-sm border-gray-200 focus:border-[#AD9660] min-h-[90px] font-light bg-gray-50/30 rounded-md resize-none"
                      />
                    </div>

                    <div>
                      <Button 
                        type="submit" 
                        className="w-full bg-[#323433] hover:bg-black text-white h-10 rounded-md transition-colors duration-200 font-light text-sm"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Submit Request"}
                      </Button>
                      <p className="text-[11px] text-gray-500 text-center mt-3 font-light">
                        We'll get back to you within 24 hours with a customized quote.
                      </p>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
} 