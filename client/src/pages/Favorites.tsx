"use client"

import { useState, useEffect } from "react"
import type { Property } from "../types/property"
import { propertyApi } from "../services/api"
import { FavoritesService } from "../services/favorites"
import { PropertyCard } from "../components/PropertyCard"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Loader2, Heart, Home, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"

export function Favorites() {
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFavoriteProperties()
  }, [])

  const fetchFavoriteProperties = async () => {
    try {
      setLoading(true)
      setError(null)

      const favoriteIds = FavoritesService.getFavorites()

      if (favoriteIds.length === 0) {
        setFavoriteProperties([])
        setLoading(false)
        return
      }

      // Fetch all properties and filter favorites
      const allProperties = await propertyApi.getProperties()
      const validFavorites = allProperties.filter((property) => favoriteIds.includes(property._id))

      // Sync favorites with existing properties (remove deleted ones)
      const validIds = validFavorites.map((p) => p._id)
      FavoritesService.syncWithExistingProperties(validIds)

      setFavoriteProperties(validFavorites)
    } catch (err) {
      setError("Failed to fetch favorite properties. Please try again.")
      console.error("Error fetching favorites:", err)
    } finally {
      setLoading(false)
    }
  }

  const clearAllFavorites = () => {
    if (window.confirm("Are you sure you want to remove all properties from favorites?")) {
      FavoritesService.clearFavorites()
      setFavoriteProperties([])
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <span className="text-lg font-medium">Loading your favorites...</span>
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
          <Button variant="outline" size="sm" onClick={fetchFavoriteProperties} className="ml-2 bg-transparent">
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
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
            <p className="text-gray-600">
              {favoriteProperties.length} {favoriteProperties.length === 1 ? "property" : "properties"} saved
            </p>
          </div>
        </div>

        {favoriteProperties.length > 0 && (
          <Button
            variant="outline"
            onClick={clearAllFavorites}
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 bg-transparent"
          >
            Clear All Favorites
          </Button>
        )}
      </div>

      {favoriteProperties.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start exploring properties and click the heart icon to save your favorites here.
          </p>
          <Link to="/">
            <Button className="gradient-bg text-white font-medium">
              <Home className="w-4 h-4 mr-2" />
              Browse Properties
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
