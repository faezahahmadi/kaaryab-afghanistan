import { test } from "node:test";
import assert from "node:assert/strict";
import {
  computeDashboardStats,
  formatDate,
  getDaysUntil,
  isExpiringSoon,
  toChartData,
} from "./dashboardStats.ts";
import type { Opportunity } from "./mockData.ts";

const REF_DATE = new Date("2026-08-17T00:00:00");

function makeOpportunity(overrides: Partial<Opportunity>): Opportunity {
  return {
    id: "opp-1",
    title: "Title",
    organization: "Org",
    category: "Job",
    deadline: "2026-08-20",
    description: "desc",
    location: "Kabul, Afghanistan",
    workMode: "On-site",
    requirements: [],
    applyLink: "https://example.com",
    type: "Full-time",
    tags: [],
    postedDate: "2026-08-01",
    featured: false,
    image: "/image.jpg",
    ...overrides,
  };
}

test("computeDashboardStats: counts by category, type, and work mode", () => {
  const opportunities = [
    makeOpportunity({ id: "1", category: "Job", type: "Full-time", workMode: "Remote" }),
    makeOpportunity({ id: "2", category: "Job", type: "Part-time", workMode: "Remote" }),
    makeOpportunity({ id: "3", category: "Internship", type: "Full-time", workMode: "Hybrid" }),
  ];

  const stats = computeDashboardStats(opportunities, REF_DATE);

  assert.equal(stats.total, 3);
  assert.deepEqual(stats.byCategory, { Job: 2, Internship: 1 });
  assert.deepEqual(stats.byType, { "Full-time": 2, "Part-time": 1 });
  assert.deepEqual(stats.byWorkMode, { Remote: 2, Hybrid: 1 });
});

test("computeDashboardStats: expiringSoon excludes past deadlines and sorts soonest-first, capped at 5", () => {
  const opportunities = [
    makeOpportunity({ id: "past", deadline: "2026-08-01" }),
    makeOpportunity({ id: "later", deadline: "2026-09-01" }),
    makeOpportunity({ id: "soonest", deadline: "2026-08-18" }),
    makeOpportunity({ id: "mid", deadline: "2026-08-25" }),
  ];

  const stats = computeDashboardStats(opportunities, REF_DATE);

  assert.deepEqual(
    stats.expiringSoon.map((o) => o.id),
    ["soonest", "mid", "later"],
  );
});

test("computeDashboardStats: recent sorts by postedDate, newest first, capped at 5", () => {
  const opportunities = [
    makeOpportunity({ id: "old", postedDate: "2026-07-01" }),
    makeOpportunity({ id: "newest", postedDate: "2026-08-15" }),
    makeOpportunity({ id: "mid", postedDate: "2026-08-01" }),
  ];

  const stats = computeDashboardStats(opportunities, REF_DATE);

  assert.deepEqual(
    stats.recent.map((o) => o.id),
    ["newest", "mid", "old"],
  );
});

test("toChartData: converts a counts record into name/value pairs", () => {
  assert.deepEqual(toChartData({ Job: 2, Internship: 1 }), [
    { name: "Job", value: 2 },
    { name: "Internship", value: 1 },
  ]);
});

test("getDaysUntil / isExpiringSoon: flags items due within 14 days but not overdue", () => {
  assert.equal(getDaysUntil("2026-08-18T00:00:00", REF_DATE), 1);
  assert.equal(isExpiringSoon("2026-08-18T00:00:00", REF_DATE), true);
  assert.equal(isExpiringSoon("2026-09-17T00:00:00", REF_DATE), false);
  assert.equal(isExpiringSoon("2026-08-10T00:00:00", REF_DATE), false);
});

test("formatDate: formats as 'Mon D, YYYY'", () => {
  assert.equal(formatDate("2026-08-20T00:00:00"), "Aug 20, 2026");
});
