import { coreValues } from "@/utils/Constants";
import Image from "next/image";
import CoreValueCard from "./CoreValueCard";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-between bg-slate-50">
      <section className="w-full bg-white py-16 px-5 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
              About Us
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Empowering Afghan youth through opportunity and belonging.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              KaarYab Afghanistan connects students, graduates, and
              professionals with opportunities that support education,
              employment, and career development.
            </p>
          </div>

          <div className="w-full">
            <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-50 via-slate-100 to-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)]">
              <Image
                src="/about/about-hero.jpg"
                alt="Hero Image"
                width={700}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-y border-slate-200 bg-slate-900 px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">
            Our core values
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            The principles that shape everything we build.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {coreValues.map((card) => (
              <CoreValueCard
                key={card.id}
                title={card.title}
                text={card.text}
                featured={card.featured}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-[28px] border border-slate-200">
            <Image
              src="/about/philosophy-img.jpg"
              alt="Our philosophy image"
              width={700}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Our philosophy
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              At KaarYab Afghanistan, we believe that opportunity should never
              be limited by barriers of access or awareness. Our philosophy is
              rooted in the idea that education, employment, and career
              development are not privileges, but essential rights that empower
              individuals to shape their futures. By fostering a culture of
              accessibility, growth, transparency, and community, we strive to
              create an environment where Afghan youth can discover their
              potential, build meaningful connections, and contribute to a
              stronger, more resilient society.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
