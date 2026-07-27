import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPdf } from "@/lib/pdf";
import { analyzeResumeText } from "@/lib/gemini";
import type { Language } from "@/lib/translations";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        { error: "No file was uploaded. Please attach a PDF resume." },
        { status: 400 }
      );
    }
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file was uploaded. Please attach a PDF resume." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF file." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const languageField = formData.get("language");
    const language: Language = languageField === "en" ? "en" : "id";

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let resumeText: string;
    try {
      resumeText = await extractTextFromPdf(buffer);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to parse the PDF file.";
      return NextResponse.json({ error: message }, { status: 422 });
    }

    let analysis;
    try {
      analysis = await analyzeResumeText(resumeText, language);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to analyze the resume with Gemini.";
      return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json(analysis, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
