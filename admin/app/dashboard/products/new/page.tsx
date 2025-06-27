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
  parent_id: string | null
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
    main_category: "",
    sub_category: "",
    moq: "",
    delivery: "",
    featured: false,
    customizable: false,
  })
  
  // Get parent categories (no parent_id)
  const mainCategories = categories.filter(cat => !cat.parent_id)
  // Get subcategories for the selected main category
  const subCategories = categories.filter(cat => cat.parent_id === formData.main_category)

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
    if (name === 'main_category') {
      // Reset sub_category when main_category changes
      setFormData(prev => ({ ...prev, [name]: value, sub_category: '' }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
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
        main_category: formData.main_category || null,
        sub_category: formData.sub_category || null,
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
                <Label htmlFor="main_category">Main Category *</Label>
                <Select 
                  value={formData.main_category} 
                  onValueChange={(value) => handleSelectChange("main_category", value)}
                >
                  <SelectTrigger className="bg-white border-neutral-200">
                    <SelectValue placeholder="Select a main category" />
                  </SelectTrigger>
                  <SelectContent>
                    {mainCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sub_category">Sub Category</Label>
                <Select 
                  value={formData.sub_category}
                  onValueChange={(value) => handleSelectChange("sub_category", value)}
                  disabled={!formData.main_category || subCategories.length === 0}
                >
                  <SelectTrigger className="bg-white border-neutral-200">
                    <SelectValue placeholder="Select a sub category" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
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
                  placeholder="e.g., 50 units" 
                  value={formData.moq}
                  onChange={handleChange}
                  className="bg-white border-neutral-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="delivery">Delivery Time</Label>
                <Input 
                  id="delivery" 
                  name="delivery" 
                  placeholder="e.g., 3-5 business days" 
                  value={formData.delivery}
                  onChange={handleChange}
                  className="bg-white border-neutral-200"
                />
              </div>
              
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Enter product description" 
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-white border-neutral-200 resize-y"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleCheckboxChange("featured", checked === true)}
                />
                <Label htmlFor="featured" className="font-normal">Featured product</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="customizable"
                  checked={formData.customizable}
                  onCheckedChange={(checked) => handleCheckboxChange("customizable", checked === true)}
                />
                <Label htmlFor="customizable" className="font-normal">Customizable product</Label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-neutral-200 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Product Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="relative aspect-square bg-neutral-100 rounded overflow-hidden">
                  <img src={url} alt="preview" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <label className="aspect-square bg-neutral-100 rounded border border-dashed border-neutral-300 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors text-neutral-500">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-xs">Add Image</span>
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => router.push("/dashboard/products")}
            className="bg-white border-neutral-200"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}
