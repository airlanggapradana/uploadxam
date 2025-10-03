import "@/styles/globals.css";

import { type Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import TanstackProvider from "@/lib/TanstackProvider";
import { Toaster } from "@/components/ui/sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/components/dashboard-comps/theme-provider";

export const metadata: Metadata = {
  title: "UploadXam | Bank Soal Digital FKI UMS",
  description:
    "Merupakan solusi digital untuk mengelola soal-soal ujian mahasiswa dari semua prodi di FKI UMS.",
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
            defaultTheme={"system"}
            enableSystem={true}
            disableTransitionOnChange={false}
          >
            <body>
              {children}
              <Toaster position={"top-center"} richColors={true} />
            </body>
          </ThemeProvider>
        </TanstackProvider>
      </EdgeStoreProvider>
    </html>
  );
}
