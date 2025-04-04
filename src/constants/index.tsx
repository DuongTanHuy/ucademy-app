import { TMenuItem } from "@/app/types";
import {
  IconExplore,
  IconPlay,
  IconCourse,
  IconMember,
  IconOrder,
  IconComment,
} from "@/components/icons";

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
