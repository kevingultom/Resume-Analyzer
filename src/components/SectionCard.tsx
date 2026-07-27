import type { SectionFeedback } from "@/types/analysis";

function getBarColor(score: number) {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-brand-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

export default function SectionCard({
  title,
  icon,
  data,
}: {
  title: string;
  icon: React.ReactNode;
  data: SectionFeedback;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:rounded-xl sm:p-5">
      <div className="mb-2.5 flex items-center justify-between sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400 sm:h-8 sm:w-8 sm:rounded-lg">
            {icon}
          </span>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 sm:text-base">
            {title}
          </h3>
        </div>
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 sm:text-sm">
          {data.score}/100
        </span>
      </div>

      <div className="mb-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 sm:mb-3 sm:h-2">
        <div
          className={`h-full rounded-full ${getBarColor(data.score)} transition-all duration-700`}
          style={{ width: `${data.score}%` }}
        />
      </div>

      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
        {data.feedback}
      </p>
    </div>
  );
}
