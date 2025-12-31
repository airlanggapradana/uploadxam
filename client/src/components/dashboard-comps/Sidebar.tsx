"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useUserSession } from "@/hooks/context";
import { AiFillAppstore } from "react-icons/ai";
import { IoMdChatboxes } from "react-icons/io";
import { HiCreditCard } from "react-icons/hi2";
import { TbUserFilled } from "react-icons/tb";

const Sidebar = () => {
  const session = useUserSession();
  const location = usePathname();
  const menuItems = [
    { icon: AiFillAppstore, label: "Apps", path: "/dashboard" },
    { icon: HiCreditCard, label: "Donate", path: "/dashboard/billing" },
    { icon: TbUserFilled, label: "Account", path: "/dashboard/account" },
    { icon: IoMdChatboxes, label: "Feedbacks", path: "/dashboard/feedback" },
  ];

  const prodiStyles: Record<string, string> = {
    Informatika:
      "bg-sky-500 text-white hover:bg-sky-600 dark:text-gray-900 dark:bg-sky-500 dark:hover:bg-sky-600",
    Sistem_Informasi:
      "bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:text-gray-900 dark:hover:bg-amber-700",
    Ilmu_Komunikasi:
      "bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-500 dark:text-gray-900 dark:hover:bg-indigo-600",
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
            session.prodi === "Informatika" &&
              "bg-sky-500 text-gray-50 dark:bg-sky-500/40 dark:text-sky-300",
            session.prodi === "Sistem_Informasi" &&
              "bg-amber-500 text-gray-50 dark:bg-amber-500/40 dark:text-amber-300",
            session.prodi === "Ilmu_Komunikasi" &&
              "bg-indigo-500 text-gray-50 dark:bg-indigo-800 dark:text-indigo-100",
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
                "flex items-center space-x-3 rounded-md p-2 text-sm font-bold transition-colors",
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
