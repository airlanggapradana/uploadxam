import React from "react";
import { TeamCard } from "@/components/reusables/TeamCard";

const teamMembers = [
  {
    author: "Airlangga Pradana",
    title: "Founder & Full-Stack Developer",
    quote:
      "Uploadxam lahir dari keresahan mahasiswa yang capek ribet ngurusin berkas ujian. Semoga platform ini bisa bikin hidup kalian lebih ringan!",
    avatarUrl:
      "https://res.cloudinary.com/airlanggapradana/image/upload/v1779689150/Gemini_Generated_Image_wf93s2wf93s2wf93_zx0ejo.webp",
    avatarFallback: "AP",
    socials: [
      { type: "instagram" as const, url: "https://instagram.com/iamrangga._" },
      {
        type: "linkedin" as const,
        url: "https://www.linkedin.com/in/airlanggapradana/",
      },
    ],
  },
];

function Teams() {
  return (
    <section className="relative overflow-hidden px-4 py-24">
      <div className="relative mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-red-400 uppercase">
            Our People
          </span>
          <h2 className="mt-3 bg-gradient-to-br from-red-100 to-red-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Meet The Team
          </h2>
          <p className="mt-4 text-base text-neutral-300">
            Kenalan sama tim dibalik berdirinya uploadxam yuk!
          </p>
          {/* Decorative underline */}
          <div className="mx-auto mt-5 h-0.5 w-14 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
        </div>

        {/* Team Cards — centered flex wrap */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.author} {...member} imagePosition="center" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Teams;
