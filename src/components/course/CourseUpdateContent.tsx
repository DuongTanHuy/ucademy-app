"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { commonClassNames } from "@/constants";
import {
  IconAdd,
  IconCheck,
  IconDelete,
  IconEdit,
  IconUnCheck,
} from "../icons";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  createLecture,
  deleteLecture,
  updateLecture,
} from "@/lib/actions/lecture.actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ICourseUpdatePrams, ILectureUpdateParams } from "@/types";
import {
  createLesson,
  deleteLesson,
  updateLesson,
} from "@/lib/actions/lesson.actions";
import slugify from "slugify";
import { ILesson } from "@/database/lesson.model";
import LessonItemUpdate from "../lesson/LessonItemUpdate";

const CourseUpdateContent = ({ course }: { course: ICourseUpdatePrams }) => {
  const { lectures } = course;
  const [lectureIndex, setLectureIndex] = React.useState(-1);
  const [lessonIndex, setLessonIndex] = React.useState(-1);

  const [lectureEdit, setLectureEdit] = React.useState("");
  const [lessonEdit, setLessonEdit] = React.useState("");

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
        console.log("Tạo chương thất bại!");
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
        toast.success("Cập nhật chương thành công!");
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

  const handleAddNewLesson = async (lectureId: string) => {
    try {
      const response = await createLesson({
        course: course._id,
        lecture: lectureId,
        order:
          (lectures.find((lec) => lec._id.toString() === lectureId)?.lessons
            .length ?? 0) + 1,
        title: "Bài học mới",
        slug: `bai-hoc-moi-${new Date().getTime().toString().slice(-3)}`,
        path: `manage/course/update-content?slug=${course.slug}`,
      });

      if (response.success) {
        toast.success("Thêm bài học thành công!");
      } else {
        console.log("Thêm bài học thất bại!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateLesson = async (id: string, lectureId: string) => {
    try {
      const response = await updateLesson({
        lessonId: id,
        lectureId,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[^\w\s-]/g,
          }),
        },
        path: `manage/course/update-content?slug=${course.slug}`,
      });

      if (response.success) {
        setLessonIndex(-1);
        toast.success("Cập nhật bài học thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLesson = async (id: string) => {
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
          const response = await deleteLesson({
            id,
            path: `manage/course/update-content?slug=${course.slug}`,
          });

          if (response.success) {
            toast.success("Xóa bài học thành công!");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8">
      {lectures.map((item: ILectureUpdateParams, index) => (
        <div key={index}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-3 justify-between w-full pr-5">
                  {index === lectureIndex ? (
                    <>
                      <div
                        className="w-full"
                        onClick={(event) => event.stopPropagation()}
                        onKeyUp={(event) => {
                          event.preventDefault();
                        }}
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
              <AccordionContent className="!bg-transparent border-none py-1 px-3">
                <Accordion type="single" collapsible className="w-full">
                  {item.lessons.length > 0 ? (
                    item.lessons.map((lesson: ILesson, index: number) => (
                      <AccordionItem key={lesson._id} value={lesson._id}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-3 justify-between w-full pr-5">
                            {index === lessonIndex ? (
                              <>
                                <div
                                  className="w-full"
                                  onClick={(event) => event.stopPropagation()}
                                  onKeyUp={(event) => {
                                    event.preventDefault();
                                  }}
                                >
                                  <Input
                                    placeholder="Tên bài học"
                                    className="h-10"
                                    defaultValue={lessonEdit}
                                    onChange={(e) => {
                                      setLessonEdit(e.target.value);
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
                                      handleUpdateLesson(lesson._id, item._id);
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
                                      setLessonIndex(-1);
                                    }}
                                  >
                                    <IconUnCheck />
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>{lesson.title}</div>
                                <div className="flex gap-2">
                                  <span
                                    className={commonClassNames.action}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      setLessonIndex(index);
                                      setLessonEdit(lesson.title);
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
                                      handleDeleteLesson(lesson._id);
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
                          <LessonItemUpdate
                            lesson={lesson}
                            courseSlug={`manage/course/update-content?slug=${course.slug}`}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">Chưa có bài học nào</p>
                  )}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            variant="outline"
            className="my-3 ml-auto w-fit flex flex-row gap-2 items-center button-primary"
            onClick={() => handleAddNewLesson(item._id)}
          >
            <IconAdd />
            Thêm bài học
          </Button>
        </div>
      ))}

      <Button onClick={handleAddNewLecture} className="mt-5 button-primary">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
