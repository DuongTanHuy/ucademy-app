"use server";

import History from "@/database/history.model";
import { connectDB } from "@/lib/mongoose";
import { TCreateHistoryParams } from "@/types";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export const createHistory = async ({
  history,
  path = "/",
}: {
  history: TCreateHistoryParams;
  path: string;
}) => {
  try {
    connectDB();
    const courseId = new mongoose.Types.ObjectId(history.course);
    const lessonId = new mongoose.Types.ObjectId(history.lesson);

    if (!history.user || !courseId || !lessonId) {
      throw new Error("Invalid history data provided");
    }

    const isExisting = await History.findOne({
      user: history.user,
      course: courseId,
      lesson: lessonId,
    });

    if (isExisting) {
      return JSON.parse(
        JSON.stringify({
          message: "History already exists",
        })
      );
    }

    const newHistory = await History.create({
      user: history.user,
      course: courseId,
      lesson: lessonId,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newHistory));
  } catch (error) {
    console.log(error);
  }
};

export const getHistoryByUserAndCourse = async ({
  user,
  course,
}: {
  user: string;
  course: string;
}) => {
  try {
    connectDB();
    const histories = await History.find({
      user,
      course: new mongoose.Types.ObjectId(course),
    });

    return JSON.parse(JSON.stringify(histories));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteHistory = async ({
  historyId,
  path = "/",
}: {
  historyId: string;
  path: string;
}) => {
  try {
    connectDB();
    const deletedHistory = await History.findByIdAndDelete(historyId);
    revalidatePath(path);

    if (!deletedHistory) {
      throw new Error("History not found");
    }
    return JSON.parse(JSON.stringify(deletedHistory));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
