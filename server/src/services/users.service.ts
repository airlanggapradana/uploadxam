import prisma from '../../prisma/prisma'
import {Prodi} from "../../generated/prisma"
import {Request, Response, NextFunction} from "express";
import {
  createUserSchema,
  MakeUploadInput,
  makeUploadSchema,
  UpdateUploadInput,
  updateUploadSchema
} from "../zod/zod.validation";

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const {name, nim, prodi} = createUserSchema.partial().parse(req.body)

    //   cek jika user ada
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id!
      }
    })
    if (!existingUser) {
      res.status(404).json({
        message: 'User tidak ditemukan'
      })
      return;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        name: name ? name.toUpperCase() : existingUser.name,
        nim: nim ? nim.toUpperCase() : existingUser.nim,
        prodi: prodi ? prodi : existingUser.prodi
      }
    })
    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser
    })
    return;
  } catch (e) {
    next(e)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id!
      }
    })
    if (!existingUser) {
      res.status(404).json({
        message: 'User tidak ditemukan'
      })
      return;
    }

    await prisma.user.delete({
      where: {
        id: existingUser.id
      }
    })
    res.status(200).json({
      message: 'User deleted successfully'
    })
    return;
  } catch (e) {
    next(e)
  }
}

export const makeUpload = async (req: Request, res: Response, next: NextFunction) => {
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
      mata_kuliah
    }: MakeUploadInput = makeUploadSchema.parse(req.body)

    // Using Prisma transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Check if user exists within the transaction
      const existingUser = await tx.user.findUnique({
        where: {
          id: userId
        }
      })

      if (!existingUser) {
        res.status(404).json({
          message: 'User tidak ditemukan'
        })
        return null;
      }

      // Check if user's program matches the upload program
      if (existingUser.prodi !== prodi && existingUser.role !== 'ADMIN') {
        if (existingUser.prodi !== prodi) {
          res.status(400).json({
            message: 'Program studi user tidak sesuai dengan upload'
          })
          return null;
        }
        res.status(400).json({
          message: 'Hanya admin yang dapat mengunggah untuk program studi lain'
        })
        return null;
      }

      // Create upload within the transaction
      const upload = await tx.upload.create({
        data: {
          id: `UP-${existingUser.prodi === 'Informatika' ? "IF" : existingUser.prodi === "Sistem_Informasi" ? "SI" : existingUser.prodi === "Ilmu_Komunikasi" ? "ILKM" : "unknown"}-${crypto.randomUUID().slice(0, 3)}`,
          title,
          fileUrl,
          kategori,
          tipe_soal,
          semester,
          year,
          prodi,
          mata_kuliah,
          userId: existingUser.id
        }
      })

      return upload
    })

    if (!result) return;

    res.status(201).json({
      message: 'Upload created successfully',
      data: result
    })
    return
  } catch (e) {
    next(e)
  }
}

export const updateUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const {
      prodi,
      fileUrl,
      mata_kuliah,
      year,
      semester,
      title,
      userId,
      kategori,
      tipe_soal
    }: UpdateUploadInput = updateUploadSchema.parse(req.body)

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId!
      }
    })
    if (!existingUser) {
      res.status(404).json({
        message: 'User tidak ditemukan'
      })
      return;
    }
    if (existingUser.prodi !== prodi) {
      res.status(400).json({
        message: 'Program studi user tidak sesuai dengan upload'
      })
      return;
    }

    const existingUpload = await prisma.upload.findUnique({
      where: {
        id: id!
      }
    })
    if (!existingUpload) {
      res.status(404).json({
        message: 'Upload tidak ditemukan'
      })
      return;
    }

    const updatedUpload = await prisma.upload.update({
      where: {
        id: existingUpload.id
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
        userId: userId ? userId : existingUpload.userId
      }
    })
    res.status(200).json({
      message: 'Upload updated successfully',
      data: updatedUpload
    })
    return;
  } catch (e) {
    next(e)
  }
}

export const getAllUploads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {prodi, subject, sort, order, tipe_soal, kategori} = req.query;

    // Ambil semua uploads beserta author
    const uploads = await prisma.upload.findMany({
      include: {user: true},
      orderBy: {uploadedAt: "desc"},
    });

    // Semua prodi valid
    const allProdis = [
      Prodi.Informatika,
      Prodi.Sistem_Informasi,
      Prodi.Ilmu_Komunikasi,
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
      ])
    );

    // Filter uploads sesuai query param
    const filteredUploads = uploads.filter((u) => {
      const matchProdi = prodi ? u.user?.prodi === prodi : true;
      const matchSubject = subject
        ? u.mata_kuliah.toLowerCase().includes(
          (subject as string).toLowerCase()
        )
        : true;
      const matchTipeSoal = tipe_soal ? u.tipe_soal === tipe_soal : true;
      const matchKategori = kategori ? u.kategori === kategori : true;

      return matchProdi && matchSubject && matchTipeSoal && matchKategori;
    });

    // Sorting berdasarkan tipe_soal atau kategori (opsional)
    const sortKey = typeof sort === "string" ? sort : undefined; // 'tipe_soal' | 'kategori'
    const sortOrder = (typeof order === "string" ? order.toLowerCase() : "asc") as "asc" | "desc";

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
      semesterData.uploads.push(upload);
    }

    // Konversi hasil ke array
    const groupedArray = Array.from(groupedMap.values()).map((prodiData) => ({
      prodi: prodiData.prodi,
      totalUploads: prodiData.totalUploads,
      semesters: Array.from(prodiData.semesters.values()),
    }));

    res.status(200).json({
      totalUploads: filteredUploads.length,
      groupedByProdi: groupedArray,
    });
    return;
  } catch (error) {
    next(error);
  }
}

export const getUserUploads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {userId} = req.params

    // Ambil semua upload milik user tertentu
    const uploads = await prisma.upload.findMany({
      where: {
        user: {
          id: userId!
        }
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
    })

    // Kalau user belum pernah upload apa pun
    if (uploads.length === 0) {
      res.status(200).json({
        message: "No uploads found for this user",
        total: 0,
        uploads: [],
      })
      return;
    }

    res.status(200).json({
      total: uploads.length,
      user: uploads[0]?.user,
      uploads,
    })
    return;
  } catch (error) {
    next(error);
  }
}

export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Hitung total user
    const totalUsers = await prisma.user.count()

    // Group user berdasarkan prodi
    const usersByProdi = await prisma.user.groupBy({
      by: ["prodi"],
      _count: {prodi: true},
    })

    // Pastikan semua prodi muncul
    const prodiList = [
      Prodi.Informatika,
      Prodi.Sistem_Informasi,
      Prodi.Ilmu_Komunikasi,
    ]

    const normalized = prodiList.map((p) => {
      const found = usersByProdi.find((d) => d.prodi === p)
      const count = found?._count.prodi ?? 0

      return {
        prodi: p,
        totalUsers: count,
        percentage: totalUsers > 0
          ? Number(((count / totalUsers) * 100).toFixed(2))
          : 0,
      }
    })

    res.status(200).json({
      totalUsers,
      breakdown: normalized,
    })
    return;
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Internal server error"})
  }
}

export const deleteSingleUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params

    // cek apakah upload ada
    const existing = await prisma.upload.findUnique({
      where: {id: id!},
      include: {user: true},
    })

    if (!existing) {
      res.status(404).json({
        message: "Upload not found",
        id,
      })
      return;
    }

    // hapus upload
    await prisma.upload.delete({
      where: {id: id!},
    })

    res.status(200).json({
      message: "Upload deleted successfully",
      deletedUpload: existing.fileUrl
    })
    return;
  } catch (error) {
    next(error);
  }
}

export const getRecentUploads = async (req: Request, res: Response, next: NextFunction) => {
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
          select: {id: true, name: true, nim: true, prodi: true},
        },
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: uploads.length,
      data: uploads,
    });
  } catch (error) {
    next(error);
  }
}