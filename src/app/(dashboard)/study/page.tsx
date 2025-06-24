import React from "react";
import { CourseGrid, Heading } from "@/components/common";
import { ICourse } from "@/database/course.model";
import { UserRole } from "@/types/enums";
import { getUserCourses, getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCourses } from "@/lib/actions/course.actions";
import CourseList from "@/app/(dashboard)/study/CourseList";

export default async function page() {
  const { userId }: { userId: string | null } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await getUserInfo(userId);

  let courses = [];

  if (user?.role === UserRole.ADMIN) {
    courses = await getCourses();
  } else {
    courses = await getUserCourses(userId);
  }

  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <CourseGrid>
        {courses.map((course: ICourse) => (
          <CourseList
            key={course._id}
            course={course}
            buttonTitle="Tiếp tục học"
          />
        ))}
      </CourseGrid>
    </>
  );
}
