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
      <main className="max-h-screen overflow-y-auto">
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-primary hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-white hover:bg-gray-50 text-primary font-semibold py-2 px-4 rounded-lg border border-primary transition duration-200">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        {children}
      </main>
    </div>
  );
}
