"use client";
import React from "react";
import {
  Code,
  ExternalLink,
  GitFork,
  GitPullRequest,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useGetGithubStats } from "@/utils/query";

const Contributions = () => {
  const { data, isLoading, error } = useGetGithubStats();
  const steps = [
    {
      icon: GitFork,
      title: "Fork Repositori",
      description:
        "Bikin salinan repo ini ke akun kamu untuk mulai berkontribusi.",
    },
    {
      icon: Code,
      title: "Lakukan Perubahan",
      description: "Tambah fitur, perbaiki bug, atau rapikan dokumentasi.",
    },
    {
      icon: GitPullRequest,
      title: "Kirim Pull Request",
      description: "Ajukan PR agar kontribusimu bisa ditinjau dan digabungkan.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-red-900 to-gray-950 px-6 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="bg-grid-white/[0.02] absolute inset-0" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-red-400" />
            <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-300 backdrop-blur-sm">
              Open Source
            </span>
          </div>
          <h2 className="mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text py-4 text-5xl font-bold tracking-tight text-transparent md:text-6xl">
            Bantu Kembangkan Platform Ini
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-400">
            Kami sangat menghargai kontribusi dari temen-temen developer semua.
            Jika kamu tertarik untuk berkontribusi, Yuk langsung saja fork
            repository kami di GitHub dan mulai berkontribusi!
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className="group relative overflow-hidden border border-gray-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl transition-all duration-300 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/20"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-red-700 to-red-900 opacity-0 blur transition-opacity duration-500 group-hover:opacity-20" />

              <CardContent className="relative p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg shadow-red-500/30 transition-transform duration-300 group-hover:scale-110">
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-gray-700">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-gray-400">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={"https://github.com/airlanggapradana/uploadxam"}
            aria-label="Fork di GitHub"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rose-600 via-red-600 to-red-700 px-8 py-4 text-base font-semibold text-white shadow-[0_8px_30px_rgba(244,63,94,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(244,63,94,0.45)] focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:outline-none active:translate-y-0"
          >
            <GitFork className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            Fork di GitHub
          </Link>
          <Link
            href={"https://github.com/airlanggapradana/uploadxam"}
            aria-label="Lihat Repository"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-red-400/50 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-red-400/40 focus-visible:outline-none"
          >
            Lihat Repository
            <ExternalLink className="h-5 w-5" />
          </Link>
        </div>

        {/* Stats */}
        <div className="border-t border-gray-800/50 pt-12">
          {isLoading ? (
            <div className="flex flex-wrap items-center justify-center gap-12 text-center md:gap-20">
              {[1, 2].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="mb-2 h-14 w-24 animate-pulse rounded-lg bg-gray-800/50" />
                  <div className="mx-auto h-4 w-20 animate-pulse rounded bg-gray-800/50" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <p className="text-lg text-red-400">
                Gagal memuat statistik repository
              </p>
              <p className="text-sm text-gray-500">Silakan coba lagi nanti</p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-12 text-center md:gap-20">
              <div className="group cursor-pointer">
                <p className="mb-2 bg-gradient-to-br from-red-400 to-red-500 bg-clip-text text-5xl font-bold text-transparent transition-transform group-hover:scale-110">
                  {data?.stargazers_count ?? 0}
                </p>
                <p className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                  GitHub Stars
                </p>
              </div>
              <div className="group cursor-pointer">
                <p className="mb-2 bg-gradient-to-br from-red-400 to-red-500 bg-clip-text text-5xl font-bold text-transparent transition-transform group-hover:scale-110">
                  {data?.forks_count ?? 0}
                </p>
                <p className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                  Forks
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contributions;
