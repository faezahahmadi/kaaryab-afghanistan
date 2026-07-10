"use client";

import { useMemo, useState } from "react";
import OpportunityCard from "./OpportunityCard";
import type { Opportunity } from "@/utils/mockData";
import { allOpportunities } from "@/utils/mockData";

const PAGE_SIZE = 9;

export default function OpportunitiesList() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [deadlineFilter, setDeadlineFilter] = useState("All");
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const locations = useMemo(() => {
    const set = new Set<string>(allOpportunities.map((o) => o.location));
    return ["All Locations", ...Array.from(set)];
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(allOpportunities.map((o) => o.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const now = new Date();

    return allOpportunities.filter((o: Opportunity) => {
      if (query && !o.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      if (location !== "All Locations" && o.location !== location) return false;

      if (category && o.category !== category) return false;

      if (deadlineFilter === "Next7") {
        const d = new Date(o.deadline);
        const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        if (diff < 0 || diff > 7) return false;
      } else if (deadlineFilter === "Next30") {
        const d = new Date(o.deadline);
        const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        if (diff < 0 || diff > 30) return false;
      } else if (deadlineFilter === "Past") {
        const d = new Date(o.deadline);
        if (d >= now) return false;
      }

      return true;
    });
  }, [query, location, deadlineFilter, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const currentPageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  function goToPage(n: number) {
    setPage(Math.min(Math.max(1, n), totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-1 md:grid-cols-3">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search by title..."
          className="col-span-1 rounded-lg border border-slate-200 px-4 py-2 shadow-sm"
        />

        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-slate-200 px-4 py-2 shadow-sm"
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
          className="rounded-lg border border-slate-200 px-4 py-2 shadow-sm"
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
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {currentPageData.map((o) => (
          <OpportunityCard key={o.id} opportunity={o} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="rounded-lg border border-slate-200 px-3 py-1 text-sm disabled:opacity-50"
        >
          Prev
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            return (
              <button
                key={n}
                onClick={() => goToPage(n)}
                className={`h-8 w-8 rounded-full text-sm ${
                  n === page
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-700"
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
          className="rounded-lg border border-slate-200 px-3 py-1 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
