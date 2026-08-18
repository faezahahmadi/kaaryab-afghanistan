"use client";

import type { DeadlineFilter } from "@/utils/search";
import { useTheme } from "@/context/ThemeContext";

type FilterBarProps = {
  locations: string[];
  location: string;
  onLocationChange: (value: string) => void;
  deadlineFilter: DeadlineFilter;
  onDeadlineFilterChange: (value: DeadlineFilter) => void;
  workModes: string[];
  workMode: string | null;
  onWorkModeChange: (value: string | null) => void;
};

export default function FilterBar({
  locations,
  location,
  onLocationChange,
  deadlineFilter,
  onDeadlineFilterChange,
  workModes,
  workMode,
  onWorkModeChange,
}: FilterBarProps) {
  const { isDark } = useTheme();
  const selectClasses = `rounded-lg border px-4 py-2 shadow-sm ${
    isDark
      ? "border-slate-700 bg-slate-900 text-slate-200"
      : "border-slate-200 bg-white text-slate-900"
  }`;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <select
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        className={selectClasses}
        aria-label="Filter by location"
      >
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <select
        value={deadlineFilter}
        onChange={(e) => onDeadlineFilterChange(e.target.value as DeadlineFilter)}
        className={selectClasses}
        aria-label="Filter by deadline"
      >
        <option value="All">All deadlines</option>
        <option value="Next7">Next 7 days</option>
        <option value="Next30">Next 30 days</option>
        <option value="Past">Past</option>
      </select>

      <select
        value={workMode ?? "All"}
        onChange={(e) => onWorkModeChange(e.target.value === "All" ? null : e.target.value)}
        className={selectClasses}
        aria-label="Filter by work mode"
      >
        <option value="All">All work modes</option>
        {workModes.map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
    </div>
  );
}
