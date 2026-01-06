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
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {exams.groupedByProdi.map((prodiData) => {
        const sortedSemesters = prodiData.semesters
          .slice()
          .sort((a, b) => a.semester - b.semester);
        return (
          <div
            key={prodiData.prodi}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-900"
          >
            <div className="bg-gradient-to-br from-blue-700 to-sky-900 p-4 text-white sm:p-6 dark:from-blue-900 dark:to-gray-900">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-bold text-gray-100 sm:text-lg">
                  {formatProdiName(prodiData.prodi)}
                </h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 dark:bg-gray-700 dark:text-white">
                  {prodiData.totalUploads} Soal
                </span>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 dark:bg-gray-900">
              {prodiData.totalUploads === 0 ? (
                <div className="py-6 text-center text-slate-500 sm:py-8 dark:text-slate-400">
                  <Sparkles className="mx-auto mb-2 h-10 w-10 opacity-50 sm:h-12 sm:w-12" />
                  <p className="text-sm sm:text-base">
                    Belum ada data soal yang diupload.
                  </p>
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
