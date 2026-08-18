"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { formatDate, getDaysUntil } from "@/utils/dashboardStats";
import type { Opportunity } from "@/utils/mockData";

type ExpiringSoonListProps = {
  opportunities: Opportunity[];
};

export default function ExpiringSoonList({ opportunities }: ExpiringSoonListProps) {
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
            Deadlines
          </p>
          <h2 className="mt-1 text-xl font-semibold">Expiring Soon</h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isDark ? "bg-amber-500/20 text-amber-300" : "bg-amber-100 text-amber-700"
          }`}
        >
          {opportunities.length} expiring
        </span>
      </div>

      {opportunities.length === 0 ? (
        <div
          className={`mt-6 rounded-2xl border border-dashed p-8 text-center ${
            isDark ? "border-slate-700 text-slate-300" : "border-slate-200 text-slate-600"
          }`}
        >
          <p className="text-lg font-semibold">All caught up! 🎉</p>
          <p className="mt-2 text-sm">No opportunities are expiring soon.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {opportunities.map((opp) => {
            const days = getDaysUntil(opp.deadline);
            const isUrgent = days <= 7;
            return (
              <Link
                key={opp.id}
                href={`/opportunities/${opp.id}`}
                className={`block rounded-2xl border p-4 transition hover:shadow-md ${
                  isDark ? "border-slate-700 hover:border-slate-600" : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className={`truncate font-semibold ${isDark ? "text-slate-50" : "text-slate-900"}`}>
                      {opp.title}
                    </p>
                    <p className={`mt-0.5 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {opp.organization}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end sm:gap-1">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isUrgent
                          ? isDark
                            ? "bg-rose-500/20 text-rose-300"
                            : "bg-rose-100 text-rose-700"
                          : isDark
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {days} days
                    </span>
                    <div className={`flex flex-col items-end gap-1 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      {formatDate(opp.deadline)}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </article>
  );
}
