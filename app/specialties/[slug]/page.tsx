import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { specialtiesList, specialtyCopy, getHospitalsBySpecialty, Specialty } from "@/data/hospitals";
import { slugifySpecialty } from "@/lib/utils";
import HospitalCard from "@/components/HospitalCard";
import { RevealGroup, RevealItem } from "@/components/RevealOnScroll";
import { ScanDivider } from "@/components/VisionScanLine";

function findSpecialtyBySlug(slug: string): Specialty | undefined {
  return specialtiesList.find((s) => slugifySpecialty(s) === slug);
}

export function generateStaticParams() {
  return specialtiesList.map((s) => ({ slug: slugifySpecialty(s) }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const specialty = findSpecialtyBySlug(params.slug);
  if (!specialty) return {};
  return {
    title: `${specialty} | Clarity`,
    description: specialtyCopy[specialty].description,
  };
}

export default function SpecialtyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const specialty = findSpecialtyBySlug(params.slug);
  if (!specialty) notFound();

  const copy = specialtyCopy[specialty];
  const hospitalsWithSpecialty = getHospitalsBySpecialty(specialty);

  return (
    <div>
      <div className="border-b border-line bg-sky px-6 py-16 dark:border-white/10 dark:bg-sky-dark">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink/50 dark:text-white/50">
            <Link href="/specialties" className="hover:text-primary dark:hover:text-primary-light">
              Specialties
            </Link>
            <span>/</span>
            <span>{specialty}</span>
          </div>
          <h1 className="mt-6 text-section-header font-extrabold text-ink dark:text-white">
            {specialty}
          </h1>
          <p className="mt-3 max-w-2xl text-xl font-medium text-ink/70 dark:text-white/70">
            {copy.tagline}
          </p>
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
              Hospitals offering {specialty}
            </h2>
          </RevealItem>
          <RevealItem className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hospitalsWithSpecialty.map((h) => (
              <HospitalCard key={h.slug} hospital={h} />
            ))}
          </RevealItem>
        </RevealGroup>
      </section>
    </div>
  );
}
