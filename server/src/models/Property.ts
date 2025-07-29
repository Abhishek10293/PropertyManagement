import mongoose, { type Document, Schema } from "mongoose"

export interface IProperty extends Document {
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
  createdAt: Date
  updatedAt: Date
}

const PropertySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    area: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["apartment", "house", "condo", "townhouse"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "rented"],
      default: "available",
    },
    images: [
      {
        type: String,
      },
    ],
    amenities: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IProperty>("Property", PropertySchema)
