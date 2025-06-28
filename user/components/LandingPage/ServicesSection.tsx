import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Briefcase, Award, Package, Palette, ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesSection: FC = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
        <Image 
          src="/geometry_pattern.jpg" 
          alt="Decorative pattern" 
          width={256} 
          height={256} 
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-10">
        <Image 
          src="/geometry_pattern.jpg" 
          alt="Decorative pattern" 
          width={320} 
          height={320} 
          className="object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#F0EBE1] text-[#AD9660] text-sm mb-4">
            <Gift className="w-4 h-4 mr-2" /> Premium Corporate Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] mb-4">
            Elevate Your <span className="text-[#AD9660]">Corporate Gifting</span> Strategy
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
            Transform ordinary corporate occasions into memorable experiences with our premium gifting solutions tailored to your brand's unique identity and objectives.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-[#AD9660] mr-2" />
              <span className="text-sm text-gray-700">500+ Happy Clients</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-[#AD9660] mr-2" />
              <span className="text-sm text-gray-700">Premium Quality Guaranteed</span>
            </div>
            <div className="flex items-center">
              <Package className="w-4 h-4 text-[#AD9660] mr-2" />
              <span className="text-sm text-gray-700">Pan-India Delivery</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Service 1 */}
          <ServiceCard 
            title="Corporate Branding"
            description="Transform ordinary products into powerful brand ambassadors with our custom branding solutions. Perfect for enhancing brand recall and employee pride."
            icon={<Briefcase className="w-5 h-5 text-[#AD9660]" />}
            image="https://corporategiftsbyconfetti.in/cdn/shop/files/Exemplary.png?v=1713181877&width=500"
            alt="Corporate Branding Solutions"
            benefits={["Logo customization", "Brand color matching", "Premium packaging"]}
          />
          
          {/* Service 2 */}
          <ServiceCard 
            title="Recognition Awards"
            description="Celebrate achievements with premium recognition gifts that inspire and motivate. Our awards create a culture of appreciation and excellence."
            icon={<Award className="w-5 h-5 text-[#AD9660]" />}
            image="https://corporategiftsbyconfetti.in/cdn/shop/files/KeepRocking.png?v=1713177837&width=500"
            alt="Employee Recognition Gifts"
            benefits={["Personalized awards", "Achievement certificates", "Premium gift boxes"]}
          />
          
          {/* Service 3 */}
          <ServiceCard 
            title="Welcome Kits"
            description="Create an exceptional onboarding experience with our thoughtfully curated welcome kits. Make new team members feel valued from day one."
            icon={<Package className="w-5 h-5 text-[#AD9660]" />}
            image="https://corporategiftsbyconfetti.in/cdn/shop/files/WorkEssentials.png?v=1713001095&width=500"
            alt="Welcome Kits"
            benefits={["Branded essentials", "Personalized welcome notes", "Utility-focused items"]}
          />
          
          {/* Service 4 */}
          <ServiceCard 
            title="Custom Hampers"
            description="Create memorable gifting experiences with our bespoke gift hampers. Perfect for festivals, client appreciation, or celebrating corporate milestones."
            icon={<Palette className="w-5 h-5 text-[#AD9660]" />}
            image="https://www.boxupgifting.com/cdn/shop/files/joyce-g-3y9ymqvRR_s-unsplash_copy_2accb539-f2c2-4e4b-8997-f7751abc1209.jpg?v=1744178278"
            alt="Customized Gift Hampers"
            benefits={["Theme-based curation", "Luxury packaging", "Personalized messaging"]}
          />
        </div>
        
        {/* Enhanced CTA Section */}
        <div className="mt-6 md:mt-10 bg-[#F0EBE1] rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] mb-3">
                Ready for a <span className="text-[#AD9660]">Custom Solution?</span>
              </h3>
              <p className="text-gray-700 mb-4">
                Our corporate gifting experts will help you create the perfect gifting strategy tailored to your specific requirements and budget. Get a personalized quote today!
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#AD9660]" />
                  </div>
                  <span className="text-sm text-gray-700">Free consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#AD9660]" />
                  </div>
                  <span className="text-sm text-gray-700">No minimum order</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#AD9660]" />
                  </div>
                  <span className="text-sm text-gray-700">Bulk discounts available</span>
                </div>
              </div>
            </div>
            <div>
              <Button className="bg-[#AD9660] hover:bg-[#8d7c50] text-white px-8 py-6 rounded-md flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="/quote" className="flex items-center gap-2">
                  <span className="font-medium">Request Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  alt: string;
  benefits: string[];
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description, icon, image, alt, benefits }) => {
  return (
    <div className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <Image 
            src={image} 
            alt={alt} 
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <Button variant="secondary" size="sm" className="w-full bg-white/80 backdrop-blur-sm hover:bg-white text-[#323433] font-medium">
                <Link href="/quote" className="flex items-center justify-center gap-2 w-full">
                  <span>Get Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-[#F0EBE1] flex items-center justify-center mr-3">
              {icon}
            </div>
            <h3 className="font-['Frank_Ruhl_Libre'] text-xl text-[#323433] font-medium">{title}</h3>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {description}
          </p>
          
          <div className="space-y-2 mb-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#AD9660] mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
          
          <Link href="/quote" className="inline-flex items-center text-[#323433] hover:text-[#AD9660] transition-colors group-hover:text-[#AD9660] font-medium text-sm">
            <span className="mr-2">Request Custom Quote</span>
            <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 