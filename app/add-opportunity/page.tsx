"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AddOppSchema } from "@/app/validation/AddOppSchema";
import { useOpportunityContext } from "@/context/OpportunityContext";
import type {
  Opportunity,
  OpportunityCategory,
  WorkMode,
} from "@/utils/mockData";

type FormData = {
  title: string;
  organization: string;
  category: string;
  type: string;
  deadline: string;
  location: string;
  description: string;
  workMode: string;
  requirements: string;
  tags: string;
  applyLink: string;
  featured: boolean;
};

export default function AddOpportunity() {
  const router = useRouter();
  const { addOpportunity } = useOpportunityContext();
  const [submitMessage, setSubmitMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(AddOppSchema),
    mode: "onTouched",
    defaultValues: {
      category: "Job",
      workMode: "On-site",
      featured: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const requirements = data.requirements
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const tags = data.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const newOpportunity: Opportunity = {
      id: `custom-${Date.now()}`,
      title: data.title,
      organization: data.organization,
      category: data.category as OpportunityCategory,
      deadline: data.deadline,
      description: data.description,
      location: data.location,
      workMode: data.workMode as WorkMode,
      requirements,
      applyLink: data.applyLink,
      type: data.type,
      tags,
      postedDate: new Date().toISOString().slice(0, 10),
      featured: data.featured,
      image: "/images/default-opportunity.jpg",
    };

    addOpportunity(newOpportunity);
    reset();
    setSubmitMessage(
      "Opportunity published successfully. It is now available in the opportunities list.",
    );
    router.push("/opportunities");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Publish an opportunity
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Add a new opportunity
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Use this form to create a listing that mirrors the structure used
              across the opportunity detail view and the catalog.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center text-sm font-medium text-emerald-600 hover:underline"
          >
            ← Back to opportunities
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
          {submitMessage ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              {submitMessage}
            </div>
          ) : null}

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="title"
              >
                Position title
              </label>
              <input
                id="title"
                {...register("title")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                placeholder="e.g. Software Engineer"
              />
              {errors.title ? (
                <p className="text-sm text-rose-600">{errors.title.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="organization"
              >
                Organization
              </label>
              <input
                id="organization"
                {...register("organization")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                placeholder="e.g. Karyaab Afghanistan"
              />
              {errors.organization ? (
                <p className="text-sm text-rose-600">
                  {errors.organization.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                {...register("category")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              >
                <option value="Job">Job</option>
                <option value="Scholarship">Scholarship</option>
                <option value="Internship">Internship</option>
                <option value="Online Course">Online Course</option>
                <option value="Training Program">Training Program</option>
                <option value="Volunteer Work">Volunteer Work</option>
              </select>
              {errors.category ? (
                <p className="text-sm text-rose-600">
                  {errors.category.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="type"
              >
                Opportunity type
              </label>
              <input
                id="type"
                {...register("type")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                placeholder="Full-time / Contract / Scholarship"
              />
              {errors.type ? (
                <p className="text-sm text-rose-600">{errors.type.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="location"
              >
                Location
              </label>
              <input
                id="location"
                {...register("location")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                placeholder="Kabul, Afghanistan"
              />
              {errors.location ? (
                <p className="text-sm text-rose-600">
                  {errors.location.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="deadline"
              >
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                {...register("deadline")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />
              {errors.deadline ? (
                <p className="text-sm text-rose-600">
                  {errors.deadline.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="workMode"
              >
                Work mode
              </label>
              <select
                id="workMode"
                {...register("workMode")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              >
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.workMode ? (
                <p className="text-sm text-rose-600">
                  {errors.workMode.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="applyLink"
              >
                Apply link
              </label>
              <input
                id="applyLink"
                {...register("applyLink")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                placeholder="https://example.com/apply"
              />
              {errors.applyLink ? (
                <p className="text-sm text-rose-600">
                  {errors.applyLink.message}
                </p>
              ) : null}
            </div>
          </section>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={6}
              {...register("description")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              placeholder="Share a concise overview of the opportunity and why it matters."
            />
            {errors.description ? (
              <p className="text-sm text-rose-600">
                {errors.description.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="requirements"
              >
                Requirements (comma separated)
              </label>
              <textarea
                id="requirements"
                rows={4}
                {...register("requirements")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                placeholder="Bachelor's degree, 2+ years experience, strong communication"
              />
              {errors.requirements ? (
                <p className="text-sm text-rose-600">
                  {errors.requirements.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="tags"
              >
                Tags (comma separated)
              </label>
              <textarea
                id="tags"
                rows={4}
                {...register("tags")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                placeholder="Remote, Tech, NGO"
              />
              {errors.tags ? (
                <p className="text-sm text-rose-600">{errors.tags.message}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                {...register("featured")}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              Mark as featured opportunity
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Publishing..." : "Publish opportunity"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
