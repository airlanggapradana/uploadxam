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
  getProdiFromSlug,
  getDisplayNameFromProdi,
  slugify,
  buildPageMetadata,
  generateCollectionPageSchema,
} from "@/utils/seo-helpers";
import { getCoursesByProdiAndSemester } from "@/data/courses";
import { ArrowRight, BookOpen, Search, Folder } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string; semester: string }>;
}

export function generateStaticParams() {
  const paths: { slug: string; semester: string }[] = [];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  for (const prodiSlug of Object.keys(PRODI_SLUG_MAP)) {
    for (const semester of semesters) {
      paths.push({ slug: prodiSlug, semester });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const prodiKey = getProdiFromSlug(resolvedParams.slug);
  const semNum = parseInt(resolvedParams.semester, 10);

  if (!prodiKey || isNaN(semNum) || semNum < 1 || semNum > 8) {
    return buildPageMetadata({
      title: "Semester Tidak Ditemukan",
      description: "Halaman semester tidak ditemukan di UploadXam FKI UMS.",
      canonicalPath: `/program/${resolvedParams.slug}/semester/${resolvedParams.semester}`,
    });
  }

  const displayName = getDisplayNameFromProdi(prodiKey);

  return buildPageMetadata({
    title: `Semester ${semNum} ${displayName} | Bank Soal UMS`,
    description: `Kumpulan arsip soal ujian UTS & UAS Semester ${semNum} ${displayName} FKI Universitas Muhammadiyah Surakarta. Download soal PDF mata kuliah semester ${semNum}.`,
    keywords: [
      `soal semester ${semNum} ${displayName}`,
      `UTS semester ${semNum} ${displayName}`,
      `UAS semester ${semNum} ${displayName}`,
      `bank soal ${displayName}`,
      "FKI UMS",
      "UploadXam",
    ],
    canonicalPath: `/program/${resolvedParams.slug}/semester/${resolvedParams.semester}`,
  });
}

export default async function SemesterPage({ params }: PageProps) {
  const resolvedParams = await params;
  const prodiKey = getProdiFromSlug(resolvedParams.slug);
  const semNum = parseInt(resolvedParams.semester, 10);

  if (!prodiKey || isNaN(semNum) || semNum < 1 || semNum > 8) {
    notFound();
  }

  const displayName = getDisplayNameFromProdi(prodiKey);
  const semesterCourses = getCoursesByProdiAndSemester(prodiKey, semNum);
  const semestersList = [1, 2, 3, 4, 5, 6, 7, 8];

  const breadcrumbs = [
    { name: displayName, url: `/program/${resolvedParams.slug}` },
    { name: `Semester ${semNum}`, url: `/program/${resolvedParams.slug}/semester/${resolvedParams.semester}` },
  ];

  const jsonLdData = generateCollectionPageSchema({
    name: `Bank Soal Semester ${semNum} ${displayName} FKI UMS`,
    description: `Koleksi soal ujian Semester ${semNum} program studi ${displayName} UMS.`,
    url: `/program/${resolvedParams.slug}/semester/${resolvedParams.semester}`,
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
              {displayName}
            </span>
            <span className="px-3 py-1 bg-neutral-800 border border-neutral-700 text-gray-300 text-xs font-semibold rounded-full">
              Semester {semNum}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Bank Soal Semester {semNum} — {displayName}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
            Jelajahi kumpulan soal ujian UTS & UAS untuk mata kuliah yang ditempuh pada <strong className="text-white font-semibold">Semester {semNum}</strong> program studi {displayName} FKI Universitas Muhammadiyah Surakarta. Persiapkan ujian Anda dengan bahan latihan soal asli dari angkatan sebelumnya.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/explore?prodi=${prodiKey}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-red-900/30"
            >
              <Search className="w-4 h-4" />
              Buka Explore Soal
            </Link>
          </div>
        </section>

        {/* Other Semesters Navigation */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Folder className="w-5 h-5 text-red-500" />
            Pilih Semester Lainnya ({displayName})
          </h2>
          <div className="flex flex-wrap gap-2">
            {semestersList.map((sem) => {
              const isCurrent = sem === semNum;
              return (
                <Link
                  key={sem}
                  href={`/program/${resolvedParams.slug}/semester/${sem}`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    isCurrent
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-gray-300"
                  }`}
                >
                  Semester {sem}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Courses Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-500" />
            Mata Kuliah Semester {semNum} — {displayName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {semesterCourses.map((course) => (
              <Link
                key={course}
                href={`/program/${resolvedParams.slug}/subject/${slugify(course)}`}
                className="p-4 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all flex items-center justify-between group"
              >
                <span className="text-sm font-medium text-gray-200 group-hover:text-red-400">
                  {course}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SeoDirectory />
    </div>
  );
}
