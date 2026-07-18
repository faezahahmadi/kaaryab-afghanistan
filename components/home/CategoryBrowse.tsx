"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const categories = [
  "Job",
  "Internship",
  "Scholarship",
  "Online Course",
  "Training Program",
  "Volunteer Work",
] as const;

export default function CategoryBrowse() {
  const { isDark } = useTheme();

  return (
    <section
      className={`mx-auto w-full max-w-6xl rounded-3xl border-2 my-10 p-6 shadow-lg sm:p-8 ${
        isDark
          ? "border-slate-800 bg-slate-900/70"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end justify-center text-center items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 flex items-start my-5">
            Browse by category
          </p>
          <h2
            className={`mt-2 text-3xl font-bold sm:text-4xl ${
              isDark ? "text-slate-50" : "text-slate-900"
            }`}
          >
            Explore opportunities with a single click
          </h2>
          <p
            className={`max-w-xl text-sm sm:text-base my-5 flex text-center ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Start with one category and let the opportunities page show the most
            relevant results.
          </p>
        </div>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/opportunities?category=${encodeURIComponent(category)}`}
            className={`inline-flex min-h-12 items-center justify-center rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 hover:scale-105 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-emerald-400"
                : "border-slate-200 bg-slate-50 text-slate-800"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}
