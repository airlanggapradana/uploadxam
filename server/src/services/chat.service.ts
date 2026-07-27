import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { env } from "../env"; // Asumsi environment variables server Anda
import prisma from "../../prisma/prisma";
import { SYSTEM_INSTRUCTION } from "../data/llm_knowledge";
import { logger } from "../utils/logger";

// Inisialisasi secara aman di backend
const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

// Fungsi eksekusi lokal (Tools)
async function getPlatformStatistics() {
  try {
    logger.info("Executing AI Tool: getPlatformStatistics");
    const totalMahasiswa = await prisma.user.count();
    const totalSoal = await prisma.upload.count();
    const statsPerProdi = await prisma.upload.groupBy({
      by: ["prodi"],
      _count: { id: true },
    });

    const sebaran = statsPerProdi.map((item) => ({
      prodi: item.prodi.replace("_", " "),
      jumlahSoal: item._count.id,
    }));

    logger.info("AI Tool getPlatformStatistics completed", { totalMahasiswa, totalSoal });
    return { totalMahasiswa, totalSoal, sebaran };
  } catch (error) {
    logger.error("Prisma error in getPlatformStatistics:", error);
    return { error: "Gagal mengambil data database." };
  }
}

async function searchExamFiles(args: {
  subject?: string;
  prodi?: string;
  tipe_soal?: "UTS" | "UAS";
  year?: number;
  kategori?: "REGULER" | "INTER";
}) {
  try {
    logger.info("Executing AI Tool: searchExamFiles", args);
    const where: any = {};
    if (args.subject) {
      where.mata_kuliah = {
        contains: args.subject,
        mode: "insensitive",
      };
    }
    if (args.prodi) {
      const formattedProdi = args.prodi.replace(/ /g, "_");
      where.prodi = formattedProdi;
    }
    if (args.tipe_soal) {
      where.tipe_soal = args.tipe_soal;
    }
    if (args.year) {
      where.year = Number(args.year);
    }
    if (args.kategori) {
      where.kategori = args.kategori;
    }

    const uploads = await prisma.upload.findMany({
      where,
      take: 10,
      select: {
        id: true,
        title: true,
        mata_kuliah: true,
        tipe_soal: true,
        kategori: true,
        year: true,
        prodi: true,
        fileUrl: true,
      },
    });

    logger.info(`AI Tool searchExamFiles found ${uploads.length} result(s)`);
    return { results: uploads };
  } catch (error) {
    logger.error("Prisma search error in searchExamFiles:", error);
    return { error: "Gagal mencari berkas soal di database." };
  }
}

export const handleChat = async (req: Request, res: Response) => {
  const { contents } = req.body; // Menerima riwayat percakapan dari React

  if (!contents || !Array.isArray(contents)) {
    logger.warn("Chat request rejected: Invalid payload format");
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    logger.info(`Processing chat request with ${contents.length} message turn(s)`);
    // Definisi tools/fungsi yang dikenalkan ke LLM
    const geminiConfig = {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2,
      tools: [
        {
          functionDeclarations: [
            {
              name: "get_platform_statistics",
              description:
                "Mengambil statistik platform UploadXam secara real-time, termasuk jumlah total pengguna (mahasiswa terdaftar), total soal yang diunggah, dan rincian jumlah soal per Program Studi.",
            },
            {
              name: "search_exam_files",
              description:
                "Mencari berkas soal ujian di database berdasarkan nama mata kuliah, program studi, tipe ujian (UTS/UAS), tahun, atau kategori (REGULER/INTER). Kembalikan daftar berkas beserta nama dan URL tautannya.",
              parameters: {
                type: "OBJECT",
                properties: {
                  subject: {
                    type: "STRING",
                    description: "Nama mata kuliah yang dicari (contoh: Algoritma, Pemrograman, Jaringan)."
                  },
                  prodi: {
                    type: "STRING",
                    enum: ["Informatika", "Sistem_Informasi", "Ilmu_Komunikasi", "Kecerdasan_Buatan"],
                    description: "Program studi dari soal ujian tersebut."
                  },
                  tipe_soal: {
                    type: "STRING",
                    enum: ["UTS", "UAS"],
                    description: "Tipe ujian (UTS atau UAS)."
                  },
                  year: {
                    type: "INTEGER",
                    description: "Tahun ujian diselenggarakan."
                  },
                  kategori: {
                    type: "STRING",
                    enum: ["REGULER", "INTER"],
                    description: "Kategori kelas (REGULER atau INTER)."
                  }
                }
              }
            }
          ],
        },
      ],
    };

    // PANGGILAN PERTAMA
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: geminiConfig as any,
    });

    // Cek apakah LLM ingin memanggil fungsi (Function Calling)
    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls[0];
      if (call) {
        logger.info(`Gemini requested Function Call: '${call.name}'`);
        let functionResult: any = null;

        if (call.name === "get_platform_statistics") {
          functionResult = await getPlatformStatistics();
        } else if (call.name === "search_exam_files") {
          const args = call.args as {
            subject?: string;
            prodi?: string;
            tipe_soal?: "UTS" | "UAS";
            year?: number;
            kategori?: "REGULER" | "INTER";
          };
          functionResult = await searchExamFiles(args);
        }

        if (functionResult) {
          const newContents = [...contents];

          // PERBAIKAN 1: Masukkan SELURUH konten asli dari respons model
          // Ini akan otomatis membawa 'thought_signature', 'thought', dan 'functionCall'
          if (response.candidates && response.candidates[0]?.content) {
            newContents.push(response.candidates[0].content);
          }

          // PERBAIKAN 2: Masukkan hasil dari eksekusi Prisma
          newContents.push({
            role: "user", // Role wajib "user" untuk memberikan functionResponse
            parts: [
              {
                functionResponse: {
                  name: call.name,
                  response: functionResult, // Pastikan functionResult adalah Object, bukan JSON string
                },
              },
            ],
          });

          // PANGGILAN KEDUA (Menyampaikan hasil DB agar dirangkai LLM)
          const finalResponse = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: newContents,
            config: geminiConfig as any,
          });

          logger.info("Chat response generated via Function Calling successfully");
          return res.status(200).json({ reply: finalResponse.text });
        }
      }
    }

    // Jika tidak ada panggilan fungsi, langsung kembalikan teks balasan
    logger.info("Chat response generated directly successfully");
    return res.status(200).json({ reply: response.text });
  } catch (error) {
    logger.error("LLM Backend Error:", error);
    return res
      .status(500)
      .json({ reply: "Maaf, sistem AI sedang mengalami gangguan." });
  }
};
