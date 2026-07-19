import Link from "next/link";

const categories = [
  "Job",
  "Internship",
  "Scholarship",
  "Online Course",
  "Training Program",
  "Volunteer Work",
] as const;

export default function CategoryBrowse() {
  return (
    <section className="mx-auto my-10 w-full max-w-6xl rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
      <div className="flex flex-col items-center justify-center gap-10 text-center sm:flex-row sm:items-end">
        <div>
          <p className="my-5 flex items-start text-sm uppercase tracking-[0.3em] text-emerald-600">
            Browse by category
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50 sm:text-4xl">
            Explore opportunities with a single click
          </h2>
          <p className="my-5 flex max-w-xl text-center text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Start with one category and let the opportunities page show the Most
            relevant results.
          </p>
        </div>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/opportunities?category=${encodeURIComponent(category)}`}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:scale-105 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}
