import type { Metadata } from "next";
import { manrope, roboto, sf_mono } from "@/utils";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Ucademy",
  description: "Nền tảng học trực tuyến siêu chất lượng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${roboto.variable} ${sf_mono.variable} font-manrope`}
      >
        <div className="wrapper grid grid-cols-[300px,minmax(0,1fr)] h-screen">
          <Sidebar />
          <main className="max-h-screen overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
