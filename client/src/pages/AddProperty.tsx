"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { CreatePropertyData } from "../types/property"
import { propertyApi } from "../services/api"
import { PropertyForm } from "../components/PropertyForm"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription } from "../components/ui/alert"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export function AddProperty() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (data: CreatePropertyData) => {
    try {
      setLoading(true)
      setError(null)
      const newProperty = await propertyApi.createProperty(data)
      setSuccess(true)
      setTimeout(() => {
        navigate(`/properties/${newProperty._id}`)
      }, 2000)
    } catch (err) {
      setError("Failed to create property. Please try again.")
      console.error("Error creating property:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate("/")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Property created successfully! Redirecting to property details...</AlertDescription>
        </Alert>
      )}

      <PropertyForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={loading} />
    </div>
  )
}
