import React from "react";
import Link from "next/link";
import { PRODI_SLUG_MAP, PRODI_DISPLAY_NAMES, slugify } from "@/utils/seo-helpers";
import { COURSES_BY_PRODI } from "@/data/courses";
import { BookOpen, FolderTree, Calendar, GraduationCap } from "lucide-react";

export function SeoDirectory() {
  const prodiKeys = Object.keys(PRODI_SLUG_MAP);
  const years = [2026, 2025, 2024, 2023, 2022, 2021];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="bg-neutral-950 py-16 text-gray-300 border-t border-neutral-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Direktori Bank Soal FKI UMS
          </h2>
          <p className="mt-2 text-sm text-gray-400 max-w-2xl mx-auto">
            Jelajahi koleksi soal UTS & UAS berdasarkan program studi, mata kuliah, semester, dan tahun akademik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Prodi & Subjects */}
          {prodiKeys.map((slug) => {
            const prodiKey = PRODI_SLUG_MAP[slug] || "";
            const prodiName = PRODI_DISPLAY_NAMES[slug] || slug;
            const topCourses: string[] = (COURSES_BY_PRODI[prodiKey] || []).slice(0, 6);

            return (
              <div key={slug} className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-red-500" />
                    <Link
                      href={`/program/${slug}`}
                      className="font-semibold text-white hover:text-red-400 transition-colors text-base"
                    >
                      {prodiName}
                    </Link>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-400">
                    {topCourses.map((course) => (
                      <li key={course}>
                        <Link
                          href={`/program/${slug}/subject/${slugify(course)}`}
                          className="hover:text-white transition-colors block truncate"
                        >
                          • {course}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-800">
                  <Link
                    href={`/program/${slug}`}
                    className="text-xs text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1"
                  >
                    Lihat Semua Soal {prodiName} &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Semesters & Academic Years */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-neutral-900/40 p-6 rounded-xl border border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FolderTree className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-white">Arsip per Semester</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {semesters.map((sem) => (
                <Link
                  key={sem}
                  href={`/program/teknik-informatika/semester/${sem}`}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-red-950 hover:text-red-300 text-xs font-medium text-gray-300 rounded-md border border-neutral-700 transition-colors"
                >
                  Semester {sem}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-white">Arsip per Tahun Akademik</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {years.map((year) => (
                <Link
                  key={year}
                  href={`/year/${year}`}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-red-950 hover:text-red-300 text-xs font-medium text-gray-300 rounded-md border border-neutral-700 transition-colors"
                >
                  Tahun {year}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
