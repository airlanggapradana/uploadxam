import React from "react";
import Sidebar from "@/components/dashboard-comps/Sidebar";
import DashboardHeader from "@/components/dashboard-comps/DashboardHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwtPayload } from "@/utils/helper";
import { UserSessionProvider } from "@/hooks/context";
import Footer from "@/components/reusables/Footer";
import PopupDialog from "@/components/dashboard-comps/PopUpDialog";

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
      <PopupDialog />
      <div className="flex bg-white dark:bg-gray-900">
        {/* Sidebar fixed di kiri */}
        <aside className="fixed top-0 left-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-gray-50 md:block dark:border-gray-800 dark:bg-gray-900">
          <Sidebar />
        </aside>

        {/* Main area */}
        <div className="flex min-h-screen flex-1 flex-col md:ml-64">
          {/* Header fixed di atas */}
          <header className="fixed top-0 right-0 left-0 z-50 border-b bg-white md:left-64 dark:bg-gray-900">
            <DashboardHeader />
          </header>

          {/* Konten scrollable di bawah header */}
          <main className="mt-[72px] flex-1 overflow-y-auto p-4">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </UserSessionProvider>
  );
};

export default DashboardLayout;
