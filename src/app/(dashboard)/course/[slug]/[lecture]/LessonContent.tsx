import React from "react";
import { ICourseUpdatePrams, ILectureUpdateParams } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "@/components/lesson/LessonItem";
import { IHistory } from "@/database/history.model";
import { IconPlayLesson } from "@/components/icons";

const LessonContent = ({
  completedPercent,
  course,
  lecture,
  historyData,
  userId,
  lessonSlug,
}: {
  completedPercent: number;
  course: ICourseUpdatePrams;
  lecture: string;
  historyData: IHistory[];
  userId?: string;
  lessonSlug: string;
}) => {
  return (
    <div className="-mr-3">
      <div className="sticky top-0 left-0 right-0 max-h-[calc(100vh-100px)] overflow-auto pr-1">
        <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-5 relative">
          <div
            className="absolute rounded-full top-0 bottom-0 left-0 bg-gradient-to-r from-secondary/50 dark:from-secondary to-[#9d8189]/40 dark:to-[#9d8189] transition-all"
            style={{
              right: `${100 - completedPercent}%`,
            }}
          />
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
                item.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson._id.toString()}
                    courseId={course._id.toString()}
                    lessonId={lesson._id.toString()}
                    historyId={
                      historyData.find(
                        (his: IHistory) =>
                          his.lesson.toString() === lesson._id.toString()
                      )?._id || ""
                    }
                    userId={userId || ""}
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
                    checked={historyData.some(
                      (his: IHistory) =>
                        his.lesson.toString() === lesson._id.toString()
                    )}
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

export default LessonContent;
