"use client"

import { useState, useEffect } from "react"
import type { Property, PropertyFilters } from "../types/property"
import { propertyApi } from "../services/api"
import { FavoritesService } from "../services/favorites"
import { PropertyCard } from "../components/PropertyCard"
import { PropertyFilters as Filters } from "../components/PropertyFilters"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Loader2, AlertCircle, Filter, Home } from "lucide-react"

export function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PropertyFilters>({})
  const [showFilters, setShowFilters] = useState(false)

  const fetchProperties = async (currentFilters: PropertyFilters = {}) => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyApi.getProperties(currentFilters)
      setProperties(data)

      // Sync favorites with existing properties
      const existingIds = data.map((p) => p._id)
      FavoritesService.syncWithExistingProperties(existingIds)
    } catch (err) {
      setError("Failed to fetch properties. Please try again.")
      console.error("Error fetching properties:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleFiltersChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters)
    fetchProperties(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({})
    fetchProperties({})
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <span className="text-lg font-medium">Loading properties...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
          <Button variant="outline" size="sm" onClick={() => fetchProperties(filters)} className="ml-2">
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discover Properties</h1>
            <p className="text-gray-600">
              {properties.length} {properties.length === 1 ? "property" : "properties"} available
            </p>
          </div>
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className={
            showFilters ? "gradient-bg text-white" : "hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
          }
        >
          <Filter className="w-4 h-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {showFilters && (
          <div className="lg:col-span-1">
            <Filters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />
          </div>
        )}

        <div className={`${showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}>
          {properties.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h2>
              <p className="text-gray-600 mb-6">Try adjusting your filters or add a new property to get started.</p>
              <Button onClick={handleClearFilters} className="gradient-bg text-white font-medium">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
