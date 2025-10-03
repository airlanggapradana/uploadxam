export interface GetExamsResponse {
  totalUploads: number;
  groupedByProdi: GroupedByProdi[];
}

export interface GroupedByProdi {
  prodi: "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi";
  totalUploads: number;
  semesters: Semester[];
}

export interface Semester {
  semester: number;
  totalUploads: number;
  uploads: Upload[];
}

export interface Upload {
  id: string;
  title: string;
  fileUrl: string;
  mata_kuliah: string;
  tipe_soal: "UTS" | "UAS";
  year: number;
  kategori: "INTER" | "REGULER";
  prodi: "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi";
  uploadedAt: Date;
  userId: string;
  semester: number;
  user: User;
}

export interface User {
  id: string;
  nim: string;
  role: "USER" | "ADMIN";
  name: string;
  prodi: "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi";
  createdAt: Date;
  updatedAt: Date;
}
