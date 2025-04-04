import { IconLeft } from "@/components/icons";
import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-xl font-semibold text-gray-500">Page not found</h2>
      <Link
        href="/"
        replace
        className="text-blue-500 mt-2 hover:underline flex items-center gap-2"
      >
        <IconLeft className="size-5" />
        Homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
