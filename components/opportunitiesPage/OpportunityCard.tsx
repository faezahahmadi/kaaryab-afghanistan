import Link from "next/link";
import type { Opportunity } from "@/utils/mockData";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            {opportunity.category}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            {opportunity.title}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Organization: {opportunity.organization}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Deadline: {opportunity.deadline}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Type: {opportunity.type}
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {opportunity.featured ? "Featured" : "Standard"}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/opportunities/${opportunity.id}`}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          View Details
        </Link>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Edit
        </button>
        <button
          type="button"
          className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
