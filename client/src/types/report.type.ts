export type ReportReason =
  | "FILE_RUSAK"
  | "SALAH_MATA_KULIAH"
  | "SALAH_SEMESTER"
  | "SALAH_TAHUN"
  | "SOAL_DUPLIKAT"
  | "KONTEN_TIDAK_PANTAS"
  | "HAK_CIPTA"
  | "LAINNYA";

export type ReportStatus = "PENDING" | "UNDER_REVIEW" | "RESOLVED" | "REJECTED";

export interface ReportExam {
  id: string;
  title: string;
  mata_kuliah: string;
  tipe_soal: "UTS" | "UAS";
  year: number;
  semester?: number;
  prodi: string;
  fileUrl: string;
  user: {
    id: string;
    name: string;
    nim: string;
  };
}

export interface Report {
  id: string;
  examId: string;
  reason: ReportReason;
  description?: string | null;
  status: ReportStatus;
  email?: string | null;
  anonymous: boolean;
  aiSummary?: string | null;
  createdAt: string;
  updatedAt: string;
  exam: ReportExam;
}

export interface GetAdminReportsResponse {
  data: Report[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetAdminReportByIdResponse {
  data: Report;
}

export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  FILE_RUSAK: "File rusak",
  SALAH_MATA_KULIAH: "Salah mata kuliah",
  SALAH_SEMESTER: "Salah semester",
  SALAH_TAHUN: "Salah tahun",
  SOAL_DUPLIKAT: "Soal duplikat",
  KONTEN_TIDAK_PANTAS: "Konten tidak pantas",
  HAK_CIPTA: "Hak cipta",
  LAINNYA: "Lainnya",
};

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  PENDING: "Menunggu",
  UNDER_REVIEW: "Sedang Ditinjau",
  RESOLVED: "Selesai",
  REJECTED: "Ditolak",
};
