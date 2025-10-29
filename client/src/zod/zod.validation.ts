import { z } from "zod";

export const createUserSchema = z.object({
  nim: z.string().regex(/^L\d{8,14}$/, {
    message: "NIM hanya diperbolehkan untuk anak FKI",
  }),
  name: z.string().min(3).max(100),
  prodi: z.enum(["Informatika", "Sistem_Informasi", "Ilmu_Komunikasi"], {
    message: "Prodi tidak valid",
  }),
});

export const makeUploadSchema = z.object({
  title: z.string().min(3).max(100),
  tipe_soal: z.enum(["UTS", "UAS"], { message: "Tipe soal tidak valid" }),
  semester: z.number().min(1).max(14),
  year: z
    .number()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  kategori: z.enum(["INTER", "REGULER"], { message: "Kategori tidak valid" }),
  prodi: z.enum(["Informatika", "Sistem_Informasi", "Ilmu_Komunikasi"], {
    message: "Prodi tidak valid",
  }),
  mata_kuliah: z.string().min(3).max(100),
  userId: z.string().min(1, "User ID harus diisi"),
});

export const updateUploadSchema = makeUploadSchema.partial();

export const loginSchema = z.object({
  nim: z.string().regex(/^L\d{8,14}$/i, {
    message: "NIM hanya diperbolehkan untuk anak FKI",
  }),
});

export const feedbackSchema = z.object({
  feedback_rating: z.number().min(1).max(5),
  feedback_type: z.enum(["bug", "feature", "improvement", "other"]),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type UpdateUploadInput = z.infer<typeof updateUploadSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type MakeUploadInput = z.infer<typeof makeUploadSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
