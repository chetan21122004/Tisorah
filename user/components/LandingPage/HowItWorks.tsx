"use client"

import { FC, useRef } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  FileText, 
  MessageCircle, 
  Receipt, 
  Factory, 
  PackageCheck, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HowItWorks: FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const workflowSteps: WorkflowStep[] = [
    {
      id: 1,
      title: "Initial Consultation",
      description: "We discuss your occasion, ideas, budget, delivery date, packaging requirements, etc.",
      icon: <MessageSquare className="w-6 h-6 text-white" />
    },
    {
      id: 2,
      title: "Proposal",
      description: "We'll prepare a proposal with gift ideas and mockup images tailored to our initial conversation.",
      icon: <FileText className="w-6 h-6 text-white" />
    },
    {
      id: 3,
      title: "Feedback & Revision",
      description: "We'll revise proposed gift designs as needed based on your feedback.",
      icon: <MessageCircle className="w-6 h-6 text-white" />
    },
    {
      id: 4,
      title: "Invoice & Deposit",
      description: "An invoice will be shared with payment details. Once processed and acknowledged, hampers move into production.",
      icon: <Receipt className="w-6 h-6 text-white" />
    },
    {
      id: 5,
      title: "Production",
      description: "Production time varies by scope and branding options, typically 1-2 weeks. Need a rush order? Let us know!",
      icon: <Factory className="w-6 h-6 text-white" />
    },
    {
      id: 6,
      title: "Fulfillment",
      description: "We'll pack each gift with care, and ship either in bulk or individually direct to recipients.",
      icon: <PackageCheck className="w-6 h-6 text-white" />
    }
  ];

  return (
    <section className="py-4 md:py-12 bg-[#f8f8f8] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTYgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTYgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTYgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTYgMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMCAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0xNiAwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00bTE2IDBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMTYgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0xNi0xNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNCIvPjwvZz48L2c+PC9zdmc+')]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className="bg-[#AD9660]/10 rounded-full px-5 py-2">
              <span className="text-sm uppercase tracking-widest font-medium text-[#AD9660]">Our Process</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-serif mb-6 text-[#323433] font-light leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The <span className="relative inline-block">
              <span className="relative z-10">Tisorah</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#AD9660]/20 -z-10"></span>
            </span> Experience
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our refined six-step process ensures a seamless experience from consultation to delivery,
            creating memorable gifting solutions tailored precisely to your needs.
          </motion.p>
        </div>

        {/* Modern Timeline */}
        <div ref={containerRef} className="relative mb-4">
          {/* Desktop Timeline (3+ columns) */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-[#AD9660]/10 via-[#AD9660] to-[#AD9660]/10"></div>
              
              {/* Timeline steps */}
              <div className="grid grid-cols-6 gap-6">
                {workflowSteps.map((step, index) => (
                  <motion.div 
                    key={step.id}
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    {/* Icon with number */}
                    <div className="flex justify-center mb-10">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-[#AD9660] flex items-center justify-center shadow-lg">
                          {step.icon}
                        </div>
                        <div className="absolute -bottom-3 -right-3 w-7 h-7 rounded-full bg-[#323433] flex items-center justify-center text-white text-xs font-medium">
                          {step.id}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`text-center ${index % 2 === 0 ? 'mt-0' : 'mt-10'}`}>
                      <h3 className="text-lg font-medium text-[#323433] mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tablet Timeline (2 columns) */}
          <div className="hidden md:block lg:hidden">
            <div className="space-y-16">
              <div className="grid grid-cols-2 gap-10">
                {workflowSteps.slice(0, 2).map((step, index) => (
                  <TimelineStepCard key={step.id} step={step} index={index} isInView={isInView} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-10">
                {workflowSteps.slice(2, 4).map((step, index) => (
                  <TimelineStepCard key={step.id} step={step} index={index + 2} isInView={isInView} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-10">
                {workflowSteps.slice(4, 6).map((step, index) => (
                  <TimelineStepCard key={step.id} step={step} index={index + 4} isInView={isInView} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Timeline (1 column) */}
          <div className="md:hidden">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-gradient-to-b from-[#AD9660]/10 via-[#AD9660] to-[#AD9660]/10"></div>
              
              <div className="space-y-12">
                {workflowSteps.map((step, index) => (
                  <motion.div 
                    key={step.id}
                    className="relative pl-16"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    {/* Icon with number */}
                    <div className="absolute left-0 top-0">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#AD9660] flex items-center justify-center shadow-md">
                          {step.icon}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#323433] flex items-center justify-center text-white text-xs font-medium">
                          {step.id}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-medium text-[#323433] mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <div className="w-16 h-1 bg-[#AD9660] mb-6"></div>
              <h3 className="text-2xl md:text-3xl font-serif text-[#323433] mb-4 font-light leading-tight">
                Ready to start your <span className="text-[#AD9660]">gifting journey</span>?
              </h3>
              <p className="text-gray-600 mb-6">
                Let us help you create memorable gifting experiences tailored to your specific requirements.
              </p>
              <Link href="/quote">
                <Button 
                  className="bg-[#323433] hover:bg-black text-white px-8 py-6 rounded-md flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 group w-full md:w-auto"
                >
                  <span className="font-medium">Request Free Quote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2 bg-[#F4F4F4] rounded-xl p-6 md:p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#AD9660]/20 flex items-center justify-center mt-0.5">
                    <ChevronRight className="w-4 h-4 text-[#AD9660]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#323433]">No obligation consultation</h4>
                    <p className="text-sm text-gray-500">Discuss your needs without any commitment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#AD9660]/20 flex items-center justify-center mt-0.5">
                    <ChevronRight className="w-4 h-4 text-[#AD9660]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#323433]">Custom branding options</h4>
                    <p className="text-sm text-gray-500">Personalize gifts with your company logo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#AD9660]/20 flex items-center justify-center mt-0.5">
                    <ChevronRight className="w-4 h-4 text-[#AD9660]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#323433]">Bulk order discounts</h4>
                    <p className="text-sm text-gray-500">Special pricing for larger quantities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface TimelineStepCardProps {
  step: WorkflowStep;
  index: number;
  isInView: boolean;
}

const TimelineStepCard: FC<TimelineStepCardProps> = ({ step, index, isInView }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
    >
      <div className="absolute -top-6 left-6">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-[#AD9660] flex items-center justify-center shadow-lg">
            {step.icon}
          </div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#323433] flex items-center justify-center text-white text-xs font-medium">
            {step.id}
          </div>
        </div>
      </div>
      
      <div className="pt-8">
        <h3 className="text-lg font-medium text-[#323433] mb-2">{step.title}</h3>
        <p className="text-sm text-gray-600">{step.description}</p>
      </div>
    </motion.div>
  );
};

export default HowItWorks;