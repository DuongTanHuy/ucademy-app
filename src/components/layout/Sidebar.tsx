import React from "react";
import { MENU_ITEMS } from "@/constants";
import { ActiveLink } from "../common";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import { UserRole } from "@/types/enums";

export default async function Sidebar() {
  const { userId }: { userId: string | null } = await auth();
  let active = false;

  if (!!userId) {
    const user = await getUserInfo(userId);
    if (user?.role === UserRole.ADMIN) {
      active = true;
    }
  }

  return (
    <div className="bgDarkMode borderDarkMode p-5 border-r hidden lg:flex flex-col relative">
      <div
        className="w-1 absolute right-0 top-0 bottom-0 translate-x-1/2 cursor-col-resize z-10"
        id="resize-sidebar"
      />

      <a href="/" className="text-3xl inline-block mb-5 font-[500]">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
          U
        </span>
        <span className="bg-gradient-to-r from-secondary to-[#9d8189] bg-clip-text text-transparent">
          cademy
        </span>
      </a>
      <ul className="flex flex-col gap-2">
        {MENU_ITEMS.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            active={item.href.startsWith("/manage/") ? active : true}
          />
        ))}
      </ul>
    </div>
  );
}

export function MenuItem({
  href,
  children,
  icon,
  active = false,
}: {
  href: string;
  icon?: React.ReactNode;
  children?: string | React.ReactNode;
  active?: boolean;
}) {
  return (
    <li className={active ? "" : "lg:invisible"}>
      <ActiveLink href={href}>
        {icon}
        {children}
      </ActiveLink>
    </li>
  );
}
