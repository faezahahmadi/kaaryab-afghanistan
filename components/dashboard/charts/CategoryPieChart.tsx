"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS } from "@/utils/Constants";
import { useTheme } from "@/context/ThemeContext";
import type { ChartDatum } from "@/utils/dashboardStats";

type CategoryPieChartProps = {
  data: ChartDatum[];
};

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const { isDark } = useTheme();

  return (
    <div className="mt-4 h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={{ stroke: isDark ? "#475569" : "#94a3b8" }}
          >
            {data.map((entry, index) => (
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
  );
}
