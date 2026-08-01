"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Book, LucideUsers, Search, Compass } from "lucide-react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { LuLayoutDashboard, LuLogIn } from "react-icons/lu";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextHighlighter from "@/components/fancy/text/text-highlighter";
import type { Transition } from "motion";
import { VscSourceControl } from "react-icons/vsc";
import { getCookieClient } from "@/utils/cookie-client";
import { decodeJwtPayload } from "@/utils/helper";

const Hero = () => {
  const transition = { type: "spring", duration: 1, delay: 0.4, bounce: 0 };
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <div className="relative min-h-screen w-full bg-black px-4 py-24 sm:py-24 animate-fadeIn">
      {/* Deep Ocean Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)
      `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <Badge className="flex items-center border-0 bg-gradient-to-r from-red-800 to-red-600 px-3 py-2 text-sm shadow-md">
            <LucideUsers className="mr-2 h-4 w-4 text-sky-200 sm:h-5 sm:w-5" />
            <span className="text-sky-100">from students to students</span>
          </Badge>
          <Badge className="flex items-center border-0 bg-gradient-to-r from-red-800 to-red-600 px-3 py-2 text-sm shadow-md">
            <Book className="mr-2 h-4 w-4 text-sky-200 sm:h-5 sm:w-5" />
            <span className="text-sky-100">100+ Soal Ujian</span>
          </Badge>
        </div>

        <h1 className="mt-5 max-w-3xl bg-gradient-to-br from-red-100 to-red-700 bg-clip-text py-5 text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Bank Soal Digital FKI UMS — Arsip Soal UTS & UAS
        </h1>
        <p className="mt-4 mb-7 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
          Dapatkan{" "}
          <TextHighlighter
            transition={transition as Transition}
            highlightColor="#B91C1C"
            className={"rounded-[0.3em] p-[0.15rem] text-white"}
          >
            semua file ujian 📚
          </TextHighlighter>{" "}
          tiap semester tiap mata kuliah dari{" "}
          <TextHighlighter
            transition={transition as Transition}
            highlightColor="#B91C1C"
            className={"rounded-[0.3em] p-[0.15rem] text-white"}
          >
            semua prodi FKI
          </TextHighlighter>{" "}
          berupa PDF langsung dari kakak tingkat 🤝 — cukup login dengan NIM
          kamu 🚀.
        </p>

        {/* Public search bar right inside Hero */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative z-20 w-full max-w-md mx-auto mb-8 px-2 sm:px-0"
          role="search"
          aria-label="Cari soal ujian"
        >
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <Search className="h-5 w-5 text-red-500" />
            </span>
            <input
              id="hero-search"
              type="text"
              className="w-full h-12 rounded-xl border border-red-800/30 bg-black/60 pl-11 pr-28 text-sm text-white placeholder:text-gray-500 shadow-lg shadow-red-950/20 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none"
              placeholder="Cari mata kuliah (contoh: Algoritma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Cari mata kuliah"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 h-9 rounded-lg bg-gradient-to-r from-red-700 to-red-600 px-4 text-xs font-bold text-white hover:from-red-800 hover:to-red-700 transition"
            >
              Cari Soal
            </button>
          </div>
        </form>

        {/* Cards */}
        <div className="mt-2 mb-10 flex flex-col items-center gap-5 sm:flex-row">
          <Card className="w-full max-w-sm border border-sky-800/30 bg-transparent shadow-lg shadow-sky-900/20 backdrop-blur-md sm:max-w-sm">
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-red-600 to-red-400 p-2">
                <LuLayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-start text-sm font-semibold text-sky-100">
                  User-Friendly
                </h2>
                <p className="text-start text-xs text-sky-200/80">
                  Antarmuka sederhana dan mudah digunakan untuk semua
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm border border-sky-800/30 bg-transparent shadow-lg shadow-sky-900/20 backdrop-blur-md sm:max-w-sm">
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-red-600 to-red-400 p-2">
                <VscSourceControl className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-start text-sm font-semibold text-sky-100">
                  Sumber Terpercaya
                </h2>
                <p className="text-start text-xs text-sky-200/80">
                  File diunggah oleh mahasiswa aktif, dijamin keaslianya
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/explore"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-700 to-red-500 px-6 py-3 text-sm font-bold text-white hover:from-red-800 hover:to-red-600 transition shadow-lg shadow-red-950/30"
          >
            <Compass className="h-5 w-5" />
            Explore Semua Soal
          </Link>
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg border border-red-700 bg-transparent px-6 py-3 text-sm font-bold text-white hover:bg-red-900/40 transition"
            >
              <LuLayoutDashboard className="h-5 w-5 text-red-400" />
              Buka Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-2 rounded-lg border border-red-700 bg-transparent px-6 py-3 text-sm font-bold text-white hover:bg-red-900/40 transition"
            >
              <LuLogIn className="h-5 w-5 text-red-400" />
              Upload Soal Ujian
            </Link>
          )}
        </div>

        {/* Support */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <h2 className="text-sm font-semibold text-gray-300">Supported by:</h2>
          <Image
            src="https://teknikinformatika.ums.ac.id/wp-content/uploads/sites/57/2022/10/logo-informatika.svg"
            alt="Logo Program Studi Teknik Informatika UMS"
            width={180}
            height={180}
            className="h-auto w-54 sm:w-60"
          />
          <Separator className="w-3/4 bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
