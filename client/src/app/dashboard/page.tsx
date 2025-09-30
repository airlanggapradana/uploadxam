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

const Dashboard = () => {
  const [prodi, setProdi] = React.useState<
    "Informatika" | "Sistem Informasi" | "Ilmu_Komunikasi" | "All"
  >("All");

  const { data: exams, isLoading, error } = useGetExams(prodi);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!exams) return <div>No data available</div>;
  return (
    <ExamSessionProvider value={exams}>
      <main className={"w-full p-4"}>
        <div className={"space-y-5"}>
          <Select
            value={prodi}
            onValueChange={(value) => setProdi(value as typeof prodi)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Informatika">Informatika</SelectItem>
              <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
              <SelectItem value="Ilmu_Komunikasi">Ilmu Komunikasi</SelectItem>
              <SelectItem value="All">All</SelectItem>
            </SelectContent>
          </Select>
          <Stats />
        </div>
      </main>
    </ExamSessionProvider>
  );
};

export default Dashboard;
