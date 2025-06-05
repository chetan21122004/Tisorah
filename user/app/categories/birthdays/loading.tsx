import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Hero Section Skeleton */}
      <div className="relative bg-[#1E2A47] text-white">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <Skeleton className="h-16 w-3/4 mb-4 bg-white/20" />
            <Skeleton className="h-24 w-full mb-8 bg-white/20" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-32 bg-white/20" />
              <Skeleton className="h-10 w-40 bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Benefits Section Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-10 w-64 mx-auto mb-2 bg-gray-200" />
          <div className="w-24 h-1 bg-[#AD9660] mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none rounded-none shadow-md bg-white">
                <CardContent className="p-8 text-center">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6 bg-gray-200" />
                  <Skeleton className="h-6 w-40 mx-auto mb-3 bg-gray-200" />
                  <Skeleton className="h-16 w-full bg-gray-200" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <Skeleton className="h-10 w-48 mb-4 lg:mb-0 bg-gray-200" />
            
            <div className="flex gap-4 items-center">
              <Skeleton className="h-10 w-[200px] bg-gray-200" />
              <Skeleton className="h-10 w-24 lg:hidden bg-gray-200" />
              <div className="hidden lg:flex items-center gap-4">
                <Skeleton className="h-10 w-[150px] bg-gray-200" />
                <Skeleton className="h-10 w-[150px] bg-gray-200" />
                <Skeleton className="h-10 w-20 bg-gray-200" />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <Skeleton className="h-6 w-64 bg-gray-200" />
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-none rounded-none shadow-md">
              <CardContent className="p-0">
                <Skeleton className="w-full h-64 bg-gray-200" />
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-4 rounded-full bg-gray-200" />
                    ))}
                    <Skeleton className="h-4 w-10 ml-1 bg-gray-200" />
                  </div>
                  <Skeleton className="h-7 w-full mb-2 bg-gray-200" />
                  <Skeleton className="h-16 w-full mb-4 bg-gray-200" />
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24 bg-gray-200" />
                      <Skeleton className="h-4 w-16 bg-gray-200" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24 bg-gray-200" />
                      <Skeleton className="h-4 w-16 bg-gray-200" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24 bg-gray-200" />
                      <Skeleton className="h-4 w-16 bg-gray-200" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Skeleton className="h-10 flex-1 bg-gray-200" />
                    <Skeleton className="h-10 flex-1 bg-gray-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Skeleton */}
        <div className="mt-16 bg-[#1E2A47] text-white p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-20 w-full mx-auto mb-8 bg-white/20" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-10 w-48 mx-auto sm:mx-0 bg-white/20" />
              <Skeleton className="h-10 w-48 mx-auto sm:mx-0 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
