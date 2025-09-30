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
        <div className={"grid grid-cols-4 gap-5"}>
          <Card>
            <CardHeader className={"flex items-center justify-between"}>
              <div className={"space-y-2"}>
                <CardTitle>
                  <span className="flex items-center gap-2">
                    <div className={"rounded-md bg-teal-200 p-2"}>
                      <FileArchive className={"text-teal-700"} />
                    </div>
                    Total Files Uploaded
                  </span>
                </CardTitle>
                <CardDescription>
                  menampilkan total file yang telah diunggah.
                </CardDescription>
              </div>
              <div className={"text-2xl font-bold"}>{exams.totalUploads}</div>
            </CardHeader>
          </Card>
          {exams.groupedByProdi.map((prodi, idx) => (
            <Card key={idx}>
              <CardHeader className={"flex items-center justify-between"}>
                <div className={"space-y-2"}>
                  <CardTitle>
                    <span className="flex items-center gap-2">
                      {prodi.prodi === "Informatika" && (
                        <div className={"rounded-md bg-sky-200 p-2"}>
                          <FaComputer className={"h-6 w-6 text-sky-600"} />
                        </div>
                      )}
                      {prodi.prodi === "Sistem_Informasi" && (
                        <div className={"rounded-md bg-amber-200 p-2"}>
                          <IoHardwareChipOutline
                            className={"h-6 w-6 text-amber-600"}
                          />
                        </div>
                      )}
                      {prodi.prodi === "Ilmu_Komunikasi" && (
                        <div className={"rounded-md bg-indigo-200 p-2"}>
                          <FaPeopleRobbery
                            className={"h-6 w-6 text-indigo-600"}
                          />
                        </div>
                      )}
                      {prodi.prodi.replace("_", " ")}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    menampilkan total file yang telah diunggah.
                  </CardDescription>
                </div>
                <div className={"text-2xl font-bold"}>{prodi.totalUploads}</div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Stats;
