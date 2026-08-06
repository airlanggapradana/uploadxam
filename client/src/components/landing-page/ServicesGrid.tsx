"use client";

import React from "react";
import { Search, FileText, Upload, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "AI Strategy & Smart Search Mapping",
    description:
      "Temukan berkas soal ujian mata kuliah secara presisi menggunakan fitur pencarian pintar berdasarkan nama prodi, kode matkul, semester, hingga dosen pengampu.",
    tags: ["Pencarian Matkul", "Filter Dosen", "Kategori Semester", "Prodi FKI"],
    icon: Search,
  },
  {
    number: "02",
    title: "Arsip UTS & UAS Digital HD PDF",
    description:
      "Akses seluruh berkas fisik soal yang telah didigitalisasi ke dalam format PDF beresolusi tinggi, siap dibaca langsung melalui browser atau diunduh.",
    tags: ["Format PDF", "Preview Cepat", "Downloader Instan", "Soal Terstruktur"],
    icon: FileText,
  },
  {
    number: "03",
    title: "Verifikasi NIM & Modul Upload Komunitas",
    description:
      "Sistem login terverifikasi NIM khusus mahasiswa UMS untuk mengunggah berkas soal baru dan berkontribusi langsung membangun bank soal kampus.",
    tags: ["Autentikasi NIM", "Upload Cepat", "Anti-Spam", "Kontribusi Mahasiswa"],
    icon: Upload,
  },
];

const ServicesGrid = () => {
  return (
    <section id="services" className="relative w-full bg-[#050505] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10">
      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, #ef4444 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/30 bg-red-950/40 text-xs font-semibold text-red-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span>Fitur Utama</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              End-to-End Digital <br />
              <span className="text-red-500 glow-text-red">Exam Services</span>
            </h2>
          </div>

          <div className="lg:col-span-6 text-left lg:text-left">
            <p className="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
              Kami mentransformasi arsip soal ujian konvensional menjadi platform digital yang cepat, aman, dan ramah pengguna untuk seluruh civitas akademika FKI UMS.
            </p>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.number}
                className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between text-left group relative overflow-hidden"
              >
                {/* Number Badge Top Right */}
                <div className="flex items-center justify-between mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-900/40 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-mono font-bold text-gray-600 group-hover:text-red-500 transition-colors">
                    ({service.number})
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Pill Tags (Reference Match) */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-gray-300 group-hover:border-red-500/30 group-hover:bg-red-950/30 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
