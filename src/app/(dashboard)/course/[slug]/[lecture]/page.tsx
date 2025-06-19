import { IconLeft, IconRight } from "@/components/icons";
import LessonItem from "@/components/lesson/LessonItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassNames } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { ILectureUpdateParams } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({
  params: { slug: courseSlug, lecture },
  searchParams: { slug: lessonSlug },
}: {
  params: {
    slug: string;
    lecture: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
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

  const prevLessonData = lectureData.lessons.find(
    (less) => less.order === lessonData.order - 1
  );

  const nextLessonData = lectureData.lessons.find(
    (less) => less.order === lessonData.order + 1
  );

  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5 group">
          <iframe
            src={`https://www.youtube.com/embed/${lessonData.video_url
              .split("/")
              .pop()}`}
            title={lessonData.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />

          <div className="flex items-center justify-between absolute left-4 right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-90 transition-all delay-300">
            <Link
              href={
                prevLessonData
                  ? `/course/${course.slug}/${lecture}?slug=${prevLessonData.slug}`
                  : "#"
              }
              className={`${commonClassNames.pagination} border-none hover:bg-primary hover:text-white`}
            >
              <IconLeft />
            </Link>
            <Link
              href={
                nextLessonData
                  ? `/course/${course.slug}/${lecture}?slug=${nextLessonData.slug}`
                  : "#"
              }
              className={`${commonClassNames.pagination} border-none hover:bg-primary hover:text-white`}
            >
              <IconRight />
            </Link>
          </div>
        </div>
      </div>

      <div>
        {course.lectures.map((item: ILectureUpdateParams, index: number) => (
          <Accordion key={index} type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div>{`Chương ${index + 1}: ${item.title}`}</div>
              </AccordionTrigger>
              {item.lessons.length > 0 ? (
                item.lessons.map((lesson, lessonIndex) => (
                  <LessonItem
                    key={lessonIndex}
                    courseSlug={course.slug}
                    lectureSlug={item._id.toString()}
                    lessonSlug={lesson.slug}
                    lessonDuration={lesson.duration}
                    lessonTitle={lesson.title}
                  />
                ))
              ) : (
                <AccordionContent className="!bg-transparent border-none py-1 px-3">
                  <p className="text-gray-400 italic">Chưa có bài học nào</p>
                </AccordionContent>
              )}
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default page;
