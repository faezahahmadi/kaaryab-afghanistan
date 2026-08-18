"use client";

import { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useOpportunityContext } from "@/context/OpportunityContext";
import { computeDashboardStats, toChartData } from "@/utils/dashboardStats";
import Header from "@/components/dashboard/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import ChartsSection from "@/components/dashboard/ChartsSection";
import ExpiringSoonList from "@/components/dashboard/ExpiringSoonList";
import RecentSubmissionsList from "@/components/dashboard/RecentSubmissionsList";
import DashboardFooterStats from "@/components/dashboard/DashboardFooterStats";

export default function Dashboard() {
  const { isDark } = useTheme();
  const { opportunities } = useOpportunityContext();

  const stats = useMemo(() => computeDashboardStats(opportunities), [opportunities]);
  const categoryChartData = useMemo(() => toChartData(stats.byCategory), [stats.byCategory]);
  const typeChartData = useMemo(() => toChartData(stats.byType), [stats.byType]);

  return (
    <main
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Header statsTotal={stats.total} />

        <SummaryCards stats={stats} />

        <ChartsSection categoryChartData={categoryChartData} typeChartData={typeChartData} />

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <ExpiringSoonList opportunities={stats.expiringSoon} />
          <RecentSubmissionsList opportunities={stats.recent} />
        </section>

        <DashboardFooterStats stats={stats} />
      </div>
    </main>
  );
}
