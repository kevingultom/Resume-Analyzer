# Resume Analyzer

AI-powered CV/resume analysis built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Google Gemini.

## Features

- Drag & drop PDF resume upload
- Server-side PDF text extraction (`pdf-parse`)
- AI analysis via Google Gemini (`gemini-2.5-flash`) returning structured JSON:
  overall score, per-section scores/feedback (summary, experience, skills, education),
  strengths, improvements, and suitable roles
- Clean, modern results dashboard

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure your Gemini API key:

   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and set `GEMINI_API_KEY` to your key from
   [Google AI Studio](https://aistudio.google.com/app/apikey).

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and upload a PDF resume.

## Project Structure

```
src/
  app/
    api/analyze/route.ts   # POST endpoint: PDF -> text -> Gemini -> JSON
    page.tsx                # Home page (upload + results)
    layout.tsx
    globals.css
  components/
    ResumeUploader.tsx       # Drag & drop upload UI
    AnalysisReport.tsx       # Results dashboard
    SectionCard.tsx          # Per-section score card
    ScoreRing.tsx            # Circular overall score indicator
  lib/
    pdf.ts                   # pdf-parse wrapper
    gemini.ts                # Gemini client + prompt + schema validation
  types/
    analysis.ts              # Shared AnalysisResult types
```

## Notes

- Max upload size is 10MB; only `application/pdf` is accepted.
- Gemini is called with a structured `responseSchema` (JSON mode) so output is constrained to the expected shape; the server additionally normalizes/clamps scores defensively.
