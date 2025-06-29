"use client";

import { useState } from "react";
import { Mail, Phone, Send, Building2, Gift, Users, Calendar, CheckCircle2, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormData {
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  budget: string;
  giftsNeeded: string;
  deliveryDate: string;
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
    deliveryDate: "",
    message: ""
  });
  
  const isMobile = useIsMobile();

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
      loading: "Preparing your custom quote...",
      success: "Quote request received! Our team will contact you within 24 hours.",
      error: "There was an error sending your request. Please try again."
    });

    setFormData({
      name: "",
      companyName: "",
      phoneNumber: "",
      email: "",
      budget: "",
      giftsNeeded: "",
      deliveryDate: "",
      message: ""
    });
  };

  const inputFields = [
    { name: "name", label: "Your Name", type: "text", icon: null, placeholder: "Full name", required: true },
    { name: "phoneNumber", label: "Phone Number", type: "tel", icon: Phone, placeholder: "For quick follow-up", required: true },
    { name: "companyName", label: "Company Name", type: "text", icon: Building2, placeholder: "Your organization", required: true },
    { name: "email", label: "Email Address", type: "email", icon: Mail, placeholder: "Work email preferred", required: true },
    { name: "budget", label: "Budget Per Gift", type: "text", icon: Gift, placeholder: "Approx. range (₹)", required: false },
    { name: "giftsNeeded", label: "Quantity Needed", type: "number", icon: Users, placeholder: "Number of recipients", required: false },
    { name: "deliveryDate", label: "Target Delivery Date", type: "date", icon: Calendar, placeholder: "", required: false },
  ];

  return (
    <section className="py-10 md:py-24 px-4 relative overflow-hidden bg-gradient-to-b from-white to-[#F4F4F4]/30">
      {/* Decorative Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 border border-[#AD9660]/5 rounded-[30%]"
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
          className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 border border-[#AD9660]/5 rounded-[30%]"
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

      <div className="max-w-6xl mx-auto relative">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div className="flex items-center justify-center gap-2 mb-4" variants={fadeInUp}>
            <div className="w-8 md:w-12 h-[1px] bg-[#AD9660]"></div>
            <span className="text-xs md:text-sm uppercase tracking-wider text-[#AD9660] font-medium">Get Your Custom Quote</span>
            <div className="w-8 md:w-12 h-[1px] bg-[#AD9660]"></div>
          </motion.div>

          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#323433] mb-4 md:mb-6 font-['Frank_Ruhl_Libre']"
            variants={fadeInUp}
          >
            Ready to <span className="text-[#AD9660]">Transform</span> Your Corporate Gifting?
          </motion.h1>
          
          <motion.p 
            className="text-sm md:text-xl text-[#323433]/70 mb-4 md:mb-8 font-light tracking-wide"
            variants={fadeInUp}
          >
            GET A FREE CUSTOM PROPOSAL WITHIN 24 HOURS
          </motion.p>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            <p className="text-sm md:text-lg text-[#323433]/70 leading-relaxed">
              Complete the form below to receive a tailored quote for your corporate gifting needs. Our experts will analyze your requirements and provide personalized recommendations.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6 md:gap-8">
          {/* Form Section - Takes up more space */}
        <motion.div
            className="md:col-span-3 bg-white rounded-xl md:rounded-2xl shadow-[0_0_30px_0_rgba(0,0,0,0.08)] p-6 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
            <h3 className="text-xl md:text-2xl font-['Frank_Ruhl_Libre'] font-light mb-6 text-[#323433]">Request Your Free Quote</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <motion.div 
                className="grid md:grid-cols-2 gap-4 md:gap-6"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {inputFields.map((field, index) => (
                <motion.div 
                  key={field.name}
                    className="space-y-1 md:space-y-2"
                  variants={fadeInUp}
                  custom={index}
                >
                    <label htmlFor={field.name} className="text-xs md:text-sm font-medium text-[#323433]/70 flex items-center gap-1">
                    {field.label}
                      {field.required && <span className="text-[#AD9660]">*</span>}
                  </label>
                  <div className="relative group">
                    {field.icon && (
                        <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#323433]/40 group-hover:text-[#AD9660] transition-colors duration-300 h-3 w-3 md:h-4 md:w-4" />
                    )}
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                        className={`h-10 md:h-12 text-sm ${field.icon ? 'pl-8 md:pl-10' : ''} bg-gray-50 border-[#323433]/10 focus:border-[#AD9660] focus:ring-[#AD9660] rounded-lg transition-all duration-300`}
                      placeholder={field.placeholder}
                        required={field.required}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
                className="space-y-1 md:space-y-2"
              variants={fadeInUp}
            >
                <label htmlFor="message" className="text-xs md:text-sm font-medium text-[#323433]/70 block">
                  Additional Requirements
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                  rows={isMobile ? 3 : 5}
                  className="bg-gray-50 border-[#323433]/10 focus:border-[#AD9660] focus:ring-[#AD9660] rounded-lg resize-none transition-all duration-300 text-sm"
                  placeholder="Tell us about your project, branding requirements, or any specific preferences..."
              />
            </motion.div>

            <motion.div 
                className="flex justify-center pt-4 md:pt-6"
              variants={fadeInUp}
            >
              <Button
                type="submit"
                  className="bg-[#AD9660] hover:bg-[#8d7c50] text-white px-8 md:px-12 py-5 md:py-6 rounded-md text-sm md:text-lg font-medium tracking-wide transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl w-full md:w-auto"
              >
                  <span>Get My Free Quote</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
              
              <div className="text-center text-xs md:text-sm text-gray-500 pt-2 md:pt-4">
                By submitting this form, you'll receive a no-obligation quote tailored to your needs
              </div>
          </form>
        </motion.div>

          {/* Benefits Section */}
          <motion.div 
            className="md:col-span-2 space-y-4 md:space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-[#F0EBE1] rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-lg md:text-xl font-['Frank_Ruhl_Libre'] font-light mb-4 md:mb-6 text-[#323433]">Why Choose Tisorah?</h3>
              
              <div className="space-y-3 md:space-y-5">
                <BenefitItem 
                  icon={<CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />}
                  title="Premium Quality"
                  description="Handpicked products that reflect your brand's prestige"
                />
                <BenefitItem 
                  icon={<ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />}
                  title="Custom Branding"
                  description="Personalized gifts with your logo and brand colors"
                />
                <BenefitItem 
                  icon={<Clock className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />}
                  title="Fast Turnaround"
                  description="Quick delivery even for large corporate orders"
                />
              </div>
            </div>
            
            <div className="bg-[#323433] text-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-lg md:text-xl font-['Frank_Ruhl_Libre'] font-light mb-3 md:mb-4">Client Testimonial</h3>
              <p className="italic text-white/80 mb-3 md:mb-4 text-sm md:text-base">
                "Tisorah transformed our employee recognition program with their premium gift boxes. The attention to detail and quality of products exceeded our expectations."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#AD9660]/20 flex items-center justify-center text-[#AD9660] text-sm md:text-base">AB</div>
                <div>
                  <p className="font-medium text-sm md:text-base">Abhishek Mehta</p>
                  <p className="text-xs md:text-sm text-white/60">HR Director, Tech Solutions Ltd</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-36 md:h-48 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://corporategiftsbyconfetti.in/cdn/shop/files/Untitled_design_9_1.jpg?v=1742302025&width=2000"
                alt="Corporate Gift Collection"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 md:p-6">
                <div>
                  <p className="text-white text-sm md:text-lg font-light">Browse Our</p>
                  <p className="text-white text-base md:text-xl font-medium">Premium Collections</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Info Footer */}
        <motion.div 
          className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F0EBE1] flex items-center justify-center mb-3 md:mb-4">
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />
            </div>
            <h4 className="text-base md:text-lg font-medium mb-1">Call Us</h4>
            <p className="text-sm md:text-base text-gray-600">+91 80888 48484</p>
            <p className="text-xs md:text-sm text-gray-600">Mon-Fri, 9am-6pm IST</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F0EBE1] flex items-center justify-center mb-3 md:mb-4">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />
            </div>
            <h4 className="text-base md:text-lg font-medium mb-1">Email Us</h4>
            <p className="text-sm md:text-base text-gray-600">info@tisorah.com</p>
            <p className="text-xs md:text-sm text-gray-600">24/7 Support</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F0EBE1] flex items-center justify-center mb-3 md:mb-4">
              <Building2 className="w-4 h-4 md:w-5 md:h-5 text-[#AD9660]" />
            </div>
            <h4 className="text-base md:text-lg font-medium mb-1">Visit Us</h4>
            <p className="text-sm md:text-base text-gray-600">12/14, Laxmi Narayan Nagar</p>
            <p className="text-xs md:text-sm text-gray-600">Erandwane, Pune - 411004</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-3 md:gap-4">
      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-sm md:text-base text-[#323433]">{title}</h4>
        <p className="text-xs md:text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ContactForm; 