"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, LogOut, Settings } from "lucide-react";
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

const DashboardHeader = () => {
  const router = useRouter();
  const session = useUserSession();
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-black text-black">
            upload<span className="text-sky-600">Xam</span>
          </span>
          <span className="text-gray-400">/</span>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant="secondary"
            className={cn(
              session.prodi === "Informatika" &&
                "bg-sky-500 text-sm text-gray-50",
              session.prodi === "Sistem_Informasi" &&
                "bg-amber-500 text-sm text-gray-50",
              session.prodi !== "Informatika" &&
                session.prodi !== "Sistem_Informasi" &&
                "bg-indigo-500 text-sm text-gray-50",
            )}
          >
            {session.prodi === "Informatika"
              ? "Informatika"
              : session.prodi === "Ilmu_Komunikasi"
                ? "Ilmu Komunikasi"
                : session.prodi === "Sistem_Informasi"
                  ? "Sistem Informasi"
                  : "Unknown"}
          </Badge>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="default" className="text-gray-800">
          <FileText className="h-4 w-4" />
          Panduan
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback>{session.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
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
  );
};

export default DashboardHeader;
