"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Deal, Meal } from "@/data/deals";
import { milesToNeighborhood } from "@/lib/distance";
import { isActiveNow, activeStatus, type ActiveStatus } from "@/lib/active";
import {
  clearPersonalDeals,
  loadPersonalDeals,
} from "@/lib/personalDeals";
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
import ScreenshotIntake from "./ScreenshotIntake";

const DealsMap = dynamic(() => import("./DealsMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] sm:h-[480px] rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-2)] flex items-center justify-center text-[var(--color-muted)] text-sm">
      Loading map…
    </div>
  ),
});

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

const APP_CATEGORIES = new Set(["Delivery App", "Voucher App"]);
const LAZY_CATEGORY_HINTS = new Set([
  "Chain",
  "Combo",
  "Macro-Friendly",
  "Coffee Deal",
  "Taco",
  "Taco Tuesday",
  "Lunch",
]);

const LAZY_FOOD_SIGNAL =
  /bagel|bowl|breakfast|burger|burrito|carne|cheeseburger|chicken|combo|dog|dumpling|fries|gyro|hot dog|karaage|meal|noodle|pizza|plate|protein|ramen|roll|salad|sandwich|shabu|slice|sushi|taco|tender|wing|wrap/;
const DINE_IN_ONLY_SIGNAL = /dine-?in/;
const DRINK_ONLY_SIGNAL = /beer|cocktail|draft|margarita|martini|oyster|sake|spritz|wine/;
const GOING_OUT_CATEGORIES = new Set([
  "AYCE",
  "AYCE/Lunch",
  "Brunch",
  "Drink Deal",
  "Happy Hour",
  "Late Night",
  "Set Menu",
]);

const GEO_STORAGE_KEY = "la-eats:user-coords";

type UserCoords = { lat: number; lng: number };
type Mode = "out" | "lazy";
type SortMode = "best" | "price" | "distance";
type CadenceFilter = "all" | "day-specific" | "everyday";
type QuickFilter =
  | "all"
  | "cheap_protein"
  | "under_10"
  | "open_now"
  | "solo"
  | "pickup"
  | "walkable"
  | "drive_thru"
  | "app_deals"
  | "date"
  | "late_night";

const SORTS: { key: SortMode; label: string }[] = [
  { key: "best", label: "Best today" },
  { key: "price", label: "Cheapest" },
  { key: "distance", label: "Near me" },
];

const CADENCE_FILTERS: { key: CadenceFilter; label: string }[] = [
  { key: "all", label: "All deals" },
  { key: "day-specific", label: "Today specials" },
  { key: "everyday", label: "Everyday prices" },
];

const QUICK_FILTERS: { key: QuickFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "cheap_protein", label: "Cheap protein" },
  { key: "under_10", label: "Under $10" },
  { key: "open_now", label: "Open now" },
  { key: "solo", label: "Solo meal" },
  { key: "pickup", label: "Pickup" },
  { key: "walkable", label: "Walkable" },
  { key: "drive_thru", label: "Drive-thru" },
  { key: "app_deals", label: "App deals" },
  { key: "date", label: "Date spot" },
  { key: "late_night", label: "Late night" },
];

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

function daysFromToday(iso: string): number {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  const target = new Date(y, m - 1, d);
  const today = new Date();
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function isExpired(deal: Deal): boolean {
  const exp = deal.expires || deal.oneTimeDate;
  if (!exp) return false;
  return daysFromToday(exp) < 0;
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

// Display-friendly price: if Price column is just a tier ($/$$/$$$) or empty,
// pull the lowest dollar amount from the deal text instead so the badge isn't useless.
function displayPrice(deal: Deal): string {
  const p = (deal.price || "").trim();
  const isTier = p === "" || p === "$" || p === "$$" || p === "$$$";
  if (!isTier) return p;
  const matches = [...(deal.deal || "").matchAll(/\$\s?(\d+(?:\.\d{1,2})?)/g)];
  if (matches.length === 0) return p || "—";
  const nums = matches.map((m) => parseFloat(m[1])).filter((n) => !isNaN(n) && n > 0);
  if (nums.length === 0) return p || "—";
  const lo = Math.min(...nums);
  return `From $${lo % 1 === 0 ? lo.toFixed(0) : lo.toFixed(2)}`;
}

// Render deal text with $ amounts emphasized in the accent color.
function renderDealText(text: string): React.ReactNode {
  if (!text) return null;
  const parts = text.split(/(\$\s?\d+(?:\.\d{1,2})?)/g);
  return parts.map((part, i) => {
    if (/^\$\s?\d/.test(part)) {
      return (
        <span key={i} className="font-semibold text-[var(--color-clay)]">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function dealText(deal: Deal): string {
  return `${deal.restaurant} ${deal.cuisine} ${deal.category} ${deal.deal} ${deal.timeWindow} ${deal.notes} ${
    deal.traits?.join(" ") ?? ""
  }`.toLowerCase();
}

function hasTrait(deal: Deal, trait: string): boolean {
  return (deal.traits ?? []).some((t) => t.toLowerCase() === trait);
}

function isUnderTen(deal: Deal): boolean {
  return priceValue(deal.price) <= 10 || hasTrait(deal, "under $10");
}

function isCheapProtein(deal: Deal): boolean {
  return (
    hasTrait(deal, "cheap protein") ||
    (priceValue(deal.price) <= 15 &&
      /wing|chicken|burger|taco|pho|bbq|sushi|shabu|oyster|protein|carne|steak|kbbq/.test(dealText(deal)))
  );
}

function isSoloMeal(deal: Deal): boolean {
  return (
    hasTrait(deal, "solo meal") ||
    /chain|combo|lunch|taco|burger|pho|delivery|first order|sandwich|wings/.test(dealText(deal))
  );
}

function hasLazyFoodSignal(deal: Deal): boolean {
  return LAZY_FOOD_SIGNAL.test(dealText(deal));
}

function isPickupDeal(deal: Deal): boolean {
  return hasTrait(deal, "pickup") || /pickup|online order|to-go|takeout|in-app|\bapp\b/.test(dealText(deal));
}

function isWalkableDeal(deal: Deal): boolean {
  return (
    hasTrait(deal, "walkable") ||
    (!APP_CATEGORIES.has(deal.category) && isUnderTen(deal) && hasLazyFoodSignal(deal))
  );
}

function isDriveThruDeal(deal: Deal): boolean {
  return (
    hasTrait(deal, "drive-thru") ||
    /drive.?thru|drive.?through|in-n-out|checkers|rally|chili|red robin|tom's jr|burger/.test(dealText(deal))
  );
}

function isDateSpot(deal: Deal): boolean {
  return (
    hasTrait(deal, "date spot") ||
    /wine|cocktail|french|steak|sushi|rooftop|prix fixe|voucher|brunch|italian|oyster|date/.test(dealText(deal))
  );
}

function passesQuickFilter(deal: Deal, filter: QuickFilter): boolean {
  if (filter === "all") return true;
  if (filter === "cheap_protein") return isCheapProtein(deal);
  if (filter === "under_10") return isUnderTen(deal);
  if (filter === "open_now") return isActiveNow(deal.timeWindow);
  if (filter === "solo") return isSoloMeal(deal);
  if (filter === "pickup") return isPickupDeal(deal);
  if (filter === "walkable") return isWalkableDeal(deal);
  if (filter === "drive_thru") return isDriveThruDeal(deal);
  if (filter === "app_deals") return deal.category === "Delivery App";
  if (filter === "date") return isDateSpot(deal);
  if (filter === "late_night") return deal.meals.includes("late_night");
  return true;
}

function isLazyDeal(deal: Deal): boolean {
  if (deal.category === "Delivery App") return true;
  if (deal.category === "Voucher App") return false;
  if (hasTrait(deal, "pickup") || hasTrait(deal, "drive-thru") || hasTrait(deal, "walkable")) return true;
  if (DINE_IN_ONLY_SIGNAL.test(dealText(deal))) return false;
  if (GOING_OUT_CATEGORIES.has(deal.category)) return false;
  if (DRINK_ONLY_SIGNAL.test(dealText(deal)) && !hasLazyFoodSignal(deal)) return false;
  if (LAZY_CATEGORY_HINTS.has(deal.category) && hasLazyFoodSignal(deal)) return true;
  return (
    isPickupDeal(deal) ||
    isDriveThruDeal(deal) ||
    (isSoloMeal(deal) && hasLazyFoodSignal(deal) && (isUnderTen(deal) || isCheapProtein(deal)))
  );
}

function bestValueScore(deal: Deal, miles: number | null, mode: Mode): number {
  const price = priceValue(deal.price);
  let score = 48;

  if (price <= 1) score += 24;
  else if (price <= 5) score += 20;
  else if (price <= 10) score += 16;
  else if (price <= 15) score += 10;
  else if (price <= 25) score += 4;
  else if (price >= 999) score -= mode === "lazy" ? 2 : 10;

  if (isActiveNow(deal.timeWindow)) score += 10;
  else score -= 5;
  if (isCheapProtein(deal)) score += 8;
  if (isUnderTen(deal)) score += 5;
  if (isSoloMeal(deal)) score += 3;
  if (mode === "lazy" && isPickupDeal(deal)) score += 5;
  if (mode === "lazy" && isDriveThruDeal(deal)) score += 4;
  if (mode === "lazy" && isWalkableDeal(deal)) score += 4;
  if (deal.confidence === "verified") score += 6;
  if (deal.confidence === "ad-only") score += mode === "lazy" ? -3 : -2;
  if (deal.confidence === "unconfirmed") score -= 3;
  if (deal.lastVerified) {
    const age = -daysFromToday(deal.lastVerified);
    if (age <= 14) score += 4;
    else if (age > 45) score -= 7;
  } else {
    score -= 2;
  }
  if (miles != null) {
    if (miles <= 2) score += 12;
    else if (miles <= 5) score += 8;
    else if (miles <= 10) score += 4;
    else if (miles > 15) score -= 8;
  }

  return Math.max(1, Math.min(99, Math.round(score)));
}

function dealHasPhysicalAddress(deal: Deal): boolean {
  if (APP_CATEGORIES.has(deal.category)) return false;
  if (!deal.neighborhood) return false;
  if (deal.neighborhood.startsWith("App")) return false;
  if (deal.neighborhood === "Various" || deal.neighborhood === "LA") return false;
  return true;
}

function mapsUrl(deal: Deal): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${deal.restaurant} ${deal.neighborhood} Los Angeles`
  )}`;
}

function shareText(deal: Deal, day: string): string {
  const parts: string[] = [];
  parts.push(`${deal.restaurant} (${deal.neighborhood})`);
  if (deal.deal) parts.push(deal.deal);
  const dayLabel = DAY_LONG[day] || day;
  parts.push(`${dayLabel}${deal.timeWindow ? ` · ${deal.timeWindow}` : ""}`);
  parts.push("via LA Eats — la-eats.vercel.app");
  return parts.join("\n");
}

function cadenceLabel(deal: Deal): string {
  return deal.cadence === "everyday" ? "everyday price" : "today special";
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
  const [sortMode, setSortMode] = useState<SortMode>("best");
  const [cadenceFilter, setCadenceFilter] = useState<CadenceFilter>("all");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [activeTraits, setActiveTraits] = useState<string[]>([]);
  const [coords, setCoords] = useState<UserCoords | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "pending" | "granted" | "denied">("idle");
  const [mapView, setMapView] = useState(false);
  const [visibleMapIds, setVisibleMapIds] = useState<Array<string | number> | null>(null);
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [personalDeals, setPersonalDeals] = useState<Deal[]>([]);
  const [nowTick, setNowTick] = useState(0);

  // Macros state
  const [targets, setTargets] = useState<Targets | null>(null);
  const [consumed, setConsumed] = useState<Consumed>({ cal: 0, protein: 0 });
  const [targetsOpen, setTargetsOpen] = useState(false);
  const [fitsToday, setFitsToday] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Hydrate day/meal/date + restore cached location.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDay(todayShortDay());
    setMeal(currentMeal());
    setDateLabel(todayLongString());
    setHydrated(true);
    setPersonalDeals(loadPersonalDeals());

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
    setGeoStatus("idle");
  }, []);

  function requestLocation() {
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
    } else {
      setGeoStatus("denied");
    }
  }

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTargets(loadTargets());
    setConsumed(loadConsumed());
  }, []);

  // Re-tick "Open now" labels every minute
  useEffect(() => {
    const t = window.setInterval(() => setNowTick((n) => n + 1), 60000);
    return () => window.clearInterval(t);
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
      setToast(`Tracked ${deal.macros.cal} cal · ${deal.macros.protein}g protein`);
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

  // Merge: personal deals on top, curated below
  const mergedDeals = useMemo(() => {
    return [...personalDeals, ...allDeals];
  }, [personalDeals, allDeals]);

  // Expiry filter (runs BEFORE day/meal/category filtering)
  const unexpired = useMemo(() => {
    void nowTick;
    return mergedDeals.filter((d) => !isExpired(d));
  }, [mergedDeals, nowTick]);

  const neighborhoods = useMemo(() => {
    const set = new Set<string>();
    for (const d of unexpired) set.add(d.neighborhood);
    return ["All", ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [unexpired]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const d of unexpired) {
      const isAppCat = APP_CATEGORIES.has(d.category);
      if (mode === "lazy" && !isLazyDeal(d)) continue;
      if (mode === "out" && isAppCat) continue;
      set.add(d.category);
    }
    return ["All", ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [unexpired, mode]);

  const allTraits = useMemo(() => {
    const set = new Set<string>();
    for (const d of unexpired) {
      for (const t of d.traits || []) set.add(t);
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [unexpired]);

  // Base filter (before "fits today" macro filter).
  const baseFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const traitSet = new Set(activeTraits);
    return unexpired.filter((d) => {
      const isAppCat = APP_CATEGORIES.has(d.category);
      if (mode === "lazy" && !isLazyDeal(d)) return false;
      if (mode === "out" && isAppCat) return false;

      if (!d.days.includes(day)) return false;
      if (meal !== "all" && !d.meals.includes(meal)) return false;
      if (cadenceFilter !== "all" && d.cadence !== cadenceFilter) return false;
      if (neighborhood !== "All" && d.neighborhood !== neighborhood) return false;
      if (category !== "All" && d.category !== category) return false;
      if (!passesQuickFilter(d, quickFilter)) return false;
      if (traitSet.size > 0) {
        const ts = d.traits || [];
        if (!ts.some((t) => traitSet.has(t))) return false;
      }
      if (q) {
        const hay = `${dealText(d)} ${d.neighborhood}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [unexpired, day, meal, neighborhood, category, query, mode, quickFilter, activeTraits, cadenceFilter]);

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

  // Per-deal distance (in miles) when we have user coords.
  const distancesById = useMemo(() => {
    const map = new Map<Deal["id"], number | null>();
    if (!coords) return map;
    for (const d of filtered) {
      const m = milesToNeighborhood(coords, d.neighborhood);
      map.set(d.id, m);
    }
    return map;
  }, [filtered, coords]);

  const distanceSortActive = !!coords;

  const sorted = useMemo(() => {
    if (sortMode === "distance" && distanceSortActive) {
      return [...filtered].sort((a, b) => {
        const ad = distancesById.get(a.id) ?? 999;
        const bd = distancesById.get(b.id) ?? 999;
        if (ad !== bd) return ad - bd;
        const pa = priceValue(a.price);
        const pb = priceValue(b.price);
        if (pa !== pb) return pa - pb;
        return a.restaurant.localeCompare(b.restaurant);
      });
    }

    if (sortMode === "price") {
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

    return [...filtered].sort((a, b) => {
      const ascore = bestValueScore(a, distancesById.get(a.id) ?? null, mode);
      const bscore = bestValueScore(b, distancesById.get(b.id) ?? null, mode);
      if (ascore !== bscore) return bscore - ascore;
      const aa = isActiveNow(a.timeWindow) ? 0 : 1;
      const bb = isActiveNow(b.timeWindow) ? 0 : 1;
      if (aa !== bb) return aa - bb;
      const pa = priceValue(a.price);
      const pb = priceValue(b.price);
      if (pa !== pb) return pa - pb;
      if (a.oneTimeDate && !b.oneTimeDate) return -1;
      if (!a.oneTimeDate && b.oneTimeDate) return 1;
      return a.restaurant.localeCompare(b.restaurant);
    });
  }, [filtered, sortMode, distanceSortActive, distancesById, mode]);

  // When map view is active, narrow the list to viewport
  const displayed = useMemo(() => {
    if (!mapView || !visibleMapIds) return sorted;
    const idSet = new Set(visibleMapIds);
    return sorted.filter((d) => idSet.has(d.id));
  }, [sorted, mapView, visibleMapIds]);

  const resultSections = useMemo(() => {
    if (cadenceFilter === "day-specific") {
      return [{ key: "day-specific", title: "Today specials", deals: displayed }];
    }
    if (cadenceFilter === "everyday") {
      return [{ key: "everyday", title: "Everyday prices", deals: displayed }];
    }
    return [
      {
        key: "day-specific",
        title: "Today specials",
        deals: displayed.filter((d) => d.cadence === "day-specific"),
      },
      {
        key: "everyday",
        title: "Everyday prices",
        deals: displayed.filter((d) => d.cadence === "everyday"),
      },
    ].filter((section) => section.deals.length > 0);
  }, [displayed, cadenceFilter]);

  const bestDealId = sortMode === "best" && !mapView ? displayed[0]?.id : undefined;

  function toggleTrait(t: string) {
    setActiveTraits((cur) =>
      cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]
    );
  }

  async function handleShare(deal: Deal) {
    const text = shareText(deal, day);
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share({
          title: deal.restaurant,
          text,
          url,
        });
        return;
      }
    } catch {
      // user cancelled or failed; fall through to clipboard
    }
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied");
    } catch {
      setToast("Couldn't copy");
    }
  }

  function handleIntakeSaved(list: Deal[]) {
    setPersonalDeals(list);
    setToast("Deal added");
  }

  function handleResetPersonalDeals() {
    clearPersonalDeals();
    setPersonalDeals([]);
    setToast("Personal deals cleared");
  }

  return (
    <>
      {/* Header */}
      <header className="px-5 sm:px-8 lg:px-12 pt-7 sm:pt-9 pb-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            <span>Los Angeles · Volume 01</span>
            <span suppressHydrationWarning>{dateLabel || " "}</span>
          </div>
          <div className="mt-3 flex items-start justify-between gap-3">
            <h1 className="font-serif text-5xl sm:text-6xl leading-[0.95] tracking-tight text-[var(--color-ink)]">
              LA Eats
            </h1>
            <div className="flex items-center gap-2 pt-2 shrink-0">
              <button
                type="button"
                onClick={() => setMapView((v) => !v)}
                aria-pressed={mapView}
                title="Toggle map view"
                className={[
                  "rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition",
                  mapView
                    ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
                    : "border-[var(--color-rule)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)]",
                ].join(" ")}
              >
                Map
              </button>
              <button
                type="button"
                onClick={() => setIntakeOpen(true)}
                title="Add deal from screenshot"
                className="rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] font-serif hover:bg-[var(--color-clay-dark)] transition"
              >
                + Add deal
              </button>
            </div>
          </div>
          <p className="mt-2 text-[14px] sm:text-[15px] text-[var(--color-ink-2)] max-w-xl leading-relaxed">
            Today&rsquo;s best food deals, ranked by value, timing, distance, and
            how much effort they take.
          </p>

          {hydrated && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              {targets ? (
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  <span className="font-serif italic normal-case tracking-normal text-[15px] text-[var(--color-ink-2)]">
                    Tracked today
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
                  Track calories + protein
                </span>
              )}
              <div className="flex items-center gap-3">
                {personalDeals.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetPersonalDeals}
                    className="text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)] underline decoration-[var(--color-rule)] underline-offset-2 hover:text-[var(--color-ink)] hover:decoration-[var(--color-ink)]"
                  >
                    Reset personal deals
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setTargetsOpen(true)}
                  className="text-2xs uppercase tracking-[0.18em] text-[var(--color-clay)] underline decoration-[var(--color-clay)]/30 underline-offset-2 hover:decoration-[var(--color-clay)]"
                >
                  {targets ? "Edit target" : "Set target"}
                </button>
              </div>
            </div>
          )}

          {hydrated && targets && (
            <div className="mt-3 space-y-1.5">
              <ProgressBar value={consumed.cal} target={targets.cal} />
              <ProgressBar value={consumed.protein} target={targets.protein} />
            </div>
          )}

          <div className="mt-4 h-px w-full bg-[var(--color-rule)]" />
        </div>
      </header>

      {/* Filters */}
      <section className="px-5 sm:px-8 lg:px-12 bg-[var(--color-paper)] border-b border-[var(--color-rule)]">
        <div className="mx-auto max-w-3xl py-3 sm:py-4 flex flex-col gap-3">
          {/* Mode toggle */}
          <div className="flex items-center justify-between gap-3">
            <ModeToggle
              mode={mode}
              onChange={(nextMode) => {
                setMode(nextMode);
                setCategory("All");
                setNeighborhood("All");
              }}
            />
            {distanceSortActive && (
              <span className="hidden sm:inline-flex items-center gap-2 text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-clay)]" />
                distance ready
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

          {distanceSortActive ? (
            <div className="sm:hidden flex items-center gap-2 text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-clay)]" />
              distance ready
              <button
                type="button"
                onClick={resetLocation}
                className="ml-1 underline decoration-[var(--color-rule)] underline-offset-2 hover:decoration-[var(--color-ink)]"
              >
                reset location
              </button>
            </div>
          ) : mode === "out" ? (
            <button
              type="button"
              onClick={requestLocation}
              className="sm:hidden self-start text-2xs uppercase tracking-[0.18em] text-[var(--color-clay)] underline decoration-[var(--color-clay)]/30 underline-offset-2"
            >
              use location
            </button>
          ) : null}

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

          {/* Meal tabs + target chip */}
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
                    ? "Only show deals that fit your remaining calories and protein"
                    : "Set a calories and protein target first"
                }
              >
                {targets ? "Fits target" : "Set target"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {SORTS.map((s) => {
              const active = s.key === sortMode;
              const disabled = s.key === "distance" && !distanceSortActive;
              return (
                <button
                  key={s.key}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    if (s.key === "distance" && !distanceSortActive) {
                      requestLocation();
                      return;
                    }
                    setSortMode(s.key);
                  }}
                  aria-pressed={active}
                  className={[
                    "shrink-0 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] transition border",
                    active
                      ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
                      : "border-[var(--color-rule)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)]",
                    disabled ? "opacity-60" : "",
                  ].join(" ")}
                >
                  {s.label}
                </button>
              );
            })}
            {!distanceSortActive && mode === "out" && (
              <button
                type="button"
                onClick={requestLocation}
                className="hidden sm:inline-flex shrink-0 rounded-full border border-[var(--color-rule)] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[var(--color-clay)] hover:border-[var(--color-clay)]"
              >
                use location
              </button>
            )}
            {!distanceSortActive && mode === "lazy" && (
              <button
                type="button"
                onClick={requestLocation}
                className="hidden sm:inline-flex shrink-0 rounded-full border border-[var(--color-rule)] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[var(--color-clay)] hover:border-[var(--color-clay)]"
              >
                nearby lazy
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {QUICK_FILTERS.map((f) => {
              const active = f.key === quickFilter;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setQuickFilter(f.key)}
                  aria-pressed={active}
                  className={[
                    "shrink-0 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] transition border",
                    active
                      ? "border-[var(--color-clay)] text-[var(--color-clay)] bg-[var(--color-paper-2)]"
                      : "border-[var(--color-rule)] text-[var(--color-muted)] hover:text-[var(--color-ink-2)]",
                  ].join(" ")}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {CADENCE_FILTERS.map((f) => {
              const active = f.key === cadenceFilter;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setCadenceFilter(f.key)}
                  aria-pressed={active}
                  className={[
                    "shrink-0 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] transition border",
                    active
                      ? "border-[var(--color-ink)] text-[var(--color-ink)] bg-[var(--color-paper-2)]"
                      : "border-[var(--color-rule)] text-[var(--color-muted)] hover:text-[var(--color-ink-2)]",
                  ].join(" ")}
                >
                  {f.label}
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

          {/* Traits row */}
          {allTraits.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
              {allTraits.map((t) => {
                const active = activeTraits.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTrait(t)}
                    aria-pressed={active}
                    className={[
                      "shrink-0 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] transition border",
                      active
                        ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
                        : "border-[var(--color-rule)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                );
              })}
              {activeTraits.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTraits([])}
                  className="ml-1 shrink-0 text-[10px] uppercase tracking-[0.2em] text-[var(--color-clay)] underline decoration-[var(--color-clay)]/30 underline-offset-2 hover:decoration-[var(--color-clay)]"
                >
                  Clear traits
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {mapView && (
        <section className="px-5 sm:px-8 lg:px-12 pt-5">
          <div className="mx-auto max-w-3xl">
            <DealsMap
              deals={sorted}
              userCoords={coords}
              onVisibleChange={setVisibleMapIds}
            />
            <p className="mt-2 text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              List below filtered to map viewport
            </p>
          </div>
        </section>
      )}

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
                ? `${displayed.length} of ${baseFiltered.length} fit`
                : `${displayed.length} ${displayed.length === 1 ? "spot" : "spots"}`}
            </span>
          </div>

          {displayed.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl text-[var(--color-ink-2)]">
                Nothing matches yet.
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Try a different day, meal, or clear the filters.
              </p>
            </div>
          ) : (
            <div className="space-y-9">
              {resultSections.map((section) => (
                <section key={section.key}>
                  {(cadenceFilter !== section.key || resultSections.length > 1) && (
                    <div className="mb-2 flex items-baseline justify-between gap-3 border-b border-[var(--color-rule)] pb-2">
                      <h3 className="text-2xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                        {section.title}
                      </h3>
                      <span className="text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                        {section.deals.length}
                      </span>
                    </div>
                  )}
                  <ul className="divide-y divide-[var(--color-rule)]">
                    {section.deals.map((d) => (
                      <DealCard
                        key={d.id}
                        deal={d}
                        miles={distancesById.get(d.id) ?? null}
                        showDistance={!!coords}
                        isRecommended={d.id === bestDealId}
                        valueScore={bestValueScore(d, distancesById.get(d.id) ?? null, mode)}
                        onEat={handleEatDeal}
                        onShare={handleShare}
                      />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-rule)] px-5 sm:px-8 lg:px-12 py-8 mt-4">
        <div className="mx-auto max-w-3xl flex flex-wrap items-center justify-between gap-3 text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
          <span>LA Eats · A field guide</span>
          <span>{allDeals.length} tracked deals</span>
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

      <ScreenshotIntake
        open={intakeOpen}
        onClose={() => setIntakeOpen(false)}
        onSaved={handleIntakeSaved}
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
  valueScore,
  onEat,
  onShare,
}: {
  deal: Deal;
  miles: number | null;
  showDistance: boolean;
  isRecommended: boolean;
  valueScore: number;
  onEat: (deal: Deal) => void;
  onShare: (deal: Deal) => void;
}) {
  const milesLabel =
    showDistance && miles != null ? `${miles.toFixed(1)} mi` : null;
  const showDirections = dealHasPhysicalAddress(deal);
  const status = activeStatus(deal.timeWindow, deal.category);
  const expiresSoon =
    deal.expires && daysFromToday(deal.expires) >= 0 && daysFromToday(deal.expires) <= 7;
  const stale =
    deal.lastVerified && -daysFromToday(deal.lastVerified) > 45;
  const isUnconfirmed =
    deal.confidence === "ad-only" || deal.confidence === "unconfirmed";

  return (
    <li className="py-6 first:pt-2">
      <article className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        <div className="pt-1">
          <RestaurantAvatar restaurant={deal.restaurant} size={52} />
        </div>
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <ActiveLabel status={status} />
            {isRecommended && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-clay)] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-clay)]">
                Best today · {valueScore}
              </span>
            )}
            {deal.oneTimeDate && (
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-clay)] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-paper)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-paper)]" />
                One day only · {formatOneTimeDate(deal.oneTimeDate)}
              </span>
            )}
            {expiresSoon && deal.expires && (
              <span className="inline-flex items-center rounded-full border border-[var(--color-clay)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-clay)]">
                ends {formatOneTimeDate(deal.expires)}
              </span>
            )}
            {deal.isPersonal && (
              <span className="inline-flex items-center rounded-full bg-[var(--color-paper-2)] border border-[var(--color-rule)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-2)]">
                Personal
              </span>
            )}
            {isUnconfirmed && (
              <span className="inline-flex items-center rounded-full bg-[var(--color-paper-2)] border border-[var(--color-rule)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Unconfirmed
              </span>
            )}
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
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
                {showDirections && (
                  <>
                    <span className="mx-1.5 text-[var(--color-rule)]">·</span>
                    <a
                      href={mapsUrl(deal)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[var(--color-clay)] underline decoration-[var(--color-clay)]/30 underline-offset-2 hover:decoration-[var(--color-clay)]"
                    >
                      Directions
                    </a>
                  </>
                )}
              </p>
            </div>
            <div className="shrink-0 text-right max-w-[8rem]">
              <span className="block font-serif text-[21px] sm:text-[24px] leading-none text-[var(--color-ink)] break-words">
                {displayPrice(deal)}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                price
              </span>
            </div>
          </div>

          <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-2)]">
            {renderDealText(deal.deal)}
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
            {deal.cuisine && <Tag>{deal.cuisine}</Tag>}
            {deal.category && <Tag>{deal.category}</Tag>}
            <Tag>{cadenceLabel(deal)}</Tag>
            {(deal.traits || []).map((t) => (
              <TraitChip key={t}>{t}</TraitChip>
            ))}
            {!deal.verified && !deal.isPersonal && (
              <span className="inline-flex items-center rounded-full border border-[var(--color-rule)] px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                unverified
              </span>
            )}
            {deal.lastVerified && (
              <span className="inline-flex items-center rounded-full border border-[var(--color-rule)] px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                {stale ? "stale" : "verified"} {formatOneTimeDate(deal.lastVerified)}
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
                Track meal
              </button>
            )}
            <button
              type="button"
              onClick={() => onShare(deal)}
              className="rounded-full border border-[var(--color-rule)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--color-ink-2)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition"
              aria-label="Share this deal"
            >
              Share
            </button>
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

function TraitChip({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-paper-2)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
      {children}
    </span>
  );
}

function ActiveLabel({ status }: { status: ActiveStatus }) {
  if (status.kind === "open") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e4f1e2] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[#2c5b2a]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2c5b2a]" />
        Open now
      </span>
    );
  }
  if (status.kind === "opens") {
    return (
      <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
        {status.label}
      </span>
    );
  }
  if (status.kind === "always") {
    return (
      <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
        Always on
      </span>
    );
  }
  return null;
}
