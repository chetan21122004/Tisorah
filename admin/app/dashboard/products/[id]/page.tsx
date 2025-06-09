"use client"

import { use, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { getProductById, updateProduct, deleteProduct, getCategories } from "@/lib/supabase"
import { uploadMultipleImages, deleteImage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [deleting, setDeleting] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const prod = await getProductById(id)
      const cats = await getCategories()
      setProduct(prod)
      setCategories(cats)
      setFormData(prod)
      setLoading(false)
    }
    loadData()
  }, [id])

  const sanitizeImages = (images: any) => {
    if (!Array.isArray(images)) return null
    const arr = images.filter((img: any) => typeof img === "string" && img.length > 0)
    return arr.length > 0 ? arr : null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean | "indeterminate") => {
    setFormData((prev: any) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUpdating(true)
    setErrorMsg(null)
    try {
      const sanitizedImages = sanitizeImages(formData.images)
      const updated = await updateProduct(id, {
        ...formData,
        images: sanitizedImages,
        price: parseFloat(formData.price),
      })
      if (updated) {
        setProduct(updated)
        setEditMode(false)
        toast.success("Product updated successfully")
      } else {
        setErrorMsg("Failed to update product. Please check your data.")
        toast.error("Failed to update product")
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Error updating product")
      toast.error(err?.message || "Error updating product")
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return
    setDeleting(true)
    try {
      const ok = await deleteProduct(id)
      if (ok) {
        toast.success("Product deleted")
        router.push("/dashboard/products")
      } else {
        toast.error("Failed to delete product")
      }
    } catch (err) {
      toast.error("Error deleting product")
    } finally {
      setDeleting(false)
    }
  }

  // --- Image Management ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setImageUploading(true)
    setErrorMsg(null)
    try {
      const newUrls = await uploadMultipleImages(Array.from(e.target.files))
      const updatedImages = sanitizeImages([...(formData.images || []), ...newUrls])
      setFormData((prev: any) => ({ ...prev, images: updatedImages }))
      // Save to DB
      const updated = await updateProduct(id, { ...formData, images: updatedImages })
      setProduct(updated)
      setFormData(updated)
      toast.success("Images uploaded!")
    } catch (err: any) {
      setErrorMsg(err?.message || "Error uploading images")
      toast.error(err?.message || "Error uploading images")
    } finally {
      setImageUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleImageDelete = async (imgUrl: string) => {
    if (!confirm("Delete this image?")) return
    setImageUploading(true)
    setErrorMsg(null)
    try {
      await deleteImage(imgUrl)
      const updatedImages = sanitizeImages((formData.images || []).filter((url: string) => url !== imgUrl))
      setFormData((prev: any) => ({ ...prev, images: updatedImages }))
      // Save to DB
      const updated = await updateProduct(id, { ...formData, images: updatedImages })
      setProduct(updated)
      setFormData(updated)
      toast.success("Image deleted!")
    } catch (err: any) {
      setErrorMsg(err?.message || "Error deleting image")
      toast.error(err?.message || "Error deleting image")
    } finally {
      setImageUploading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>
  }

  return (
    <div className="space-y-8 relative">
      <div className="pattern-dots pattern-opacity-10 pattern-secondary absolute inset-0 pointer-events-none" />
      <div className="flex items-center mb-4">
        <Link href="/dashboard/products" className="mr-4">
          <Button className="rounded-full" variant="ghost" size="icon">
            ←
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-serif font-bold tracking-tight text-primary">Product Details</h1>
      </div>
      {errorMsg && <div className="text-red-600 text-sm mb-2">{errorMsg}</div>}
      <Card className="border-neutral-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-serif">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Images Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium">Images</h2>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  multiple
                  className="hidden"
                  id="product-images-upload"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                />
                <Button
                  type="button"
                  className="bg-secondary hover:bg-secondary/90 text-white"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageUploading}
                >
                  {imageUploading ? "Uploading..." : "Upload Images"}
                </Button>
              </div>
            </div>
            {formData.images && formData.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.images.map((img: string, idx: number) => (
                  <div key={img} className="relative group border rounded-lg overflow-hidden">
                    <img src={img} alt={`Product image ${idx + 1}`} className="w-full h-40 object-cover" />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(img)}
                      className="absolute top-2 right-2 bg-white/80 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={imageUploading}
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
            ) : (
              <div className="text-muted-foreground">No images uploaded.</div>
            )}
          </div>
          {editMode ? (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-white border-neutral-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required className="bg-white border-neutral-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(v: string) => handleSelectChange("category", v)} required>
                    <SelectTrigger className="bg-white border-neutral-200">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moq">Minimum Order Quantity</Label>
                  <Input id="moq" name="moq" value={formData.moq || ""} onChange={handleChange} className="bg-white border-neutral-200" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="delivery">Delivery Information</Label>
                  <Input id="delivery" name="delivery" value={formData.delivery || ""} onChange={handleChange} className="bg-white border-neutral-200" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={formData.description || ""} onChange={handleChange} className="min-h-32 bg-white border-neutral-200" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" checked={!!formData.featured} onCheckedChange={(checked: boolean | "indeterminate") => handleCheckboxChange("featured", !!checked)} />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="customizable" checked={!!formData.customizable} onCheckedChange={(checked: boolean | "indeterminate") => handleCheckboxChange("customizable", !!checked)} />
                  <Label htmlFor="customizable">Customizable</Label>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setEditMode(false)} className="bg-white border-neutral-200">Cancel</Button>
                <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-white" disabled={updating}>{updating ? "Saving..." : "Save Changes"}</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{product.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">₹{product.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{categories.find(c => c.slug === product.category)?.name || product.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">MOQ</p>
                  <p className="font-medium">{product.moq || "-"}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Delivery</p>
                  <p className="font-medium">{product.delivery || "-"}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-medium whitespace-pre-line">{product.description || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Featured</p>
                  <p className="font-medium">{product.featured ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customizable</p>
                  <p className="font-medium">{product.customizable ? "Yes" : "No"}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button onClick={() => setEditMode(true)} className="bg-secondary hover:bg-secondary/90 text-white">Edit</Button>
                <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white" disabled={deleting}>{deleting ? "Deleting..." : "Delete"}</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 