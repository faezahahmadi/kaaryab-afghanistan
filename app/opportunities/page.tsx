import OpportunitiesList from "@/components/opportunitiesPage/OpportunitiesList";

export default function Opportunities() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 text-center">
            Opportunities
          </h1>
          <p className="mt-2 text-lg text-slate-600 text-center">
            Browse available opportunities and open the full details for each
            one.
          </p>
        </div>

        <OpportunitiesList />
      </div>
    </main>
  );
}
