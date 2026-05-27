// localStorage helpers for personal deals (user-uploaded via screenshot intake).

import type { Deal, Meal } from "@/data/deals";

const KEY = "la-eats:personal-deals";

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_MAP: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

export type ParsedDeal = {
  restaurant: string | null;
  deal: string | null;
  day: string | null;
  timeWindow: string | null;
  price: string | null;
  neighborhood: string | null;
  cuisine: string | null;
  category: string | null;
  sourceHandle: string | null;
  notes: string | null;
};

export function normalizeDays(dayInput: string | null | undefined): string[] {
  if (!dayInput) return [...ALL_DAYS];
  const lower = dayInput.trim().toLowerCase();
  if (!lower) return [...ALL_DAYS];
  if (lower === "daily") return [...ALL_DAYS];
  if (lower === "weekdays") return ["Mon", "Tue", "Wed", "Thu", "Fri"];
  if (lower === "weekends") return ["Sat", "Sun"];

  const out = new Set<string>();
  for (const tok of lower.split(/[\s,/&+]+/)) {
    if (DAY_MAP[tok]) out.add(DAY_MAP[tok]);
  }
  if (out.size === 0) return [...ALL_DAYS];
  return [...out];
}

export function inferMealsFromWindow(tw: string | null | undefined): Meal[] {
  const lower = (tw || "").toLowerCase();
  const set = new Set<Meal>();
  if (!lower) {
    set.add("dinner");
    return [...set];
  }
  if (/all day|daily|all night/.test(lower)) {
    set.add("lunch");
    set.add("dinner");
  }
  if (/breakfast|7am|8am|9am|10am/.test(lower)) set.add("breakfast");
  if (/lunch|11am|12pm|noon|1pm|2pm/.test(lower)) set.add("lunch");
  if (/dinner|happy hour|5pm|6pm|7pm|8pm/.test(lower)) set.add("dinner");
  if (/late|10pm|11pm|midnight|1am|2am|close/.test(lower)) set.add("late_night");
  if (set.size === 0) set.add("dinner");
  return [...set];
}

export function dealFromParsed(parsed: ParsedDeal, overrides?: Partial<Deal>): Deal {
  const id = `personal-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const days = normalizeDays(parsed.day);
  const meals = inferMealsFromWindow(parsed.timeWindow);
  return {
    id,
    day: parsed.day || "Daily",
    days,
    restaurant: parsed.restaurant || "Untitled",
    neighborhood: parsed.neighborhood || "LA",
    deal: parsed.deal || "",
    timeWindow: parsed.timeWindow || "",
    price: parsed.price || "",
    cuisine: parsed.cuisine || "",
    category: parsed.category || "Personal",
    sourceUrl: parsed.sourceHandle ? `https://instagram.com/${parsed.sourceHandle.replace(/^@/, "")}` : "",
    verified: false,
    notes: parsed.notes || "",
    traits: [],
    meals,
    isPersonal: true,
    ...overrides,
  };
}

export function loadPersonalDeals(): Deal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((d) => ({
      ...d,
      days: Array.isArray(d.days) ? d.days : [...ALL_DAYS],
      traits: Array.isArray(d.traits) ? d.traits : [],
      meals: Array.isArray(d.meals) ? d.meals : ["dinner"],
      isPersonal: true,
    })) as Deal[];
  } catch {
    return [];
  }
}

export function savePersonalDeals(list: Deal[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function appendPersonalDeal(deal: Deal): Deal[] {
  const list = loadPersonalDeals();
  list.unshift(deal);
  savePersonalDeals(list);
  return list;
}

export function clearPersonalDeals() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
