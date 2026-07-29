# Concentration Index

## Purpose

Dokumen ini merupakan indeks seluruh konsentrasi (peminatan) yang tersedia pada Knowledge Base Kurikulum Universitas Muhammadiyah Surakarta (UMS).

Saat ini, konsentrasi hanya tersedia pada Program Studi Teknik Informatika.

Dokumen ini digunakan sebagai entry point ketika pengguna mencari informasi berdasarkan konsentrasi atau peminatan.

Dokumen ini tidak menyimpan deskripsi lengkap maupun daftar mata kuliah secara rinci. Informasi detail tersedia pada dokumen konsentrasi dan dokumen mata kuliah masing-masing.

---

# Supported Study Programs

| Program Studi | Memiliki Konsentrasi |
|---------------|----------------------|
| Teknik Informatika | Ya |
| Sistem Informasi | Tidak |
| Ilmu Komunikasi | Tidak |
| Kecerdasan Buatan | Tidak |

---

# Available Concentrations

## Rekayasa Perangkat Lunak (RPL)

Program Studi

Teknik Informatika

Document

```
teknik-informatika/concentrations/rpl.md
```

Alias

- RPL
- Software Engineering
- Software Development

Focus Areas

- Pengembangan Perangkat Lunak
- Analisis Sistem
- Software Architecture
- Software Testing
- DevOps
- Software Project Management

Typical Keywords

- software engineering
- rekayasa perangkat lunak
- backend
- frontend
- fullstack
- web development
- mobile development
- software architecture

Related Documents

- course-index.md
- teknik-informatika/overview.md
- teknik-informatika/semester-5.md
- teknik-informatika/semester-6.md
- courses/

---

## Sistem Jaringan (SJ)

Program Studi

Teknik Informatika

Document

```
teknik-informatika/concentrations/sj.md
```

Alias

- SJ
- Network
- Computer Network
- Networking

Focus Areas

- Computer Network
- Network Administration
- Network Security
- Cloud Computing
- Internet of Things
- Distributed System

Typical Keywords

- network
- jaringan
- cloud
- security
- firewall
- routing
- switching
- IoT

Related Documents

- course-index.md
- teknik-informatika/overview.md
- teknik-informatika/semester-5.md
- teknik-informatika/semester-6.md
- courses/

---

## Sistem Interaktif Cerdas (SIC)

Program Studi

Teknik Informatika

Document

```
teknik-informatika/concentrations/sic.md
```

Alias

- SIC
- Intelligent Interactive Systems
- Intelligent System

Focus Areas

- Artificial Intelligence
- Machine Learning
- Deep Learning
- Computer Vision
- Natural Language Processing
- Data Science

Typical Keywords

- AI
- Machine Learning
- Computer Vision
- NLP
- Deep Learning
- Artificial Intelligence

Related Documents

- course-index.md
- teknik-informatika/overview.md
- teknik-informatika/semester-5.md
- teknik-informatika/semester-6.md
- courses/

---

# Search Patterns

Contoh query yang dapat diarahkan menggunakan indeks ini.

## Berdasarkan Nama Konsentrasi

- Rekayasa Perangkat Lunak
- Sistem Jaringan
- Sistem Interaktif Cerdas

---

## Berdasarkan Singkatan

- RPL
- SJ
- SIC

---

## Berdasarkan Bahasa Inggris

- Software Engineering
- Computer Network
- Intelligent Interactive Systems

---

## Berdasarkan Bidang

Artificial Intelligence

→ Sistem Interaktif Cerdas

Network

→ Sistem Jaringan

Software Development

→ Rekayasa Perangkat Lunak

Cloud Computing

→ Sistem Jaringan

Machine Learning

→ Sistem Interaktif Cerdas

Software Architecture

→ Rekayasa Perangkat Lunak

---

# Supported Questions

Contoh pertanyaan yang dapat dijawab menggunakan dokumen ini.

- Apa saja konsentrasi Teknik Informatika?
- Apa perbedaan RPL dan SIC?
- Konsentrasi AI ada di mana?
- Mata kuliah Cloud Computing masuk konsentrasi apa?
- Saya ingin fokus menjadi Software Engineer, konsentrasi apa yang sesuai?
- Mata kuliah Machine Learning termasuk konsentrasi apa?
- Konsentrasi Jaringan mempelajari apa?
- Konsentrasi apa yang mempelajari Computer Vision?
- Apa arti SIC?
- Apa arti RPL?

---

# Retrieval Strategy

Jika query mengandung:

- RPL
- SJ
- SIC
- konsentrasi
- peminatan
- specialization
- software engineering
- network
- artificial intelligence

maka sistem harus:

1. Mengidentifikasi konsentrasi yang dimaksud.
2. Mengambil dokumen konsentrasi terkait.
3. Mengambil dokumen mata kuliah yang berkaitan apabila diperlukan.
4. Menyusun jawaban berdasarkan informasi hasil retrieval.

---

# Ambiguous Query Examples

## Query

Saya ingin belajar AI.

Response

Bidang Artificial Intelligence berkaitan dengan konsentrasi Sistem Interaktif Cerdas (SIC).

Apabila Anda ingin mengetahui mata kuliah yang dipelajari, sistem akan mengambil dokumen konsentrasi SIC beserta mata kuliah yang relevan.

---

## Query

RPL itu apa?

Response

RPL merupakan singkatan dari Rekayasa Perangkat Lunak, yaitu salah satu konsentrasi pada Program Studi Teknik Informatika.

---

# Notes

Concentration Index hanya berfungsi sebagai indeks navigasi.

Seluruh informasi rinci mengenai:

- deskripsi konsentrasi,
- tujuan pembelajaran,
- daftar mata kuliah,
- kompetensi,
- dan hubungan antar mata kuliah

tersedia pada dokumen:

- `teknik-informatika/concentrations/rpl.md`
- `teknik-informatika/concentrations/sj.md`
- `teknik-informatika/concentrations/sic.md`