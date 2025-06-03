import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Type, Package, ImageIcon, Award, Shirt, Coffee, Briefcase, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CustomizationPage() {
  const brandingOptions = [
    {
      icon: <ImageIcon className="w-8 h-8 text-teal-600" />,
      title: "Logo Placement",
      description: "Strategic logo placement on all items",
      options: ["Embossing", "Screen Printing", "Laser Engraving", "Digital Printing"],
    },
    {
      icon: <Palette className="w-8 h-8 text-amber-600" />,
      title: "Color Customization",
      description: "Match your brand colors perfectly",
      options: ["Pantone Matching", "Custom Color Schemes", "Gradient Effects", "Multi-color Options"],
    },
    {
      icon: <Type className="w-8 h-8 text-rose-600" />,
      title: "Typography",
      description: "Custom fonts and messaging",
      options: ["Brand Fonts", "Custom Messages", "Multilingual Text", "Special Characters"],
    },
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
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
      icon: <Award className="w-6 h-6 text-teal-600" />,
    },
    {
      step: 2,
      title: "Design Mockup",
      description: "Receive detailed mockups for approval",
      icon: <ImageIcon className="w-6 h-6 text-teal-600" />,
    },
    {
      step: 3,
      title: "Sample Creation",
      description: "Physical samples for final approval",
      icon: <Package className="w-6 h-6 text-teal-600" />,
    },
    {
      step: 4,
      title: "Production",
      description: "Full production with quality control",
      icon: <CheckCircle className="w-6 h-6 text-teal-600" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
              <Palette className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Customization Services</h1>
              <p className="text-teal-600 font-medium text-lg">Make Every Gift Uniquely Yours</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform ordinary gifts into powerful brand ambassadors with our comprehensive customization options. Every
            detail can be tailored to reflect your company's identity and values.
          </p>
        </div>

        {/* Branding Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Branding & Customization Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandingOptions.map((option, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="space-y-2">
                    {option.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
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
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Customization Examples</h2>
          <Tabs defaultValue="tech" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tech" className="flex items-center gap-2">
                <Coffee className="w-4 h-4" />
                Tech Items
              </TabsTrigger>
              <TabsTrigger value="apparel" className="flex items-center gap-2">
                <Shirt className="w-4 h-4" />
                Apparel
              </TabsTrigger>
              <TabsTrigger value="office" className="flex items-center gap-2">
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
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                      <CardContent className="p-0">
                        <div className="relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.name}</h3>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Customization Options:</h4>
                            {item.customizations.map((custom, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                {custom}
                              </div>
                            ))}
                          </div>
                          <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
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
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Premium Packaging Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packagingOptions.map((pkg, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.name}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
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
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Customization Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mockup Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Design Mockups & Examples</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={`/placeholder.svg?height=250&width=300&text=Mockup${item}`}
                      alt={`Design Mockup ${item}`}
                      width={300}
                      height={250}
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold">Custom Design {item}</h3>
                      <p className="text-sm text-gray-200">Brand customization example</p>
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
