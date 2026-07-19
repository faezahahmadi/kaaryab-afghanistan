import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-slate-50 py-16 px-5 dark:bg-slate-900 md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-600 mb-5">
            Find the right opportunity
          </p>
          <h1
            className="font-bold font-sans leading-tight text-4xl sm:text-5xl md:text-[54px]
                [text-shadow:0px_4px_10px_rgb(156,155,155)]
                dark:[text-shadow:0px_0px_3px_#0000]"
          >
            Discover opportunities to{" "}
            <span className="text-primary-600">grow</span>,
            <span className="text-primary-600"> learn</span>, and build your
            future.
          </h1>
          <p
            className="mt-6 max-w-2xl text-base font-medium text-slate-600
            dark:text-slate-300 sm:text-lg md:text-xl lg:text-2xl"
          >
            Browse jobs, scholarships, internships, courses, and training
            programs — all in one polished space designed for Afghan youth.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/opportunities"
              className="inline-flex h-12 items-center justify-center rounded-full
                bg-cta px-8 text-base font-semibold text-white shadow-button transition
                hover:bg-cta-hover"
            >
              Explore Opportunities
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-full
                     bg-white border border-emerald-600 px-8 text-base font-semibold
                      text-slate-900 shadow-button transition hover:bg-emerald-200
                       dark:bg-emerald-400 dark:text-white dark:hover:bg-emeral-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="w-full lg:order-last lg:col-span-5">
          <div
            className="overflow-hidden rounded-4xl bg-linear-to-br from-primary-50
            via-slate-100 to-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)]"
          >
            <Image
              src="/common/hero-image.jpg"
              alt="Hero Image"
              width={700}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
