"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useOpportunityContext } from "@/context/OpportunityContext";
import ConfirmModal from "@/components/opportunitiesPage/ConfirmModal";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/60">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm text-slate-800 dark:text-slate-100">{value}</p>
    </div>
  );
}

export default function OpportunityDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { opportunities, deleteOpportunity, toggleSavedOpportunity, isSaved } =
    useOpportunityContext();
  const [feedback, setFeedback] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const opportunity = useMemo(
    () => opportunities.find((item) => item.id === params.id),
    [opportunities, params.id],
  );
  const saved = opportunity ? isSaved(opportunity.id) : false;

  // Called only when the user taps "Delete" inside the modal
  const confirmDelete = () => {
    if (!opportunity) return;
    deleteOpportunity(opportunity.id);
    setShowDeleteConfirm(false);
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
      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Opportunity not found
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            The selected opportunity could not be located.
          </p>
          <Link
            href="/opportunities"
            className="mt-6 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            View all opportunities
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
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
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">
            {opportunity.title}
          </h1>
          <p className="mt-3 text-lg text-slate-700 dark:text-slate-300">
            Organization: {opportunity.organization}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSaveToggle}
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              {saved ? "Remove Save" : "Save Opportunity"}
            </button>

            <button
              type="button"
              onClick={() =>
                router.push(`/opportunities/${opportunity.id}/edit`)
              }
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Edit
            </button>

            {/* Delete no longer deletes directly — it only opens the modal */}
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-900 dark:bg-slate-800 dark:text-rose-400 dark:hover:bg-rose-950/40"
            >
              Delete
            </button>
          </div>

          {feedback ? (
            <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
              {feedback}
            </p>
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

        <div className="mt-8 rounded-xl border border-slate-200 p-6 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Description
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            {opportunity.description}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              Requirements
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
              {opportunity.requirements.map((requirement: string) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              Tags
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {opportunity.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
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

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete this opportunity?"
        message={`"${opportunity.title}" will be permanently removed from the catalog and from anyone's saved list. This can't be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </main>
  );
}
