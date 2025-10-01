import { z } from "zod";

export const createUserSchema = z.object({
  nim: z.string().min(8).max(15),
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
  prodi: z.enum(["Informatika", "Sistem_Informasi", "Ilmu_Komunikasi"], {
    message: "Prodi tidak valid",
  }),
  mata_kuliah: z.string().min(3).max(100),
  userId: z.string().min(1, "User ID harus diisi"),
});

export const loginSchema = z.object({
  nim: z.string().min(8).max(15),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type MakeUploadInput = z.infer<typeof makeUploadSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
