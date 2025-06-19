"use client";

import React from "react";
import { AccordionContent } from "@/components/ui/accordion";
import { IconPlay } from "@/components/icons";
import { useRouter } from "next/navigation";

const LessonItem = ({
  courseSlug,
  lectureSlug,
  lessonSlug,
  lessonDuration,
  lessonTitle,
}: {
  courseSlug: string;
  lectureSlug: string;
  lessonSlug: string;
  lessonDuration: number;
  lessonTitle: string;
}) => {
  const router = useRouter();

  return (
    <AccordionContent
      className="borderDarkMode bgDarkMode cursor-pointer flex flex-row items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:!bg-gray-800/20 transition-all text-sm font-medium"
      onClick={() =>
        router.push(`/course/${courseSlug}/${lectureSlug}?slug=${lessonSlug}`)
      }
    >
      <IconPlay className="size-4" />
      <h4>{lessonTitle}</h4>
      <span className="ml-auto text-xs font-semibold">
        {lessonDuration} phút
      </span>
    </AccordionContent>
  );
};

export default LessonItem;
