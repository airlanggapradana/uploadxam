"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText, LogOut, Moon, Sun, ArrowLeft } from "lucide-react";
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
import { useTheme } from "next-themes";

const DashboardHeader = () => {
  const router = useRouter();
  const session = useUserSession();
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 w-full">
        {/* Left section: Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 transition hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Beranda
          </Link>
          <div className="h-3 w-px bg-slate-300 dark:bg-gray-800" />
          <Link
            href="/explore"
            className="text-xs font-semibold text-slate-600 transition hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 sm:text-sm"
          >
            Penjelajah Soal
          </Link>
        </div>

        {/* Center section: Logo (No FOSTI logo image) */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-black tracking-tight text-slate-800 dark:text-white">
            upload<span className="text-red-600">xam</span>
          </span>
        </div>

        {/* Right section: Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-slate-700 hover:text-slate-900" />
                <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-gray-400 hover:text-white" />
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
            size="sm"
            className="text-gray-800 dark:text-gray-200 flex items-center gap-1.5 px-2 sm:px-3"
            title="Dokumentasi"
            onClick={() => window.open("/docs", "_blank")}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Dokumentasi</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer ring-1 ring-slate-200 dark:ring-gray-800">
                <AvatarFallback className="bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-semibold text-xs">
                  {session.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
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
      </div>
    </header>
  );
};

export default DashboardHeader;
