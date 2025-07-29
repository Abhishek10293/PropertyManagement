"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import type { Property } from "../types/property"
import { propertyApi } from "../services/api"
import { FavoritesService } from "../services/favorites"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Alert, AlertDescription } from "../components/ui/alert"
import { formatPrice, formatArea } from "../lib/utils"
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Loader2,
  AlertCircle,
  Trash2,
  Heart,
  Phone,
  Eye,
} from "lucide-react"

export function PropertyDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (id) {
      fetchProperty(id)
      setIsFavorite(FavoritesService.isFavorite(id))
    }
  }, [id])

  const fetchProperty = async (propertyId: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyApi.getProperty(propertyId)
      setProperty(data)
    } catch (err) {
      setError("Failed to fetch property details. Please try again.")
      console.error("Error fetching property:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!property || !window.confirm("Are you sure you want to delete this property?")) {
      return
    }

    try {
      setDeleting(true)
      await propertyApi.deleteProperty(property._id)
      // Remove from favorites when deleted
      FavoritesService.removeFromFavorites(property._id)
      navigate("/")
    } catch (err) {
      setError("Failed to delete property. Please try again.")
      console.error("Error deleting property:", err)
    } finally {
      setDeleting(false)
    }
  }

  const toggleFavorite = () => {
    if (!property) return

    if (isFavorite) {
      FavoritesService.removeFromFavorites(property._id)
    } else {
      FavoritesService.addToFavorites(property._id)
    }
    setIsFavorite(!isFavorite)
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "available":
        return "status-available"
      case "sold":
        return "status-sold"
      case "rented":
        return "status-rented"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <span className="text-lg font-medium">Loading property details...</span>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate("/")} className="hover:bg-purple-50">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || "Property not found"}
            {id && (
              <Button variant="outline" size="sm" onClick={() => fetchProperty(id)} className="ml-2">
                Retry
              </Button>
            )}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/")} className="hover:bg-purple-50">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Button>
        <div className="flex gap-2">
          <Button
            variant={isFavorite ? "default" : "outline"}
            size="sm"
            onClick={toggleFavorite}
            className={
              isFavorite
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            }
          >
            <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
            {deleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={property.images[0] || "/placeholder.svg?height=400&width=600&query=luxury property interior"}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-6 right-6">
                  <Badge
                    className={`${getStatusStyle(property.status)} font-medium text-sm px-3 py-1`}
                    variant="secondary"
                  >
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                </div>
              </div>
              {property.images.length > 1 && (
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-3">
                    {property.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="relative group cursor-pointer">
                        <img
                          src={image || "/placeholder.svg?height=100&width=100&query=property"}
                          alt={`${property.title} ${index + 2}`}
                          className="w-full h-24 object-cover rounded-lg transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
            </CardContent>
          </Card>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="font-medium text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {/* Property Info */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex flex-col space-y-2">
                <span className="text-2xl text-gray-900">{property.title}</span>
                <span className="text-3xl font-bold gradient-bg bg-clip-text text-transparent">
                  {formatPrice(property.price)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span className="text-lg">{property.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <Bed className="w-6 h-6 mr-3 text-purple-600" />
                  <div>
                    <div className="font-bold text-lg text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Bath className="w-6 h-6 mr-3 text-blue-600" />
                  <div>
                    <div className="font-bold text-lg text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <Square className="w-6 h-6 mr-3 text-green-600" />
                  <div>
                    <div className="font-bold text-lg text-gray-900">{formatArea(property.area)}</div>
                    <div className="text-sm text-gray-600">Area</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <Calendar className="w-6 h-6 mr-3 text-orange-600" />
                  <div>
                    <div className="font-bold text-lg text-gray-900 capitalize">{property.type}</div>
                    <div className="text-sm text-gray-600">Type</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Interested in this property?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                <Phone className="w-4 h-4 mr-2" />
                Contact Agent
              </Button>
              <Button
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-purple-600 font-semibold bg-transparent"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Viewing
              </Button>
              <div className="text-center pt-2">
                <p className="text-purple-100 text-sm">Available 24/7 for inquiries</p>
                <p className="text-white font-semibold">(555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
