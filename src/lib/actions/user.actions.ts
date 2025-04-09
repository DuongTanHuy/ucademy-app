"use server";

import User, { IUser } from "@/database/user.model";
import { connectDB } from "../mongoose";

export const createUser = async (user: IUser) => {
  try {
    connectDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
};
