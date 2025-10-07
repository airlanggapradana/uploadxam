"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Upload,
  Search,
  Users,
  Shield,
  FileText,
  Star,
  MessageSquare,
  ChevronRight,
  Chrome as Home,
  Code,
  CircleAlert as AlertCircle,
  Sun,
  Moon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";

interface NavItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface ContentSection {
  id: string;
  title: string;
  sections: {
    heading: string;
    content: React.ReactNode;
  }[];
}

const PanduanPage = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const navigation: NavItem[] = [
    {
      id: "introduction",
      title: "Pengenalan",
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: "getting-started",
      title: "Memulai",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "student-guide",
      title: "Panduan Mahasiswa",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "features",
      title: "Fitur Lengkap",
      icon: <Code className="h-4 w-4" />,
    },
  ];

  const content: Record<string, ContentSection> = {
    introduction: {
      id: "introduction",
      title: "Pengenalan",
      sections: [
        {
          heading: "Selamat Datang",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-slate-400">
                Platform ini didesain secara khusus bagi mahasiswa Fakultas
                Komunikasi dan Informatika untuk menyediakan akses terpusat
                (sentralisasi) terhadap soal-soal ujian UTS dan UAS. Melalui
                berbagai fitur yang user-friendly, kami berupaya menciptakan
                pengalaman pembelajaran yang lebih kolaboratif dan efektif bagi
                kalian.
              </p>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:bg-blue-100">
                <div className="flex gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-blue-900">
                      Informasi Penting
                    </p>
                    <p className="text-sm text-blue-700">
                      Pastiin kamu menggunakan akun SSO untuk mengakses semua
                      fitur yang tersedia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          heading: "Keuntungan Platform",
          content: (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Akses Mudah
                  </p>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    Cari dan akses ribuan soal dari berbagai mata kuliah
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Kolaboratif
                  </p>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    Berbagi pengetahuan dengan mahasiswa lainnya
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Terorganisir
                  </p>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    Sistem kategorisasi yang memudahkan pencarian
                  </p>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    "getting-started": {
      id: "getting-started",
      title: "Memulai",
      sections: [
        {
          heading: "Langkah Pertama",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-gray-200">
                Untuk mulai menggunakan platform, ikuti langkah-langkah berikut:
              </p>
              <ol className="list-inside list-decimal space-y-3 text-slate-700 dark:text-gray-400">
                <li>Buat akun baru menggunakan nim dan nama kamu</li>
                <li>Lengkapi profil dengan informasi program studi dan nim</li>
                <li>
                  Setelah register, kamu akan diarahkan ke halaman login untuk
                  mengakses platform nya
                </li>
                <li>Masukkan nim yang udah kamu daftarkan sebelumnya</li>
                <li>Mulai berbagi atau mengunduh soal</li>
              </ol>
            </div>
          ),
        },
        {
          heading: "Navigasi Dashboard",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-gray-400">
                Dashboard utama menyediakan akses cepat ke berbagai fitur:
              </p>
              <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-900">Pencarian</p>
                    <p className="text-sm text-slate-600">
                      Temukan soal berdasarkan mata kuliah atau topik
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-900">Upload</p>
                    <p className="text-sm text-slate-600">
                      Bagikan soal ke komunitas
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-900">Favorit</p>
                    <p className="text-sm text-slate-600">
                      Akses koleksi soal yang disimpan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    "student-guide": {
      id: "student-guide",
      title: "Panduan Mahasiswa",
      sections: [
        {
          heading: "Mencari dan Mengunduh Soal",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-gray-400">
                Gunakan fitur pencarian untuk menemukan soal yang Anda butuhkan:
              </p>
              <div className="rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-100">
                <p className="text-green-400"># Langkah-langkah pencarian:</p>
                <p className="mt-2">
                  1. Masukkan kata kunci (mata kuliah/topik)
                </p>
                <p>2. Filter berdasarkan mata kuliah atau berdasar prodi</p>
                <p>3. Klik soal untuk melihat preview</p>
                <p>4. Download dalam format pdf</p>
              </div>
            </div>
          ),
        },
        {
          heading: "Mengunggah Soal",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-gray-200">
                Berbagi soal membantu komunitas belajar lebih baik. Berikut cara
                mengunggah:
              </p>
              <ol className="space-y-2 text-slate-700 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">1</Badge>
                  <span>Klik tombol &#34;Upload Soal&#34; di dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">2</Badge>
                  <span>
                    Pilih file soal (HANYA DAPAT MENERIMA FILE PDF DENGAN MAX
                    5MB in size)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">3</Badge>
                  <span>Isi informasi: mata kuliah, tahun, dan lainnya</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">4</Badge>
                  <span>
                    Submit dan selamat kamu telah berkontribusi untuk sesama
                  </span>
                </li>
              </ol>
            </div>
          ),
        },
        {
          heading: "Hal yang Perlu Diperhatikan",
          content: (
            <div className="space-y-4">
              <ol className="space-y-2 text-slate-700 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">1</Badge>
                  <span>
                    Mahasiswa hanya dapat mengupload soal untuk prodinya, tidak
                    dapat mengupload soal untuk prodi lain yang bukan prodinya
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">2</Badge>
                  <span>
                    HANYA DAPAT MENERIMA FILE PDF DENGAN MAX 5MB in size
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">3</Badge>
                  <span>
                    Jika kamu ingin mendapat privillege berupa kebebasan
                    mengupload soal untuk seluruh prodi, kamu dapat mengajukan
                    diri dengan whatsapp ke nomor 081227151326
                  </span>
                </li>
              </ol>
            </div>
          ),
        },
      ],
    },
    features: {
      id: "features",
      title: "Fitur Lengkap",
      sections: [
        {
          heading: "Fitur Pencarian Advanced",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-gray-400">
                Sistem pencarian dilengkapi dengan berbagai filter untuk hasil
                yang lebih akurat:
              </p>
              <div className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm dark:bg-gray-800">
                <p className="font-mono text-slate-800 dark:text-gray-300">
                  <span className="text-slate-500">Filter by:</span> Mata
                  Kuliah, Prodi
                </p>
                <p className="font-mono text-slate-800 dark:text-gray-300">
                  <span className="text-slate-500">Format:</span> Hanya menerima
                  PDF
                </p>
              </div>
            </div>
          ),
        },
        {
          heading: "Notifikasi dan Update",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-gray-400">
                Dapatkan notifikasi untuk update penting:
              </p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <div className="mt-2 h-2 w-2 rounded-full bg-slate-400"></div>
                  <span>Soal baru dari mata kuliah yang Anda ikuti</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-2 h-2 w-2 rounded-full bg-slate-400"></div>
                  <span>Reply pada diskusi yang Anda ikuti</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-2 h-2 w-2 rounded-full bg-slate-400"></div>
                  <span>Update dari dosen tentang materi ujian</span>
                </li>
              </ul>
            </div>
          ),
        },
      ],
    },
  };

  const { setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4">
          <Link href={"/"} className={"flex items-center gap-3"}>
            <BookOpen className="h-6 w-6 text-slate-900 dark:text-slate-100" />
            <span className="text-xl font-black text-black dark:text-white">
              upload<span className="text-sky-600">xam</span>
            </span>
          </Link>
          <Badge variant="secondary" className="ml-auto">
            v1.0
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-[57px] min-h-[calc(100vh-57px)] w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <ScrollArea className="h-[calc(100vh-57px)]">
            <div className="space-y-1 p-4">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  variant="ghost"
                  className={`flex w-full items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-slate-100 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                  }`}
                >
                  <div className="flex h-5 w-5 items-center justify-center">
                    {item.icon}
                  </div>
                  <span>{item.title}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        <main className="flex-1">
          <ScrollArea className="h-[calc(100vh-57px)]">
            <div className="mx-auto max-w-3xl px-8 py-12">
              <div className="mb-8">
                <h2 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {content[activeSection]?.title}
                </h2>
                <Separator className="mt-4" />
              </div>

              <div className="space-y-12">
                {content[activeSection]?.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {section.heading}
                    </h3>
                    <div className="prose prose-slate max-w-none">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-12" />

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex gap-3">
                  <MessageSquare className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-600 dark:text-slate-400" />
                  <div>
                    <h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
                      Butuh Bantuan?
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Jika Anda memiliki pertanyaan atau mengalami kendala,
                      silakan hubungi tim support kami melalui email atau live
                      chat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default PanduanPage;
