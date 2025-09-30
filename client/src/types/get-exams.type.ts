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
  semester: number;
  user: User;
}

export interface User {
  id: string;
  name: string;
  prodi: "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi";
}
