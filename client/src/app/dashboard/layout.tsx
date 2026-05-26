import React from "react";
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
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
        {/* Header - Full Width */}
        <header className="fixed top-0 right-0 left-0 z-50 border-b bg-white dark:border-gray-800 dark:bg-gray-900">
          <DashboardHeader />
        </header>

        {/* Content area - Centered max-w-6xl */}
        <main className="mt-14 flex-1 overflow-y-auto px-4 py-6 sm:mt-16 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
          {children}
          <Footer />
        </main>
      </div>
    </UserSessionProvider>
  );
};

export default DashboardLayout;
