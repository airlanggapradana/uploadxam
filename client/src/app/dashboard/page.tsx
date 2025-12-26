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
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { NextStepProvider, NextStep, useNextStep } from "nextstepjs";
import { Button } from "@/components/ui/button";
import { steps } from "@/utils/DashboardTour";
import TourCustomCard from "@/components/dashboard-comps/TourCustomCard";
import RecentActivities from "@/components/dashboard-comps/RecentActivities";

const DashboardTourButton = () => {
  const { startNextStep, closeNextStep } = useNextStep();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => startNextStep("uploadxam-tour")}
        className="text-xs sm:text-sm"
      >
        🚀 Mulai Tour
      </Button>
      <Button
        variant="outline"
        onClick={() => closeNextStep()}
        className="text-xs sm:text-sm"
      >
        🔁 Reset
      </Button>
    </div>
  );
};

const Dashboard = () => {
  const [prodi, setProdi] = React.useState<
    "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi" | "All"
  >("All");
  const [subject, setSubject] = React.useState<string | undefined>(undefined);
  const [tipeSoal, setTipeSoal] = React.useState<"UTS" | "UAS" | undefined>(
    undefined,
  );
  const [kategori, setKategori] = React.useState<
    "REGULER" | "INTER" | undefined
  >(undefined);
  const [debouncedSubject] = useDebounce(subject, 1000);

  const {
    data: exams,
    isLoading,
    error,
  } = useGetExams({
    prodi,
    subject: debouncedSubject,
    tipe_soal: tipeSoal,
    kategori: kategori,
  });
  if (isLoading) return <DashboardLoadingSkeleton />;
  if (error) return <div>Error: {error.message}</div>;
  if (!exams) return <div>No data available</div>;

  return (
    <ExamSessionProvider value={exams}>
      <main className="w-full p-2 sm:p-4 dark:bg-gray-900">
        <NextStepProvider>
          <NextStep
            steps={steps}
            cardComponent={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              TourCustomCard as unknown as React.ComponentType<any>
            }
          >
            <div className="space-y-4 sm:space-y-5">
              <Warning
                title={"Mohon Perhatiannya!"}
                description={
                  "Jika kamu menemukan soal yang tidak sesuai atau ada masalah lainnya, silakan laporkan ke admin melalui WhatsApp di nomor 081227151326. Terima kasih atas partisipasimu!"
                }
                className={"border-amber-200 bg-amber-100 text-amber-800"}
              />

              <Separator />

              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="space-y-3">
                  <div id={"tour1-step1"} className="flex flex-wrap gap-3">
                    <div>
                      <Select
                        value={prodi}
                        onValueChange={(value) =>
                          setProdi(value as typeof prodi)
                        }
                      >
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Select Program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Informatika">
                            Informatika
                          </SelectItem>
                          <SelectItem value="Sistem_Informasi">
                            Sistem Informasi
                          </SelectItem>
                          <SelectItem value="Ilmu_Komunikasi">
                            Ilmu Komunikasi
                          </SelectItem>
                          <SelectItem value="All">All</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Select
                      value={tipeSoal ?? "all"}
                      onValueChange={(value) =>
                        setTipeSoal(
                          value === "all"
                            ? undefined
                            : (value as "UTS" | "UAS"),
                        )
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Tipe Soal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Tipe</SelectItem>
                        <SelectItem value="UTS">UTS</SelectItem>
                        <SelectItem value="UAS">UAS</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={kategori ?? "all"}
                      onValueChange={(value) =>
                        setKategori(
                          value === "all"
                            ? undefined
                            : (value as "REGULER" | "INTER"),
                        )
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kategori</SelectItem>
                        <SelectItem value="REGULER">Reguler</SelectItem>
                        <SelectItem value="INTER">Inter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div id={"tour1-step2"} className="relative w-full sm:w-72">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                        />
                      </svg>
                    </span>
                    <Input
                      className="w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
                      placeholder={"Cari mata kuliah..."}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className={
                    "flex flex-wrap items-center justify-between gap-3 sm:justify-end"
                  }
                >
                  <DashboardTourButton />
                  <div id={"tour1-step3"}>
                    <DialogAddFileUpload />
                  </div>
                </div>
              </div>

              <div id={"tour1-step4"}>
                <Stats />
              </div>

              <div id={"tour1-step5"}>
                <ProdiGrid />
              </div>

              <div id={"tour1-step6"}>
                <RecentActivities />
              </div>
            </div>
          </NextStep>
        </NextStepProvider>
      </main>
    </ExamSessionProvider>
  );
};

export default Dashboard;
