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
  const startTime = performance.now();
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

    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.info(`AI Tool getPlatformStatistics completed in ${durationMs}ms`, {
      totalMahasiswa,
      totalSoal,
      durationMs,
    });
    return { totalMahasiswa, totalSoal, sebaran, durationMs };
  } catch (error) {
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.error(`Prisma error in getPlatformStatistics after ${durationMs}ms:`, error);
    return { error: "Gagal mengambil data database.", durationMs };
  }
}

async function searchExamFiles(args: {
  subject?: string;
  prodi?: string;
  tipe_soal?: "UTS" | "UAS";
  year?: number;
  kategori?: "REGULER" | "INTER";
}) {
  const startTime = performance.now();
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

    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.info(
      `AI Tool searchExamFiles found ${uploads.length} result(s) in ${durationMs}ms`,
      { durationMs }
    );
    return { results: uploads, durationMs };
  } catch (error) {
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.error(`Prisma search error in searchExamFiles after ${durationMs}ms:`, error);
    return { error: "Gagal mencari berkas soal di database.", durationMs };
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

async function analyzeQuery(
  userMessage: string
): Promise<{ analysis: QueryAnalysis; durationMs: number }> {
  const startTime = performance.now();
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
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.info(`Step 1 completed in ${durationMs}ms. Analysis:`, {
      ...analysis,
      durationMs,
    });
    return { analysis, durationMs };
  } catch (error) {
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.error(`Step 1 failed after ${durationMs}ms:`, error);
    // Default: assume it's a platform question
    return {
      analysis: {
        program: null,
        intent: null,
        semester: null,
        course: null,
        concentration: null,
        is_curriculum: false,
      },
      durationMs,
    };
  }
}

// ============================================================================
// Step 2: Knowledge Retrieval (no LLM, filesystem/logic)
// Uses query analysis to retrieve relevant documents
// ============================================================================

function retrieveDocuments(
  analysis: QueryAnalysis
): { documents: string[]; durationMs: number } {
  const startTime = performance.now();
  logger.info("Step 2: Retrieving knowledge documents...");
  const documents = retrieveKnowledge(analysis);
  const durationMs = Number((performance.now() - startTime).toFixed(2));
  logger.info(
    `Step 2 completed in ${durationMs}ms. Found ${documents.length} document(s)`,
    { durationMs, count: documents.length }
  );
  return { documents, durationMs };
}

// ============================================================================
// Step 3: Context Builder
// Consolidates retrieved documents into a single ordered context
// ============================================================================

async function buildContext(
  documents: string[]
): Promise<{ context: string; durationMs: number }> {
  const startTime = performance.now();
  logger.info("Step 3: Building context...");

  if (documents.length === 0) {
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.warn(`Step 3 completed in ${durationMs}ms: No documents to build context from`);
    return { context: "", durationMs };
  }

  // If only one document, no need to consolidate
  if (documents.length === 1) {
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.info(
      `Step 3 completed in ${durationMs}ms (single document, no LLM consolidation needed)`
    );
    return { context: documents[0]!, durationMs };
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
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.info(
      `Step 3 completed in ${durationMs}ms. Context length: ${context.length} chars`,
      { durationMs, length: context.length }
    );
    return { context, durationMs };
  } catch (error) {
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.error(`Step 3 failed after ${durationMs}ms, using raw concatenation:`, error);
    // Fallback: just concatenate
    return { context: documents.join("\n\n---\n\n"), durationMs };
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
): Promise<{ answer: string; durationMs: number }> {
  const startTime = performance.now();
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
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.info(
      `Step 4 completed in ${durationMs}ms. Answer length: ${answer.length} chars`,
      { durationMs, length: answer.length }
    );
    return { answer, durationMs };
  } catch (error) {
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.error(`Step 4 failed after ${durationMs}ms:`, error);
    return {
      answer: "Maaf, terjadi kesalahan saat menghasilkan jawaban.",
      durationMs,
    };
  }
}

// ============================================================================
// Step 5: Grounding Checker
// Verifies the answer is supported by KNOWLEDGE, removes unsupported parts
// ============================================================================

async function checkGrounding(
  answer: string,
  context: string,
): Promise<{ verified: string; durationMs: number }> {
  const startTime = performance.now();
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
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.info(
      `Step 5 completed in ${durationMs}ms. Verified answer length: ${verified.length} chars`,
      { durationMs, length: verified.length }
    );
    return { verified, durationMs };
  } catch (error) {
    const durationMs = Number((performance.now() - startTime).toFixed(2));
    logger.error(
      `Step 5 failed after ${durationMs}ms, returning unverified answer:`,
      error
    );
    return { verified: answer, durationMs };
  }
}

// ============================================================================
// Platform Flow: Handles platform-related questions with Function Calling
// ============================================================================

async function handlePlatformQuestion(
  contents: any[]
): Promise<{ reply: string; durationMs: number }> {
  const startTime = performance.now();
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

        const reply = finalResponse.text || "Maaf, terjadi kesalahan.";
        const durationMs = Number((performance.now() - startTime).toFixed(2));
        logger.info(`Platform flow (with tool call) completed in ${durationMs}ms`);
        return { reply, durationMs };
      }
    }
  }

  const reply = response.text || "Maaf, terjadi kesalahan.";
  const durationMs = Number((performance.now() - startTime).toFixed(2));
  logger.info(`Platform flow completed in ${durationMs}ms`);
  return { reply, durationMs };
}

// ============================================================================
// Main Handler: Multi-Step RAG Pipeline
// ============================================================================

export const handleChat = async (req: Request, res: Response) => {
  const totalStartTime = performance.now();
  const { contents } = req.body;

  if (!contents || !Array.isArray(contents)) {
    logger.warn("Chat request rejected: Invalid payload format");
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    logger.info(
      `Processing chat request with ${contents.length} message turn(s)`
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
    const { analysis, durationMs: step1Ms } = await analyzeQuery(userText);

    // ======================================================================
    // Route: Platform vs Curriculum
    // ======================================================================
    if (!analysis.is_curriculum) {
      // Platform-related question → use original flow with Function Calling
      logger.info("Routing to platform flow (non-curriculum question)");
      const { reply, durationMs: platformMs } = await handlePlatformQuestion(contents);
      const totalPipelineMs = Number((performance.now() - totalStartTime).toFixed(2));
      logger.info(`Platform request completed successfully in ${totalPipelineMs}ms`, {
        timing: {
          step1_queryAnalysisMs: step1Ms,
          platformFlowMs: platformMs,
          totalPipelineMs,
        },
      });
      return res.status(200).json({ reply });
    }

    // ======================================================================
    // Curriculum RAG Pipeline (Steps 2-5)
    // ======================================================================
    logger.info("Routing to curriculum RAG pipeline");

    // Step 2: Retrieve knowledge documents
    const { documents, durationMs: step2Ms } = retrieveDocuments(analysis);

    // Step 3: Build consolidated context
    const { context, durationMs: step3Ms } = await buildContext(documents);

    if (!context) {
      const totalPipelineMs = Number((performance.now() - totalStartTime).toFixed(2));
      logger.warn(`No knowledge context available. Pipeline terminated in ${totalPipelineMs}ms`);
      return res.status(200).json({
        reply:
          "Maaf, informasi tersebut tidak ditemukan pada knowledge kurikulum yang tersedia.",
      });
    }

    // Step 4: Generate answer with RAG context
    const { answer: draftAnswer, durationMs: step4Ms } = await generateAnswer(
      userText,
      context,
      contents
    );

    // Step 5: Grounding check
    const { verified: verifiedAnswer, durationMs: step5Ms } = await checkGrounding(
      draftAnswer,
      context
    );

    const totalPipelineMs = Number((performance.now() - totalStartTime).toFixed(2));
    logger.info(`RAG pipeline completed successfully in ${totalPipelineMs}ms`, {
      timing: {
        step1_queryAnalysisMs: step1Ms,
        step2_knowledgeRetrievalMs: step2Ms,
        step3_contextBuilderMs: step3Ms,
        step4_answerGenerationMs: step4Ms,
        step5_groundingCheckerMs: step5Ms,
        totalPipelineMs,
      },
    });

    return res.status(200).json({ reply: verifiedAnswer });
  } catch (error) {
    const totalPipelineMs = Number((performance.now() - totalStartTime).toFixed(2));
    logger.error(`LLM Backend Error after ${totalPipelineMs}ms:`, error);
    return res
      .status(500)
      .json({ reply: "Maaf, sistem AI sedang mengalami gangguan." });
  }
};

