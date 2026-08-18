import type { Opportunity } from "./mockData";

export type DashboardStats = {
  total: number;
  byCategory: Record<string, number>;
  byType: Record<string, number>;
  byWorkMode: Record<string, number>;
  featured: number;
  expiringSoon: Opportunity[];
  recent: Opportunity[];
};

export type ChartDatum = { name: string; value: number };

/**
 * Computes every stat the dashboard displays from a flat opportunity list.
 * Pure and framework-free so it can be unit tested directly.
 */
export function computeDashboardStats(
  opportunities: Opportunity[],
  referenceDate: Date = new Date(),
): DashboardStats {
  const byCategory: Record<string, number> = {};
  const byType: Record<string, number> = {};
  const byWorkMode: Record<string, number> = {};

  opportunities.forEach((opp) => {
    byCategory[opp.category] = (byCategory[opp.category] || 0) + 1;
    byType[opp.type] = (byType[opp.type] || 0) + 1;
    byWorkMode[opp.workMode] = (byWorkMode[opp.workMode] || 0) + 1;
  });

  const expiringSoon = [...opportunities]
    .filter((o) => new Date(o.deadline) > referenceDate)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  const recent = [...opportunities]
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, 5);

  return {
    total: opportunities.length,
    byCategory,
    byType,
    byWorkMode,
    featured: opportunities.filter((o) => o.featured).length,
    expiringSoon,
    recent,
  };
}

export function toChartData(counts: Record<string, number>): ChartDatum[] {
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function getDaysUntil(dateStr: string, referenceDate: Date = new Date()): number {
  const diff = new Date(dateStr).getTime() - referenceDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isExpiringSoon(dateStr: string, referenceDate: Date = new Date()): boolean {
  const days = getDaysUntil(dateStr, referenceDate);
  return days > 0 && days <= 14;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
