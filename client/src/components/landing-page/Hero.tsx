import React from "react";
import { Badge } from "@/components/ui/badge";
import { Book, LucideUsers } from "lucide-react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full bg-black px-4 pt-24 sm:pt-28">
      {/* Deep Ocean Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 50%, #2a5d77 0%, #184058 18%, #0f2a43 34%, #0a1b30 50%, #071226 66%, #040d1c 80%, #020814 92%, #01040d 97%, #000309 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <Badge className="flex items-center border-0 bg-gradient-to-r from-sky-800 to-sky-600 px-3 py-2 text-sm shadow-md">
            <LucideUsers className="mr-2 h-4 w-4 text-sky-200 sm:h-5 sm:w-5" />
            <span className="text-sky-100">from students to students</span>
          </Badge>
          <Badge className="flex items-center border-0 bg-gradient-to-r from-sky-800 to-sky-600 px-3 py-2 text-sm shadow-md">
            <Book className="mr-2 h-4 w-4 text-sky-200 sm:h-5 sm:w-5" />
            <span className="text-sky-100">100+ Soal Ujian</span>
          </Badge>
        </div>

        <h1 className="mt-5 max-w-2xl bg-gradient-to-br from-sky-100 to-sky-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Akses semua soal ujian jadi lebih mudah.
        </h1>
        <p className="mt-4 mb-7 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
          Dapatkan semua file ujian 📚 tiap semester tiap mata kuliah berupa PDF
          langsung dari kakak tingkat 🤝 — cukup login dengan NIM kamu 🚀.
        </p>

        {/* Cards */}
        <div className="mt-6 mb-10 flex flex-col items-center gap-5 sm:flex-row">
          <Card className="w-full max-w-xs border border-sky-800/30 bg-transparent shadow-lg shadow-sky-900/20 backdrop-blur-md sm:max-w-sm">
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-400 p-2" />
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

          <Card className="w-full max-w-xs border border-sky-800/30 bg-transparent shadow-lg shadow-sky-900/20 backdrop-blur-md sm:max-w-sm">
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-400 p-2" />
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
            href="/auth/register"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-700 to-sky-500 px-6 py-3 text-sm font-medium text-white hover:from-sky-800 hover:to-sky-600"
          >
            <MdOutlineBookmarkAdd className="text-xl" />
            Mulai Belajar
          </Link>
          <Link
            href="/auth/login"
            className="flex items-center gap-2 rounded-lg border border-sky-700 bg-transparent px-6 py-3 text-sm font-medium text-sky-200 hover:bg-sky-900"
          >
            <LuLogIn className="text-xl" />
            Login dengan NIM
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <h2 className="text-sm font-semibold text-gray-300">Supported by:</h2>
          <Image
            src="https://teknikinformatika.ums.ac.id/wp-content/uploads/sites/57/2022/10/logo-informatika.svg"
            alt="infor"
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
