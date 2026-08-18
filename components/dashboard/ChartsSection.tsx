"use client";

import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";
import { useInView } from "@/hooks/useInView";
import type { ChartDatum } from "@/utils/dashboardStats";

// Dynamically imported so Recharts (and the chart components themselves) are
// split into their own bundle chunk instead of shipping in the initial page
// load. `ssr: false` avoids paying for chart rendering on the server too.
const CategoryPieChart = dynamic(() => import("./charts/CategoryPieChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

const TypeBarChart = dynamic(() => import("./charts/TypeBarChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

function ChartSkeleton() {
  const { isDark } = useTheme();
  return (
    <div
      className={`mt-4 h-64 w-full animate-pulse rounded-2xl ${
        isDark ? "bg-slate-800" : "bg-slate-100"
      }`}
    />
  );
}

type ChartsSectionProps = {
  categoryChartData: ChartDatum[];
  typeChartData: ChartDatum[];
};

export default function ChartsSection({ categoryChartData, typeChartData }: ChartsSectionProps) {
  const { isDark } = useTheme();
  // Only mount the (heavy) chart components once this section is actually
  // about to be scrolled into view, rather than on initial dashboard load.
  const { ref, isInView } = useInView<HTMLDivElement>();

  const cardClasses = `rounded-[28px] border p-6 shadow-sm ${
    isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
  }`;
  const labelClasses = `text-sm font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`;

  return (
    <section ref={ref} className="mt-6 grid gap-6 lg:grid-cols-2">
      <article className={cardClasses}>
        <p className={labelClasses}>Distribution</p>
        <h2 className="mt-1 text-xl font-semibold">By Category</h2>
        {isInView ? <CategoryPieChart data={categoryChartData} /> : <ChartSkeleton />}
      </article>

      <article className={cardClasses}>
        <p className={labelClasses}>Breakdown</p>
        <h2 className="mt-1 text-xl font-semibold">By Type</h2>
        {isInView ? <TypeBarChart data={typeChartData} /> : <ChartSkeleton />}
      </article>
    </section>
  );
}
