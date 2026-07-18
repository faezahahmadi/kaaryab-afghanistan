"use client";
import OpportunitiesList from "@/components/opportunitiesPage/OpportunitiesList";
import { useTheme } from "@/context/ThemeContext";
import { div } from "framer-motion/client";
import { Suspense } from "react";
export default function Opportunities() {
  const { isDark } = useTheme();

  return (
    <main
      className={`min-h-screen px-6 py-16 transition-colors duration-200 ${isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1
            className={`text-4xl font-bold text-center ${isDark ? "text-slate-50" : "text-slate-900"}`}
          >
            Opportunities
          </h1>
          <p
            className={`mt-2 text-lg text-center ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            Browse available opportunities and open the full details for each
            one.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="text-center py-10">Loading Opportunities</div>
          }
        >
          <OpportunitiesList />
        </Suspense>
      </div>
    </main>
  );
}
