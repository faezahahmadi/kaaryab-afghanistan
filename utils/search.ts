import type { Opportunity, WorkMode } from "./mockData";

export type DeadlineFilter = "All" | "Next7" | "Next30" | "Past";

export type OpportunityFilters = {
  query: string;
  location: string;
  deadlineFilter: DeadlineFilter;
  category: string | null;
  workMode: string | null;
};

export const DEFAULT_FILTERS: OpportunityFilters = {
  query: "",
  location: "All Locations",
  deadlineFilter: "All",
  category: null,
  workMode: null,
};

export type SearchSuggestion = {
  id: string;
  title: string;
  organization: string;
  category: string;
};

/**
 * Returns the (inclusive) day difference between a deadline string and a
 * reference date, ignoring time-of-day.
 */
export function daysUntil(dateStr: string, referenceDate: Date = new Date()): number {
  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );
  const deadlineDate = new Date(`${dateStr}T00:00:00`);
  return Math.round((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function matchesQuery(opportunity: Opportunity, query: string): boolean {
  if (!query.trim()) return true;
  const needle = query.trim().toLowerCase();
  return (
    opportunity.title.toLowerCase().includes(needle) ||
    opportunity.organization.toLowerCase().includes(needle) ||
    opportunity.tags.some((tag) => tag.toLowerCase().includes(needle))
  );
}

function matchesDeadline(
  opportunity: Opportunity,
  deadlineFilter: DeadlineFilter,
  referenceDate: Date,
): boolean {
  if (deadlineFilter === "All") return true;
  const diffDays = daysUntil(opportunity.deadline, referenceDate);

  if (deadlineFilter === "Next7") return diffDays >= 0 && diffDays <= 7;
  if (deadlineFilter === "Next30") return diffDays >= 0 && diffDays <= 30;
  if (deadlineFilter === "Past") return diffDays < 0;
  return true;
}

/**
 * Filters opportunities by search query, location, category, work mode, and
 * deadline window. Pure function so it can be unit tested and reused by any
 * component (search bar suggestions, the main list, etc).
 */
export function filterOpportunities(
  opportunities: Opportunity[],
  filters: OpportunityFilters,
  referenceDate: Date = new Date(),
): Opportunity[] {
  return opportunities.filter((o) => {
    if (!matchesQuery(o, filters.query)) return false;
    if (filters.location !== "All Locations" && o.location !== filters.location) return false;
    if (filters.category && o.category !== filters.category) return false;
    if (filters.workMode && o.workMode !== (filters.workMode as WorkMode)) return false;
    if (!matchesDeadline(o, filters.deadlineFilter, referenceDate)) return false;
    return true;
  });
}

export function getUniqueLocations(opportunities: Opportunity[]): string[] {
  const set = new Set<string>(opportunities.map((o) => o.location));
  return ["All Locations", ...Array.from(set).sort()];
}

export function getUniqueCategories(opportunities: Opportunity[]): string[] {
  const set = new Set<string>(opportunities.map((o) => o.category));
  return ["All", ...Array.from(set).sort()];
}

export function getUniqueWorkModes(opportunities: Opportunity[]): WorkMode[] {
  const set = new Set<WorkMode>(opportunities.map((o) => o.workMode));
  return Array.from(set).sort();
}

/**
 * Ranked, de-duplicated suggestions for the search box: title matches first,
 * then organization matches, then tag matches, capped at `limit`.
 */
export function getSearchSuggestions(
  opportunities: Opportunity[],
  query: string,
  limit = 6,
): SearchSuggestion[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const seen = new Set<string>();
  const results: SearchSuggestion[] = [];

  const tryAdd = (o: Opportunity) => {
    if (seen.has(o.id) || results.length >= limit) return;
    seen.add(o.id);
    results.push({
      id: o.id,
      title: o.title,
      organization: o.organization,
      category: o.category,
    });
  };

  opportunities
    .filter((o) => o.title.toLowerCase().startsWith(needle))
    .forEach(tryAdd);
  opportunities
    .filter((o) => o.title.toLowerCase().includes(needle))
    .forEach(tryAdd);
  opportunities
    .filter((o) => o.organization.toLowerCase().includes(needle))
    .forEach(tryAdd);
  opportunities
    .filter((o) => o.tags.some((tag) => tag.toLowerCase().includes(needle)))
    .forEach(tryAdd);

  return results.slice(0, limit);
}
