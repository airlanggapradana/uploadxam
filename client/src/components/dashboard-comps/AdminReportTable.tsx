"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Trash2,
  Eye,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Bot,
  CheckCircle2,
  Clock,
  Search,
  Hourglass,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  useGetAdminReports,
  useUpdateReportStatus,
  useDeleteReport,
} from "@/utils/query";
import type { Report, ReportStatus } from "@/types/report.type";
import {
  REPORT_REASON_LABELS,
  REPORT_STATUS_LABELS,
} from "@/types/report.type";

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ReportStatus }) {
  const config: Record<
    ReportStatus,
    { label: string; class: string; icon: React.ReactNode }
  > = {
    PENDING: {
      label: REPORT_STATUS_LABELS.PENDING,
      class:
        "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
      icon: <Hourglass className="h-3 w-3" />,
    },
    UNDER_REVIEW: {
      label: REPORT_STATUS_LABELS.UNDER_REVIEW,
      class:
        "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800",
      icon: <Search className="h-3 w-3" />,
    },
    RESOLVED: {
      label: REPORT_STATUS_LABELS.RESOLVED,
      class:
        "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    REJECTED: {
      label: REPORT_STATUS_LABELS.REJECTED,
      class:
        "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800",
      icon: <XCircle className="h-3 w-3" />,
    },
  };

  const c = config[status];
  return (
    <Badge
      variant="outline"
      className={`flex w-fit items-center gap-1.5 text-xs font-medium ${c.class}`}
    >
      {c.icon}
      {c.label}
    </Badge>
  );
}

// ─── Detail Dialog ─────────────────────────────────────────────────────────────
function ReportDetailDialog({
  report,
  open,
  onClose,
}: {
  report: Report | null;
  open: boolean;
  onClose: () => void;
}) {
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateReportStatus();

  if (!report) return null;

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus({ id: report.id, status: newStatus });
      toast.success("Status laporan berhasil diperbarui", {
        richColors: true,
        position: "top-center",
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal memperbarui status", {
        richColors: true,
        position: "top-center",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        id={`report-detail-dialog-${report.id}`}
        className="max-h-[90vh] max-w-lg overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-base">Detail Laporan</DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            ID: {report.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          {/* Exam info */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Soal yang Dilaporkan
            </p>
            <p className="mt-1 font-medium text-slate-800 dark:text-slate-100">
              {report.exam.title}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {report.exam.mata_kuliah} · {report.exam.tipe_soal} ·{" "}
              {report.exam.year} · {report.exam.prodi.replace(/_/g, " ")}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Diunggah oleh: {report.exam.user.name} ({report.exam.user.nim})
            </p>
            <a
              href={report.exam.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline dark:text-blue-400"
              id={`report-detail-exam-link-${report.id}`}
            >
              <ExternalLink className="h-3 w-3" />
              Lihat File Soal
            </a>
          </div>

          {/* Report reason + description */}
          <div className="space-y-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Alasan
              </p>
              <p className="mt-1 text-slate-800 dark:text-slate-200">
                {REPORT_REASON_LABELS[report.reason]}
              </p>
            </div>
            {report.description && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Deskripsi
                </p>
                <p className="mt-1 whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                  {report.description}
                </p>
              </div>
            )}
          </div>

          {/* AI Summary */}
          {report.aiSummary && (
            <div className="rounded-lg border border-violet-200 bg-violet-50 p-3 dark:border-violet-800 dark:bg-violet-950/30">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
                <Bot className="h-3.5 w-3.5" />
                Ringkasan AI
              </p>
              <p className="mt-1 text-sm italic text-violet-800 dark:text-violet-300">
                &ldquo;{report.aiSummary}&rdquo;
              </p>
            </div>
          )}

          <Separator />

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-semibold text-slate-500">Status</p>
              <div className="mt-1">
                <StatusBadge status={report.status} />
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-500">Anonim</p>
              <p className="mt-1 text-slate-700 dark:text-slate-300">
                {report.anonymous ? "Ya" : "Tidak"}
              </p>
            </div>
            {report.email && !report.anonymous && (
              <div>
                <p className="font-semibold text-slate-500">Email</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                  {report.email}
                </p>
              </div>
            )}
            <div>
              <p className="font-semibold text-slate-500">Tanggal</p>
              <p className="mt-1 text-slate-700 dark:text-slate-300">
                {new Date(report.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Status changer */}
          <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Ubah Status
            </p>
            <div className="flex items-center gap-2">
              <Select
                value={report.status}
                onValueChange={handleStatusChange}
                disabled={isUpdating}
              >
                <SelectTrigger
                  id={`report-status-select-${report.id}`}
                  className="h-8 text-xs"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">
                    {REPORT_STATUS_LABELS.PENDING}
                  </SelectItem>
                  <SelectItem value="UNDER_REVIEW">
                    {REPORT_STATUS_LABELS.UNDER_REVIEW}
                  </SelectItem>
                  <SelectItem value="RESOLVED">
                    {REPORT_STATUS_LABELS.RESOLVED}
                  </SelectItem>
                  <SelectItem value="REJECTED">
                    {REPORT_STATUS_LABELS.REJECTED}
                  </SelectItem>
                </SelectContent>
              </Select>
              {isUpdating && (
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
interface AdminReportTableProps {
  search: string;
  statusFilter: string;
  reasonFilter: string;
  sortBy: string;
  order: "asc" | "desc";
  page: number;
  onPageChange: (p: number) => void;
}

export default function AdminReportTable({
  search,
  statusFilter,
  reasonFilter,
  sortBy,
  order,
  page,
  onPageChange,
}: AdminReportTableProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetAdminReports({
    page,
    limit: 10,
    status: statusFilter || undefined,
    reason: reasonFilter || undefined,
    search: search || undefined,
    sortBy,
    order,
  });

  const { mutateAsync: deleteReport, isPending: isDeleting } = useDeleteReport();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteReport(deleteTarget);
      toast.success("Laporan berhasil dihapus", {
        richColors: true,
        position: "top-center",
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal menghapus laporan", {
        richColors: true,
        position: "top-center",
      });
    } finally {
      setDeleteTarget(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-slate-500">
        <XCircle className="h-8 w-8 text-red-400" />
        <p className="text-sm">Gagal memuat laporan</p>
      </div>
    );
  }

  const { data: reports, meta } = data;

  return (
    <>
      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableHead className="text-xs font-semibold uppercase tracking-wide">
                Soal
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide">
                Alasan
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide">
                AI Summary
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide">
                Tanggal
              </TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-16 text-center text-sm text-slate-400"
                >
                  <Clock className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  Belum ada laporan
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow
                  key={report.id}
                  className="transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60"
                >
                  <TableCell className="max-w-[180px]">
                    <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                      {report.exam.title}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {report.exam.mata_kuliah} · {report.exam.tipe_soal} ·{" "}
                      {report.exam.year}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-slate-700 dark:text-slate-300">
                    {REPORT_REASON_LABELS[report.reason]}
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    {report.aiSummary ? (
                      <span className="flex items-start gap-1 text-xs italic text-violet-600 dark:text-violet-400">
                        <Bot className="mt-0.5 h-3 w-3 shrink-0" />
                        <span className="line-clamp-2">{report.aiSummary}</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={report.status} />
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {new Date(report.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                        title="Lihat detail"
                        id={`report-view-${report.id}`}
                        onClick={() => {
                          setSelectedReport(report);
                          setDetailOpen(true);
                        }}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                        title="Hapus laporan"
                        id={`report-delete-${report.id}`}
                        onClick={() => setDeleteTarget(report.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <p>
            Menampilkan {(meta.page - 1) * meta.limit + 1}–
            {Math.min(meta.page * meta.limit, meta.total)} dari {meta.total}{" "}
            laporan
          </p>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              disabled={meta.page <= 1}
              onClick={() => onPageChange(meta.page - 1)}
              id="report-pagination-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-2 text-xs">
              {meta.page} / {meta.totalPages}
            </span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              disabled={meta.page >= meta.totalPages}
              onClick={() => onPageChange(meta.page + 1)}
              id="report-pagination-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Detail Dialog */}
      <ReportDetailDialog
        report={selectedReport}
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedReport(null);
        }}
      />

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent id="report-delete-confirm-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Laporan?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Laporan akan dihapus
              permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel id="report-delete-cancel">Batal</AlertDialogCancel>
            <AlertDialogAction
              id="report-delete-confirm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Hapus"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
