import { Heading } from "@/components/common";
import { CourseAddNew } from "@/components/course";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const mongoUser = await getUserInfo(userId);
  if (!mongoUser) {
    return null;
  }

  return (
    <>
      <Heading>Tạo khóa học</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(mongoUser))} />
    </>
  );
};

export default page;
