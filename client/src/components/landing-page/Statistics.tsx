"use client";

import React from "react";
import { useGetUserStats } from "@/utils/query";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CountUp from "@/components/CountUp";
import { Star, Quote, ArrowUpRight, Compass, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const prodiDisplayNames: Record<string, string> = {
  Informatika: "Informatika",
  Sistem_Informasi: "Sistem Informasi",
  Ilmu_Komunikasi: "Ilmu Komunikasi",
  Kecerdasan_Buatan: "Kecerdasan Buatan",
};

const prodiColors: Record<string, string> = {
  Informatika: "#38bdf8", // cyan / blue glow
  Sistem_Informasi: "#fbbf24", // amber / yellow
  Ilmu_Komunikasi: "#f97316", // orange
  Kecerdasan_Buatan: "#34d399", // emerald
};

const Statistics = () => {
  const { data, isLoading, error } = useGetUserStats();

  return (
    <section id="prodi-section" className="relative w-full bg-[#050505] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/2 left-0 w-96 h-96 rounded-full opacity-25 blur-[100px]"
          style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #b91c1c 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 1. Large Statement Headline (Reference Match) */}
        <div className="mb-20 text-left max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-950/30 text-xs font-semibold text-red-300 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <span>Tentang Platform</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-gray-100">
            Kami <span className="text-red-500 glow-text-red">mengelola</span> dan menyediakan{" "}
            <span className="text-red-500 glow-text-red">arsip soal digital</span> secara terstruktur, memastikan setiap{" "}
            <span className="text-red-500 glow-text-red">persiapan ujian</span> menjadi jauh lebih efektif & transparan.
          </h2>
        </div>

        {/* 2. Two-Column Feature Card Layout (Exact Reference Match) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* LEFT COLUMN: Based in Location & Visual Frame (7 Cols) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden border border-white/10 group hover:border-red-500/40 transition-all duration-300">
            {/* Top Tag & Title */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-xs font-medium text-red-300 mb-6">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>Tersedia untuk 4 Program Studi</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-6 flex items-center gap-2">
                Berpusat di <span className="text-red-500">FKI UMS, Surakarta</span>
              </h3>

              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-red-600 text-xs font-bold text-white border border-white/15 hover:border-red-500 transition-all mb-8 shadow-md"
              >
                <span>Mulai Jelajahi Soal</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Embedded Red Atmospheric Lighting Visual Box */}
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-red-900/40 bg-gradient-to-br from-red-950/60 via-black to-slate-950 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.35)_0%,_transparent_70%)]" />
              
              {/* Decorative Exam Archive Visual Graphic */}
              <div className="relative z-10 text-center px-6">
                <ShieldCheck className="h-16 w-16 text-red-500 mx-auto mb-3 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                <h4 className="text-lg font-bold text-white mb-1">Fakultas Komunikasi & Informatika</h4>
                <p className="text-xs text-gray-400">Universitas Muhammadiyah Surakarta</p>
                
                <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-[10px] font-mono text-red-300/80">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 border border-red-900/50">UTS & UAS</span>
                  <span className="px-2.5 py-1 rounded-md bg-black/60 border border-red-900/50">Format PDF</span>
                  <span className="px-2.5 py-1 rounded-md bg-black/60 border border-red-900/50">NIM Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Trusted by Students & Testimonial (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Top Stat Box */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-red-500/40 transition-all">
              <p className="text-xs sm:text-sm text-gray-400 font-medium mb-6">
                Dipercayai oleh 1000+ Mahasiswa aktif dari 4 prodi di FKI UMS untuk belajar soal ujian dari tahun ke tahun.
              </p>

              <div className="flex items-baseline justify-between">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                {/* Big Number Display */}
                <div className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  <CountUp
                    from={0}
                    to={Number(data?.totalUsers ?? 1000)}
                    separator="."
                    duration={2}
                  />
                  <span className="text-red-500">+</span>
                </div>
              </div>
            </div>

            {/* Bottom Testimonial Box */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-red-500/40 transition-all flex items-start gap-4">
              <Image
                src="https://res.cloudinary.com/airlanggapradana/image/upload/v1779689150/Gemini_Generated_Image_wf93s2wf93s2wf93_zx0ejo.webp"
                alt="Airlangga Pradana"
                width={56}
                height={56}
                className="rounded-2xl border border-red-500/40 object-cover flex-shrink-0"
              />

              <div className="flex-1 text-left">
                <Quote className="h-5 w-5 text-red-500 mb-2 rotate-180 opacity-80" />
                <p className="text-xs text-gray-300 font-normal leading-relaxed mb-3">
                  "Akses bank soal yang terstruktur membuat mahasiswa dapat mempelajari tipe soal dosen pengampu dengan lebih tenang dan fokus."
                </p>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Airlangga Pradana</span>
                  <span className="text-[10px] text-red-400 font-medium">Founder & Lead Dev UploadXam</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Prodi Percentage Breakdown Grid */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Distribusi Pengguna per Program Studi</h3>
              <p className="text-xs text-gray-400 mt-1">Persentase partisipasi mahasiswa FKI UMS pada platform UploadXam</p>
            </div>
            <span className="text-xs font-mono text-red-400 bg-red-950/50 border border-red-800/40 px-3 py-1.5 rounded-lg inline-block self-start">
              Live Data Stats
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="col-span-full py-12 text-center text-gray-400 text-sm">
                Memuat statistik...
              </div>
            ) : error ? (
              <div className="col-span-full py-6 text-center text-red-400 text-sm">
                Gagal memuat statistik prodi.
              </div>
            ) : data?.breakdown && data.breakdown.length > 0 ? (
              data.breakdown.map((item, index) => (
                <Card
                  key={item.prodi}
                  className="glass-card border border-white/10 hover:border-red-500/40 p-5 rounded-2xl text-left transition-all duration-300"
                >
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-200">
                        {prodiDisplayNames[item.prodi] ?? item.prodi}
                      </span>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: prodiColors[item.prodi] }} />
                    </div>

                    <p className="text-2xl font-black text-white">
                      {item.totalUsers} <span className="text-xs font-normal text-gray-400">mahasiswa</span>
                    </p>

                    <div className="space-y-1.5">
                      <Progress
                        value={item.percentage}
                        className="h-2 bg-black/60 rounded-full overflow-hidden"
                        style={{
                          ["--progress-background" as string]: prodiColors[item.prodi] || "#ef4444",
                        }}
                      />
                      <div className="flex justify-end text-xs font-bold font-mono" style={{ color: prodiColors[item.prodi] }}>
                        {item.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-gray-500 text-sm">
                Belum ada data tersedia.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
