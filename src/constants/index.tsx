import { TMenuItem } from "@/types";
import {
  IconExplore,
  IconPlay,
  IconCourse,
  IconMember,
  IconOrder,
  IconComment,
} from "@/components/icons";
import { CourseLevel, CourseStatus } from "@/types/enums";

export const MENU_ITEMS: TMenuItem[] = [
  {
    href: "/",
    children: (
      <span className="hidden sm:inline-block max-w-14 overflow-hidden text-ellipsis md:max-w-full">
        Khám phá
      </span>
    ),
    icon: <IconExplore className="size-6 lg:size-5" />,
  },
  {
    href: "/study",
    children: (
      <span className="hidden sm:inline-block max-w-14 overflow-hidden text-ellipsis md:max-w-full">
        Khu vực học tập
      </span>
    ),
    icon: <IconPlay className="size-6 lg:size-5" />,
  },
  {
    href: "/manage/course",
    children: (
      <span className="hidden sm:inline-block max-w-14 overflow-hidden text-ellipsis md:max-w-full">
        Quản lý khóa học
      </span>
    ),
    icon: <IconCourse className="size-6 lg:size-5" />,
  },
  {
    href: "/manage/member",
    children: (
      <span className="hidden sm:inline-block max-w-14 overflow-hidden text-ellipsis md:max-w-full">
        Quản lý thành viên
      </span>
    ),
    icon: <IconMember className="size-6 lg:size-5" />,
  },
  {
    href: "/manage/order",
    children: (
      <span className="hidden sm:inline-block max-w-14 overflow-hidden text-ellipsis md:max-w-full">
        Quản lý đơn hàng
      </span>
    ),
    icon: <IconOrder className="size-6 lg:size-5" />,
  },
  {
    href: "/manage/comment",
    children: (
      <span className="hidden sm:inline-block max-w-14 overflow-hidden text-ellipsis md:max-w-full">
        Quản lý bình luận
      </span>
    ),
    icon: <IconComment className="size-6 lg:size-5" />,
  },
];

export const ECourseLevel: {
  title: string;
  value: CourseLevel;
}[] = [
  { title: "Người mới", value: CourseLevel.BEGINNER },
  { title: "Nâng cao", value: CourseLevel.ADVANCED },
  { title: "Nghiên cứu", value: CourseLevel.INTERMEDIATE },
];

export const ECourseStatus: {
  title: string;
  value: CourseStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: CourseStatus.APPROVED,
    className: "text-green-500 bg-green-500/10 border-green-500",
  },
  {
    title: "Chờ duyệt",
    value: CourseStatus.PENDING,
    className: "text-yellow-500 bg-yellow-500/10 border-yellow-500",
  },
  {
    title: "Từ chối",
    value: CourseStatus.REJECTED,
    className: "text-red-500 bg-red-500/10 border-red-500",
  },
];

export const courseLevel: Record<CourseLevel, string> = {
  [CourseLevel.BEGINNER]: "Người mới",
  [CourseLevel.ADVANCED]: "Nâng cao",
  [CourseLevel.INTERMEDIATE]: "Nghiên cứu",
};

export const commonClassNames = {
  status: "rounded-md px-3 py-1 font-semibold text-xs font",
  action:
    "size-8 rounded-md border flex items-center justify-center p-2  text-gray-500 hover:border-opacity-80 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20",
  pagination:
    "size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center p-2 hover:border-primary hover:text-primary transition-all",
};
