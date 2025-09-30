import React from "react";
import Sidebar from "@/components/dashboard-comps/Sidebar";
import DashboardHeader from "@/components/dashboard-comps/DashboardHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/auth/login");
  }
  return (
    <div className="flex h-screen flex-col bg-white">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
