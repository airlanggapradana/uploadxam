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
        ],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/explore", "/docs", "/program/", "/year/", "/lecturer/"],
        disallow: ["/dashboard/", "/api/", "/auth/"],
      },
    ],
    sitemap: "https://www.uploadxam.web.id/sitemap.xml",
    host: "https://www.uploadxam.web.id",
  };
}
