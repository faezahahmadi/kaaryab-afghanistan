"use client";

import { useEffect, useState } from "react";
import OpportunityCard from "@/components/opportunitiesPage/OpportunityCard";
import type { Opportunity } from "@/utils/mockData";

function getRandomThree(pool: Opportunity[]): Opportunity[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default function FeaturedOpportunities({
  featured,
}: {
  featured: Opportunity[];
}) {
  const [visible, setVisible] = useState<Opportunity[]>(() =>
    getRandomThree(featured),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(getRandomThree(featured));
    }, 40000);

    return () => clearInterval(interval);
  }, [featured]);

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-12 md:mt-20 md:mb-20">
      {visible.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
}
