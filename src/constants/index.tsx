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
    children: "Khám phá",
    icon: <IconExplore className="size-5" />,
  },
  {
    href: "/study",
    children: "Khu vực học tập",
    icon: <IconPlay className="size-5" />,
  },
  {
    href: "/manage/course",
    children: "Quản lý khóa học",
    icon: <IconCourse className="size-5" />,
  },
  {
    href: "/manage/member",
    children: "Quản lý thành viên",
    icon: <IconMember className="size-5" />,
  },
  {
    href: "/manage/order",
    children: "Quản lý đơn hàng",
    icon: <IconOrder className="size-5" />,
  },
  {
    href: "/manage/comment",
    children: "Quản lý bình luận",
    icon: <IconComment className="size-5" />,
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
}[] = [
  { title: "Đã duyệt", value: CourseStatus.APPROVED },
  { title: "Chờ duyệt", value: CourseStatus.PENDING },
  { title: "Từ chối", value: CourseStatus.REJECTED },
];

export const courseLevel: Record<CourseLevel, string> = {
  [CourseLevel.BEGINNER]: "Người mới",
  [CourseLevel.ADVANCED]: "Nâng cao",
  [CourseLevel.INTERMEDIATE]: "Nghiên cứu",
};
