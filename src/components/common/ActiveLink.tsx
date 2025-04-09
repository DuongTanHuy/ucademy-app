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
        p-3 rounded-md flex items-center gap-3 transition-all
        dark:text-grayDark
        ${
          isActive
            ? "bg-primary svg-animate !text-white"
            : "hover:!text-primary hover:bg-primary/10"
        }
      `}
    >
      {children}
    </Link>
  );
}
