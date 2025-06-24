"use server";

import User, { IUser } from "@/database/user.model";
import { connectDB } from "../mongoose";
import { TCreateUserParams } from "@/types";

export const createUser = async (user: TCreateUserParams) => {
  try {
    // const cookieStore = await cookies();
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

export const getUserCourses = async (userId: string | null) => {
  try {
    if (!userId) {
      return [];
    }
    connectDB();
    const userCourse = await User.findOne({ clerkId: userId }).populate(
      "courses"
    );

    return JSON.parse(JSON.stringify(userCourse?.courses)) || [];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user courses");
  }
};
