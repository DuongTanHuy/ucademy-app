"use server";
import { TCreateLecture, TUpdateLecture } from "@/types";
import { connectDB } from "../mongoose";
import Course from "@/database/course.model";
import Lecture, { ILecture } from "@/database/lecture.model";
import { revalidatePath } from "next/cache";

export const createLecture = async (params: TCreateLecture) => {
  try {
    connectDB();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) {
      throw new Error("Course not found");
    }

    const newLecture = await Lecture.create(params);

    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || "");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateLecture = async (params: TUpdateLecture) => {
  try {
    connectDB();
    await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, {
      new: true,
    });

    revalidatePath(params.path || "");

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteLecture = async (params: {
  id: string;
  path?: string;
  course: string;
}) => {
  try {
    connectDB();
    const findLecture = await Lecture.findById(params.id);
    if (!findLecture) {
      throw new Error("Lecture not found");
    }

    findLecture._destroy = true;
    findLecture.save();
    // const findCourse = await Course.findById(params.course);
    // findCourse.lectures = findCourse.lectures.filter(
    //   (item: any) => item.toString() !== params.id
    // );
    // findCourse.save();
    revalidatePath(params.path || "");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
