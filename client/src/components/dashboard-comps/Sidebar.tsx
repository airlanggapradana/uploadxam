"use client";
import React from "react";
import { Grid3x3 as Grid3X3, CreditCard, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const location = usePathname();
  const menuItems = [
    { icon: Grid3X3, label: "Apps", path: "/dashboard" },
    { icon: CreditCard, label: "Donate", path: "/dashboard/billing" },
    { icon: User, label: "Account", path: "/dashboard/account" },
  ];
  return (
    <aside className="hidden h-full w-64 border-r border-gray-200 bg-gray-50 md:block dark:border-gray-800 dark:bg-gray-900">
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
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
