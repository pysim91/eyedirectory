"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { hospitals, specialtiesList, cities, allInsurances } from "@/data/hospitals";
import HospitalCard from "@/components/HospitalCard";

export default function DirectoryExplorer({
  initialQuery = "",
  initialSpecialty = "All",
}: {
  initialQuery?: string;
  initialSpecialty?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [specialty, setSpecialty] = useState<string>(initialSpecialty);
  const [city, setCity] = useState<string>("All");
  const [insurance, setInsurance] = useState<string>("All");
  const [filtersOpen, setFiltersOpen] = useState(initialSpecialty !== "All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hospitals.filter((h) => {
      const matchesQuery =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.specialties.some((s) => s.toLowerCase().includes(q));
      const matchesSpecialty =
        specialty === "All" || h.specialties.includes(specialty as any);
      const matchesCity = city === "All" || h.city === city;
      const matchesInsurance =
        insurance === "All" || h.insuranceAccepted.includes(insurance);
      return matchesQuery && matchesSpecialty && matchesCity && matchesInsurance;
    });
  }, [query, specialty, city, insurance]);

  return (
    <div>
      <div className="sticky top-[73px] z-40 w-full border-b border-line bg-white/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by hospital, city, or specialty..."
                aria-label="Search hospitals"
                className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-4 text-base font-medium text-ink placeholder:text-ink/40 focus:border-primary"
              />
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-base font-bold text-ink transition-colors hover:border-primary md:w-auto"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                className="overflow-hidden"
              >
                <div className="grid gap-3 pb-1 sm:grid-cols-3">
                  <FilterSelect
                    label="Specialty"
                    value={specialty}
                    onChange={setSpecialty}
                    options={["All", ...specialtiesList]}
                  />
                  <FilterSelect
                    label="Location"
                    value={city}
                    onChange={setCity}
                    options={["All", ...cities]}
                  />
                  <FilterSelect
                    label="Insurance"
                    value={insurance}
                    onChange={setInsurance}
                    options={["All", ...allInsurances]}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="mb-6 text-sm font-bold uppercase tracking-wider text-ink/50">
          {filtered.length} {filtered.length === 1 ? "hospital" : "hospitals"} found
        </p>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((h) => (
              <motion.div
                key={h.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
              >
                <HospitalCard hospital={h} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="text-lg font-bold text-ink">No hospitals match those filters.</p>
            <p className="mt-1 text-base font-medium text-ink/60">
              Try broadening your search or clearing a filter.
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-ink/50">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-line bg-white px-3 py-2.5 text-base font-medium text-ink focus:border-primary"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
