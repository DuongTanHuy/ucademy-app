"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { commonClassNames } from "@/constants";
import { IconCheck, IconDelete, IconEdit, IconUnCheck } from "../icons";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { ICourse } from "@/database/course.model";
import { Button } from "../ui/button";
import {
  createLecture,
  deleteLecture,
  updateLecture,
} from "@/lib/actions/lecture.actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ICourseUpdatePrams } from "@/types";
import { ILecture } from "@/database/lecture.model";

const CourseUpdateContent = ({ course }: { course: ICourseUpdatePrams }) => {
  const lectures = course.lectures;
  const [lectureIndex, setLectureIndex] = React.useState(-1);
  const [lectureEdit, setLectureEdit] = React.useState("");

  const handleAddNewLecture = async () => {
    try {
      const response = await createLecture({
        title: "Giới thiệu khóa học",
        course: course._id,
        order: lectures.length + 1,
        path: `manage/course/update-content?slug=${course.slug}`,
      });

      if (response.success) {
        toast.success("Tạo chương thành công!");
      } else {
        console.log("Failed to create lecture");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateLecture = async (id: string) => {
    try {
      const response = await updateLecture({
        lectureId: id,
        updateData: {
          title: lectureEdit,
        },
        path: `manage/course/update-content?slug=${course.slug}`,
      });

      if (response.success) {
        setLectureIndex(-1);
        toast.success("Cập nhật thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
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
          const response = await deleteLecture({
            id,
            course: course._id,
            path: `manage/course/update-content?slug=${course.slug}`,
          });

          if (response.success) {
            toast.success("Xóa chương thành công!");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {lectures
        .filter((item: ILecture) => !item._destroy)
        .map((item: ILecture, index) => (
          <Accordion key={index} type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-3 justify-between w-full pr-5">
                  {index === lectureIndex ? (
                    <>
                      <div
                        className="w-full"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Input
                          placeholder="Tên chương"
                          className="h-10"
                          defaultValue={lectureEdit}
                          onChange={(e) => {
                            setLectureEdit(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={cn(
                            commonClassNames.action,
                            "text-green-500"
                          )}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleUpdateLecture(item._id);
                          }}
                        >
                          <IconCheck />
                        </span>
                        <span
                          className={cn(
                            commonClassNames.action,
                            "text-red-500"
                          )}
                          onClick={(event) => {
                            event.stopPropagation();
                            setLectureIndex(-1);
                          }}
                        >
                          <IconUnCheck />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>{`Chương ${index + 1}: ${item.title}`}</div>
                      <div className="flex gap-2">
                        <span
                          className={commonClassNames.action}
                          onClick={(event) => {
                            event.stopPropagation();
                            setLectureIndex(index);
                            setLectureEdit(item.title);
                          }}
                        >
                          <IconEdit />
                        </span>
                        <span
                          className={cn(
                            commonClassNames.action,
                            "text-red-500"
                          )}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(item._id);
                          }}
                        >
                          <IconDelete />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}

      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
