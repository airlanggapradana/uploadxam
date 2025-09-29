import prisma from '../../prisma/prisma'
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
          id: `UP-${existingUser.prodi === 'Informatika' ? "IF" : existingUser.prodi === "Sistem_Informasi" ? "SI" : existingUser.prodi === "Ilmu_Komunikasi" ? "ILKM" : "unknown"}-${new Date().getDate()}`,
          title,
          fileUrl,
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
    const uploads = await prisma.upload.findMany({
      include: {
        user: true,
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    // Kelompokkan prodi -> semester dalam bentuk map
    const groupedMap = uploads.reduce((acc: Map<string, any>, upload) => {
      const prodi = upload.user?.prodi || "Unknown";
      const semester = upload.semester || "Unknown";

      if (!acc.has(prodi)) {
        acc.set(prodi, {
          prodi,
          totalUploads: 0,
          semesters: new Map(),
        });
      }

      const prodiData = acc.get(prodi);
      prodiData.totalUploads += 1;

      if (!prodiData.semesters.has(semester)) {
        prodiData.semesters.set(semester, {
          semester,
          totalUploads: 0,
          uploads: [],
        });
      }

      const semesterData = prodiData.semesters.get(semester);
      semesterData.totalUploads += 1;
      semesterData.uploads.push(upload);

      return acc;
    }, new Map());

    // Konversi map ke array
    const groupedArray = Array.from(groupedMap.values()).map((prodiData) => ({
      prodi: prodiData.prodi,
      totalUploads: prodiData.totalUploads,
      semesters: Array.from(prodiData.semesters.values()),
    }));

    res.status(200).json({
      totalUploads: uploads.length,
      groupedByProdi: groupedArray,
    });
    return;
  } catch (error) {
    next(error);
  }
}