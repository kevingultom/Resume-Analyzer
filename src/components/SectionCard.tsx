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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400">
            {icon}
          </span>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </h3>
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          {data.score}/100
        </span>
      </div>

      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full rounded-full ${getBarColor(data.score)} transition-all duration-700`}
          style={{ width: `${data.score}%` }}
        />
      </div>

      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {data.feedback}
      </p>
    </div>
  );
}
