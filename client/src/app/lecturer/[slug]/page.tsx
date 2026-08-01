import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/landing-page/Navbar";
import { Breadcrumb } from "@/components/reusables/Breadcrumb";
import { JsonLd } from "@/components/reusables/JsonLd";
import { SeoDirectory } from "@/components/landing-page/SeoDirectory";
import {
  unslugify,
  buildPageMetadata,
  generateCollectionPageSchema,
} from "@/utils/seo-helpers";
import { UserCheck, Search, ArrowRight, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const sampleLecturers = [
    "dosen-fki-ums",
    "tim-dosen-informatika",
    "tim-dosen-sistem-informasi",
    "tim-dosen-ilmu-komunikasi",
    "tim-dosen-kecerdasan-buatan",
  ];
  return sampleLecturers.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lecturerName = unslugify(resolvedParams.slug);

  return buildPageMetadata({
    title: `Arsip Soal ${lecturerName} | UploadXam UMS`,
    description: `Kumpulan arsip soal ujian UTS & UAS dari dosen pengampu ${lecturerName} di Fakultas Komunikasi dan Informatika Universitas Muhammadiyah Surakarta.`,
    keywords: [
      `soal dosen ${lecturerName}`,
      `soal ${lecturerName} UMS`,
      `UTS ${lecturerName}`,
      `UAS ${lecturerName}`,
      "FKI UMS",
      "UploadXam",
    ],
    canonicalPath: `/lecturer/${resolvedParams.slug}`,
  });
}

export default async function LecturerPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lecturerName = unslugify(resolvedParams.slug);

  const breadcrumbs = [
    { name: "Dosen Pengampu", url: "/explore" },
    { name: lecturerName, url: `/lecturer/${resolvedParams.slug}` },
  ];

  const jsonLdData = generateCollectionPageSchema({
    name: `Arsip Soal Ujian Dosen ${lecturerName} FKI UMS`,
    description: `Kumpulan arsip soal UTS dan UAS dari dosen pengampu ${lecturerName} FKI UMS.`,
    url: `/lecturer/${resolvedParams.slug}`,
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
            <span className="px-3 py-1 bg-red-900/60 border border-red-700/50 text-red-300 text-xs font-semibold rounded-full uppercase flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" />
              Dosen Pengampu
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Arsip Soal Ujian: {lecturerName}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
            Dapatkan referensi soal ujian UTS dan UAS yang disusun oleh dosen pengampu <strong className="text-white font-semibold">{lecturerName}</strong> di lingkungan Fakultas Komunikasi dan Informatika UMS. Bahan latihan ini membantu Anda memahami karakter soal dan pola evaluasi mata kuliah terkait.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/explore?subject=${encodeURIComponent(lecturerName)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-red-900/30"
            >
              <Search className="w-4 h-4" />
              Cari Soal Pengampu {lecturerName}
            </Link>
          </div>
        </section>

        {/* Quick Links to Prodi Archives */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-500" />
            Jelajahi Soal Menurut Program Studi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/program/teknik-informatika"
              className="p-5 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 rounded-xl flex justify-between items-center group"
            >
              <span className="text-white font-medium group-hover:text-red-400">Teknik Informatika</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/program/sistem-informasi"
              className="p-5 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 rounded-xl flex justify-between items-center group"
            >
              <span className="text-white font-medium group-hover:text-red-400">Sistem Informasi</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/program/ilmu-komunikasi"
              className="p-5 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 rounded-xl flex justify-between items-center group"
            >
              <span className="text-white font-medium group-hover:text-red-400">Ilmu Komunikasi</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/program/kecerdasan-buatan"
              className="p-5 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 rounded-xl flex justify-between items-center group"
            >
              <span className="text-white font-medium group-hover:text-red-400">Kecerdasan Buatan</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </section>
      </main>

      <SeoDirectory />
    </div>
  );
}
