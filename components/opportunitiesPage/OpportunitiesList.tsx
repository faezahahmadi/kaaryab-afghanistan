"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "./search/SearchBar";
import FilterBar from "./filters/FilterBar";
import CategoryPills from "./filters/CategoryPills";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";
import OpportunityGrid from "./OpportunityGrid";
import { useOpportunityContext } from "@/context/OpportunityContext";
import {
  DEFAULT_FILTERS,
  filterOpportunities,
  getUniqueCategories,
  getUniqueLocations,
  getUniqueWorkModes,
  type DeadlineFilter,
} from "@/utils/search";

const PAGE_SIZE = 9;

export default function OpportunitiesList() {
  const searchParams = useSearchParams();
  const { opportunities } = useOpportunityContext();

  const [query, setQuery] = useState(DEFAULT_FILTERS.query);
  const [location, setLocation] = useState(DEFAULT_FILTERS.location);
  const [deadlineFilter, setDeadlineFilter] = useState<DeadlineFilter>(DEFAULT_FILTERS.deadlineFilter);
  const [category, setCategory] = useState<string | null>(DEFAULT_FILTERS.category);
  const [workMode, setWorkMode] = useState<string | null>(DEFAULT_FILTERS.workMode);
  const [page, setPage] = useState(1);
  // Bumped on "Clear all filters" to force SearchBar to remount and drop its
  // own internal (uncontrolled) input text.
  const [searchResetKey, setSearchResetKey] = useState(0);

  const locations = useMemo(() => getUniqueLocations(opportunities), [opportunities]);
  const categories = useMemo(() => getUniqueCategories(opportunities), [opportunities]);
  const workModes = useMemo(() => getUniqueWorkModes(opportunities), [opportunities]);

  // Deep-link support: ?category=Job from the homepage's category browse cards.
  useEffect(() => {
    const paramCategory = searchParams.get("category");
    const validCategory =
      paramCategory && categories.includes(paramCategory) ? paramCategory : null;
    setCategory(validCategory);
    setPage(1);
  }, [categories, searchParams]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, []);

  const filtered = useMemo(
    () =>
      filterOpportunities(opportunities, {
        query,
        location,
        deadlineFilter,
        category,
        workMode,
      }),
    [opportunities, query, location, deadlineFilter, category, workMode],
  );

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
    setLocation(DEFAULT_FILTERS.location);
    setDeadlineFilter(DEFAULT_FILTERS.deadlineFilter);
    setCategory(null);
    setWorkMode(null);
    setPage(1);
    setSearchResetKey((prev) => prev + 1);
  }

  return (
    <div>
      <div className="mb-6 space-y-3">
        <SearchBar
          key={searchResetKey}
          opportunities={opportunities}
          onQueryChange={handleQueryChange}
        />
        <FilterBar
          locations={locations}
          location={location}
          onLocationChange={(value) => {
            setLocation(value);
            setPage(1);
          }}
          deadlineFilter={deadlineFilter}
          onDeadlineFilterChange={(value) => {
            setDeadlineFilter(value);
            setPage(1);
          }}
          workModes={workModes}
          workMode={workMode}
          onWorkModeChange={(value) => {
            setWorkMode(value);
            setPage(1);
          }}
        />
      </div>

      <div className="mb-4">
        <CategoryPills
          categories={categories}
          category={category}
          onCategoryChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState onClearFilters={clearAllFilters} />
      ) : (
        <>
          <OpportunityGrid opportunities={currentPageData} />
          <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}
    </div>
  );
}
