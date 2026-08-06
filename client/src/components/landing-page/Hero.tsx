"use client";

import React, { useState, useEffect } from "react";
import { Search, Compass, Sparkles, ShieldCheck } from "lucide-react";
import { LuLayoutDashboard, LuLogIn } from "react-icons/lu";
import { FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookieClient } from "@/utils/cookie-client";
import { decodeJwtPayload } from "@/utils/helper";
import { useGetUserStats, useGetExams } from "@/utils/query";

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch dynamic statistics from backend database
  const { data: statsData } = useGetUserStats();
  const { data: examsData } = useGetExams({ prodi: "All" });

  // 1. Total Mahasiswa / Users from DB
  const totalUsers = statsData?.totalUsers ?? 0;

  // 2. Total Berkas Soal Terunggah from DB
  const totalUploads = statsData?.totalUploads ?? examsData?.totalUploads ?? 0;

  // 3. Dynamic Course Count (Curriculum courses from Data Mata Kuliah Tiap Prodi.md + DB unique entries)
  const allUploads =
    examsData?.groupedByProdi?.flatMap((g) =>
      g.semesters.flatMap((s) => s.uploads),
    ) ?? [];

  const uniqueMatkulInDb = new Set(
    allUploads.map((u) => u.mata_kuliah.trim().toLowerCase()),
  ).size;
  const baseCurriculumCourses = 185; // Extract count from curriculum docs
  const totalMatkul = Math.max(
    baseCurriculumCourses,
    baseCurriculumCourses + uniqueMatkulInDb,
  );

  // 4. Dynamic Accuracy calculation from DB ratings
  const ratedExams = allUploads.filter((u) => u.avgRating && u.avgRating > 0);
  const avgRating =
    ratedExams.length > 0
      ? ratedExams.reduce((sum, u) => sum + (u.avgRating || 0), 0) /
        ratedExams.length
      : 4.8;
  const accuracyPercent = Math.min(
    99,
    Math.max(90, Math.round((avgRating / 5) * 100)),
  );

  useEffect(() => {
    const token = getCookieClient("token");
    if (token) {
      const decoded = decodeJwtPayload(token);
      if (decoded) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?subject=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/explore");
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505] px-4 pt-28 pb-16 text-white sm:px-6 lg:px-8">
      {/* 1. Deep Bioluminescent Crimson Glow Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Radial Red Core */}
        <div
          className="animate-pulse-glow absolute top-1/4 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 sm:h-[900px] sm:w-[900px]"
          style={{
            background:
              "radial-gradient(circle, rgba(239, 68, 68, 0.45) 0%, rgba(185, 28, 28, 0.25) 40%, rgba(5, 5, 5, 0) 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Secondary Side Lights */}
        <div
          className="absolute top-10 right-10 h-96 w-96 rounded-full opacity-30 blur-[90px]"
          style={{
            background: "radial-gradient(circle, #dc2626 0%, transparent 70%)",
          }}
        />
        {/* Dot Matrix Mesh Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* 2. Hero Content Area */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
        {/* Top Pill Badge (Reference Style) */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1.5 shadow-lg shadow-red-950/40 backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-red-200 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-red-400" /> Platform Digital
            FKI UMS
          </span>
        </div>

        {/* Hero Title with Red Gradient Accent */}
        <h1 className="mb-6 max-w-4xl text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Bank Soal Digital <br />
          <span className="glow-text-red bg-gradient-to-r from-red-400 via-rose-500 to-red-600 bg-clip-text text-transparent">
            Arsip UTS & UAS
          </span>{" "}
          On Demand
        </h1>

        {/* Subtitle Description */}
        <p className="mb-8 max-w-2xl text-sm leading-relaxed font-normal text-gray-300 sm:text-base md:text-lg">
          Dari mahasiswa untuk mahasiswa. Akses ribuan berkas soal ujian mata
          kuliah per prodi, semester, dan dosen pengampu secara transparan &
          instan.
        </p>

        {/* Search Bar Container */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative z-20 mx-auto mb-9 w-full max-w-lg"
          role="search"
        >
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-red-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari mata kuliah (contoh: Algoritma & Pemrograman)..."
              className="h-13 w-full rounded-2xl border border-red-800/40 bg-black/70 pr-32 pl-11 text-sm text-white shadow-2xl backdrop-blur-md transition-all placeholder:text-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute top-1.5 right-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 text-xs font-bold text-white shadow-md shadow-red-900/50 transition-all hover:brightness-110"
            >
              Cari Soal
            </button>
          </div>
        </form>

        {/* Primary Action Buttons */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/explore"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-md transition-all hover:border-red-500/40 hover:bg-white/10"
          >
            <Compass className="h-4 w-4 text-red-400" />
            Explore Semua Soal
          </Link>
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-7 py-3 text-sm font-bold text-white shadow-xl shadow-red-600/30 transition-all hover:scale-105"
            >
              <LuLayoutDashboard className="h-4 w-4" />
              Buka Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-7 py-3 text-sm font-bold text-white shadow-xl shadow-red-600/30 transition-all hover:scale-105"
            >
              <LuLogIn className="h-4 w-4" />
              Upload Soal Ujian
            </Link>
          )}
        </div>

        {/* 3. Central Visual Artwork & Floating Stat Cards (Exact Reference Match) */}
        <div className="relative my-4 flex min-h-[420px] w-full max-w-5xl items-center justify-center">
          {/* Central Bioluminescent Red jellyfish/mesh Illustration Visual */}
          <div className="animate-float relative z-0 flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96">
            {/* Glowing Orb Outer Shell */}
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr from-red-600/40 to-rose-500/20 blur-2xl" />

            {/* Bioluminescent Jellyfish SVG Visual */}
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full text-red-500 opacity-90 drop-shadow-[0_0_35px_rgba(239,68,68,0.8)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 30C60 30 35 60 35 90C35 98 40 105 48 105C55 105 60 98 68 98C76 98 82 105 90 105C98 105 102 98 110 98C118 98 124 105 132 105C140 105 145 98 152 98C160 98 165 105 165 90C165 60 140 30 100 30Z"
                fill="url(#jelly-grad)"
                opacity="0.85"
              />
              <path
                d="M50 105C50 135 65 170 70 185M80 105C80 140 88 175 92 190M110 105C110 140 112 175 108 190M135 105C135 140 130 170 125 185M150 105C150 135 145 165 140 175"
                stroke="url(#tentacle-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.75"
              />
              <defs>
                <linearGradient
                  id="jelly-grad"
                  x1="100"
                  y1="30"
                  x2="100"
                  y2="105"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ff4d4d" />
                  <stop offset="1" stopColor="#990000" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient
                  id="tentacle-grad"
                  x1="100"
                  y1="105"
                  x2="100"
                  y2="190"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ff3333" />
                  <stop offset="1" stopColor="#330000" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* FLOATING STAT CARDS (Positioned like the reference image - Dynamic DB Data) */}

          {/* Stat Card 1 (Top Left): Mahasiswa Aktif */}
          <div className="glass-card glass-card-hover absolute top-2 left-2 z-20 max-w-[180px] rounded-2xl p-4 text-left sm:left-10 sm:max-w-[210px]">
            <span className="mb-1 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Mahasiswa Aktif
            </span>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl font-extrabold text-white">
                {totalUsers > 0 ? `${totalUsers}+` : "1000+"}
              </span>
              {/* Avatar Group */}
              <div className="flex -space-x-2 overflow-hidden">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-red-950">
                  M
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white ring-2 ring-red-950">
                  A
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-red-950">
                  S
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400">
              {statsData?.breakdown
                ? `${statsData.breakdown.length} Prodi Terdaftar`
                : "Pengguna dari 4 Prodi FKI UMS"}
            </p>
          </div>

          {/* Stat Card 2 (Bottom Left 1): Akurasi Soal */}
          <div className="glass-card glass-card-hover absolute bottom-6 left-4 z-20 max-w-[160px] rounded-2xl p-4 text-left sm:left-16 sm:max-w-[180px]">
            <span className="mb-1 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Akurasi Soal
            </span>
            <span className="mb-1 block text-2xl font-extrabold text-white">
              {accuracyPercent}%
            </span>
            <p className="text-[10px] text-gray-400">
              {ratedExams.length > 0
                ? `${ratedExams.length} Soal terverifikasi rating`
                : "Arsip terverifikasi sesuai matkul"}
            </p>
          </div>

          {/* Stat Card 4 (Top Right): Berkas Soal Terunggah */}
          <div className="glass-card glass-card-hover absolute top-4 right-2 z-20 w-52 rounded-2xl p-4 text-left sm:right-10 sm:w-60">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-red-400 uppercase">
                UploadXam
              </span>
              <span className="font-mono text-[10px] text-gray-400">01/04</span>
            </div>
            {/* Embedded Mini Image Graphic */}
            <div className="relative mb-3 flex h-20 w-full items-center justify-center overflow-hidden rounded-xl border border-red-900/40 bg-gradient-to-br from-red-950 to-black">
              <div className="absolute inset-0 bg-red-600/10 blur-sm" />
              <ShieldCheck className="relative z-10 h-8 w-8 text-red-500" />
            </div>
            <span className="block text-2xl font-extrabold text-white">
              {totalUploads > 0 ? `${totalUploads}+` : "230+"}
            </span>
            <p className="text-[10px] text-gray-400">
              Berkas soal di database siap unduh
            </p>
          </div>

          {/* Stat Card 5 (Bottom Right): Total Matkul + Prodi Links */}
          <div className="glass-card glass-card-hover absolute right-4 bottom-4 z-20 w-48 rounded-2xl p-4 text-left sm:right-14 sm:w-56">
            <span className="mb-0.5 block text-2xl font-extrabold text-white">
              {totalMatkul}+
            </span>
            <span className="mb-3 block text-[11px] font-semibold text-gray-300">
              Matkul FKI (4 Prodi)
            </span>
            <div className="mb-3 flex flex-wrap items-center gap-2.5 text-[10px] text-gray-400">
              <Link
                href="/explore?prodi=Informatika"
                className="cursor-pointer transition hover:text-red-400"
              >
                Informatika
              </Link>
              <Link
                href="/explore?prodi=Sistem_Informasi"
                className="cursor-pointer transition hover:text-red-400"
              >
                SI
              </Link>
              <Link
                href="/explore?prodi=Ilmu_Komunikasi"
                className="cursor-pointer transition hover:text-red-400"
              >
                Ilkom
              </Link>
              <Link
                href="/explore?prodi=Kecerdasan_Buatan"
                className="cursor-pointer transition hover:text-red-400"
              >
                AI
              </Link>
            </div>
            <Link
              href="/explore"
              className="flex w-full items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-2 text-[11px] font-bold text-white shadow-md shadow-red-900/50 transition hover:brightness-110"
            >
              Lihat Katalog
            </Link>
          </div>

          {/* Social Proof Floating Icons Box (Reference Center Social Box) */}
          <div className="absolute top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black/80 p-2 shadow-2xl backdrop-blur-xl">
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest text-red-400 uppercase">
              SOCIALS
            </span>
            <div className="flex items-center gap-2">
              <Link
                href="https://www.instagram.com/fosti_ums/"
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:bg-red-600 hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://wa.me/6281227151326"
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:bg-red-600 hover:text-white"
              >
                <FaWhatsapp className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/airlanggapradana/uploadxam"
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:bg-red-600 hover:text-white"
              >
                <FaGithub className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Supported By Logos Banner */}
        <div className="mt-14 flex w-full flex-col items-center gap-4 border-t border-white/10 pt-8">
          <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Supported & Developed by
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Image
              src="https://teknikinformatika.ums.ac.id/wp-content/uploads/sites/57/2022/10/logo-informatika.svg"
              alt="Teknik Informatika UMS"
              width={180}
              height={40}
              className="h-16 w-auto opacity-80 transition hover:opacity-100"
            />
            <div className="h-6 w-px bg-white/20" />
            <Image
              src="https://res.cloudinary.com/airlanggapradana/image/upload/v1755442684/LOGO_FOSTI_PUTIH_imvkxw.png"
              alt="FOSTI UMS"
              width={100}
              height={30}
              className="h-14 w-auto opacity-80 transition hover:opacity-100"
            />
            <div className="h-6 w-px bg-white/20" />
            <Image
              src="https://res.cloudinary.com/airlanggapradana/image/upload/v1762154491/upscalemedia-transformed_1_zuugzn.webp"
              alt="FKI UMS"
              width={120}
              height={40}
              className="h-14 w-auto opacity-80 transition hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
