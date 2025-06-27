"use client";

import { useState } from "react";
import { Mail, Phone, Send, Building2, Gift, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  budget: string;
  giftsNeeded: string;
  message: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    budget: "",
    giftsNeeded: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitForm = async (): Promise<void> => {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    // Animate the button during submission
    toast.promise(submitForm(), {
      loading: "Sending your message...",
      success: "Thank you for your message! We will get back to you soon.",
      error: "There was an error sending your message. Please try again."
    });

    setFormData({
      name: "",
      companyName: "",
      phoneNumber: "",
      email: "",
      budget: "",
      giftsNeeded: "",
      message: ""
    });
  };

  const inputFields = [
    { name: "name", label: "Name", type: "text", icon: null, placeholder: "Your name" },
    { name: "phoneNumber", label: "Phone number", type: "tel", icon: Phone, placeholder: "Your phone number" },
    { name: "companyName", label: "Company Name", type: "text", icon: Building2, placeholder: "Your company name" },
    { name: "email", label: "Email", type: "email", icon: Mail, placeholder: "your.email@company.com" },
    { name: "budget", label: "Approximate Budget Per Hamper", type: "text", icon: Gift, placeholder: "e.g., $50-100" },
    { name: "giftsNeeded", label: "Estimated Number of Gifts Needed", type: "number", icon: Users, placeholder: "e.g., 50" }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 border border-[#AD9660]/5 rounded-[30%]"
          animate={{ 
            rotate: [45, 90, 45],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 border border-[#AD9660]/5 rounded-[30%]"
          animate={{ 
            rotate: [-45, -90, -45],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div className="flex items-center justify-center gap-2 mb-4" variants={fadeInUp}>
            <div className="w-12 h-[1px] bg-[#AD9660]"></div>
            <span className="text-sm uppercase tracking-wider text-[#AD9660] font-light">Contact Us</span>
            <div className="w-12 h-[1px] bg-[#AD9660]"></div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-light text-[#323433] mb-6 font-['Frank_Ruhl_Libre']"
            variants={fadeInUp}
          >
            Let's Talk
          </motion.h1>
          
          <motion.p 
            className="text-xl text-[#323433]/70 mb-8 font-light tracking-wide"
            variants={fadeInUp}
          >
            WE CAN'T WAIT TO HEAR ABOUT YOUR NEXT PROJECT
          </motion.p>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            <p className="text-[#323433]/70 text-lg leading-relaxed">
              Fill out the form below to request a custom gift design. Have a general question or just want to say hello? Email our team at{" "}
              <a 
                href="mailto:email@sdfsdf.com" 
                className="text-[#323433] hover:text-[#AD9660] transition-colors underline decoration-[#AD9660]/30 hover:decoration-[#AD9660]"
              >
                email@sdfsdf.com
              </a>
            </p>
          </motion.div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.1)] p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {inputFields.map((field, index) => (
                <motion.div 
                  key={field.name}
                  className="space-y-2"
                  variants={fadeInUp}
                  custom={index}
                >
                  <label htmlFor={field.name} className="text-sm font-medium text-[#323433]/70 block">
                    {field.label}
                  </label>
                  <div className="relative group">
                    {field.icon && (
                      <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#323433]/40 group-hover:text-[#AD9660] transition-colors duration-300 h-4 w-4" />
                    )}
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      className={`h-12 ${field.icon ? 'pl-10' : ''} bg-gray-50 border-[#323433]/10 focus:border-[#AD9660] focus:ring-[#AD9660] rounded-lg transition-all duration-300`}
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="space-y-2"
              variants={fadeInUp}
            >
              <label htmlFor="message" className="text-sm font-medium text-[#323433]/70 block">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="bg-gray-50 border-[#323433]/10 focus:border-[#AD9660] focus:ring-[#AD9660] rounded-lg resize-none transition-all duration-300"
                placeholder="Tell us about your project, special requirements, or any questions you have..."
              />
            </motion.div>

            <motion.div 
              className="flex justify-center pt-6"
              variants={fadeInUp}
            >
              <Button
                type="submit"
                className="bg-[#323433] hover:bg-[#AD9660] text-white px-12 py-6 rounded-full text-lg font-light tracking-wide transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#323433]/50 text-sm font-light">
            We typically respond within 24 hours during business days
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm; 