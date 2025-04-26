"use server";

import { connectDB } from "../mongoose";
import { TCreateCourseParams, TUpdateCourseParams } from "@/types";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import { CourseStatus } from "@/types/enums";

export const getCourses = async (): Promise<ICourse[] | []> => {
  try {
    connectDB();
    const courses = await Course.find();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createCourse = async (course: TCreateCourseParams) => {
  try {
    connectDB();
    const existingCourse = await Course.findOne({ slug: course.slug });
    if (existingCourse) {
      throw new Error("Slug đã tồn tại");
    }
    const newCourse = await Course.create(course);
    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCourse = async (
  courseId: string,
  course: TUpdateCourseParams
) => {
  try {
    connectDB();
    const findCourse = await Course.findById(courseId);
    if (!findCourse) {
      throw new Error("Khóa học không tồn tại");
    }

    const existingCourse = await Course.findOne({
      slug: course.slug,
      _id: { $ne: courseId },
    });
    if (existingCourse) {
      throw new Error("Slug đã tồn tại");
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      course.updateData,
      {
        new: true,
      }
    );
    revalidatePath("/");
    return JSON.parse(JSON.stringify(updatedCourse));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCourseBySlug = async (
  slug: string
): Promise<ICourse | null> => {
  try {
    connectDB();
    const course = await Course.findOne({ slug });
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get course");
  }
};

export const updateCourseStatus = async (
  courseId: string,
  path: string = "/",
  status: string = CourseStatus.REJECTED,
  _destroy: boolean = false
) => {
  try {
    connectDB();
    const findCourse = await Course.findById(courseId);
    if (!findCourse) {
      throw new Error("Khóa học không tồn tại");
    }

    await Course.findByIdAndUpdate(
      courseId,
      {
        status,
        ...(status === CourseStatus.REJECTED
          ? { _destroy: true }
          : {
              _destroy,
            }),
      },
      {
        new: true,
      }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    connectDB();
    await Course.deleteOne({ _id: courseId });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete course");
  }
};
