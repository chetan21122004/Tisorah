import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] animate-pulse-subtle">
      {/* Hero Section Skeleton */}
      <section className="relative">
        <div className="w-full h-[60vh] bg-gradient-to-r from-[#1E2A47]/20 via-[#1E2A47]/10 to-[#AD9660]/20"></div>
      </section>

      {/* Quick Category Cards Skeleton */}
      <section className="bg-white">
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-white shadow-md">
                <CardContent className="p-4">
                  <Skeleton className="h-32 w-full mb-3 rounded-lg" />
                  <Skeleton className="h-5 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="container mx-auto px-4 mt-8">
          <div className="bg-[#F8F9FA] p-4 rounded-lg">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1E2A47]/20 w-4 h-4" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>
            <Skeleton className="h-10 w-32 rounded-lg hidden sm:block" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-[#E6E2DD] bg-white">
                <CardContent className="p-0">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-full mb-2" />
                    <div className="flex items-center gap-1 mt-2 mb-3">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-10 ml-1" />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Value Proposition Section Skeleton */}
      <section className="py-6 bg-[#323433]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-8 border-r border-white/10">
                <Skeleton className="h-20 w-20 rounded-2xl mb-6 bg-[#AD9660]/10" />
                <Skeleton className="h-8 w-48 mb-4 bg-white/20" />
                <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                <Skeleton className="h-4 w-3/4 bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section Skeleton */}
      <section className="py-24 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-6 w-36 mx-auto mb-4 rounded-full" />
            <Skeleton className="h-12 w-80 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-0 bg-white overflow-hidden rounded-2xl">
                <CardContent className="p-0">
                  <Skeleton className="w-full h-56" />
                  <div className="p-8">
                    <Skeleton className="h-8 w-48 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-6" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section Skeleton */}
      <section className="py-20 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-white shadow-xl border-0">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Skeleton className="h-14 w-14 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-28 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-5 w-40" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Skeleton className="h-12 w-64 rounded-xl mx-auto" />
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-24 bg-gradient-to-br from-[#323433] via-[#1E2A47] to-[#AB8E76]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-6 w-40 mx-auto mb-8 rounded-full bg-white/10" />
            <Skeleton className="h-14 w-full mx-auto mb-8 bg-white/20" />
            <Skeleton className="h-6 w-full mx-auto mb-12 bg-white/10" />

            {/* Newsletter Signup Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-8">
              <Skeleton className="flex-1 h-14 rounded-2xl bg-white/20" />
              <Skeleton className="h-14 w-32 rounded-2xl bg-[#AD9660]/40" />
            </div>

            <Skeleton className="h-6 w-96 mx-auto mb-12 bg-white/10" />

            {/* Action Buttons Skeleton */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Skeleton className="h-24 rounded-2xl bg-[#AD9660]/40" />
              <Skeleton className="h-24 rounded-2xl bg-white/20" />
            </div>

            {/* Stats Section Skeleton */}
            <div className="mt-16 pt-16 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center">
                    <Skeleton className="h-8 w-20 mx-auto mb-2 bg-[#AD9660]/30" />
                    <Skeleton className="h-5 w-32 mx-auto bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
