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
      <div className="flex min-h-screen bg-white dark:bg-gray-950">
        {/* Sidebar - Hidden on mobile, fixed on desktop */}
        <aside className="fixed top-0 left-0 z-40 hidden h-screen w-16 border-r border-gray-200 bg-gray-50 md:w-20 lg:block lg:w-64 dark:border-gray-800 dark:bg-gray-900">
          <Sidebar />
        </aside>

        {/* Main area with responsive margin */}
        <div className="flex min-h-screen w-full flex-1 flex-col lg:ml-64">
          {/* Header - Responsive positioning */}
          <header className="fixed top-0 right-0 left-0 z-50 border-b bg-white lg:left-64 dark:border-gray-800 dark:bg-gray-900">
            <DashboardHeader />
          </header>

          {/* Content area with responsive padding */}
          <main className="mt-14 flex-1 overflow-y-auto px-4 py-4 sm:mt-16 sm:px-6 sm:py-6 md:px-8 md:py-8">
            <div className="mx-auto max-w-full">
              {children}
              <Footer />
            </div>
          </main>
        </div>

        {/* Mobile bottom navigation (optional) */}
        <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white lg:hidden dark:border-gray-800 dark:bg-gray-900">
          <Sidebar />
        </nav>
      </div>
    </UserSessionProvider>
  );
};

export default DashboardLayout;
