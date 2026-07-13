"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(
      `Thanks ${formData.name || "there"}! Your message has been received.`,
    );
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
                Contact us
              </p>
              <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
                Get in touch
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Whether you want to ask a question, share an opportunity, or
                collaborate with KaarYab Afghanistan, we would love to hear from
                you.
              </p>
            </div>

            <div className="rounded-[28px] bg-slate-900 p-8 text-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.55)]">
              <div className="space-y-5">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                  <Mail className="mt-0.5 h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className="mt-1 text-sm text-slate-300">
                      hello@karyabafghanistan.org
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                  <Phone className="mt-0.5 h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold">Phone</p>
                    <p className="mt-1 text-sm text-slate-300">
                      +93 70 123 4567
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold">Location</p>
                    <p className="mt-1 text-sm text-slate-300">
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
        <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Send a message
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                We are here to help you take the next step.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Share a few details about your request and we will get back to
                you with the right guidance.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {submitMessage ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                  {submitMessage}
                </div>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                    placeholder="Your name"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm font-medium text-slate-700">
                <span>Message</span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                  placeholder="Tell us how we can help..."
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
