"use client";
import { useTheme } from "@/context/ThemeContext";
type statsTotalProps = {
  statsTotal: number;
};
export default function Header({ statsTotal }: statsTotalProps) {
  const { isDark } = useTheme();

  return (
    <header
      className={`rounded-[28px] border p-6 shadow-sm ${
        isDark
          ? "border-slate-800 bg-slate-900/80"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Analytics overview
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Opportunity Dashboard
          </h1>
          <p
            className={`mt-3 max-w-2xl text-sm sm:text-base ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Track your opportunity catalog, monitor deadlines, and gain insights
            from real-time data.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              isDark
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {statsTotal} total
          </span>
        </div>
      </div>
    </header>
  );
}
