import React from "react";
import { MENU_ITEMS } from "@/constants";
import ActiveLink from "../common/ActiveLink";

export default function Sidebar() {
  return (
    <div className="p-5 border-r border-r-gray-200">
      <a href="/" className="text-3xl inline-block mb-5 font-[500]">
        <span className="text-primary font-bold">U</span>
        cademy
      </a>
      <ul className="flex flex-col gap-2">
        {MENU_ITEMS.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </ul>
    </div>
  );
}

function MenuItem({
  href,
  children,
  icon,
}: {
  href: string;
  icon?: React.ReactNode;
  children: string | React.ReactNode;
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
