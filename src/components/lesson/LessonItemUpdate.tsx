"use client";
import React, { useMemo } from "react";
import { ILesson } from "@/database/lesson.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { updateLesson } from "@/lib/actions/lesson.actions";
import { Editor } from "@tinymce/tinymce-react";
import { editorOptions } from "@/constants";
import { useTheme } from "next-themes";

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({
  lesson,
  courseSlug,
}: {
  lesson: ILesson;
  courseSlug: string;
}) => {
  const { theme } = useTheme();
  const defaultValues = useMemo(
    () => ({
      slug: lesson?.slug ?? "",
      duration: lesson?.duration ?? 0,
      video_url: lesson?.video_url ?? "",
      content: lesson?.content ?? "",
    }),
    [lesson?.content, lesson?.duration, lesson?.slug, lesson?.video_url]
  );

  const editorRef = React.useRef<any>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!editorRef.current) {
        return;
      }
      const response = await updateLesson({
        lessonId: lesson._id,
        lectureId: lesson.lecture.toString(),
        updateData: {
          ...values,
          content: editorRef.current.getContent(),
        },
        path: courseSlug,
      });

      if (response.success) {
        toast.success("Cập nhật bài học thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn</FormLabel>
                <FormControl>
                  <Input placeholder="bai-1-tong-quan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời lượng</FormLabel>
                <FormControl>
                  <Input
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
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video giới thiệu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Nội dung</FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                  onInit={(_evt: any, editor: any) => {
                    (editorRef.current = editor).setContent(
                      lesson.content || ""
                    );
                  }}
                  value={field.value}
                  {...editorOptions(field, theme)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-4 mt-5 w-full">
          <Button type="submit">Cập nhật</Button>
          <Link href="/">Xem trước</Link>
        </div>
      </form>
    </Form>
  );
};

export default LessonItemUpdate;
