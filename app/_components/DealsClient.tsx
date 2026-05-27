"use client";

import { useEffect, useMemo, useState } from "react";
import type { Deal, Meal } from "@/data/deals";

const DAY_LONG: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const MEAL_LABEL: Record<Meal | "all", string> = {
  all: "All",
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  late_night: "Late Night",
};

const MEAL_KEYS: (Meal | "all")[] = ["all", "breakfast", "lunch", "dinner", "late_night"];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

function todayShortDay(): string {
  // JS getDay: 0 = Sun ... 6 = Sat
  const map = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return map[new Date().getDay()];
}

function currentMeal(): Meal {
  const h = new Date().getHours();
  if (h < 11) return "breakfast";
  if (h < 15) return "lunch";
  if (h < 21) return "dinner";
  return "late_night";
}

function todayLongString(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatOneTimeDate(iso: string): string {
  // iso = "YYYY-MM-DD"
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

type Props = {
  allDeals: Deal[];
};

export default function DealsClient({ allDeals }: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [day, setDay] = useState<string>("Mon");
  const [meal, setMeal] = useState<Meal | "all">("all");
  const [neighborhood, setNeighborhood] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState<string>("");
  const [dateLabel, setDateLabel] = useState<string>("");

  // Initialize day/meal/dateLabel client-side to avoid hydration mismatch.
  useEffect(() => {
    setDay(todayShortDay());
    setMeal(currentMeal());
    setDateLabel(todayLongString());
    setHydrated(true);
  }, []);

  const neighborhoods = useMemo(() => {
    const set = new Set<string>();
    for (const d of allDeals) set.add(d.neighborhood);
    return ["All", ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [allDeals]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const d of allDeals) set.add(d.category);
    return ["All", ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [allDeals]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allDeals.filter((d) => {
      if (!d.days.includes(day)) return false;
      if (meal !== "all" && !d.meals.includes(meal)) return false;
      if (neighborhood !== "All" && d.neighborhood !== neighborhood) return false;
      if (category !== "All" && d.category !== category) return false;
      if (q) {
        const hay = `${d.restaurant} ${d.cuisine} ${d.deal} ${d.neighborhood}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allDeals, day, meal, neighborhood, category, query]);

  // Sort: one-time first, then by price-ish heuristic (deals with explicit $ first), then alpha
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.oneTimeDate && !b.oneTimeDate) return -1;
      if (!a.oneTimeDate && b.oneTimeDate) return 1;
      return a.restaurant.localeCompare(b.restaurant);
    });
  }, [filtered]);

  return (
    <>
      {/* Header */}
      <header className="px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            <span>Los Angeles · Volume 01</span>
            <span suppressHydrationWarning>{dateLabel || " "}</span>
          </div>
          <h1 className="font-serif mt-4 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[var(--color-ink)]">
            LA Eats
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-[var(--color-ink-2)] max-w-xl leading-relaxed">
            LA&rsquo;s best food deals, sorted by day and meal. Pick a day,
            pick a meal, decide where to go.
          </p>
          <div className="mt-6 h-px w-full bg-[var(--color-rule)]" />
        </div>
      </header>

      {/* Filters */}
      <section className="px-5 sm:px-8 lg:px-12 sticky top-0 z-20 bg-[var(--color-paper)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-paper)]/80 border-b border-[var(--color-rule)]">
        <div className="mx-auto max-w-3xl py-3 sm:py-4 flex flex-col gap-3">
          {/* Day chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {DAYS.map((d) => {
              const active = d === day;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDay(d)}
                  aria-pressed={active}
                  className={[
                    "shrink-0 rounded-full px-4 py-2 text-sm transition",
                    active
                      ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                      : "border border-[var(--color-rule)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)]",
                  ].join(" ")}
                >
                  <span className="sm:hidden">{d}</span>
                  <span className="hidden sm:inline">{DAY_LONG[d]}</span>
                </button>
              );
            })}
          </div>

          {/* Meal tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar -mx-1 px-1">
            {MEAL_KEYS.map((m) => {
              const active = m === meal;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMeal(m)}
                  aria-pressed={active}
                  className={[
                    "shrink-0 px-3 py-1.5 text-[13px] uppercase tracking-[0.14em] transition border-b-2",
                    active
                      ? "border-[var(--color-clay)] text-[var(--color-ink)]"
                      : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink-2)]",
                  ].join(" ")}
                >
                  {MEAL_LABEL[m]}
                </button>
              );
            })}
          </div>

          {/* Secondary filters */}
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative flex-1 min-w-[10rem]">
              <span className="sr-only">Search</span>
              <input
                type="search"
                inputMode="search"
                placeholder="Search restaurant or cuisine"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full border border-[var(--color-rule)] bg-[var(--color-paper)] px-4 py-2 text-sm placeholder:text-[var(--color-muted)] focus:border-[var(--color-ink)] outline-none"
              />
            </label>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="rounded-full border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-2 text-sm text-[var(--color-ink-2)] focus:border-[var(--color-ink)] outline-none"
              aria-label="Neighborhood"
            >
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n === "All" ? "All neighborhoods" : n}
                </option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-full border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-2 text-sm text-[var(--color-ink-2)] focus:border-[var(--color-ink)] outline-none"
              aria-label="Category"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All categories" : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <main className="px-5 sm:px-8 lg:px-12 py-6 sm:py-8 flex-1">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-ink)]">
              {hydrated ? DAY_LONG[day] : " "}
              {meal !== "all" && (
                <span className="text-[var(--color-muted)] font-serif italic">
                  {" "}
                  · {MEAL_LABEL[meal]}
                </span>
              )}
            </h2>
            <span className="text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {sorted.length} {sorted.length === 1 ? "spot" : "spots"}
            </span>
          </div>

          {sorted.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl text-[var(--color-ink-2)]">
                Nothing matches yet.
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Try a different day, meal, or clear the filters.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--color-rule)]">
              {sorted.map((d) => (
                <DealCard key={d.id} deal={d} />
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-rule)] px-5 sm:px-8 lg:px-12 py-8 mt-4">
        <div className="mx-auto max-w-3xl flex flex-wrap items-center justify-between gap-3 text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
          <span>LA Eats · A field guide</span>
          <span>{allDeals.length} verified deals</span>
        </div>
      </footer>
    </>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  return (
    <li className="py-6 first:pt-2">
      <article className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2">
        <div className="min-w-0">
          {/* One-time badge */}
          {deal.oneTimeDate && (
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[var(--color-clay)] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-paper)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-paper)]" />
              One day only · {formatOneTimeDate(deal.oneTimeDate)}
            </div>
          )}

          <h3 className="font-serif text-[22px] sm:text-[26px] leading-tight text-[var(--color-ink)]">
            {deal.restaurant}
          </h3>
          <p className="mt-0.5 text-[13px] text-[var(--color-muted)]">
            {deal.neighborhood}
          </p>

          <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-2)]">
            {deal.deal}
          </p>

          <p className="mt-2 text-[13px] text-[var(--color-muted)] italic">
            {deal.timeWindow}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <Tag>{deal.cuisine}</Tag>
            <Tag>{deal.category}</Tag>
            {!deal.verified && (
              <span className="inline-flex items-center rounded-full border border-[var(--color-rule)] px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                unverified
              </span>
            )}
          </div>

          {deal.notes && (
            <p className="mt-3 text-[12.5px] text-[var(--color-muted)] leading-relaxed">
              {deal.notes}
            </p>
          )}

          <div className="mt-3 flex items-center gap-3 text-[12px]">
            <span className="text-[var(--color-muted)]/70 lowercase tracking-wide">
              macros · soon
            </span>
            <span className="text-[var(--color-rule)]">|</span>
            {deal.sourceUrl && deal.sourceUrl.startsWith("http") ? (
              <a
                href={deal.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[var(--color-clay)] underline decoration-[var(--color-clay)]/30 underline-offset-2 hover:decoration-[var(--color-clay)]"
              >
                details
              </a>
            ) : (
              <span className="text-[var(--color-muted)]">{deal.sourceUrl || "—"}</span>
            )}
          </div>
        </div>

        {/* Price tile */}
        <div className="text-right">
          <div className="inline-flex flex-col items-end">
            <span className="font-serif text-[22px] sm:text-[24px] leading-none text-[var(--color-ink)]">
              {deal.price || "—"}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
              price
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--color-rule)] px-2 py-0.5 text-[11px] tracking-wide text-[var(--color-ink-2)]">
      {children}
    </span>
  );
}
