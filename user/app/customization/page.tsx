import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Type, Package, ImageIcon, Award, Shirt, Coffee, Briefcase, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CustomizationPage() {
  const brandingOptions = [
    {
      icon: <ImageIcon className="w-8 h-8 text-[#1E2A47]" />,
      title: "Logo Placement",
      description: "Strategic logo placement on all items",
      options: ["Embossing", "Screen Printing", "Laser Engraving", "Digital Printing"],
    },
    {
      icon: <Palette className="w-8 h-8 text-[#AD9660]" />,
      title: "Color Customization",
      description: "Match your brand colors perfectly",
      options: ["Pantone Matching", "Custom Color Schemes", "Gradient Effects", "Multi-color Options"],
    },
    {
      icon: <Type className="w-8 h-8 text-[#AB8E76]" />,
      title: "Typography",
      description: "Custom fonts and messaging",
      options: ["Brand Fonts", "Custom Messages", "Multilingual Text", "Special Characters"],
    },
    {
      icon: <Package className="w-8 h-8 text-[#1E2A47]" />,
      title: "Packaging Design",
      description: "Custom packaging solutions",
      options: ["Branded Boxes", "Custom Inserts", "Ribbon & Wrapping", "Eco-friendly Options"],
    },
  ]

  const customizationExamples = [
    {
      category: "Tech Items",
      items: [
        {
          name: "Wireless Charging Pad",
          image: "/placeholder.svg?height=200&width=200",
          customizations: ["Logo engraving", "Custom colors", "Packaging"],
        },
        {
          name: "Bluetooth Speaker",
          image: "/placeholder.svg?height=200&width=200",
          customizations: ["Brand printing", "Custom sound", "Gift box"],
        },
        {
          name: "Power Bank",
          image: "/placeholder.svg?height=200&width=200",
          customizations: ["Logo placement", "Color matching", "Custom cable"],
        },
      ],
    },
    {
      category: "Apparel",
      items: [
        {
          name: "Corporate T-Shirts",
          image: "/placeholder.svg?height=200&width=200",
          customizations: ["Logo embroidery", "Custom colors", "Size range"],
        },
        {
          name: "Branded Hoodies",
          image: "/placeholder.svg?height=200&width=200",
          customizations: ["Screen printing", "Custom design", "Premium fabric"],
        },
        {
          name: "Polo Shirts",
          image: "/placeholder.svg?height=200&width=200",
          customizations: ["Embossed logo", "Color options", "Professional fit"],
        },
      ],
    },
    {
      category: "Office Supplies",
      items: [
        {
          name: "Leather Portfolio",
          image: "/placeholder.svg?height=200&width=200",
          customizations: ["Embossed logo", "Custom interior", "Color choice"],
        },
        {
          name: "Desk Organizer",
          image: "/placeholder.svg?height=200&width=200",
          customizations: ["Laser engraving", "Custom compartments", "Material choice"],
        },
        {
          name: "Notebook Set",
          image: "/placeholder.svg?height=200&width=200",
          customizations: ["Cover design", "Custom pages", "Binding options"],
        },
      ],
    },
  ]

  const packagingOptions = [
    {
      name: "Premium Gift Box",
      description: "Luxury presentation with custom branding",
      image: "/placeholder.svg?height=150&width=200",
      features: ["Magnetic closure", "Custom insert", "Ribbon finish", "Brand colors"],
    },
    {
      name: "Eco-Friendly Package",
      description: "Sustainable packaging solutions",
      image: "/placeholder.svg?height=150&width=200",
      features: ["Recycled materials", "Biodegradable", "Minimal waste", "Green messaging"],
    },
    {
      name: "Corporate Hamper",
      description: "Traditional basket presentation",
      image: "/placeholder.svg?height=150&width=200",
      features: ["Wicker basket", "Custom liner", "Decorative elements", "Reusable container"],
    },
  ]

  const process = [
    {
      step: 1,
      title: "Consultation",
      description: "Discuss your branding requirements and vision",
      icon: <Award className="w-6 h-6 text-[#1E2A47]" />,
    },
    {
      step: 2,
      title: "Design Mockup",
      description: "Receive detailed mockups for approval",
      icon: <ImageIcon className="w-6 h-6 text-[#1E2A47]" />,
    },
    {
      step: 3,
      title: "Sample Creation",
      description: "Physical samples for final approval",
      icon: <Package className="w-6 h-6 text-[#1E2A47]" />,
    },
    {
      step: 4,
      title: "Production",
      description: "Full production with quality control",
      icon: <CheckCircle className="w-6 h-6 text-[#1E2A47]" />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#F4F4F4] py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 relative">
            <div className="w-20 h-20 bg-[#E6E2DD] rounded-sm flex items-center justify-center">
              <Palette className="w-10 h-10 text-[#323433]" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-20 h-20 border border-[#AD9660] rounded-sm"></div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#323433] mb-2 font-serif">Customization Services</h1>
          <p className="text-[#1E2A47] font-medium text-lg mb-6 font-sans">Make Every Gift Uniquely Yours</p>
          <div className="max-w-3xl mx-auto relative">
            <div className="h-px w-24 bg-[#AD9660] absolute left-1/2 -translate-x-1/2 -top-4"></div>
            <p className="text-xl text-[#323433] font-light leading-relaxed">
              Transform ordinary gifts into powerful brand ambassadors with our comprehensive customization options. Every
              detail can be tailored to reflect your company's identity and values.
            </p>
          </div>
        </div>

        {/* Branding Options */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-[#323433] text-center mb-12 relative">
            <span className="relative inline-block">
              Branding & Customization Options
              <div className="absolute -bottom-3 left-0 right-0 h-px bg-[#AD9660]"></div>
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandingOptions.map((option, index) => (
              <Card key={index} className="text-center border-0 shadow-none bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#E6E2DD] rounded-sm flex items-center justify-center mx-auto mb-6 relative">
                    {option.icon}
                    <div className="absolute -bottom-1 -right-1 w-16 h-16 border border-[#AD9660] rounded-sm"></div>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#323433] mb-3">{option.title}</h3>
                  <p className="text-[#323433] mb-4 font-light">{option.description}</p>
                  <div className="space-y-2">
                    {option.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-[#323433] font-light">
                        <CheckCircle className="w-4 h-4 text-[#AD9660]" />
                        {opt}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Customization Examples */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-[#323433] text-center mb-12 relative">
            <span className="relative inline-block">
              Customization Examples
              <div className="absolute -bottom-3 left-0 right-0 h-px bg-[#AD9660]"></div>
            </span>
          </h2>
          <Tabs defaultValue="tech" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-[#E6E2DD]">
              <TabsTrigger 
                value="tech" 
                className="flex items-center gap-2 data-[state=active]:bg-[#AD9660] data-[state=active]:text-white"
              >
                <Coffee className="w-4 h-4" />
                Tech Items
              </TabsTrigger>
              <TabsTrigger 
                value="apparel" 
                className="flex items-center gap-2 data-[state=active]:bg-[#AD9660] data-[state=active]:text-white"
              >
                <Shirt className="w-4 h-4" />
                Apparel
              </TabsTrigger>
              <TabsTrigger 
                value="office" 
                className="flex items-center gap-2 data-[state=active]:bg-[#AD9660] data-[state=active]:text-white"
              >
                <Briefcase className="w-4 h-4" />
                Office Supplies
              </TabsTrigger>
            </TabsList>

            {customizationExamples.map((category) => (
              <TabsContent
                key={category.category.toLowerCase().replace(" ", "")}
                value={category.category.toLowerCase().replace(" ", "")}
              >
                <div className="grid md:grid-cols-3 gap-8">
                  {category.items.map((item, index) => (
                    <Card key={index} className="group hover:shadow-md transition-all duration-300 border-0 shadow-sm">
                      <CardContent className="p-0">
                        <div className="relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="w-full h-48 object-cover rounded-t-sm group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-[#323433]/5 group-hover:bg-transparent transition-all"></div>
                        </div>
                        <div className="p-6 bg-white">
                          <h3 className="text-lg font-serif font-semibold text-[#323433] mb-3">{item.name}</h3>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-[#1E2A47]">Customization Options:</h4>
                            {item.customizations.map((custom, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-[#323433] font-light">
                                <CheckCircle className="w-4 h-4 text-[#AD9660]" />
                                {custom}
                              </div>
                            ))}
                          </div>
                          <Button className="w-full mt-4 bg-[#1E2A47] hover:bg-[#323433] text-white">
                            <Link href="/quote">Get Custom Quote</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Packaging Options */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-[#323433] text-center mb-12 relative">
            <span className="relative inline-block">
              Premium Packaging Options
              <div className="absolute -bottom-3 left-0 right-0 h-px bg-[#AD9660]"></div>
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packagingOptions.map((pkg, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.name}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full border border-[#AD9660]"></div>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#323433] mb-2">{pkg.name}</h3>
                  <p className="text-[#323433] mb-4 font-light">{pkg.description}</p>
                  <div className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-[#323433] font-light">
                        <CheckCircle className="w-4 h-4 text-[#AD9660]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-[#323433] text-center mb-12 relative">
            <span className="relative inline-block">
              Our Customization Process
              <div className="absolute -bottom-3 left-0 right-0 h-px bg-[#AD9660]"></div>
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#E6E2DD] rounded-sm flex items-center justify-center mx-auto mb-4 relative">
                    {step.icon}
                    <div className="absolute -bottom-1 -right-1 w-16 h-16 border border-[#AD9660] rounded-sm"></div>
                  </div>
                  <div className="w-8 h-8 bg-[#323433] rounded-sm flex items-center justify-center mx-auto mb-4 text-white font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-[#323433] mb-2">{step.title}</h3>
                  <p className="text-[#323433] text-sm font-light">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mockup Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#323433] text-center mb-12 relative">
            <span className="relative inline-block">
              Design Mockups & Examples
              <div className="absolute -bottom-3 left-0 right-0 h-px bg-[#AD9660]"></div>
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="group hover:shadow-md transition-all duration-300 border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={`/placeholder.svg?height=250&width=300&text=Mockup${item}`}
                      alt={`Design Mockup ${item}`}
                      width={300}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-serif font-semibold">Custom Design {item}</h3>
                      <p className="text-sm text-gray-200 font-light">Brand customization example</p>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full border border-[#AD9660] opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
