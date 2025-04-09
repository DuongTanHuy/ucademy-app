import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { manrope, roboto, sf_mono } from "@/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${manrope.variable} ${roboto.variable} ${sf_mono.variable} font-manrope`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
