import mongoose from "mongoose";
import { ENV } from "./env.js";
import dns from "dns";

dns.setServers(['8.8.8.8', '8.8.4.4']);



export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log(`✅ Connected to MONGODB: ${conn.connection.host}`);
  } catch (error) {
    console.error("💥 MONGODB connection error",error);
    process.exit(1); // exit code 1 means failure, 0 means success
  }
};


