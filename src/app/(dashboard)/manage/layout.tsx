import { getUserInfo } from "@/lib/actions/user.actions";
import { UserRole } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId }: { userId: string | null } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await getUserInfo(userId);

  if (user?.role !== UserRole.ADMIN) {
    return notFound();
  }

  return <div>{children}</div>;
};

export default AdminLayout;
