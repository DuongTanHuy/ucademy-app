import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";
import { ILesson } from "@/database/lesson.model";

type TActiveLinkProps = {
  href: string;
  children: Readonly<string | React.ReactNode>;
};

type TMenuItem = {
  href: string;
  children: Readonly<string | React.ReactNode>;
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

type TUpdateLesson = {
  lessonId: string;
  lectureId: string;
  updateData: {
    title?: string;
    slug?: string;
    video_url?: string;
    content?: string;
    duration?: number;
    _destroy?: boolean;
  };
  path?: string;
};

interface ICourseUpdateLecture extends Omit<ILecture, "lessons"> {
  lessons: ILesson[];
}

interface ICourseUpdatePrams extends Omit<ICourse, "lectures"> {
  lectures: ICourseUpdateLecture[];
}

interface ILectureUpdateParams extends Omit<ILecture, "lessons"> {
  lessons: ILesson[];
}

type TCreateLesson = {
  lecture: string;
  course: string;
  title: string;
  order?: number;
  path?: string;
  slug?: string;
};

export {
  TActiveLinkProps,
  TMenuItem,
  TCreateUserParams,
  TCreateCourseParams,
  TUpdateCourseParams,
  TCreateLecture,
  TUpdateLecture,
  TUpdateLesson,
  ICourseUpdatePrams,
  ILectureUpdateParams,
  TCreateLesson,
};
