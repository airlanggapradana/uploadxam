"use client";
import React, { useState, useEffect } from "react";
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
  Menu,
  X,
  ArrowLeft,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if screen size is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const navigation: NavItem[] = [
    {
      id: "introduction",
      title: "Pengenalan",
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: "explore-guide",
      title: "Penjelajah Soal",
      icon: <Search className="h-4 w-4" />,
    },
    {
      id: "dashboard-guide",
      title: "Dashboard & Profil",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "chatbot-help",
      title: "Asisten AI Xandy",
      icon: <Code className="h-4 w-4" />,
    },
  ];

  const content: Record<string, ContentSection> = {
    introduction: {
      id: "introduction",
      title: "Pengenalan Platform",
      sections: [
        {
          heading: "Selamat Datang di UploadXam",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                Selamat datang di **UploadXam**, platform bank soal ujian digital terpusat bagi seluruh mahasiswa Fakultas Komunikasi dan Informatika (FKI) UMS. 
                Platform ini dibangun untuk mempermudah akses dan kolaborasi berbagi berkas soal ujian (UTS & UAS) antar mahasiswa secara gratis dan terorganisir.
              </p>
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-950/40 dark:bg-red-950/10">
                <div className="flex gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-500" />
                  <div>
                    <p className="mb-1 text-sm font-semibold text-red-900 dark:text-red-400">
                      Pemberitahuan Akun & Hak Akses
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Kamu dapat mencari dan mengunduh soal secara langsung tanpa masuk log (login). Namun, untuk mengunggah soal atau memperbarui profil, silakan melakukan registrasi/login menggunakan NIM terlebih dahulu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          heading: "Keuntungan Utama Platform",
          content: (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
                  <div className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-500"></div>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Akses Gratis & Terbuka
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Unduh soal UTS/UAS dari program studi Informatika, Sistem Informasi, Ilmu Komunikasi, hingga Kecerdasan Buatan secara instan.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
                  <div className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-500"></div>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Koleksi yang Terorganisir
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Pencarian canggih dengan filter program studi, tipe ujian (UTS/UAS), dan kategori kelas (Reguler/Internasional).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
                  <div className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-500"></div>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Fitur Kolaborasi Instan
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Bagikan berkas ujian Anda dalam format PDF dengan batas ukuran hingga 5MB untuk membangun bank soal bersama.
                  </p>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    "explore-guide": {
      id: "explore-guide",
      title: "Mencari & Mengunduh Soal",
      sections: [
        {
          heading: "Cara Menggunakan Halaman Penjelajah Soal (/explore)",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                Seluruh aktivitas pencarian dan pengunduhan soal terpusat di halaman **Penjelajah Soal (/explore)**. Halaman ini dapat diakses secara publik oleh siapa saja.
              </p>
              <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/50">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 border-red-500 text-red-500 font-semibold">1</Badge>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Pencarian Pintar</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Ketik nama mata kuliah (contoh: *Algoritma*, *Jaringan*) pada kolom pencarian. Kolom akan mencari otomatis dengan penundaan aman (*debounce*).</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 border-red-500 text-red-500 font-semibold">2</Badge>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Filter Multi-Kategori</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Gunakan dropdown filter Program Studi, Tipe Ujian (UTS/UAS), dan Kategori Kelas (Reguler/Inter) untuk mempersempit hasil pencarian.</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 border-red-500 text-red-500 font-semibold">3</Badge>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Preview & Unduh PDF</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Klik berkas ujian yang Anda temukan untuk membuka pratinjau instan atau langsung mengunduh berkas soal dalam format PDF.</p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          heading: "Kirim Masukan & Donasi Saweria",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                Di halaman penjelajah ini, kami juga menyediakan fitur pendukung bagi komunitas:
              </p>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <div className="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span><strong>Kirim Masukan & Saran 💬</strong>: Terletak di footer halaman `/explore`. Cukup klik tautan tersebut untuk memunculkan modal saran dan kritik langsung tanpa berpindah halaman.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span><strong>Donasi via Saweria 🪙</strong>: Kami menerima dukungan donasi sukarela untuk biaya server. Tombol donasi muncul dalam dialog sambutan (muncul setelah 3 detik dan dapat diabaikan selama 24 jam) serta kartu donasi permanen di paling bawah halaman `/explore`.</span>
                </li>
              </ul>
            </div>
          ),
        },
      ],
    },
    "dashboard-guide": {
      id: "dashboard-guide",
      title: "Dashboard & Pengelolaan Akun",
      sections: [
        {
          heading: "Sistem Tabular Baru di /dashboard",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                Setelah berhasil login menggunakan NIM, rute privat `/dashboard` kini menyajikan layout terpusat yang bersih tanpa sidebar samping. Seluruh kontrol terbagi ke dalam dua tab:
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/50">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Tab 1: Daftar Soal Saya 📂</h4>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Menampilkan daftar lengkap berkas ujian yang pernah Anda unggah. Anda memiliki kendali penuh untuk melihat berkas, mengedit detail (Mata Kuliah, Tahun, Kategori), atau menghapusnya secara instan. Tombol <strong>"Upload Soal"</strong> baru juga berada di tab ini.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/50">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Tab 2: Ubah Profil Akun 👤</h4>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Memungkinkan Anda untuk memperbarui data profil akun Anda seperti Nama Lengkap, nomor NIM, dan Program Studi. Anda dapat beralih ke *Mode Edit* melalui switch switch yang disediakan.
                  </p>
                </div>
              </div>
            </div>
          ),
        },
        {
          heading: "Aturan Pengunggahan Berkas Soal",
          content: (
            <div className="space-y-3">
              <div className="rounded-lg border border-yellow-200 bg-yellow-50/50 p-4 dark:border-yellow-950/40 dark:bg-yellow-950/10">
                <ul className="list-disc list-inside space-y-2 text-sm text-yellow-800 dark:text-yellow-400">
                  <li>Berkas harus berformat <strong>PDF</strong> saja.</li>
                  <li>Batas ukuran berkas maksimal adalah <strong>5 Megabyte (5MB)</strong>.</li>
                  <li>Secara default, mahasiswa hanya diperbolehkan mengunggah berkas soal untuk Program Studi miliknya sendiri demi menjaga integritas data.</li>
                  <li>*Catatan:* Jika Anda membutuhkan hak akses khusus mengunggah soal untuk seluruh program studi, silakan ajukan permohonan ke admin FOSTI.</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          heading: "Fitur Hapus Akun Permanen (Zona Bahaya)",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                Kami mendukung penuh privasi Anda. Jika Anda ingin menghapus seluruh data profil dari sistem, Anda dapat melakukannya secara mandiri:
              </p>
              <div className="rounded-xl border border-red-200 bg-red-50/20 p-4 dark:border-red-950/40 dark:bg-red-950/5">
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">🚨 Peringatan Zona Bahaya</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Buka <strong>Tab 2 (Ubah Profil Akun)</strong>, lalu scroll ke bagian bawah pada kartu *Status Akun*. Klik tombol **"Hapus Akun Permanen"** dan setujui dialog peringatan. Tindakan ini akan menghapus data profil Anda secara permanen dari server, namun berkas soal ujian yang pernah Anda unggah akan tetap dipertahankan di platform agar tetap berguna bagi mahasiswa lain.
                </p>
              </div>
            </div>
          ),
        },
      ],
    },
    "chatbot-help": {
      id: "chatbot-help",
      title: "Asisten AI Xandy",
      sections: [
        {
          heading: "Berinteraksi dengan AI Xandy Assistant",
          content: (
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                Di pojok kanan bawah halaman utama `/` atau `/explore`, terdapat tombol melayang merah berikon pesan yang akan menghubungkan Anda dengan **Xandy Assistant**, asisten AI cerdas berbasis Gemini.
              </p>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-gray-800 dark:bg-gray-900/50 space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Pencarian Berkas Terintegrasi ⚡</strong>: Xandy tidak hanya menjawab pertanyaan umum. Anda dapat mengetik perintah langsung seperti <em>"tolong carikan soal ujian UAS pemrograman web"</em>. Asisten AI akan otomatis memindai database bank soal dan memberikan balasan berisi daftar berkas lengkap dengan tautan unduhan langsung berformat markdown.
                </p>
                <Separator />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Balon Notifikasi Tooltip 💬</strong>: Bagi pengguna baru, balon penunjuk *"Tanya AI Xandy! 🤖💬"* akan muncul secara halus di sebelah tombol chat untuk mempermudah pengenalan fitur. Anda dapat mengabaikan balon ini dengan mengklik tanda silang (`x`), yang akan menyimpan preferensi Anda di memori browser agar tidak muncul kembali di kemudian hari.
                </p>
              </div>
            </div>
          ),
        },
      ],
    },
  };

  const { setTheme } = useTheme();

  // Navigation Menu Component for mobile
  const MobileNavigation = () => (
    <div className="space-y-1 p-4">
      {navigation.map((item) => (
        <Button
          key={item.id}
          onClick={() => {
            setActiveSection(item.id);
            setIsMenuOpen(false);
          }}
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
  );

  // Tab Navigation Component for mobile
  const TabNavigation = () => (
    <div className="flex gap-2 overflow-x-auto border-b border-slate-200 px-4 py-2 dark:border-slate-800">
      {navigation.map((item) => (
        <Button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          variant="ghost"
          size="sm"
          className={`flex-shrink-0 ${
            activeSection === item.id
              ? "bg-slate-100 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center">
              {item.icon}
            </div>
            <span>{item.title}</span>
          </div>
        </Button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
      {/* Sticky Header - Identical to Explore */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-2 py-4">
                    <BookOpen className="h-5 w-5 text-slate-900 dark:text-slate-100" />
                    <span className="text-lg font-bold text-slate-800 dark:text-white">
                      upload<span className="text-red-600">xam</span>
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <MobileNavigation />
                </SheetContent>
              </Sheet>
            )}
            <Link
              href="/"
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 transition hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Beranda
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-black tracking-tight text-slate-800 dark:text-white">
              upload<span className="text-red-600">xam</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:inline-flex bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 font-semibold border-0">
              v1.0
            </Badge>

            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                  <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-slate-700 hover:text-slate-900" />
                  <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-gray-400 hover:text-white" />
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

            <Link href="/explore">
              <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 font-semibold">
                Penjelajah
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab navigation for medium screens */}
        {isMobile && <TabNavigation />}
      </header>

      {/* Main Layout Area */}
      <div className="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="sticky top-[57px] hidden min-h-[calc(100vh-57px)] w-64 border-r border-slate-200 bg-white/40 md:block dark:border-gray-800 dark:bg-gray-900/10">
            <ScrollArea className="h-[calc(100vh-57px)]">
              <div className="space-y-1 p-4">
                {navigation.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    variant="ghost"
                    className={`flex w-full items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? "bg-red-50 text-red-600 shadow-sm dark:bg-red-950/30 dark:text-red-400 font-bold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-200"
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
        )}

        <main className="flex-1">
          <ScrollArea className="h-[calc(100vh-57px)] md:h-[calc(100vh-57px)]">
            <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
              <div className="mb-6 md:mb-8">
                <h2 className="mb-2 text-2xl font-black text-slate-800 md:text-3xl dark:text-white">
                  {content[activeSection]?.title}
                </h2>
                <Separator className="mt-4" />
              </div>

              <div className="space-y-8 md:space-y-12">
                {content[activeSection]?.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-800 md:text-xl dark:text-white border-l-2 border-red-600 pl-3">
                      {section.heading}
                    </h3>
                    <div className="prose prose-slate max-w-none text-slate-600 dark:prose-invert dark:text-gray-300">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-8 md:my-12" />

              <div className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-gray-900/40">
                <div className="flex gap-3">
                  <MessageSquare className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <div>
                    <h4 className="mb-1 font-bold text-slate-800 dark:text-white">
                      Butuh Bantuan Lebih Lanjut?
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      Gunakan fitur **Asisten AI Xandy 🤖** di pojok kanan bawah untuk bertanya secara interaktif. Atau hubungi tim admin FOSTI jika Anda mengalami kendala teknis lainnya.
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
