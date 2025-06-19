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
  active,
  icon,
}: {
  courseSlug: string;
  lectureSlug: string;
  lessonSlug: string;
  lessonDuration: number;
  lessonTitle: string;
  active?: boolean;
  icon?: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <AccordionContent
      className={`borderDarkMode bgDarkMode cursor-pointer flex flex-row items-center gap-2 px-4 py-2 text-gray-400  transition-all text-sm font-medium ${
        active
          ? "text-primary font-semibold svg-animate"
          : "hover:!bg-gray-800/20 hover:text-white"
      }`}
      onClick={() =>
        router.push(`/course/${courseSlug}/${lectureSlug}?slug=${lessonSlug}`)
      }
    >
      {icon ?? <IconPlay className="size-4" />}
      <h4>{lessonTitle}</h4>
      <span className="ml-auto text-xs font-semibold">
        {lessonDuration} phút
      </span>
    </AccordionContent>
  );
};

export default LessonItem;
