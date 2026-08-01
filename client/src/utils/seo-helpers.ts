import type { Metadata } from "next";
import { COURSES_BY_PRODI } from "@/data/courses";

export const BASE_URL = "https://uploadxam.fostiums.org";

export const PRODI_SLUG_MAP: Record<string, string> = {
  "teknik-informatika": "Informatika",
  "sistem-informasi": "Sistem_Informasi",
  "ilmu-komunikasi": "Ilmu_Komunikasi",
  "kecerdasan-buatan": "Kecerdasan_Buatan",
};

export const PRODI_REVERSE_SLUG_MAP: Record<string, string> = {
  Informatika: "teknik-informatika",
  Sistem_Informasi: "sistem-informasi",
  Ilmu_Komunikasi: "ilmu-komunikasi",
  Kecerdasan_Buatan: "kecerdasan-buatan",
};

export const PRODI_DISPLAY_NAMES: Record<string, string> = {
  Informatika: "Teknik Informatika",
  Sistem_Informasi: "Sistem Informasi",
  Ilmu_Komunikasi: "Ilmu Komunikasi",
  Kecerdasan_Buatan: "Kecerdasan Buatan",
  "teknik-informatika": "Teknik Informatika",
  "sistem-informasi": "Sistem Informasi",
  "ilmu-komunikasi": "Ilmu Komunikasi",
  "kecerdasan-buatan": "Kecerdasan Buatan",
};

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function unslugify(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getProdiFromSlug(slug: string): string | undefined {
  return PRODI_SLUG_MAP[slug.toLowerCase()];
}

export function getSlugFromProdi(prodi: string): string {
  return PRODI_REVERSE_SLUG_MAP[prodi] ?? slugify(prodi);
}

export function getDisplayNameFromProdi(prodi: string): string {
  const direct = PRODI_DISPLAY_NAMES[prodi];
  if (direct) return direct;
  const mappedKey = PRODI_SLUG_MAP[prodi];
  if (mappedKey && PRODI_DISPLAY_NAMES[mappedKey]) {
    return PRODI_DISPLAY_NAMES[mappedKey];
  }
  return prodi;
}

export function findSubjectFromSlug(prodiKey: string, subjectSlug: string): string {
  const courses = COURSES_BY_PRODI[prodiKey] ?? Object.values(COURSES_BY_PRODI).flat();
  const matched = courses.find((course) => slugify(course) === subjectSlug);
  return matched ?? unslugify(subjectSlug);
}

export function buildPageMetadata({
  title,
  description,
  keywords = [],
  canonicalPath,
  ogImage,
}: {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
  ogImage?: string;
}): Metadata {
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const defaultKeywords = [
    "UploadXam",
    "Bank Soal Digital",
    "FKI UMS",
    "Soal Ujian UMS",
    "UTS",
    "UAS",
    "Informatika UMS",
    "Sistem Informasi UMS",
    "Ilmu Komunikasi UMS",
    "Kecerdasan Buatan UMS",
    "FOSTI UMS",
  ];

  const fullKeywords = Array.from(new Set([...keywords, ...defaultKeywords]));
  const defaultOgImage = `${BASE_URL}/media.png`;
  const imageToUse = ogImage ?? defaultOgImage;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: fullKeywords,
    authors: [{ name: "Airlangga Pradana" }, { name: "FOSTI UMS" }],
    creator: "Airlangga Pradana",
    publisher: "FOSTI UMS",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: canonicalUrl,
      title: `${title} | UploadXam`,
      description,
      siteName: "UploadXam",
      images: [
        {
          url: imageToUse,
          width: 1200,
          height: 630,
          alt: `${title} — Bank Soal Digital FKI UMS`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | UploadXam`,
      description,
      images: [imageToUse],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export function generateCollectionPageSchema({
  name,
  description,
  url,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumbs: { name: string; url: string }[];
}) {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  return [
    generateBreadcrumbSchema(breadcrumbs),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name,
      description,
      url: fullUrl,
      inLanguage: "id",
      isPartOf: {
        "@type": "WebSite",
        name: "UploadXam",
        url: BASE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "FOSTI UMS",
        url: BASE_URL,
      },
    },
  ];
}

export function generateEducationalResourceSchema({
  name,
  description,
  url,
  subject,
  prodi,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  subject: string;
  prodi: string;
  breadcrumbs: { name: string; url: string }[];
}) {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  return [
    generateBreadcrumbSchema(breadcrumbs),
    {
      "@context": "https://schema.org",
      "@type": "EducationalResource",
      name,
      description,
      url: fullUrl,
      learningResourceType: "Exam Archive",
      educationalLevel: "Higher Education",
      about: {
        "@type": "Thing",
        name: subject,
      },
      provider: {
        "@type": "EducationalOrganization",
        name: `Fakultas Komunikasi dan Informatika UMS - ${prodi}`,
      },
      inLanguage: "id",
    },
  ];
}
