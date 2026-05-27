// Time-window parser. Returns whether a deal is currently active.

const ALL_DAY_HINTS = [
  "all day",
  "all night",
  "all open hours",
  "daily",
  "lunch + dinner",
  "lunch service",
  "lunch",
  "lunch hours",
  "after",
  "onward",
  "open-",
  "open ",
  "til ",
  "until ",
  "varies",
];

const ALWAYS_ON_HINTS = [
  "all day",
  "all night",
  "all open hours",
  "daily",
  "varies",
];

type Range = { startMin: number; endMin: number };

function parseClockToken(
  raw: string,
  assumedPeriod?: "am" | "pm"
): number | null {
  const t = raw.trim().toLowerCase();
  if (!t) return null;
  if (t === "noon") return 12 * 60;
  if (t === "midnight") return 0;
  if (t === "close") return 26 * 60;
  if (t === "until run out") return 24 * 60;

  const m = t.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!m) return null;

  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const period = (m[3] as "am" | "pm" | undefined) ?? assumedPeriod;

  if (period === "pm" && h !== 12) h += 12;
  if (period === "am" && h === 12) h = 0;
  return h * 60 + min;
}

function parseSegment(seg: string): Range[] {
  const cleaned = seg.trim().toLowerCase();
  const m = cleaned.match(
    /(\d{1,2}(?::\d{2})?\s*(?:am|pm)?|noon|midnight)\s*[-–]\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?|close|midnight|noon|until run out)/
  );
  if (!m) return [];
  const rightToken = m[2];
  const rightPeriodMatch = rightToken.match(/(am|pm)\s*$/);
  const inherited = rightPeriodMatch
    ? (rightPeriodMatch[1] as "am" | "pm")
    : undefined;

  const startMin = parseClockToken(m[1], inherited);
  const endMin = parseClockToken(rightToken, inherited);
  if (startMin == null || endMin == null) return [];

  const s = startMin;
  let e = endMin;
  if (e <= s) e += 24 * 60;
  return [{ startMin: s, endMin: e }];
}

export function parseRanges(timeWindow: string): Range[] {
  const parts = timeWindow.split(/\s*[/+,]\s*/);
  const ranges: Range[] = [];
  for (const p of parts) {
    ranges.push(...parseSegment(p));
  }
  return ranges;
}

export function isActiveNow(timeWindow: string, now: Date = new Date()): boolean {
  if (!timeWindow) return true;
  const lower = timeWindow.toLowerCase();
  if (ALL_DAY_HINTS.some((h) => lower.includes(h))) return true;

  const ranges = parseRanges(timeWindow);
  if (ranges.length === 0) return true;

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const nowMinPrevDay = nowMin + 24 * 60;

  for (const r of ranges) {
    if (nowMin >= r.startMin && nowMin <= r.endMin) return true;
    if (r.endMin > 24 * 60 && nowMinPrevDay <= r.endMin && nowMinPrevDay >= r.startMin) {
      return true;
    }
  }
  return false;
}

export type ActiveStatus =
  | { kind: "open" }
  | { kind: "opens"; label: string }
  | { kind: "always" }
  | { kind: "closed" }
  | { kind: "unknown" };

function formatHour(min: number): string {
  const m = min % (24 * 60);
  let h = Math.floor(m / 60);
  const mm = m % 60;
  const period = h >= 12 ? "pm" : "am";
  if (h === 0) h = 12;
  if (h > 12) h -= 12;
  if (mm === 0) return `${h}${period}`;
  return `${h}:${String(mm).padStart(2, "0")}${period}`;
}

export function activeStatus(
  timeWindow: string,
  category: string,
  now: Date = new Date()
): ActiveStatus {
  const tw = (timeWindow || "").toLowerCase();
  const cat = (category || "").toLowerCase();

  if (cat.includes("delivery") || cat.includes("voucher")) {
    return { kind: "always" };
  }
  if (!tw) return { kind: "unknown" };
  if (ALWAYS_ON_HINTS.some((h) => tw.includes(h))) {
    return { kind: "always" };
  }

  const ranges = parseRanges(timeWindow);
  if (ranges.length === 0) return { kind: "unknown" };

  const nowMin = now.getHours() * 60 + now.getMinutes();

  for (const r of ranges) {
    if (nowMin >= r.startMin && nowMin <= r.endMin) {
      return { kind: "open" };
    }
  }

  const future = ranges
    .filter((r) => r.startMin > nowMin && r.startMin < 24 * 60)
    .sort((a, b) => a.startMin - b.startMin);
  if (future.length > 0) {
    return { kind: "opens", label: `Opens ${formatHour(future[0].startMin)}` };
  }

  return { kind: "closed" };
}
