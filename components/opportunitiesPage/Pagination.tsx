"use client";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Prev
      </button>

      <div className="flex max-w-[65vw] items-center gap-1.5 overflow-x-auto py-1 sm:max-w-none sm:gap-2 [scrollbar-none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {Array.from({ length: totalPages }).map((_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              onClick={() => onPageChange(n)}
              className={`h-8 w-8 shrink-0 rounded-full text-sm ${
                n === page
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Next
      </button>
    </div>
  );
}
