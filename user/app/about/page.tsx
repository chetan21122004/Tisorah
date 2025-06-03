import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Heart, Target, Eye, Lightbulb } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-rose-600" />,
      title: "Thoughtful Curation",
      description: "Every gift is carefully selected to create meaningful connections and lasting impressions.",
    },
    {
      icon: <Award className="w-8 h-8 text-amber-600" />,
      title: "Premium Quality",
      description: "We partner with trusted suppliers to ensure every product meets our high standards of excellence.",
    },
    {
      icon: <Users className="w-8 h-8 text-teal-600" />,
      title: "Client-Centric Approach",
      description: "Your success is our priority. We work closely with you to understand and exceed your expectations.",
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Nationwide Reach",
      description: "Serving clients across the country with reliable delivery and consistent service quality.",
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">About Tisorah</h1>
                <p className="text-teal-600 font-medium text-lg">Crafting Distinguished Corporate Relationships</p>
              </div>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Since its inception, Tisorah has been synonymous with heritage and sophistication, helping companies
              cultivate stronger corporate relationships through premium, customized gifting solutions that exude
              elegance and refinement.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower our clients by delivering exceptional corporate gifting experiences with unwavering integrity
                and commitment to customer satisfaction.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be recognized as the premier corporate gifting provider, renowned for our exclusive approach,
                meticulous attention to detail, and unparalleled sophistication.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Empowering connections and sophisticated solutions drive our ethos. We champion trust through
                transparency, dependability, and surpassing expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
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
              <Button className="bg-teal-600 hover:bg-teal-700 mt-6">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Our Story"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence and client satisfaction drives everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-teal-600 font-medium mb-4">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our growth and success</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{milestone.event}</h3>
                      <Badge variant="outline" className="text-teal-600 border-teal-600">
                        {milestone.year}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
