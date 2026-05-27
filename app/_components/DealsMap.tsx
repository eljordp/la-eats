"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Deal } from "@/data/deals";
import { neighborhoods } from "@/data/neighborhoods";

type Coords = { lat: number; lng: number };

type Props = {
  deals: Deal[];
  userCoords: Coords | null;
  onVisibleChange: (visibleIds: Array<string | number>) => void;
};

const PIN_ICON = L.divIcon({
  className: "la-pin",
  html: `<span style="
    display:inline-block;
    width:18px;height:18px;border-radius:9999px;
    background:#a04a2a;
    border:2px solid #faf6ee;
    box-shadow:0 1px 3px rgba(0,0,0,0.35);"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const LA_CENTER: Coords = { lat: 34.05, lng: -118.3 };

function ViewportTracker({
  points,
  onVisible,
}: {
  points: Array<{ id: Deal["id"]; lat: number; lng: number }>;
  onVisible: (ids: Array<string | number>) => void;
}) {
  const map = useMap();

  useEffect(() => {
    function emit() {
      const bounds = map.getBounds();
      const visible = points
        .filter((p) => bounds.contains([p.lat, p.lng]))
        .map((p) => p.id);
      onVisible(visible);
    }
    let t: number | null = null;
    function onMove() {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(emit, 180);
    }
    map.on("moveend", onMove);
    map.on("zoomend", onMove);
    emit();
    return () => {
      map.off("moveend", onMove);
      map.off("zoomend", onMove);
      if (t) window.clearTimeout(t);
    };
  }, [map, points, onVisible]);

  return null;
}

function FitBounds({
  points,
}: {
  points: Array<{ lat: number; lng: number }>;
}) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 13);
      return;
    }
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 14 });
  }, [map, points]);
  return null;
}

export default function DealsMap({ deals, userCoords, onVisibleChange }: Props) {
  const points = useMemo(() => {
    const out: Array<{ id: Deal["id"]; deal: Deal; lat: number; lng: number }> = [];
    const seen = new Map<string, number>();
    for (const d of deals) {
      const c = neighborhoods[d.neighborhood];
      if (!c) continue;
      const n = (seen.get(d.neighborhood) || 0) + 1;
      seen.set(d.neighborhood, n);
      const offset = n === 1 ? 0 : (n - 1) * 0.0018;
      const angle = (n - 1) * 1.2;
      out.push({
        id: d.id,
        deal: d,
        lat: c.lat + Math.sin(angle) * offset,
        lng: c.lng + Math.cos(angle) * offset,
      });
    }
    return out;
  }, [deals]);

  return (
    <div className="w-full h-[420px] sm:h-[480px] rounded-lg border border-[var(--color-rule)] overflow-hidden">
      <MapContainer
        center={[LA_CENTER.lat, LA_CENTER.lng]}
        zoom={11}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        <ViewportTracker
          points={points.map((p) => ({ id: p.id, lat: p.lat, lng: p.lng }))}
          onVisible={onVisibleChange}
        />
        {userCoords && (
          <CircleMarker
            center={[userCoords.lat, userCoords.lng]}
            radius={7}
            pathOptions={{
              color: "#161311",
              fillColor: "#161311",
              fillOpacity: 0.9,
              weight: 2,
            }}
          >
            <Popup>You are here</Popup>
          </CircleMarker>
        )}
        {points.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={PIN_ICON}>
            <Popup>
              <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>
                  {p.deal.restaurant}
                </div>
                <div style={{ fontSize: 12, color: "#7a6f63" }}>
                  {p.deal.neighborhood}
                </div>
              </div>
              <div style={{ marginTop: 6, fontSize: 13 }}>{p.deal.deal}</div>
              <div style={{ marginTop: 4, fontSize: 12, color: "#7a6f63" }}>
                {p.deal.timeWindow} {p.deal.price ? `· ${p.deal.price}` : ""}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
