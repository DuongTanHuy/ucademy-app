import { CourseGrid, Heading } from "@/components/common";
import { CourseItem } from "@/components/course";
import React from "react";
import { getCourses } from "@/lib/actions/course.actions";
import { ICourse } from "@/database/course.model";
import { CourseStatus } from "@/types/enums";

export default async function page() {
  const courses = await getCourses();
  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses
          .filter((item) => item.status === CourseStatus.APPROVED)
          .map((course: ICourse) => (
            <CourseItem key={course._id} course={course} />
          ))}
      </CourseGrid>
    </>
  );
}
