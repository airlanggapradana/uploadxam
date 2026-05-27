import React from "react";
import type { Metadata } from "next";
import media from "../../../public/docs.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://uploadxam.fostiums.org/docs"),
  title: "Dokumentasi Penggunaan | UploadXam",
  description:
    "Kumpulan dokumentasi penggunaan UploadXam untuk mahasiswa di FKI UMS.",
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
    url: "https://uploadxam.fostiums.org/docs",
    title: "Dokumentasi Penggunaan | UploadXam",
    description:
      "Kumpulan dokumentasi penggunaan UploadXam untuk mahasiswa di FKI UMS.",
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
    title: "Dokumentasi Penggunaan | UploadXam",
    description:
      "Kumpulan dokumentasi penggunaan UploadXam untuk mahasiswa di FKI UMS.",
    images: [media.src],
  },
  alternates: {
    canonical: "https://uploadxam.fostiums.org/docs",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default DocsLayout;
