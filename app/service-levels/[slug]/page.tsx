import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  serviceLevels,
  serviceLevelCopy,
  getHospitalsByServiceLevel,
  ServiceLevel,
} from "@/data/hospitals";
import { serviceLevelMeta } from "@/lib/utils";
import HospitalCard from "@/components/HospitalCard";
import { RevealGroup, RevealItem } from "@/components/RevealOnScroll";
import { ScanDivider } from "@/components/VisionScanLine";

function isServiceLevel(slug: string): slug is ServiceLevel {
  return (serviceLevels as string[]).includes(slug);
}

export function generateStaticParams() {
  return serviceLevels.map((level) => ({ slug: level }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceLevel(slug)) return {};
  return {
    title: `${serviceLevelMeta[slug].label} | Emergency Eye Care Directory`,
    description: serviceLevelCopy[slug].description,
  };
}

export default async function ServiceLevelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isServiceLevel(slug)) notFound();

  const level = slug;
  const meta = serviceLevelMeta[level];
  const copy = serviceLevelCopy[level];
  const hospitalsAtLevel = getHospitalsByServiceLevel(level);

  return (
    <div>
      <div className="border-b border-line bg-sky px-6 py-16 dark:border-white/10 dark:bg-sky-dark">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink/50 dark:text-white/50">
            <Link href="/service-levels" className="hover:text-primary dark:hover:text-primary-light">
              Service Levels
            </Link>
            <span>/</span>
            <span>{meta.label}</span>
          </div>
          <div
            className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold ${meta.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </div>
          <h1 className="mt-4 text-section-header font-extrabold text-ink dark:text-white">
            {copy.tagline}
          </h1>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <RevealGroup>
          <RevealItem>
            <p className="max-w-3xl text-lg font-medium leading-relaxed text-ink/70 dark:text-white/70">
              {copy.description}
            </p>
          </RevealItem>
        </RevealGroup>

        <ScanDivider />

        <RevealGroup className="mt-16">
          <RevealItem>
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">
              {hospitalsAtLevel.length} {hospitalsAtLevel.length === 1 ? "service" : "services"} with this designation
            </h2>
          </RevealItem>
          <RevealItem className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hospitalsAtLevel.map((h) => (
              <HospitalCard key={h.slug} hospital={h} />
            ))}
          </RevealItem>
        </RevealGroup>
      </section>
    </div>
  );
}
