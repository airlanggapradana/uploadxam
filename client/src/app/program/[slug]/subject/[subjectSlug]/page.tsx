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
  findSubjectFromSlug,
  slugify,
  buildPageMetadata,
  generateEducationalResourceSchema,
} from "@/utils/seo-helpers";
import { COURSES_BY_PRODI } from "@/data/courses";
import { BookOpen, Search, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string; subjectSlug: string }>;
}

export function generateStaticParams() {
  const paths: { slug: string; subjectSlug: string }[] = [];
  for (const [prodiSlug, prodiKey] of Object.entries(PRODI_SLUG_MAP)) {
    const courses = COURSES_BY_PRODI[prodiKey] ?? [];
    for (const course of courses) {
      paths.push({
        slug: prodiSlug,
        subjectSlug: slugify(course),
      });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const prodiKey = getProdiFromSlug(resolvedParams.slug);

  if (!prodiKey) {
    return buildPageMetadata({
      title: "Mata Kuliah Tidak Ditemukan",
      description: "Mata kuliah yang Anda cari tidak ditemukan di UploadXam FKI UMS.",
      canonicalPath: `/program/${resolvedParams.slug}/subject/${resolvedParams.subjectSlug}`,
    });
  }

  const displayName = getDisplayNameFromProdi(prodiKey);
  const subjectName = findSubjectFromSlug(prodiKey, resolvedParams.subjectSlug);

  return buildPageMetadata({
    title: `${subjectName} | ${displayName}`,
    description: `Kumpulan arsip soal UTS & UAS mata kuliah ${subjectName} untuk mahasiswa ${displayName} FKI Universitas Muhammadiyah Surakarta. Akses gratis PDF soal ujian.`,
    keywords: [
      `soal ${subjectName} UMS`,
      `soal UTS ${subjectName}`,
      `soal UAS ${subjectName}`,
      `bank soal ${displayName}`,
      `ujian ${subjectName} ${displayName}`,
      "FKI UMS",
      "UploadXam",
    ],
    canonicalPath: `/program/${resolvedParams.slug}/subject/${resolvedParams.subjectSlug}`,
  });
}

export default async function SubjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const prodiKey = getProdiFromSlug(resolvedParams.slug);

  if (!prodiKey) {
    notFound();
  }

  const displayName = getDisplayNameFromProdi(prodiKey);
  const subjectName = findSubjectFromSlug(prodiKey, resolvedParams.subjectSlug);
  const allCourses = COURSES_BY_PRODI[prodiKey] ?? [];
  const relatedCourses = allCourses
    .filter((c) => slugify(c) !== resolvedParams.subjectSlug)
    .slice(0, 6);

  const breadcrumbs = [
    { name: displayName, url: `/program/${resolvedParams.slug}` },
    { name: subjectName, url: `/program/${resolvedParams.slug}/subject/${resolvedParams.subjectSlug}` },
  ];

  const jsonLdData = generateEducationalResourceSchema({
    name: `Arsip Soal UTS & UAS ${subjectName} — ${displayName} UMS`,
    description: `Dokumen latihan soal ujian dan arsip UTS/UAS untuk mata kuliah ${subjectName} di program studi ${displayName} FKI UMS.`,
    url: `/program/${resolvedParams.slug}/subject/${resolvedParams.subjectSlug}`,
    subject: subjectName,
    prodi: displayName,
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
              Mata Kuliah Active
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Arsip Soal Ujian: {subjectName}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
            Dapatkan referensi soal ujian Tengah Semester (UTS) dan Akhir Semester (UAS) untuk mata kuliah <strong className="text-white font-semibold">{subjectName}</strong> program studi {displayName} FKI UMS. Seluruh file soal diunggah langsung oleh sesama mahasiswa dan dapat diunduh dalam format PDF.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 p-4 bg-black/40 rounded-xl border border-neutral-800 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>Format PDF Asli</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>Kelas Reguler & Internasional</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>Arsip Lintas Tahun Akademik</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/explore?prodi=${prodiKey}&subject=${encodeURIComponent(subjectName)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-red-900/30"
            >
              <Search className="w-4 h-4" />
              Cari & Download Soal {subjectName}
            </Link>
          </div>
        </section>

        {/* Related Courses in Same Prodi */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-500" />
            Mata Kuliah Terkait di {displayName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedCourses.map((course) => (
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

        {/* Back Link */}
        <div className="mb-8">
          <Link
            href={`/program/${resolvedParams.slug}`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Katalog {displayName}
          </Link>
        </div>
      </main>

      <SeoDirectory />
    </div>
  );
}
