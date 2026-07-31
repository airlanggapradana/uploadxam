"use client";

import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Flag,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import AdminReportTable from "@/components/dashboard-comps/AdminReportTable";
import { REPORT_REASON_LABELS, REPORT_STATUS_LABELS } from "@/types/report.type";
import type { ReportReason, ReportStatus } from "@/types/report.type";

const STATUSES: ReportStatus[] = ["PENDING", "UNDER_REVIEW", "RESOLVED", "REJECTED"];
const REASONS: ReportReason[] = [
  "FILE_RUSAK",
  "SALAH_MATA_KULIAH",
  "SALAH_SEMESTER",
  "SALAH_TAHUN",
  "SOAL_DUPLIKAT",
  "KONTEN_TIDAK_PANTAS",
  "HAK_CIPTA",
  "LAINNYA",
];

export default function AdminReportPanel() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);

  const [statusFilter, setStatusFilter] = useState("");
  const [reasonFilter, setReasonFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const handleFilterChange =
    (setter: (v: string) => void) => (value: string) => {
      setter(value === "ALL" ? "" : value);
      setPage(1);
    };

  const resetFilters = () => {
    setSearchInput("");
    setStatusFilter("");
    setReasonFilter("");
    setSortBy("createdAt");
    setOrder("desc");
    setPage(1);
  };

  const hasActiveFilters =
    searchInput ||
    statusFilter ||
    reasonFilter ||
    sortBy !== "createdAt" ||
    order !== "desc";

  return (
    <div className="space-y-6">
      {/* Panel Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm">
          <Flag className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Manajemen Laporan
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tinjau dan kelola laporan soal yang dikirim oleh pengguna
          </p>
        </div>
      </div>

      <Separator />

      {/* Filter Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="admin-report-search"
              placeholder="Cari soal atau mata kuliah..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(1);
              }}
              className="pl-9 text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />

            {/* Status filter */}
            <Select
              value={statusFilter || "ALL"}
              onValueChange={handleFilterChange(setStatusFilter)}
            >
              <SelectTrigger
                id="admin-report-status-filter"
                className="h-9 w-[148px] text-sm"
              >
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Status</SelectItem>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {REPORT_STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Reason filter */}
            <Select
              value={reasonFilter || "ALL"}
              onValueChange={handleFilterChange(setReasonFilter)}
            >
              <SelectTrigger
                id="admin-report-reason-filter"
                className="h-9 w-[165px] text-sm"
              >
                <SelectValue placeholder="Semua Alasan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Alasan</SelectItem>
                {REASONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {REPORT_REASON_LABELS[r]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort by */}
            <Select
              value={sortBy}
              onValueChange={(v) => {
                setSortBy(v);
                setPage(1);
              }}
            >
              <SelectTrigger
                id="admin-report-sortby"
                className="h-9 w-[140px] text-sm"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Tgl. Laporan</SelectItem>
                <SelectItem value="updatedAt">Tgl. Diperbarui</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="reason">Alasan</SelectItem>
              </SelectContent>
            </Select>

            {/* Order toggle */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 text-xs"
              onClick={() => setOrder((o) => (o === "desc" ? "asc" : "desc"))}
              id="admin-report-order-toggle"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              {order === "desc" ? "Terbaru" : "Terlama"}
            </Button>

            {/* Reset */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 gap-1.5 text-xs text-slate-500 hover:text-slate-800"
                onClick={resetFilters}
                id="admin-report-reset"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <AdminReportTable
        search={debouncedSearch}
        statusFilter={statusFilter}
        reasonFilter={reasonFilter}
        sortBy={sortBy}
        order={order}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
}
