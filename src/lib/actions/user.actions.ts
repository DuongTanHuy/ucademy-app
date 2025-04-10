"use server";

import User, { IUser } from "@/database/user.model";
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

export const getUserInfo = async (
  userId: string | null
): Promise<IUser | null | undefined> => {
  try {
    if (!userId) {
      return null;
    }
    connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return null;
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user info");
  }
};
