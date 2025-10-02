import React from "react";
import { useExamSession } from "@/hooks/context";
import { Sparkles } from "lucide-react";
import SemesterAccordion from "@/components/dashboard-comps/SemesterAccordion";

const ProdiGrid = () => {
  const exams = useExamSession();
  const formatProdiName = (prodi: string) => {
    return prodi.replace(/_/g, " ");
  };
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {exams.groupedByProdi.map((prodiData) => {
        const sortedSemesters = prodiData.semesters
          .slice()
          .sort((a, b) => a.semester - b.semester);
        return (
          <div
            key={prodiData.prodi}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800"
          >
            <div className="bg-gradient-to-br from-teal-700 to-gray-800 p-6 text-white dark:from-teal-900 dark:to-gray-900">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-100">
                  {formatProdiName(prodiData.prodi)}
                </h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 dark:bg-gray-700 dark:text-white">
                  {prodiData.totalUploads} Soal
                </span>
              </div>
            </div>

            <div className="bg-white p-6 dark:bg-gray-800">
              {prodiData.totalUploads === 0 ? (
                <div className="py-8 text-center text-slate-500 dark:text-slate-400">
                  <Sparkles className="mx-auto mb-2 h-12 w-12 opacity-50" />
                  <p>Belum ada data soal yang diupload.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedSemesters.map((semester) => (
                    <SemesterAccordion
                      key={semester.semester}
                      semester={semester}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProdiGrid;
