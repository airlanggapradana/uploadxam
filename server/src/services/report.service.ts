import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/prisma";
import { GoogleGenAI } from "@google/genai";
import { env } from "../env";
import {
  createReportSchema,
  updateReportStatusSchema,
  type CreateReportInput,
} from "../zod/zod.validation";
import { logger } from "../utils/logger";
import { ReportStatus } from "../../generated/prisma";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

// ============================================================================
// AI: Generate a one-sentence summary of the report
// ============================================================================
async function generateAiSummary(
  reason: string,
  description: string | undefined,
  examTitle: string,
): Promise<string | null> {
  try {
    const prompt = `
You are a content moderation assistant. Summarize the following exam report in ONE concise English sentence (max 20 words).
Do NOT approve or reject. Only summarize what was reported.

Exam title: "${examTitle}"
Report reason: "${reason}"
Description: "${description ?? "(no description provided)"}"

Respond with only the one-sentence summary in bahasa indonesia, nothing else.
    `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const text = response.text?.trim() ?? null;
    logger.info("AI summary generated for report", { examTitle, reason });
    return text;
  } catch (error) {
    logger.error("Failed to generate AI summary for report", error);
    return null;
  }
}

// ============================================================================
// POST /reports — Create a new report
// ============================================================================
export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: CreateReportInput = createReportSchema.parse(req.body);

    // Sanitize description — strip HTML tags
    const sanitizedDescription = data.description
      ? data.description.replace(/<[^>]*>/g, "").trim()
      : undefined;

    // Validate that the exam (upload) exists
    const existingExam = await prisma.upload.findUnique({
      where: { id: data.examId },
    });
    if (!existingExam) {
      logger.warn("Create report failed: Exam not found", {
        examId: data.examId,
      });
      res.status(404).json({ message: "Soal tidak ditemukan" });
      return;
    }

    // Duplicate check: prevent same IP/email from reporting the same exam within 24h
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    if (data.reporterIp || data.email) {
      const duplicate = await prisma.report.findFirst({
        where: {
          examId: data.examId,
          createdAt: { gte: twentyFourHoursAgo },
          OR: [
            data.reporterIp
              ? { description: { contains: data.reporterIp } }
              : {},
            data.email ? { email: data.email } : {},
          ].filter((c) => Object.keys(c).length > 0),
        },
      });

      if (duplicate) {
        logger.warn("Create report blocked: Duplicate submission within 24h", {
          examId: data.examId,
        });
        res.status(429).json({
          message:
            "Anda sudah melaporkan soal ini dalam 24 jam terakhir. Silakan coba lagi nanti.",
        });
        return;
      }
    }

    // Generate AI summary (non-blocking; failure is graceful)
    const aiSummary = await generateAiSummary(
      data.reason,
      sanitizedDescription,
      existingExam.title,
    );

    // Create the report
    const report = await prisma.report.create({
      data: {
        examId: data.examId,
        reason: data.reason,
        description: sanitizedDescription ?? null,
        email: data.email || null,
        anonymous: data.anonymous,
        aiSummary: aiSummary ?? null,
        status: "PENDING",
      },
      include: {
        exam: {
          select: { id: true, title: true, mata_kuliah: true },
        },
      },
    });

    logger.info("Report created successfully", {
      reportId: report.id,
      examId: data.examId,
      reason: data.reason,
    });

    res.status(201).json({
      message: "Laporan berhasil dikirim.",
      data: report,
    });
    return;
  } catch (e) {
    next(e);
  }
};

// ============================================================================
// GET /admin/reports — List all reports (pagination, filter, search, sort)
// ============================================================================
export const getAdminReports = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      page = "1",
      limit = "10",
      status,
      reason,
      search,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status as ReportStatus;
    }

    if (reason) {
      where.reason = reason as string;
    }

    if (search) {
      where.exam = {
        OR: [
          { title: { contains: search as string, mode: "insensitive" } },
          { mata_kuliah: { contains: search as string, mode: "insensitive" } },
        ],
      };
    }

    const validSortFields: Record<string, boolean> = {
      createdAt: true,
      updatedAt: true,
      status: true,
      reason: true,
    };

    const orderByField = validSortFields[sortBy as string]
      ? (sortBy as string)
      : "createdAt";
    const sortOrder = order === "asc" ? "asc" : "desc";

    const [reports, total] = await prisma.$transaction([
      prisma.report.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [orderByField]: sortOrder },
        include: {
          exam: {
            select: {
              id: true,
              title: true,
              mata_kuliah: true,
              tipe_soal: true,
              year: true,
              prodi: true,
              fileUrl: true,
              user: { select: { id: true, name: true, nim: true } },
            },
          },
        },
      }),
      prisma.report.count({ where }),
    ]);

    logger.info("Admin fetched reports list", {
      total,
      page: pageNum,
      limit: limitNum,
    });

    res.status(200).json({
      data: reports,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
    return;
  } catch (e) {
    next(e);
  }
};

// ============================================================================
// GET /admin/reports/:id — Get single report detail
// ============================================================================
export const getAdminReportById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: { id: id as string },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            mata_kuliah: true,
            tipe_soal: true,
            year: true,
            semester: true,
            prodi: true,
            fileUrl: true,
            user: { select: { id: true, name: true, nim: true } },
          },
        },
      },
    });

    if (!report) {
      logger.warn("Get report failed: Report not found", { reportId: id });
      res.status(404).json({ message: "Laporan tidak ditemukan" });
      return;
    }

    logger.info("Admin fetched report detail", { reportId: id });
    res.status(200).json({ data: report });
    return;
  } catch (e) {
    next(e);
  }
};

// ============================================================================
// PATCH /admin/reports/:id — Update report status
// ============================================================================
export const updateReportStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { status } = updateReportStatusSchema.parse(req.body);

    const existing = await prisma.report.findUnique({
      where: { id: id as string },
    });
    if (!existing) {
      logger.warn("Update report status failed: Report not found", {
        reportId: id,
      });
      res.status(404).json({ message: "Laporan tidak ditemukan" });
      return;
    }

    const updated = await prisma.report.update({
      where: { id: id as string },
      data: { status },
      include: {
        exam: { select: { id: true, title: true } },
      },
    });

    logger.info("Report status updated", {
      reportId: id,
      oldStatus: existing.status,
      newStatus: status,
    });

    res.status(200).json({
      message: "Status laporan berhasil diperbarui",
      data: updated,
    });
    return;
  } catch (e) {
    next(e);
  }
};

// ============================================================================
// DELETE /admin/reports/:id — Delete a report
// ============================================================================
export const deleteReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const existing = await prisma.report.findUnique({
      where: { id: id as string },
    });
    if (!existing) {
      logger.warn("Delete report failed: Report not found", { reportId: id });
      res.status(404).json({ message: "Laporan tidak ditemukan" });
      return;
    }

    await prisma.report.delete({ where: { id: id as string } });

    logger.info("Report deleted successfully", { reportId: id });
    res.status(200).json({ message: "Laporan berhasil dihapus" });
    return;
  } catch (e) {
    next(e);
  }
};
