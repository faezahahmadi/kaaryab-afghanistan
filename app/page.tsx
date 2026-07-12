import CategoryBrowse from "@/components/home/CategoryBrowse";
import StatisticCard from "@/components/home/StatisticCard";
import OpportunityCard from "@/components/opportunitiesPage/OpportunityCard";
import { STATISTICS } from "@/utils/Constants";
import allOpportunities from "@/utils/mockData";
import Image from "next/image";
import Link from "next/link";
import type { Opportunity } from "@/utils/mockData";

export default function Home() {
  const featuredOpportunities = allOpportunities.filter(
    (opportunity) => opportunity.featured === true,
  );

  return (
    <main className="flex flex-col items-center justify-between">
      <section className="w-full bg-slate-50 py-16 px-5 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">
              Find the right opportunity
            </p>
            <h1
              className={`
    font-bold
    font-sans
    leading-tight
    text-4xl
    sm:text-5xl
    md:text-6xl
      `}
              style={{ textShadow: "0px 4px 10px rgb(156, 155, 155)" }}
            >
              Discover opportunities to{" "}
              <span className="text-primary-600">grow</span>,
              <span className="text-primary-600"> learn</span>, and build your
              future.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium text-slate-600 sm:text-lg md:text-xl lg:text-2xl">
              Browse jobs, scholarships, internships, courses, and training
              programs — all in one polished space designed for Afghan youth.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/opportunities"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cta px-8 text-base font-semibold text-white shadow-button transition hover:bg-cta-hover"
              >
                Explore Opportunities
              </Link>
              <button className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-base font-semibold text-white shadow-button transition hover:bg-slate-800">
                Learn More
              </button>
            </div>
          </div>

          <div className="order-first w-full lg:order-last lg:col-span-5">
            <div className="overflow-hidden rounded-4xl bg-linear-to-br from-primary-50 via-slate-100 to-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)]">
              <Image
                src="/common/hero-image.jpg"
                alt="Hero Image"
                width={700}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics section */}
      <section
        className=" w-full rounded-3xl border  flex flex-col items-center justify-center
             border-slate-200 bg-neutral-300 p-6 shadow-lg sm:p-8"
      >
        <div className="flex flex-col mb-5">
          <p
            className="flex items-start  text-sm uppercase tracking-[0.3em]
             text-emerald-600 my-5"
          >
            Statistics
          </p>
          <h1 className="font-bold text-3xl md:text-[30px] text-center">
            Creating Better Access to Opportunities
          </h1>
        </div>

        <div
          className="flex flex-col  lg:flex-row items-center
            justify-center gap-8 md:gap-12 md:mt-20 md:mb-20"
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

      {/*Fetured Project*/}
      <section className=" flex flex-col w-full py-12 px-6 md:px-12">
        <h1 className="font-bold  text-3xl  sm:text-4xl my-5 text-center">
          Featured Opportunities
        </h1>
        <div
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3
        md:gap-12 md:mt-20 md:mb-20"
        >
          {featuredOpportunities
            .map((opportunity: Opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))
            .slice(0, 3)}
        </div>
      </section>

      <CategoryBrowse />

      <section className="w-full bg-linear-to-r from-primary-500 via-primary-800 to-secondary-400 py-16 px-5 text-white md:px-10 lg:px-20">
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
            className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 sm:text-base"
          >
            View All Opportunities
          </Link>
        </div>
      </section>
    </main>
  );
}
