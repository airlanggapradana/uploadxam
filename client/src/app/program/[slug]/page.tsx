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
  getProdiFromSlug,
  getDisplayNameFromProdi,
  slugify,
  buildPageMetadata,
  generateCollectionPageSchema,
} from "@/utils/seo-helpers";
import { COURSES_BY_PRODI } from "@/data/courses";
import { BookOpen, Calendar, GraduationCap, ArrowRight, FileText } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(PRODI_SLUG_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const prodiKey = getProdiFromSlug(resolvedParams.slug);

  if (!prodiKey) {
    return buildPageMetadata({
      title: "Program Studi Tidak Ditemukan",
      description: "Halaman program studi yang Anda cari tidak ditemukan di UploadXam FKI UMS.",
      canonicalPath: `/program/${resolvedParams.slug}`,
    });
  }

  const displayName = getDisplayNameFromProdi(prodiKey);
  const courses = COURSES_BY_PRODI[prodiKey] || [];

  return buildPageMetadata({
    title: `${displayName} | Bank Soal UMS`,
    description: `Kumpulan bank soal UTS dan UAS ${displayName} FKI Universitas Muhammadiyah Surakarta. Akses gratis ${courses.length}+ arsip mata kuliah dari berbagai semester.`,
    keywords: [
      `bank soal ${displayName}`,
      `soal UTS ${displayName} UMS`,
      `soal UAS ${displayName} UMS`,
      `arsip ujian ${displayName}`,
      "FKI UMS",
      "UploadXam",
    ],
    canonicalPath: `/program/${resolvedParams.slug}`,
  });
}

export default async function ProgramPage({ params }: PageProps) {
  const resolvedParams = await params;
  const prodiKey = getProdiFromSlug(resolvedParams.slug);

  if (!prodiKey) {
    notFound();
  }

  const displayName = getDisplayNameFromProdi(prodiKey);
  const courses = COURSES_BY_PRODI[prodiKey] || [];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const years = [2026, 2025, 2024, 2023, 2022, 2021];

  const breadcrumbs = [
    { name: "Program Studi", url: "/explore" },
    { name: displayName, url: `/program/${resolvedParams.slug}` },
  ];

  const jsonLdData = generateCollectionPageSchema({
    name: `Bank Soal Digital ${displayName} FKI UMS`,
    description: `Koleksi lengkap arsip soal ujian UTS dan UAS program studi ${displayName} FKI UMS.`,
    url: `/program/${resolvedParams.slug}`,
    breadcrumbs,
  });

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      <JsonLd data={jsonLdData} />

      <main className="container mx-auto px-4 py-28 max-w-6xl">
        <Breadcrumb items={breadcrumbs} />

        {/* Hero Section */}
        <section className="mt-6 mb-12 bg-neutral-900/70 p-8 rounded-2xl border border-neutral-800 backdrop-blur">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-red-900/60 border border-red-700/50 text-red-300 text-xs font-semibold rounded-full uppercase tracking-wider">
              FKI UMS Archive
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Bank Soal Digital {displayName} UMS
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Selamat datang di halaman resmi arsip soal ujian Program Studi{" "}
            <strong className="text-white font-semibold">{displayName}</strong> Fakultas Komunikasi dan Informatika Universitas Muhammadiyah Surakarta. Halaman ini menyediakan akses langsung ke koleksi soal Midterm Test (UTS) dan Final Test (UAS) untuk seluruh mata kuliah aktif dari semester 1 hingga semester 8.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={`/explore?prodi=${prodiKey}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-red-900/30"
            >
              <FileText className="w-4 h-4" />
              Cari & Filter Soal {displayName}
            </Link>
          </div>
        </section>

        {/* Semesters Navigation */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-red-500" />
            Pilih Semester — {displayName}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {semesters.map((sem) => (
              <Link
                key={sem}
                href={`/program/${resolvedParams.slug}/semester/${sem}`}
                className="p-4 bg-neutral-900/80 hover:bg-red-950/80 border border-neutral-800 hover:border-red-600/50 rounded-xl text-center transition-all group"
              >
                <div className="text-xs text-gray-400 group-hover:text-red-300">Semester</div>
                <div className="text-2xl font-bold text-white group-hover:text-red-400">{sem}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Course List Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-red-500" />
              Daftar Mata Kuliah ({courses.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => {
              const courseSlug = slugify(course);
              return (
                <Link
                  key={course}
                  href={`/program/${resolvedParams.slug}/subject/${courseSlug}`}
                  className="p-4 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all flex items-start justify-between group"
                >
                  <div>
                    <h3 className="font-semibold text-gray-100 group-hover:text-red-400 transition-colors text-sm sm:text-base">
                      {course}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Arsip UTS & UAS • {displayName}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Academic Years Archive */}
        <section className="mb-12 bg-neutral-900/40 p-6 rounded-xl border border-neutral-800">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-500" />
            Arsip Ujian Menurut Tahun Akademik
          </h2>
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <Link
                key={year}
                href={`/year/${year}`}
                className="px-4 py-2 bg-neutral-800 hover:bg-red-900/60 text-sm font-medium text-gray-200 rounded-lg border border-neutral-700 transition-colors"
              >
                Soal Ujian Tahun {year}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SeoDirectory />
    </div>
  );
}
