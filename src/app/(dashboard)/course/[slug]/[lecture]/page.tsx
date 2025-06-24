import LessonContent from "@/app/(dashboard)/course/[slug]/[lecture]/LessonContent";
import ListLesson from "@/app/(dashboard)/course/[slug]/[lecture]/LessonList";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getHistoryByUserAndCourse } from "@/lib/actions/history.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { UserRole } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
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
  const { userId }: { userId: string | null } = await auth();
  console.log("userId", userId);

  if (!userId) {
    return notFound();
  }

  const user = await getUserInfo(userId);

  if (!user) {
    return notFound();
  }

  const course = await getCourseBySlug(courseSlug);

  if (!course || !course.lectures) {
    return notFound();
  }

  if (
    !user?.courses.some(
      (userCourse) => userCourse.toString() === course._id.toString()
    ) &&
    user?.role !== UserRole.ADMIN
  ) {
    return notFound();
  }

  const lectureData = course.lectures.find(
    (lec) => lec._id.toString() === lecture
  );

  if (!lectureData || !lectureData.lessons) {
    return notFound();
  }

  let lessonData;

  if (!lessonSlug) {
    lessonData = lectureData.lessons[0];
    lessonSlug = lessonData.slug;
  } else {
    lessonData = lectureData.lessons.find((less) => less.slug === lessonSlug);
  }

  if (!lessonData) {
    return notFound();
  }

  const historyData = await getHistoryByUserAndCourse({
    user: userId || "",
    course: course._id.toString(),
  });

  const totalLessons = course.lectures.reduce(
    (total, lecture) => total + lecture.lessons.length,
    0
  );

  const completedPercent = Math.round(
    (historyData.length / totalLessons) * 100
  );

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
      <ListLesson
        lessonData={lessonData}
        prevLessonData={prevLessonData}
        nextLessonData={nextLessonData}
        course={course}
        lecture={lecture}
      />

      <LessonContent
        completedPercent={completedPercent}
        course={course}
        lecture={lecture}
        historyData={historyData}
        userId={userId}
        lessonSlug={lessonSlug}
      />
    </div>
  );
};

export default page;
