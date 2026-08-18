import { test } from "node:test";
import assert from "node:assert/strict";
import {
  deriveSavedOpportunities,
  extractSavedIds,
  removeSavedId,
  toggleSavedId,
} from "./savedOpportunities.ts";
import type { Opportunity } from "./mockData.ts";

function makeOpportunity(id: string, title: string): Opportunity {
  return {
    id,
    title,
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
  };
}

test("toggleSavedId: adds an id to the front when not present", () => {
  assert.deepEqual(toggleSavedId(["a"], "b"), ["b", "a"]);
});

test("toggleSavedId: removes an id when already present", () => {
  assert.deepEqual(toggleSavedId(["a", "b"], "a"), ["b"]);
});

test("removeSavedId: removes only the matching id", () => {
  assert.deepEqual(removeSavedId(["a", "b", "c"], "b"), ["a", "c"]);
});

test("deriveSavedOpportunities: reflects live opportunity edits instead of a stale snapshot", () => {
  const original = makeOpportunity("job-1", "Frontend Developer");
  const edited = { ...original, title: "Senior Frontend Developer" };

  const derived = deriveSavedOpportunities([edited], ["job-1"]);

  assert.equal(derived[0].title, "Senior Frontend Developer");
});

test("deriveSavedOpportunities: drops ids for opportunities that no longer exist", () => {
  const opportunities = [makeOpportunity("job-1", "Still here")];
  const derived = deriveSavedOpportunities(opportunities, ["job-1", "deleted-id"]);
  assert.deepEqual(derived.map((o) => o.id), ["job-1"]);
});

test("deriveSavedOpportunities: preserves saved order", () => {
  const opportunities = [
    makeOpportunity("a", "A"),
    makeOpportunity("b", "B"),
    makeOpportunity("c", "C"),
  ];
  const derived = deriveSavedOpportunities(opportunities, ["c", "a"]);
  assert.deepEqual(derived.map((o) => o.id), ["c", "a"]);
});

test("extractSavedIds: accepts an already-clean id array", () => {
  assert.deepEqual(extractSavedIds(["a", "b"]), ["a", "b"]);
});

test("extractSavedIds: migrates legacy full-object snapshots to ids", () => {
  const legacy = [{ id: "job-1", title: "Old snapshot" }, { id: "job-2" }];
  assert.deepEqual(extractSavedIds(legacy), ["job-1", "job-2"]);
});

test("extractSavedIds: ignores malformed entries and non-array input", () => {
  assert.deepEqual(extractSavedIds([{ notAnId: true }, null, 42]), []);
  assert.deepEqual(extractSavedIds("not-an-array"), []);
});
