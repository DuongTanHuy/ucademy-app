import { getCourseBySlug } from "@/lib/actions/course.actions";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: {
    slug: string;
    lecture: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  const { slug: courseSlug, lecture } = params;
  const { slug: lessonSlug } = searchParams;

  console.log(courseSlug, lecture, lessonSlug);

  const course = await getCourseBySlug(courseSlug);

  if (!course || !course.lectures) {
    return notFound();
  }

  const lectureData = course.lectures.find(
    (lec) => lec._id.toString() === lecture
  );

  if (!lectureData || !lectureData.lessons) {
    return notFound();
  }

  const lessonData = lectureData.lessons.find(
    (less) => less.slug === lessonSlug
  );

  if (!lessonData) {
    return notFound();
  }

  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5">
          <iframe
            src={`https://www.youtube.com/embed/${lessonData.video_url
              .split("/")
              .pop()}`}
            title="Phân bổ tài sản trong thời kỳ VUCA"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;
