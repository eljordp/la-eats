"use client";

import { useState } from "react";
import { restaurantDomains } from "@/data/restaurant-domains";

// Warm earth tones — no neon, no candy.
const PALETTE = [
  { bg: "#8a4a2b", fg: "#faf6ee" }, // burnt sienna
  { bg: "#6e4a2a", fg: "#faf6ee" }, // saddle
  { bg: "#9a6a3a", fg: "#faf6ee" }, // ochre
  { bg: "#5a4a3a", fg: "#faf6ee" }, // walnut
  { bg: "#7a3a2a", fg: "#faf6ee" }, // brick
  { bg: "#4a4030", fg: "#faf6ee" }, // bark
  { bg: "#8a6a2a", fg: "#faf6ee" }, // mustard
  { bg: "#3e3a32", fg: "#faf6ee" }, // ink-brown
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function initialFor(name: string): string {
  const trimmed = name.replace(/^["']|["']$/g, "").trim();
  const first = trimmed.charAt(0).toUpperCase();
  return /[A-Z0-9]/.test(first) ? first : "·";
}

function colorFor(name: string): { bg: string; fg: string } {
  return PALETTE[hashString(name) % PALETTE.length];
}

type Props = {
  restaurant: string;
  size?: number;
};

export default function RestaurantAvatar({ restaurant, size = 52 }: Props) {
  const domain = restaurantDomains[restaurant];
  const [errored, setErrored] = useState(false);
  const showLogo = !!domain && !errored;
  const { bg, fg } = colorFor(restaurant);
  const initial = initialFor(restaurant);

  return (
    <div
      className="shrink-0 rounded-full overflow-hidden flex items-center justify-center font-serif border border-[var(--color-rule)]"
      style={{
        width: size,
        height: size,
        backgroundColor: showLogo ? "#faf6ee" : bg,
        color: fg,
      }}
      aria-hidden="true"
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span style={{ fontSize: Math.round(size * 0.42), lineHeight: 1 }}>
          {initial}
        </span>
      )}
    </div>
  );
}
