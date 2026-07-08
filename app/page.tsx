import StatisticCard from "@/components/home/StatisticCard";
import { STATISTICS } from "@/utils/Constants";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <section
        className="
      relative
      flex flex-col
      lg:grid lg:grid-cols-12 items-start
      w-full gap-5
      min-h-screen
      pt-16 md:pt-24
      pb-16 md:pb-32
      px-5 md:px-10 lg:px-20
    
  "
      >
        <div className=" relative w-full lg:col-span-7">
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
            Find Opportunities That Help You{" "}
            <span className="text-primary-600">Learn, Grow, </span> and{" "}
            <span className="text-primary-600">Succeed</span>
          </h1>
          <p
            className="
    mt-6
    text-neutral-600
    font-medium
    text-base
    sm:text-lg
    md:text-xl
    lg:text-2xl
    max-w-196
  "
          >
            Discover jobs, internships, scholarships, remote work opportunities,
            training programs, and online courses in one trusted platform built
            for Afghan youth.
          </p>
          <div className="flexc flex-row space-x-5">
            <button
              className="
    mt-8 
    h-12 md:h-14
    px-8 
    rounded-full
    bg-cta
    text-white
    cursor-pointer hover:bg-cta-hover
    text-base md:text-base
    shadow-button
  "
            >
              Explore Opportunities
            </button>

            <button
              className="
    mt-8 
    h-12 md:h-14
    px-8 md:px-15
    rounded-full
    bg-secondary-700
    text-white
    cursor-pointer hover:bg-secondary-900
    text-base md:text-base
    shadow-button
  "
            >
              Learn More{" "}
            </button>
          </div>
        </div>
        <div className="w-full lg:col-span-5 relative">
          <Image
            src="/common/hero-image.jpg"
            alt="Hero Image"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Statistics section */}
      <section
        className="bg-neutral-200 w-full py-12 px-6 md:px-12 flex 
              flex-col flex-wrap items-center"
      >
        <div className="flex items-center justify-center gap-5 md:gap-8 mb-5">
          <h1 className="font-bold text-base lg:text-[40px] md:text-[30px]">
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
      <section></section>
      <section
        className="bg-primary-500 w-full py-12 px-6 md:px-12 flex 
              flex-col flex-wrap items-center"
      >
        <div className="flex flex-col items-center justify-center gap-5 md:gap-8 mb-5">
          <h1 className="font-bold text-base text-center md:text-[30px]">
            Your Next Opportunity Could Change Your Future
          </h1>
          <p className="text-base text-neutral-200 max-w-2xl text-center">
            Start exploring opportunities today and take the next step toward
            your goals.
          </p>
          <button
            className="
    mt-8 
    h-12 md:h-14
    px-8 
    rounded-full
    bg-cta
    text-white
    cursor-pointer hover:bg-cta-hover
    text-base md:text-base
    shadow-button
  "
          >
            Explore Opportunities
          </button>
        </div>
      </section>
    </main>
  );
}
