import type { MetadataRoute } from "next";
import { PRODI_SLUG_MAP, slugify } from "@/utils/seo-helpers";
import { COURSES_BY_PRODI } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://uploadxam.fostiums.org";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const prodiSlugs = Object.keys(PRODI_SLUG_MAP);
  const years = [2026, 2025, 2024, 2023, 2022, 2021];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const prodiRoutes: MetadataRoute.Sitemap = prodiSlugs.map((slug) => ({
    url: `${baseUrl}/program/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const semesterRoutes: MetadataRoute.Sitemap = [];
  for (const slug of prodiSlugs) {
    for (const sem of semesters) {
      semesterRoutes.push({
        url: `${baseUrl}/program/${slug}/semester/${sem}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const subjectRoutes: MetadataRoute.Sitemap = [];
  for (const [prodiSlug, prodiKey] of Object.entries(PRODI_SLUG_MAP)) {
    const courses = COURSES_BY_PRODI[prodiKey] || [];
    for (const course of courses) {
      subjectRoutes.push({
        url: `${baseUrl}/program/${prodiSlug}/subject/${slugify(course)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const yearRoutes: MetadataRoute.Sitemap = years.map((year) => ({
    url: `${baseUrl}/year/${year}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...prodiRoutes,
    ...semesterRoutes,
    ...subjectRoutes,
    ...yearRoutes,
  ];
}
