"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Grid3x3 as Grid3X3,
  CreditCard,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/context";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: Grid3X3, label: "Apps", path: "/dashboard" },
  { icon: CreditCard, label: "Donate", path: "/dashboard/billing" },
  { icon: User, label: "Account", path: "/dashboard/account" },
];

const DashboardHeader = () => {
  const router = useRouter();
  const session = useUserSession();
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();

  return (
    <>
      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <aside
            className={cn(
              "fixed top-0 left-0 z-50 h-full w-64 border-r border-gray-200 bg-gray-50 transition-transform duration-200 md:hidden dark:border-gray-800 dark:bg-gray-900",
              isOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="flex items-center justify-between p-4">
              <span className="text-xl font-black text-black dark:text-white">
                upload<span className="text-sky-600">xam</span>
              </span>
              <Button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2"
                variant="secondary"
                size="icon"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="space-y-1 p-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={cn(
                    "flex cursor-pointer items-center space-x-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    location === item.path
                      ? "border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white dark:hover:shadow-sm",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}

      <header className="flex items-center justify-between border-b bg-white px-6 py-4 dark:bg-gray-900">
        {/* Left section: Hamburger (mobile) + Logo (desktop) */}
        <div className="flex items-center space-x-4">
          {/* Hamburger button for mobile */}
          <Button
            className="md:hidden"
            variant="secondary"
            size="icon"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="secondary"
            size="default"
            className="text-gray-800 dark:text-gray-200"
            onClick={() => window.open("/panduan", "_blank")}
          >
            <FileText className="h-4 w-4" />
            Dokumentasi
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback>{session.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async () => {
                  await deleteCookie("token");
                  router.push("/auth/login");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
