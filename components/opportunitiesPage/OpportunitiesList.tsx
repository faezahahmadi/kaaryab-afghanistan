"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import OpportunityCard from "./OpportunityCard";
import type { Opportunity } from "@/utils/mockData";
import { useOpportunityContext } from "@/context/OpportunityContext";

const PAGE_SIZE = 9;

export default function OpportunitiesList() {
  const searchParams = useSearchParams();
  const { opportunities } = useOpportunityContext();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [deadlineFilter, setDeadlineFilter] = useState("All");
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const locations = useMemo(() => {
    const set = new Set<string>(opportunities.map((o) => o.location));
    return ["All Locations", ...Array.from(set)];
  }, [opportunities]);

  const categories = useMemo(() => {
    const set = new Set<string>(opportunities.map((o) => o.category));
    return ["All", ...Array.from(set)];
  }, [opportunities]);

  useEffect(() => {
    const paramCategory = searchParams.get("category");
    const validCategory =
      paramCategory && categories.includes(paramCategory)
        ? paramCategory
        : null;
    setCategory(validCategory);
    setPage(1);
  }, [categories, searchParams]);

  const filtered = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return opportunities.filter((o: Opportunity) => {
      if (query && !o.title.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (location !== "All Locations" && o.location !== location) return false;
      if (category && o.category !== category) return false;

      if (deadlineFilter === "Next7") {
        const deadlineDate = new Date(`${o.deadline}T00:00:00`);
        const diffDays = Math.round(
          (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (diffDays < 0 || diffDays > 7) return false;
      } else if (deadlineFilter === "Next30") {
        const deadlineDate = new Date(`${o.deadline}T00:00:00`);
        const diffDays = Math.round(
          (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (diffDays < 0 || diffDays > 30) return false;
      } else if (deadlineFilter === "Past") {
        const deadlineDate = new Date(`${o.deadline}T00:00:00`);
        if (deadlineDate >= today) return false;
      }

      return true;
    });
  }, [opportunities, query, location, deadlineFilter, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const currentPageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  function goToPage(n: number) {
    setPage(Math.min(Math.max(1, n), totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearAllFilters() {
    setQuery("");
    setLocation("All Locations");
    setDeadlineFilter("All");
    setCategory(null);
    setPage(1);
  }

  return (
    <div>
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search by title..."
          className="col-span-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder-slate-500"
        />

        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={deadlineFilter}
          onChange={(e) => {
            setDeadlineFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <option value="All">All deadlines</option>
          <option value="Next7">Next 7 days</option>
          <option value="Next30">Next 30 days</option>
          <option value="Past">Past</option>
        </select>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat === "All" ? null : cat);
              setPage(1);
            }}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition ${
              (category === null && cat === "All") || category === cat
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            <SearchX className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
            No opportunities found
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Try adjusting your search term, category, location, or deadline
            filter.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {currentPageData.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Prev
            </button>

            <div className="flex max-w-[65vw] items-center gap-1.5 overflow-x-auto py-1 sm:max-w-none sm:gap-2 [scrollbar-none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    onClick={() => goToPage(n)}
                    className={`h-8 w-8 shrink-0 rounded-full text-sm ${
                      n === page
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
