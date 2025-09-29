import {z} from 'zod';

export const createUserSchema = z.object({
  nim: z.string().min(8).max(15),
  name: z.string().min(3).max(100),
  prodi: z.enum(['Informatika', 'Sistem_Informasi', 'Ilmu_Komunikasi'], {error: 'Prodi tidak valid'}),
})

export type CreateUserInput = z.infer<typeof createUserSchema>;