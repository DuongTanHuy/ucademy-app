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
import { createCourse } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUser } from "@/database/user.model";

const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Tên khóa học phải có ít nhất 10 ký tự" }),
  slug: z.string().optional(),
});

export default function CourseAddNew({ user }: { user: IUser }) {
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  const {
    setError,
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;
  const watchTitle = watch("title");
  const watchSlug = watch("slug");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { title, slug } = values;
      const payload = {
        title,
        slug:
          slug?.replace(/ /g, "-") ||
          slugify(title, { lower: true, locale: "vi" }),
        author: user._id,
      };

      const response = await createCourse(payload);

      toast.success("Khóa học đã được tạo thành công");

      if (response?.slug) {
        route.push(`/manage/course/update?slug=${response.slug}`);
      }
    } catch (error) {
      console.log(error);
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
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-[120px] text-white"
        >
          Tạo khóa học
        </Button>
      </form>
    </Form>
  );
}
