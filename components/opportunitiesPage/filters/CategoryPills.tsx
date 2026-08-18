"use client";

type CategoryPillsProps = {
  categories: string[];
  category: string | null;
  onCategoryChange: (category: string | null) => void;
};

export default function CategoryPills({ categories, category, onCategoryChange }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat === "All" ? null : cat)}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition ${
            (category === null && cat === "All") || category === cat
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
