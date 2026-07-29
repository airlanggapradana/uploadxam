# Knowledge Base Metadata

## General Information

| Field | Value |
|-------|-------|
| Knowledge Base | UMS Academic Curriculum Knowledge Base |
| Version | 1.0.0 |
| Language | Indonesian (id-ID) |
| Encoding | UTF-8 |
| Format | Markdown |
| Domain | Higher Education |
| Institution | Universitas Muhammadiyah Surakarta |
| Institution Alias | UMS |
| Knowledge Type | Academic Curriculum |
| Last Updated | 2026-07-27 |
| Source Type | Official Curriculum |
| Chunk Strategy | Semantic Chunking |
| Embedding Ready | Yes |
| Target LLM | Google Gemini |
| Recommended Embedding Model | text-embedding-004 (or latest Gemini Embedding Model) |

---

# Purpose

Dokumen ini merupakan metadata utama dari knowledge base yang digunakan oleh sistem Retrieval Augmented Generation (RAG).

Knowledge base ini dirancang untuk membantu model bahasa menjawab pertanyaan mengenai kurikulum akademik Universitas Muhammadiyah Surakarta secara akurat berdasarkan data resmi.

Knowledge base tidak digunakan untuk menghasilkan opini ataupun informasi di luar data kurikulum.

---

# Coverage

Knowledge base ini mencakup informasi mengenai:

- Program Studi
- Kurikulum
- Semester
- Mata Kuliah
- Kode Mata Kuliah
- Jumlah SKS
- Mata Kuliah Wajib
- Mata Kuliah Pilihan
- Konsentrasi
- Profil Lulusan
- Total SKS Kelulusan

---

# Supported Study Programs

Knowledge base saat ini mencakup empat program studi.

| Program Studi | Alias |
|---------------|------|
| Teknik Informatika | TI, Informatika |
| Sistem Informasi | SI |
| Ilmu Komunikasi | IKOM, Komunikasi |
| Kecerdasan Buatan | AI, Artificial Intelligence |

---

# Academic Structure

Seluruh program studi menggunakan struktur akademik berikut.

- Semester 1
- Semester 2
- Semester 3
- Semester 4
- Semester 5
- Semester 6
- Semester 7
- Semester 8

Semester digunakan sebagai unit utama pengelompokan mata kuliah.

---

# Knowledge Organization

Knowledge disusun menjadi beberapa kategori.

1. Metadata
2. Alias
3. FAQ
4. Course Index
5. Semester Index
6. Program Study Overview
7. Semester Documents
8. Elective Courses
9. Concentration Documents
10. Individual Course Documents

---

# Data Sources

Seluruh informasi berasal dari situs resmi Universitas Muhammadiyah Surakarta.

| Program Studi | Source |
|---------------|--------|
| Teknik Informatika | https://teknikinformatika.ums.ac.id/mata-kuliah/ |
| Sistem Informasi | https://sif.ums.ac.id/kurikulum/ |
| Ilmu Komunikasi | https://komunikasi.ums.ac.id/kurikulum/ |
| Kecerdasan Buatan | https://aif.ums.ac.id/kurikulum/ |

---

# Retrieval Scope

Model diperbolehkan menjawab pertanyaan mengenai:

- daftar mata kuliah
- semester mata kuliah
- kode mata kuliah
- jumlah SKS
- total SKS
- konsentrasi
- mata kuliah pilihan
- profil lulusan
- hubungan antar mata kuliah
- program studi
- struktur kurikulum

Model tidak diperbolehkan mengarang informasi yang tidak terdapat pada knowledge base.

Apabila informasi tidak ditemukan, model harus menyatakan bahwa informasi tersebut tidak tersedia.

---

# Retrieval Priority

Prioritas pencarian informasi.

Priority 1

- Individual Course Documents

Priority 2

- Semester Documents

Priority 3

- Program Study Overview

Priority 4

- Course Index

Priority 5

- FAQ

Priority 6

- Metadata

---

# Supported Query Examples

Knowledge base ini dirancang untuk menjawab pertanyaan seperti:

- Mata kuliah Machine Learning semester berapa?
- Berapa SKS Pemrograman Web?
- Apa saja mata kuliah semester 5 Teknik Informatika?
- Mata kuliah pilihan Sistem Informasi apa saja?
- Apa konsentrasi yang tersedia pada Teknik Informatika?
- Total SKS Program Studi Kecerdasan Buatan?
- Mata kuliah apa yang berkaitan dengan Artificial Intelligence?
- Apa kode mata kuliah Rekayasa Perangkat Lunak?
- Mata kuliah semester 3 Ilmu Komunikasi?
- Apa saja mata kuliah wajib Sistem Informasi?

---

# Chunking Strategy

Knowledge base menggunakan semantic chunking.

Satu dokumen hanya membahas satu topik utama.

Contoh:

- satu semester
- satu mata kuliah
- satu konsentrasi
- satu program studi

Hal ini bertujuan meningkatkan akurasi embedding dan retrieval.

---

# Naming Convention

Folder menggunakan format:

program-study-name/

Contoh

teknik-informatika/
sistem-informasi/
ilmu-komunikasi/
kecerdasan-buatan/

File menggunakan format:

overview.md
semester-1.md
semester-2.md
...
semester-8.md
electives.md
course-index.md

Individual course:

algoritma-dan-pemrograman.md
machine-learning.md
pemrograman-web.md

---

# Metadata Tags

```
domain: education
institution: Universitas Muhammadiyah Surakarta
institution_alias: UMS
language: id
knowledge: curriculum
format: markdown
embedding: semantic
retrieval: rag
version: 1.0.0
```

---

# Intended Use

Knowledge base ini ditujukan untuk:

- Google Gemini
- Gemini API
- Vertex AI
- LangChain
- LlamaIndex
- Haystack
- RAG Pipeline
- Vector Database

---

# Maintenance

Apabila terdapat perubahan kurikulum, setiap dokumen harus diperbarui secara independen tanpa mengubah struktur knowledge base.

Nomor versi harus dinaikkan setiap kali terdapat perubahan data.

---

# License

Knowledge ini disusun berdasarkan informasi kurikulum yang dipublikasikan secara resmi oleh Universitas Muhammadiyah Surakarta dan digunakan sebagai referensi dalam sistem Retrieval Augmented Generation.