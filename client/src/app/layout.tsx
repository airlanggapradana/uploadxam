import "@/styles/globals.css";

import { type Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import TanstackProvider from "@/lib/TanstackProvider";
import { Toaster } from "@/components/ui/sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/components/dashboard-comps/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import media from "../../public/media.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://uploadxam.fostiums.org"),
  title: "UploadXam | Bank Soal Digital FKI UMS",
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
    url: "https://uploadxam.fostiums.org",
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
    canonical: "https://uploadxam.fostiums.org",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable}`}
      suppressHydrationWarning={true}
    >
      <EdgeStoreProvider>
        <TanstackProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme={"dark"}
            enableSystem={true}
            disableTransitionOnChange={false}
          >
            <body>
              {children}
              <Toaster position={"top-center"} richColors={true} />
              <Analytics />
            </body>
          </ThemeProvider>
        </TanstackProvider>
      </EdgeStoreProvider>
    </html>
  );
}
