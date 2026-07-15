import type { Metadata } from "next";
import Link from "next/link";
import { serviceLevels, serviceLevelCopy, getHospitalsByServiceLevel } from "@/data/hospitals";
import { serviceLevelMeta } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Service Levels | Emergency Eye Care Directory",
  description: "What walk-in, booked, and no-service eye casualty designations mean for a referral.",
};

export default function ServiceLevelsPage() {
  return (
    <div>
      <div className="border-b border-line bg-sky px-6 py-16 dark:border-white/10 dark:bg-sky-dark">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-section-header font-extrabold text-ink dark:text-white">
            Service Levels
          </h1>
          <p className="mt-3 max-w-xl text-lg font-medium text-ink/70 dark:text-white/70">
            Every listing is categorised by how a patient can actually be
            seen. Here's what each level means for a referral
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {serviceLevels.map((level) => {
            const meta = serviceLevelMeta[level];
            const copy = serviceLevelCopy[level];
            const count = getHospitalsByServiceLevel(level).length;
            return (
              <RevealItem key={level}>
                <Link
                  href={`/service-levels/${level}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-colors duration-300 hover:border-primary dark:border-white/10 dark:bg-surface dark:hover:border-primary-light"
                >
                  <div
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${meta.badge}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                    {meta.label}
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-ink dark:text-white">
                    {copy.tagline}
                  </h2>
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-sm font-bold text-ink/50 dark:text-white/50">
                      {count} {count === 1 ? "service" : "services"}
                    </span>
                    <span className="text-sm font-bold text-primary transition-transform group-hover:translate-x-1 dark:text-primary-light">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </div>
  );
}
