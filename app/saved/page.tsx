"use client";

import Link from "next/link";
import OpportunityCard from "@/components/opportunitiesPage/OpportunityCard";
import { useOpportunityContext } from "@/context/OpportunityContext";
import { useTheme } from "@/context/ThemeContext";

export default function SavedOpportunities() {
  const { savedOpportunities } = useOpportunityContext();
  const { isDark } = useTheme();

  return (
    <main
      className={`min-h-screen px-4 py-12 sm:px-6 lg:px-8 lg:py-16 transition-colors duration-200
         ${isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Your bookmarks
            </p>
            <h1
              className={`mt-2 text-3xl font-bold ${isDark ? "text-slate-50" : "text-slate-900"}`}
            >
              Saved opportunities
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Keep track of opportunities you want to revisit later.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center text-sm font-medium text-emerald-600 hover:underline"
          >
            Browse more opportunities →
          </Link>
        </div>

        {savedOpportunities.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {savedOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        ) : (
          <div
            className={`rounded-3xl border border-dashed p-10 text-center shadow-sm
               ${isDark ? "border-slate-700 bg-slate-900" : "border-slate-300 bg-white"}`}
          >
            <h2
              className={`text-xl font-semibold ${isDark ? "text-slate-50" : "text-slate-900"}`}
            >
              No saved opportunities yet
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Bookmark opportunities from the catalog and they will appear here
              for quick access.
            </p>
            <Link
              href="/opportunities"
              className="mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm 
              font-semibold text-white transition hover:bg-emerald-700"
            >
              Explore opportunities
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
