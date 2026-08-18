"use client";

import { useTheme } from "@/context/ThemeContext";
import type { DashboardStats } from "@/utils/dashboardStats";

type DashboardFooterStatsProps = {
  stats: DashboardStats;
};

export default function DashboardFooterStats({ stats }: DashboardFooterStatsProps) {
  const { isDark } = useTheme();

  return (
    <footer
      className={`mt-6 rounded-[28px] border p-4 text-center text-sm ${
        isDark ? "border-slate-800 bg-slate-900/50 text-slate-400" : "border-slate-200 bg-white text-slate-500"
      }`}
    >
      <span>
        📊 {stats.total} total opportunities across {Object.keys(stats.byCategory).length}{" "}
        categories •{stats.featured} featured • {stats.expiringSoon.length} expiring soon
      </span>
    </footer>
  );
}
