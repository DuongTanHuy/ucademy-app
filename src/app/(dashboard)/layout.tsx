import { ModeToggle } from "@/components/common/ModeToggle";
import Sidebar from "@/components/layout/Sidebar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper grid grid-cols-[300px,minmax(0,1fr)] h-screen">
      <Sidebar />
      <main className="max-h-screen py-4">
        <header className="flex items-center gap-4 mb-4 px-4">
          <input
            type="search"
            placeholder="Tìm kiếm..."
            className="w-[300px] border outline-none border-gray-300 dark:border-opacity-10 rounded-lg py-2 px-4 focus:!border-primary text-sm mr-auto"
          />
          <ModeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group relative bg-primary hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 min-w-fit overflow-hidden">
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-hover:duration-[850ms] duration-[850ms] ease-in-out transition-transform bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="group relative bg-white dark:bg-opacity-0 hover:bg-opacity-80 text-primary font-semibold py-2 px-4 rounded-lg border border-primary transition duration-200 min-w-fit overflow-hidden">
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-hover:duration-[850ms] duration-[850ms] ease-in-out transition-transform bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-[40px] h-[40px]",
                },
              }}
            />
          </SignedIn>
        </header>
        <div className="h-[calc(100vh-73.33px)] overflow-y-auto px-4">
          {children}
        </div>
      </main>
    </div>
  );
}
