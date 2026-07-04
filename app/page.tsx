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
    </main>
  );
}
