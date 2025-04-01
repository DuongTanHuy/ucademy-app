import type { Metadata } from "next";
import { manrope, roboto, sf_mono } from "@/components/fonts";
import "./globals.css";

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
        className={`${manrope.variable} ${roboto.variable} ${sf_mono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
