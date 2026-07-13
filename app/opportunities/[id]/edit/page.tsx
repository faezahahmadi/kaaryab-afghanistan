"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

export default function EditOpportunityPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { opportunities, updateOpportunity } = useOpportunityContext();
  const [submitMessage, setSubmitMessage] = useState("");

  const opportunity = useMemo(() => {
    return opportunities.find((item) => item.id === params.id);
  }, [opportunities, params.id]);

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

  useEffect(() => {
    if (!opportunity) return;

    reset({
      title: opportunity.title,
      organization: opportunity.organization,
      category: opportunity.category,
      type: opportunity.type,
      deadline: opportunity.deadline,
      location: opportunity.location,
      description: opportunity.description,
      workMode: opportunity.workMode,
      requirements: opportunity.requirements.join(", "),
      tags: opportunity.tags.join(", "),
      applyLink: opportunity.applyLink,
      featured: opportunity.featured,
    });
  }, [opportunity, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!opportunity) return;

    const requirements = data.requirements
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const tags = data.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const updatedOpportunity: Opportunity = {
      ...opportunity,
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
      featured: data.featured,
    };

    updateOpportunity(updatedOpportunity);
    setSubmitMessage("Opportunity updated successfully.");
    router.push(`/opportunities/${opportunity.id}`);
  };

  if (!opportunity) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Opportunity not found
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            The opportunity you are trying to edit no longer exists.
          </p>
          <Link
            href="/opportunities"
            className="mt-6 inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Back to opportunities
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Edit opportunity
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Update this opportunity
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Adjust the details below and keep the listing aligned with the
              rest of the catalog.
            </p>
          </div>
          <Link
            href={`/opportunities/${opportunity.id}`}
            className="inline-flex items-center text-sm font-medium text-emerald-600 hover:underline"
          >
            ← Back to detail
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
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
