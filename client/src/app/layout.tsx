import "@/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import TanstackProvider from "@/lib/TanstackProvider";
import { Toaster } from "@/components/ui/sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/components/dashboard-comps/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/reusables/JsonLd";
import media from "../../public/media.png";

const BASE_URL = "https://uploadxam.fostiums.org";
const OG_IMAGE = `${BASE_URL}${media.src}`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#b91c1c" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "UploadXam | Bank Soal Digital FKI UMS",
    template: "%s | UploadXam",
  },
  description:
    "UploadXam adalah solusi digital untuk mengelola dan mengakses soal-soal ujian mahasiswa dari semua prodi di FKI UMS. Temukan soal ujian tiap semester secara mudah.",
  keywords: [
    "UploadXam",
    "Bank Soal Digital",
    "FKI UMS",
    "Soal Ujian",
    "Digital Soal",
    "Manajemen Soal",
    "Prodi FKI UMS",
    "Informatika UMS",
    "Sistem Informasi UMS",
    "Kecerdasan Buatan UMS",
    "Ilmu Komunikasi UMS",
    "FOSTI UMS",
    "soal ujian mahasiswa",
    "bank soal UMS",
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
    url: BASE_URL,
    title: "UploadXam | Bank Soal Digital FKI UMS",
    description:
      "UploadXam adalah solusi digital untuk mengelola dan mengakses soal-soal ujian mahasiswa dari semua prodi di FKI UMS.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "UploadXam — Platform Bank Soal Digital FKI UMS",
        type: "image/png",
      },
    ],
    siteName: "UploadXam",
  },
  twitter: {
    card: "summary_large_image",
    title: "UploadXam | Bank Soal Digital FKI UMS",
    description:
      "UploadXam adalah solusi digital untuk mengelola dan mengakses soal-soal ujian mahasiswa dari semua prodi di FKI UMS.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/manifest.json" },
    ],
  },
};

// JSON-LD structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UploadXam",
  alternateName: "FOSTI UMS UploadXam",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/favicon_io/android-chrome-512x512.png`,
    width: 512,
    height: 512,
  },
  description:
    "Platform bank soal digital untuk mahasiswa FKI UMS, dikembangkan oleh FOSTI UMS.",
  foundingDate: "2024",
  sameAs: [
    "https://www.instagram.com/fosti_ums/",
    "https://github.com/airlanggapradana/uploadxam",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://wa.me/6281227151326",
    availableLanguage: "Indonesian",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "UploadXam",
  url: BASE_URL,
  description:
    "Bank soal digital mahasiswa FKI UMS — akses soal ujian tiap semester dari semua prodi.",
  inLanguage: "id",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/explore?subject={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "FOSTI UMS",
  },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "UploadXam",
  applicationCategory: "EducationApplication",
  operatingSystem: "Web",
  url: BASE_URL,
  description:
    "Aplikasi web bank soal ujian digital untuk mahasiswa FKI Universitas Muhammadiyah Surakarta.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  author: {
    "@type": "Person",
    name: "Airlangga Pradana",
  },
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable}`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* Performance: preconnect to external domains */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://teknikinformatika.ums.ac.id" />
        <link rel="dns-prefetch" href="https://teknikinformatika.ums.ac.id" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD Structured Data */}
        <JsonLd data={[organizationSchema, websiteSchema, softwareAppSchema]} />
      </head>
      <body suppressHydrationWarning={true}>
        <EdgeStoreProvider>
          <TanstackProvider>
            <ThemeProvider
              attribute={"class"}
              defaultTheme={"system"}
              enableSystem={true}
              disableTransitionOnChange={false}
            >
              {children}
              <Toaster position={"top-center"} richColors={true} />
              <Analytics />
            </ThemeProvider>
          </TanstackProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
