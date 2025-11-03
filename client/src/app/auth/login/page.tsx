import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import media from "../../../../public/media.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://uploadxam.fostiums.org/auth/login"),
  title: "UploadXam | Login Akun",
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
    url: "https://uploadxam.fostiums.org/auth/login",
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
    canonical: "https://uploadxam.fostiums.org/auth/login",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const Login = () => {
  return (
    <main className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-white/6 p-6 shadow-2xl backdrop-blur-lg sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-white/70 hover:text-white/90">
            ← Back to Home
          </Link>
          <CardAction className="p-0">
            <Link
              href={"/auth/register"}
              className="text-sm text-sky-400 transition-colors hover:text-sky-300"
            >
              Belum punya akun?
            </Link>
          </CardAction>
        </div>

        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-2xl leading-tight font-semibold text-white">
            Login Akun
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-white/70">
            Silakan login untuk mengakses semua soal ujian.
          </CardDescription>
        </CardHeader>

        <div className="mt-6">
          <LoginForm />
        </div>
      </Card>
    </main>
  );
};

export default Login;
