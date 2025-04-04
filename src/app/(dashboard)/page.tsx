import { CourseGrid } from "@/components/common";
import { CourseItem } from "@/components/course";
import { Heading } from "@/components/typhography";
import React from "react";

export default function page() {
  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </>
  );
}
