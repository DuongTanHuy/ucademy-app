"use server";
import mongoose from "mongoose";

// singleton pattern

const MONGODB_URL = process.env.MONGODB_URL;
let isConnected: boolean = false;

export const connectDB = async () => {
  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined");
  }

  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: "ucademy",
    });

    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Failed to connect to MongoDB");
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};
