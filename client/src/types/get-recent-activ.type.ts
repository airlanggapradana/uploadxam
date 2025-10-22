export interface GetRecentActivType {
  success: boolean;
  count: number;
  data: Activities[];
}

export interface Activities {
  id: string;
  title: string;
  fileUrl: string;
  mata_kuliah: string;
  tipe_soal: "UTS" | "UAS";
  semester: number;
  kategori: "REGULER" | "INTER";
  year: number;
  prodi: "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi";
  uploadedAt: Date;
  userId: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  nim: string;
  prodi: "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi";
}
