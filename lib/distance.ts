// Haversine distance + neighborhood resolution.
import { centroidFor } from "@/data/neighborhoods";

const EARTH_RADIUS_MI = 3958.8;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Haversine distance in miles between two lat/lng points.
 */
export function haversineMiles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const h =
    sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return EARTH_RADIUS_MI * c;
}

/**
 * Miles from user to a deal's neighborhood centroid.
 * Returns null if the neighborhood has no fixed location
 * (chain/app/multi) or isn't in the centroid map.
 */
export function milesToNeighborhood(
  user: { lat: number; lng: number },
  neighborhood: string
): number | null {
  const c = centroidFor(neighborhood);
  if (!c) return null;
  return haversineMiles(user, c);
}
