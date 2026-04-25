// MongoDB database connection and initialization
import mongoose from "mongoose";
import { config } from "./config/env.js";
import { logger } from "./utils/logger.js";

// Establishes connection to MongoDB using Mongoose
// Exits process if connection fails
export async function connectDb(): Promise<void> {
  try {
    await mongoose.connect(config.mongodb.uri);
    logger.info("DB connected");
  } catch (err) {
    logger.error("DB connection error:", err);
    process.exit(1); 
  }
}
