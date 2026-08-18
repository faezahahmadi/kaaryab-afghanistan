import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_FILTERS,
  filterOpportunities,
  getSearchSuggestions,
  getUniqueCategories,
  getUniqueLocations,
  getUniqueWorkModes,
} from "./search.ts";
import type { Opportunity } from "./mockData.ts";

const REF_DATE = new Date("2026-08-17T00:00:00");

function makeOpportunity(overrides: Partial<Opportunity>): Opportunity {
  return {
    id: "opp-1",
    title: "Frontend Developer",
    organization: "Roshan Telecom",
    category: "Job",
    deadline: "2026-08-20",
    description: "desc",
    location: "Kabul, Afghanistan",
    workMode: "On-site",
    requirements: [],
    applyLink: "https://example.com",
    type: "Full-time",
    tags: ["React", "TypeScript"],
    postedDate: "2026-08-01",
    featured: false,
    image: "/image.jpg",
    ...overrides,
  };
}

test("filterOpportunities: matches by title, organization, or tag", () => {
  const opportunities = [
    makeOpportunity({ id: "1", title: "Backend Engineer", tags: ["Node.js"] }),
    makeOpportunity({ id: "2", title: "UX Designer", organization: "Figma Co", tags: ["Design"] }),
    makeOpportunity({ id: "3", title: "Data Analyst", tags: ["React"] }),
  ];

  const result = filterOpportunities(
    opportunities,
    { ...DEFAULT_FILTERS, query: "react" },
    REF_DATE,
  );

  assert.deepEqual(result.map((o) => o.id), ["3"]);
});

test("filterOpportunities: applies category, location, and work mode together", () => {
  const opportunities = [
    makeOpportunity({ id: "1", category: "Job", location: "Kabul, Afghanistan", workMode: "Remote" }),
    makeOpportunity({ id: "2", category: "Job", location: "Herat, Afghanistan", workMode: "Remote" }),
    makeOpportunity({ id: "3", category: "Internship", location: "Kabul, Afghanistan", workMode: "Remote" }),
  ];

  const result = filterOpportunities(
    opportunities,
    { ...DEFAULT_FILTERS, category: "Job", location: "Kabul, Afghanistan", workMode: "Remote" },
    REF_DATE,
  );

  assert.deepEqual(result.map((o) => o.id), ["1"]);
});

test("filterOpportunities: Next7 deadline window is inclusive and excludes past deadlines", () => {
  const opportunities = [
    makeOpportunity({ id: "past", deadline: "2026-08-10" }),
    makeOpportunity({ id: "today", deadline: "2026-08-17" }),
    makeOpportunity({ id: "in-7", deadline: "2026-08-24" }),
    makeOpportunity({ id: "in-8", deadline: "2026-08-25" }),
  ];

  const result = filterOpportunities(
    opportunities,
    { ...DEFAULT_FILTERS, deadlineFilter: "Next7" },
    REF_DATE,
  );

  assert.deepEqual(
    result.map((o) => o.id).sort(),
    ["in-7", "today"].sort(),
  );
});

test("filterOpportunities: Past filter only returns opportunities before the reference date", () => {
  const opportunities = [
    makeOpportunity({ id: "past", deadline: "2026-08-10" }),
    makeOpportunity({ id: "future", deadline: "2026-08-20" }),
  ];

  const result = filterOpportunities(
    opportunities,
    { ...DEFAULT_FILTERS, deadlineFilter: "Past" },
    REF_DATE,
  );

  assert.deepEqual(result.map((o) => o.id), ["past"]);
});

test("getUniqueLocations/Categories/WorkModes: de-duplicate and prefix an 'all' option where relevant", () => {
  const opportunities = [
    makeOpportunity({ id: "1", location: "Kabul, Afghanistan", category: "Job", workMode: "Remote" }),
    makeOpportunity({ id: "2", location: "Kabul, Afghanistan", category: "Internship", workMode: "Hybrid" }),
  ];

  assert.deepEqual(getUniqueLocations(opportunities), ["All Locations", "Kabul, Afghanistan"]);
  assert.deepEqual(getUniqueCategories(opportunities), ["All", "Internship", "Job"]);
  assert.deepEqual(getUniqueWorkModes(opportunities), ["Hybrid", "Remote"]);
});

test("getSearchSuggestions: ranks title matches above organization/tag matches and respects the limit", () => {
  const opportunities = [
    makeOpportunity({ id: "1", title: "Marketing Intern", organization: "Acme" }),
    makeOpportunity({ id: "2", title: "Backend Developer", organization: "Marketing Guild" }),
    makeOpportunity({ id: "3", title: "Data Analyst", organization: "Acme", tags: ["Marketing"] }),
  ];

  const result = getSearchSuggestions(opportunities, "market", 2);

  assert.equal(result.length, 2);
  assert.equal(result[0].id, "1");
});

test("getSearchSuggestions: returns nothing for an empty query", () => {
  const opportunities = [makeOpportunity({ id: "1" })];
  assert.deepEqual(getSearchSuggestions(opportunities, "   "), []);
});
