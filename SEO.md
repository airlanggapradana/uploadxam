# ROLE

You are a Senior Technical SEO Engineer and Senior Full-Stack Web Developer.

Your task is to perform a complete SEO implementation for an existing production web application.

Do NOT redesign the application unless necessary for SEO.
Focus on maximizing visibility, crawlability, indexing, page quality, and search performance.

---

# PRIMARY OBJECTIVES

Implement a production-ready SEO strategy that follows Google's latest recommendations.

The implementation should improve:

- Google Search indexing
- Organic search visibility
- Rich search results
- Crawl efficiency
- Core Web Vitals
- Semantic HTML
- Accessibility
- Metadata quality
- Internal linking

The website should be ready to be submitted to Google Search Console.

---

# TASKS

## 1. Technical SEO

Audit the existing application and implement:

- robots.txt
- sitemap.xml
- sitemap index (if multiple sitemaps are needed)
- canonical URLs
- pagination canonical (if applicable)
- proper HTTP status codes
- redirect strategy
- trailing slash consistency
- www/non-www consistency
- HTTPS enforcement
- duplicate URL detection
- clean URL structure

---

## 2. Metadata

Every page must have:

Unique

- title
- meta description

Optional when appropriate

- meta keywords
- author
- robots
- viewport
- theme-color

Social metadata

OpenGraph

- og:title
- og:description
- og:image
- og:url
- og:type

Twitter

- twitter:card
- twitter:title
- twitter:description
- twitter:image

---

## 3. Structured Data

Implement JSON-LD where appropriate.

Examples:

Organization

Website

Breadcrumb

WebPage

Article

BlogPosting

FAQ

Product

SearchAction

SoftwareApplication

Person

LocalBusiness (if applicable)

Use schema.org standards.

---

## 4. Semantic HTML

Improve HTML structure.

Ensure:

- only one H1
- correct heading hierarchy
- semantic elements
- main
- header
- nav
- article
- aside
- section
- footer

Avoid unnecessary div nesting.

---

## 5. Images

Optimize every image.

Implement:

- descriptive alt text
- lazy loading
- responsive images
- width and height attributes
- modern formats
- preload hero image if necessary

---

## 6. Internal Linking

Improve internal navigation.

Implement:

- contextual links
- breadcrumbs
- related content
- logical navigation hierarchy

Avoid orphan pages.

---

## 7. Performance SEO

Improve Core Web Vitals.

Optimize:

- Largest Contentful Paint
- Interaction to Next Paint
- Cumulative Layout Shift

Implement:

- code splitting
- lazy loading
- image optimization
- font optimization
- preload important assets
- preconnect
- dns-prefetch

Reduce unnecessary JavaScript.

---

## 8. Accessibility

Improve accessibility because it also affects SEO.

Ensure:

- aria-label
- form labels
- keyboard navigation
- sufficient contrast
- descriptive links
- focus states

---

## 9. Indexing Optimization

Ensure every important page is indexable.

Avoid indexing:

- admin pages
- authentication pages
- dashboard
- duplicate pages
- search result pages (if needed)
- private pages

Configure robots directives correctly.

---

## 10. URL Strategy

URLs should be:

Readable

Short

Keyword-friendly

Example

GOOD

/exams/web-development

BAD

/page?id=123

---

## 11. Google Search Console Readiness

Ensure the project is ready for:

- sitemap submission
- robots validation
- indexing request
- rich result testing

---

## 12. Open Graph Assets

Generate or recommend dynamic OG images for important pages.

---

## 13. Favicons

Generate:

favicon.ico

apple-touch-icon

android icons

manifest.json

mask icon

theme color

---

## 14. PWA SEO (if applicable)

Ensure:

manifest.json

correct metadata

icons

offline fallback

---

## 15. Next.js Optimization (if using Next.js)

If this project uses Next.js:

Use Metadata API.

Generate dynamic metadata.

Generate dynamic sitemap.

Generate robots.

Use next/image.

Use dynamic OpenGraph.

Use static generation where possible.

Use ISR where beneficial.

Avoid client-side rendering for SEO-critical pages.

---

## 16. Content SEO

Audit every page.

Ensure:

clear H1

keyword-rich title

descriptive meta description

proper headings

meaningful anchor text

semantic structure

good content hierarchy

---

## 17. Rich Results

Implement structured data required for:

Google Rich Snippets

FAQ

Breadcrumb

Article

Search Box

Organization

---

## 18. Crawl Budget Optimization

Reduce unnecessary crawling.

Block:

duplicate URLs

internal APIs

private pages

temporary routes

unused assets

---

## 19. Validation

Run through every page and identify:

missing titles

duplicate titles

missing descriptions

multiple H1

broken links

broken images

missing alt

incorrect canonical

noindex mistakes

schema validation errors

---

## 20. Deliverables

Produce:

1. SEO Audit Report

2. List of detected issues

3. Priority level

Critical

High

Medium

Low

4. Files created

5. Files modified

6. Explanation of every change

7. Code implementation

8. Final SEO score

9. Remaining recommendations

---

# REQUIREMENTS

Do not remove existing functionality.

Do not introduce breaking changes.

Preserve all routes.

Follow Google Search Essentials.

Follow Schema.org standards.

Follow W3C HTML recommendations.

Follow modern SEO best practices (2026).

---

# FINAL GOAL

The application should be production-ready with enterprise-level SEO implementation and be optimized for maximum Google indexing, discoverability, and long-term organic search performance.