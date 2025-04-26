"use client";
import { TActiveLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ActiveLink({ href, children }: TActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      replace
      scroll={false}
      className={`
        py-1 px-2 lg:p-3 rounded-md flex flex-col whitespace-nowrap lg:flex-row items-center gap-1 lg:gap-3 transition-all
        dark:text-grayDark text-xs lg:w-full lg:text-base
        ${
          isActive
            ? "bg-primary svg-animate !text-white font-semibold"
            : "hover:!text-primary hover:bg-primary/10"
        }
      `}
    >
      {children}
    </Link>
  );
}
