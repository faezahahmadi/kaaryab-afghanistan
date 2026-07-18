"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOpportunityContext } from "@/context/OpportunityContext";
import { useTheme } from "@/context/ThemeContext";
import type { Opportunity } from "@/utils/mockData";
import { useEffect, useState } from "react";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const router = useRouter();
  const { isSaved, toggleSavedOpportunity } = useOpportunityContext();
  const { isDark } = useTheme();

  // Always start with false so server and client match
  const [saved, setSaved] = useState(false);

  // Update after hydration
  useEffect(() => {
    setSaved(isSaved(opportunity.id));
  }, [isSaved, opportunity.id]);

  const handleSaveToggle = () => {
    toggleSavedOpportunity(opportunity);
    if (!saved) router.push("/saved");
  };

  return (
    <article
      className={`rounded-xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        isDark
          ? "border-slate-800 bg-slate-900/70"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            {opportunity.category}
          </p>
          <h2
            className={`mt-2 text-xl font-semibold ${
              isDark ? "text-slate-50" : "text-slate-900"
            }`}
          >
            {opportunity.title}
          </h2>
          <p
            className={`mt-2 text-sm ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Organization: {opportunity.organization}
          </p>
          <p
            className={`mt-1 text-sm ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Deadline: {opportunity.deadline}
          </p>
          <p
            className={`mt-1 text-sm ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Type: {opportunity.type}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveToggle}
          aria-label={saved ? "Remove bookmark" : "Bookmark opportunity"}
          className={`rounded-full p-2 transition ${
            saved
              ? isDark
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-emerald-50 text-emerald-600"
              : isDark
                ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isDark
              ? "bg-slate-800 text-slate-300"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {opportunity.featured ? "Featured" : "Standard"}
        </span>

        <Link
          href={`/opportunities/${opportunity.id}`}
          className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
            isDark
              ? "bg-emerald-600 hover:bg-emerald-500"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
