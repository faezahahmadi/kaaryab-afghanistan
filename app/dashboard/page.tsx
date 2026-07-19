"use client";
import { Pin } from "lucide-react";
import {
  Briefcase,
  GraduationCap,
  RefreshCw,
  BookOpen,
  TrendingUp,
  Handshake,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import allOpportunities from "@/utils/mockData";
import { useOpportunityContext } from "@/context/OpportunityContext";
import type { Opportunity } from "@/utils/mockData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Link from "next/link";

const CATEGORY_COLORS: Record<string, string> = {
  Job: "#10b981",
  Scholarship: "#3b82f6",
  Internship: "#8b5cf6",
  "Online Course": "#f59e0b",
  "Training Program": "#ec4899",
  "Volunteer Work": "#14b8a6",
};
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Job: Briefcase,
  Scholarship: GraduationCap,
  Internship: RefreshCw,
  "Online Course": BookOpen,
  "Training Program": TrendingUp,
  "Volunteer Work": Handshake,
};
const CHART_COLORS = [
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#14b8a6",
];

export default function Dashboard() {
  const { isDark } = useTheme();
  const { opportunities: allOpportunities } = useOpportunityContext();
  // Compute real-time stats from the data
  const stats = (() => {
    const total = allOpportunities.length;
    const byCategory: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byWorkMode: Record<string, number> = {};
    const featured = allOpportunities.filter((o) => o.featured).length;

    allOpportunities.forEach((opp) => {
      byCategory[opp.category] = (byCategory[opp.category] || 0) + 1;
      byType[opp.type] = (byType[opp.type] || 0) + 1;
      byWorkMode[opp.workMode] = (byWorkMode[opp.workMode] || 0) + 1;
    });

    // Expiring soon: sorted by deadline, take first 5
    const now = new Date();
    const expiringSoon = [...allOpportunities]
      .filter((o) => new Date(o.deadline) > now)
      .sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
      )
      .slice(0, 5);

    // Recent submissions: sorted by postedDate, take first 5
    const recent = [...allOpportunities]
      .sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
      )
      .slice(0, 5);

    return {
      total,
      byCategory,
      byType,
      byWorkMode,
      featured,
      expiringSoon,
      recent,
    };
  })();

  // Prepare data for charts
  const categoryChartData = Object.entries(stats.byCategory).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  const typeChartData = Object.entries(stats.byType).map(([name, value]) => ({
    name,
    value,
  }));

  // Summary cards data
  const summaryCards = [
    {
      label: "Total Opportunities",
      value: stats.total,
      icon: () => <Briefcase className="w-6 h-6" />, // example
      accent: "from-emerald-500 to-emerald-700",
    },
    // ...
    ...Object.entries(stats.byCategory).map(([category, count]) => {
      const Icon = CATEGORY_ICONS[category] || Pin;
      return {
        label: category,
        value: count,
        icon: () => <Icon className="w-6 h-6" />,
        accent: `from-${CATEGORY_COLORS[category] || "slate-500"} to-${CATEGORY_COLORS[category] || "slate-700"}`,
      };
    }),
  ];
  // Helper to format date
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntil = (dateStr: string) => {
    const now = new Date();
    const target = new Date(dateStr);
    const diff = target.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const isExpiringSoon = (dateStr: string) => {
    const days = getDaysUntil(dateStr);
    return days > 0 && days <= 14;
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header
          className={`rounded-[28px] border p-6 shadow-sm ${
            isDark
              ? "border-slate-800 bg-slate-900/80"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Analytics overview
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Opportunity Dashboard
              </h1>
              <p
                className={`mt-3 max-w-2xl text-sm sm:text-base ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Track your opportunity catalog, monitor deadlines, and gain
                insights from real-time data.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  isDark
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {stats.total} total
              </span>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <article
              key={card.label}
              className={`rounded-3xl border p-5 shadow-sm transition hover:shadow-md ${
                isDark
                  ? "border-slate-800 bg-slate-900/70"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl text-emerald-800">{card.icon()}</span>
                <div
                  className={`h-2 w-16 rounded-full bg-linear-to-r ${card.accent}`}
                />
              </div>
              <p
                className={`mt-4 text-3xl font-bold ${
                  isDark ? "text-slate-50" : "text-slate-900"
                }`}
              >
                {card.value}
              </p>
              <p
                className={`mt-1 text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {card.label}
              </p>
            </article>
          ))}
        </section>

        {/* Charts Section */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Pie Chart - Category Distribution */}
          <article
            className={`rounded-[28px] border p-6 shadow-sm ${
              isDark
                ? "border-slate-800 bg-slate-900/70"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Distribution
                </p>
                <h2 className="mt-1 text-xl font-semibold">By Category</h2>
              </div>
            </div>
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent = 0 }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={{ stroke: isDark ? "#475569" : "#94a3b8" }}
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                        stroke={isDark ? "#1e293b" : "#f8fafc"}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1e293b" : "#ffffff",
                      borderColor: isDark ? "#334155" : "#e2e8f0",
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      borderRadius: "12px",
                      padding: "8px 12px",
                    }}
                    formatter={(value) => [`${value} opportunities`, "Count"]}
                  />
                  <Legend
                    wrapperStyle={{
                      color: isDark ? "#94a3b8" : "#475569",
                      fontSize: "12px",
                      verticalAlign: "bottom",
                      paddingTop: "25px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>

          {/* Bar Chart - Opportunities by Type */}
          <article
            className={`rounded-[28px] border p-6 shadow-sm ${
              isDark
                ? "border-slate-800 bg-slate-900/70"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Breakdown
                </p>
                <h2 className="mt-1 text-xl font-semibold">By Type</h2>
              </div>
            </div>
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={typeChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 10, left: 40, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? "#334155" : "#e2e8f0"}
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    stroke={isDark ? "#64748b" : "#94a3b8"}
                    tick={{ fill: isDark ? "#94a3b8" : "#475569" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke={isDark ? "#64748b" : "#94a3b8"}
                    tick={{ fill: isDark ? "#94a3b8" : "#475569" }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1e293b" : "#ffffff",
                      borderColor: isDark ? "#334155" : "#e2e8f0",
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      borderRadius: "12px",
                      padding: "8px 12px",
                    }}
                    formatter={(value) => [`${value} opportunities`, "Count"]}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
                    {typeChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        {/* Expiring Soon & Recent Submissions */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Expiring Soon */}
          <article
            className={`rounded-[28px] border p-6 shadow-sm ${
              isDark
                ? "border-slate-800 bg-slate-900/70"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Deadlines
                </p>
                <h2 className="mt-1 text-xl font-semibold">Expiring Soon</h2>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isDark
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {stats.expiringSoon.length} expiring
              </span>
            </div>

            {stats.expiringSoon.length === 0 ? (
              <div
                className={`mt-6 rounded-2xl border border-dashed p-8 text-center ${
                  isDark
                    ? "border-slate-700 text-slate-300"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <p className="text-lg font-semibold">All caught up! 🎉</p>
                <p className="mt-2 text-sm">
                  No opportunities are expiring soon.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {stats.expiringSoon.map((opp) => {
                  const days = getDaysUntil(opp.deadline);
                  const isUrgent = days <= 7;
                  return (
                    <Link
                      key={opp.id}
                      href={`/opportunities/${opp.id}`}
                      className={`block rounded-2xl border p-4 transition hover:shadow-md ${
                        isDark
                          ? "border-slate-700 hover:border-slate-600"
                          : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate font-semibold ${isDark ? "text-slate-50" : "text-slate-900"}`}
                          >
                            {opp.title}
                          </p>
                          <p
                            className={`mt-0.5 text-sm
                               ${isDark ? "text-slate-400" : "text-slate-500"}`}
                          >
                            {opp.organization}
                          </p>
                        </div>
                        <div
                          className="flex items-center justify-between gap-2 sm:flex-col 
                            sm:items-end sm:gap-1"
                        >
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
                          <div
                            className={`flex flex-col items-end gap-1 text-xs
                            ${isDark ? "text-slate-500" : "text-slate-400"}`}
                          >
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

          {/* Recent Submissions */}
          <article
            className={`rounded-[28px] border p-6 shadow-sm ${
              isDark
                ? "border-slate-800 bg-slate-900/70"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Latest
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  Recent Submissions
                </h2>
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

            {stats.recent.length === 0 ? (
              <div
                className={`mt-6 rounded-2xl border border-dashed p-8 text-center ${
                  isDark
                    ? "border-slate-700 text-slate-300"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <p className="text-lg font-semibold">No submissions yet</p>
                <p className="mt-2 text-sm">
                  Opportunities will appear here as they are added.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {stats.recent.map((opp) => (
                  <Link
                    key={opp.id}
                    href={`/opportunities/${opp.id}`}
                    className={`block rounded-2xl border p-4 transition hover:shadow-md ${
                      isDark
                        ? "border-slate-700 hover:border-slate-600"
                        : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`shrink-0 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                          >
                            {opp.category}
                          </span>
                          <p
                            className={`min-w-0 truncate font-semibold ${isDark ? "text-slate-50" : "text-slate-900"}`}
                          >
                            {opp.title}
                          </p>
                        </div>
                        <p
                          className={`mt-0.5 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                        >
                          {opp.organization} • {opp.category}
                        </p>
                      </div>
                      <span
                        className={`text-xs sm:whitespace-nowrap ${isDark ? "text-slate-500" : "text-slate-400"}`}
                      >
                        {formatDate(opp.postedDate)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </article>
        </section>

        {/* Footer: Quick stats */}
        <footer
          className={`mt-6 rounded-[28px] border p-4 text-center text-sm ${
            isDark
              ? "border-slate-800 bg-slate-900/50 text-slate-400"
              : "border-slate-200 bg-white text-slate-500"
          }`}
        >
          <span>
            📊 {stats.total} total opportunities across{" "}
            {Object.keys(stats.byCategory).length} categories •{stats.featured}{" "}
            featured • {stats.expiringSoon.length} expiring soon
          </span>
        </footer>
      </div>
    </main>
  );
}
