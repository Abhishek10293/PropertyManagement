import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/database"
import propertyRoutes from "./routes/properties"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Routes
app.use("/api/properties", propertyRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Property Management API is running!" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
