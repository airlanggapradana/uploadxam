import prisma from "../../prisma/prisma";
import { Prodi } from "../../generated/prisma";
import { Request, Response, NextFunction } from "express";
import {
  createUserSchema,
  MakeUploadInput,
  makeUploadSchema,
  UpdateUploadInput,
  updateUploadSchema,
} from "../zod/zod.validation";
import { logger } from "../utils/logger";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name, nim, prodi } = createUserSchema.partial().parse(req.body);

    //   cek jika user ada
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
    });
    if (!existingUser) {
      logger.warn(`Update user failed: User not found`, { userId: id });
      res.status(404).json({
        message: "User tidak ditemukan",
      });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        name: name ? name.toUpperCase() : existingUser.name,
        nim: nim ? nim.toUpperCase() : existingUser.nim,
        prodi: prodi ? prodi : existingUser.prodi,
      },
    });

    logger.info(`User updated successfully`, { userId: updatedUser.id });
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
    return;
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
    });
    if (!existingUser) {
      logger.warn(`Delete user failed: User not found`, { userId: id });
      res.status(404).json({
        message: "User tidak ditemukan",
      });
      return;
    }

    await prisma.user.delete({
      where: {
        id: existingUser.id,
      },
    });

    logger.info(`User deleted successfully`, { userId: id });
    res.status(200).json({
      message: "User deleted successfully",
    });
    return;
  } catch (e) {
    next(e);
  }
};

export const makeUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      prodi,
      fileUrl,
      semester,
      title,
      userId,
      kategori,
      year,
      tipe_soal,
      mata_kuliah,
    }: MakeUploadInput = makeUploadSchema.parse(req.body);

    // Using Prisma transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Check if user exists within the transaction
      const existingUser = await tx.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!existingUser) {
        logger.warn(`Create upload failed: User not found`, { userId });
        res.status(404).json({
          message: "User tidak ditemukan",
        });
        return null;
      }

      // Check if user's program matches the upload program
      if (existingUser.prodi !== prodi && existingUser.role !== "ADMIN") {
        if (existingUser.prodi !== prodi) {
          logger.warn(`Create upload failed: Prodi mismatch`, { userProdi: existingUser.prodi, uploadProdi: prodi });
          res.status(400).json({
            message: "Program studi user tidak sesuai dengan upload",
          });
          return null;
        }
        res.status(400).json({
          message: "Hanya admin yang dapat mengunggah untuk program studi lain",
        });
        return null;
      }

      // Create upload within the transaction
      const upload = await tx.upload.create({
        data: {
          id: `UP-${existingUser.prodi === "Informatika" ? "IF" : existingUser.prodi === "Sistem_Informasi" ? "SI" : existingUser.prodi === "Ilmu_Komunikasi" ? "ILKM" : existingUser.prodi === "Kecerdasan_Buatan" ? "AI" : "unknown"}-${crypto.randomUUID().slice(0, 3)}`,
          title,
          fileUrl,
          kategori,
          tipe_soal,
          semester,
          year,
          prodi,
          mata_kuliah,
          userId: existingUser.id,
        },
      });

      return upload;
    });

    if (!result) return;

    logger.info(`Upload created successfully: ${result.id}`, { title: result.title, prodi: result.prodi, userId });
    res.status(201).json({
      message: "Upload created successfully",
      data: result,
    });
    return;
  } catch (e) {
    next(e);
  }
};

export const updateUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const {
      prodi,
      fileUrl,
      mata_kuliah,
      year,
      semester,
      title,
      userId,
      kategori,
      tipe_soal,
    }: UpdateUploadInput = updateUploadSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId!,
      },
    });
    if (!existingUser) {
      logger.warn(`Update upload failed: User not found`, { userId });
      res.status(404).json({
        message: "User tidak ditemukan",
      });
      return;
    }
    if (existingUser.prodi !== prodi) {
      logger.warn(`Update upload failed: Prodi mismatch`, { userProdi: existingUser.prodi, uploadProdi: prodi });
      res.status(400).json({
        message: "Program studi user tidak sesuai dengan upload",
      });
      return;
    }

    const existingUpload = await prisma.upload.findUnique({
      where: {
        id: id as string,
      },
    });
    if (!existingUpload) {
      logger.warn(`Update upload failed: Upload not found`, { uploadId: id });
      res.status(404).json({
        message: "Upload tidak ditemukan",
      });
      return;
    }

    const updatedUpload = await prisma.upload.update({
      where: {
        id: existingUpload.id,
      },
      data: {
        title: title ? title : existingUpload.title,
        fileUrl: fileUrl ? fileUrl : existingUpload.fileUrl,
        tipe_soal: tipe_soal ? tipe_soal : existingUpload.tipe_soal,
        semester: semester ? semester : existingUpload.semester,
        kategori: kategori ? kategori : existingUpload.kategori,
        year: year ? year : existingUpload.year,
        prodi: prodi ? prodi : existingUpload.prodi,
        mata_kuliah: mata_kuliah ? mata_kuliah : existingUpload.mata_kuliah,
        userId: userId ? userId : existingUpload.userId,
      },
    });

    logger.info(`Upload updated successfully`, { uploadId: updatedUpload.id });
    res.status(200).json({
      message: "Upload updated successfully",
      data: updatedUpload,
    });
    return;
  } catch (e) {
    next(e);
  }
};

export const getAllUploads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { prodi, subject, sort, order, tipe_soal, kategori } = req.query;

    // Ambil semua uploads beserta author dan agregasi rating
    const uploads = await prisma.upload.findMany({
      include: {
        user: true,
        _count: { select: { ratings: true } },
      },
      orderBy: { uploadedAt: "desc" },
    });

    // Ambil agregasi rata-rata rating per upload
    const ratingAggregations = await prisma.rating.groupBy({
      by: ["uploadId"],
      _avg: { value: true },
    });
    const ratingMap = new Map(
      ratingAggregations.map((r) => [r.uploadId, r._avg.value ?? 0]),
    );

    // Semua prodi valid
    const allProdis = [
      Prodi.Informatika,
      Prodi.Sistem_Informasi,
      Prodi.Ilmu_Komunikasi,
      Prodi.Kecerdasan_Buatan,
    ];

    // Kalau ada filter prodi, batasi list prodi
    const targetProdis = prodi ? [prodi as Prodi] : allProdis;

    // Inisialisasi groupedByProdi
    const groupedMap = new Map(
      targetProdis.map((p) => [
        p,
        {
          prodi: p,
          totalUploads: 0,
          semesters: new Map<number | string, any>(),
        },
      ]),
    );

    // Filter uploads sesuai query param
    const filteredUploads = uploads.filter((u) => {
      const matchProdi = prodi ? u.user?.prodi === prodi : true;
      const matchSubject = subject
        ? u.mata_kuliah
            .toLowerCase()
            .includes((subject as string).toLowerCase())
        : true;
      const matchTipeSoal = tipe_soal ? u.tipe_soal === tipe_soal : true;
      const matchKategori = kategori ? u.kategori === kategori : true;

      return matchProdi && matchSubject && matchTipeSoal && matchKategori;
    });

    if (
      subject &&
      typeof subject === "string" &&
      subject.trim() !== "" &&
      filteredUploads.length > 0
    ) {
      const matchedIds = filteredUploads.map((u) => u.id);
      prisma.upload
        .updateMany({
          where: { id: { in: matchedIds } },
          data: { searches: { increment: 1 } },
        })
        .catch((err) => logger.error("Failed to increment search count", err));
    }

    // Sorting berdasarkan tipe_soal atau kategori (opsional)
    const sortKey = typeof sort === "string" ? sort : undefined; // 'tipe_soal' | 'kategori'
    const sortOrder = (
      typeof order === "string" ? order.toLowerCase() : "asc"
    ) as "asc" | "desc";

    if (sortKey === "tipe_soal" || sortKey === "kategori") {
      filteredUploads.sort((a, b) => {
        const av = (a[sortKey] ?? "").toString().toLowerCase();
        const bv = (b[sortKey] ?? "").toString().toLowerCase();
        if (av < bv) return sortOrder === "asc" ? -1 : 1;
        if (av > bv) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Masukkan uploads ke grouping
    for (const upload of filteredUploads) {
      const prodiName = upload.user?.prodi || "Unknown";
      const semester = upload.semester || "Unknown";

      if (!groupedMap.has(prodiName)) continue;

      const prodiData = groupedMap.get(prodiName)!;
      prodiData.totalUploads += 1;

      if (!prodiData.semesters.has(semester)) {
        prodiData.semesters.set(semester, {
          semester,
          totalUploads: 0,
          uploads: [],
        });
      }

      const semesterData = prodiData.semesters.get(semester)!;
      semesterData.totalUploads += 1;
      semesterData.uploads.push({
        ...upload,
        avgRating: ratingMap.get(upload.id) ?? 0,
        totalRatings: upload._count.ratings,
      });
    }

    // Konversi hasil ke array, urutkan uploads per semester berdasarkan avgRating DESC
    const groupedArray = Array.from(groupedMap.values()).map((prodiData) => ({
      prodi: prodiData.prodi,
      totalUploads: prodiData.totalUploads,
      semesters: Array.from(prodiData.semesters.values()).map((sem) => ({
        ...sem,
        uploads: sem.uploads.sort(
          (a: { avgRating: number; uploadedAt: Date }, b: { avgRating: number; uploadedAt: Date }) => {
            if (b.avgRating !== a.avgRating) return b.avgRating - a.avgRating;
            return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
          },
        ),
      })),
    }));

    logger.info(`Fetched uploads list (count: ${filteredUploads.length})`, { filters: req.query });

    res.status(200).json({
      totalUploads: filteredUploads.length,
      groupedByProdi: groupedArray,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getUserUploads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    // Ambil semua upload milik user tertentu
    const uploads = await prisma.upload.findMany({
      where: {
        user: {
          id: userId as string,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            nim: true,
            name: true,
            prodi: true,
          },
        },
      },
      orderBy: {
        uploadedAt: "desc", // urutkan dari yang terbaru
      },
    });

    // Kalau user belum pernah upload apa pun
    if (uploads.length === 0) {
      logger.info(`Fetched user uploads: 0 found for userId ${userId}`);
      res.status(200).json({
        message: "No uploads found for this user",
        total: 0,
        uploads: [],
      });
      return;
    }

    logger.info(`Fetched user uploads: ${uploads.length} found for userId ${userId}`);
    res.status(200).json({
      total: uploads.length,
      user: uploads[0]?.user,
      uploads,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getUserStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Hitung total user & total uploads
    const totalUsers = await prisma.user.count();
    const totalUploads = await prisma.upload.count();

    // Group user berdasarkan prodi
    const usersByProdi = await prisma.user.groupBy({
      by: ["prodi"],
      _count: { prodi: true },
    });

    // Pastikan semua prodi muncul
    const prodiList = [
      Prodi.Informatika,
      Prodi.Sistem_Informasi,
      Prodi.Ilmu_Komunikasi,
      Prodi.Kecerdasan_Buatan,
    ];

    const normalized = prodiList.map((p) => {
      const found = usersByProdi.find((d) => d.prodi === p);
      const count = found?._count.prodi ?? 0;

      return {
        prodi: p,
        totalUsers: count,
        percentage:
          totalUsers > 0 ? Number(((count / totalUsers) * 100).toFixed(2)) : 0,
      };
    });

    logger.info(`Calculated user statistics`, { totalUsers, totalUploads });

    res.status(200).json({
      totalUsers,
      totalUploads,
      breakdown: normalized,
    });
    return;
  } catch (error) {
    logger.error("Error in getUserStats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSingleUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // cek apakah upload ada
    const existing = await prisma.upload.findUnique({
      where: { id: id as string },
      include: { user: true },
    });

    if (!existing) {
      logger.warn(`Delete upload failed: Upload not found`, { uploadId: id });
      res.status(404).json({
        message: "Upload not found",
        id,
      });
      return;
    }

    // hapus upload
    await prisma.upload.delete({
      where: { id: id as string },
    });

    logger.info(`Upload deleted successfully`, { uploadId: id, fileUrl: existing.fileUrl });

    res.status(200).json({
      message: "Upload deleted successfully",
      deletedUpload: existing.fileUrl,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getRecentUploads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

    const uploads = await prisma.upload.findMany({
      where: {
        uploadedAt: {
          gte: twelveHoursAgo,
        },
      },
      include: {
        user: {
          select: { id: true, name: true, nim: true, prodi: true },
        },
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    logger.info(`Fetched recent uploads (last 12h): ${uploads.length} item(s)`);

    res.status(200).json({
      success: true,
      count: uploads.length,
      data: uploads,
    });
  } catch (error) {
    next(error);
  }
};

export const incrementView = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const upload = await prisma.upload.update({
      where: { id: id as string },
      data: { views: { increment: 1 } },
    });
    logger.info(`Incremented view count for upload ${id}`, { newViews: upload.views });
    res.status(200).json({
      message: "View count incremented",
      data: upload,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const incrementDownload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const upload = await prisma.upload.update({
      where: { id: id as string },
      data: { downloads: { increment: 1 } },
    });
    logger.info(`Incremented download count for upload ${id}`, { newDownloads: upload.downloads });
    res.status(200).json({
      message: "Download count incremented",
      data: upload,
    });
    return;
  } catch (error) {
    next(error);
  }
};
