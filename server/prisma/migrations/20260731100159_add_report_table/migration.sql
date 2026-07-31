-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('FILE_RUSAK', 'SALAH_MATA_KULIAH', 'SALAH_SEMESTER', 'SALAH_TAHUN', 'SOAL_DUPLIKAT', 'KONTEN_TIDAK_PANTAS', 'HAK_CIPTA', 'LAINNYA');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "reason" "ReportReason" NOT NULL,
    "description" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "email" TEXT,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "aiSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Report_examId_idx" ON "Report"("examId");

-- CreateIndex
CREATE INDEX "Report_status_idx" ON "Report"("status");

-- CreateIndex
CREATE INDEX "Report_createdAt_idx" ON "Report"("createdAt");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Upload"("id") ON DELETE CASCADE ON UPDATE CASCADE;
