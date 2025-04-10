"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
      level: CourseLevel.BEGINNER,
      info: {
        requirements: [],
        benefits: [],
        qa: [],
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
          requirements: info?.requirements ?? [],
          benefits: info?.benefits ?? [],
          qa: info?.qa ?? [],
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
          requirements: [],
          benefits: [],
          qa: [],
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
        <div className="mt-10 grid grid-cols-2 gap-8 mb-8">
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
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Chọn trạng thái"
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
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Hình ảnh khóa học</FormLabel>
                <FormControl>
                  <Input
                    className={`h-[calc(100%-32px)] ${
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
            name="level"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Cấp độ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Chọn cấp độ"
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
            name="info.requirements"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Yêu cầu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập yêu cầu"
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
            name="info.benefits"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Lợi ích</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập lợi ích"
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
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting || !isDirty}
          className="w-[120px] text-white"
        >
          Cập nhật
        </Button>
      </form>
    </Form>
  );
};

export default CourseUpdate;
