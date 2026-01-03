import React from "react";
import { Badge } from "@/components/ui/badge";
import { Book, LucideUsers } from "lucide-react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { LuLayoutDashboard, LuLogIn } from "react-icons/lu";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import TextHighlighter from "@/components/fancy/text/text-highlighter";
import type { Transition } from "motion";
import { VscSourceControl } from "react-icons/vsc";
import AnimatedContent from "@/components/AnimatedContent";

const Hero = () => {
  const transition = { type: "spring", duration: 1, delay: 0.4, bounce: 0 };
  return (
    <div className="relative min-h-screen w-full bg-black px-4 py-24 sm:py-24">
      {/* Deep Ocean Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
      `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <AnimatedContent
            distance={100}
            delay={0.2}
            duration={2}
            direction={"vertical"}
            reverse={true}
          >
            <Badge className="flex items-center border-0 bg-gradient-to-r from-red-800 to-red-600 px-3 py-2 text-sm shadow-md">
              <LucideUsers className="mr-2 h-4 w-4 text-sky-200 sm:h-5 sm:w-5" />
              <span className="text-sky-100">from students to students</span>
            </Badge>
          </AnimatedContent>
          <AnimatedContent
            distance={100}
            delay={0.3}
            duration={2}
            direction={"vertical"}
            reverse={true}
          >
            <Badge className="flex items-center border-0 bg-gradient-to-r from-red-800 to-red-600 px-3 py-2 text-sm shadow-md">
              <Book className="mr-2 h-4 w-4 text-sky-200 sm:h-5 sm:w-5" />
              <span className="text-sky-100">100+ Soal Ujian</span>
            </Badge>
          </AnimatedContent>
        </div>

        <h1 className="mt-5 max-w-2xl bg-gradient-to-br from-red-100 to-red-700 bg-clip-text py-5 text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Akses semua soal ujian jadi lebih mudah.
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

        {/* Cards */}
        <div className="mt-6 mb-10 flex flex-col items-center gap-5 sm:flex-row">
          <AnimatedContent
            distance={200}
            delay={0.5}
            duration={2}
            direction={"horizontal"}
            reverse={true}
          >
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
          </AnimatedContent>

          <AnimatedContent
            distance={200}
            delay={0.5}
            duration={2}
            direction={"horizontal"}
          >
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
          </AnimatedContent>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/auth/register"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-700 to-red-500 px-6 py-3 text-sm font-medium text-white hover:from-red-800 hover:to-red-600"
          >
            <MdOutlineBookmarkAdd className="text-xl" />
            Bikin Akun Baru
          </Link>
          <Link
            href="/auth/login"
            className="flex items-center gap-2 rounded-lg border border-red-700 bg-transparent px-6 py-3 text-sm font-medium text-white hover:bg-red-900"
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
