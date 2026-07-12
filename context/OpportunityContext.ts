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
      const stored = window.localStorage.getItem("karyaab-opportunities");
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

  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const stored = window.localStorage.getItem("karyaab-saved-opportunities");
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored) as Opportunity[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("karyaab-opportunities", JSON.stringify(opportunities));
    }
  }, [opportunities]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "karyaab-saved-opportunities",
        JSON.stringify(savedOpportunities)
      );
    }
  }, [savedOpportunities]);

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
    setSavedOpportunities((prev) => prev.filter((item) => item.id !== opportunityId));
  };

  const toggleSavedOpportunity = (opportunity: Opportunity) => {
    setSavedOpportunities((prev) => {
      const exists = prev.some((item) => item.id === opportunity.id);
      return exists
        ? prev.filter((item) => item.id !== opportunity.id)
        : [opportunity, ...prev];
    });
  };

  const isSaved = (opportunityId: string) =>
    savedOpportunities.some((item) => item.id === opportunityId);

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
    [opportunities, savedOpportunities]
  );

  return createElement(OpportunityContext.Provider, { value }, children);
}

export function useOpportunityContext() {
  return useContext(OpportunityContext);
}
