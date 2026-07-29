import * as fs from "fs";
import * as path from "path";
import { logger } from "../utils/logger";

// ============================================================================
// Knowledge Loader
// Reads knowledge files from the filesystem and provides retrieval functions
// based on query analysis results (program, intent, semester, etc.)
// ============================================================================

const KNOWLEDGE_BASE_PATH = path.resolve(__dirname, "knowledge");

/**
 * Reads a knowledge file from the filesystem.
 * Returns empty string if file doesn't exist.
 */
function readKnowledgeFile(relativePath: string): string {
  try {
    const fullPath = path.join(KNOWLEDGE_BASE_PATH, relativePath);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, "utf-8");
    }
    logger.warn(`Knowledge file not found: ${relativePath}`);
    return "";
  } catch (error) {
    logger.error(`Error reading knowledge file: ${relativePath}`, error);
    return "";
  }
}

/**
 * Maps program study name/alias to its folder name in knowledge base.
 */
function mapProgramToFolder(program: string | null): string | null {
  if (!program) return null;
  const normalized = program.toLowerCase().trim();

  const mapping: Record<string, string> = {
    "teknik informatika": "teknik-informatika",
    informatika: "teknik-informatika",
    ti: "teknik-informatika",
    "computer science": "teknik-informatika",
    "sistem informasi": "sistem-informasi",
    si: "sistem-informasi",
    "ilmu komunikasi": "ilmu-komunikasi",
    ikom: "ilmu-komunikasi",
    komunikasi: "ilmu-komunikasi",
    "kecerdasan buatan": "kecerdasan-buatan",
    ai: "kecerdasan-buatan",
    "artificial intelligence": "kecerdasan-buatan",
  };

  return mapping[normalized] || null;
}

interface QueryAnalysis {
  program: string | null;
  intent: string | null;
  semester: number | null;
  course: string | null;
  concentration: string | null;
}

/**
 * Retrieves relevant knowledge documents based on query analysis results.
 * Returns an array of document strings ordered by priority:
 * overview → concentration → electives → global docs
 */
export function retrieveKnowledge(analysis: QueryAnalysis): string[] {
  const documents: string[] = [];
  const folder = mapProgramToFolder(analysis.program);

  logger.info("Retrieving knowledge for analysis:", analysis);

  // 1. Program-specific overview (highest priority)
  if (folder) {
    const overview = readKnowledgeFile(`${folder}/overview.md`);
    if (overview) documents.push(overview);
  }

  // 2. Concentration documents (if relevant)
  if (
    analysis.concentration ||
    analysis.intent === "concentration"
  ) {
    if (folder === "teknik-informatika") {
      const concMap: Record<string, string> = {
        rpl: "concentrations/rpl.md",
        "rekayasa perangkat lunak": "concentrations/rpl.md",
        "software engineering": "concentrations/rpl.md",
        sj: "concentrations/sj.md",
        "sistem jaringan": "concentrations/sj.md",
        network: "concentrations/sj.md",
        sic: "concentrations/sic.md",
        "sistem interaktif cerdas": "concentrations/sic.md",
        "intelligent interactive": "concentrations/sic.md",
      };

      if (analysis.concentration) {
        const concFile =
          concMap[analysis.concentration.toLowerCase().trim()];
        if (concFile) {
          const concDoc = readKnowledgeFile(
            `teknik-informatika/${concFile}`
          );
          if (concDoc) documents.push(concDoc);
        }
      }

      // If intent is about concentrations in general, load all
      if (analysis.intent === "concentration" && !analysis.concentration) {
        for (const file of ["concentrations/rpl.md", "concentrations/sj.md", "concentrations/sic.md"]) {
          const doc = readKnowledgeFile(`teknik-informatika/${file}`);
          if (doc) documents.push(doc);
        }
      }
    }
  }

  // 3. Elective courses
  if (
    analysis.intent === "elective_courses" ||
    analysis.intent === "concentration"
  ) {
    if (folder) {
      const electives = readKnowledgeFile(`${folder}/electives.md`);
      if (electives) documents.push(electives);
    }
  }

  // 4. Global reference docs (lower priority)
  if (
    analysis.intent === "glossary" ||
    analysis.intent === "faq"
  ) {
    const glossary = readKnowledgeFile("glossary.md");
    if (glossary) documents.push(glossary);
    const faq = readKnowledgeFile("faq.md");
    if (faq) documents.push(faq);
  }

  // 5. Metadata (for general questions about the knowledge base)
  if (analysis.intent === "curriculum_overview" && !folder) {
    const metadata = readKnowledgeFile("metadata.md");
    if (metadata) documents.push(metadata);
  }

  // 6. If no specific documents found, provide the main curriculum data
  // and let the LLM extract what's relevant
  if (documents.length === 0) {
    // Fallback: load overview for all programs if no program specified
    if (!folder) {
      for (const f of ["teknik-informatika", "sistem-informasi", "ilmu-komunikasi", "kecerdasan-buatan"]) {
        const overview = readKnowledgeFile(`${f}/overview.md`);
        if (overview) documents.push(overview);
      }
    } else {
      // Load overview for the specified program
      const overview = readKnowledgeFile(`${folder}/overview.md`);
      if (overview) documents.push(overview);
    }
  }

  // 7. Always include the complete curriculum data as a reliable fallback
  // since individual knowledge files may have incomplete data
  const mainCurriculumData = readKnowledgeFile("curriculum-data.md");
  if (mainCurriculumData) {
    documents.push(mainCurriculumData);
  }

  logger.info(`Retrieved ${documents.length} knowledge document(s)`);
  return documents;
}
