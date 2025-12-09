import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { manrope, roboto, sf_mono } from "@/utils";
import "./globals.scss";
import { ThemeProvider } from "@/components/common/theme-provider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReduxProvider from "@/redux/ReduxProvider";

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
      <ReduxProvider>
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
              <TooltipProvider delayDuration={300}>
                {children}
                <ToastContainer
                  autoClose={2000}
                  hideProgressBar
                  pauseOnHover
                  toastClassName="text-sm font-medium p-1 !min-h-10 p-[12px] dark:bg-grayDarker dark:text-gray-300"
                  position="top-right"
                />
                <Toaster position="top-right" closeButton />
              </TooltipProvider>
            </ThemeProvider>
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}
