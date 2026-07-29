# Frequently Asked Questions (FAQ)

## Purpose

Dokumen ini berisi kumpulan pertanyaan yang sering diajukan mengenai kurikulum Universitas Muhammadiyah Surakarta (UMS).

FAQ digunakan sebagai referensi tambahan pada proses Retrieval Augmented Generation (RAG) untuk meningkatkan akurasi pencarian informasi berdasarkan bahasa alami pengguna.

Apabila jawaban membutuhkan informasi yang lebih rinci, sistem harus mengambil referensi dari dokumen program studi, semester, atau mata kuliah terkait.

---

# General

## Apa saja program studi yang tersedia pada knowledge base ini?

Knowledge base ini mencakup empat program studi.

- Teknik Informatika
- Sistem Informasi
- Ilmu Komunikasi
- Kecerdasan Buatan

---

## Universitas apa yang menggunakan kurikulum ini?

Seluruh data berasal dari Universitas Muhammadiyah Surakarta (UMS).

---

## Berapa jumlah semester pada setiap program studi?

Seluruh program studi menggunakan struktur akademik delapan semester.

Semester:

- Semester 1
- Semester 2
- Semester 3
- Semester 4
- Semester 5
- Semester 6
- Semester 7
- Semester 8

---

## Berapa total SKS untuk menyelesaikan studi?

Setiap program studi memiliki total SKS kelulusan sesuai kurikulum masing-masing.

Untuk mengetahui jumlah SKS suatu program studi, sistem harus mengambil informasi dari dokumen overview program studi tersebut.

---

# Program Studi

## Program studi apa saja yang memiliki konsentrasi?

Saat ini hanya Program Studi Teknik Informatika yang memiliki konsentrasi.

Konsentrasi tersebut meliputi:

- Rekayasa Perangkat Lunak (RPL)
- Sistem Jaringan (SJ)
- Sistem Interaktif Cerdas (SIC)

---

## Apa perbedaan Teknik Informatika dan Sistem Informasi?

Secara umum:

Teknik Informatika berfokus pada pengembangan teknologi komputasi, perangkat lunak, kecerdasan buatan, jaringan komputer, dan data.

Sistem Informasi berfokus pada integrasi teknologi informasi dengan proses bisnis, analisis sistem, manajemen proyek, dan transformasi digital.

Untuk rincian kurikulum masing-masing, sistem harus menggunakan dokumen overview program studi.

---

## Apa fokus Program Studi Kecerdasan Buatan?

Program Studi Kecerdasan Buatan berfokus pada pengembangan teknologi Artificial Intelligence, Machine Learning, Computer Vision, Natural Language Processing, Data Science, dan bidang terkait.

---

## Apa fokus Program Studi Ilmu Komunikasi?

Program Studi Ilmu Komunikasi berfokus pada komunikasi massa, public relation, media, jurnalistik, penyiaran, dan komunikasi digital.

---

# Mata Kuliah

## Bagaimana cara mengetahui semester suatu mata kuliah?

Setiap mata kuliah memiliki informasi semester pada dokumen semester program studi maupun dokumen individual mata kuliah.

---

## Bagaimana cara mengetahui jumlah SKS suatu mata kuliah?

Jumlah SKS tersedia pada setiap dokumen mata kuliah.

---

## Apakah satu mata kuliah dapat muncul di beberapa program studi?

Ya.

Beberapa mata kuliah umum maupun mata kuliah bidang komputasi dapat muncul pada lebih dari satu program studi.

Contohnya:

- Agama
- Bahasa Indonesia
- English for Academic Purpose
- Pemrograman Web
- Sistem Basis Data

Informasi setiap mata kuliah tetap mengacu pada program studi masing-masing.

---

## Bagaimana mengetahui kode suatu mata kuliah?

Kode mata kuliah tersedia pada dokumen individual mata kuliah maupun daftar semester.

---

# Mata Kuliah Pilihan

## Apa yang dimaksud mata kuliah pilihan?

Mata kuliah pilihan merupakan mata kuliah yang dapat dipilih mahasiswa sesuai peminatan, konsentrasi, atau profil lulusan.

---

## Di mana daftar mata kuliah pilihan disimpan?

Daftar mata kuliah pilihan tersedia pada dokumen:

- electives.md
- course-index.md

serta dokumen individual masing-masing mata kuliah.

---

# Konsentrasi

## Apa itu konsentrasi?

Konsentrasi merupakan jalur peminatan dalam suatu program studi.

Tidak semua program studi memiliki konsentrasi.

---

## Apa saja konsentrasi Teknik Informatika?

Teknik Informatika memiliki tiga konsentrasi.

- Rekayasa Perangkat Lunak
- Sistem Jaringan
- Sistem Interaktif Cerdas

---

# Course Index

## Apa fungsi Course Index?

Course Index merupakan indeks seluruh mata kuliah yang tersedia pada knowledge base.

Course Index membantu sistem menemukan dokumen mata kuliah yang relevan sebelum melakukan retrieval lanjutan.

---

## Mengapa satu mata kuliah memiliki beberapa dokumen?

Knowledge base menggunakan semantic chunking.

Satu dokumen dibuat untuk satu topik utama agar proses embedding menghasilkan retrieval yang lebih akurat.

---

# Retrieval

## Bagaimana sistem mencari jawaban?

Urutan retrieval yang direkomendasikan adalah:

1. Individual Course Document
2. Semester Document
3. Concentration Document
4. Program Overview
5. Course Index
6. FAQ
7. Metadata

---

## Bagaimana jika informasi tidak ditemukan?

Model harus menjawab bahwa informasi tidak tersedia pada knowledge base.

Model tidak boleh membuat asumsi atau mengarang informasi.

---

## Apakah model boleh memberikan opini?

Tidak.

Jawaban harus berdasarkan informasi yang tersedia pada knowledge base.

---

## Bagaimana jika pengguna menggunakan singkatan?

Sistem harus melakukan normalisasi menggunakan dokumen `aliases.md`.

Contoh:

- TI → Teknik Informatika
- SI → Sistem Informasi
- AI → Kecerdasan Buatan
- MK → Mata Kuliah

---

# Natural Language Query Examples

Berikut adalah contoh pertanyaan yang diharapkan dapat dijawab oleh sistem.

- Mata kuliah semester 5 Teknik Informatika apa saja?
- Berapa SKS Machine Learning?
- Mata kuliah pilihan Sistem Informasi apa saja?
- Apa kode mata kuliah Rekayasa Perangkat Lunak?
- Semester berapa Pemrograman Web?
- Apa saja konsentrasi Teknik Informatika?
- Berapa total SKS Program Studi Kecerdasan Buatan?
- Mata kuliah apa yang berkaitan dengan Artificial Intelligence?
- Apa perbedaan Teknik Informatika dan Sistem Informasi?
- Mata kuliah semester 3 Ilmu Komunikasi?

---

# Out of Scope

Knowledge base ini tidak mencakup informasi berikut.

- Jadwal kuliah
- Jadwal ujian
- Kalender akademik
- Nama dosen pengampu
- Ruang kelas
- Nilai mahasiswa
- KRS
- KHS
- Biaya kuliah
- Administrasi akademik
- Informasi penerimaan mahasiswa baru
- Organisasi mahasiswa

Apabila pengguna menanyakan informasi tersebut, sistem harus menyatakan bahwa informasi tersebut berada di luar cakupan knowledge base.