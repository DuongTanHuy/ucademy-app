import React from "react";

import { Heading } from "@/components/common";
import { CourseUpdateContent } from "@/components/course";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { notFound } from "next/navigation";

const page = async ({
  searchParams,
}: {
  searchParams: {
    slug: string;
  };
}) => {
  const { slug } = searchParams;

  const course = await getCourseBySlug(slug);

  if (!course) {
    return notFound();
  }

  return (
    <>
      <Heading>{course.title}</Heading>
      <CourseUpdateContent course={course} />
    </>
  );
};

export default page;
