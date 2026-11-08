import React from "react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/reusables/JsonLd";
import media from "../../../public/docs.png";

const BASE_URL = "https://www.uploadxam.web.id";
const OG_IMAGE = `${BASE_URL}${media.src}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Dokumentasi Penggunaan",
  description:
    "Panduan lengkap penggunaan UploadXam untuk mahasiswa FKI UMS. Pelajari cara mengakses, mencari, dan mengunduh soal ujian dari semua prodi.",
  keywords: [
    "dokumentasi UploadXam",
    "panduan penggunaan",
    "cara pakai UploadXam",
    "tutorial Bank Soal",
    "FKI UMS",
    "soal ujian mahasiswa",
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
    url: `${BASE_URL}/docs`,
    title: "Dokumentasi Penggunaan | UploadXam",
    description:
      "Panduan lengkap penggunaan UploadXam untuk mahasiswa FKI UMS. Pelajari cara mengakses, mencari, dan mengunduh soal ujian.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Dokumentasi Penggunaan UploadXam — Bank Soal Digital FKI UMS",
        type: "image/png",
      },
    ],
    siteName: "UploadXam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dokumentasi Penggunaan | UploadXam",
    description:
      "Panduan lengkap penggunaan UploadXam untuk mahasiswa FKI UMS.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${BASE_URL}/docs`,
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const docsWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Dokumentasi Penggunaan UploadXam",
  description:
    "Panduan lengkap penggunaan UploadXam untuk mahasiswa FKI UMS.",
  url: `${BASE_URL}/docs`,
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
        name: "Dokumentasi",
        item: `${BASE_URL}/docs`,
      },
    ],
  },
};

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <JsonLd data={docsWebPageSchema} />
      <div>{children}</div>
    </>
  );
};

export default DocsLayout;
