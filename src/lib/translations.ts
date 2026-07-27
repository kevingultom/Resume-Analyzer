export type Language = "id" | "en";

export const translations = {
  id: {
    badge: "Didukung oleh Google Gemini",
    title: "Analisis CV dengan AI",
    subtitle:
      "Unggah CV Anda dalam format PDF dan dapatkan feedback instan berbasis AI tentang skor, kekuatan, area yang perlu diperbaiki, dan posisi yang paling cocok untuk Anda.",
    dropzoneTitle: "Seret & lepas CV Anda di sini",
    dropzoneSubtitle: "atau klik untuk memilih file (PDF, maks 10MB)",
    replaceHint: "klik atau lepas untuk mengganti",
    analyzeButton: "Analisis CV",
    analyzing: "Menganalisis CV Anda...",
    errorInvalidType: "Hanya file PDF yang didukung.",
    errorTooLarge: "Ukuran file terlalu besar. Maksimal 10MB.",
    errorGeneric: "Terjadi kesalahan. Silakan coba lagi.",
    errorTimeout:
      "Analisis memakan waktu terlalu lama dan dihentikan oleh server. Coba lagi dengan CV yang lebih singkat.",
    analyzeAnother: "Analisis CV lain",
    overallScoreTitle: "Skor Keseluruhan CV",
    overallScoreDesc:
      "Skor ini mencerminkan seberapa baik struktur, penulisan, dan daya saing CV Anda di pasar kerja.",
    sectionBreakdown: "Rincian per Bagian",
    sectionSummary: "Ringkasan",
    sectionExperience: "Pengalaman",
    sectionSkills: "Keahlian",
    sectionEducation: "Pendidikan",
    strengths: "Kekuatan",
    improvements: "Saran Perbaikan",
    suitableRoles: "Posisi yang Cocok",
    languageLabel: "Bahasa",
    themeLabel: "Tema",
  },
  en: {
    badge: "Powered by Google Gemini",
    title: "AI Resume Analyzer",
    subtitle:
      "Upload your CV in PDF format and get instant, AI-powered feedback on scoring, strengths, areas to improve, and roles that fit you best.",
    dropzoneTitle: "Drag & drop your resume here",
    dropzoneSubtitle: "or click to browse (PDF, max 10MB)",
    replaceHint: "click or drop to replace",
    analyzeButton: "Analyze Resume",
    analyzing: "Analyzing your resume...",
    errorInvalidType: "Only PDF files are supported.",
    errorTooLarge: "File is too large. Maximum size is 10MB.",
    errorGeneric: "Something went wrong. Please try again.",
    errorTimeout:
      "The analysis took too long and was stopped by the server. Try again with a shorter resume.",
    analyzeAnother: "Analyze another resume",
    overallScoreTitle: "Overall Resume Score",
    overallScoreDesc:
      "This score reflects how well your resume is structured, written, and positioned for the job market.",
    sectionBreakdown: "Section Breakdown",
    sectionSummary: "Summary",
    sectionExperience: "Experience",
    sectionSkills: "Skills",
    sectionEducation: "Education",
    strengths: "Strengths",
    improvements: "Improvements",
    suitableRoles: "Suitable Roles",
    languageLabel: "Language",
    themeLabel: "Theme",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type Translations = Record<TranslationKey, string>;
