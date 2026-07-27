"use client";

import { useApp } from "./AppProviders";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useApp();

  return (
    <div
      className="flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      aria-label={t.languageLabel}
      title={t.languageLabel}
    >
      <button
        onClick={() => setLanguage("id")}
        className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
          language === "id"
            ? "bg-brand-600 text-white"
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
      >
        ID
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
          language === "en"
            ? "bg-brand-600 text-white"
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
      >
        EN
      </button>
    </div>
  );
}
