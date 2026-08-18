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
  // SEO: redirect URLs that previously returned 404 to the correct pages
  async redirects() {
    return [
      {
        // /panduan was indexed by Google but the route doesn't exist;
        // redirect permanently (301) to /docs so Google updates its index.
        source: "/panduan",
        destination: "/docs",
        permanent: true,
      },
    ];
  },
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
