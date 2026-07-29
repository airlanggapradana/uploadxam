import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { env } from "../env"; // Asumsi environment variables server Anda
import prisma from "../../prisma/prisma";
import {
  SYSTEM_INSTRUCTION,
  RAG_SYSTEM_PROMPT,
  QUERY_ANALYZER_PROMPT,
  CONTEXT_BUILDER_PROMPT,
  GROUNDING_CHECKER_PROMPT,
} from "../data/llm_knowledge";
import { retrieveKnowledge } from "../data/knowledge_loader";
import { logger } from "../utils/logger";

// Inisialisasi secara aman di backend
const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const GEMINI_MODEL = "gemini-3.5-flash";

// ============================================================================
// Tool Functions (Platform-specific, invoked via Function Calling)
// ============================================================================

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

    logger.info("AI Tool getPlatformStatistics completed", {
      totalMahasiswa,
      totalSoal,
    });
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

// ============================================================================
// Gemini Function Calling Config (for platform-related queries)
// ============================================================================

const functionDeclarations = [
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
          description:
            "Nama mata kuliah yang dicari (contoh: Algoritma, Pemrograman, Jaringan).",
        },
        prodi: {
          type: "STRING",
          enum: [
            "Informatika",
            "Sistem_Informasi",
            "Ilmu_Komunikasi",
            "Kecerdasan_Buatan",
          ],
          description: "Program studi dari soal ujian tersebut.",
        },
        tipe_soal: {
          type: "STRING",
          enum: ["UTS", "UAS"],
          description: "Tipe ujian (UTS atau UAS).",
        },
        year: {
          type: "INTEGER",
          description: "Tahun ujian diselenggarakan.",
        },
        kategori: {
          type: "STRING",
          enum: ["REGULER", "INTER"],
          description: "Kategori kelas (REGULER atau INTER).",
        },
      },
    },
  },
];

// ============================================================================
// Step 1: Query Analyzer
// Analyzes user question → returns structured JSON
// ============================================================================

interface QueryAnalysis {
  program: string | null;
  intent: string | null;
  semester: number | null;
  course: string | null;
  concentration: string | null;
  is_curriculum: boolean;
}

async function analyzeQuery(userMessage: string): Promise<QueryAnalysis> {
  logger.info("Step 1: Analyzing query...");

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: QUERY_ANALYZER_PROMPT,
        temperature: 0.0,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    // Clean any markdown code fences that the model might add
    const cleaned = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    const analysis = JSON.parse(cleaned) as QueryAnalysis;
    logger.info("Step 1 completed. Analysis:", analysis);
    return analysis;
  } catch (error) {
    logger.error("Step 1 failed:", error);
    // Default: assume it's a platform question
    return {
      program: null,
      intent: null,
      semester: null,
      course: null,
      concentration: null,
      is_curriculum: false,
    };
  }
}

// ============================================================================
// Step 2: Knowledge Retrieval (no LLM, filesystem/logic)
// Uses query analysis to retrieve relevant documents
// ============================================================================

function retrieveDocuments(analysis: QueryAnalysis): string[] {
  logger.info("Step 2: Retrieving knowledge documents...");
  const documents = retrieveKnowledge(analysis);
  logger.info(`Step 2 completed. Found ${documents.length} document(s)`);
  return documents;
}

// ============================================================================
// Step 3: Context Builder
// Consolidates retrieved documents into a single ordered context
// ============================================================================

async function buildContext(documents: string[]): Promise<string> {
  logger.info("Step 3: Building context...");

  if (documents.length === 0) {
    logger.warn("Step 3: No documents to build context from");
    return "";
  }

  // If only one document, no need to consolidate
  if (documents.length === 1) {
    logger.info("Step 3 completed (single document, no consolidation needed)");
    return documents[0]!;
  }

  try {
    const documentsText = documents
      .map((doc, i) => `--- DOCUMENT ${i + 1} ---\n${doc}`)
      .join("\n\n");

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [{ text: documentsText }],
        },
      ],
      config: {
        systemInstruction: CONTEXT_BUILDER_PROMPT,
        temperature: 0.0,
      },
    });

    const context = response.text || documentsText;
    logger.info(`Step 3 completed. Context length: ${context.length} chars`);
    return context;
  } catch (error) {
    logger.error("Step 3 failed, using raw concatenation:", error);
    // Fallback: just concatenate
    return documents.join("\n\n---\n\n");
  }
}

// ============================================================================
// Step 4: Generator (RAG Answer Generation)
// Uses consolidated context + user question to generate answer
// ============================================================================

async function generateAnswer(
  userMessage: string,
  context: string,
  conversationHistory: any[],
): Promise<string> {
  logger.info("Step 4: Generating answer with RAG context...");

  const systemPromptWithContext = `${RAG_SYSTEM_PROMPT}

---

# KNOWLEDGE

${context}`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: conversationHistory,
      config: {
        systemInstruction: systemPromptWithContext,
        temperature: 0.2,
      },
    });

    const answer =
      response.text || "Maaf, terjadi kesalahan saat menghasilkan jawaban.";
    logger.info(`Step 4 completed. Answer length: ${answer.length} chars`);
    return answer;
  } catch (error) {
    logger.error("Step 4 failed:", error);
    return "Maaf, terjadi kesalahan saat menghasilkan jawaban.";
  }
}

// ============================================================================
// Step 5: Grounding Checker
// Verifies the answer is supported by KNOWLEDGE, removes unsupported parts
// ============================================================================

async function checkGrounding(
  answer: string,
  context: string,
): Promise<string> {
  logger.info("Step 5: Checking grounding...");

  try {
    const prompt = `KNOWLEDGE:
${context}

---

JAWABAN YANG PERLU DIPERIKSA:
${answer}`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: GROUNDING_CHECKER_PROMPT,
        temperature: 0.0,
      },
    });

    const verified = response.text || answer;
    logger.info(
      `Step 5 completed. Verified answer length: ${verified.length} chars`,
    );
    return verified;
  } catch (error) {
    logger.error("Step 5 failed, returning unverified answer:", error);
    return answer; // Return original if grounding check fails
  }
}

// ============================================================================
// Platform Flow: Handles platform-related questions with Function Calling
// ============================================================================

async function handlePlatformQuestion(contents: any[]): Promise<string> {
  logger.info("Platform flow: Processing with Function Calling...");

  const geminiConfig = {
    systemInstruction: SYSTEM_INSTRUCTION,
    temperature: 0.2,
    tools: [{ functionDeclarations }],
  };

  // First call
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: contents,
    config: geminiConfig as any,
  });

  // Check for function calls
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

        // Include original model response content (with thought_signature, etc.)
        if (response.candidates && response.candidates[0]?.content) {
          newContents.push(response.candidates[0].content);
        }

        // Add function result
        newContents.push({
          role: "user",
          parts: [
            {
              functionResponse: {
                name: call.name,
                response: functionResult,
              },
            },
          ],
        });

        // Second call with function results
        const finalResponse = await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: newContents,
          config: geminiConfig as any,
        });

        return finalResponse.text || "Maaf, terjadi kesalahan.";
      }
    }
  }

  return response.text || "Maaf, terjadi kesalahan.";
}

// ============================================================================
// Main Handler: Multi-Step RAG Pipeline
// ============================================================================

export const handleChat = async (req: Request, res: Response) => {
  const { contents } = req.body;

  if (!contents || !Array.isArray(contents)) {
    logger.warn("Chat request rejected: Invalid payload format");
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    logger.info(
      `Processing chat request with ${contents.length} message turn(s)`,
    );

    // Extract the latest user message
    const lastUserMessage = contents
      .filter((c: any) => c.role === "user")
      .pop();
    const userText = lastUserMessage?.parts?.[0]?.text || "";

    if (!userText) {
      return res.status(400).json({ error: "Empty user message" });
    }

    // ======================================================================
    // Step 1: Query Analysis
    // ======================================================================
    const analysis = await analyzeQuery(userText);

    // ======================================================================
    // Route: Platform vs Curriculum
    // ======================================================================
    if (!analysis.is_curriculum) {
      // Platform-related question → use original flow with Function Calling
      logger.info("Routing to platform flow (non-curriculum question)");
      const reply = await handlePlatformQuestion(contents);
      logger.info("Platform flow completed successfully");
      return res.status(200).json({ reply });
    }

    // ======================================================================
    // Curriculum RAG Pipeline (Steps 2-5)
    // ======================================================================
    logger.info("Routing to curriculum RAG pipeline");

    // Step 2: Retrieve knowledge documents
    const documents = retrieveDocuments(analysis);

    // Step 3: Build consolidated context
    const context = await buildContext(documents);

    if (!context) {
      logger.warn("No knowledge context available");
      return res.status(200).json({
        reply:
          "Maaf, informasi tersebut tidak ditemukan pada knowledge kurikulum yang tersedia.",
      });
    }

    // Step 4: Generate answer with RAG context
    const draftAnswer = await generateAnswer(userText, context, contents);

    // Step 5: Grounding check
    const verifiedAnswer = await checkGrounding(draftAnswer, context);

    logger.info("RAG pipeline completed successfully");
    return res.status(200).json({ reply: verifiedAnswer });
  } catch (error) {
    logger.error("LLM Backend Error:", error);
    return res
      .status(500)
      .json({ reply: "Maaf, sistem AI sedang mengalami gangguan." });
  }
};
