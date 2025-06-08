import PatternDemo from '../components/PatternDemo';
import PatternBackground, { PatternDivider } from '@/components/PatternBackground';
import { ArrowDown } from 'lucide-react';

export default function PatternDemoPage() {
  return (
    <div className="min-h-screen">
      <PatternBackground 
        overlay="secondary" 
        opacity={0.08} 
        intensity="medium" 
        size="large"
        className="py-24 bg-gradient-to-b from-white to-neutral-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 opacity-90">
              <div className="w-20 h-1 bg-[#AD9660] mx-auto mb-6"></div>
              <span className="text-sm uppercase tracking-widest font-medium text-[#323433]/70">Design System</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6 text-[#323433]">
              Geometric Pattern
              <span className="block text-[#AD9660]">Implementation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
              A sophisticated design system that integrates rotated geometric patterns to create 
              an elegant and premium brand experience for Tisorah's corporate gifting solutions.
            </p>
            
            <div className="animate-bounce mt-12 text-[#AD9660]">
              <ArrowDown className="w-6 h-6 mx-auto" />
            </div>
          </div>
        </div>
      </PatternBackground>
      
      <PatternDivider withFade={true} />
      
      <PatternDemo />
    </div>
  );
} 