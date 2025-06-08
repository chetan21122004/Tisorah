import React from 'react';
import PatternBackground, { PatternDivider } from '@/components/PatternBackground';
import { Card, CardContent } from '@/components/ui/card';

export const PatternDemo = () => {
  return (
    <div className="space-y-12 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif mb-8">Pattern Usage Examples</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Primary Pattern */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl mb-4">Primary Overlay</h3>
              <PatternBackground overlay="primary" opacity={0.05} className="p-8 rounded-md">
                <p className="mb-4">This uses the primary color with low opacity.</p>
                <div className="h-20 bg-white/80 backdrop-blur-sm rounded-md flex items-center justify-center">
                  Content with backdrop blur
                </div>
              </PatternBackground>
            </CardContent>
          </Card>
          
          {/* Secondary Pattern */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl mb-4">Secondary Overlay</h3>
              <PatternBackground overlay="secondary" opacity={0.07} className="p-8 rounded-md">
                <p className="mb-4">This uses the secondary (gold) color with low opacity.</p>
                <div className="h-20 bg-white/80 backdrop-blur-sm rounded-md flex items-center justify-center">
                  Content with backdrop blur
                </div>
              </PatternBackground>
            </CardContent>
          </Card>
          
          {/* Accent Pattern */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl mb-4">Accent Overlay</h3>
              <PatternBackground overlay="accent" opacity={0.08} className="p-8 rounded-md">
                <p className="mb-4">This uses the accent (navy) color with low opacity.</p>
                <div className="h-20 bg-white/80 backdrop-blur-sm rounded-md flex items-center justify-center">
                  Content with backdrop blur
                </div>
              </PatternBackground>
            </CardContent>
          </Card>
          
          {/* Neutral Pattern */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl mb-4">Neutral Overlay</h3>
              <PatternBackground overlay="neutral" opacity={0.1} className="p-8 rounded-md">
                <p className="mb-4">This uses the neutral (beige) color with low opacity.</p>
                <div className="h-20 bg-white/80 backdrop-blur-sm rounded-md flex items-center justify-center">
                  Content with backdrop blur
                </div>
              </PatternBackground>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl mb-4">Pattern Divider Examples</h3>
          <p className="mb-6">Pattern dividers can be used to create visual separation between sections:</p>
          
          <div className="bg-white p-6 rounded-md mb-6">
            <p>Content above divider</p>
          </div>
          
          <PatternDivider className="my-8" />
          
          <div className="bg-white p-6 rounded-md">
            <p>Content below divider</p>
          </div>
          
          <div className="mt-12 bg-[#1E2A47] text-white p-8 rounded-md">
            <h4 className="text-lg mb-4">Dark Background Example</h4>
            <PatternDivider className="my-8 opacity-20" />
            <p>Pattern dividers work well on dark backgrounds too</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternDemo; 