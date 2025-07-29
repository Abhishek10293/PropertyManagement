"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import type { Property } from "../types/property"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { formatPrice, formatArea } from "../lib/utils"
import { FavoritesService } from "../services/favorites"
import { MapPin, Bed, Bath, Square, Eye, Heart } from "lucide-react"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(FavoritesService.isFavorite(property._id))

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

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

  return (
    <Card className="overflow-hidden card-hover bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="relative">
        <img
          src={property.images[0] || "/placeholder.svg?height=200&width=300&query=modern property"}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge className={`${getStatusStyle(property.status)} font-medium`} variant="secondary">
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFavorite}
            className={`rounded-full p-2 backdrop-blur-sm ${
              isFavorite
                ? "bg-red-500/90 text-white hover:bg-red-600/90"
                : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-lg font-bold text-primary">{formatPrice(property.price)}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-1">{property.title}</h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{property.description}</p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-600">
              <Bed className="w-4 h-4 mr-1 text-primary" />
              <span className="font-medium">{property.bedrooms}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bath className="w-4 h-4 mr-1 text-primary" />
              <span className="font-medium">{property.bathrooms}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Square className="w-4 h-4 mr-1 text-primary" />
              <span className="font-medium">{formatArea(property.area)}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Link to={`/properties/${property._id}`} className="w-full">
          <Button className="w-full gradient-bg text-white font-medium hover:opacity-90 transition-opacity">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
