"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { VisionScanSweep } from "@/components/VisionScanLine";
import { specialtiesList } from "@/data/hospitals";

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
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-primary dark:text-primary-light"
        >
          200+ accredited eye hospitals, nationwide
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
          className="text-hero-mobile font-extrabold text-ink dark:text-white md:text-hero-desktop"
        >
          Find eye care
          <br />
          you can see
          <br />
          <span className="text-primary">clearly</span> through.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-xl text-lg font-medium text-ink/70 dark:text-white/70 md:text-xl"
        >
          Compare accredited hospitals, specialists, and outcomes side by
          side. Search by city or condition and book with confidence.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          onSubmit={handleSearch}
          className="mt-10 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-line bg-white p-2 shadow-[0_8px_40px_-16px_rgba(30,79,255,0.25)] dark:border-white/10 dark:bg-surface sm:flex-row"
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
              placeholder="Search city or specialty, e.g. Cataract"
              aria-label="Search hospitals by city or specialty"
              className="w-full rounded-xl border-none bg-transparent py-3.5 pl-12 pr-4 text-base font-medium text-ink placeholder:text-ink/40 dark:text-white dark:placeholder:text-white/40"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-primary px-6 py-3.5 text-base font-extrabold text-white transition-colors hover:bg-primary-deep"
          >
            Search
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {specialtiesList.slice(0, 5).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => router.push(`/hospitals?specialty=${encodeURIComponent(s)}`)}
              className="tag-pill bg-sky text-sm transition-colors hover:border-primary dark:bg-sky-dark dark:hover:border-primary-light"
            >
              {s}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
