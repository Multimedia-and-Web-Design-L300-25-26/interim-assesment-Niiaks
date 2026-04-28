import mongoose from "mongoose";


export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongodb connected successfully")
  } catch (error) {
    console.error("error connecting to db", error)
    process.exit(1)
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect()
    console.log("mongodb disconnected successfully")
  } catch (error) {
    console.error("error disconnecting db", error)
    process.exit(1)
  }
}