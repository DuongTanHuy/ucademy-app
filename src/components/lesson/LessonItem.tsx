"use client";

import React from "react";
import { AccordionContent } from "@/components/ui/accordion";
import { IconPlay } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { createHistory, deleteHistory } from "@/lib/actions/history.actions";

const LessonItem = ({
  courseId = "",
  lessonId = "",
  historyId = "",
  userId = "",
  courseSlug,
  lectureSlug,
  lessonSlug,
  lessonDuration,
  lessonTitle,
  active,
  checked,
  icon,
}: {
  courseId?: string;
  lessonId?: string;
  historyId?: string;
  userId?: string;
  courseSlug: string;
  lectureSlug: string;
  lessonSlug: string;
  lessonDuration: number;
  lessonTitle: string;
  active?: boolean;
  checked?: boolean;
  icon?: React.ReactNode;
}) => {
  const router = useRouter();

  const handleCreateHistory = async () => {
    await createHistory({
      history: {
        user: userId,
        course: courseId,
        lesson: lessonId,
      },
      path: `/course/${courseSlug}/${lectureSlug}?slug=${lessonSlug}`,
    });
  };

  const handleDeleteHistory = async () => {
    await deleteHistory({
      historyId,
      path: `/course/${courseSlug}/${lectureSlug}?slug=${lessonSlug}`,
    });
  };

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
      {checked !== undefined && (
        <Checkbox
          className="flex-shrink-0 text-white"
          checked={checked}
          onCheckedChange={(check: boolean) => {
            return check ? handleCreateHistory() : handleDeleteHistory();
          }}
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {icon ?? <IconPlay className="size-4 flex-shrink-0" />}
      <h4 className="line-clamp-1">{lessonTitle}</h4>
      <span className="ml-auto text-xs font-semibold whitespace-nowrap">
        {lessonDuration} phút
      </span>
    </AccordionContent>
  );
};

export default LessonItem;
