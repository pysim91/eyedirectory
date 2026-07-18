"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { VisionScanSweep } from "@/components/VisionScanLine";
import { serviceLevels } from "@/data/hospitals";
import { serviceLevelMeta } from "@/lib/utils";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/hospitals${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden border-b border-line bg-white px-6 dark:border-white/10 dark:bg-ink">
      <VisionScanSweep delay={0.3} />

      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-primary dark:text-primary-light">
          UK eye casualty &amp; emergency ophthalmology services
        </p>

        <h1 className="text-hero-mobile font-extrabold text-ink dark:text-white md:text-hero-desktop">
          Know exactly
          <br />
          where to send
          <br />
          an eye <span className="text-primary">emergency</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg font-medium text-ink/70 dark:text-white/70 md:text-xl">
          A UK-wide reference for GPs, optometrists, and emergency clinicians:
          walk-in availability, referral routes, and direct contact details
          for every eye casualty service
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-10 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-line bg-white p-2 shadow-[0_8px_40px_-16px_rgba(30,64,175,0.25)] dark:border-white/10 dark:bg-surface sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-white/40"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by postcode, hospital, city, or region"
              aria-label="Search hospitals by name, city, region, or UK postcode"
              className="w-full rounded-xl border-none bg-transparent py-3.5 pl-12 pr-4 text-base font-medium text-ink placeholder:text-ink/40 dark:text-white dark:placeholder:text-white/40"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-primary px-6 py-3.5 text-base font-extrabold text-white transition-colors hover:bg-primary-deep"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap gap-2">
          {serviceLevels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => router.push(`/hospitals?serviceLevel=${encodeURIComponent(level)}`)}
              className="tag-pill bg-sky text-sm transition-colors hover:border-primary dark:bg-sky-dark dark:hover:border-primary-light"
            >
              <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${serviceLevelMeta[level].dot}`} />
              {serviceLevelMeta[level].label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
