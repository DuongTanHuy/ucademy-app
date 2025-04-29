import { Heading } from "@/components/common";
import { CourseUpdateContent } from "@/components/course";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import React from "react";

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
    return <div>Không tìm thấy khóa học</div>;
  }

  return (
    <>
      <Heading className="mb-8">
        Nội dung: <strong className="text-primary">{course.title}</strong>
      </Heading>
      <CourseUpdateContent course={course} />
    </>
  );
};

export default page;
