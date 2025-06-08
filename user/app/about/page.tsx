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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import PatternBackground, { PatternDivider, PatternAccentCorner } from "@/components/PatternBackground"

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

  const services = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Corporate Gifting",
      description: "Curated gift collections for every corporate occasion",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Custom Branding",
      description: "Personalized branding solutions for your gifts",
    },
    {
      icon: <Smile className="w-6 h-6" />,
      title: "Employee Recognition",
      description: "Meaningful rewards for your team's achievements",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Bulk Orders",
      description: "Efficient handling of large-scale corporate orders",
    },
  ]

  const team = [
    {
      name: "Abhijit Atre",
      position: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Visionary leader with a passion for excellence",
    },
    {
      name: "Priya Sharma",
      position: "Chief Marketing Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Expert in brand strategy and customer engagement",
    },
    {
      name: "Raj Patel",
      position: "Head of Product Development",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Innovator in creating unique and sophisticated gifting solutions",
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

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[90vh] overflow-hidden bg-[#1E2A47]">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A47] via-[#1E2A47]/95 to-[#1E2A47]"></div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-none border border-[#AD9660]/20">
                  <Users className="w-5 h-5 text-[#AD9660]" />
                  <span className="text-[#E6E2DD] font-light font-['Poppins']">Crafting Distinguished Corporate Relationships</span>
                </div>
              </div>
              <h1 className="text-6xl lg:text-7xl font-light text-white font-['Frank_Ruhl_Libre'] leading-tight mb-8">
                Elevating Corporate <br />
                <span className="text-[#AD9660]">Gifting Excellence</span>
              </h1>
              <p className="text-xl text-[#E6E2DD]/90 leading-relaxed font-['Poppins'] font-light max-w-2xl mb-12">
                Since 2015, Tisorah has been synonymous with heritage and sophistication, helping companies forge
                meaningful connections through premium, customized gifting solutions.
              </p>
              <div className="flex flex-wrap gap-6">
                <Button className="bg-[#AD9660] hover:bg-[#AD9660]/90 h-14 px-8 font-['Poppins'] font-light text-lg transition-all">
                  <Link href="/contact" className="flex items-center gap-2">
                    Start Your Journey <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-[#AD9660] text-[#E6E2DD] hover:bg-[#AD9660]/10 h-14 px-8 font-['Poppins'] font-light text-lg transition-all">
                  <Link href="/portfolio">View Portfolio</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1E2A47]/5 -rotate-6 transform transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white border border-[#AD9660]/20 p-8">
                    <div className="text-4xl font-light text-[#1E2A47] font-['Frank_Ruhl_Libre'] mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-['Poppins'] font-light">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section with Side Image */}
      <section className="py-24 bg-[#F4F4F4] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2 bg-[#1E2A47]/5 px-4 py-2 border border-[#1E2A47]/10">
                  <Target className="w-5 h-5 text-[#1E2A47]" />
                  <span className="text-[#1E2A47] font-light font-['Poppins']">Our Story</span>
                </div>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#323433] mb-8 font-['Frank_Ruhl_Libre']">
                A Legacy of Excellence in Corporate Gifting
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed font-['Poppins'] font-light">
                <p>
                  Tisorah emerged from a vision to redefine corporate gifting, transforming it into an art form that
                  reflects heritage, sophistication, and enduring value.
                </p>
                <p>
                  Founded in 2015 by Abhijit Atre, our company embarked on a journey to assist businesses in forging
                  stronger bonds with their employees, clients, and partners through meticulously curated gifts that
                  embody their brand's values and appreciation.
                </p>
                <p>
                  Today, we take pride in serving numerous distinguished companies, delivering curated gift sets that
                  have elevated corporate relationships and enhanced employee engagement across diverse sectors.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-light text-[#AD9660] font-['Frank_Ruhl_Libre'] mb-2">200+</div>
                  <div className="text-gray-600 font-['Poppins'] font-light">Premium Brand Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-[#AD9660] font-['Frank_Ruhl_Libre'] mb-2">15+</div>
                  <div className="text-gray-600 font-['Poppins'] font-light">Cities Served</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-[#AD9660] font-['Frank_Ruhl_Libre'] mb-2">50K+</div>
                  <div className="text-gray-600 font-['Poppins'] font-light">Happy Recipients</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-[#1E2A47]/5 rotate-6 transform"></div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Our Story"
                  width={800}
                  height={600}
                  className="w-full h-[600px] object-cover border border-[#AD9660]/20"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 border border-[#AD9660]/20">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#1E2A47] rounded-none flex items-center justify-center">
                      <Award className="w-8 h-8 text-[#AD9660]" />
                    </div>
                    <div>
                      <div className="text-[#1E2A47] font-['Frank_Ruhl_Libre'] text-xl mb-1">Excellence Award 2023</div>
                      <div className="text-gray-600 font-['Poppins'] font-light">Best Corporate Gifting Solutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-[#1E2A47]/5 px-4 py-2 border border-[#1E2A47]/10">
                <Package className="w-5 h-5 text-[#1E2A47]" />
                <span className="text-[#1E2A47] font-light font-['Poppins']">Our Services</span>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-[#323433] mb-6 font-['Frank_Ruhl_Libre']">
              Comprehensive Gifting Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Poppins'] font-light">
              Discover our range of premium services designed to elevate your corporate gifting experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1E2A47]/5 -rotate-3 transform transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white border border-[#AD9660]/20 p-8 transition-all group-hover:border-[#AD9660]">
                    <div className="w-12 h-12 bg-[#1E2A47] rounded-none flex items-center justify-center mb-6">
                      <div className="text-[#AD9660]">{service.icon}</div>
                    </div>
                    <h3 className="text-xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre']">{service.title}</h3>
                    <p className="text-gray-600 font-['Poppins'] font-light">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section with Modern Layout and Pattern Background */}
      <PatternBackground 
        overlay="neutral" 
        opacity={0.06} 
        intensity="medium" 
        size="small" 
        className="py-24"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-[#1E2A47]/10 backdrop-blur-sm px-4 py-2 border border-[#1E2A47]/10">
                <Heart className="w-5 h-5 text-[#1E2A47]" />
                <span className="text-[#1E2A47] font-light font-['Poppins']">Our Values</span>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-[#323433] mb-6 font-['Frank_Ruhl_Libre']">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Poppins'] font-light">
              Our commitment to excellence and client satisfaction drives everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <PatternAccentCorner key={index} className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1E2A47]/5 rotate-2 transform transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm border border-[#AD9660]/20 p-8 transition-all group-hover:border-[#AD9660] shadow-sm">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-[#1E2A47] rounded-none flex items-center justify-center flex-shrink-0">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre']">{value.title}</h3>
                        <p className="text-gray-600 font-['Poppins'] font-light">{value.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </PatternAccentCorner>
            ))}
          </div>
        </div>
      </PatternBackground>
      
      {/* Pattern Divider */}
      <PatternDivider className="bg-white" />

      {/* Team Section with Hover Effects */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-[#1E2A47]/5 px-4 py-2 border border-[#1E2A47]/10">
                <Users className="w-5 h-5 text-[#1E2A47]" />
                <span className="text-[#1E2A47] font-light font-['Poppins']">Our Team</span>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-[#323433] mb-6 font-['Frank_Ruhl_Libre']">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 font-['Poppins'] font-light">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1E2A47]/5 rotate-6 transform transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white border border-[#AD9660]/20 p-8 transition-all group-hover:border-[#AD9660]">
                    <div className="relative w-48 h-48 mx-auto mb-8 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover border border-[#AD9660]/20 transition-transform group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-2xl font-light text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">{member.name}</h3>
                    <p className="text-[#AD9660] font-['Poppins'] font-light mb-4">{member.position}</p>
                    <p className="text-gray-600 font-['Poppins'] font-light">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline with Visual Elements */}
      <section className="py-24 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-[#1E2A47]/5 px-4 py-2 border border-[#1E2A47]/10">
                <TrendingUp className="w-5 h-5 text-[#1E2A47]" />
                <span className="text-[#1E2A47] font-light font-['Poppins']">Our Journey</span>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-[#323433] mb-6 font-['Frank_Ruhl_Libre']">
              Milestones of Excellence
            </h2>
            <p className="text-xl text-gray-600 font-['Poppins'] font-light">
              Key achievements in our journey of growth and success
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#1E2A47]/5 -rotate-1 transform transition-transform group-hover:rotate-0"></div>
                    <div className="relative bg-white border border-[#AD9660]/20 p-8 transition-all group-hover:border-[#AD9660]">
                      <div className="flex items-start gap-8">
                        <div className="w-24 h-24 bg-[#1E2A47] rounded-none flex items-center justify-center flex-shrink-0 border border-[#AD9660]/20">
                          <div className="text-2xl font-light text-white font-['Frank_Ruhl_Libre']">{milestone.year}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-2xl font-light text-[#323433] font-['Frank_Ruhl_Libre']">
                              {milestone.event}
                            </h3>
                            <Badge variant="outline" className="text-[#AD9660] border-[#AD9660] font-['Poppins'] font-light">
                              {milestone.year}
                            </Badge>
                          </div>
                          <p className="text-gray-600 font-['Poppins'] font-light text-lg">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section with Modern Pattern Background */}
      <PatternBackground 
        overlay="accent" 
        opacity={0.08} 
        intensity="medium"
        size="large"
        className="py-24 bg-[#1E2A47] text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 border border-[#AD9660]/20">
                <Mail className="w-5 h-5 text-[#AD9660]" />
                <span className="text-white font-light font-['Poppins']">Begin Your Journey</span>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-white font-['Frank_Ruhl_Libre'] mb-6">
              Ready to Elevate Your Corporate Gifting?
            </h2>
            <p className="text-xl text-[#E6E2DD]/90 font-['Poppins'] font-light mb-12">
              Let's create meaningful connections through thoughtfully curated gifts that resonate with 
              your brand values and delight your recipients
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Button className="bg-[#AD9660] hover:bg-[#AD9660]/90 h-14 px-8 font-['Poppins'] font-light text-lg transition-all">
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="w-5 h-5" /> Contact Us
                </Link>
              </Button>
              <Button className="bg-transparent border border-[#AD9660] text-[#AD9660] hover:bg-[#AD9660]/10 h-14 px-8 font-['Poppins'] font-light text-lg transition-all">
                <Link href="/portfolio" className="flex items-center gap-2">
                  <Eye className="w-5 h-5" /> View Our Work
                </Link>
              </Button>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-[#E6E2DD] mb-2">
                  <MapPin className="w-5 h-5 text-[#AD9660]" />
                  <span className="font-['Poppins'] font-light">Location</span>
                </div>
                <p className="text-[#E6E2DD]/80 font-['Poppins'] font-light">
                  12/14, Laxmi Narayan Nagar, Erandwane, Pune - 411004
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-[#E6E2DD] mb-2">
                  <Mail className="w-5 h-5 text-[#AD9660]" />
                  <span className="font-['Poppins'] font-light">Email</span>
                </div>
                <p className="text-[#E6E2DD]/80 font-['Poppins'] font-light">quotes@tisorah.com</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-[#E6E2DD] mb-2">
                  <Phone className="w-5 h-5 text-[#AD9660]" />
                  <span className="font-['Poppins'] font-light">Phone</span>
                </div>
                <p className="text-[#E6E2DD]/80 font-['Poppins'] font-light">+91 98600 02313</p>
              </div>
            </div>
          </div>
        </div>
      </PatternBackground>
    </div>
  )
}
