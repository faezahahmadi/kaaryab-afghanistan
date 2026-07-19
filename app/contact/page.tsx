import { Mail, MapPin, Phone } from "lucide-react";
import Form from "@/components/contact/Form";

export default function Contact() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50">
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
                Contact us
              </p>
              <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-slate-50 sm:text-5xl">
                Get in touch
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Whether you want to ask a question, share an opportunity, or
                collaborate with KaarYab Afghanistan, we would love to hear from
                you.
              </p>
            </div>

            <div className="rounded-[28px] p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
              <div className="space-y-5">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/10">
                  <Mail className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      hello@karyabafghanistan.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/10">
                  <Phone className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold">Phone</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      +93 70 123 4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/10">
                  <MapPin className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold">Location</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Kabul, Afghanistan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl rounded-4xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Send a message
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">
                We are here to help you take the next step.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                Share a few details about your request and we will get back to
                you with the right guidance.
              </p>
            </div>
            <Form />
          </div>
        </div>
      </section>
    </main>
  );
}
