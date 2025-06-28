import { FC } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Headphones, PenTool, ClipboardCheck, Truck, ArrowRight } from 'lucide-react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HowItWorks: FC = () => {
  const steps: ProcessStep[] = [
    {
      id: "01",
      title: "Consultation",
      description: "We discuss your bespoke requirements",
      icon: <Headphones className="w-12 h-12 text-[#AD9660]" />
    },
    {
      id: "02",
      title: "Curation",
      description: "We curate products with your exclusive branding",
      icon: <PenTool className="w-12 h-12 text-[#AD9660]" />
    },
    {
      id: "03",
      title: "Refinement",
      description: "We ensure meticulous quality standards",
      icon: <ClipboardCheck className="w-12 h-12 text-[#AD9660]" />
    },
    {
      id: "04",
      title: "Presentation",
      description: "We deliver an exceptional gifting experience",
      icon: <Truck className="w-12 h-12 text-[#AD9660]" />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-64 h-64 border border-[#AD9660]/5 rotate-45 -translate-x-1/2 rounded-[30%]"></div>
        <div className="absolute bottom-20 right-0 w-72 h-72 border border-[#AD9660]/5 rotate-12 translate-x-1/3 rounded-[30%]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#AD9660] to-transparent mb-6 mx-auto"></div>
          <p className="text-lg text-gray-600 mb-4 font-light">
            From meticulous curation to complimentary delivery. <br/> Experience our refined corporate gifting process
          </p>
          <h2 className="text-3xl md:text-4xl font-['Frank_Ruhl_Libre'] font-light text-[#323433]">
            The Tisorah Experience
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
          {/* Connecting lines - only visible on desktop */}
          <div className="hidden md:block absolute top-16 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-[#AD9660]/20 via-[#AD9660]/30 to-[#AD9660]/20"></div>
          
          {steps.map((step) => (
            <ProcessStepCard key={step.id} step={step} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/quote">
            <Button className="bg-transparent hover:bg-[#AD9660]/10 text-[#323433] border border-[#AD9660] rounded-none px-8 py-6 font-light inline-flex items-center group">
              <span className="mr-2">Begin Your Gifting Journey</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface ProcessStepCardProps {
  step: ProcessStep;
}

const ProcessStepCard: FC<ProcessStepCardProps> = ({ step }) => {
  return (
    <div className="group cursor-pointer">
      <Link href="/quote" className="block">
        <div className="flex flex-col items-center text-center transition-all duration-300 hover:translate-y-[-8px]">
          <div className="w-24 h-24 md:w-32 md:h-32 mb-6 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#F0EBE1] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            {step.icon}
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#AD9660]/10 mb-4">
            <span className="text-[#AD9660] font-medium">{step.id}</span>
          </div>
          <h3 className="text-lg font-medium text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">{step.title}</h3>
          <p className="text-gray-600 text-sm font-light">{step.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default HowItWorks;