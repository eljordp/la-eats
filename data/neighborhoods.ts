// Neighborhood centroids (lat/lng) for haversine distance.
// Keys match the cleaned form of the `neighborhood` field in `data/deals.ts`
// (parenthetical addresses are stripped at lookup time — see `lib/distance.ts`).
//
// Some entries in deals.ts are not real neighborhoods — they're chain/app
// indicators. Those resolve to `null` here, which signals "no distance".

export type Centroid = { lat: number; lng: number };

export const neighborhoods: Record<string, Centroid | null> = {
  // Core LA neighborhoods
  "DTLA": { lat: 34.0407, lng: -118.2468 },
  "K-Town": { lat: 34.0596, lng: -118.3033 },
  "Hollywood": { lat: 34.0928, lng: -118.3287 },
  "Silver Lake": { lat: 34.09, lng: -118.27 },
  "Echo Park": { lat: 34.078, lng: -118.2606 },
  "Los Feliz": { lat: 34.1083, lng: -118.2922 },
  "WeHo": { lat: 34.09, lng: -118.3617 },
  "West Hollywood": { lat: 34.09, lng: -118.3617 },
  "Santa Monica": { lat: 34.0195, lng: -118.4912 },
  "Venice": { lat: 33.985, lng: -118.4695 },
  "Highland Park": { lat: 34.1153, lng: -118.1923 },
  "Atwater Village": { lat: 34.118, lng: -118.2589 },
  "Eagle Rock": { lat: 34.1393, lng: -118.212 },
  "Mid-City": { lat: 34.0533, lng: -118.35 },
  "Culver City": { lat: 34.0211, lng: -118.3965 },
  "Beverly Hills": { lat: 34.0736, lng: -118.4004 },
  "Westwood": { lat: 34.0633, lng: -118.4424 },
  "Brentwood": { lat: 34.0596, lng: -118.4729 },
  "Palms": { lat: 34.0094, lng: -118.4234 },
  "Sawtelle": { lat: 34.044, lng: -118.4534 },
  "Little Tokyo": { lat: 34.05, lng: -118.239 },
  "Arts District": { lat: 34.0414, lng: -118.2364 },
  "Studio City": { lat: 34.1442, lng: -118.3958 },
  "Sherman Oaks": { lat: 34.1511, lng: -118.4493 },
  "Burbank": { lat: 34.1808, lng: -118.309 },
  "North Hollywood": { lat: 34.1722, lng: -118.3789 },
  "Glendale": { lat: 34.1425, lng: -118.2551 },
  "Tarzana": { lat: 34.1755, lng: -118.5536 },
  "El Segundo": { lat: 33.9192, lng: -118.4165 },
  "Manhattan Beach": { lat: 33.8847, lng: -118.4109 },
  "Torrance": { lat: 33.8358, lng: -118.3406 },
  "Long Beach": { lat: 33.7701, lng: -118.1937 },
  "Northridge": { lat: 34.2381, lng: -118.5301 },
  "USC Village": { lat: 34.0233, lng: -118.2858 },
  "Thai Town": { lat: 34.095, lng: -118.2933 },
  "West Adams": { lat: 34.0322, lng: -118.3203 },
  "South LA": { lat: 33.9181, lng: -118.2823 },
  "Franklin Village": { lat: 34.1058, lng: -118.3214 },
  "Playa del Rey": { lat: 33.9544, lng: -118.4422 },
  "Fairfax": { lat: 34.0764, lng: -118.3613 },
  "Pasadena": { lat: 34.1478, lng: -118.1445 },
  "La Mirada": { lat: 33.9172, lng: -118.012 },
  "Fountain Valley": { lat: 33.7092, lng: -117.9536 },

  // Compound / context strings used as-is in deals.ts
  "DTLA/Little Tokyo": { lat: 34.0455, lng: -118.243 },
  "Westside": { lat: 34.025, lng: -118.45 },

  // Chain / app / multi-location entries — no single coordinate, no distance.
  "Chain (multiple LA)": null,
  "App (LA-wide)": null,
  "App (anywhere LA)": null,
  "App (first order)": null,
  "LA (multiple)": null,
  "Multiple LA": null,
  "Olympic Blvd / La Mirada / Fountain Valley": null,
  "South LA (953 W Florence Ave) + La Mirada": null,
};

/**
 * Strip parenthetical address context from a neighborhood string
 * so it matches a key in `neighborhoods`.
 *
 * Examples:
 *   "El Segundo (213 Richmond St)"        -> "El Segundo"
 *   "South LA (Figueroa & 132nd St)"      -> "South LA"
 *   "Tarzana (18448 Oxnard St)"           -> "Tarzana"
 *   "DTLA"                                -> "DTLA"
 */
export function cleanNeighborhood(n: string): string {
  return n.replace(/\s*\(.*?\)\s*/g, "").trim();
}

export function centroidFor(neighborhood: string): Centroid | null {
  const key = cleanNeighborhood(neighborhood);
  if (key in neighborhoods) return neighborhoods[key];
  // Fall back to the raw value in case it's already a compound key
  if (neighborhood in neighborhoods) return neighborhoods[neighborhood];
  return null;
}
