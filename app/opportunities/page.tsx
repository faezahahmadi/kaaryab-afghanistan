import { Suspense } from "react";
import OpportunitiesList from "@/components/opportunitiesPage/OpportunitiesList";

export default function Opportunities() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-center text-4xl font-bold text-slate-900 dark:text-slate-50">
            Opportunities
          </h1>
          <p className="mt-2 text-center text-lg text-slate-600 dark:text-slate-300">
            Browse available opportunities and open the full details for each
            one.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="py-10 text-center">Loading opportunities…</div>
          }
        >
          <OpportunitiesList />
        </Suspense>
      </div>
    </main>
  );
}
