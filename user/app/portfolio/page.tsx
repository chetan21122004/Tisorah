import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Quote, Award, ArrowRight, Users, Building, Grid, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PortfolioPage() {
  const portfolioItems = [
    {
      id: 1,
      title: "Executive Welcome Collection",
      client: "TechCorp Solutions",
      category: "onboarding",
      industry: "Technology",
      quantity: "500 pieces",
      year: "2024",
      image: "/placeholder.svg?height=600&width=800",
      description:
        "A curated collection of premium items designed to provide new executives with a memorable and sophisticated welcome experience.",
      results: "95% employee satisfaction, improved first-day experience",
      testimonial: "Outstanding quality and attention to detail. Our new employees were thrilled!",
      rating: 5,
    },
    {
      id: 2,
      title: "Luxury Executive Hamper",
      client: "Global Finance Inc",
      category: "festivals",
      industry: "Finance",
      quantity: "1,200 pieces",
      year: "2023",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "An opulent hamper filled with gourmet delicacies and bespoke branded items, crafted to elevate the Diwali celebration for Global Finance Inc.",
      results: "Enhanced employee morale, strengthened cultural appreciation",
      testimonial: "The festival hampers were absolutely beautiful and well-received by our entire team.",
      rating: 5,
    },
    {
      id: 3,
      title: "Executive Recognition Awards",
      client: "InnovateCo",
      category: "recognition",
      industry: "Manufacturing",
      quantity: "50 pieces",
      year: "2024",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Exquisite crystal awards, each meticulously engraved to honor exceptional achievements and contributions within InnovateCo.",
      results: "Increased motivation, improved retention rates",
      testimonial: "The awards exceeded our expectations. Perfect for recognizing our top performers.",
      rating: 5,
    },
    {
      id: 4,
      title: "Conference Welcome Bags",
      client: "StartupXYZ",
      category: "events",
      industry: "Startup",
      quantity: "800 pieces",
      year: "2024",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Eco-conscious conference bags containing carefully selected tech accessories and branded materials, designed to leave a lasting impression on StartupXYZ attendees.",
      results: "Positive attendee feedback, enhanced brand visibility",
      testimonial: "Professional presentation that perfectly represented our brand values.",
      rating: 4,
    },
    {
      id: 5,
      title: "Client Appreciation Gifts",
      client: "Premium Consulting",
      category: "appreciation",
      industry: "Consulting",
      quantity: "150 pieces",
      year: "2023",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Luxurious leather portfolios, custom-branded to convey gratitude and strengthen relationships with Premium Consulting's esteemed VIP clients.",
      results: "Strengthened client relationships, increased referrals",
      testimonial: "Our clients were impressed with the quality and thoughtfulness of these gifts.",
      rating: 5,
    },
    {
      id: 6,
      title: "Remote Worker Care Package",
      client: "Digital Agency Pro",
      category: "remote",
      industry: "Digital Marketing",
      quantity: "300 pieces",
      year: "2024",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "A thoughtfully curated work-from-home essentials package, featuring ergonomic accessories and wellness items to enhance the well-being of Digital Agency Pro's remote team.",
      results: "Improved remote work satisfaction, better work-life balance",
      testimonial: "These care packages showed our remote team how much we value them.",
      rating: 5,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "HR Director",
      company: "TechCorp Solutions",
      image: "/placeholder.svg?height=120&width=120",
      content:
        "TisorahBox has truly elevated our employee onboarding experience. The impeccable quality and meticulous attention to detail evident in each package have left a lasting impression. Our new hires consistently express their delight with the exquisite welcome kits.",
      rating: 5,
      project: "Onboarding Kit Program",
    },
    {
      name: "Michael Chen",
      position: "Operations Manager",
      company: "Global Finance Inc",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Collaborating with Tisorah was a seamless and delightful experience from beginning to end. Their profound understanding of our cultural requirements for the festival celebration resulted in hampers that surpassed our highest expectations. The entire process was characterized by unparalleled professionalism and efficiency.",
      rating: 5,
      project: "Festival Celebration Hampers",
    },
    {
      name: "Emily Rodriguez",
      position: "CEO",
      company: "InnovateCo",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The recognition awards TisorahBox crafted for our annual ceremony were nothing short of breathtaking. The custom engraving was executed flawlessly, and the presentation boxes added an exquisite touch of elegance. Our employees were deeply honored to receive such prestigious accolades.",
      rating: 5,
      project: "Executive Recognition Program",
    },
    {
      name: "David Park",
      position: "Event Coordinator",
      company: "StartupXYZ",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The conference welcome bags were an undeniable success with our attendees. TisorahBox commitment to eco-friendly practices resonated perfectly with our values, and the superior quality of the items within was truly impressive. A remarkable partnership for our annual conference.",
      rating: 4,
      project: "Annual Conference 2024",
    },
  ]

  const stats = [
    { number: "500+", label: "Distinguished Projects" },
    { number: "50K+", label: "Exquisite Gifts Curated" },
    { number: "98%", label: "Client Excellence" },
    { number: "200+", label: "Esteemed Partners" },
  ]

  const categories = [
    { id: "all", name: "All Projects", count: portfolioItems.length, icon: <Grid className="w-4 h-4" /> },
    {
      id: "onboarding",
      name: "Onboarding",
      count: portfolioItems.filter((item) => item.category === "onboarding").length,
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "festivals",
      name: "Festivals",
      count: portfolioItems.filter((item) => item.category === "festivals").length,
      icon: <Star className="w-4 h-4" />,
    },
    {
      id: "recognition",
      name: "Recognition",
      count: portfolioItems.filter((item) => item.category === "recognition").length,
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: "events",
      name: "Events",
      count: portfolioItems.filter((item) => item.category === "events").length,
      icon: <Building className="w-4 h-4" />,
    },
    {
      id: "appreciation",
      name: "Appreciation",
      count: portfolioItems.filter((item) => item.category === "appreciation").length,
      icon: <Quote className="w-4 h-4" />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Hero Section */}
      <section className="relative bg-[#1E2A47] py-24">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A47] via-[#1E2A47]/95 to-[#1E2A47]"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-none border border-[#AD9660]/20">
                <Eye className="w-5 h-5 text-[#AD9660]" />
                <span className="text-[#E6E2DD] font-light font-['Poppins']">Our Distinguished Work</span>
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-light text-white font-['Frank_Ruhl_Libre'] mb-6">
              Crafting <span className="text-[#AD9660]">Memorable</span> Experiences
            </h1>
            <p className="text-xl text-[#E6E2DD]/90 leading-relaxed font-['Poppins'] font-light max-w-2xl mx-auto">
              Explore our curated collection of corporate gifting excellence. Each project represents our commitment to
              sophistication, quality, and meaningful connections.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1E2A47]/5 -rotate-3 transform transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white border border-[#AD9660]/20 p-8 text-center transition-all group-hover:border-[#AD9660]">
                    <div className="text-3xl font-light text-[#1E2A47] font-['Frank_Ruhl_Libre'] mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-['Poppins'] font-light">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-[#1E2A47]/5 px-4 py-2 border border-[#1E2A47]/10">
                <Grid className="w-5 h-5 text-[#1E2A47]" />
                <span className="text-[#1E2A47] font-light font-['Poppins']">Our Portfolio</span>
              </div>
            </div>
            <h2 className="text-4xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre']">
              Explore Our Distinguished Projects
            </h2>
            <p className="text-gray-600 font-['Poppins'] font-light">
              From burgeoning startups to Fortune 500 enterprises, we help organizations forge lasting connections.
            </p>
          </div>

          <Tabs defaultValue="all" className="mb-16">
            <TabsList className="flex flex-wrap justify-center gap-4 mb-12 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="border border-[#AD9660]/20 hover:border-[#AD9660] bg-white data-[state=active]:bg-[#1E2A47] data-[state=active]:text-white px-6 h-12"
                >
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span className="font-['Poppins'] font-light">
                      {category.name} <span className="text-sm">({category.count})</span>
                    </span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#1E2A47]/5 rotate-2 transform transition-transform group-hover:rotate-0"></div>
                      <div className="relative bg-white border border-[#AD9660]/20 transition-all group-hover:border-[#AD9660] overflow-hidden">
                        <div className="relative">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={800}
                            height={600}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 space-y-2">
                            <Badge className="bg-white/95 text-[#323433] font-['Poppins'] font-light border-none">
                              {item.industry}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-[#1E2A47] text-white font-['Poppins'] font-light border-none">
                              {item.year}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-8">
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-[#AD9660] fill-[#AD9660]" />
                            ))}
                          </div>
                          <h3 className="text-xl font-light text-[#323433] mb-2 font-['Frank_Ruhl_Libre']">
                            {item.title}
                          </h3>
                          <p className="text-[#AD9660] font-['Poppins'] font-light mb-4">{item.client}</p>
                          <p className="text-gray-600 font-['Poppins'] font-light text-sm mb-6">{item.description}</p>
                          <div className="space-y-3 border-t border-[#AD9660]/10 pt-6">
                            <div className="flex items-start gap-2">
                              <Badge variant="outline" className="border-[#AD9660]/20 text-[#323433] font-['Poppins'] font-light">
                                {item.quantity}
                              </Badge>
                              <Badge variant="outline" className="border-[#AD9660]/20 text-[#323433] font-['Poppins'] font-light">
                                {item.category}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-[#AD9660] font-['Poppins'] font-light">{item.results}</div>
                              <Button variant="ghost" className="p-0 hover:bg-transparent">
                                <ArrowRight className="w-5 h-5 text-[#AD9660] transform transition-transform group-hover:translate-x-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-[#1E2A47]/5 px-4 py-2 border border-[#1E2A47]/10">
                <Quote className="w-5 h-5 text-[#1E2A47]" />
                <span className="text-[#1E2A47] font-light font-['Poppins']">Client Testimonials</span>
              </div>
            </div>
            <h2 className="text-4xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre']">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 font-['Poppins'] font-light">
              Discover why leading organizations trust us with their corporate gifting needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1E2A47]/5 -rotate-1 transform transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white border border-[#AD9660]/20 p-8 transition-all group-hover:border-[#AD9660]">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#1E2A47]/5 rotate-6 transform"></div>
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={120}
                          height={120}
                          className="relative w-20 h-20 object-cover border border-[#AD9660]/20"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-[#323433] mb-1 font-['Frank_Ruhl_Libre']">
                          {testimonial.name}
                        </h3>
                        <p className="text-[#AD9660] font-['Poppins'] font-light text-sm mb-2">
                          {testimonial.position}, {testimonial.company}
                        </p>
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-[#AD9660] fill-[#AD9660]" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Quote className="w-8 h-8 text-[#AD9660]/20 mb-4" />
                    <p className="text-gray-600 font-['Poppins'] font-light leading-relaxed mb-6">
                      {testimonial.content}
                    </p>
                    <div className="border-t border-[#AD9660]/10 pt-4">
                      <Badge variant="outline" className="border-[#AD9660]/20 text-[#323433] font-['Poppins'] font-light">
                        {testimonial.project}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1E2A47]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light text-white font-['Frank_Ruhl_Libre'] mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-[#E6E2DD]/90 font-['Poppins'] font-light mb-12">
              Let's collaborate to design a gifting experience that reflects your brand's excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button className="bg-[#AD9660] hover:bg-[#AD9660]/90 h-14 px-8 font-['Poppins'] font-light text-lg">
                <Link href="/contact" className="flex items-center gap-2">
                  Start Your Project <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button className="bg-transparent border border-[#AD9660] text-[#AD9660] hover:bg-[#AD9660]/10 h-14 px-8 font-['Poppins'] font-light text-lg">
                <Link href="/quote">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
