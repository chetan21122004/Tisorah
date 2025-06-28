import { FC } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Headphones, PenTool, ClipboardCheck, Truck, ArrowRight, Check } from 'lucide-react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const HowItWorks: FC = () => {
  const steps: ProcessStep[] = [
    {
      id: "01",
      title: "Consultation",
      description: "We discuss your specific requirements and objectives",
      icon: <Headphones className="w-8 h-8 md:w-12 md:h-12 text-[#AD9660]" />,
      benefits: [
        "Free, no-obligation consultation",
        "Understand your brand values",
        "Define budget parameters"
      ]
    },
    {
      id: "02",
      title: "Curation",
      description: "We create a tailored selection of premium products",
      icon: <PenTool className="w-8 h-8 md:w-12 md:h-12 text-[#AD9660]" />,
      benefits: [
        "Handpicked quality items",
        "Custom branding options",
        "Personalized packaging"
      ]
    },
    {
      id: "03",
      title: "Refinement",
      description: "We perfect every detail to meet your expectations",
      icon: <ClipboardCheck className="w-8 h-8 md:w-12 md:h-12 text-[#AD9660]" />,
      benefits: [
        "Sample approvals",
        "Quality assurance checks",
        "Final customization"
      ]
    },
    {
      id: "04",
      title: "Delivery",
      description: "We ensure timely delivery of your premium gifts",
      icon: <Truck className="w-8 h-8 md:w-12 md:h-12 text-[#AD9660]" />,
      benefits: [
        "Nationwide shipping",
        "Bulk order handling",
        "On-time guaranteed delivery"
      ]
    }
  ];

  return (
    <section className="bg-white relative overflow-hidde">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-64 h-64 border border-[#AD9660]/5 rotate-45 -translate-x-1/2 rounded-[30%]"></div>
        <div className="absolute bottom-20 right-0 w-72 h-72 border border-[#AD9660]/5 rotate-12 translate-x-1/3 rounded-[30%]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#AD9660] to-transparent mb-4 md:mb-6 mx-auto"></div>
          <h2 className="text-2xl md:text-4xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] mb-3 md:mb-4">
            The Tisorah Experience
          </h2>
          <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-8 font-light">
            Our streamlined process ensures a seamless journey from consultation to delivery,
            creating an exceptional corporate gifting experience tailored to your needs.
          </p>
          
          
        </div>
        
        {/* Process steps with connecting lines */}
        <div className="relative">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative">
            {steps.map((step, index) => (
              <ProcessStepCard key={step.id} step={step} isLast={index === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProcessStepCardProps {
  step: ProcessStep;
  isLast: boolean;
}

const ProcessStepCard: FC<ProcessStepCardProps> = ({ step, isLast }) => {
  return (
    <div className="group">
      <Link href="/quote" className="block">
        <div className="flex flex-col items-center text-center transition-all duration-300 hover:translate-y-[-8px]">
          <div className="w-16 h-16 md:w-32 md:h-32 mb-3 md:mb-6 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#F0EBE1] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            {step.icon}
          </div>
          <div className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#AD9660]/10 mb-2 md:mb-4">
            <span className="text-[#AD9660] font-medium text-xs md:text-base">{step.id}</span>
          </div>
          <h3 className="text-base md:text-xl font-medium text-[#323433] mb-1 md:mb-2 font-['Frank_Ruhl_Libre']">{step.title}</h3>
          <p className="text-xs md:text-sm text-gray-600 font-light mb-2 md:mb-4">{step.description}</p>
          
          {/* Benefits list */}
          <div className="bg-white shadow-md rounded-lg p-2 md:p-4 w-full border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ul className="text-left space-y-1 md:space-y-2">
              {step.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-1 md:gap-2 text-xs md:text-sm">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            {!isLast && (
              <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-100 text-center">
                <span className="text-[10px] md:text-xs text-[#AD9660] font-medium">Step {parseInt(step.id) + 1} →</span>
              </div>
            )}
            
            {isLast && (
              <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-100 text-center">
                <span className="text-[10px] md:text-xs text-[#AD9660] font-medium">Get Started Today →</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HowItWorks;