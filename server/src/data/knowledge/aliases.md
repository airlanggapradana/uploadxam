# Aliases

## Purpose

Dokumen ini berisi pemetaan sinonim, singkatan, variasi penulisan, dan istilah yang memiliki makna sama.

Tujuan utama file ini adalah membantu proses Retrieval Augmented Generation (RAG) agar berbagai variasi query pengguna tetap dapat dipetakan ke knowledge yang benar.

---

# Institution

## Universitas Muhammadiyah Surakarta

Canonical

Universitas Muhammadiyah Surakarta

Aliases

- UMS
- Muhammadiyah Surakarta
- Univ Muhammadiyah Surakarta

---

# Study Programs

## Teknik Informatika

Canonical

Teknik Informatika

Aliases

- TI
- Informatika
- Teknik Info
- Computer Science
- CS

Search Keywords

- teknik informatika
- informatika
- ti
- cs
- computer science

---

## Sistem Informasi

Canonical

Sistem Informasi

Aliases

- SI
- Information Systems
- Information System

Search Keywords

- sistem informasi
- si
- information systems

---

## Ilmu Komunikasi

Canonical

Ilmu Komunikasi

Aliases

- IKOM
- Komunikasi
- Communication
- Communication Studies

Search Keywords

- ilmu komunikasi
- komunikasi
- ikom

---

## Kecerdasan Buatan

Canonical

Kecerdasan Buatan

Aliases

- AI
- Artificial Intelligence
- Artificial Intelligent
- Artificial Intelligence Program

Search Keywords

- ai
- artificial intelligence
- kecerdasan buatan

---

# Concentrations

## Rekayasa Perangkat Lunak

Canonical

Rekayasa Perangkat Lunak

Aliases

- RPL
- Software Engineering
- Software Development

---

## Sistem Jaringan

Canonical

Sistem Jaringan

Aliases

- SJ
- Network
- Computer Network
- Networking

---

## Sistem Interaktif Cerdas

Canonical

Sistem Interaktif Cerdas

Aliases

- SIC
- Intelligent Interactive System
- Intelligent Systems

---

# Academic Terms

## Mata Kuliah

Canonical

Mata Kuliah

Aliases

- MK
- Course
- Subject
- Class

---

## Mata Kuliah Wajib

Canonical

Mata Kuliah Wajib

Aliases

- Mandatory Course
- Required Course
- Wajib

---

## Mata Kuliah Pilihan

Canonical

Mata Kuliah Pilihan

Aliases

- Elective
- Elective Course
- Optional Course
- Pilihan

---

## Program Studi

Canonical

Program Studi

Aliases

- Prodi
- Major
- Department
- Study Program

---

## Kurikulum

Canonical

Kurikulum

Aliases

- Curriculum
- Academic Curriculum
- Struktur Kurikulum

---

## Semester

Canonical

Semester

Aliases

- Sem
- Term
- Academic Term

---

## SKS

Canonical

SKS

Aliases

- Satuan Kredit Semester
- Credit
- Credits
- Academic Credit
- Credit Hour

---

# Technology Terms

## Artificial Intelligence

Canonical

Artificial Intelligence

Aliases

- AI
- Kecerdasan Buatan

Related

- Machine Learning
- Deep Learning
- Computer Vision
- NLP

---

## Machine Learning

Canonical

Machine Learning

Aliases

- ML
- Pembelajaran Mesin

---

## Deep Learning

Canonical

Deep Learning

Aliases

- DL
- Deep Neural Network

---

## Natural Language Processing

Canonical

Natural Language Processing

Aliases

- NLP
- Pemrosesan Bahasa Alami
- Natural Language Understanding

---

## Computer Vision

Canonical

Computer Vision

Aliases

- CV
- Vision
- Visi Komputer

---

## Data Science

Canonical

Data Science

Aliases

- Sains Data
- Data Analytics

---

## Big Data

Canonical

Big Data

Aliases

- Large Scale Data
- Data Besar

---

## Internet of Things

Canonical

Internet of Things

Aliases

- IoT

---

## Blockchain

Canonical

Blockchain

Aliases

- Distributed Ledger

---

# Frequently Used Course Name Variations

## Algoritma dan Pemrograman

Aliases

- Algo
- Algoritma
- Programming
- Basic Programming

---

## Pemrograman Berorientasi Objek

Aliases

- PBO
- OOP
- Object Oriented Programming

---

## Sistem Basis Data

Aliases

- Basis Data
- Database
- DB
- Database System

---

## Pemrograman Web

Aliases

- Web Programming
- Web Development
- Web

---

## Rekayasa Perangkat Lunak

Aliases

- RPL
- Software Engineering

---

## Jaringan Komputer

Aliases

- Networking
- Computer Network

---

## Machine Learning

Aliases

- ML

---

## Computer Vision

Aliases

- CV

---

## Pemrosesan Bahasa Alami

Aliases

- NLP
- Natural Language Processing

---

# Intent Aliases

## Menampilkan Daftar Mata Kuliah

Possible Queries

- daftar mata kuliah
- list mata kuliah
- semua mata kuliah
- course list
- subjects

---

## Menampilkan Mata Kuliah Semester

Possible Queries

- semester 1
- semester 2
- semester 3
- semester 4
- semester 5
- semester 6
- semester 7
- semester 8

---

## Menampilkan Mata Kuliah Pilihan

Possible Queries

- mata kuliah pilihan
- elective
- elective courses
- optional courses

---

## Menampilkan Jumlah SKS

Possible Queries

- total sks
- jumlah sks
- berapa sks
- sks kelulusan

---

## Menampilkan Konsentrasi

Possible Queries

- konsentrasi
- peminatan
- specialization
- specialization track

---

# Normalization Rules

Gunakan aturan berikut sebelum melakukan retrieval.

| Variasi Query | Normalisasi |
|---------------|-------------|
| TI | Teknik Informatika |
| SI | Sistem Informasi |
| IKOM | Ilmu Komunikasi |
| AI | Kecerdasan Buatan |
| ML | Machine Learning |
| CV | Computer Vision |
| NLP | Pemrosesan Bahasa Alami |
| PBO | Pemrograman Berorientasi Objek |
| OOP | Pemrograman Berorientasi Objek |
| DB | Sistem Basis Data |
| RPL | Rekayasa Perangkat Lunak |
| SJ | Sistem Jaringan |
| SIC | Sistem Interaktif Cerdas |
| MK | Mata Kuliah |
| Course | Mata Kuliah |
| Subject | Mata Kuliah |
| Major | Program Studi |
| Department | Program Studi |
| Curriculum | Kurikulum |
| Credit | SKS |
| Credits | SKS |

---

# Retrieval Notes

Sebelum melakukan pencarian embedding, sistem disarankan untuk:

1. Mengubah seluruh query menjadi huruf kecil.
2. Menghapus tanda baca yang tidak diperlukan.
3. Melakukan normalisasi berdasarkan tabel di atas.
4. Menggunakan istilah **Canonical** sebagai representasi utama pada proses retrieval.
5. Tetap mempertahankan istilah asli pengguna sebagai konteks tambahan apabila diperlukan.