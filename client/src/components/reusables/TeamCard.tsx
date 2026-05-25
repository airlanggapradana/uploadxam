import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BadgeCheck, Users, ImageIcon } from "lucide-react";

interface Social {
  type: "instagram" | "linkedin" | "whatsapp";
  url: string;
}

type ImagePosition =
  | "top"
  | "center"
  | "bottom"
  | "left"
  | "right"
  | (string & {});

interface TeamCardProps {
  quote: string;
  author: string;
  title: string;
  avatarUrl: string;
  avatarFallback: string;
  socials?: Social[];
  followers?: number;
  posts?: number;
  /** Controls the CSS object-position of the photo.
   * Accepts presets: "top" | "center" | "bottom" | "left" | "right"
   * or any custom CSS value e.g. "50% 20%" or "center 30%"
   * @default "top"
   */
  imagePosition?: ImagePosition;
}

const socialIcons = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  whatsapp: FaWhatsapp,
};

export function TeamCard({
  quote,
  author,
  title,
  avatarUrl,
  avatarFallback,
  socials = [],
  imagePosition = "top",
}: TeamCardProps) {
  const primarySocial = socials[0];

  return (
    <div
      className="group relative w-[260px] overflow-hidden rounded-3xl shadow-2xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      style={{
        background: "#1a1a1f",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {/* Photo Area */}
      <div
        className="relative h-[280px] w-full overflow-hidden"
        style={{ isolation: "isolate" }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={author}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              objectPosition: imagePosition,
              backfaceVisibility: "hidden",
              willChange: "transform",
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-4xl font-bold text-white">
            {avatarFallback}
          </div>
        )}
        {/* Gradient overlay at bottom of photo */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1a1a1f] to-transparent" />
      </div>

      {/* Card Content */}
      <div className="px-5 pt-2 pb-5">
        {/* Name + Verified Badge */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg leading-tight font-bold text-white">
            {author}
          </h3>
          <BadgeCheck className="h-5 w-5 flex-shrink-0 fill-red-400/20 text-red-400" />
        </div>

        {/* Bio / Quote */}
        <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-neutral-400">
          {quote}
        </p>

        {/* Social / Follow Row */}
        <div className="mt-4 flex items-center justify-between">
          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map((social) => {
              const Icon = socialIcons[social.type];
              return (
                <a
                  key={social.type}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.type}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700/60 text-neutral-300 transition-colors hover:bg-red-500 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          {/* Role badge */}
          <span className="rounded-full bg-red-500/60 px-3 py-1 text-xs font-medium text-neutral-300">
            {title.split(" ")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
