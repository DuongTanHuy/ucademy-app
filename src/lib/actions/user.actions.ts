"use server";

import User from "@/database/user.model";
import { connectDB } from "../mongoose";
import { TCreateUserParams } from "@/types";

export const createUser = async (user: TCreateUserParams) => {
  try {
    connectDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
};
