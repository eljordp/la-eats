// Time-window parser. Returns whether a deal is currently active.
//
// Strategy: extract one or more (start, end) ranges from the human-written
// `timeWindow` string. If we can't find any, default to "active" (true) so
// vague entries don't get penalized.

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

type Range = { startMin: number; endMin: number }; // minutes from midnight; end may exceed 24h for next-day windows

/**
 * Parse a 12h clock token like "4pm", "10:30pm", "11am", "noon", "midnight"
 * into minutes from midnight. Returns null if it can't read it.
 *
 * `assumedPeriod` lets us inherit am/pm from the end of the range if the
 * start token doesn't carry one (e.g. "5-7pm" -> "5" inherits "pm").
 */
function parseClockToken(
  raw: string,
  assumedPeriod?: "am" | "pm"
): number | null {
  const t = raw.trim().toLowerCase();
  if (!t) return null;
  if (t === "noon") return 12 * 60;
  if (t === "midnight") return 0;
  if (t === "close") return 26 * 60; // ~2am next day
  if (t === "until run out") return 24 * 60;

  const m = t.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!m) return null;

  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const period = (m[3] as "am" | "pm" | undefined) ?? assumedPeriod;

  if (period === "pm" && h !== 12) h += 12;
  if (period === "am" && h === 12) h = 0;
  // If no period at all, assume the literal hour (rare).
  return h * 60 + min;
}

/**
 * Find ranges inside one segment of the time window, e.g. "4-7pm",
 * "10pm-close", "11:30am-2:30pm". Returns an array (usually length 1).
 */
function parseSegment(seg: string): Range[] {
  const cleaned = seg.trim().toLowerCase();
  // Match "a - b" with optional minutes/periods on each side.
  const m = cleaned.match(
    /(\d{1,2}(?::\d{2})?\s*(?:am|pm)?|noon|midnight)\s*[-–]\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?|close|midnight|noon|until run out)/
  );
  if (!m) return [];
  const rightToken = m[2];
  // Figure out the period on the right side, if any, so left can inherit it.
  const rightPeriodMatch = rightToken.match(/(am|pm)\s*$/);
  const inherited = rightPeriodMatch
    ? (rightPeriodMatch[1] as "am" | "pm")
    : undefined;

  const startMin = parseClockToken(m[1], inherited);
  const endMin = parseClockToken(rightToken, inherited);
  if (startMin == null || endMin == null) return [];

  const s = startMin;
  let e = endMin;
  // If end wraps past midnight (e.g. 10pm-2am parses as 22:00 -> 02:00).
  if (e <= s) e += 24 * 60;
  return [{ startMin: s, endMin: e }];
}

/**
 * Extract all (start, end) ranges from a time-window string.
 */
function parseRanges(timeWindow: string): Range[] {
  // Common case: split on "/" or "+" or ","
  const parts = timeWindow.split(/\s*[/+,]\s*/);
  const ranges: Range[] = [];
  for (const p of parts) {
    ranges.push(...parseSegment(p));
  }
  return ranges;
}

/**
 * Returns true if the given `now` (defaults to current time) falls inside the
 * deal's time window. Vague/unparseable windows return true.
 */
export function isActiveNow(timeWindow: string, now: Date = new Date()): boolean {
  if (!timeWindow) return true;
  const lower = timeWindow.toLowerCase();
  if (ALL_DAY_HINTS.some((h) => lower.includes(h))) return true;

  const ranges = parseRanges(timeWindow);
  if (ranges.length === 0) return true; // can't tell -> don't penalize

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const nowMinPrevDay = nowMin + 24 * 60; // for wrap-around windows

  for (const r of ranges) {
    if (nowMin >= r.startMin && nowMin <= r.endMin) return true;
    if (r.endMin > 24 * 60 && nowMinPrevDay <= r.endMin && nowMinPrevDay >= r.startMin) {
      return true;
    }
  }
  return false;
}
