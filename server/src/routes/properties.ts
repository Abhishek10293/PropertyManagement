import express, { type Request, type Response } from "express"
import Property from "../models/Property"

const router = express.Router()

// Get all properties with filtering
router.get("/", async (req: Request, res: Response) => {
  try {
    const { type, status, minPrice, maxPrice, bedrooms, location } = req.query

    const filter: any = {}

    if (type) filter.type = type
    if (status) filter.status = status
    if (bedrooms) filter.bedrooms = Number.parseInt(bedrooms as string)
    if (location) filter.location = { $regex: location, $options: "i" }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number.parseInt(minPrice as string)
      if (maxPrice) filter.price.$lte = Number.parseInt(maxPrice as string)
    }

    const properties = await Property.find(filter).sort({ createdAt: -1 })
    res.json(properties)
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error })
  }
})

// Get single property
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }
    res.json(property)
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error })
  }
})

// Create new property
router.post("/", async (req: Request, res: Response) => {
  try {
    const property = new Property(req.body)
    const savedProperty = await property.save()
    res.status(201).json(savedProperty)
  } catch (error) {
    res.status(400).json({ message: "Error creating property", error })
  }
})

// Update property
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }
    res.json(property)
  } catch (error) {
    res.status(400).json({ message: "Error updating property", error })
  }
})

// Delete property
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id)
    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }
    res.json({ message: "Property deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error })
  }
})

export default router
