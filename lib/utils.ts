import type { ServiceLevel } from "@/data/hospitals";

const FULL_POSTCODE = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/;
const OUTCODE = /^[A-Za-z]{1,2}\d[A-Za-z\d]?$/;

export function looksLikeUKPostcode(input: string): boolean {
  const trimmed = input.trim();
  return FULL_POSTCODE.test(trimmed) || OUTCODE.test(trimmed);
}

export async function geocodeUKPostcode(
  input: string
): Promise<{ lat: number; lon: number } | null> {
  const trimmed = input.trim();
  const compact = trimmed.replace(/\s+/g, "").toUpperCase();
  if (compact.length < 2) return null;

  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(trimmed)}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.result) {
        return { lat: data.result.latitude, lon: data.result.longitude };
      }
    }
  } catch {
    // fall through to outcode attempt
  }

  const outcodeCandidate =
    compact.length > 4 ? compact.slice(0, compact.length - 3) : compact;
  try {
    const res = await fetch(
      `https://api.postcodes.io/outcodes/${encodeURIComponent(outcodeCandidate)}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.result) {
        return { lat: data.result.latitude, lon: data.result.longitude };
      }
    }
  } catch {
    // no match
  }

  return null;
}

export function haversineMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const serviceLevelMeta: Record<
  ServiceLevel,
  { label: string; dot: string; badge: string }
> = {
  "walk-in": {
    label: "Walk-in eye casualty",
    dot: "bg-status-walkin",
    badge: "border-status-walkin/30 bg-status-walkin/10 text-status-walkin",
  },
  booked: {
    label: "Booked emergency clinic",
    dot: "bg-status-booked",
    badge: "border-status-booked/30 bg-status-booked/10 text-status-booked",
  },
  none: {
    label: "No emergency eye service",
    dot: "bg-status-none",
    badge: "border-status-none/30 bg-status-none/10 text-status-none",
  },
};
