"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Deal, Meal } from "@/data/deals";
import { milesToNeighborhood } from "@/lib/distance";
import { isActiveNow } from "@/lib/active";
import RestaurantAvatar from "./RestaurantAvatar";
import MacroTargetsEditor, {
  DEFAULT_TARGETS,
  type Consumed,
  type Targets,
  loadConsumed,
  loadTargets,
  resetConsumedToday,
  saveConsumed,
  saveTargets,
} from "./MacroTargets";

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

const LAZY_CATEGORIES = new Set(["Delivery App", "Voucher App"]);

const GEO_STORAGE_KEY = "la-eats:user-coords";

type UserCoords = { lat: number; lng: number };
type Mode = "out" | "lazy";

function todayShortDay(): string {
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
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function priceValue(p: string): number {
  if (!p) return 99;
  const lower = p.toLowerCase().trim();
  if (lower.includes("varies") || lower.includes("cashback") || lower.includes("first order")) return 999;
  if (lower.includes("sandwich price")) return 15;
  const match = p.match(/\$\s?(\d+(?:\.\d+)?)/);
  if (match) return parseFloat(match[1]);
  if (lower === "$") return 8;
  if (lower === "$$") return 20;
  if (lower === "$$$") return 40;
  return 99;
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
  const [mode, setMode] = useState<Mode>("out");
  const [coords, setCoords] = useState<UserCoords | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "pending" | "granted" | "denied">("idle");

  // Macros state
  const [targets, setTargets] = useState<Targets | null>(null);
  const [consumed, setConsumed] = useState<Consumed>({ cal: 0, protein: 0 });
  const [targetsOpen, setTargetsOpen] = useState(false);
  const [fitsToday, setFitsToday] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Hydrate day/meal/date + try geolocation.
  useEffect(() => {
    setDay(todayShortDay());
    setMeal(currentMeal());
    setDateLabel(todayLongString());
    setHydrated(true);

    // Restore cached coords first (avoid re-prompt on refresh).
    try {
      const cached = sessionStorage.getItem(GEO_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as UserCoords;
        if (
          parsed &&
          typeof parsed.lat === "number" &&
          typeof parsed.lng === "number"
        ) {
          setCoords(parsed);
          setGeoStatus("granted");
          return;
        }
      }
    } catch {
      // ignore
    }

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      setGeoStatus("pending");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCoords(c);
          setGeoStatus("granted");
          try {
            sessionStorage.setItem(GEO_STORAGE_KEY, JSON.stringify(c));
          } catch {
            // ignore
          }
        },
        () => {
          setGeoStatus("denied");
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
      );
    }
  }, []);

  function resetLocation() {
    setCoords(null);
    setGeoStatus("denied");
    try {
      sessionStorage.removeItem(GEO_STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  // Hydrate macros from localStorage after mount.
  useEffect(() => {
    setTargets(loadTargets());
    setConsumed(loadConsumed());
  }, []);

  // Show a transient toast.
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const handleSaveTargets = useCallback((t: Targets) => {
    saveTargets(t);
    setTargets(t);
  }, []);

  const handleResetToday = useCallback(() => {
    resetConsumedToday();
    setConsumed({ cal: 0, protein: 0 });
  }, []);

  const handleEatDeal = useCallback(
    (deal: Deal) => {
      if (!deal.macros) return;
      const next = {
        cal: consumed.cal + deal.macros.cal,
        protein: consumed.protein + deal.macros.protein,
      };
      saveConsumed(next);
      setConsumed(next);
      setToast(`Added ${deal.macros.cal} cal · ${deal.macros.protein}g`);
    },
    [consumed.cal, consumed.protein]
  );

  function handleFitsTodayClick() {
    if (!targets) {
      setTargetsOpen(true);
      return;
    }
    setFitsToday((v) => !v);
  }

  const neighborhoods = useMemo(() => {
    const set = new Set<string>();
    for (const d of allDeals) set.add(d.neighborhood);
    return ["All", ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [allDeals]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const d of allDeals) {
      // Hide lazy categories from the dropdown — they're toggled via mode.
      if (LAZY_CATEGORIES.has(d.category)) continue;
      set.add(d.category);
    }
    return ["All", ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [allDeals]);

  // Base filter (before "fits today" macro filter).
  const baseFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allDeals.filter((d) => {
      // Mode filter: Lazy mode shows ONLY delivery/voucher; Going Out hides them.
      const isLazyCat = LAZY_CATEGORIES.has(d.category);
      if (mode === "lazy" && !isLazyCat) return false;
      if (mode === "out" && isLazyCat) return false;

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
  }, [allDeals, day, meal, neighborhood, category, query, mode]);

  const remaining = useMemo(() => {
    if (!targets) return null;
    return {
      cal: Math.max(0, targets.cal - consumed.cal),
      protein: Math.max(0, targets.protein - consumed.protein),
    };
  }, [targets, consumed]);

  const filtered = useMemo(() => {
    if (!fitsToday || !remaining) return baseFiltered;
    return baseFiltered.filter((d) => {
      if (!d.macros) return false;
      return (
        d.macros.cal <= remaining.cal &&
        d.macros.protein <= remaining.protein + 30
      );
    });
  }, [baseFiltered, fitsToday, remaining]);

  // Per-deal distance (in miles) — only when we have user coords and we're not in lazy mode.
  const distancesById = useMemo(() => {
    const map = new Map<number, number | null>();
    if (!coords) return map;
    for (const d of filtered) {
      const m = milesToNeighborhood(coords, d.neighborhood);
      map.set(d.id, m);
    }
    return map;
  }, [filtered, coords]);

  const smartSortActive = !!coords && mode === "out";

  const sorted = useMemo(() => {
    if (smartSortActive) {
      return [...filtered].sort((a, b) => {
        const ascore = compositeScore(a, distancesById.get(a.id) ?? null);
        const bscore = compositeScore(b, distancesById.get(b.id) ?? null);
        if (ascore !== bscore) return ascore - bscore;
        const pa = priceValue(a.price);
        const pb = priceValue(b.price);
        if (pa !== pb) return pa - pb;
        return a.restaurant.localeCompare(b.restaurant);
      });
    }

    if (mode === "lazy") {
      // Sort by active-now first, then cheapest.
      return [...filtered].sort((a, b) => {
        const aa = isActiveNow(a.timeWindow) ? 0 : 1;
        const bb = isActiveNow(b.timeWindow) ? 0 : 1;
        if (aa !== bb) return aa - bb;
        const pa = priceValue(a.price);
        const pb = priceValue(b.price);
        if (pa !== pb) return pa - pb;
        return a.restaurant.localeCompare(b.restaurant);
      });
    }

    // Default fallback (no location, going out): existing cheap-first.
    return [...filtered].sort((a, b) => {
      const pa = priceValue(a.price);
      const pb = priceValue(b.price);
      if (pa !== pb) return pa - pb;
      if (a.oneTimeDate && !b.oneTimeDate) return -1;
      if (!a.oneTimeDate && b.oneTimeDate) return 1;
      return a.restaurant.localeCompare(b.restaurant);
    });
  }, [filtered, smartSortActive, distancesById, mode]);

  return (
    <>
      {/* Header */}
      <header className="px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            <span>Los Angeles · Volume 01</span>
            <span suppressHydrationWarning>{dateLabel || " "}</span>
          </div>
          <h1 className="font-serif mt-4 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[var(--color-ink)]">
            LA Eats
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-[var(--color-ink-2)] max-w-xl leading-relaxed">
            LA&rsquo;s best food deals, sorted by day and meal. Pick a day,
            pick a meal, decide where to go.
          </p>

          {hydrated && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              {targets ? (
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  <span className="font-serif italic normal-case tracking-normal text-[15px] text-[var(--color-ink-2)]">
                    Today
                  </span>
                  <span>
                    <span className="text-[var(--color-ink)]">{consumed.cal}</span>{" "}
                    / {targets.cal} cal
                  </span>
                  <span className="text-[var(--color-rule)]">·</span>
                  <span>
                    <span className="text-[var(--color-ink)]">{consumed.protein}</span>{" "}
                    / {targets.protein}g protein
                  </span>
                </div>
              ) : (
                <span className="text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  Set a daily macro target
                </span>
              )}
              <button
                type="button"
                onClick={() => setTargetsOpen(true)}
                className="text-2xs uppercase tracking-[0.18em] text-[var(--color-clay)] underline decoration-[var(--color-clay)]/30 underline-offset-2 hover:decoration-[var(--color-clay)]"
              >
                {targets ? "Edit macros" : "Set macros"}
              </button>
            </div>
          )}

          {hydrated && targets && (
            <div className="mt-3 space-y-1.5">
              <ProgressBar value={consumed.cal} target={targets.cal} />
              <ProgressBar value={consumed.protein} target={targets.protein} />
            </div>
          )}

          <div className="mt-6 h-px w-full bg-[var(--color-rule)]" />
        </div>
      </header>

      {/* Filters */}
      <section className="px-5 sm:px-8 lg:px-12 sticky top-0 z-20 bg-[var(--color-paper)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-paper)]/80 border-b border-[var(--color-rule)]">
        <div className="mx-auto max-w-3xl py-3 sm:py-4 flex flex-col gap-3">
          {/* Mode toggle */}
          <div className="flex items-center justify-between gap-3">
            <ModeToggle mode={mode} onChange={setMode} />
            {smartSortActive && (
              <span className="hidden sm:inline-flex items-center gap-2 text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-clay)]" />
                Sorted for you
                <button
                  type="button"
                  onClick={resetLocation}
                  className="ml-1 underline decoration-[var(--color-rule)] underline-offset-2 hover:decoration-[var(--color-ink)]"
                >
                  reset
                </button>
              </span>
            )}
          </div>

          {smartSortActive && (
            <div className="sm:hidden flex items-center gap-2 text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-clay)]" />
              Sorted for you
              <button
                type="button"
                onClick={resetLocation}
                className="ml-1 underline decoration-[var(--color-rule)] underline-offset-2 hover:decoration-[var(--color-ink)]"
              >
                reset location
              </button>
            </div>
          )}

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

          {/* Meal tabs + Fits today chip */}
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
            <div className="ml-auto pl-2 shrink-0">
              <button
                type="button"
                onClick={handleFitsTodayClick}
                aria-pressed={fitsToday}
                className={[
                  "shrink-0 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition border",
                  fitsToday
                    ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
                    : "border-[var(--color-rule)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)]",
                ].join(" ")}
                title={
                  targets
                    ? "Only show deals that fit today's remaining macros"
                    : "Set a macro target first"
                }
              >
                Fits today
              </button>
            </div>
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
            {mode === "out" && (
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
            )}
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
          <div className="flex items-baseline justify-between mb-5 gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-ink)]">
              {hydrated ? DAY_LONG[day] : " "}
              {meal !== "all" && (
                <span className="text-[var(--color-muted)] font-serif italic">
                  {" "}
                  · {MEAL_LABEL[meal]}
                </span>
              )}
            </h2>
            <span className="text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)] text-right">
              {fitsToday && targets
                ? `${sorted.length} of ${baseFiltered.length} fit`
                : `${sorted.length} ${sorted.length === 1 ? "spot" : "spots"}`}
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
              {sorted.map((d, idx) => (
                <DealCard
                  key={d.id}
                  deal={d}
                  miles={distancesById.get(d.id) ?? null}
                  showDistance={mode === "out" && !!coords}
                  isRecommended={smartSortActive && idx === 0}
                  onEat={handleEatDeal}
                />
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

      {/* Suppress the unused-variable check on geoStatus (kept for future UI). */}
      {geoStatus === "pending" && <span className="sr-only">Locating you…</span>}

      <MacroTargetsEditor
        open={targetsOpen}
        onClose={() => setTargetsOpen(false)}
        initial={targets ?? DEFAULT_TARGETS}
        onSave={handleSaveTargets}
        onResetToday={handleResetToday}
        consumed={consumed}
      />

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] px-4 py-2 text-[12px] uppercase tracking-[0.16em] font-serif shadow-lg"
        >
          {toast}
        </div>
      )}
    </>
  );
}

function ProgressBar({ value, target }: { value: number; target: number }) {
  const pct = target > 0 ? Math.min(100, Math.round((value / target) * 100)) : 0;
  return (
    <div className="h-px w-full bg-[var(--color-rule)] relative overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-[var(--color-clay)]"
        style={{ width: `${pct}%` }}
        aria-hidden
      />
    </div>
  );
}

function compositeScore(deal: Deal, miles: number | null): number {
  const price = priceValue(deal.price);
  const dist = miles ?? 5; // chain/app or unknown -> treat as ~5 mi
  const active = isActiveNow(deal.timeWindow) ? 0 : 4;
  return price + dist * 2 + active;
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-[var(--color-rule)] p-0.5 bg-[var(--color-paper)]"
      role="tablist"
      aria-label="How you're eating"
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === "out"}
        onClick={() => onChange("out")}
        className={[
          "px-3.5 py-1.5 rounded-full text-[12px] uppercase tracking-[0.16em] transition font-serif",
          mode === "out"
            ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
            : "text-[var(--color-muted)] hover:text-[var(--color-ink-2)]",
        ].join(" ")}
      >
        Going out
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "lazy"}
        onClick={() => onChange("lazy")}
        className={[
          "px-3.5 py-1.5 rounded-full text-[12px] uppercase tracking-[0.16em] transition font-serif",
          mode === "lazy"
            ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
            : "text-[var(--color-muted)] hover:text-[var(--color-ink-2)]",
        ].join(" ")}
      >
        Lazy
      </button>
    </div>
  );
}

function DealCard({
  deal,
  miles,
  showDistance,
  isRecommended,
  onEat,
}: {
  deal: Deal;
  miles: number | null;
  showDistance: boolean;
  isRecommended: boolean;
  onEat: (deal: Deal) => void;
}) {
  const milesLabel =
    showDistance && miles != null ? `${miles.toFixed(1)} mi` : null;

  return (
    <li className="py-6 first:pt-2">
      <article className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2">
        <div className="pt-1">
          <RestaurantAvatar restaurant={deal.restaurant} size={52} />
        </div>
        <div className="min-w-0">
          {/* Recommended + One-time badges */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {isRecommended && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-clay)] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-clay)]">
                Recommended
              </span>
            )}
            {deal.oneTimeDate && (
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-clay)] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-paper)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-paper)]" />
                One day only · {formatOneTimeDate(deal.oneTimeDate)}
              </span>
            )}
          </div>

          <h3 className="font-serif text-[22px] sm:text-[26px] leading-tight text-[var(--color-ink)]">
            {deal.restaurant}
          </h3>
          <p className="mt-0.5 text-[13px] text-[var(--color-muted)]">
            {deal.neighborhood}
            {milesLabel && (
              <>
                <span className="mx-1.5 text-[var(--color-rule)]">·</span>
                <span className="text-[var(--color-ink-2)]">{milesLabel}</span>
              </>
            )}
          </p>

          <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-2)]">
            {deal.deal}
          </p>

          <p className="mt-2 text-[13px] text-[var(--color-muted)] italic">
            {deal.timeWindow}
          </p>

          {deal.macros && (
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              <span>~{deal.macros.cal} cal</span>
              <span className="text-[var(--color-rule)]">·</span>
              <span>{deal.macros.protein}g protein</span>
            </div>
          )}

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

          <div className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-2 text-[12px]">
            {deal.macros && (
              <button
                type="button"
                onClick={() => onEat(deal)}
                className="rounded-full border border-[var(--color-rule)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--color-ink-2)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition"
              >
                I&rsquo;ll eat this
              </button>
            )}
            {deal.sourceUrl && deal.sourceUrl.startsWith("http") ? (
              <a
                href={deal.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[var(--color-clay)] underline decoration-[var(--color-clay)]/30 underline-offset-2 hover:decoration-[var(--color-clay)]"
              >
                details
              </a>
            ) : deal.sourceUrl ? (
              <span className="text-[var(--color-muted)]">{deal.sourceUrl}</span>
            ) : null}
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
