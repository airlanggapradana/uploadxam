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
                    <FileArchive />
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
                        <FaComputer className={"h-7 w-7"} />
                      )}
                      {prodi.prodi === "Sistem_Informasi" && (
                        <IoHardwareChipOutline className={"h-7 w-7"} />
                      )}
                      {prodi.prodi === "Ilmu_Komunikasi" && (
                        <FaPeopleRobbery className={"h-7 w-7"} />
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
