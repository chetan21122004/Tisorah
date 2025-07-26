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
    { number: "3+", label: "Years Excellence" },
    { number: "40K+", label: "Luxury Boxes" },
    { number: "30+", label: "Elite Clients" },
  ]

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-[#AD9660]" />,
      title: "Customer Focused",

      
      description: "We put our client's interest ahead of our own, ensuring every gift reflects their unique needs.",
    },
    {
      icon: <Award className="w-8 h-8 text-[#AD9660]" />,
      title: "Integrity",
      description: "We do what we say and create trust by acting ethically in every interaction.",
    },
    {
      icon: <Check className="w-8 h-8 text-[#AD9660]" />,
      title: "Commitment",
      description: "We guarantee our work and stand behind every curated gift box we deliver.",
    },
  ]

  const team = [
    {
      name: "Abhijit Atre",
      position: "Founder",
      image: "/placeholder.svg",
      bio: "Visionary leader dedicated to redefining corporate gifting through bespoke curation and exceptional service."
    },
    {
      name: "Trupti Khanna",
      position: "Co-Founder",
      image: "/placeholder.svg",
      bio: "Creative innovator bringing fresh perspectives and elegant solutions to corporate gifting experiences."
    }
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
                <span className="text-[#E6E2DD] font-light tracking-wide">INDIA'S PREMIER BESPOKE GIFTING COMPANY</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              Redefining <br />
              <span className="text-[#AD9660]">Corporate Gifting</span>
            </h1>
            
            <p className="text-xl text-[#E6E2DD]/90 leading-relaxed font-light max-w-2xl mb-12">
              We believe gifting is not just a gesture — it's an experience. Each Tisorah Box is a celebration of thoughtfulness, creativity, and elegance.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Button className="bg-[#AD9660] hover:bg-[#8d7c50] text-white px-8 py-6 rounded-sm shadow-sm flex items-center gap-2 group transition-all duration-300">
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-3 gap-8">
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
                Born from the Idea of Creating <span className="text-[#AD9660]">Unforgettable Experiences</span>
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed font-light">
                <p>
                  Tisorah Box is India's premier bespoke gifting company, redefining how individuals and businesses express emotions through curated luxury gift boxes. We believe gifting is not just a gesture — it's an experience.
                </p>
                <p>
                  Each Tisorah Box is a celebration of thoughtfulness, creativity, and elegance, blending handpicked premium products, sustainable packaging, and a personal touch to ensure every gift tells a story — your story.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-serif text-[#AD9660] mb-2">40K+</div>
                  <div className="text-gray-600 font-light">Luxury Boxes</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-[#AD9660] mb-2">30+</div>
                  <div className="text-gray-600 font-light">Elite Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-[#AD9660] mb-2">3+</div>
                  <div className="text-gray-600 font-light">Years Excellence</div>
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
                      <div className="font-serif text-xl mb-1 text-[#323433]">Bespoke Curation</div>
                      <div className="text-gray-600 font-light">Premium Corporate Gifting Solutions</div>
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

          <div className="grid md:grid-cols-3 gap-8">
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

      {/* Team Section */}
      <section className="py-24 bg-[#F4F4F4] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/geometry_pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
              <span className="text-sm uppercase tracking-wider text-[#AD9660] font-light">Our Leadership</span>
              <div className="w-12 h-[2px] bg-[#AD9660]"></div>
            </div>
            
            <h2 className="text-4xl font-serif text-[#323433] mb-6">
              Meet Our <span className="text-[#AD9660]">Visionaries</span>
            </h2>
            
            <p className="text-gray-600 font-light">
              Our leadership team brings together expertise in luxury gifting, design, and brand engagement.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-16 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6">
                  <div className="w-64 h-64 rounded-full overflow-hidden bg-white shadow-md">
                    <img
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      src={member.image}
                      alt={member.name}
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    <div className="bg-[#AD9660] text-white px-6 py-1 rounded-full text-sm font-light">
                      {member.position}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-[#323433] mb-3">{member.name}</h3>
                <p className="text-gray-600 font-light max-w-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
