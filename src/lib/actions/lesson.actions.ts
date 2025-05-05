"use server";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import { TCreateLesson, TUpdateLesson } from "@/types";
import Course from "@/database/course.model";
import Lesson from "@/database/lesson.model";
import Lecture from "@/database/lecture.model";

export const createLesson = async (params: TCreateLesson) => {
  try {
    connectDB();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) {
      throw new Error("Course not found");
    }

    const findLecture = await Lecture.findById(params.lecture);
    if (!findLecture) {
      throw new Error("Lecture not found");
    }

    const newLesson = await Lesson.create(params);

    findLecture.lessons.push(newLesson._id);
    findLecture.save();
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateLesson = async (params: TUpdateLesson) => {
  try {
    connectDB();
    const existingLesson = await Lesson.findOne({
      lecture: params.lectureId,
      slug: params.updateData.slug,
    });
    await Lesson.findByIdAndUpdate(
      params.lessonId,
      existingLesson
        ? {
            ...params.updateData,
            slug: `${params.updateData.slug}-${new Date()
              .getTime()
              .toString()
              .slice(-3)}`,
          }
        : params.updateData,
      {
        new: true,
      }
    );

    revalidatePath(params.path || "");

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteLesson = async (params: { id: string; path?: string }) => {
  try {
    connectDB();
    const findLesson = await Lesson.findById(params.id);
    if (!findLesson) {
      throw new Error("Lesson not found");
    }

    findLesson._destroy = true;
    findLesson.save();

    revalidatePath(params.path || "");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
