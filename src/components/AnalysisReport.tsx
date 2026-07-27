"use client";

import type { AnalysisResult } from "@/types/analysis";
import ScoreRing from "./ScoreRing";
import SectionCard from "./SectionCard";
import { useApp } from "./AppProviders";

const icons = {
  summary: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  ),
  experience: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  ),
  skills: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
    </svg>
  ),
  education: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  ),
};

export default function AnalysisReport({ result }: { result: AnalysisResult }) {
  const { t } = useApp();

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6 flex flex-col items-center rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:mb-8 sm:rounded-2xl sm:p-8">
        <ScoreRing score={result.overall_score} size={140} sizeSm={180} />
        <h2 className="mt-3 text-base font-bold text-slate-800 dark:text-slate-100 sm:mt-4 sm:text-xl">
          {t.overallScoreTitle}
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 text-center max-w-md sm:text-sm">
          {t.overallScoreDesc}
        </p>
      </div>

      <h3 className="mb-3 text-base font-bold text-slate-800 dark:text-slate-100 sm:mb-4 sm:text-lg">
        {t.sectionBreakdown}
      </h3>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-4">
        <SectionCard title={t.sectionSummary} icon={icons.summary} data={result.sections.summary} />
        <SectionCard title={t.sectionExperience} icon={icons.experience} data={result.sections.experience} />
        <SectionCard title={t.sectionSkills} icon={icons.skills} data={result.sections.skills} />
        <SectionCard title={t.sectionEducation} icon={icons.education} data={result.sections.education} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-green-200 bg-green-50 p-3.5 dark:border-green-900/50 dark:bg-green-950/30 sm:rounded-xl sm:p-5">
          <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-green-800 dark:text-green-400 sm:mb-3 sm:gap-2 sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 sm:h-5 sm:w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {t.strengths}
          </h3>
          <ul className="space-y-1.5 sm:space-y-2">
            {result.strengths.map((item, i) => (
              <li key={i} className="flex gap-2 text-xs text-green-900 dark:text-green-200 sm:text-sm">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3.5 dark:border-amber-900/50 dark:bg-amber-950/30 sm:rounded-xl sm:p-5">
          <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-amber-800 dark:text-amber-400 sm:mb-3 sm:gap-2 sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 sm:h-5 sm:w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            {t.improvements}
          </h3>
          <ul className="space-y-1.5 sm:space-y-2">
            {result.improvements.map((item, i) => (
              <li key={i} className="flex gap-2 text-xs text-amber-900 dark:text-amber-200 sm:text-sm">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-brand-200 bg-brand-50 p-3.5 dark:border-brand-900/50 dark:bg-brand-950/30 sm:rounded-xl sm:p-5">
        <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-brand-800 dark:text-brand-400 sm:mb-3 sm:gap-2 sm:text-base">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 sm:h-5 sm:w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          {t.suitableRoles}
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {result.suitable_roles.map((role, i) => (
            <span
              key={i}
              className="rounded-full bg-white border border-brand-300 px-2.5 py-1 text-xs font-medium text-brand-700 shadow-sm dark:bg-slate-800 dark:border-brand-800 dark:text-brand-300 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
