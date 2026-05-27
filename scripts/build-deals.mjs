#!/usr/bin/env node
// Build data/deals.ts from /Users/jp/la-food-deals.csv
// Run once: node scripts/build-deals.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = "/Users/jp/la-food-deals.csv";
const OUT_PATH = resolve(__dirname, "../data/deals.ts");

// Minimal CSV parser supporting quoted fields and commas inside quotes.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field);
        field = "";
        if (row.some((cell) => cell.trim() !== "")) rows.push(row);
        row = [];
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  }
  return rows;
}

const raw = readFileSync(CSV_PATH, "utf8");
const rows = parseCSV(raw);
const header = rows.shift();
const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const WEEKEND = ["Sat", "Sun"];
const DAY_MAP = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

function normalizeDays(dayCell) {
  const raw = dayCell.trim();
  const lower = raw.toLowerCase();

  // Specific date e.g. "Thursday May 28"
  const oneTimeMatch = raw.match(/^(Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day\s+([A-Za-z]+)\s+(\d{1,2})$/i);
  if (oneTimeMatch) {
    const dayName = oneTimeMatch[1].toLowerCase() + (oneTimeMatch[1].toLowerCase().endsWith("s") ? "day" : "day");
    // Easier: just take the leading word
    const head = raw.split(/\s+/)[0].toLowerCase();
    const short = DAY_MAP[head];
    const monthName = oneTimeMatch[2];
    const dayNum = parseInt(oneTimeMatch[3], 10);
    const monthIdx = [
      "january","february","march","april","may","june",
      "july","august","september","october","november","december",
    ].indexOf(monthName.toLowerCase());
    if (short && monthIdx >= 0) {
      const year = 2026; // matches dataset context
      const m = String(monthIdx + 1).padStart(2, "0");
      const d = String(dayNum).padStart(2, "0");
      return { days: [short], oneTimeDate: `${year}-${m}-${d}` };
    }
  }

  if (DAY_MAP[lower]) return { days: [DAY_MAP[lower]] };
  if (lower === "daily") return { days: [...ALL_DAYS] };
  if (lower === "weekdays") return { days: [...WEEKDAYS] };
  if (lower === "weekends") return { days: [...WEEKEND] };

  // fallback: try to find a day prefix
  for (const [k, v] of Object.entries(DAY_MAP)) {
    if (lower.startsWith(k)) return { days: [v] };
  }
  return { days: [...ALL_DAYS] };
}

// Decide meals based on time_window + category + notes.
function inferMeals(deal) {
  const tw = (deal.Time_Window || "").toLowerCase();
  const cat = (deal.Category || "").toLowerCase();
  const restaurant = (deal.Restaurant || "").toLowerCase();
  const dealText = (deal.Deal || "").toLowerCase();
  const set = new Set();

  // Delivery apps: always-on across all meals
  if (cat.includes("delivery")) {
    return ["breakfast", "lunch", "dinner", "late_night"];
  }

  // "All day" chains and always-on
  const isAllDayChain =
    /red robin|chili's|checkers|rally's|bonchon|tom's jr|in-n-out|kozo|tacos \$1 @ figueroa/.test(restaurant);
  if (isAllDayChain || cat.includes("chain") || cat.includes("macro")) {
    set.add("lunch");
    set.add("dinner");
  }

  // All night (covers dinner + late night)
  if (/all night/.test(tw)) {
    set.add("dinner");
    set.add("late_night");
  }

  // 10pm / 11pm / midnight / "late" indicators
  if (
    /10pm|10:30pm|11pm|midnight|1am|2am|9:30-close|9pm-close|8pm-close/.test(tw) ||
    cat.includes("late")
  ) {
    set.add("late_night");
  }

  // "X-close" late patterns (only late if start is >= 9pm)
  const closeMatch = tw.match(/(\d{1,2})(?::\d{2})?pm-close/);
  if (closeMatch) {
    const startHr = parseInt(closeMatch[1], 10);
    if (startHr >= 9) set.add("late_night");
    if (startHr >= 3 && startHr <= 8) set.add("dinner");
  }

  // Brunch spans (10am-3pm/4pm) → breakfast + lunch
  if (
    /brunch/.test(cat) ||
    /10am-4pm|10am-3pm|11am-3pm|11am onward|10am onward|1-3pm|11am-2pm/.test(tw)
  ) {
    set.add("breakfast");
    set.add("lunch");
  }

  // Lunch window
  if (
    cat === "lunch" ||
    cat.includes("ayce/lunch") ||
    /lunch/.test(tw) ||
    /11am-3pm|11:30am-2:30pm|12-4pm|12pm-8pm|noon-6pm|12-5pm|11am-2pm/.test(tw)
  ) {
    set.add("lunch");
  }

  // Happy hour windows (typically 3-7pm) → dinner
  if (
    /3-6pm|3-7pm|2-6pm|2-7pm|4-6pm|4-7pm|3:30-6:30pm|5-6pm|5-7pm|5-6:30pm|5-8pm|5-9pm|5-10pm|5pm onward|5pm-close|5pm-until|6-8pm|6pm onward|6pm-8pm|7-9pm|4pm-close|3-5pm|4-8pm|noon-6pm|12-5pm/.test(tw) ||
    cat.includes("happy hour")
  ) {
    set.add("dinner");
  }

  // 4pm-close → dinner (and late_night if it stretches)
  if (/4pm-close|4pm onward/.test(tw)) {
    set.add("dinner");
  }

  // "Open-8pm" / "Til 8pm" — late afternoon → dinner
  if (/open-8pm|til 8pm|until 8pm/.test(tw)) {
    set.add("dinner");
  }

  // "All day" — generic, default to lunch+dinner
  if (/^all day/.test(tw) || tw === "all day" || /all day dine-in|all open hours/.test(tw)) {
    set.add("lunch");
    set.add("dinner");
  }

  // Breakfast morning windows
  if (/breakfast|7am|8am|9am|am weekdays|am$/.test(tw)) {
    set.add("breakfast");
  }

  // Lunch + dinner string
  if (/lunch \+ dinner|lunch and dinner|all day weekdays/.test(tw)) {
    set.add("lunch");
    set.add("dinner");
  }

  // After-11:30am brunch logic
  if (/after 11:30am|after 11am/.test(tw)) {
    set.add("breakfast");
    set.add("lunch");
  }

  // 12pm-8pm (Press Burger) → lunch + dinner
  if (/12pm-8pm|12-8pm/.test(tw)) {
    set.add("lunch");
    set.add("dinner");
  }

  // 9-11pm / 10:30pm-close → late_night
  if (/9-11pm|9-10:30pm/.test(tw)) {
    set.add("late_night");
  }

  // If nothing inferred, default to dinner (most deals)
  if (set.size === 0) set.add("dinner");

  // Stable ordering
  const order = ["breakfast", "lunch", "dinner", "late_night"];
  return order.filter((m) => set.has(m));
}

const deals = rows.map((r, i) => {
  const obj = {};
  for (const k of Object.keys(idx)) obj[k] = (r[idx[k]] || "").trim();
  const { days, oneTimeDate } = normalizeDays(obj.Day);
  const meals = inferMeals(obj);
  return {
    id: i + 1,
    day: obj.Day,
    days,
    oneTimeDate,
    restaurant: obj.Restaurant,
    neighborhood: obj.Neighborhood,
    deal: obj.Deal,
    timeWindow: obj.Time_Window,
    price: obj.Price,
    cuisine: obj.Cuisine,
    category: obj.Category,
    sourceUrl: obj.Source_URL,
    verified: (obj.Verified || "").toLowerCase() === "yes",
    notes: obj.Notes,
    meals,
  };
});

// Sanity stats
const mealCounts = { breakfast: 0, lunch: 0, dinner: 0, late_night: 0 };
const dayCounts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
const nbhdSet = new Set();
const categorySet = new Set();
for (const d of deals) {
  for (const m of d.meals) mealCounts[m]++;
  for (const day of d.days) dayCounts[day]++;
  nbhdSet.add(d.neighborhood);
  categorySet.add(d.category);
}

console.error("Deals:", deals.length);
console.error("Meals:", mealCounts);
console.error("Days:", dayCounts);
console.error("Neighborhoods:", nbhdSet.size);
console.error("Categories:", [...categorySet].sort().join(", "));

const banner = `// AUTO-GENERATED. Do not edit by hand.
// Regenerate with: node scripts/build-deals.mjs
`;

const ts = `${banner}
export type Meal = "breakfast" | "lunch" | "dinner" | "late_night";

export type Deal = {
  id: number;
  day: string;
  days: string[]; // ["Mon","Tue",...]
  oneTimeDate?: string; // YYYY-MM-DD
  restaurant: string;
  neighborhood: string;
  deal: string;
  timeWindow: string;
  price: string;
  cuisine: string;
  category: string;
  sourceUrl: string;
  verified: boolean;
  notes: string;
  meals: Meal[];
};

export const deals: Deal[] = ${JSON.stringify(deals, null, 2)};

export const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const ALL_MEALS: Meal[] = ["breakfast", "lunch", "dinner", "late_night"];
`;

writeFileSync(OUT_PATH, ts, "utf8");
console.error("Wrote", OUT_PATH);
