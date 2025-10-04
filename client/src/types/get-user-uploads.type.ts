export interface GetUserUploadsResponse {
  total: number;
  user: User;
  uploads: Upload[];
}

export interface Upload {
  id: string;
  title: string;
  fileUrl: string;
  mata_kuliah: string;
  tipe_soal: string;
  semester: number;
  kategori: string;
  year: number;
  prodi: string;
  uploadedAt: Date;
  userId: string;
  user: User;
}

export interface User {
  id: string;
  nim: string;
  name: string;
  prodi: string;
}
