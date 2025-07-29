import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://root:root@project2.3mgv39n.mongodb.net/?retryWrites=true&w=majority&appName=project2"
    await mongoose.connect(mongoURI)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}
