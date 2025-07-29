"use client"

import { useState } from "react"
import type { PropertyFilters as Filters } from "../types/property"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Search, X, Filter } from "lucide-react"

interface PropertyFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onClearFilters: () => void
}

export function PropertyFilters({ filters, onFiltersChange, onClearFilters }: PropertyFiltersProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters)

  const handleFilterChange = (key: keyof Filters, value: string | number | undefined) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
  }

  const applyFilters = () => {
    onFiltersChange(localFilters)
  }

  const clearFilters = () => {
    setLocalFilters({})
    onClearFilters()
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <span className="text-xl">Filters</span>
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="hover:bg-red-50 hover:text-red-600">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
            Location
          </Label>
          <Input
            id="location"
            placeholder="Enter location..."
            value={localFilters.location || ""}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="mt-1 border-gray-200 focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <Label htmlFor="type" className="text-sm font-semibold text-gray-700">
            Property Type
          </Label>
          <Select
            value={localFilters.type || "all"}
            onValueChange={(value) => handleFilterChange("type", value === "all" ? undefined : value)}
          >
            <SelectTrigger className="mt-1 border-gray-200 focus:border-primary focus:ring-primary">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartment">🏢 Apartment</SelectItem>
              <SelectItem value="house">🏠 House</SelectItem>
              <SelectItem value="condo">🏙️ Condo</SelectItem>
              <SelectItem value="townhouse">🏘️ Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status" className="text-sm font-semibold text-gray-700">
            Status
          </Label>
          <Select
            value={localFilters.status || "all"}
            onValueChange={(value) => handleFilterChange("status", value === "all" ? undefined : value)}
          >
            <SelectTrigger className="mt-1 border-gray-200 focus:border-primary focus:ring-primary">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">✅ Available</SelectItem>
              <SelectItem value="sold">❌ Sold</SelectItem>
              <SelectItem value="rented">🔒 Rented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="bedrooms" className="text-sm font-semibold text-gray-700">
            Bedrooms
          </Label>
          <Select
            value={localFilters.bedrooms?.toString() || "any"}
            onValueChange={(value) =>
              handleFilterChange("bedrooms", value === "any" ? undefined : Number.parseInt(value))
            }
          >
            <SelectTrigger className="mt-1 border-gray-200 focus:border-primary focus:ring-primary">
              <SelectValue placeholder="Select bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+ Bedroom</SelectItem>
              <SelectItem value="2">2+ Bedrooms</SelectItem>
              <SelectItem value="3">3+ Bedrooms</SelectItem>
              <SelectItem value="4">4+ Bedrooms</SelectItem>
              <SelectItem value="5">5+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">Price Range</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="minPrice" className="text-xs text-gray-500">
                Min Price
              </Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="Min"
                value={localFilters.minPrice || ""}
                onChange={(e) =>
                  handleFilterChange("minPrice", e.target.value ? Number.parseInt(e.target.value) : undefined)
                }
                className="mt-1 border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="maxPrice" className="text-xs text-gray-500">
                Max Price
              </Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Max"
                value={localFilters.maxPrice || ""}
                onChange={(e) =>
                  handleFilterChange("maxPrice", e.target.value ? Number.parseInt(e.target.value) : undefined)
                }
                className="mt-1 border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={applyFilters}
          className="w-full gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Search className="w-4 h-4 mr-2" />
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
