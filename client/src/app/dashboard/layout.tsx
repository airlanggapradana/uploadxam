import React from "react";
import Sidebar from "@/components/dashboard-comps/Sidebar";
import DashboardHeader from "@/components/dashboard-comps/DashboardHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwtPayload } from "@/utils/helper";
import { UserSessionProvider } from "@/hooks/context";
import Footer from "@/components/reusables/Footer";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/auth/login");
  }
  const decoded = decodeJwtPayload(token);
  if (!decoded) {
    redirect("/auth/login");
  }
  return (
    <UserSessionProvider value={decoded}>
      <div className="flex h-screen flex-col bg-white">
        <DashboardHeader />
        <div className="flex flex-1">
          <Sidebar />
          <div className={"w-full"}>
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </UserSessionProvider>
  );
};

export default DashboardLayout;
