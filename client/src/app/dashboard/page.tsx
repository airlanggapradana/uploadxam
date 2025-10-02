"use client";
import React from "react";
import Stats from "@/components/dashboard-comps/Stats";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetExams } from "@/utils/query";
import { ExamSessionProvider } from "@/hooks/context";
import ProdiGrid from "@/components/dashboard-comps/ProdiGrid";
import { Warning } from "@/components/reusables/Warning";
import DialogAddFileUpload from "@/components/dashboard-comps/DialogAddFileUpload";
import { Separator } from "@/components/ui/separator";
import { DashboardLoadingSkeleton } from "@/components/dashboard-comps/DashboardLoadingSkeleton";

const Dashboard = () => {
  const [prodi, setProdi] = React.useState<
    "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi" | "All"
  >("All");

  const { data: exams, isLoading, error } = useGetExams(prodi);
  if (isLoading) return <DashboardLoadingSkeleton />;
  if (error) return <div>Error: {error.message}</div>;
  if (!exams) return <div>No data available</div>;

  return (
    <ExamSessionProvider value={exams}>
      <main className={"w-full p-4"}>
        <div className={"space-y-5"}>
          <Warning
            title={"Mohon Perhatiannya!"}
            description={
              "Jika kamu menemukan soal yang tidak sesuai atau ada masalah lainnya, silakan laporkan ke admin melalui WhatsApp di nomor 081234567890. Terima kasih atas partisipasimu!"
            }
            className={"border-amber-200 bg-amber-100 text-amber-800"}
          />

          <Separator />

          <div className={"flex items-center justify-between"}>
            <Select
              value={prodi}
              onValueChange={(value) => setProdi(value as typeof prodi)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Informatika">Informatika</SelectItem>
                <SelectItem value="Sistem_Informasi">
                  Sistem Informasi
                </SelectItem>
                <SelectItem value="Ilmu_Komunikasi">Ilmu Komunikasi</SelectItem>
                <SelectItem value="All">All</SelectItem>
              </SelectContent>
            </Select>
            <DialogAddFileUpload />
          </div>
          <Stats />

          <ProdiGrid />
        </div>
      </main>
    </ExamSessionProvider>
  );
};

export default Dashboard;
