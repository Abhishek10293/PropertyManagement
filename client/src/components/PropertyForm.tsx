"use client"

import type React from "react"

import { useState } from "react"
import type { CreatePropertyData } from "../types/property"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { X, Plus } from "lucide-react"

interface PropertyFormProps {
  onSubmit: (data: CreatePropertyData) => void
  onCancel: () => void
  initialData?: Partial<CreatePropertyData>
  isLoading?: boolean
}

export function PropertyForm({ onSubmit, onCancel, initialData, isLoading }: PropertyFormProps) {
  const [formData, setFormData] = useState<CreatePropertyData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    location: initialData?.location || "",
    bedrooms: initialData?.bedrooms || 1,
    bathrooms: initialData?.bathrooms || 1,
    area: initialData?.area || 0,
    type: initialData?.type || "apartment",
    status: initialData?.status || "available",
    images: initialData?.images || [],
    amenities: initialData?.amenities || [],
  })

  const [newImage, setNewImage] = useState("")
  const [newAmenity, setNewAmenity] = useState("")

  const handleInputChange = (field: keyof CreatePropertyData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addImage = () => {
    if (newImage.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage.trim()],
      }))
      setNewImage("")
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }))
      setNewAmenity("")
    }
  }

  const removeAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Property" : "Add New Property"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", Number.parseInt(e.target.value) || 0)}
                required
              />
            </div>
            <div>
              <Label htmlFor="area">Area (sq ft)</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => handleInputChange("area", Number.parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                min="0"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange("bedrooms", Number.parseInt(e.target.value) || 0)}
                required
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                min="0"
                step="0.5"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", Number.parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Images</Label>
            <div className="flex gap-2 mb-2">
              <Input placeholder="Image URL" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
              <Button type="button" onClick={addImage} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                  <span className="flex-1 text-sm truncate">{image}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeImage(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Amenities</Label>
            <div className="flex gap-2 mb-2">
              <Input placeholder="Add amenity" value={newAmenity} onChange={(e) => setNewAmenity(e.target.value)} />
              <Button type="button" onClick={addAmenity} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                  <span>{amenity}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAmenity(index)}
                    className="h-auto p-0 w-4 h-4"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : initialData ? "Update Property" : "Add Property"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
