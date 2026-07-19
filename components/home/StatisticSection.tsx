import StatisticCard from "@/components/home/StatisticCard";
import { STATISTICS } from "@/utils/Constants";

export default function StatisticSection() {
  return (
    <section
      className="w-full border border-slate-200 bg-neutral-300
        dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center
        justify-center p-6 shadow-lg sm:p-8"
    >
      <div className="flex flex-col mb-5">
        <p className="flex items-start text-sm uppercase tracking-[0.3em] text-emerald-600 my-5">
          Statistics
        </p>
        <h1
          className="font-bold text-3xl text-slate-900 dark:text-slate-50
            md:text-[30px] text-center"
        >
          Creating Better Access to Opportunities
        </h1>
      </div>

      <div
        className="flex flex-col lg:flex-row items-center justify-center
            gap-8 md:gap-12 md:mt-20 md:mb-20"
      >
        {STATISTICS.map((card) => (
          <StatisticCard
            key={card.id}
            title={card.title}
            value={card.value}
            Icon={card.icon}
          />
        ))}
      </div>
    </section>
  );
}
