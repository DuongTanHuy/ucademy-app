import React from "react";
import { CourseManage } from "@/components/course";
import { Heading } from "@/components/common";
import { getCourses } from "@/lib/actions/course.actions";
import Link from "next/link";
import { IconAdd } from "@/components/icons";

const page = async () => {
  const courses = await getCourses();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Heading>Quản lý khóa học</Heading>

        <Link href="/manage/course/new">
          <button className="group relative bg-primary hover:bg-opacity-80 text-white font-semibold py-2 rounded-lg transition duration-200 w-fit overflow-hidden px-2 flex items-center gap-1">
            <IconAdd className="size-5" />
            <span className="relative z-10">Thêm khóa học</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-hover:duration-[850ms] duration-[850ms] ease-in-out transition-transform bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </button>
        </Link>
      </div>

      <CourseManage courses={courses} />
    </div>
  );
};

export default page;
