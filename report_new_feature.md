# Task

Implement a new feature called **"Laporkan Soal"** (Report Exam) in the existing UploadXam application.

## Context

UploadXam is a web platform where students can upload and browse previous exam questions.

Users should be able to report problems on an uploaded exam so administrators can review and take action.

Follow the existing project architecture, coding style, folder structure, and conventions.

Do NOT introduce a different architecture.

---

# Feature Overview

Add a "Laporkan Soal" button on every exam detail page.

When clicked, a modal should appear allowing users to submit a report.

The report will be stored in the database and visible from the admin dashboard.

---

# Report Reasons

Provide predefined reasons:

- File rusak
- Salah mata kuliah
- Salah semester
- Salah tahun
- Soal duplikat
- Konten tidak pantas
- Hak cipta
- Lainnya

If user selects "Lainnya", show a textarea.

---

# Report Form

Fields:

- reason (required)
- description (optional except "Lainnya")
- email (optional)
- anonymous (boolean)

Validation:

- prevent empty submission
- sanitize input
- limit description to 500 characters

---

# Backend

Create REST endpoints.

POST /reports

GET /admin/reports

GET /admin/reports/:id

PATCH /admin/reports/:id

DELETE /admin/reports/:id

---

# Database

Create a new table:

reports

id
examId
reason
description
status
email
anonymous
createdAt
updatedAt

status enum:

PENDING
UNDER_REVIEW
RESOLVED
REJECTED

Add proper indexes.

---

# Admin Dashboard

Create a Report Management page.

Features:

- pagination
- filtering
- search
- sorting
- change status
- delete report
- view exam
- view report detail

---

# User Experience

After successful submission:

show toast:

"Laporan berhasil dikirim."

Prevent duplicate submissions from the same user within 24 hours for the same exam.

---

# Security

Rate limit report submission.

Validate payload.

Escape HTML.

Prevent spam.

---

# AI Enhancement

When a report is submitted, automatically generate an AI summary.

The AI should summarize the report into one sentence.

Store:

aiSummary

Example:

User Input:

"The uploaded file contains only blank pages."

AI Summary:

"Reported exam file is blank."

Do NOT reject reports using AI.

Only summarize.

---

# Future Ready

Structure the code so AI moderation can easily be added later.

---

# Acceptance Criteria

✅ User can submit report.

✅ Admin can manage reports.

✅ Reports linked to exams.

✅ AI summary generated.

✅ Validation works.

✅ Pagination works.

✅ No TypeScript errors.

✅ Follow existing code style.

---

Before implementing:

1. Analyze current project architecture.
2. Reuse existing components.
3. Reuse existing UI library.
4. Reuse existing API patterns.
5. Avoid duplicated code.

Implement everything end-to-end.