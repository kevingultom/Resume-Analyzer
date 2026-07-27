"use client";

import { useState } from "react";
import ResumeUploader from "@/components/ResumeUploader";
import AnalysisReport from "@/components/AnalysisReport";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useApp } from "@/components/AppProviders";
import type { AnalysisResult } from "@/types/analysis";

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { t } = useApp();

  return (
    <main className="min-h-screen px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex justify-end">
          <LanguageToggle />
        </div>

        <header className="mb-6 text-center sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 sm:mb-4 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 sm:h-4 sm:w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
            {t.badge}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto sm:mt-3 sm:text-base">
            {t.subtitle}
          </p>
        </header>

        {result ? (
          <div>
            <button
              onClick={() => setResult(null)}
              className="mb-6 flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              {t.analyzeAnother}
            </button>
            <AnalysisReport result={result} />
          </div>
        ) : (
          <ResumeUploader onResult={setResult} />
        )}
      </div>

      <ThemeToggle />
    </main>
  );
}
