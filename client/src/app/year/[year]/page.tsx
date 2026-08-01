import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/landing-page/Navbar";
import { Breadcrumb } from "@/components/reusables/Breadcrumb";
import { JsonLd } from "@/components/reusables/JsonLd";
import { SeoDirectory } from "@/components/landing-page/SeoDirectory";
import {
  PRODI_SLUG_MAP,
  PRODI_DISPLAY_NAMES,
  buildPageMetadata,
  generateCollectionPageSchema,
} from "@/utils/seo-helpers";
import { Calendar, GraduationCap, ArrowRight, Search } from "lucide-react";

interface PageProps {
  params: Promise<{ year: string }>;
}

export function generateStaticParams() {
  const years = ["2026", "2025", "2024", "2023", "2022", "2021", "2020"];
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const yearNum = parseInt(resolvedParams.year, 10);

  if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
    return buildPageMetadata({
      title: "Tahun Akademik Tidak Ditemukan",
      description: "Halaman tahun akademik tidak ditemukan di UploadXam FKI UMS.",
      canonicalPath: `/year/${resolvedParams.year}`,
    });
  }

  return buildPageMetadata({
    title: `Arsip Soal Ujian Tahun ${yearNum} | UploadXam UMS`,
    description: `Kumpulan arsip soal ujian UTS & UAS Tahun Akademik ${yearNum} Fakultas Komunikasi dan Informatika UMS. Akses gratis PDF latihan soal dari Informatika, Sistem Informasi, Ilmu Komunikasi & AI.`,
    keywords: [
      `soal ujian tahun ${yearNum}`,
      `UTS ${yearNum} UMS`,
      `UAS ${yearNum} UMS`,
      `soal UMS ${yearNum}`,
      "FKI UMS",
      "UploadXam",
    ],
    canonicalPath: `/year/${resolvedParams.year}`,
  });
}

export default async function YearPage({ params }: PageProps) {
  const resolvedParams = await params;
  const yearNum = parseInt(resolvedParams.year, 10);

  if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
    notFound();
  }

  const prodiKeys = Object.keys(PRODI_SLUG_MAP);
  const yearsList = [2026, 2025, 2024, 2023, 2022, 2021];

  const breadcrumbs = [
    { name: "Tahun Akademik", url: "/explore" },
    { name: `Tahun ${yearNum}`, url: `/year/${resolvedParams.year}` },
  ];

  const jsonLdData = generateCollectionPageSchema({
    name: `Arsip Soal Ujian Tahun ${yearNum} FKI UMS`,
    description: `Kumpulan arsip soal UTS dan UAS Tahun Akademik ${yearNum} FKI UMS.`,
    url: `/year/${resolvedParams.year}`,
    breadcrumbs,
  });

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      <JsonLd data={jsonLdData} />

      <main className="container mx-auto px-4 py-28 max-w-5xl">
        <Breadcrumb items={breadcrumbs} />

        {/* Hero Section */}
        <section className="mt-6 mb-10 bg-neutral-900/70 p-8 rounded-2xl border border-neutral-800 backdrop-blur">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-red-900/60 border border-red-700/50 text-red-300 text-xs font-semibold rounded-full uppercase">
              Arsip Tahun Akademik
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Arsip Soal Ujian Tahun {yearNum}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
            Halaman ini menampilkan direktori dokumen soal ujian Midterm (UTS) dan Final Exam (UAS) yang diselenggarakan pada <strong className="text-white font-semibold">Tahun Akademik {yearNum}</strong> di seluruh Program Studi Fakultas Komunikasi dan Informatika UMS.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-red-900/30"
            >
              <Search className="w-4 h-4" />
              Eksplorasi Semua Soal
            </Link>
          </div>
        </section>

        {/* Switch Years Bar */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-500" />
            Pilih Tahun Akademik Lainnya
          </h2>
          <div className="flex flex-wrap gap-2">
            {yearsList.map((y) => {
              const isCurrent = y === yearNum;
              return (
                <Link
                  key={y}
                  href={`/year/${y}`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    isCurrent
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-gray-300"
                  }`}
                >
                  Tahun {y}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Prodi Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-red-500" />
            Arsip Soal Tahun {yearNum} Menurut Program Studi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prodiKeys.map((slug) => {
              const displayName = PRODI_DISPLAY_NAMES[slug];
              return (
                <Link
                  key={slug}
                  href={`/program/${slug}`}
                  className="p-6 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all flex items-center justify-between group"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                      {displayName}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Koleksi Soal UTS & UAS Tahun {yearNum}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <SeoDirectory />
    </div>
  );
}
