import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconEye, IconStar } from "../icons";

const CourseItem = () => {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-2xl">
      <Link
        href="#"
        className="group block h-[180px] relative overflow-hidden rounded-lg"
      >
        <Image
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8fDA%3D"
          alt="book"
          width={300}
          height={180}
          className="rounded-lg w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="@media (max-width: 640px) 300px, 100vw"
          priority
        />
        <span className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700">
          New
        </span>
      </Link>

      <h3 className="text-lg font-bold text-gray-600 mt-2">
        Khóa học NextJs Pro - Xây dựng E-Learning system hoàn chỉnh
      </h3>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs px-3 py-1 rounded-full bg-primary bg-opacity-20 text-primary">
          30h25
        </span>
        <span className="text-sm bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent font-bold">
          800.000đ
        </span>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent mt-4" />

      <div className="flex items-center gap-4 mt-2 text-gray-400 font-medium">
        <div className="flex items-center gap-2">
          <IconEye className="size-5" />
          1000
        </div>
        <div className="flex items-center gap-2">
          <IconStar className="size-5 text-yellow-400" />
          5.0
        </div>
      </div>

      <Link href="#">
        <button className="group relative bg-primary hover:bg-opacity-80 text-white font-semibold py-2 rounded-lg transition duration-200 w-full overflow-hidden mt-2">
          <span className="relative z-10">Xem khóa học</span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-hover:duration-[850ms] duration-[850ms] ease-in-out transition-transform bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </button>
      </Link>
    </div>
  );
};

export default CourseItem;
