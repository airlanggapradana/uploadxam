import { z } from "zod";

export const createUserSchema = z.object({
  nim: z.string().min(8).max(15),
  name: z.string().min(3).max(100),
  prodi: z.enum(
    ["Informatika", "Sistem_Informasi", "Ilmu_Komunikasi", "Kecerdasan_Buatan"],
    { error: "Prodi tidak valid" },
  ),
});

export const makeUploadSchema = z.object({
  title: z.string().min(3).max(100),
  fileUrl: z.string().url(),
  tipe_soal: z.enum(["UTS", "UAS"], { error: "Tipe soal tidak valid" }),
  semester: z.number().min(1).max(14),
  kategori: z.enum(["INTER", "REGULER"], { error: "Kategori tidak valid" }),
  year: z
    .number()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  prodi: z.enum(
    ["Informatika", "Sistem_Informasi", "Ilmu_Komunikasi", "Kecerdasan_Buatan"],
    { error: "Prodi tidak valid" },
  ),
  mata_kuliah: z.string().min(3).max(100),
  userId: z.string().min(1, "User ID harus diisi"),
});

export const updateUploadSchema = makeUploadSchema.partial();

export const loginSchema = z.object({
  nim: z.string().min(8).max(15),
});

export const createReportSchema = z.object({
  examId: z.string().min(1, "Exam ID harus diisi"),
  reason: z.enum(
    [
      "FILE_RUSAK",
      "SALAH_MATA_KULIAH",
      "SALAH_SEMESTER",
      "SALAH_TAHUN",
      "SOAL_DUPLIKAT",
      "KONTEN_TIDAK_PANTAS",
      "HAK_CIPTA",
      "LAINNYA",
    ],
    { error: "Alasan tidak valid" },
  ),
  description: z
    .string()
    .max(500, "Deskripsi maksimal 500 karakter")
    .optional(),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  anonymous: z.boolean().default(false),
  reporterIp: z.string().optional(),
});

export const updateReportStatusSchema = z.object({
  status: z.enum(["PENDING", "UNDER_REVIEW", "RESOLVED", "REJECTED"], {
    error: "Status tidak valid",
  }),
});

export type UpdateUploadInput = z.infer<typeof updateUploadSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type MakeUploadInput = z.infer<typeof makeUploadSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateReportInput = z.infer<typeof createReportSchema>;
export type UpdateReportStatusInput = z.infer<typeof updateReportStatusSchema>;

