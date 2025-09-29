import React from "react";
import { Badge } from "@/components/ui/badge";
import { Book, LucideUsers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
      <div className={"space-x-3"}>
        <div className="flex gap-4">
          <Badge
            variant="default"
            className="flex items-center border-0 bg-gradient-to-r from-sky-800 to-sky-600 px-4 py-2 shadow-md"
          >
            <LucideUsers className="mr-2 h-5 w-5 text-sky-200" />
            <span className="text-sm font-medium text-sky-100">
              from students to students
            </span>
          </Badge>
          <Badge
            variant="default"
            className="flex items-center border-0 bg-gradient-to-r from-sky-800 to-sky-600 px-4 py-2 shadow-md"
          >
            <Book className="mr-2 h-5 w-5 text-sky-200" />
            <span className="text-sm font-medium text-sky-100">
              100+ Soal Ujian
            </span>
          </Badge>
        </div>
      </div>
      <h1 className="max-w-2xl scroll-m-20 bg-gradient-to-br from-sky-100 to-sky-700 bg-clip-text py-5 text-center text-6xl font-extrabold tracking-tight text-balance text-transparent">
        Akses semua soal ujian jadi lebih mudah.
      </h1>
      <p className="mb-7 max-w-2xl text-center leading-7 font-medium text-gray-300 [&:not(:first-child)]:mt-6">
        Dapatkan semua file ujian 📚 tiap semester, tiap mata kuliah berupa pdf
        langsung dari kakak-kakak tingkat 🤝, di satu platform. Cukup masuk
        dengan NIM kamu untuk mulai belajar 🚀.
      </p>

      <div className={"mt-5 mb-10 flex items-center gap-5"}>
        <Card
          className={
            "relative overflow-hidden rounded-xl border border-sky-800/30 bg-transparent shadow-lg shadow-sky-900/20 backdrop-blur-md"
          }
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-600/10 to-sky-400/5"></div>
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-sky-500/20 to-transparent opacity-30 blur-xl"></div>
          <CardContent className="relative z-10 px-6 py-0">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-400 p-2 shadow-inner shadow-sky-300/20"></div>
              <div>
                <h2 className="scroll-m-20 border-b border-sky-700/30 text-base font-semibold tracking-tight text-sky-100 first:mt-0">
                  User-Friendly
                </h2>
                <p className="max-w-[15rem] text-xs leading-7 text-sky-200/80 [&:not(:first-child)]:mt-0">
                  Antarmuka yang sederhana dan mudah digunakan untuk semua
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={
            "relative overflow-hidden rounded-xl border border-sky-800/30 bg-transparent shadow-lg shadow-sky-900/20 backdrop-blur-md"
          }
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-600/10 to-sky-400/5"></div>
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-sky-500/20 to-transparent opacity-30 blur-xl"></div>
          <CardContent className="relative z-10 px-6 py-0">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-400 p-2 shadow-inner shadow-sky-300/20"></div>
              <div>
                <h2 className="scroll-m-20 border-b border-sky-700/30 text-base font-semibold tracking-tight text-sky-100 first:mt-0">
                  Sumber Terpercaya
                </h2>
                <p className="max-w-[15rem] text-xs leading-7 text-sky-200/80 [&:not(:first-child)]:mt-0">
                  Semua file diunggah oleh mahasiswa aktif, dijamin keasliannya
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 mb-5 flex items-center gap-6">
        <Link
          href="/auth/register"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-700 to-sky-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:from-sky-800 hover:to-sky-600"
        >
          <MdOutlineBookmarkAdd className="text-2xl" />
          Mulai Belajar
        </Link>
        <Link
          href="/auth/login"
          className="flex items-center gap-2 rounded-lg border border-sky-700 bg-transparent px-6 py-3 text-sm font-medium text-sky-200 transition hover:bg-sky-900"
        >
          <LuLogIn className="text-2xl" />
          Login dengan NIM
        </Link>
      </div>

      <div className={"mt-7 mb-5 flex items-center gap-4"}>
        <h2 className={"text-sm font-semibold text-gray-300"}>Supported by:</h2>
        <div className={"flex items-center gap-3"}>
          <Image
            src={
              "https://teknikinformatika.ums.ac.id/wp-content/uploads/sites/57/2022/10/logo-informatika.svg"
            }
            alt={"infor"}
            width={250}
            height={250}
          />
        </div>
      </div>
      <div className={"w-1/2"}>
        <Separator className={"bg-gray-700"} />
      </div>
    </div>
  );
};

export default Hero;
