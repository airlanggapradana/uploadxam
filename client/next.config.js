/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // Performance: compress responses
  compress: true,
  // SEO: remove X-Powered-By header for security
  poweredByHeader: false,
  // SEO: consistent URL without trailing slash
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "teknikinformatika.ums.ac.id",
      },
    ],
    // Prefer modern formats for performance
    formats: ["image/avif", "image/webp"],
  },
};

export default config;
