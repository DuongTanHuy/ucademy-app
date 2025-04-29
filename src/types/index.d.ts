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

type TCreateLecture = {
  title?: string;
  order?: number;
  course: string;
  path?: string;
};

type TUpdateLecture = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
  };
  path?: string;
};

interface ICourseUpdatePrams extends Omit<ICourse, "lectures"> {
  lectures: ILecture[];
}

export {
  TActiveLinkProps,
  TMenuItem,
  TCreateUserParams,
  TCreateCourseParams,
  TUpdateCourseParams,
  TCreateLecture,
  TUpdateLecture,
  ICourseUpdatePrams,
};
