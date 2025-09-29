import prisma from '../../prisma/prisma'
import {Request, Response, NextFunction} from "express";
import {CreateUserInput, createUserSchema} from "../zod/zod.validation";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name, nim, prodi}: CreateUserInput = createUserSchema.parse(req.body)

    //   cek jika nim sudah ada
    const existingUser = await prisma.user.findUnique({
      where: {
        nim
      }
    })
    if (existingUser) {
      res.status(400).json({
        message: 'NIM sudah terdaftar'
      })
      return;
    }

    const user = await prisma.user.create({
      data: {
        id: `MHS-${prodi === 'Informatika' ? 'IF' : prodi === 'Sistem_Informasi' ? 'SI' : prodi === 'Ilmu_Komunikasi' ? 'ILKM' : prodi}-${nim.slice(7, 10)}`,
        name: name.toUpperCase(),
        nim: nim.toUpperCase(),
        prodi
      }
    })
    res.status(201).json({
      message: 'User created successfully',
      data: user
    })
    return;
  } catch (e) {
    next(e)
  }
}

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