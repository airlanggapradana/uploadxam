import prisma from '../../prisma/prisma'
import {Prodi} from "../../generated/prisma"
import {Request, Response, NextFunction} from "express";
import {createUserSchema, MakeUploadInput, makeUploadSchema} from "../zod/zod.validation";

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
      if (existingUser.prodi !== prodi) {
        res.status(400).json({
          message: 'Program studi user tidak sesuai dengan upload'
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

export const getAllUploads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {prodi, subject} = req.query;

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
      return matchProdi && matchSubject;
    });

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