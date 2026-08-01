import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="my-4 overflow-x-auto">
      <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 whitespace-nowrap">
        <li>
          <Link
            href="/"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Beranda</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
              {isLast ? (
                <span className="font-medium text-red-400 truncate max-w-[200px] sm:max-w-xs">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
