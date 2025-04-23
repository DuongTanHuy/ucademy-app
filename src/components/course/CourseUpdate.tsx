"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { toast } from "react-toastify";
import { ICourse } from "@/database/course.model";
import { updateCourse } from "@/lib/actions/course.actions";
import { Textarea } from "../ui/textarea";
import { CourseLevel, CourseStatus } from "@/types/enums";
import { IconAdd, IconDelete } from "../icons";
import { ECourseLevel, ECourseStatus } from "@/constants";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Tên khóa học phải có ít nhất 10 ký tự" }),
  slug: z.string().optional(),
  price: z.number().int().positive().optional(),
  sale_price: z.number().int().positive().optional(),
  intro_url: z.string().optional(),
  desc: z.string().optional(),
  image: z.string().optional(),
  status: z
    .enum([CourseStatus.APPROVED, CourseStatus.PENDING, CourseStatus.REJECTED])
    .optional(),
  level: z
    .enum([
      CourseLevel.BEGINNER,
      CourseLevel.INTERMEDIATE,
      CourseLevel.ADVANCED,
    ])
    .optional(),
  info: z
    .object({
      requirements: z.array(z.string()).optional(),
      benefits: z.array(z.string()).optional(),
      qa: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .optional(),
    })
    .optional(),
});

const CourseUpdate = ({ course }: { course: ICourse }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title ?? "",
      slug: course.slug ?? "",
      price: course.price ?? 0,
      sale_price: course.sale_price ?? 0,
      intro_url: course.intro_url ?? "",
      desc: course.desc ?? "",
      image: course.image ?? "",
      status: course.status ?? CourseStatus.PENDING,
      level: course.level ?? CourseLevel.BEGINNER,
      info: {
        requirements:
          course.info.requirements.length > 0 ? course.info.requirements : [""],
        benefits: course.info.benefits.length > 0 ? course.info.benefits : [""],
        qa:
          course.info.qa.length > 0
            ? course.info.qa
            : [{ question: "", answer: "" }],
      },
    },
  });

  const {
    watch,
    setValue,
    setError,
    reset,
    formState: { isDirty, isSubmitting },
  } = form;
  const watchTitle = watch("title");
  const watchSlug = watch("slug");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const {
        title,
        slug,
        price,
        sale_price,
        intro_url,
        desc,
        image,
        status,
        level,
        info,
      } = values;
      const payload = {
        title,
        slug:
          slug?.replace(/ /g, "-") ||
          slugify(title, { lower: true, locale: "vi" }),
        author: course.author,
        price,
        sale_price,
        intro_url,
        desc,
        image,
        status,
        level,
        info: {
          requirements: info?.requirements?.filter(
            (require) => require !== ""
          ) ?? [""],
          benefits: info?.benefits?.filter((require) => require !== "") ?? [""],
          qa: info?.qa?.filter(
            (qa) => qa.answer !== "" && qa.question !== ""
          ) ?? [
            {
              question: "",
              answer: "",
            },
          ],
        },
      };

      await updateCourse(course._id, {
        slug: payload.slug,
        updateData: payload,
      });

      reset({
        title: payload.title,
        slug: payload.slug,
        price: payload.price,
        sale_price: payload.sale_price,
        intro_url: payload.intro_url,
        desc: payload.desc,
        image: payload.image,
        status: payload.status,
        level: payload.level,
        info: {
          requirements: info?.requirements?.filter(
            (require) => require !== ""
          ) ?? [""],
          benefits: info?.benefits?.filter((require) => require !== "") ?? [""],
          qa: info?.qa?.filter(
            (qa) => qa.answer !== "" && qa.question !== ""
          ) ?? [
            {
              question: "",
              answer: "",
            },
          ],
        },
      });

      toast.success("Khóa học đã được cập nhật");
    } catch (error) {
      setError("slug", { message: "Đường dẫn đã tồn tại" });
    }
  }

  useEffect(() => {
    if (!watchSlug && watchTitle) {
      setValue("slug", slugify(watchTitle, { lower: true, locale: "vi" }));
    }
  }, [setValue, watchSlug, watchTitle]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoCapitalize="off">
        <div className="mt-10 grid grid-cols-2 gap-8 mb-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Tên khóa học</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập tên khóa học"
                    className={`${
                      error
                        ? "border-red-500 dark:border-red-500 !bg-red-200/10"
                        : ""
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Đường dẫn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="khoa-hoc-lap-trinh"
                    className={`${
                      error
                        ? "border-red-500 dark:border-red-500 !bg-red-200/10"
                        : ""
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="599.000"
                    className={`${
                      error
                        ? "border-red-500 dark:border-red-500 !bg-red-200/10"
                        : ""
                    }`}
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sale_price"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Giá gốc</FormLabel>
                <FormControl>
                  <Input
                    placeholder="900.000"
                    className={`${
                      error
                        ? "border-red-500 dark:border-red-500 !bg-red-200/10"
                        : ""
                    }`}
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="intro_url"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Video giới thiệu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    className={`${
                      error
                        ? "border-red-500 dark:border-red-500 !bg-red-200/10"
                        : ""
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chọn trạng thái</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      {ECourseStatus.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="desc"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập mô tả"
                    className={`${
                      error
                        ? "border-red-500 dark:border-red-500 !bg-red-200/10"
                        : ""
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh khóa học</FormLabel>
                <FormControl>
                  <div className="h-[calc(100%-32px)] bg-white dark:bg-grayDarker rounded-md border border-gray-200 dark:border-opacity-10 flex items-center justify-center relative">
                    {field.value ? (
                      <>
                        <Image
                          src={field.value}
                          alt=""
                          fill
                          className="w-full h-full object-cover rounded-md border border-gray-200 dark:border-opacity-10"
                        />
                        <Button
                          onClick={() => {
                            setValue("image", "", {
                              shouldDirty: true,
                            });
                          }}
                          className="absolute w-8 h-8 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gray-100 dark:bg-grayDark bg-transparent opacity-0 hover:opacity-90 rounded-full p-1 transition-all"
                        >
                          <IconDelete className="size-5 text-red-500" />
                        </Button>
                      </>
                    ) : (
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: any) => {
                          setValue("image", res[0].ufsUrl, {
                            shouldDirty: true,
                          });
                        }}
                        onUploadError={(error: Error) => {
                          console.log(error);
                        }}
                        className="w-full h-full relative ut-button:absolute ut-button:top-0 ut-button:left-0 ut-button:bottom-0 ut-button:right-0 ut-button:rounded-md ut-button:!bg-transparent ut-button:w-full ut-button:h-full ut-button:text-gray-500 ut-button:flex ut-button:items-start ut-button:pt-2 ut-button:after:bottom-0 ut-button:after:h-1 ut-button:after:rounded-lg ut-button:after:bg-green-600 ut-allowed-content:absolute ut-allowed-content:bottom-3 ut-uploading:!bg-transparent"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="info.benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <span>Lợi ích</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setValue("info.benefits", [...(field.value ?? []), ""], {
                        shouldDirty: true,
                      });
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                {(field.value ?? []).map((item, index) => (
                  <Input
                    key={index}
                    placeholder={`Lợi ích ${index + 1}`}
                    {...field}
                    value={item}
                    onChange={(e) => {
                      const newRequirements = [...(field.value ?? [])];
                      newRequirements[index] = e.target.value;
                      setValue("info.benefits", newRequirements, {
                        shouldDirty: true,
                      });
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="info.requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <span>Yêu cầu</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setValue(
                        "info.requirements",
                        [...(field.value ?? []), ""],
                        {
                          shouldDirty: true,
                        }
                      );
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                {(field.value ?? []).map((item, index) => (
                  <Input
                    key={index}
                    placeholder={`Yêu cầu ${index + 1}`}
                    {...field}
                    value={item}
                    onChange={(e) => {
                      const newRequirements = [...(field.value ?? [])];
                      newRequirements[index] = e.target.value;
                      setValue("info.requirements", newRequirements, {
                        shouldDirty: true,
                      });
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="info.qa"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <span>Q&A</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setValue(
                        "info.qa",
                        [
                          ...(field.value ?? []),
                          {
                            question: "",
                            answer: "",
                          },
                        ],
                        {
                          shouldDirty: true,
                        }
                      );
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                {(field.value ?? []).map((item, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder={`Câu hỏi ${index + 1}`}
                      {...field}
                      value={item.question}
                      onChange={(e) => {
                        const newQuestion = [...(field.value ?? [])];
                        newQuestion[index].question = e.target.value;
                        setValue("info.qa", newQuestion, {
                          shouldDirty: true,
                        });
                      }}
                    />
                    <Input
                      placeholder={`Trả lời ${index + 1}`}
                      {...field}
                      value={item.answer}
                      onChange={(e) => {
                        const newAnswer = [...(field.value ?? [])];
                        newAnswer[index].answer = e.target.value;
                        setValue("info.qa", newAnswer, {
                          shouldDirty: true,
                        });
                      }}
                    />
                  </div>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cấp độ</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn cấp độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {ECourseLevel.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting || !isDirty}
          className="w-[120px] text-white mb-8"
        >
          Cập nhật
        </Button>
      </form>
    </Form>
  );
};

export default CourseUpdate;
