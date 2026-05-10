import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { env } from "../env"; // Asumsi environment variables server Anda
import prisma from "../../prisma/prisma";
import { SYSTEM_INSTRUCTION } from "../data/llm_knowledge";

// Inisialisasi secara aman di backend
const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

// Fungsi eksekusi lokal (Tools)
async function getPlatformStatistics() {
  try {
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

    return { totalMahasiswa, totalSoal, sebaran };
  } catch (error) {
    console.error("Prisma error:", error);
    return { error: "Gagal mengambil data database." };
  }
}

export const handleChat = async (req: Request, res: Response) => {
  const { contents } = req.body; // Menerima riwayat percakapan dari React

  if (!contents || !Array.isArray(contents)) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
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
          ],
        },
      ],
    };

    // PANGGILAN PERTAMA
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: geminiConfig,
    });

    // Cek apakah LLM ingin memanggil fungsi (Function Calling)
    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls[0];

      if (call?.name === "get_platform_statistics") {
        // Eksekusi fungsi langsung ke Prisma
        const functionResult = await getPlatformStatistics();

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
          config: geminiConfig,
        });

        return res.status(200).json({ reply: finalResponse.text });
      }
    }

    // Jika tidak ada panggilan fungsi, langsung kembalikan teks balasan
    return res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error("LLM Backend Error:", error);
    return res
      .status(500)
      .json({ reply: "Maaf, sistem AI sedang mengalami gangguan." });
  }
};
