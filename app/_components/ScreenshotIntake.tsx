"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Deal } from "@/data/deals";
import {
  appendPersonalDeal,
  dealFromParsed,
  type ParsedDeal,
} from "@/lib/personalDeals";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: (list: Deal[]) => void;
};

type Stage = "pick" | "parsing" | "edit" | "error";

export default function ScreenshotIntake({ open, onClose, onSaved }: Props) {
  if (!open) return null;
  return <IntakeBody onClose={onClose} onSaved={onSaved} />;
}

function IntakeBody({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: (list: Deal[]) => void;
}) {
  const [stage, setStage] = useState<Stage>("pick");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedDeal | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Pick an image file.");
      setStage("error");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Image too large (max 4MB).");
      setStage("error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);

    setStage("parsing");
    setError(null);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/parse-deal", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Couldn't parse — try again or add manually");
        setStage("error");
        return;
      }
      setParsed(json.data as ParsedDeal);
      setStage("edit");
    } catch {
      setError("Couldn't parse — try again or add manually");
      setStage("error");
    }
  }

  function saveDeal() {
    if (!parsed) return;
    const deal = dealFromParsed(parsed);
    const list = appendPersonalDeal(deal);
    onSaved(list);
    onClose();
  }

  function updateField<K extends keyof ParsedDeal>(k: K, v: ParsedDeal[K]) {
    if (!parsed) return;
    setParsed({ ...parsed, [k]: v });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Add deal from screenshot"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[var(--color-ink)]/40 backdrop-blur-sm"
      />
      <div
        className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-[var(--color-paper)] border-t border-[var(--color-rule)] sm:border sm:rounded-2xl sm:shadow-2xl px-6 sm:px-7 pt-6 pb-7"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.75rem)" }}
      >
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-ink)]">
            Add a deal
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
          Drop a screenshot of an Instagram ad, story, or post. We&rsquo;ll pull
          out the details. You can correct anything before saving.
        </p>

        {stage === "pick" && (
          <label className="mt-6 flex flex-col items-center justify-center gap-3 border border-dashed border-[var(--color-rule)] rounded-xl px-6 py-10 text-center cursor-pointer hover:border-[var(--color-ink)] transition">
            <span className="font-serif text-xl text-[var(--color-ink-2)]">
              Pick a screenshot
            </span>
            <span className="text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              PNG, JPG · up to 4MB
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </label>
        )}

        {stage === "parsing" && (
          <div className="mt-6 flex flex-col items-center gap-3 py-6">
            {preview && <PreviewImg src={preview} />}
            <p className="text-[13px] text-[var(--color-muted)] italic">
              Reading the image…
            </p>
          </div>
        )}

        {stage === "error" && (
          <div className="mt-6 space-y-4">
            {preview && <PreviewImg src={preview} />}
            <p className="text-[13px] text-[var(--color-clay-dark)] text-center">
              {error || "Couldn't parse — try again or add manually."}
            </p>
            <div className="flex justify-center gap-3">
              <label className="rounded-full border border-[var(--color-rule)] px-4 py-2 text-sm uppercase tracking-[0.16em] text-[var(--color-ink-2)] hover:border-[var(--color-ink)] cursor-pointer">
                Try again
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  setParsed({
                    restaurant: null,
                    deal: null,
                    day: null,
                    timeWindow: null,
                    price: null,
                    neighborhood: null,
                    cuisine: null,
                    category: null,
                    sourceHandle: null,
                    notes: null,
                  });
                  setStage("edit");
                }}
                className="rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] px-4 py-2 text-sm uppercase tracking-[0.16em] font-serif"
              >
                Add manually
              </button>
            </div>
          </div>
        )}

        {stage === "edit" && parsed && (
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Restaurant"
                value={parsed.restaurant ?? ""}
                onChange={(v) => updateField("restaurant", v)}
                full
              />
              <Field
                label="Neighborhood"
                value={parsed.neighborhood ?? ""}
                onChange={(v) => updateField("neighborhood", v)}
              />
              <Field
                label="Day"
                value={parsed.day ?? ""}
                onChange={(v) => updateField("day", v)}
              />
              <Field
                label="Time window"
                value={parsed.timeWindow ?? ""}
                onChange={(v) => updateField("timeWindow", v)}
              />
              <Field
                label="Price"
                value={parsed.price ?? ""}
                onChange={(v) => updateField("price", v)}
              />
              <Field
                label="Cuisine"
                value={parsed.cuisine ?? ""}
                onChange={(v) => updateField("cuisine", v)}
              />
              <Field
                label="Category"
                value={parsed.category ?? ""}
                onChange={(v) => updateField("category", v)}
              />
              <Field
                label="IG handle"
                value={parsed.sourceHandle ?? ""}
                onChange={(v) => updateField("sourceHandle", v)}
              />
            </div>
            <Field
              label="Deal"
              value={parsed.deal ?? ""}
              onChange={(v) => updateField("deal", v)}
              full
              textarea
            />
            <Field
              label="Notes"
              value={parsed.notes ?? ""}
              onChange={(v) => updateField("notes", v)}
              full
              textarea
            />

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
                onClick={saveDeal}
                disabled={!parsed.restaurant}
                className="rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-2 text-sm uppercase tracking-[0.16em] font-serif disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-clay-dark)] transition"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewImg({ src }: { src: string }) {
  return (
    <div className="relative max-h-48 w-auto rounded-lg border border-[var(--color-rule)] overflow-hidden">
      <Image
        src={src}
        alt="Selected screenshot"
        width={320}
        height={192}
        className="max-h-48 w-auto h-auto"
        unoptimized
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  full,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  full?: boolean;
  textarea?: boolean;
}) {
  return (
    <label className={["block", full ? "col-span-2" : ""].join(" ")}>
      <span className="block text-2xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className="mt-1.5 w-full rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-ink)] outline-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-ink)] outline-none"
        />
      )}
    </label>
  );
}
