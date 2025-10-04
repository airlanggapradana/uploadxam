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
        <div className="max-w-md sm:max-w-2xl">
          <TestimonialCard
            quote="I'm tired of seeing my relatives worrying about what kind of questions will be on the exams.UploadExam exists because they can access past questions easily and prepare better."
            author="Airlangga Pradana"
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
