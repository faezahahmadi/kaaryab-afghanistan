"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Clock, Search, SearchX, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { getSearchSuggestions, type SearchSuggestion } from "@/utils/search";
import { useTheme } from "@/context/ThemeContext";
import type { Opportunity } from "@/utils/mockData";

type SearchBarProps = {
  opportunities: Opportunity[];
  onQueryChange: (query: string) => void;
};

type ListItem =
  | { kind: "suggestion"; suggestion: SearchSuggestion }
  | { kind: "recent"; query: string };

export default function SearchBar({ opportunities, onQueryChange }: SearchBarProps) {
  const router = useRouter();
  const { isDark } = useTheme();
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches();

  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const debouncedValue = useDebounce(inputValue, 300);

  // Push the debounced value up to the parent, which drives the actual
  // filtering of the opportunity grid.
  useEffect(() => {
    onQueryChange(debouncedValue);
  }, [debouncedValue, onQueryChange]);

  const suggestions = useMemo(
    () => getSearchSuggestions(opportunities, debouncedValue),
    [opportunities, debouncedValue],
  );

  const hasQuery = inputValue.trim().length > 0;
  const showSuggestions = isFocused && hasQuery;
  const showRecent = isFocused && !hasQuery && recentSearches.length > 0;
  const dropdownOpen = showSuggestions || showRecent;

  const listItems: ListItem[] = showSuggestions
    ? suggestions.map((suggestion) => ({ kind: "suggestion", suggestion }))
    : showRecent
      ? recentSearches.map((query) => ({ kind: "recent", query }))
      : [];

  // Close the dropdown when clicking outside of it.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function commitQuery(query: string) {
    setInputValue(query);
    onQueryChange(query);
    if (query.trim()) addRecentSearch(query.trim());
    setIsFocused(false);
    setActiveIndex(-1);
  }

  function selectItem(item: ListItem) {
    if (item.kind === "recent") {
      commitQuery(item.query);
      return;
    }
    addRecentSearch(item.suggestion.title);
    setIsFocused(false);
    setActiveIndex(-1);
    router.push(`/opportunities/${item.suggestion.id}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!dropdownOpen && event.key !== "Enter") return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!dropdownOpen) return;
      setActiveIndex((prev) => (prev + 1) % Math.max(listItems.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!dropdownOpen) return;
      setActiveIndex((prev) => (prev <= 0 ? listItems.length - 1 : prev - 1));
    } else if (event.key === "Enter") {
      if (dropdownOpen && activeIndex >= 0 && listItems[activeIndex]) {
        event.preventDefault();
        selectItem(listItems[activeIndex]);
      } else if (hasQuery) {
        commitQuery(inputValue);
      }
    } else if (event.key === "Escape") {
      setIsFocused(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-center gap-2 rounded-lg border px-3 shadow-sm ${
          isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        <Search
          className={`h-4 w-4 shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}`}
        />
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search by title, organization, or tag..."
          role="combobox"
          aria-expanded={dropdownOpen}
          aria-autocomplete="list"
          className={`w-full bg-transparent py-2 text-sm outline-none placeholder-slate-400 ${
            isDark ? "text-slate-200" : "text-slate-900"
          }`}
        />
        {inputValue && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => commitQuery("")}
            className={`shrink-0 rounded-full p-1 ${
              isDark ? "text-slate-500 hover:bg-slate-800" : "text-slate-400 hover:bg-slate-100"
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {dropdownOpen && (
        <div
          className={`absolute z-20 mt-2 w-full overflow-hidden rounded-lg border shadow-lg ${
            isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
          }`}
        >
          {showRecent && (
            <div className="flex items-center justify-between px-3 pt-2">
              <span
                className={`text-xs font-semibold uppercase tracking-wide ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Recent searches
              </span>
              <button
                type="button"
                onClick={clearRecentSearches}
                className={`text-xs ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
              >
                Clear
              </button>
            </div>
          )}

          {showSuggestions && suggestions.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
              <SearchX className={`h-5 w-5 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
              <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                No matching opportunities
              </p>
            </div>
          ) : (
            <ul role="listbox" className="max-h-72 overflow-y-auto py-1">
              {listItems.map((item, index) => {
                const isActive = index === activeIndex;
                const key =
                  item.kind === "suggestion" ? `s-${item.suggestion.id}` : `r-${item.query}`;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectItem(item)}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                        isActive
                          ? isDark
                            ? "bg-slate-800"
                            : "bg-slate-100"
                          : ""
                      } ${isDark ? "text-slate-200" : "text-slate-800"}`}
                    >
                      {item.kind === "recent" ? (
                        <>
                          <Clock className={`h-4 w-4 shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                          <span className="truncate">{item.query}</span>
                        </>
                      ) : (
                        <div className="min-w-0">
                          <p className="truncate font-medium">{item.suggestion.title}</p>
                          <p
                            className={`truncate text-xs ${
                              isDark ? "text-slate-500" : "text-slate-500"
                            }`}
                          >
                            {item.suggestion.organization} • {item.suggestion.category}
                          </p>
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
