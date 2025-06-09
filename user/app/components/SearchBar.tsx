"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1E2A47]/40 w-4 h-4" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="pl-10 pr-4 py-2 border-[#E6E2DD] bg-white rounded-lg text-[#1E2A47] placeholder:text-[#1E2A47]/40 focus-visible:ring-[#AD9660]"
        />
        <Button 
          type="submit" 
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#AD9660] hover:bg-[#AD9660]/90 text-white h-7 px-3 rounded-md"
        >
          Search
        </Button>
      </div>
    </form>
  )
} 