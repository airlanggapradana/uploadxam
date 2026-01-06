"use client";
import React from "react";
import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BillingPage = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8 pb-24 sm:px-6 lg:h-full lg:pb-8 dark:bg-gray-950">
      <Card className="w-full max-w-2xl rounded-2xl bg-white text-center shadow-lg dark:bg-gray-800">
        <CardHeader className="p-4 sm:p-6">
          <div className="mb-2 flex justify-center">
            <Heart className="h-8 w-8 animate-pulse text-sky-500 sm:h-10 sm:w-10 dark:text-sky-400" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800 sm:text-2xl dark:text-gray-100">
            Bantu Kami Tetap Berkembang ❤️
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 p-4 text-sm text-gray-600 sm:space-y-4 sm:p-6 sm:text-base dark:text-gray-300">
          <p>
            Kami mengembangkan platform ini dengan cinta dan dedikasi agar tetap
            cepat, aman, dan bebas diakses siapa pun.
          </p>
          <p>
            Tapi di balik layar, ada biaya server, penyimpanan, dan maintenance
            yang terus berjalan.
          </p>
          <p className="font-medium text-gray-800 dark:text-gray-100">
            Dengan donasi kecil dari kamu, kamu ikut menjaga agar layanan ini
            terus hidup dan berkembang 🙏
          </p>
        </CardContent>

        <CardFooter className="mt-3 flex flex-col gap-3 p-4 sm:mt-4 sm:p-6">
          <Button
            onClick={() => router.push("https://saweria.co/devuploadxam")}
            className="w-full rounded-xl bg-blue-500 py-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:py-6 sm:text-base dark:bg-blue-500/95 dark:hover:bg-blue-600"
          >
            💖 Donasi Sekarang
          </Button>

          <p className="mt-2 text-xs text-gray-400 dark:text-gray-400/90">
            Setiap donasi, sekecil apa pun, sangat berarti bagi keberlangsungan
            proyek ini.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BillingPage;
