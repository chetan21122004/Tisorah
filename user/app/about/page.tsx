import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Award,
  Globe,
  Heart,
  Target,
  Eye,
  Lightbulb,
  ArrowRight,
  Star,
  Package,
  Smile,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Check,
  Clock,
  Gift,
  Briefcase
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { QuotePopup } from "@/components/quote-popup"

export default function AboutPage() {
  const stats = [
    { number: "8+", label: "Years of Excellence" },
    { number: "5000+", label: "Curated Gift Sets" },
    { number: "200+", label: "Corporate Clients" },
    { number: "98%", label: "Client Satisfaction" },
  ]

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-[#AD9660]" />,
      title: "Thoughtful Curation",
      description: "Every gift is carefully selected to create meaningful connections and lasting impressions.",
    },
    {
      icon: <Award className="w-8 h-8 text-[#AD9660]" />,
      title: "Premium Quality",
      description: "We partner with trusted suppliers to ensure every product meets our high standards of excellence.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#AD9660]" />,
      title: "Client-Centric Approach",
      description: "Your success is our priority. We work closely with you to understand and exceed your expectations.",
    },
    {
      icon: <Globe className="w-8 h-8 text-[#AD9660]" />,
      title: "Nationwide Reach",
      description: "Serving clients across the country with reliable delivery and consistent service quality.",
    },
  ]

  const milestones = [
    { year: "2015", event: "Foundation", description: "Established with a vision of sophisticated corporate gifting" },
    {
      year: "2017",
      event: "Initial Partnerships",
      description: "Forged alliances with premium brands to elevate offerings",
    },
    { year: "2020", event: "Expanded Reach", description: "Extended services to major metropolitan areas" },
    {
      year: "2022",
      event: "Exceeded Expectations",
      description: "Surpassed delivery of 5,000 curated gift sets",
    },
    {
      year: "2024",
      event: "Exclusive Collections",
      description: "Introduced bespoke collections for discerning clientele",
    },
  ]

  const team = [
    {
      name: "Abhijit Atre",
      position: "Founder & CEO",
      image: "/placeholder.svg",
      bio: "Visionary leader with a passion for excellence in corporate gifting solutions.",
      contact: { email: "atreabhijit@gmail.com", phone: "+91 98600 02313" }
    },
    {
      name: "Priya Sharma",
      position: "Chief Marketing Officer",
      image: "/placeholder.svg",
      bio: "Expert in brand strategy and customer engagement with over a decade of experience.",
    },
    {
      name: "Raj Patel",
      position: "Head of Product Development",
      image: "/placeholder.svg",
      bio: "Innovator in creating unique and sophisticated gifting solutions for corporate clients.",
    },
  ]

  return (
    <div className="min-h-screen">
      <QuotePopup />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-b from-[#1E2A47] to-[#323433] overflow-hidden">
        {/* Abstract geometric patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#AD9660]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#AD9660]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5 bg-repeat"></div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl py-20">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 border border-[#AD9660]/20">
                <Award className="w-5 h-5 text-[#AD9660]" />
                <span className="text-[#E6E2DD] font-light tracking-wide">PREMIUM CORPORATE GIFTING SOLUTIONS</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              Crafting Memorable <br />
              <span className="text-[#AD9660]">Corporate Experiences</span>
            </h1>
            
            <p className="text-xl text-[#E6E2DD]/90 leading-relaxed font-light max-w-2xl mb-12">
              Since 2015, we've been dedicated to elevating corporate relationships through thoughtfully curated gifts that reflect sophistication, quality, and meaningful connections.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Button className="bg-[#AD9660] hover:bg-[#8d7c50] text-white px-8 py-6 rounded-sm shadow-sm flex items-center gap-2 group transition-all duration-300">
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button variant="outline" className="border-[#AD9660] text-[#2c2b29] hover:bg-[#AD9660]/10 px-8 py-6 rounded-sm">
                Explore Our Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white border border-[#AD9660]/10 p-8 transition-all duration-300 hover:border-[#AD9660]/30 hover:shadow-lg">
                  <div className="text-4xl font-serif text-[#323433] mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-light">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-[#F4F4F4] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-[2px] bg-[#AD9660]"></div>
                  <span className="text-sm uppercase tracking-wider text-[#AD9660] font-light">Our Story</span>
                </div>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-serif text-[#323433] leading-tight mb-8">
                A Legacy of Excellence in <span className="text-[#AD9660]">Corporate Gifting</span>
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed font-light">
                <p>
                  Tisorah emerged from a vision to redefine corporate gifting, transforming it into an art form that
                  reflects heritage, sophistication, and enduring value.
                </p>
                <p>
                  Founded in 2015 by Abhijit Atre, our company embarked on a journey to assist businesses in forging
                  stronger bonds with their employees, clients, and partners through meticulously curated gifts that
                  embody their brand's values and appreciation.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-serif text-[#AD9660] mb-2">200+</div>
                  <div className="text-gray-600 font-light">Premium Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-[#AD9660] mb-2">15+</div>
                  <div className="text-gray-600 font-light">Cities Served</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-[#AD9660] mb-2">50K+</div>
                  <div className="text-gray-600 font-light">Happy Recipients</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative">
                <Image
                  src="https://www.boxupgifting.com/cdn/shop/files/Custom_curated.jpg?v=1685185266&width=1240"
                  alt="Our Story"
                  width={800}
                  height={600}
                  className="w-full h-[600px] object-cover shadow-xl"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#1E2A47] flex items-center justify-center">
                      <Award className="w-8 h-8 text-[#AD9660]" />
                    </div>
                    <div>
                      <div className="font-serif text-xl mb-1 text-[#323433]">Excellence Award 2023</div>
                      <div className="text-gray-600 font-light">Best Corporate Gifting Solutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
              <span className="text-sm uppercase tracking-wider text-[#AD9660] font-light">Our Values</span>
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
            </div>
            
            <h2 className="text-4xl font-serif text-[#323433] mb-6">
              The Principles That <span className="text-[#AD9660]">Guide Us</span>
            </h2>
            
            <p className="text-gray-600 font-light">
              Our values shape every aspect of our service, from product curation to client relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white border border-[#AD9660]/10 p-8 transition-all duration-300 hover:border-[#AD9660]/30 hover:shadow-lg">
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="text-xl font-serif text-[#323433] mb-4">{value.title}</h3>
                  <p className="text-gray-600 font-light">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-[#F4F4F4] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
              <span className="text-sm uppercase tracking-wider text-[#AD9660] font-light">Our Journey</span>
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
            </div>
            
            <h2 className="text-4xl font-serif text-[#323433] mb-6">
              Milestones That <span className="text-[#AD9660]">Define Us</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#AD9660]/20"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="flex-1 bg-white p-8 border border-[#AD9660]/10 shadow-sm">
                    <div className="text-2xl font-serif text-[#AD9660] mb-2">{milestone.year}</div>
                    <h3 className="text-xl text-[#323433] mb-2">{milestone.event}</h3>
                    <p className="text-gray-600 font-light">{milestone.description}</p>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#AD9660] rounded-full">
                    <div className="absolute inset-0 bg-[#AD9660] rounded-full animate-ping"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
              <span className="text-sm uppercase tracking-wider text-[#AD9660] font-light">Our Team</span>
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
            </div>
            
            <h2 className="text-4xl font-serif text-[#323433] mb-6">
              Meet the <span className="text-[#AD9660]">Visionaries</span>
            </h2>
            
            <p className="text-gray-600 font-light">
              Our leadership team brings together decades of experience in corporate gifting and brand engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white border border-[#AD9660]/10 overflow-hidden transition-all duration-300 hover:border-[#AD9660]/30 hover:shadow-lg">
                  <div className="relative h-80">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-xl font-serif text-[#323433] mb-1">{member.name}</h3>
                    <div className="text-[#AD9660] font-light mb-4">{member.position}</div>
                    <p className="text-gray-600 font-light mb-6">{member.bio}</p>
                    
                    {member.contact && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="font-light">{member.contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span className="font-light">{member.contact.phone}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-[#1E2A47] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#AD9660]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#AD9660]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif text-white mb-6">
              Ready to Elevate Your <span className="text-[#AD9660]">Corporate Gifting</span>?
            </h2>
            
            <p className="text-xl text-[#E6E2DD]/90 font-light mb-12">
              Let's create meaningful connections through thoughtfully curated gifts that reflect your brand's values.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Button className="bg-[#AD9660] hover:bg-[#8d7c50] text-white px-8 py-6 rounded-sm shadow-sm flex items-center gap-2 group transition-all duration-300">
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button variant="outline" className="border-[#AD9660] text-[#E6E2DD] hover:bg-[#AD9660]/10 px-8 py-6 rounded-sm">
                View Our Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
