"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload } from "lucide-react"
import { getCategories, createProduct } from "@/lib/supabase"
import { uploadMultipleImages } from "@/lib/storage"
import Link from "next/link"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
  slug: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    moq: "",
    delivery: "",
    featured: false,
    customizable: false,
  })

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories()
        setCategories(data as Category[])
      } catch (error) {
        console.error("Error loading categories:", error)
      }
    }
    
    loadCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setImageFiles(prev => [...prev, ...newFiles])
      
      // Create preview URLs
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file))
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls])
    }
  }

  const removeImage = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index])
    
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Upload images first
      let imageUrls: string[] = []
      if (imageFiles.length > 0) {
        imageUrls = await uploadMultipleImages(imageFiles)
      }
      
      // Create product with image URLs
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        moq: formData.moq || null,
        delivery: formData.delivery || null,
        featured: formData.featured,
        customizable: formData.customizable,
        images: imageUrls.length > 0 ? imageUrls : null
      }
      
      const result = await createProduct(productData)
      
      if (result) {
        toast.success("Product created successfully")
        router.push("/dashboard/products")
      } else {
        toast.error("Failed to create product")
      }
    } catch (error) {
      console.error("Error creating product:", error)
      toast.error("An error occurred while creating the product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 relative">
      <div className="pattern-dots pattern-opacity-10 pattern-secondary absolute inset-0 pointer-events-none" />
      
      <div className="flex items-center">
        <Link href="/dashboard/products" className="mr-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-primary">Add New Product</h1>
          <p className="text-muted-foreground mt-1">Create a new product in your catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="border-neutral-200 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Enter product name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white border-neutral-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  placeholder="0.00" 
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="bg-white border-neutral-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                  required
                >
                  <SelectTrigger className="bg-white border-neutral-200">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="moq">Minimum Order Quantity</Label>
                <Input 
                  id="moq" 
                  name="moq" 
                  placeholder="e.g. 10 units" 
                  value={formData.moq}
                  onChange={handleChange}
                  className="bg-white border-neutral-200"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="delivery">Delivery Information</Label>
                <Input 
                  id="delivery" 
                  name="delivery" 
                  placeholder="e.g. 7-10 business days" 
                  value={formData.delivery}
                  onChange={handleChange}
                  className="bg-white border-neutral-200"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Enter product description" 
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-32 bg-white border-neutral-200"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleCheckboxChange("featured", !!checked)}
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="customizable" 
                  checked={formData.customizable}
                  onCheckedChange={(checked) => handleCheckboxChange("customizable", !!checked)}
                />
                <Label htmlFor="customizable">Customizable</Label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-neutral-200 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Product Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <Label htmlFor="images">Upload Images</Label>
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="images" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-neutral-300 bg-neutral-50 hover:bg-neutral-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-neutral-500" />
                      <p className="mb-2 text-sm text-neutral-500">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-neutral-500">PNG, JPG or WEBP (Max. 5MB each)</p>
                    </div>
                    <Input 
                      id="images" 
                      type="file" 
                      accept="image/png, image/jpeg, image/webp" 
                      multiple 
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              
              {imagePreviewUrls.length > 0 && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-neutral-200">
                        <img 
                          src={url} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-white/80 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                          </svg>
                          <span className="sr-only">Remove</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/products">
            <Button variant="outline" className="bg-white border-neutral-200">
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            className="bg-secondary hover:bg-secondary/90 text-white"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}
