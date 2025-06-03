import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Quote, Award } from "lucide-react"
import Image from "next/image"

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
      image: "/placeholder.svg?height=300&width=400",
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
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Tisorah has truly elevated our employee onboarding experience. The impeccable quality and meticulous attention to detail evident in each package have left a lasting impression. Our new hires consistently express their delight with the exquisite welcome kits.",
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
        "The recognition awards Tisorah crafted for our annual ceremony were nothing short of breathtaking. The custom engraving was executed flawlessly, and the presentation boxes added an exquisite touch of elegance. Our employees were deeply honored to receive such prestigious accolades.",
      rating: 5,
      project: "Executive Recognition Program",
    },
    {
      name: "David Park",
      position: "Event Coordinator",
      company: "StartupXYZ",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The conference welcome bags were an undeniable success with our attendees. Tisorah's commitment to eco-friendly practices resonated perfectly with our values, and the superior quality of the items within was truly impressive. A remarkable partnership for our annual conference.",
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
    { id: "all", name: "All Projects", count: portfolioItems.length },
    {
      id: "onboarding",
      name: "Onboarding",
      count: portfolioItems.filter((item) => item.category === "onboarding").length,
    },
    {
      id: "festivals",
      name: "Festivals",
      count: portfolioItems.filter((item) => item.category === "festivals").length,
    },
    {
      id: "recognition",
      name: "Recognition",
      count: portfolioItems.filter((item) => item.category === "recognition").length,
    },
    { id: "events", name: "Events", count: portfolioItems.filter((item) => item.category === "events").length },
    {
      id: "appreciation",
      name: "Appreciation",
      count: portfolioItems.filter((item) => item.category === "appreciation").length,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
              <Award className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Our Distinguished Portfolio</h1>
              <p className="text-teal-600 font-medium text-lg">Exquisite Corporate Gifting Excellence</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delve into our curated collection of successful corporate gifting endeavors. From burgeoning startups to
            esteemed Fortune 500 enterprises, we have empowered organizations to cultivate enduring relationships
            through meticulously selected, premium gifts.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-teal-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Portfolio Filter */}
        <Tabs defaultValue="all" className="mb-16">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-900">{item.industry}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-teal-600 text-white">{item.year}</Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-teal-600 font-medium mb-3">{item.client}</p>
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Results:</span>
                          <span className="font-medium text-green-600">Success</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700 italic">"{item.testimonial}"</p>
                      </div>

                      <Button className="w-full bg-teal-600 hover:bg-teal-700">Explore Excellence</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {categories.slice(1).map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioItems
                  .filter((item) => item.category === category.id)
                  .map((item) => (
                    <Card
                      key={item.id}
                      className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-white/90 text-gray-900">{item.industry}</Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-teal-600 text-white">{item.year}</Badge>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-teal-600 font-medium mb-3">{item.client}</p>
                          <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Quantity:</span>
                              <span className="font-medium">{item.quantity}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Results:</span>
                              <span className="font-medium text-green-600">Success</span>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <p className="text-sm text-gray-700 italic">"{item.testimonial}"</p>
                          </div>

                          <Button className="w-full bg-teal-600 hover:bg-teal-700">Explore Excellence</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Client Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-teal-600 mb-4" />
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.position}</div>
                      <div className="text-sm text-teal-600">{testimonial.company}</div>
                      <div className="text-xs text-gray-500 mt-1">{testimonial.project}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
