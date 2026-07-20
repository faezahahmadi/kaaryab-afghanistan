import CategoryBrowse from "@/components/home/CategoryBrowse";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import StatisticSection from "@/components/home/StatisticSection";
import FeaturedOppSection from "@/components/home/FeaturedOppSection";
import { allOpportunities } from "@/utils/mockData";

export default function Home() {
  const featuredOpportunities = allOpportunities.filter(
    (opportunity) => opportunity.featured === true,
  );
  return (
    <main
      className="flex flex-col items-center justify-between bg-white
     text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50"
    >
      <HeroSection />
      <StatisticSection />
      <CategoryBrowse />
      <FeaturedOppSection featured={featuredOpportunities} />
      {/*CTA section */}
      <section
        className="w-full bg-linear-to-r from-primary-500
             via-primary-800 to-secondary-400 py-16 px-5 text-white md:px-10 lg:px-20"
      >
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">
            Ready when you are
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            One platform for every next step in your career.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-100 sm:text-lg">
            Find opportunities with a refined experience that feels modern,
            focused, and inviting.
          </p>
          <Link
            href="/opportunities"
            className="mt-8 inline-flex h-14 items-center justify-center
            rounded-full bg-white px-8 text-sm font-semibold text-slate-900
            transition hover:bg-slate-100 sm:text-base"
          >
            View All Opportunities
          </Link>
        </div>
      </section>
    </main>
  );
}
