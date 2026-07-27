import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { AnalysisResult } from "@/types/analysis";
import type { Language } from "@/lib/translations";

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    overall_score: { type: SchemaType.NUMBER },
    sections: {
      type: SchemaType.OBJECT,
      properties: {
        summary: {
          type: SchemaType.OBJECT,
          properties: {
            score: { type: SchemaType.NUMBER },
            feedback: { type: SchemaType.STRING },
          },
          required: ["score", "feedback"],
        },
        experience: {
          type: SchemaType.OBJECT,
          properties: {
            score: { type: SchemaType.NUMBER },
            feedback: { type: SchemaType.STRING },
          },
          required: ["score", "feedback"],
        },
        skills: {
          type: SchemaType.OBJECT,
          properties: {
            score: { type: SchemaType.NUMBER },
            feedback: { type: SchemaType.STRING },
          },
          required: ["score", "feedback"],
        },
        education: {
          type: SchemaType.OBJECT,
          properties: {
            score: { type: SchemaType.NUMBER },
            feedback: { type: SchemaType.STRING },
          },
          required: ["score", "feedback"],
        },
      },
      required: ["summary", "experience", "skills", "education"],
    },
    strengths: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    improvements: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    suitable_roles: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
  },
  required: [
    "overall_score",
    "sections",
    "strengths",
    "improvements",
    "suitable_roles",
  ],
};

const LANGUAGE_NAMES: Record<Language, string> = {
  id: "Bahasa Indonesia",
  en: "English",
};

function buildSystemPrompt(language: Language): string {
  const languageName = LANGUAGE_NAMES[language];
  return `You are an expert technical recruiter. Analyze the resume text and return a structured evaluation. Be concise and specific — short sentences, no filler.

- Scores are integers 0-100.
- Each section feedback: 1-2 sentences max, referencing concrete details from the resume.
- "strengths": exactly 3-4 short bullet points.
- "improvements": exactly 3-4 short bullet points.
- "suitable_roles": exactly 3-4 job titles.
- Write all text values in ${languageName}. Job titles may keep standard English industry terms (e.g. "Software Engineer").

Respond ONLY with JSON matching the schema. No markdown, no commentary, no preamble.`;
}

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to your .env.local file."
    );
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function analyzeResumeText(
  resumeText: string,
  language: Language = "id"
): Promise<AnalysisResult> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: buildSystemPrompt(language),
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema,
      maxOutputTokens: 1500,
    },
  });

  // Most resumes are well under this; capping keeps the request fast without
  // losing signal (Gemini free-tier latency scales with input size).
  const truncatedText = resumeText.slice(0, 8000);

  const result = await model.generateContent(
    `Resume text:\n"""\n${truncatedText}\n"""\n\nReturn the JSON evaluation.`
  );

  const raw = result.response.text();

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Gemini returned invalid JSON. Please try again.");
  }

  return normalizeAnalysisResult(parsed, language);
}

function normalizeAnalysisResult(
  data: unknown,
  language: Language
): AnalysisResult {
  if (!data || typeof data !== "object") {
    throw new Error("Gemini response was not a valid object.");
  }

  const d = data as Record<string, unknown>;
  const sections = d.sections as Record<string, unknown> | undefined;

  if (!sections) {
    throw new Error("Gemini response is missing the 'sections' field.");
  }

  const clampScore = (value: unknown): number => {
    const num = typeof value === "number" ? value : Number(value);
    if (Number.isNaN(num)) return 0;
    return Math.max(0, Math.min(100, Math.round(num)));
  };

  const noFeedbackText =
    language === "id" ? "Tidak ada feedback." : "No feedback provided.";

  const sectionOrDefault = (key: string) => {
    const s = sections[key] as Record<string, unknown> | undefined;
    return {
      score: clampScore(s?.score),
      feedback: typeof s?.feedback === "string" ? s.feedback : noFeedbackText,
    };
  };

  return {
    overall_score: clampScore(d.overall_score),
    sections: {
      summary: sectionOrDefault("summary"),
      experience: sectionOrDefault("experience"),
      skills: sectionOrDefault("skills"),
      education: sectionOrDefault("education"),
    },
    strengths: Array.isArray(d.strengths) ? d.strengths.map(String) : [],
    improvements: Array.isArray(d.improvements)
      ? d.improvements.map(String)
      : [],
    suitable_roles: Array.isArray(d.suitable_roles)
      ? d.suitable_roles.map(String)
      : [],
  };
}
