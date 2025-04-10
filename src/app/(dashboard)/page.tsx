import { CourseGrid } from "@/components/common";
import { CourseItem } from "@/components/course";
import { Heading } from "@/components/typhography";
import React from "react";
import { getCourses } from "@/lib/actions/course.actions";
import { ICourse } from "@/database/course.model";

export default async function page() {
  const courses = await getCourses();
  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses.map((course: ICourse) => (
          <CourseItem key={course._id} course={course} />
        ))}
      </CourseGrid>
    </>
  );
}
