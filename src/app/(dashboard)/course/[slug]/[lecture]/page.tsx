import { Heading } from "@/components/common";
import { IconLeft, IconPlayLesson, IconRight } from "@/components/icons";
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

  let prevLessonData = lectureData.lessons.find(
    (less) => less.order === lessonData.order - 1
  );

  if (!prevLessonData) {
    if (lectureData.order !== 1) {
      const prevLectureData = course.lectures.find(
        (lec) => lec.order === lectureData.order - 1
      );
      if (prevLectureData) {
        prevLessonData = prevLectureData.lessons.at(-1);
      }
    }
  }

  let nextLessonData = lectureData.lessons.find(
    (less) => less.order === lessonData.order + 1
  );

  if (!nextLessonData) {
    if (lectureData.order !== course.lectures.length) {
      const nextLectureData = course.lectures.find(
        (lec) => lec.order === lectureData.order + 1
      );
      if (nextLectureData) {
        nextLessonData = nextLectureData.lessons[0];
      }
    }
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5 group">
          <iframe
            src={`https://www.youtube.com/embed/${(lessonData.video_url || "")
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
                  ? `/course/${course.slug}/${
                      prevLessonData.lecture || lecture
                    }?slug=${prevLessonData.slug}`
                  : "#"
              }
              className={`${
                commonClassNames.pagination
              } border-none hover:bg-primary hover:text-white ${
                prevLessonData ? "" : "pointer-events-none opacity-50"
              }`}
            >
              <IconLeft />
            </Link>
            <Link
              href={
                nextLessonData
                  ? `/course/${course.slug}/${
                      nextLessonData.lecture || lecture
                    }?slug=${nextLessonData.slug}`
                  : "#"
              }
              className={`${
                commonClassNames.pagination
              } border-none hover:bg-primary hover:text-white ${
                nextLessonData ? "" : "pointer-events-none opacity-50"
              }`}
            >
              <IconRight />
            </Link>
          </div>
        </div>

        <Heading hasDecorator={false}>{lessonData.title}</Heading>

        <div className="mt-10 entry-content">
          <div
            dangerouslySetInnerHTML={{
              __html: lessonData.content || "",
            }}
          />
        </div>
      </div>

      <div className="-mr-3">
        <div className="sticky top-0 left-0 right-0 max-h-[calc(100vh-100px)] overflow-auto pr-1">
          <div
            className="h-4 w-full rounded-full border borderDarkMode bgDarkMode mb-5 relative"
           
          >
            <div className="absolute rounded-full top-0 bottom-0 left-0 right-1/2 bg-gradient-to-r from-secondary/50 dark:from-secondary to-[#9d8189]/40 dark:to-[#9d8189]" />
          </div>

          {course.lectures.map((item: ILectureUpdateParams, index: number) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              className="w-full"
              defaultValue={lecture}
            >
              <AccordionItem value={item._id.toString()}>
                <AccordionTrigger className="w-full">
                  <div className="line-clamp-1">{`Chương ${index + 1}: ${
                    item.title
                  }`}</div>
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
                      active={
                        lesson.slug === lessonSlug &&
                        lecture === item._id.toString()
                      }
                      icon={<IconPlayLesson className="size-5 flex-shrink-0" />}
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
    </div>
  );
};

export default page;
