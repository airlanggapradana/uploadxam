"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SearchableCourseSelectProps {
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableCourseSelect({
  options,
  value,
  onValueChange,
  placeholder = "Pilih atau cari mata kuliah...",
  disabled = false,
  className,
}: SearchableCourseSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when popover opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearch("");
    }
  }, [open]);

  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return options;
    return options.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase().trim()),
    );
  }, [options, search]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-colors outline-none sm:h-10 disabled:cursor-not-allowed disabled:opacity-50",
          !value && "text-muted-foreground",
        )}
      >
        <span className="truncate text-left">{value || placeholder}</span>
        <ChevronDown className="size-4 shrink-0 opacity-50" />
      </button>

      {/* Popover Dropdown */}
      {open && (
        <div className="bg-popover text-popover-foreground border-border animate-in fade-in-0 zoom-in-95 absolute left-0 top-full z-50 mt-1 max-h-72 w-full rounded-md border shadow-md outline-none">
          <div className="bg-popover border-border sticky top-0 z-10 border-b p-2">
            <div className="relative flex items-center">
              <Search className="text-muted-foreground absolute left-2.5 size-4" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Cari nama mata kuliah..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-8 pr-8 text-xs focus-visible:ring-1 sm:text-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-muted-foreground hover:text-foreground absolute right-2.5"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-52 overflow-y-auto p-1 text-sm">
            {filteredOptions.length === 0 ? (
              <div className="text-muted-foreground py-4 text-center text-xs">
                Mata kuliah "{search}" tidak ditemukan.
              </div>
            ) : (
              filteredOptions.map((course) => {
                const isSelected = value === course;
                return (
                  <button
                    key={course}
                    type="button"
                    onClick={() => {
                      onValueChange(course);
                      setOpen(false);
                    }}
                    className={cn(
                      "hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center justify-between rounded-sm px-2.5 py-2 text-left text-xs transition-colors sm:text-sm",
                      isSelected &&
                        "bg-accent/60 text-sky-600 dark:text-sky-400 font-medium",
                    )}
                  >
                    <span className="truncate pr-2">{course}</span>
                    {isSelected && (
                      <Check className="text-sky-600 dark:text-sky-400 size-4 shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
