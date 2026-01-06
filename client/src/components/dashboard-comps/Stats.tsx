import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileArchive } from "lucide-react";
import NotFound from "@/components/dashboard-comps/NotFound";
import { FaComputer, FaPeopleRobbery } from "react-icons/fa6";
import { IoHardwareChipOutline } from "react-icons/io5";
import { useExamSession } from "@/hooks/context";

const Stats = () => {
  const exams = useExamSession();
  return (
    <>
      {exams.groupedByProdi.length === 0 && exams.totalUploads === 0 ? (
        <NotFound />
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="space-y-3 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-md bg-teal-200 p-2 dark:bg-teal-900/30">
                  <FileArchive className="h-5 w-5 text-teal-700 sm:h-6 sm:w-6 dark:text-teal-400" />
                </div>
                <div className="text-2xl font-bold sm:text-3xl">
                  {exams.totalUploads}
                </div>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base sm:text-lg">
                  Total Files Uploaded
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Menampilkan total file yang telah diunggah
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          {exams.groupedByProdi.map((prodi, idx) => (
            <Card key={idx} className="transition-shadow hover:shadow-lg">
              <CardHeader className="space-y-3 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`rounded-md p-2 ${
                      prodi.prodi === "Informatika"
                        ? "bg-sky-200 dark:bg-sky-900/30"
                        : prodi.prodi === "Sistem_Informasi"
                          ? "bg-amber-200 dark:bg-amber-900/30"
                          : "bg-indigo-200 dark:bg-indigo-900/30"
                    }`}
                  >
                    {prodi.prodi === "Informatika" && (
                      <FaComputer className="h-5 w-5 text-sky-600 sm:h-6 sm:w-6 dark:text-sky-400" />
                    )}
                    {prodi.prodi === "Sistem_Informasi" && (
                      <IoHardwareChipOutline className="h-5 w-5 text-amber-600 sm:h-6 sm:w-6 dark:text-amber-400" />
                    )}
                    {prodi.prodi === "Ilmu_Komunikasi" && (
                      <FaPeopleRobbery className="h-5 w-5 text-indigo-600 sm:h-6 sm:w-6 dark:text-indigo-400" />
                    )}
                  </div>
                  <div className="text-2xl font-bold sm:text-3xl">
                    {prodi.totalUploads}
                  </div>
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base sm:text-lg">
                    {prodi.prodi.replace("_", " ")}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Menampilkan total file yang telah diunggah
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Stats;
