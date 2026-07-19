"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Loading() {
  const { isDark } = useTheme();
  return (
    <main
      className={`flex min-h-screen items-center justify-center px-4 transition-colors duration-200 ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className={`h-12 w-12 animate-spin rounded-full border-4 border-t-transparent ${
            isDark ? "border-emerald-400" : "border-emerald-600"
          }`}
        />
        <p
          className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          Loading Karyaab Afghanistan…
        </p>
      </div>
    </main>
  );
}
