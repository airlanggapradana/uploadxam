"use client";

import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Flag, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createReportSchema, type ReportInput } from "@/zod/zod.validation";
import { useCreateReport } from "@/utils/query";
import { REPORT_REASON_LABELS } from "@/types/report.type";

const REPORT_REASONS = [
  "FILE_RUSAK",
  "SALAH_MATA_KULIAH",
  "SALAH_SEMESTER",
  "SALAH_TAHUN",
  "SOAL_DUPLIKAT",
  "KONTEN_TIDAK_PANTAS",
  "HAK_CIPTA",
  "LAINNYA",
] as const;

interface DialogReportSoalProps {
  examId: string;
  examTitle: string;
}

export default function DialogReportSoal({
  examId,
  examTitle,
}: DialogReportSoalProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: submitReport, isPending } = useCreateReport();

  const form = useForm<ReportInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createReportSchema as any),
    defaultValues: {
      examId,
      reason: undefined,
      description: "",
      email: "",
      anonymous: false,
    },
  });

  const selectedReason = form.watch("reason");
  const isLainnya = selectedReason === "LAINNYA";
  const charCount = form.watch("description")?.length ?? 0;

  const onSubmit: SubmitHandler<ReportInput> = async (data) => {
    try {
      await submitReport({
        ...data,
        description: data.description?.trim() || undefined,
        email: data.email?.trim() || undefined,
      });
      toast.success("Laporan berhasil dikirim.", {
        description: "Tim kami akan meninjau laporan ini segera.",
        richColors: true,
        position: "top-center",
      });
      form.reset();
      setOpen(false);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Gagal mengirim laporan.";
      toast.error(message, { richColors: true, position: "top-center" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          id={`report-btn-${examId}`}
          title="Laporkan soal ini"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-red-500 transition-all hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
        >
          <Flag className="h-3.5 w-3.5" />
          <span>Laporkan</span>
        </button>
      </DialogTrigger>

      <DialogContent
        id={`report-dialog-${examId}`}
        className="max-h-[90vh] max-w-md overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <Flag className="h-5 w-5" />
            Laporkan Soal
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {examTitle}
            </span>
            <br />
            Bantu kami menjaga kualitas konten dengan melaporkan soal bermasalah.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 space-y-5"
          >
            {/* Reason */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Alasan Laporan <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="mt-1 grid grid-cols-1 gap-1.5"
                      id={`report-reason-group-${examId}`}
                    >
                      {REPORT_REASONS.map((r) => (
                        <div
                          key={r}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${
                            field.value === r
                              ? "border-red-500 bg-red-50 dark:border-red-600 dark:bg-red-950/30"
                              : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                          }`}
                        >
                          <RadioGroupItem
                            value={r}
                            id={`report-reason-${examId}-${r}`}
                          />
                          <Label
                            htmlFor={`report-reason-${examId}-${r}`}
                            className="cursor-pointer text-sm"
                          >
                            {REPORT_REASON_LABELS[r]}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description — always shown, required for Lainnya */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Deskripsi{" "}
                    {isLainnya ? (
                      <span className="text-red-500">*</span>
                    ) : (
                      <span className="text-slate-400 font-normal">
                        (opsional)
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id={`report-description-${examId}`}
                      placeholder={
                        isLainnya
                          ? "Jelaskan masalah dengan detail (min. 10 karakter)..."
                          : "Tambahkan detail tambahan jika diperlukan..."
                      }
                      className="min-h-[90px] resize-none text-sm"
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex items-center justify-between">
                    <FormMessage />
                    <span
                      className={`ml-auto text-xs ${
                        charCount > 480
                          ? "text-red-500"
                          : "text-slate-400"
                      }`}
                    >
                      {charCount}/500
                    </span>
                  </div>
                </FormItem>
              )}
            />

            {/* Email (optional) */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Email{" "}
                    <span className="text-slate-400 font-normal">
                      (opsional — untuk notifikasi tindak lanjut)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={`report-email-${examId}`}
                      type="email"
                      placeholder="email@example.com"
                      className="text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Anonymous */}
            <FormField
              control={form.control}
              name="anonymous"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-700">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-semibold">
                        Laporkan Secara Anonim
                      </FormLabel>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Identitas Anda tidak akan ditampilkan ke admin
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        id={`report-anonymous-${examId}`}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
                disabled={isPending}
                className="gap-1.5"
              >
                <X className="h-3.5 w-3.5" />
                Batal
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isPending}
                className="gap-1.5 bg-red-600 text-white hover:bg-red-700"
                id={`report-submit-${examId}`}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Flag className="h-3.5 w-3.5" />
                    Kirim Laporan
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
