"use client";
import React from "react";
import { TestimonialCard } from "@/components/reusables/TestimoniCard";
import { useGetUserStats } from "@/utils/query";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CountUp from "@/components/CountUp";

const prodiDisplayNames: Record<string, string> = {
  Informatika: "Informatika",
  Sistem_Informasi: "Sistem Informasi",
  Ilmu_Komunikasi: "Ilmu Komunikasi",
};

const prodiColors: Record<string, string> = {
  Informatika: "#59ceff", // blue
  Sistem_Informasi: "#ffc255", // yellow
  Ilmu_Komunikasi: "#f88627", // orange
};

const Testimonials = () => {
  const { data, isLoading, error } = useGetUserStats();

  return (
    <div className="relative min-h-screen w-full bg-black px-4 py-16 sm:py-24">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), radial-gradient(68% 58% at 50% 50%, #c81e3a 0%, #7d1a2f 40%, #0a0a0a 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black/80 opacity-90" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="max-w-2xl bg-gradient-to-br from-red-100 to-red-700 bg-clip-text py-5 text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Dari Mahasiswa, Untuk Mahasiswa.
        </h1>

        <div className="mt-12 space-y-4">
          <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <div className="space-y-2 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-red-700 border-t-red-400" />
                  <p className="text-muted-foreground text-sm">
                    Loading statistics...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="col-span-full rounded-lg border border-red-900/50 bg-red-950/20 p-8 text-center">
                <p className="text-sm font-medium text-red-400">
                  Failed to load breakdown data.
                </p>
              </div>
            ) : data?.breakdown && data.breakdown.length > 0 ? (
              data.breakdown.map((item, index) => (
                <Card
                  key={item.prodi}
                  className="animate-in slide-in-from-bottom-4 border border-red-900 bg-gradient-to-br from-red-900 to-black shadow-lg transition-all duration-300 hover:border-red-700/40 hover:shadow-red-900/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <h4 className="text-base font-semibold text-gray-100">
                        {prodiDisplayNames[item.prodi] ?? item.prodi}
                      </h4>
                      <p className="text-xs text-gray-300">
                        {item.totalUsers} mahasiswa
                      </p>
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <Progress
                        value={item.percentage}
                        className="h-2 flex-1"
                        style={
                          {
                            "--progress-background": prodiColors[item.prodi],
                          } as React.CSSProperties
                        }
                      />
                      <div
                        className="flex items-center text-xl font-medium"
                        style={{ color: prodiColors[item.prodi] ?? "#f8fafc" }}
                      >
                        <CountUp
                          from={0}
                          to={Number(item.percentage.toFixed(1))}
                          separator=","
                          startWhen={true}
                          direction="up"
                          delay={0.25}
                          duration={1}
                          className="text-xl font-semibold"
                        />
                        <span className="text-xl font-semibold">%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center">
                <p className="text-muted-foreground text-sm">
                  No data available.
                </p>
              </div>
            )}
          </div>

          <div className="max-w-md sm:max-w-4xl">
            <TestimonialCard
              quote="Aku capek ngeliat temen-temen pada bingung mikirin soal ujian kayak apa nantinya. UploadXam hadir untuk ngebantu mahasiswa kayak kita belajar dan persiapin ujian agar lebih mudah dan efektif."
              author="Airlangga Pradana"
              socials={[
                {
                  type: "linkedin",
                  url: "https://www.linkedin.com/in/airlanggapradana/",
                },
                {
                  type: "instagram",
                  url: "https://www.instagram.com/iamrangga._/",
                },
                {
                  type: "whatsapp",
                  url: "https://wa.me/6281227151326",
                },
              ]}
              title="Teknik Informatika '24"
              avatarUrl="https://res.cloudinary.com/airlanggapradana/image/upload/v1759160258/super_resolution_20250918161920060_xwhg9b.jpg"
              avatarFallback="AP"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
