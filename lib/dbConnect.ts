import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    console.log('Please define the MONGODB_URI environment variable inside .env');
    
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
  
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  const db = await mongoose.connect(MONGODB_URI);
  isConnected = db.connections[0].readyState === 1;
  console.log("✅ MongoDB connected:", isConnected);
};
