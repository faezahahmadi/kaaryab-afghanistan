import Link from "next/link";
import { notFound } from "next/navigation";
import { findOpportunityById } from "@/utils/mockData";

type OpportunityDetailPageProps = {
  params: Promise<{ id: string }>;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-800">{value}</p>
    </div>
  );
}

export default async function OpportunityDetailPage({
  params,
}: OpportunityDetailPageProps) {
  const { id } = await params;
  const opportunity = findOpportunityById(id);

  if (!opportunity) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link
          href="/opportunities"
          className="text-sm font-medium text-emerald-600 hover:underline"
        >
          ← Back to opportunities
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            {opportunity.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {opportunity.title}
          </h1>
          <p className="mt-3 text-lg text-slate-700">
            Organization: {opportunity.organization}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <DetailRow label="Deadline" value={opportunity.deadline} />
          <DetailRow label="Type" value={opportunity.type} />
          <DetailRow label="Location" value={opportunity.location} />
          <DetailRow label="Work Mode" value={opportunity.workMode} />
          <DetailRow label="Posted Date" value={opportunity.postedDate} />
          <DetailRow
            label="Featured"
            value={opportunity.featured ? "Yes" : "No"}
          />
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Description</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            {opportunity.description}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Requirements
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {opportunity.requirements.map((requirement: string) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Tags</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {opportunity.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={opportunity.applyLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
