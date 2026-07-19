import type { Opportunity } from "@/utils/mockData";
import OpportunityCard from "@/components/opportunitiesPage/OpportunityCard";
import allOpportunities from "@/utils/mockData";

export default function FeaturedOppSection() {
  const featuredOpportunities = allOpportunities.filter(
    (opportunity) => opportunity.featured === true,
  );

  return (
    <section
      className="flex flex-col w-full bg-white dark:bg-slate-950
         py-12 px-6 md:px-12"
    >
      <h1
        className="font-bold text-3xl text-slate-900
         dark:text-slate-50 sm:text-4xl my-5 text-center"
      >
        Featured Opportunities
      </h1>
      <div
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2
            xl:grid-cols-3 md:gap-12 md:mt-20 md:mb-20"
      >
        {featuredOpportunities
          .map((opportunity: Opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))
          .slice(0, 3)}
      </div>
    </section>
  );
}
