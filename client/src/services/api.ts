import axios from "axios"
import type { Property, PropertyFilters, CreatePropertyData } from "../types/property"

const API_BASE_URL = "http://localhost:8080/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const propertyApi = {
  // Get all properties with optional filters
  getProperties: async (filters?: PropertyFilters): Promise<Property[]> => {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value.toString())
        }
      })
    }
    const response = await api.get(`/properties?${params.toString()}`)
    return response.data
  },

  // Get single property by ID
  getProperty: async (id: string): Promise<Property> => {
    const response = await api.get(`/properties/${id}`)
    return response.data
  },

  // Create new property
  createProperty: async (propertyData: CreatePropertyData): Promise<Property> => {
    const response = await api.post("/properties", propertyData)
    return response.data
  },

  // Update property
  updateProperty: async (id: string, propertyData: Partial<CreatePropertyData>): Promise<Property> => {
    const response = await api.put(`/properties/${id}`, propertyData)
    return response.data
  },

  // Delete property
  deleteProperty: async (id: string): Promise<void> => {
    await api.delete(`/properties/${id}`)
  },
}
