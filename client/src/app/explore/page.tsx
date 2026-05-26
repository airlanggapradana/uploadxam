"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Search, ArrowLeft, LogIn, Sparkles, Sun, Moon } from "lucide-react";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import { useTheme } from "next-themes";

import { useGetExams } from "@/utils/query";
import { ExamSessionProvider, UserSessionProvider } from "@/hooks/context";
import { decodeJwtPayload, type JWTPayload } from "@/utils/helper";
import { getCookieClient } from "@/utils/cookie-client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Stats from "@/components/dashboard-comps/Stats";
import ProdiGrid from "@/components/dashboard-comps/ProdiGrid";
import DialogAddFileUpload from "@/components/dashboard-comps/DialogAddFileUpload";
import { DashboardLoadingSkeleton } from "@/components/dashboard-comps/DashboardLoadingSkeleton";
import { Warning } from "@/components/reusables/Warning";
import DonationDialog from "@/components/dashboard-comps/PopUpDialog";
import Feedback from "@/components/dashboard-comps/Feedback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Separate content component that consumes search parameters
const ExploreContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") || "";
  const { setTheme } = useTheme();

  const [prodi, setProdi] = useState<
    | "Informatika"
    | "Sistem_Informasi"
    | "Ilmu_Komunikasi"
    | "Kecerdasan_Buatan"
    | "All"
  >("All");
  const [subject, setSubject] = useState<string>(initialSubject);
  const [tipeSoal, setTipeSoal] = useState<"UTS" | "UAS" | undefined>(undefined);
  const [kategori, setKategori] = useState<"REGULER" | "INTER" | undefined>(undefined);
  const [debouncedSubject] = useDebounce(subject, 500);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Authenticated upload session state
  const [session, setSession] = useState<JWTPayload | null>(null);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    const token = getCookieClient("token");
    if (token) {
      const decoded = decodeJwtPayload(token);
      if (decoded) {
        setSession(decoded);
      }
    }
    setHasCheckedAuth(true);
  }, []);

  const {
    data: exams,
    isLoading,
    error,
  } = useGetExams({
    prodi,
    subject: debouncedSubject || undefined,
    tipe_soal: tipeSoal,
    kategori: kategori,
  });

  const handleUploadClick = () => {
    toast.error("Akses Ditolak", {
      description: "Silakan login menggunakan NIM terlebih dahulu untuk mengunggah soal.",
      position: "top-center",
      richColors: true,
    });
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
      <DonationDialog />
      {/* Decorative Radial Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-red-500/10 blur-3xl dark:bg-red-950/20" />
        <div className="absolute top-60 right-10 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-sky-950/10" />
      </div>

      {/* Explore Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 transition hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="https://res.cloudinary.com/airlanggapradana/image/upload/v1755442684/LOGO_FOSTI_PUTIH_imvkxw.png"
              width={80}
              height={80}
              alt="logo fosti"
              className="h-8 w-auto invert dark:invert-0"
            />
            <div className="h-4 w-px bg-slate-300 dark:bg-gray-800" />
            <span className="text-sm font-black tracking-tight text-slate-800 dark:text-white">
              upload<span className="text-red-600">xam</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                  <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-slate-700 hover:text-slate-900" />
                  <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-gray-400 hover:text-white" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {session ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Masuk NIM
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Banner Section */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="bg-gradient-to-r from-red-600 via-red-500 to-indigo-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-red-100 dark:via-red-400 dark:to-indigo-400 sm:text-4xl">
            Bank Soal Ujian Digital
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-gray-400 sm:text-base">
            Cari, lihat, dan unduh berkas ujian dari berbagai program studi di FKI UMS secara gratis.
          </p>
        </div>

        <Warning
          title="Mode Publik (Akses Terbatas)"
          description="Kamu sedang dalam mode Penjelajah Publik. Kamu bebas mencari dan mengunduh soal, namun harus login dengan NIM terlebih dahulu jika ingin mengunggah berkas soal baru."
          className="mb-6 border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-950/40 dark:bg-sky-950/20 dark:text-sky-300"
        />

        {/* Filter & Search Bar */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex flex-col gap-4">
            {/* Row 1: Search Inputs & Upload Button */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-gray-500">
                  <Search className="h-4 w-4" />
                </span>
                <Input
                  className="w-full rounded-lg border-slate-200 pl-10 text-sm focus-visible:ring-1 focus-visible:ring-red-500 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                  placeholder="Cari mata kuliah (contoh: Algoritma, Web, Jaringan)..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Upload Soal CTA */}
              <div className="self-end lg:self-auto">
                {hasCheckedAuth && (
                  session ? (
                    <UserSessionProvider value={session}>
                      <DialogAddFileUpload />
                    </UserSessionProvider>
                  ) : (
                    <Button
                      onClick={handleUploadClick}
                      className="w-full bg-gradient-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 sm:w-auto text-white font-semibold"
                    >
                      🚀 Upload Soal
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* Row 2: Select Filters */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-gray-400">Program Studi</label>
                <Select
                  value={prodi}
                  onValueChange={(value) => setProdi(value as typeof prodi)}
                >
                  <SelectTrigger className="w-full border-slate-200 text-xs dark:border-gray-800 dark:bg-gray-950">
                    <SelectValue placeholder="Semua Prodi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Semua Prodi</SelectItem>
                    <SelectItem value="Informatika">Informatika</SelectItem>
                    <SelectItem value="Sistem_Informasi">Sistem Informasi</SelectItem>
                    <SelectItem value="Ilmu_Komunikasi">Ilmu Komunikasi</SelectItem>
                    <SelectItem value="Kecerdasan_Buatan">Artificial Intelligence</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-gray-400">Tipe Ujian</label>
                <Select
                  value={tipeSoal ?? "all"}
                  onValueChange={(value) =>
                    setTipeSoal(value === "all" ? undefined : (value as "UTS" | "UAS"))
                  }
                >
                  <SelectTrigger className="w-full border-slate-200 text-xs dark:border-gray-800 dark:bg-gray-950">
                    <SelectValue placeholder="Semua Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="UTS">UTS</SelectItem>
                    <SelectItem value="UAS">UAS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-gray-400">Kategori</label>
                <Select
                  value={kategori ?? "all"}
                  onValueChange={(value) =>
                    setKategori(value === "all" ? undefined : (value as "REGULER" | "INTER"))
                  }
                >
                  <SelectTrigger className="w-full border-slate-200 text-xs dark:border-gray-800 dark:bg-gray-950">
                    <SelectValue placeholder="Semua Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="REGULER">Reguler</SelectItem>
                    <SelectItem value="INTER">Internasional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Exams Content rendering inside providers */}
        {isLoading ? (
          <DashboardLoadingSkeleton />
        ) : error ? (
          <div className="py-12 text-center text-red-500">
            Error: {error instanceof Error ? error.message : "Gagal memuat berkas ujian."}
          </div>
        ) : exams ? (
          <ExamSessionProvider value={exams}>
            <div className="space-y-8">
              {/* Repository Statistics */}
              <div>
                <h2 className="mb-4 text-sm font-semibold tracking-wider text-slate-500 uppercase dark:text-gray-400 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  Statistik Bank Soal
                </h2>
                <Stats />
              </div>

              <Separator />

              {/* Grid lists of prodi and exams */}
              <div>
                <h2 className="mb-4 text-sm font-semibold tracking-wider text-slate-500 uppercase dark:text-gray-400 flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-red-500" />
                  Katalog Soal Ujian
                </h2>
                <ProdiGrid />
              </div>
            </div>
          </ExamSessionProvider>
        ) : (
          <div className="py-12 text-center text-slate-500 dark:text-gray-400">
            Belum ada berkas soal yang tersedia.
          </div>
        )}

        {/* Simple Donation Section */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-gray-800 dark:bg-gray-900/40 max-w-3xl mx-auto text-center">
          <div className="mb-3 flex justify-center">
            <span className="rounded-full bg-red-100 p-2.5 dark:bg-red-950/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600 dark:text-red-500 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Dukung Kami Tetap Berkarya ❤️
          </h3>
          <p className="mt-2 text-xs text-slate-600 dark:text-gray-400 sm:text-sm">
            Kami membangun platform ini agar gratis dan bermanfaat bagi seluruh mahasiswa FKI. Untuk menjaga server tetap menyala, kami menerima donasi dengan senang hati.
          </p>
          <div className="mt-4">
            <a
              href="https://saweria.co/devuploadxam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-5 py-2 text-xs font-bold text-white transition hover:bg-yellow-600"
            >
              Donasi via Saweria 🪙
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-6 dark:border-gray-900 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center justify-between gap-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-xs text-slate-500 dark:text-gray-400 sm:text-left">
            &copy; {new Date().getFullYear()} FOSTI UMS. All rights reserved.
          </p>

          {/* Public Feedback Trigger Modal */}
          <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
            <DialogTrigger asChild>
              <button className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline dark:text-red-400 dark:hover:text-red-300 transition flex items-center gap-1 cursor-pointer">
                Kirim Masukan & Saran 💬
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-[95vw] overflow-y-auto p-4 sm:max-h-[90vh] sm:max-w-2xl sm:p-6 bg-white dark:bg-gray-900">
              <DialogHeader className="mb-3 sm:mb-4">
                <DialogTitle className="text-base font-semibold sm:text-xl">
                  Bagikan Masukan Anda
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  Masukan Anda sangat berharga bagi kami untuk terus menyempurnakan platform UploadXam.
                </DialogDescription>
              </DialogHeader>
              <Feedback />
            </DialogContent>
          </Dialog>
        </div>
      </footer>
    </div>
  );
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<DashboardLoadingSkeleton />}>
      <ExploreContent />
    </Suspense>
  );
}
