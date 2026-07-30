import React from "react";
import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard-comps/DashboardHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwtPayload } from "@/utils/helper";
import { UserSessionProvider } from "@/hooks/context";
import Footer from "@/components/reusables/Footer";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard pengguna UploadXam untuk mengelola dan mengunggah soal ujian.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

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
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-gray-950">
        {/* Header - Full Width */}
        <DashboardHeader />

        {/* Content area - Centered max-w-7xl */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {children}
          <Footer />
        </main>
      </div>
    </UserSessionProvider>
  );
};

export default DashboardLayout;
