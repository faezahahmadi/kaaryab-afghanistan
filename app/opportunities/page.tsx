import OpportunityCard from "@/components/opportunitiesPage/OpportunityCard";
import { allOpportunities } from "@/utils/mockData";

export default function Opportunities() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Opportunities</h1>
          <p className="mt-2 text-lg text-slate-600">
            Browse available opportunities and open the full details for each
            one.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </main>
  );
}
