"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function NotFound() {
  const { isDark } = useTheme();

  return (
    <main
      className={`flex min-h-screen items-center justify-center px-4 py-12 transition-colors duration-200 sm:px-6 lg:px-8 ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div
        className={`mx-auto w-full max-w-lg rounded-3xl border p-8 text-center shadow-sm sm:p-10 ${
          isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            isDark
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          <Compass className="h-8 w-8" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
          404
        </p>
        <h1
          className={`mt-3 text-3xl font-bold sm:text-4xl ${
            isDark ? "text-slate-50" : "text-slate-900"
          }`}
        >
          This page went missing.
        </h1>
        <p
          className={`mt-4 text-sm leading-7 sm:text-base ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          The opportunity, page, or link you're looking for doesn't exist or may
          have been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Back to home
          </Link>
          <Link
            href="/opportunities"
            className={`inline-flex h-12 items-center justify-center rounded-full border px-6 text-sm font-semibold transition ${
              isDark
                ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 hover:bg-slate-100"
            }`}
          >
            Browse opportunities
          </Link>
        </div>
      </div>
    </main>
  );
}
