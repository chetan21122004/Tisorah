import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Briefcase, Award, Package, Palette, ArrowRight } from 'lucide-react';

const ServicesSection: FC = () => {
  return (
    <section className="py-20 relative bg-white overflow-hidden">
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
            <Gift className="w-4 h-4 mr-2" /> Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-['Frank_Ruhl_Libre'] font-light text-[#323433] mb-4">
            Exceptional Gifting Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of corporate gifting solutions designed to strengthen relationships and create lasting impressions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Service 1 */}
          <ServiceCard 
            title="Corporate Branding"
            description="Elevate your brand presence with custom-branded merchandise that leaves a lasting impression. From elegant logo placement to bespoke packaging solutions."
            icon={<Briefcase className="w-4 h-4 text-[#AD9660]" />}
            image="https://corporategiftsbyconfetti.in/cdn/shop/files/Exemplary.png?v=1713181877&width=500"
            alt="Corporate Branding Solutions"
          />
          
          {/* Service 2 */}
          <ServiceCard 
            title="Recognition Awards"
            description="Celebrate achievements and milestones with our premium recognition gifts. From elegant trophies to personalized keepsakes that honor excellence."
            icon={<Award className="w-4 h-4 text-[#AD9660]" />}
            image="https://corporategiftsbyconfetti.in/cdn/shop/files/KeepRocking.png?v=1713177837&width=500"
            alt="Employee Recognition Gifts"
          />
          
          {/* Service 3 */}
          <ServiceCard 
            title="Welcome Kits"
            description="Make a memorable first impression with our thoughtfully curated welcome kits. Perfect for new hires, client onboarding, or event attendees."
            icon={<Package className="w-4 h-4 text-[#AD9660]" />}
            image="https://corporategiftsbyconfetti.in/cdn/shop/files/WorkEssentials.png?v=1713001095&width=500"
            alt="Welcome Kits"
          />
          
          {/* Service 4 */}
          <ServiceCard 
            title="Custom Hampers"
            description="Create bespoke gift hampers tailored to any occasion. From festive celebrations to corporate milestones, our custom hampers deliver delight."
            icon={<Palette className="w-4 h-4 text-[#AD9660]" />}
            image="https://www.boxupgifting.com/cdn/shop/files/joyce-g-3y9ymqvRR_s-unsplash_copy_2accb539-f2c2-4e4b-8997-f7751abc1209.jpg?v=1744178278"
            alt="Customized Gift Hampers"
          />
        </div>
        
        <div className="mt-12 md:mt-16 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-lg text-[#323433] font-['Frank_Ruhl_Libre']">
              Discover solutions tailored to your specific requirements
            </p>
            <Link href="/collections" className="inline-flex items-center bg-[#323433] text-white px-6 py-3 rounded-md hover:bg-[#AD9660] transition-colors duration-300">
              <span className="mr-2">Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description, icon, image, alt }) => {
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-[#F0EBE1] flex items-center justify-center mr-3">
              {icon}
            </div>
            <h3 className="font-['Frank_Ruhl_Libre'] text-xl text-[#323433]">{title}</h3>
          </div>
          
          <p className="text-gray-600 text-sm mb-6 flex-grow">
            {description}
          </p>
          
          <Link href="/quote" className="inline-flex items-center text-[#323433] hover:text-[#AD9660] transition-colors group-hover:text-[#AD9660]">
            <span className="font-medium mr-2">Get a Free Quote</span>
            <div className="w-5 h-[1px] bg-[#323433] group-hover:bg-[#AD9660] group-hover:w-7 transition-all duration-300"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 