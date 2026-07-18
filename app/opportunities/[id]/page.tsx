"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useOpportunityContext } from "@/context/OpportunityContext";
import { useTheme } from "@/context/ThemeContext";

function DetailRow({ label, value }: { label: string; value: string }) {
  const { isDark } = useTheme();
  return (
    <div
      className={`rounded-lg p-4 ${isDark ? "bg-slate-900/70" : "bg-slate-50"}`}
    >
      <p
        className={`text-sm font-medium ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-1 text-sm ${
          isDark ? "text-slate-200" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function OpportunityDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { opportunities, deleteOpportunity, toggleSavedOpportunity, isSaved } =
    useOpportunityContext();
  const { isDark } = useTheme();
  const [feedback, setFeedback] = useState("");

  const opportunity = useMemo(() => {
    return opportunities.find((item) => item.id === params.id);
  }, [opportunities, params.id]);

  const saved = opportunity ? isSaved(opportunity.id) : false;

  const handleDelete = () => {
    if (!opportunity) return;
    deleteOpportunity(opportunity.id);
    router.push("/opportunities");
  };

  const handleSaveToggle = () => {
    if (!opportunity) return;
    toggleSavedOpportunity(opportunity);
    setFeedback(
      saved ? "Removed from saved opportunities." : "Saved to your bookmarks.",
    );
  };

  if (!opportunity) {
    return (
      <main
        className={`min-h-screen px-4 py-12 sm:px-6 lg:py-16 ${
          isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
        }`}
      >
        <div
          className={`mx-auto max-w-4xl rounded-2xl border p-6 text-center shadow-sm ${
            isDark
              ? "border-slate-700 bg-slate-900/70"
              : "border-slate-200 bg-white"
          }`}
        >
          <h1 className="text-2xl font-semibold">Opportunity not found</h1>
          <p
            className={`mt-3 text-sm ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            The selected opportunity could not be located.
          </p>
          <Link
            href="/opportunities"
            className={`mt-6 inline-flex rounded-lg px-4 py-2 text-sm font-medium transition ${
              isDark
                ? "bg-emerald-600 text-white hover:bg-emerald-500"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            View all opportunities
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen px-4 py-12 sm:px-6 lg:py-16 ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div
        className={`mx-auto max-w-4xl rounded-2xl border p-6 sm:p-8 shadow-sm ${
          isDark
            ? "border-slate-700 bg-slate-900/70"
            : "border-slate-200 bg-white"
        }`}
      >
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
          <h1 className="mt-2 text-3xl font-bold">{opportunity.title}</h1>
          <p
            className={`mt-3 text-lg ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Organization: {opportunity.organization}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSaveToggle}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isDark
                  ? "bg-emerald-600 text-white hover:bg-emerald-500"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {saved ? "Remove Save" : "Save Opportunity"}
            </button>

            <button
              type="button"
              onClick={() =>
                router.push(`/opportunities/${opportunity.id}/edit`)
              }
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isDark
                  ? "border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isDark
                  ? "border-rose-500 bg-slate-800 text-rose-400 hover:bg-slate-700"
                  : "border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
              }`}
            >
              Delete
            </button>
          </div>
          {feedback ? (
            <p className="mt-2 text-sm text-emerald-700">{feedback}</p>
          ) : null}
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

        <div
          className={`mt-8 rounded-xl border p-6 ${
            isDark
              ? "border-slate-700 bg-slate-900/70"
              : "border-slate-200 bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold">Description</h2>
          <p
            className={`mt-3 text-sm leading-7 ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            {opportunity.description}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div
            className={`rounded-xl border p-6 ${
              isDark
                ? "border-slate-700 bg-slate-900/70"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold">Requirements</h2>
            <ul
              className={`mt-4 list-disc space-y-2 pl-5 text-sm ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {opportunity.requirements.map((requirement: string) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div
            className={`rounded-xl border p-6 ${
              isDark
                ? "border-slate-700 bg-slate-900/70"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold">Tags</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {opportunity.tags.map((tag: string) => (
                <span
                  key={tag}
                  className={`rounded-full px-3 py-1 text-sm ${
                    isDark
                      ? "bg-emerald-900 text-emerald-300"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
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
