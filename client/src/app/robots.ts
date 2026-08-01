import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/explore", "/docs", "/program/", "/year/", "/lecturer/"],
        disallow: [
          "/dashboard/",
          "/dashboard",
          "/api/",
          "/auth/",
          "/_next/",
          "/sitemap-0.xml",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/explore", "/docs", "/program/", "/year/", "/lecturer/"],
        disallow: ["/dashboard/", "/api/", "/auth/"],
      },
    ],
    sitemap: "https://uploadxam.fostiums.org/sitemap.xml",
    host: "https://uploadxam.fostiums.org",
  };
}
