"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Loader2, Check } from "lucide-react";
import { hospitals, serviceLevels, regions } from "@/data/hospitals";
import {
  serviceLevelMeta,
  looksLikeUKPostcode,
  geocodeUKPostcode,
  haversineMiles,
} from "@/lib/utils";
import HospitalCard from "@/components/HospitalCard";

type PostcodeStatus = "idle" | "loading" | "found" | "notfound";

const PAGE_SIZE = 20;

export default function DirectoryExplorer({
  initialQuery = "",
  initialServiceLevel = "All",
}: {
  initialQuery?: string;
  initialServiceLevel?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [serviceLevelFilter, setServiceLevelFilter] = useState<string[]>(
    initialServiceLevel !== "All" ? [initialServiceLevel] : ["walk-in", "booked"]
  );
  const [region, setRegion] = useState<string>("All");
  const [filtersOpen, setFiltersOpen] = useState(initialServiceLevel !== "All");
  const [postcodeCoords, setPostcodeCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [postcodeStatus, setPostcodeStatus] = useState<PostcodeStatus>("idle");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const requestId = useRef(0);

  function toggleServiceLevel(level: string) {
    setServiceLevelFilter((current) =>
      current.includes(level)
        ? current.filter((l) => l !== level)
        : [...current, level]
    );
  }

  useEffect(() => {
    const trimmed = query.trim();
    if (!looksLikeUKPostcode(trimmed)) {
      setPostcodeCoords(null);
      setPostcodeStatus("idle");
      return;
    }

    setPostcodeStatus("loading");
    const id = ++requestId.current;
    const timeout = setTimeout(async () => {
      const coords = await geocodeUKPostcode(trimmed);
      if (requestId.current !== id) return;
      if (coords) {
        setPostcodeCoords(coords);
        setPostcodeStatus("found");
      } else {
        setPostcodeCoords(null);
        setPostcodeStatus("notfound");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const base = hospitals
      .filter((h) => {
        const matchesQuery =
          postcodeCoords !== null ||
          !q ||
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.region.toLowerCase().includes(q);
        const matchesServiceLevel =
          serviceLevelFilter.length === 0 ||
          serviceLevelFilter.includes(h.serviceLevel);
        const matchesRegion = region === "All" || h.region === region;
        return matchesQuery && matchesServiceLevel && matchesRegion;
      })
      .map((h) => ({
        ...h,
        distanceMiles: postcodeCoords
          ? haversineMiles(postcodeCoords.lat, postcodeCoords.lon, h.lat, h.lon)
          : undefined,
      }));

    if (postcodeCoords) {
      return base.sort((a, b) => a.distanceMiles! - b.distanceMiles!);
    }

    return base;
  }, [query, serviceLevelFilter, region, postcodeCoords]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, serviceLevelFilter, region, postcodeCoords]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <div>
      <div className="sticky top-[73px] z-40 w-full border-b border-line bg-white/95 px-6 py-4 backdrop-blur dark:border-white/10 dark:bg-ink/95">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-white/40"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by postcode, hospital, city, or region..."
                aria-label="Search hospitals by name, city, region, or UK postcode"
                className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-4 text-base font-medium text-ink placeholder:text-ink/40 focus:border-primary dark:border-white/10 dark:bg-surface dark:text-white dark:placeholder:text-white/40 dark:focus:border-primary-light"
              />
              {postcodeStatus === "loading" && (
                <Loader2
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-ink/40 dark:text-white/40"
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-base font-bold text-ink transition-colors hover:border-primary dark:border-white/10 dark:text-white dark:hover:border-primary-light md:w-auto"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {postcodeStatus === "found" && (
            <p className="flex items-center gap-1.5 text-sm font-bold text-primary dark:text-primary-light">
              <MapPin size={14} />
              Showing nearest services to {query.trim().toUpperCase()}
            </p>
          )}
          {postcodeStatus === "notfound" && (
            <p className="text-sm font-medium text-ink/50 dark:text-white/50">
              &ldquo;{query.trim().toUpperCase()}&rdquo; doesn&apos;t look like a recognised UK
              postcode — showing text matches instead
            </p>
          )}

          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                className="overflow-hidden"
              >
                <div className="grid gap-4 pb-1 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink/50 dark:text-white/50">
                      Service level
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {serviceLevels.map((level) => {
                        const meta = serviceLevelMeta[level];
                        const active = serviceLevelFilter.includes(level);
                        return (
                          <button
                            key={level}
                            type="button"
                            onClick={() => toggleServiceLevel(level)}
                            aria-pressed={active}
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-bold transition-colors ${
                              active
                                ? "border-primary bg-primary/10 text-primary dark:border-primary-light dark:bg-primary-light/10 dark:text-primary-light"
                                : "border-line text-ink hover:border-primary dark:border-white/10 dark:text-white dark:hover:border-primary-light"
                            }`}
                          >
                            {active ? (
                              <Check size={13} />
                            ) : (
                              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                            )}
                            {meta.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <FilterSelect
                    label="Region"
                    value={region}
                    onChange={setRegion}
                    options={["All", ...regions]}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="mb-6 text-sm font-bold uppercase tracking-wider text-ink/50 dark:text-white/50">
          Showing {visible.length} of {filtered.length}{" "}
          {filtered.length === 1 ? "service" : "services"}
          {postcodeCoords && visible.length < filtered.length ? " (nearest first)" : ""}
        </p>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((h) => (
              <motion.div
                key={h.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
              >
                <HospitalCard hospital={h} distanceMiles={h.distanceMiles} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="rounded-full border border-line px-6 py-3 text-base font-bold text-ink transition-colors hover:border-primary dark:border-white/10 dark:text-white dark:hover:border-primary-light"
            >
              Load {Math.min(PAGE_SIZE, filtered.length - visibleCount)} more
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line py-20 text-center dark:border-white/10">
            <p className="text-lg font-bold text-ink dark:text-white">No services match those filters</p>
            <p className="mt-1 text-base font-medium text-ink/60 dark:text-white/60">
              Try broadening your search or clearing a filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  optionLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  optionLabel?: (o: string) => string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-ink/50 dark:text-white/50">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-line bg-white px-3 py-2.5 text-base font-medium text-ink focus:border-primary dark:border-white/10 dark:bg-surface dark:text-white dark:focus:border-primary-light"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {optionLabel ? optionLabel(o) : o}
          </option>
        ))}
      </select>
    </label>
  );
}
