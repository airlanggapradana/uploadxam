import React from "react";
import {
  Grid3x3 as Grid3X3,
  List,
  CreditCard,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const menuItems = [
    { icon: Grid3X3, label: "Apps", active: true },
    { icon: List, label: "Audit Logs", active: false },
    { icon: CreditCard, label: "Billing", active: false },
    { icon: User, label: "Account", active: false },
    { icon: Settings, label: "Team Settings", active: false },
  ];
  return (
    <aside className="h-full w-64 border-r border-gray-200 bg-gray-50">
      <nav className="space-y-1 p-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex cursor-pointer items-center space-x-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              item.active
                ? "border border-gray-200 bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
