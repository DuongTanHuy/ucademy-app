import LayoutWrapper from "@/components/common/LayoutWrapper";
import { ModeToggle } from "@/components/common/ModeToggle";
import { IconSearch } from "@/components/icons";
import Sidebar, { MenuItem } from "@/components/layout/Sidebar";
import { MENU_ITEMS } from "@/constants";
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
    <LayoutWrapper>
      <Sidebar />
      <ul className="flex lg:hidden flex-row gap-2 fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg bgDarkMode p-2 z-20 shadow-lg">
        {MENU_ITEMS.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </ul>
      <main className="max-h-screen py-4 overflow-hidden">
        <header className="flex items-center gap-4 mb-4 px-4">
          <div className="w-full max-w-[300px] mr-auto relative">
            <input
              placeholder="Tìm kiếm..."
              className="w-full border borderDarkMode bgDarkMode outline-none rounded-lg py-2 pl-4 pr-8 focus:!border-primary text-sm"
            />
            <IconSearch className="size-5 absolute top-0 right-3 translate-y-1/2 text-gray-400" />
          </div>
          <ModeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group relative bg-primary hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 min-w-fit overflow-hidden">
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 -translate-x-full :translate-x-full group-hover:duration-[850ms] duration-[850ms] ease-in-out transition-transform bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
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
        <div className="pb-[80px] lg:pb-0 h-[calc(100vh-73.33px)] overflow-y-auto px-4">
          {children}
        </div>
      </main>
    </LayoutWrapper>
  );
}
