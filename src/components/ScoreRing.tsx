"use client";

function getColor(score: number) {
  if (score >= 80)
    return { stroke: "#22c55e", text: "text-green-600 dark:text-green-400" };
  if (score >= 60)
    return { stroke: "#3b82f6", text: "text-brand-600 dark:text-brand-400" };
  if (score >= 40)
    return { stroke: "#f59e0b", text: "text-amber-600 dark:text-amber-400" };
  return { stroke: "#ef4444", text: "text-red-600 dark:text-red-400" };
}

export default function ScoreRing({
  score,
  size = 160,
  sizeSm,
  label,
}: {
  score: number;
  size?: number;
  /** Larger size used once the viewport is >= 640px (Tailwind's sm breakpoint). */
  sizeSm?: number;
  label?: string;
}) {
  // Geometry is computed from `size`; when sizeSm is set the box scales up
  // fluidly via clamp() so no JS resize listener or duplicate render is needed.
  const strokeWidth = size * 0.09;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const { stroke, text } = getColor(score);

  const boxSize = sizeSm
    ? `clamp(${size}px, ${size}px + ((100vw - 375px) / (640 - 375)) * ${sizeSm - size}, ${sizeSm}px)`
    : `${size}px`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: boxSize, height: boxSize }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 h-full w-full"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold sm:text-3xl ${text}`}>
            {score}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 sm:text-xs">
            / 100
          </span>
        </div>
      </div>
      {label && (
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
          {label}
        </span>
      )}
    </div>
  );
}
