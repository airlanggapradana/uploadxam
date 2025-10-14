import {Request, Response, NextFunction} from "express";
import prisma from '../../prisma/prisma'
import {CreateUserInput, createUserSchema, LoginInput, loginSchema} from "../zod/zod.validation";
import jwt from 'jsonwebtoken'
import {env} from "../env";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name, nim, prodi}: CreateUserInput = createUserSchema.parse(req.body)

    //   cek jika nim or nama sudah ada
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {nim: nim.toUpperCase()},
          {name: name.toUpperCase()}
        ]
      }
    })
    if (existingUser) {
      res.status(400).json({
        message: 'NIM / Nama sudah terdaftar, silakan login'
      })
      return;
    }

    const user = await prisma.user.create({
      data: {
        id: `MHS-${prodi === 'Informatika' ? 'IF' : prodi === 'Sistem_Informasi' ? 'SI' : prodi === 'Ilmu_Komunikasi' ? 'ILKM' : prodi}-${nim}`,
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {nim}: LoginInput = loginSchema.parse(req.body)

    //   cek jika nim ada
    const existingUser = await prisma.user.findUnique({
      where: {
        nim
      }
    })
    if (!existingUser) {
      res.status(400).json({
        message: 'NIM tidak terdaftar'
      })
      return;
    }

    const token = jwt.sign({
      id: existingUser.id,
      name: existingUser.name,
      nim: existingUser.nim,
      prodi: existingUser.prodi
    }, env.SECRET, {expiresIn: '1d', algorithm: 'HS256'})

    res.status(200).json({
      message: 'Login successful',
      data: token
    })
    return;
  } catch (e) {
    next(e)
  }
}