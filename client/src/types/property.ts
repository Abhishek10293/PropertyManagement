export interface Property {
  _id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  type: "apartment" | "house" | "condo" | "townhouse"
  status: "available" | "sold" | "rented"
  images: string[]
  amenities: string[]
  createdAt: string
  updatedAt: string
}

export interface PropertyFilters {
  type?: string
  status?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  location?: string
}

export interface CreatePropertyData {
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  type: "apartment" | "house" | "condo" | "townhouse"
  status: "available" | "sold" | "rented"
  images: string[]
  amenities: string[]
}

export interface FavoriteProperty {
  propertyId: string
  addedAt: string
}
