import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden">
        <div className="w-full h-[60vh] bg-gradient-to-r from-gray-100 via-gray-50 to-white flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto md:mx-0">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-5/6 mb-6" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-36 rounded-full" />
                <Skeleton className="h-12 w-36 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Icons Skeleton */}
      <section className="py-6 border-b border-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex overflow-x-auto gap-6 justify-start md:justify-center no-scrollbar pb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center flex-shrink-0">
                <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-full" />
                <Skeleton className="h-3 w-16 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section Skeleton */}
      <section className="py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-32 rounded-full hidden sm:block" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-0 shadow-sm overflow-hidden bg-white">
                <CardContent className="p-0">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-5 w-full mb-2" />
                    <div className="flex items-center gap-1 mt-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Skeleton key={j} className="h-3 w-3 rounded-full mr-0.5" />
                        ))}
                      </div>
                      <Skeleton className="h-3 w-10 ml-1" />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Occasion-Wise Gifts Section Skeleton */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <Skeleton className="h-8 w-64 mx-auto mb-8" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-full h-24 md:h-28 rounded-xl" />
                <Skeleton className="h-4 w-24 mt-2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Offerings Section Skeleton */}
      <section className="py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-96 mx-auto mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-6xl">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-0 shadow-sm overflow-hidden bg-white">
                <CardContent className="p-0">
                  <Skeleton className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-32 rounded-full mx-auto" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Showcase Skeleton */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto">
            <div className="md:w-1/2 flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-2xl">
                <Skeleton className="w-full h-52 rounded-2xl" />
                <div className="absolute bottom-4 left-4">
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <Skeleton className="w-full h-96 rounded-2xl" />
                <div className="absolute bottom-4 left-4">
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col gap-8">
              <div>
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <Skeleton className="w-full h-[450px] rounded-2xl" />
                <div className="absolute bottom-4 left-4">
                  <Skeleton className="h-8 w-48 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections Skeleton */}
      <section className="py-12">
        <div className="container px-4 md:px-6 mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-16 max-w-5xl mx-auto">
              <div className={`w-full md:w-1/2 ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                <Skeleton className="w-full h-[300px] rounded-xl" />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <Skeleton className="h-8 w-3/4 mb-4 mx-auto md:mx-0" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Skeleton */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-full max-w-md mx-auto mb-8" />
            
            <Card className="border-0 shadow-sm overflow-hidden bg-white">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full rounded-md" />
                  <Skeleton className="h-12 w-full rounded-md" />
                  <Skeleton className="h-12 w-full rounded-md" />
                  <Skeleton className="h-32 w-full rounded-md" />
                  <Skeleton className="h-12 w-32 rounded-full mx-auto" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <Skeleton className="h-8 w-64 mx-auto mb-8" />
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-0 shadow-sm overflow-hidden bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-4 rounded-full mr-1" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

