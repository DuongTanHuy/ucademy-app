"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ECourseStatus, commonClassNames } from "@/constants";
import { cn } from "@/lib/utils";
import {
  IconDelete,
  IconEdit,
  IconExplore,
  IconEye,
  IconLeft,
  IconRight,
} from "../icons";
import Link from "next/link";
import { ICourse } from "@/database/course.model";
import { deleteCourse, updateCourseStatus } from "@/lib/actions/course.actions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { CourseStatus } from "@/types/enums";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Bạn sẽ không thể khôi phục lại điều này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bc6c25",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa ngay",
      cancelButtonText: "Hủy bỏ",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await deleteCourse(id, "/manage/course");
        // router.refresh();
        toast.success("Xóa khóa học thành công!");
      }
    });
  };

  return (
    <>
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="capitalize">Thông tin</TableHead>
            <TableHead className="capitalize text-center">Giá</TableHead>
            <TableHead className="capitalize text-center">Trạng thái</TableHead>
            <TableHead className="capitalize text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    alt=""
                    src={
                      course.image ||
                      "https://plus.unsplash.com/premium_photo-1744967143306-0ec5b49ca2eb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    width={80}
                    height={80}
                    className="flex-shrink-0 size-16 rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-sm lg:text-base">
                      {course.title}
                    </h3>
                    <h4 className="text-sm text-slate-500">
                      {new Date(course.created_at).toLocaleDateString("vi-VN")}
                    </h4>
                  </div>
                </div>
              </TableCell>
              <TableCell
                align="center"
                className="font-bold text-base text-primary"
              >
                {`${(course.sale_price || 0).toLocaleString()}đ`}
              </TableCell>
              <TableCell align="center">
                <button
                  type="button"
                  className={cn(
                    commonClassNames.status,
                    ECourseStatus.find((item) => item.value === course.status)
                      ?.className,
                    `text-nowrap ${
                      course.status === CourseStatus.REJECTED
                        ? "pointer-events-auto cursor-pointer hover:scale-110 transition-all"
                        : "pointer-events-none"
                    }`
                  )}
                  onClick={async () => {
                    Swal.fire({
                      title: "Bạn có chắc chắn không?",
                      text: "Khóa học này sẽ được khôi phục!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#bc6c25",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Khôi phục",
                      cancelButtonText: "Hủy bỏ",
                    }).then(async (result: any) => {
                      if (result.isConfirmed) {
                        await updateCourseStatus(
                          course._id,
                          "/manage/course",
                          CourseStatus.PENDING
                        );
                        toast.success("Khôi phục khóa học thành công!");
                      }
                    });
                  }}
                >
                  {
                    ECourseStatus.find((item) => item.value === course.status)
                      ?.title
                  }
                </button>
              </TableCell>
              <TableCell className="w-fit">
                <div className="flex justify-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/course/${course.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconEye className="size-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Xem khóa học</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/manage/course/update?slug=${course.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconEdit className="size-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cập nhật khóa học</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/manage/course/update-content?slug=${course.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconExplore className="size-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Thêm bài học</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          handleDelete(course._id);
                        }}
                        className={cn(commonClassNames.action, "text-red-500")}
                      >
                        <IconDelete className="size-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Xóa khóa học</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>

      <div className="flex items-center justify-end gap-3 mt-5">
        <button className={commonClassNames.pagination}>
          <IconLeft />
        </button>
        <button className={commonClassNames.pagination}>
          <IconRight />
        </button>
      </div>
    </>
  );
};

export default CourseManage;
