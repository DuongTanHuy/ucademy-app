"use client";
import { CourseItem } from "@/components/course";
import { ICourse } from "@/database/course.model";
import React from "react";

const CourseList = ({
  course,
  buttonTitle,
}: {
  course: ICourse;
  buttonTitle: string;
}) => {
  const listLastLesson =
    typeof window === "undefined"
      ? []
      : JSON.parse(localStorage.getItem("lastLesson") || "[]");

  const lastLesson = listLastLesson.find(
    (item: { lectureId: string; lessonSlug: string }) =>
      item.lectureId === course?.lectures[0]?.toString()
  );

  const url = `/course/${course.slug}/${course?.lectures?.[0]}${
    lastLesson?.lessonSlug ? `?slug=${lastLesson?.lessonSlug}` : ""
  }`;

  return <CourseItem course={course} buttonTitle={buttonTitle} url={url} />;
};

export default CourseList;
