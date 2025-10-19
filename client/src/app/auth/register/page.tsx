import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";
import type { Metadata } from "next";
import media from "../../../../public/media.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://uploadxam.fostiums.org/auth/register"),
  title: "UploadXam | Register Akun",
  description:
    "Merupakan solusi digital untuk mengelola soal-soal ujian mahasiswa dari semua prodi di FKI UMS.",
  keywords: [
    "UploadXam",
    "Bank Soal Digital",
    "FKI UMS",
    "Soal Ujian",
    "Digital Soal",
    "Manajemen Soal",
    "Prodi FKI UMS",
  ],
  authors: [{ name: "Airlangga Pradana" }, { name: "FOSTI UMS" }],
  creator: "Airlangga Pradana",
  publisher: "FOSTI UMS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uploadxam.fostiums.org/auth/register",
    title: "UploadXam | Bank Soal Digital FKI UMS",
    description:
      "Merupakan solusi digital untuk mengelola soal-soal ujian mahasiswa dari semua prodi di FKI UMS.",
    images: [
      {
        url: media.src,
        width: 1200,
        height: 630,
        alt: "UploadXam | Bank Soal Digital FKI UMS",
      },
    ],
    siteName: "UploadXam",
  },
  twitter: {
    card: "summary_large_image",
    title: "UploadXam | Bank Soal Digital FKI UMS",
    description:
      "Merupakan solusi digital untuk mengelola soal-soal ujian mahasiswa dari semua prodi di FKI UMS.",
    images: [media.src],
  },
  alternates: {
    canonical: "https://uploadxam.fostiums.org/auth/register",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const Register = () => {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-sky-950 to-black px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md rounded-xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md sm:max-w-lg sm:p-6">
        <CardHeader className="border-b border-white/10 pb-4 sm:pb-6">
          <CardTitle className="text-xl font-bold text-white sm:text-left sm:text-2xl">
            Register Akun Baru
          </CardTitle>
          <CardDescription className="text-sm text-white/70 sm:text-left sm:text-base">
            Silakan daftar untuk mengakses semua soal ujian.
          </CardDescription>
          <CardAction className="mt-3 flex justify-center sm:justify-end">
            <Link
              href={"/auth/login"}
              className="text-sm text-sky-400 transition-colors hover:text-sky-300"
            >
              Sudah punya akun?
            </Link>
          </CardAction>
        </CardHeader>
        <div className="mt-2">
          <RegisterForm />
        </div>
      </Card>
    </main>
  );
};

export default Register;
