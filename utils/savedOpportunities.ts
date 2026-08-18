import type { Opportunity } from "./mockData";

/**
 * Toggles an id in a saved-id list, keeping the most-recently-saved id first.
 * Pure function so the "save" behaviour can be unit tested without React.
 */
export function toggleSavedId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((existing) => existing !== id) : [id, ...ids];
}

export function removeSavedId(ids: string[], id: string): string[] {
  return ids.filter((existing) => existing !== id);
}

/**
 * Derives the list of saved Opportunity objects from the *current* list of
 * opportunities, in saved order. Because this always reads from the live
 * opportunities array, a saved item automatically reflects edits made to it
 * elsewhere in the app instead of drifting out of sync.
 */
export function deriveSavedOpportunities(
  opportunities: Opportunity[],
  savedIds: string[],
): Opportunity[] {
  const byId = new Map(opportunities.map((o) => [o.id, o] as const));
  return savedIds
    .map((id) => byId.get(id))
    .filter((o): o is Opportunity => Boolean(o));
}

/**
 * Best-effort migration for the old storage format, which stored full saved
 * Opportunity objects (a snapshot) instead of ids. Accepts unknown parsed
 * JSON and returns a clean string[] of ids.
 */
export function extractSavedIds(parsed: unknown): string[] {
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && "id" in item) {
        const id = (item as { id: unknown }).id;
        return typeof id === "string" ? id : null;
      }
      return null;
    })
    .filter((id): id is string => Boolean(id));
}
