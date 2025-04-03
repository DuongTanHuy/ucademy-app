"use client";
import { TActiveLinkProps } from "@/app/types";
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
      className={`p-3 rounded-md flex items-center gap-3 transition-all ${
        isActive
          ? "text-white bg-primary svg-animate"
          : "hover:text-primary hover:bg-primary hover:bg-opacity-10"
      }`}
    >
      {children}
    </Link>
  );
}
