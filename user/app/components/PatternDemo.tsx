import React from 'react';
import PatternBackground, { PatternDivider, PatternAccentCorner } from '@/components/PatternBackground';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Book, Briefcase, Award, Code, Check, Zap } from 'lucide-react';

export const PatternDemo = () => {
  return (
    <div className="space-y-16 py-16 bg-[#FCFCFC]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#323433]">Modern Pattern Applications</h2>
          <p className="text-lg text-gray-600">
            Sophisticated geometric patterns that enhance your brand presence with elegance and subtlety.
          </p>
        </div>
        
        {/* Brand Color Overlays - More Professional */}
        <Tabs defaultValue="primary" className="w-full mb-16">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-xl">
              <TabsTrigger value="primary">Primary</TabsTrigger>
              <TabsTrigger value="secondary">Secondary</TabsTrigger>
              <TabsTrigger value="accent">Accent</TabsTrigger>
              <TabsTrigger value="neutral">Neutral</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="primary" className="mt-0">
            <PatternBackground overlay="primary" opacity={0.06} className="p-12 rounded-md">
              <div className="bg-white/90 backdrop-blur-md rounded-md p-8 shadow-sm border border-[#323433]/10 max-w-3xl mx-auto">
                <h3 className="text-2xl font-serif mb-4 text-[#323433]">Primary Overlay</h3>
                <p className="text-gray-700 mb-6">
                  The primary color overlay creates a professional and sophisticated foundation for corporate communications, 
                  annual reports, and executive presentations.
                </p>
                <Button className="bg-[#323433] hover:bg-[#323433]/90">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </PatternBackground>
          </TabsContent>
          
          <TabsContent value="secondary" className="mt-0">
            <PatternBackground overlay="secondary" opacity={0.06} className="p-12 rounded-md">
              <div className="bg-white/90 backdrop-blur-md rounded-md p-8 shadow-sm border border-[#AD9660]/10 max-w-3xl mx-auto">
                <h3 className="text-2xl font-serif mb-4 text-[#323433]">Secondary Overlay</h3>
                <p className="text-gray-700 mb-6">
                  The gold overlay adds a touch of luxury and distinction, perfect for premium offerings, 
                  special occasion gifting, and executive recognition programs.
                </p>
                <Button className="bg-[#AD9660] hover:bg-[#AD9660]/90">
                  Explore Premium <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </PatternBackground>
          </TabsContent>
          
          <TabsContent value="accent" className="mt-0">
            <PatternBackground overlay="accent" opacity={0.06} className="p-12 rounded-md">
              <div className="bg-white/90 backdrop-blur-md rounded-md p-8 shadow-sm border border-[#1E2A47]/10 max-w-3xl mx-auto">
                <h3 className="text-2xl font-serif mb-4 text-[#323433]">Accent Overlay</h3>
                <p className="text-gray-700 mb-6">
                  The navy accent creates depth and authority, ideal for corporate trustworthiness messaging, 
                  industry leadership content, and formal business communications.
                </p>
                <Button className="bg-[#1E2A47] hover:bg-[#1E2A47]/90">
                  View Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </PatternBackground>
          </TabsContent>
          
          <TabsContent value="neutral" className="mt-0">
            <PatternBackground overlay="neutral" opacity={0.06} className="p-12 rounded-md">
              <div className="bg-white/90 backdrop-blur-md rounded-md p-8 shadow-sm border border-[#E6E2DD]/10 max-w-3xl mx-auto">
                <h3 className="text-2xl font-serif mb-4 text-[#323433]">Neutral Overlay</h3>
                <p className="text-gray-700 mb-6">
                  The subtle beige tone creates warmth and approachability, perfect for client testimonials,
                  company values, and employee recognition sections.
                </p>
                <Button className="bg-[#AB8E76] hover:bg-[#AB8E76]/90">
                  Discover More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </PatternBackground>
          </TabsContent>
        </Tabs>
        
        {/* Pattern Intensity & Size Showcase */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif mb-6 text-center text-[#323433]">Pattern Intensity & Size</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <PatternBackground 
              overlay="accent" 
              opacity={0.05} 
              intensity="subtle" 
              size="small"
              className="p-8 rounded-md border border-[#1E2A47]/10 shadow-sm"
            >
              <h4 className="text-xl font-serif mb-2 text-[#323433]">Subtle & Small</h4>
              <p className="text-gray-600">Refined background for formal content and typography-focused sections.</p>
            </PatternBackground>
            
            <PatternBackground 
              overlay="secondary" 
              opacity={0.05} 
              intensity="medium" 
              size="default"
              className="p-8 rounded-md border border-[#AD9660]/10 shadow-sm"
            >
              <h4 className="text-xl font-serif mb-2 text-[#323433]">Medium & Default</h4>
              <p className="text-gray-600">Balanced visibility for most corporate content and marketing materials.</p>
            </PatternBackground>
            
            <PatternBackground 
              overlay="primary" 
              opacity={0.05} 
              intensity="strong" 
              size="large"
              className="p-8 rounded-md border border-[#323433]/10 shadow-sm"
            >
              <h4 className="text-xl font-serif mb-2 text-[#323433]">Strong & Large</h4>
              <p className="text-gray-600">Bold presence for hero sections, special announcements, and feature highlights.</p>
            </PatternBackground>
          </div>
        </div>
        
        {/* Interactive Pattern Elements */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif mb-6 text-center text-[#323433]">Interactive Elements</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {['Executive Onboarding', 'Recognition Awards', 'Festive Gifting'].map((title, index) => (
              <PatternBackground 
                key={index}
                overlay={index === 0 ? 'primary' : index === 1 ? 'secondary' : 'accent'} 
                opacity={0.06} 
                interactive={true}
                className="p-6 rounded-md border border-gray-100 shadow-sm cursor-pointer"
              >
                <h4 className="text-xl font-serif mb-2 text-[#323433]">{title}</h4>
                <p className="text-gray-600 mb-4">Hover to see the subtle pattern animation effect.</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </PatternBackground>
            ))}
          </div>
        </div>
        
        {/* Pattern Dividers */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif mb-6 text-center text-[#323433]">Sophisticated Dividers</h3>
          
          <div className="bg-white p-8 rounded-md shadow-sm mb-12 max-w-3xl mx-auto">
            <h4 className="text-xl font-serif mb-4 text-[#323433]">Standard Divider</h4>
            <p className="text-gray-600 mb-8">
              Subtle separation for content blocks while maintaining visual harmony.
            </p>
            
            <PatternDivider />
            
            <div className="mt-8">
              <p className="text-gray-600">
                A refined approach to visual separation that maintains brand sophistication.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-md shadow-sm">
              <h4 className="text-xl font-serif mb-4 text-[#323433]">Thick Divider</h4>
              <p className="text-gray-600 mb-6">
                More prominent separation for major content blocks.
              </p>
              
              <PatternDivider thick={true} />
              
              <div className="mt-6">
                <p className="text-gray-600">
                  Creates stronger visual hierarchy.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-md shadow-sm">
              <h4 className="text-xl font-serif mb-4 text-[#323433]">Faded Edges</h4>
              <p className="text-gray-600 mb-6">
                Elegant transition with softened edges.
              </p>
              
              <PatternDivider withFade={true} />
              
              <div className="mt-6">
                <p className="text-gray-600">
                  Adds sophistication to page sections.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pattern Accent Corners */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif mb-6 text-center text-[#323433]">Pattern Accent Details</h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { 
                icon: <Book className="h-6 w-6 text-[#AD9660]" />, 
                title: "Corporate Legacy", 
                description: "Curated collections that tell your organization's unique story" 
              },
              { 
                icon: <Briefcase className="h-6 w-6 text-[#AD9660]" />, 
                title: "Executive Distinction", 
                description: "Premium solutions for leadership recognition and milestones" 
              },
              { 
                icon: <Award className="h-6 w-6 text-[#AD9660]" />, 
                title: "Achievement Celebration", 
                description: "Memorable tokens of appreciation for exceptional performance" 
              },
              { 
                icon: <Zap className="h-6 w-6 text-[#AD9660]" />, 
                title: "Brand Embodiment", 
                description: "Custom solutions that perfectly capture your organization's essence" 
              }
            ].map((item, index) => (
              <PatternAccentCorner key={index} className="bg-white p-8 rounded-md shadow-sm border border-gray-100 relative">
                <div className="flex items-start gap-4">
                  {item.icon}
                  <div>
                    <h4 className="text-xl font-serif mb-2 text-[#323433]">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 z-10 bg-[#AD9660] text-white p-2 text-xs font-medium">
                  Premium
                </div>
              </PatternAccentCorner>
            ))}
          </div>
        </div>
        
        {/* Dark Theme Pattern */}
        <div>
          <h3 className="text-2xl font-serif mb-6 text-center text-[#323433]">Elegant Dark Theme</h3>
          
          <PatternBackground 
            overlay="accent" 
            opacity={0.1} 
            className="p-12 bg-[#1E2A47] rounded-md text-white"
          >
            <div className="max-w-3xl mx-auto">
              <h4 className="text-2xl font-serif mb-4 text-white">Corporate Excellence</h4>
              <p className="text-[#E6E2DD]/90 mb-8">
                Distinguished gifting solutions that reflect the sophistication of your organization
                and create lasting impressions with clients and partners.
              </p>
              
              <PatternDivider className="opacity-20 my-8" withFade={true} />
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { label: "Satisfied Clients", value: "200+" },
                  { label: "Curated Collections", value: "50+" },
                  { label: "Years of Excellence", value: "8+" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-serif text-[#AD9660] mb-1">{stat.value}</div>
                    <div className="text-[#E6E2DD]/80 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 flex justify-center">
                <Button className="bg-[#AD9660] hover:bg-[#AD9660]/90">
                  Discover Our Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </PatternBackground>
        </div>
      </div>
    </div>
  );
};

export default PatternDemo; 