import { TMenuItem } from "@/app/types";
import { IconCategory, IconExplore, IconPlay } from "@/components/icons";

export const MENU_ITEMS: TMenuItem[] = [
  {
    href: "/",
    children: "Khu vực học tập",
    icon: <IconPlay className="size-5" />,
  },
  {
    href: "/explore",
    children: "Khám phá",
    icon: <IconExplore className="size-5" />,
  },
  {
    href: "/category",
    children: "Danh mục",
    icon: <IconCategory className="size-5" />,
  },
];
