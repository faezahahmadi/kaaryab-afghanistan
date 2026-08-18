"use client";

import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { allOpportunities, type Opportunity } from "@/utils/mockData";
import {
  deriveSavedOpportunities,
  extractSavedIds,
  toggleSavedId,
} from "@/utils/savedOpportunities";

const OPPORTUNITIES_KEY = "karyaab-opportunities";
const SAVED_IDS_KEY = "karyaab-saved-ids";
// Legacy key from before saved items were stored as ids. Kept only for a
// one-time migration on first load.
const LEGACY_SAVED_KEY = "karyaab-saved-opportunities";

type OpportunityContextValue = {
  opportunities: Opportunity[];
  savedOpportunities: Opportunity[];
  addOpportunity: (opportunity: Opportunity) => void;
  updateOpportunity: (opportunity: Opportunity) => void;
  toggleSavedOpportunity: (opportunity: Opportunity) => void;
  deleteOpportunity: (opportunityId: string) => void;
  isSaved: (opportunityId: string) => boolean;
};

const defaultContextValue: OpportunityContextValue = {
  opportunities: allOpportunities,
  savedOpportunities: [],
  addOpportunity: () => undefined,
  updateOpportunity: () => undefined,
  toggleSavedOpportunity: () => undefined,
  deleteOpportunity: () => undefined,
  isSaved: () => false,
};

export const OpportunityContext = createContext<OpportunityContextValue>(defaultContextValue);

export function OpportunityProvider({ children }: { children: ReactNode }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    if (typeof window === "undefined") {
      return allOpportunities;
    }

    try {
      const stored = window.localStorage.getItem(OPPORTUNITIES_KEY);
      if (!stored) {
        return allOpportunities;
      }

      const parsed = JSON.parse(stored) as Opportunity[];
      if (!Array.isArray(parsed)) {
        return allOpportunities;
      }

      return parsed;
    } catch {
      return allOpportunities;
    }
  });

  // Saved opportunities are stored as *ids only*. The full objects are always
  // derived from the live `opportunities` array below, so editing or
  // deleting an opportunity automatically stays in sync with anything saved
  // elsewhere instead of drifting out of sync with a stale snapshot.
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const stored = window.localStorage.getItem(SAVED_IDS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return extractSavedIds(parsed);
      }

      // One-time migration from the old "store the whole object" format.
      const legacy = window.localStorage.getItem(LEGACY_SAVED_KEY);
      if (legacy) {
        const parsedLegacy = JSON.parse(legacy);
        return extractSavedIds(parsedLegacy);
      }

      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(opportunities));
    }
  }, [opportunities]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SAVED_IDS_KEY, JSON.stringify(savedIds));
      window.localStorage.removeItem(LEGACY_SAVED_KEY);
    }
  }, [savedIds]);

  const savedOpportunities = useMemo(
    () => deriveSavedOpportunities(opportunities, savedIds),
    [opportunities, savedIds],
  );

  const addOpportunity = (opportunity: Opportunity) => {
    setOpportunities((prev) => [opportunity, ...prev]);
  };

  const updateOpportunity = (opportunity: Opportunity) => {
    setOpportunities((prev) =>
      prev.map((item) => (item.id === opportunity.id ? opportunity : item))
    );
  };

  const deleteOpportunity = (opportunityId: string) => {
    setOpportunities((prev) => prev.filter((item) => item.id !== opportunityId));
    setSavedIds((prev) => prev.filter((id) => id !== opportunityId));
  };

  const toggleSavedOpportunity = (opportunity: Opportunity) => {
    setSavedIds((prev) => toggleSavedId(prev, opportunity.id));
  };

  const isSaved = (opportunityId: string) => savedIds.includes(opportunityId);

  const value = useMemo(
    () => ({
      opportunities,
      savedOpportunities,
      addOpportunity,
      updateOpportunity,
      toggleSavedOpportunity,
      deleteOpportunity,
      isSaved,
    }),
    [opportunities, savedOpportunities, savedIds],
  );

  return createElement(OpportunityContext.Provider, { value }, children);
}

export function useOpportunityContext() {
  return useContext(OpportunityContext);
}
