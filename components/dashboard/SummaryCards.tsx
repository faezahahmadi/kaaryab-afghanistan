"use client";

import { Briefcase, Pin } from "lucide-react";
import { CATEGORY_ICONS } from "@/utils/Constants";
import { useTheme } from "@/context/ThemeContext";
import type { DashboardStats } from "@/utils/dashboardStats";

type SummaryCardsProps = {
  stats: DashboardStats;
};

export default function SummaryCards({ stats }: SummaryCardsProps) {
  const { isDark } = useTheme();

  const summaryCards = [
    {
      label: "Total Opportunities",
      value: stats.total,
      icon: Briefcase,
    },
    ...Object.entries(stats.byCategory).map(([category, count]) => ({
      label: category,
      value: count,
      icon: CATEGORY_ICONS[category] || Pin,
    })),
  ];

  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {summaryCards.map((card) => {
        const Icon = card.icon;
        return (
          <article
            key={card.label}
            className={`rounded-3xl border p-5 shadow-sm transition hover:shadow-md ${
              isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl text-emerald-800">
                <Icon className="h-6 w-6" />
              </span>
              <div className="h-2 w-16 rounded-full bg-linear-to-r from-emerald-500 to-emerald-700" />
            </div>
            <p className={`mt-4 text-3xl font-bold ${isDark ? "text-slate-50" : "text-slate-900"}`}>
              {card.value}
            </p>
            <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {card.label}
            </p>
          </article>
        );
      })}
    </section>
  );
}
