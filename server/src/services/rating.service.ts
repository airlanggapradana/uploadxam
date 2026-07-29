import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/prisma";
import { z } from "zod";
import { logger } from "../utils/logger";

const upsertRatingSchema = z.object({
  userId: z.string().min(1),
  uploadId: z.string().min(1),
  value: z.number().int().min(1).max(5),
});

export const upsertRating = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, uploadId, value } = upsertRatingSchema.parse(req.body);

    // Pastikan user ada
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      res.status(404).json({ message: "User tidak ditemukan" });
      return;
    }

    // Pastikan upload ada
    const existingUpload = await prisma.upload.findUnique({ where: { id: uploadId } });
    if (!existingUpload) {
      res.status(404).json({ message: "Upload tidak ditemukan" });
      return;
    }

    // Upsert: buat baru atau update jika sudah ada
    const rating = await prisma.rating.upsert({
      where: {
        userId_uploadId: { userId, uploadId },
      },
      create: { userId, uploadId, value },
      update: { value },
    });

    logger.info(`Rating upserted`, { userId, uploadId, value });
    res.status(200).json({
      message: "Rating berhasil disimpan",
      data: rating,
    });
    return;
  } catch (e) {
    next(e);
  }
};

export const getUserRating = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const uploadId = req.params["uploadId"] as string;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const userId = req.query["userId"] as string | undefined;

    if (!userId) {
      res.status(400).json({ message: "userId diperlukan" });
      return;
    }

    const rating = await prisma.rating.findUnique({
      where: {
        userId_uploadId: { userId, uploadId },
      },
    });

    res.status(200).json({
      data: rating ?? null,
    });
    return;
  } catch (e) {
    next(e);
  }
};
