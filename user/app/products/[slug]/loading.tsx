import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Skeleton className="w-20 h-20 rounded-2xl" />
              <div>
                <Skeleton className="h-12 w-64 mb-2" />
                <Skeleton className="h-6 w-48" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center space-x-2 mb-16">
          <Skeleton className="h-4 w-16" />
          <span>/</span>
          <Skeleton className="h-4 w-24" />
          <span>/</span>
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 mb-24">
          {/* Product Images Skeleton */}
          <div className="space-y-8">
            <div className="relative">
              <Skeleton className="w-full h-[600px] rounded-3xl" />
            </div>
            <div className="grid grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="w-full h-20 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-32" />
              </div>

              <Skeleton className="h-16 w-3/4 mb-8" />

              <div className="flex items-center gap-8 mb-10">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-10 w-40" />
              </div>

              <div className="space-y-4 mb-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <Card className="shadow-xl border-0">
                <CardContent className="p-8">
                  <Skeleton className="h-8 w-48 mb-6" />
                  <div className="grid grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="w-6 h-6 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customization Options Skeleton */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <Skeleton className="h-8 w-64 mb-8" />
                <div className="grid md:grid-cols-2 gap-8">
                  {[...Array(2)].map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-6 w-32 mb-3" />
                      <Skeleton className="h-14 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Info Skeleton */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Skeleton */}
            <div className="grid grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center p-8 bg-white rounded-2xl shadow-lg">
                  <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 