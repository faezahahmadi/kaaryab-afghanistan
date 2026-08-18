"use client";

import OpportunityCard from "./OpportunityCard";
import type { Opportunity } from "@/utils/mockData";

type OpportunityGridProps = {
  opportunities: Opportunity[];
};

export default function OpportunityGrid({ opportunities }: OpportunityGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {opportunities.map((o) => (
        <OpportunityCard key={o.id} opportunity={o} />
      ))}
    </div>
  );
}
