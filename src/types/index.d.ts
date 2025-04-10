import { ICourse } from "@/database/course.model";

type TActiveLinkProps = {
  href: string;
  children: string | React.ReactNode;
};

type TMenuItem = {
  href: string;
  children: string | React.ReactNode;
  icon?: React.ReactNode;
};

// User

type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

type TCreateCourseParams = {
  title: string;
  slug: string;
  author: string;
};

type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>;
};

export {
  TActiveLinkProps,
  TMenuItem,
  TCreateUserParams,
  TCreateCourseParams,
  TUpdateCourseParams,
};
