"use client";

import { useEffect, useState } from "react";

export type Targets = { cal: number; protein: number };
export type Consumed = { cal: number; protein: number };

export const DEFAULT_TARGETS: Targets = { cal: 2400, protein: 180 };

const TARGETS_KEY = "la-eats:macro-targets";
const CONSUMED_PREFIX = "la-eats:consumed:";

export function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${CONSUMED_PREFIX}${y}-${m}-${day}`;
}

export function loadTargets(): Targets | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(TARGETS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Targets;
    if (
      parsed &&
      typeof parsed.cal === "number" &&
      typeof parsed.protein === "number"
    ) {
      return parsed;
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveTargets(t: Targets) {
  try {
    localStorage.setItem(TARGETS_KEY, JSON.stringify(t));
  } catch {
    // ignore
  }
}

export function loadConsumed(): Consumed {
  if (typeof window === "undefined") return { cal: 0, protein: 0 };
  try {
    const raw = localStorage.getItem(todayKey());
    if (!raw) return { cal: 0, protein: 0 };
    const parsed = JSON.parse(raw) as Consumed;
    if (parsed && typeof parsed.cal === "number" && typeof parsed.protein === "number") {
      return parsed;
    }
  } catch {
    // ignore
  }
  return { cal: 0, protein: 0 };
}

export function saveConsumed(c: Consumed) {
  try {
    localStorage.setItem(todayKey(), JSON.stringify(c));
  } catch {
    // ignore
  }
}

export function resetConsumedToday() {
  try {
    localStorage.removeItem(todayKey());
  } catch {
    // ignore
  }
}

type Props = {
  open: boolean;
  onClose: () => void;
  initial: Targets;
  onSave: (t: Targets) => void;
  onResetToday: () => void;
  consumed: Consumed;
};

export default function MacroTargetsEditor(props: Props) {
  if (!props.open) return null;
  return <MacroTargetsForm {...props} />;
}

function MacroTargetsForm({
  onClose,
  initial,
  onSave,
  onResetToday,
  consumed,
}: Props) {
  const [cal, setCal] = useState<string>(String(initial.cal));
  const [protein, setProtein] = useState<string>(String(initial.protein));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const calNum = parseInt(cal, 10);
  const proteinNum = parseInt(protein, 10);
  const valid =
    Number.isFinite(calNum) &&
    Number.isFinite(proteinNum) &&
    calNum > 0 &&
    proteinNum > 0;

  function handleSave() {
    if (!valid) return;
    onSave({ cal: calNum, protein: proteinNum });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Macro targets"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[var(--color-ink)]/40 backdrop-blur-sm"
      />
      <div
        className="relative w-full sm:max-w-md bg-[var(--color-paper)] border-t border-[var(--color-rule)] sm:border sm:rounded-2xl sm:shadow-2xl px-6 sm:px-7 pt-6 pb-7"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.75rem)" }}
      >
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-ink)]">
            Daily macros
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            Close
          </button>
        </div>
        <p className="mt-2 text-[13px] text-[var(--color-muted)] leading-relaxed">
          Set your daily target. Tap &ldquo;I&rsquo;ll eat this&rdquo; on a card
          to add it to today&rsquo;s tally.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Calories
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              value={cal}
              onChange={(e) => setCal(e.target.value)}
              className="mt-2 w-full rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-2.5 text-lg font-serif text-[var(--color-ink)] focus:border-[var(--color-ink)] outline-none"
            />
          </label>
          <label className="block">
            <span className="block text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Protein (g)
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="mt-2 w-full rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-2.5 text-lg font-serif text-[var(--color-ink)] focus:border-[var(--color-ink)] outline-none"
            />
          </label>
        </div>

        <div className="mt-5 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-2)]/50 px-4 py-3">
          <div className="flex items-baseline justify-between text-[13px] text-[var(--color-ink-2)]">
            <span className="font-serif italic">Eaten today</span>
            <span className="font-serif">
              {consumed.cal} cal &middot; {consumed.protein}g
            </span>
          </div>
          <button
            type="button"
            onClick={onResetToday}
            className="mt-2 text-2xs uppercase tracking-[0.18em] text-[var(--color-clay)] underline decoration-[var(--color-clay)]/30 underline-offset-2 hover:decoration-[var(--color-clay)]"
          >
            Reset today
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!valid}
            className="rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-2 text-sm uppercase tracking-[0.16em] font-serif disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-clay-dark)] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
