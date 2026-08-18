"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "karyaab-recent-searches";
const MAX_RECENT = 5;

function readStored(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Tracks the person's most recent (non-empty) search queries, most recent
 * first, capped at MAX_RECENT and de-duplicated.
 */
export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setRecentSearches(readStored());
  }, []);

  const addRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const next = [trimmed, ...prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(
        0,
        MAX_RECENT,
      );
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { recentSearches, addRecentSearch, clearRecentSearches };
}
