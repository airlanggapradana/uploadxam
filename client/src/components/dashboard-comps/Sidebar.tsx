"use client";
import React from "react";
import { Grid3x3 as Grid3X3, CreditCard, User, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useUserSession } from "@/hooks/context";

const Sidebar = () => {
  const session = useUserSession();
  const location = usePathname();
  const menuItems = [
    { icon: Grid3X3, label: "Apps", path: "/dashboard" },
    { icon: CreditCard, label: "Donate", path: "/dashboard/billing" },
    { icon: User, label: "Account", path: "/dashboard/account" },
    { icon: Command, label: "Feedbacks", path: "/dashboard/feedback" },
  ];

  const prodiStyles: Record<string, string> = {
    Informatika:
      "bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700",
    Sistem_Informasi:
      "bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700",
    Ilmu_Komunikasi:
      "bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700",
    default:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
  };

  const prodiKey = session.prodi ?? "default";
  const prodiClass = prodiStyles[prodiKey] ?? prodiStyles.default;
  return (
    <aside className="flex h-full w-full flex-col border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      {/* ======= Logo + Prodi Badge ======= */}
      <div className="flex items-center border-b border-gray-200 p-5 dark:border-gray-800">
        <span className="text-xl font-black text-black dark:text-white">
          upload<span className="text-sky-600">xam</span>
        </span>
        <span className="mx-2 text-gray-400">/</span>
        <Badge
          variant="secondary"
          className={cn(
            "text-xs font-medium",
            session.prodi === "Informatika" && "bg-sky-500 text-gray-50",
            session.prodi === "Sistem_Informasi" && "bg-amber-500 text-gray-50",
            session.prodi === "Ilmu_Komunikasi" && "bg-indigo-500 text-gray-50",
          )}
        >
          {session.prodi
            ?.replace("_", " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()) || "Unknown"}
        </Badge>
      </div>

      {/* ======= Menu Items ======= */}
      <nav className="flex-1 space-y-3 overflow-y-auto p-2 md:p-4">
        {menuItems.map((item, index) => {
          const active = location === item.path;
          return (
            <Link
              key={index}
              href={item.path}
              aria-label={item.label}
              className={cn(
                "flex items-center space-x-3 rounded-md p-3 text-sm font-medium transition-colors",
                active
                  ? cn(
                      "border border-gray-200 shadow-sm dark:border-gray-700",
                      prodiClass,
                      "text-white",
                    )
                  : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
