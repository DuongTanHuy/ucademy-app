import React from "react";
import { MENU_ITEMS } from "@/constants";
import { ActiveLink } from "../common";
import { IconMenu } from "../icons";

export default function Sidebar() {
  return (
    <div className="bgDarkMode borderDarkMode p-5 border-r hidden lg:flex flex-col">
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
          <MenuItem key={index} {...item} />
        ))}
      </ul>
    </div>
  );
}

export function MenuItem({
  href,
  children,
  icon,
}: {
  href: string;
  icon?: React.ReactNode;
  children?: string | React.ReactNode;
}) {
  return (
    <li>
      <ActiveLink href={href}>
        {icon}
        {children}
      </ActiveLink>
    </li>
  );
}
