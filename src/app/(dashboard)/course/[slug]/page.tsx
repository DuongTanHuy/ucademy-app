import PageNotFound from "@/app/not-found";
import {
  IconCategory,
  IconCourse,
  IconMember,
  IconOrder,
  IconPlay,
} from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ECourseLevel, courseLevel } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import { CourseStatus, UserRole } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { userId }: { userId: string | null } = await auth();
  const data = await getCourseBySlug(slug);
  const user = await getUserInfo(userId);

  if (user?.role !== UserRole.ADMIN && data?.status !== CourseStatus.APPROVED) {
    return <PageNotFound />;
  }

  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5">
          {data?.intro_url ? (
            <iframe
              src={`https://www.youtube.com/embed/${data.intro_url
                .split("/")
                .pop()}`}
              title="Phân bổ tài sản trong thời kỳ VUCA"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          ) : (
            <Image
              src={
                data?.image ||
                "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8fDA%3D"
              }
              alt=""
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
        <h1 className="font-bold text-3xl mb-5">{data?.title}</h1>

        <BoxSection title="Mô tả">
          <div className="leading-normal">{data?.desc}</div>
        </BoxSection>

        <BoxSection title="Thông tin">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <BoxInfo title="Bài học" value="100" />
            <BoxInfo title="Lượt xem" value="1000" />
            <BoxInfo
              title="Trình độ"
              value={data?.level ? courseLevel[data.level] : "N/A"}
            />
            <BoxInfo title="Thời lượng" value="40h" />
          </div>
        </BoxSection>

        <BoxSection title="Yêu cầu">
          <div className="leading-normal">
            {data?.info?.requirements.map((r, index) => (
              <div key={index}>{r}</div>
            ))}
          </div>
        </BoxSection>

        <BoxSection title="Lợi ích">
          <div className="leading-normal">
            {data?.info?.benefits.map((b, index) => (
              <div key={index}>{b}</div>
            ))}
          </div>
        </BoxSection>

        <BoxSection title="Q&A">
          <div className="leading-normal">
            {data?.info?.qa.map((q, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={q.question}>
                  <AccordionTrigger>{q.question}?</AccordionTrigger>
                  <AccordionContent>{q.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </BoxSection>
      </div>
      <div>
        <div className="bgDarkMode rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <strong className="text-primary text-xl font-bold">{`${new Intl.NumberFormat(
              "vi-VN",
              {
                style: "decimal",
                maximumFractionDigits: 0,
              }
            ).format(data?.price || 0)}đ`}</strong>
            <span className="text-slate-400 text-sm line-through">
              {`${new Intl.NumberFormat("vi-VN", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(data?.sale_price || 0)}đ`}
            </span>
            <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
              {Math.floor(((data?.price ?? 0) / (data?.sale_price ?? 0)) * 100)}
              %
            </span>
          </div>

          <h3 className="font-bold mb-3 text-sm">Khóa học gồm có</h3>
          <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <IconPlay className="size-4" />
              <span>30h học</span>
            </li>
            <li className="flex items-center gap-2">
              <IconCourse className="size-4" />
              <span>Video Full HD</span>
            </li>
            <li className="flex items-center gap-2">
              <IconMember className="size-4" />
              <span>Có nhóm hỗ trợ</span>
            </li>
            <li className="flex items-center gap-2">
              <IconOrder className="size-4" />
              <span>Tài liệu kèm theo</span>
            </li>
          </ul>
          <Button className="w-full text-white">Mua khóa học</Button>
        </div>
      </div>
    </div>
  );
};

export default page;

function BoxInfo({ title, value }: { title: string; value: string }) {
  return (
    <div className="bgDarkMode rounded-lg p-5">
      <h4 className="text-sm text-slate-400 font-normal">{title}</h4>
      <h3 className="font-bold">{value}</h3>
    </div>
  );
}

function BoxSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <h2 className={cn("font-bold text-xl mb-5", className)}>{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}
