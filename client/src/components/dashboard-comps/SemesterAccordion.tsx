import type { Semester } from "@/types/get-exams.type";
import { BookOpen, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { BiUser } from "react-icons/bi";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function SemesterAccordion({ semester }: { semester: Semester }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="mb-2 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700"
    >
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              Semester <span className={"ml-2"}>{semester.semester}</span>
            </span>
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              {semester.totalUploads}
            </span>
          </div>
          {open ? (
            <ChevronUp className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-3 bg-white p-4 dark:bg-slate-900">
          {semester.uploads.map((upload) => (
            <div
              key={upload.id}
              className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-teal-400"
            >
              <div className="mb-2 flex items-start justify-between">
                <h4 className="line-clamp-1 font-medium text-slate-800 dark:text-slate-100">
                  {upload.title}
                </h4>
                <div className={"flex items-center gap-3"}>
                  <Badge
                    className={`${
                      upload.tipe_soal === "UAS"
                        ? "bg-blue-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {upload.tipe_soal}
                  </Badge>
                  <Badge
                    className={`${
                      upload.kategori === "REGULER"
                        ? "bg-gray-500 text-white"
                        : "bg-sky-500 text-white"
                    }`}
                  >
                    {upload.kategori}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 dark:text-slate-300" />
                  <span>{upload.mata_kuliah}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 dark:text-slate-300" />
                  <span>Tahun {upload.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BiUser className="h-4 w-4 dark:text-slate-300" />
                  <span className="text-xs">{upload.user.name}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(upload.uploadedAt).toLocaleTimeString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
                <Link
                  href={upload.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Lihat File →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default SemesterAccordion;
