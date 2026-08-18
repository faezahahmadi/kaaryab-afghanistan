"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLORS } from "@/utils/Constants";
import { useTheme } from "@/context/ThemeContext";
import type { ChartDatum } from "@/utils/dashboardStats";

type TypeBarChartProps = {
  data: ChartDatum[];
};

export default function TypeBarChart({ data }: TypeBarChartProps) {
  const { isDark } = useTheme();

  return (
    <div className="mt-4 h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 40, bottom: 5 }}>
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
