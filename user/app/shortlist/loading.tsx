import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ShortlistLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Breadcrumb Skeleton */}
        <div className="flex items-center space-x-2 mb-8">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shortlisted Products Skeleton */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <Skeleton className="w-full h-48 md:h-full" />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <Skeleton className="h-6 w-48 mb-2" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>

                        <Skeleton className="h-6 w-24 mb-4" />

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <Skeleton className="h-4 w-32" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-9 w-24" />
                          <Skeleton className="h-9 w-32" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Quote Request Form Skeleton */}
          <div>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48 mb-6" />
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-48 mx-auto" />
                </div>

                <div className="mt-8 pt-6">
                  <Skeleton className="h-5 w-24 mb-4" />
                  <Skeleton className="h-10 w-full mb-3" />
                  <Skeleton className="h-4 w-40 mx-auto" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
