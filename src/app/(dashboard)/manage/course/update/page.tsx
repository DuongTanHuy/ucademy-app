import { Heading } from "@/components/common";
import CourseUpdate from "@/components/course/CourseUpdate";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const { slug } = searchParams;

  const course = await getCourseBySlug(slug ?? "");

  if (!course) {
    return notFound();
  }

  return (
    <>
      <Heading>Cập nhật khóa học</Heading>
      <CourseUpdate course={JSON.parse(JSON.stringify(course))} />
    </>
  );
};

export default page;
