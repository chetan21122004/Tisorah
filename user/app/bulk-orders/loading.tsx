import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="w-16 h-16 rounded-2xl" />
            <div>
              <Skeleton className="h-12 w-80 mb-2" />
              <Skeleton className="h-6 w-60" />
            </div>
          </div>
          <Skeleton className="h-6 w-full max-w-3xl" />
        </div>

        {/* Benefits Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-4" />
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Tiers Skeleton */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Skeleton className="h-8 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-60 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-24 mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-24 mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Form and Process Skeleton */}
        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <Skeleton className="h-8 w-60 mb-2" />
              <Skeleton className="h-4 w-full mb-6" />
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="grid md:grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
          <div>
            <Skeleton className="h-8 w-60 mb-4" />
            <Skeleton className="h-4 w-full mb-8" />
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-40 mb-1" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
