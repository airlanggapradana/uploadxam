"use client";

import React from "react";
import Image from "next/image";

const brands = [
  { name: "FOSTI UMS", label: "FOSTI UMS" },
  { name: "Teknik Informatika UMS", label: "TEKNIK INFORMATIKA" },
  { name: "Sistem Informasi UMS", label: "SISTEM INFORMASI" },
  { name: "Ilmu Komunikasi UMS", label: "ILMU KOMUNIKASI" },
  { name: "Kecerdasan Buatan UMS", label: "KECERDASAN BUATAN" },
  { name: "FKI UMS", label: "FAKULTAS KOMUNIKASI & INFORMATIKA" },
];

const BrandMarquee = () => {
  return (
    <section className="w-full bg-[#050505] text-white py-10 border-y border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Dipercaya & Dikembangkan Untuk Mahasiswa Lintas Prodi FKI UMS
        </span>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        {/* Gradient Fade Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap">
          {[...brands, ...brands, ...brands].map((brand, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-xl bg-white/5 border border-white/10 opacity-70 hover:opacity-100 hover:border-red-500/40 hover:bg-red-950/20 transition-all cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-xs font-extrabold tracking-wider font-mono text-gray-200 uppercase">
                {brand.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
