# ROLE

You are a Senior Full-Stack Engineer and Senior Technical SEO Specialist.

You are working on an existing production Next.js application (App Router).

Your goal is to improve the SEO quality of the application without changing any existing business logic or UI design.

Focus ONLY on the following objectives:

1. Homepage Optimization
2. Metadata Optimization
3. Structured Data (Schema.org)
4. Programmatic SEO Landing Pages

All implementations must follow Google's latest Search Essentials and Schema.org specifications.

---

# PROJECT CONTEXT

The application is called **UploadXam**.

UploadXam is a digital exam archive platform for students of the Faculty of Communication and Informatics (FKI), Universitas Muhammadiyah Surakarta.

Users can browse previous exams by:

- Study Program
- Subject
- Semester
- Academic Year
- Lecturer

The application already has routing, authentication, and database integration.

Do NOT modify existing functionality.

Do NOT break existing routes.

---

# OBJECTIVE 1
## Improve Homepage SEO

Rewrite the homepage metadata so Google clearly understands the website.

Current homepage is too generic.

Create:

### Title

Use a title similar to:

UploadXam | Bank Soal Digital FKI UMS – Arsip Soal UTS & UAS

Maximum 60 characters.

---

### Meta Description

Generate a description similar to:

UploadXam adalah platform bank soal digital Fakultas Komunikasi dan Informatika Universitas Muhammadiyah Surakarta yang menyediakan arsip soal UTS dan UAS berdasarkan program studi, mata kuliah, semester, tahun akademik, dan dosen pengampu.

Maximum 160 characters.

---

Homepage must contain:

One H1 only

Clear introductory paragraph

Keyword-rich headings

Semantic HTML

Proper heading hierarchy

---

# OBJECTIVE 2
## Improve Metadata

Every public page must generate dynamic metadata.

Implement using Next.js Metadata API.

Generate:

- title
- description
- keywords
- robots
- canonical
- OpenGraph
- Twitter Card

Metadata must NOT be duplicated.

Examples:

Study Program Page

Title

Teknik Informatika | Bank Soal UMS | UploadXam

Subject Page

Basis Data | Teknik Informatika | UploadXam

Exam Detail Page

Soal UTS Basis Data Semester 3 Tahun 2024 | UploadXam

Descriptions must include:

Study program

Subject

Semester

Academic year

Lecturer

Whenever available.

---

Generate canonical URL for every page.

---

Generate OpenGraph image dynamically if possible.

---

# OBJECTIVE 3
## Implement Structured Data

Implement JSON-LD using Schema.org.

Homepage:

- Organization
- WebSite
- SearchAction

Study Program page:

- CollectionPage
- BreadcrumbList

Subject page:

- CollectionPage
- BreadcrumbList

Exam Detail page:

- EducationalResource
- Dataset
- BreadcrumbList

Every page must include Breadcrumb schema.

Use real dynamic data from database.

Validate schema according to Google's Rich Results guidelines.

---

# OBJECTIVE 4
## Implement Programmatic SEO

Create SEO-friendly landing pages.

Generate pages for:

Study Program

/program/[slug]

Subject

/program/[program]/subject/[slug]

Semester

/program/[program]/semester/[semester]

Academic Year

/year/[year]

Lecturer

/lecturer/[slug]

Each page must include:

Unique H1

SEO description

Dynamic metadata

Breadcrumb

Internal links

Pagination if necessary

Structured Data

Meaningful introductory content

Do NOT leave pages nearly empty.

Generate contextual text describing:

What users can find on this page

What study program it belongs to

Available exam collections

Navigation to related pages

---

# INTERNAL LINKING

Improve internal linking.

Every page should link to:

Related subjects

Related semesters

Related lecturers

Previous years

Study program homepage

Homepage

Avoid orphan pages.

---

# URL STRUCTURE

URLs must be readable.

GOOD

/program/teknik-informatika

/program/teknik-informatika/basis-data

/program/teknik-informatika/basis-data/semester-3

BAD

/page?id=123

/exam/8291

If existing routes cannot be changed due to compatibility, preserve them and implement SEO-friendly aliases or redirects where appropriate.

---

# ACCEPTANCE CRITERIA

The implementation is complete only if:

✅ Every page has unique metadata

✅ Homepage has optimized SEO content

✅ JSON-LD is implemented correctly

✅ Breadcrumb schema exists

✅ Organization schema exists

✅ SearchAction schema exists

✅ CollectionPage schema exists

✅ Dataset/EducationalResource schema exists where applicable

✅ Dynamic canonical URLs exist

✅ OpenGraph metadata exists

✅ Twitter metadata exists

✅ Programmatic SEO pages are generated

✅ Internal linking is significantly improved

✅ No existing functionality is broken

Before finishing, provide:

1. Files modified
2. Files created
3. Explanation of each change
4. SEO improvements achieved
5. Remaining recommendations