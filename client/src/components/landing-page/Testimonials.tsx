import React from "react";
import { TestimonialCard } from "@/components/reusables/TestimoniCard";

const Testimonials = () => {
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

        <div className="mt-12 max-w-md sm:max-w-4xl">
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
  );
};

export default Testimonials;
