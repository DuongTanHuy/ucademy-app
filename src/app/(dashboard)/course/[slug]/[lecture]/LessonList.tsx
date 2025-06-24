"use client";
import React, { useEffect } from "react";

import { Heading } from "@/components/common";
import { IconLeft, IconRight } from "@/components/icons";
import { commonClassNames } from "@/constants";
import { ILesson } from "@/database/lesson.model";
import { ICourseUpdatePrams } from "@/types";
import Link from "next/link";

const ListLesson = ({
  lessonData,
  prevLessonData,
  nextLessonData,
  course,
  lecture,
}: {
  lessonData: ILesson;
  prevLessonData?: ILesson;
  nextLessonData?: ILesson;
  course: ICourseUpdatePrams;
  lecture: string;
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listLastLesson =
    typeof window === "undefined"
      ? []
      : JSON.parse(localStorage.getItem("lastLesson") || "[]");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (listLastLesson.length === 0) {
        localStorage.setItem(
          "lastLesson",
          JSON.stringify([
            {
              lectureId: lecture,
              lessonSlug: lessonData.slug,
            },
          ])
        );
      } else {
        const existingIndex = listLastLesson.findIndex(
          (item: { lectureId: string; lessonSlug: string }) =>
            item.lectureId === lecture
        );

        if (existingIndex === -1) {
          listLastLesson.push({
            lectureId: lecture,
            lessonSlug: lessonData.slug,
          });
        } else {
          listLastLesson[existingIndex] = {
            lectureId: lecture,
            lessonSlug: lessonData.slug,
          };
        }

        localStorage.setItem("lastLesson", JSON.stringify(listLastLesson));
      }
    }
  }, [lecture, lessonData.slug, listLastLesson]);

  return (
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
  );
};

export default ListLesson;
