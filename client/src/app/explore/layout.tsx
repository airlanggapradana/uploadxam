import React from "react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/reusables/JsonLd";
import media from "../../../public/media.png";

const BASE_URL = "https://uploadxam.fostiums.org";
const OG_IMAGE = `${BASE_URL}${media.src}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Explore Soal Ujian",
  description:
    "Jelajahi ribuan soal ujian dari semua prodi FKI UMS — Informatika, Sistem Informasi, Ilmu Komunikasi, dan Kecerdasan Buatan. Cari soal berdasarkan mata kuliah dan semester.",
  keywords: [
    "soal ujian FKI UMS",
    "explore soal",
    "cari soal ujian",
    "bank soal Informatika UMS",
    "bank soal Sistem Informasi UMS",
    "bank soal Kecerdasan Buatan UMS",
    "bank soal Ilmu Komunikasi UMS",
    "soal semester",
    "UploadXam explore",
    "FOSTI UMS",
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
    locale: "id_ID",
    url: `${BASE_URL}/explore`,
    title: "Explore Soal Ujian | UploadXam",
    description:
      "Jelajahi ribuan soal ujian dari semua prodi FKI UMS. Cari soal berdasarkan mata kuliah dan semester.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Explore Soal Ujian — UploadXam Bank Soal Digital FKI UMS",
        type: "image/png",
      },
    ],
    siteName: "UploadXam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Soal Ujian | UploadXam",
    description:
      "Jelajahi ribuan soal ujian dari semua prodi FKI UMS — Informatika, Sistem Informasi, Ilmu Komunikasi, Kecerdasan Buatan.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${BASE_URL}/explore`,
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const exploreWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Explore Soal Ujian — UploadXam",
  description:
    "Jelajahi ribuan soal ujian dari semua prodi FKI UMS.",
  url: `${BASE_URL}/explore`,
  inLanguage: "id",
  isPartOf: {
    "@type": "WebSite",
    name: "UploadXam",
    url: BASE_URL,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Explore Soal",
        item: `${BASE_URL}/explore`,
      },
    ],
  },
};

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <JsonLd data={exploreWebPageSchema} />
      <>{children}</>
    </>
  );
};

export default ExploreLayout;
