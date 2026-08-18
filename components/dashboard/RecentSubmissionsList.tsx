"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { formatDate } from "@/utils/dashboardStats";
import type { Opportunity } from "@/utils/mockData";

type RecentSubmissionsListProps = {
  opportunities: Opportunity[];
};

export default function RecentSubmissionsList({ opportunities }: RecentSubmissionsListProps) {
  const { isDark } = useTheme();

  return (
    <article
      className={`rounded-[28px] border p-6 shadow-sm ${
        isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Latest
          </p>
          <h2 className="mt-1 text-xl font-semibold">Recent Submissions</h2>
        </div>
        <Link
          href="/opportunities"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            isDark
              ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
              : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
          }`}
        >
          View all
        </Link>
      </div>

      {opportunities.length === 0 ? (
        <div
          className={`mt-6 rounded-2xl border border-dashed p-8 text-center ${
            isDark ? "border-slate-700 text-slate-300" : "border-slate-200 text-slate-600"
          }`}
        >
          <p className="text-lg font-semibold">No submissions yet</p>
          <p className="mt-2 text-sm">Opportunities will appear here as they are added.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {opportunities.map((opp) => (
            <Link
              key={opp.id}
              href={`/opportunities/${opp.id}`}
              className={`block rounded-2xl border p-4 transition hover:shadow-md ${
                isDark ? "border-slate-700 hover:border-slate-600" : "border-slate-100 hover:border-slate-200"
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`shrink-0 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {opp.category}
                    </span>
                    <p className={`min-w-0 truncate font-semibold ${isDark ? "text-slate-50" : "text-slate-900"}`}>
                      {opp.title}
                    </p>
                  </div>
                  <p className={`mt-0.5 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {opp.organization} • {opp.category}
                  </p>
                </div>
                <span className={`text-xs sm:whitespace-nowrap ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  {formatDate(opp.postedDate)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
