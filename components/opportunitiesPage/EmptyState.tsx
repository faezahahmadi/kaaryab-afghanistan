"use client";

import { SearchX } from "lucide-react";

type EmptyStateProps = {
  onClearFilters: () => void;
};

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <SearchX className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        No opportunities found
      </h2>
      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
        Try adjusting your search term, category, location, work mode, or deadline filter.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Clear all filters
      </button>
    </div>
  );
}
