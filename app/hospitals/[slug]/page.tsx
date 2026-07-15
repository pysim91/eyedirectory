import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, ExternalLink, ArrowUpRight } from "lucide-react";
import { hospitals, getHospitalBySlug } from "@/data/hospitals";
import { serviceLevelMeta } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/RevealOnScroll";
import { ScanDivider } from "@/components/VisionScanLine";

export function generateStaticParams() {
  return hospitals.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const hospital = getHospitalBySlug(params.slug);
  if (!hospital) return {};
  return {
    title: `${hospital.name} | Emergency Eye Care Directory`,
    description: `${serviceLevelMeta[hospital.serviceLevel].label} in ${hospital.city}, ${hospital.region}.`,
  };
}

export default function HospitalDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const hospital = getHospitalBySlug(params.slug);
  if (!hospital) notFound();

  const meta = serviceLevelMeta[hospital.serviceLevel];
  const mapsUrl = `https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`;

  return (
    <div>
      <div className="border-b border-line bg-sky px-6 py-16 dark:border-white/10 dark:bg-sky-dark">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink/50 dark:text-white/50">
            <Link href="/hospitals" className="hover:text-primary dark:hover:text-primary-light">
              Directory
            </Link>
            <span>/</span>
            <span>{hospital.name}</span>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div
                className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold ${meta.badge}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                {meta.label}
              </div>
              <h1 className="mt-3 text-section-header font-extrabold text-ink dark:text-white">
                {hospital.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-base font-medium text-ink/60 dark:text-white/60">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {hospital.city}, {hospital.region}, {hospital.country}
                </span>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-extrabold text-white transition-colors hover:bg-primary-deep"
            >
              Open in Maps
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <RevealGroup>
          <RevealItem>
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">
              Opening hours &amp; cover
            </h2>
            <div className="mt-4 whitespace-pre-line rounded-2xl border border-line bg-white p-6 text-base font-medium leading-relaxed text-ink/80 dark:border-white/10 dark:bg-surface dark:text-white/80">
              {hospital.cover || "No cover information available for this service"}
            </div>
          </RevealItem>
        </RevealGroup>

        <ScanDivider />

        <RevealGroup className="mt-16">
          <RevealItem>
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">Contact</h2>
          </RevealItem>
          <RevealItem className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-surface">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-light">
                <Phone size={18} />
              </div>
              <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-ink/50 dark:text-white/50">
                Telephone
              </h3>
              <p className="mt-1 whitespace-pre-line text-base font-medium text-ink dark:text-white">
                {hospital.telephone || "Not listed"}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-surface">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-light">
                <Mail size={18} />
              </div>
              <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-ink/50 dark:text-white/50">
                Email
              </h3>
              {hospital.email ? (
                <a
                  href={`mailto:${hospital.email}`}
                  className="mt-1 inline-block break-all text-base font-medium text-primary hover:text-primary-deep dark:text-primary-light"
                >
                  {hospital.email}
                </a>
              ) : (
                <p className="mt-1 text-base font-medium text-ink dark:text-white">Not listed</p>
              )}
            </div>
          </RevealItem>
        </RevealGroup>

        <ScanDivider />

        <RevealGroup className="mt-16">
          <RevealItem>
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">Location</h2>
          </RevealItem>
          <RevealItem className="mt-6">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-sky text-ink/60 transition-colors hover:border-primary dark:border-white/10 dark:bg-sky-dark dark:text-white/60"
            >
              <MapPin size={32} />
              <span className="text-sm font-bold uppercase tracking-wider">
                {hospital.city}, {hospital.region}
              </span>
              <span className="flex items-center gap-1 text-sm font-bold text-primary dark:text-primary-light">
                Open in Google Maps
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-16">
          <RevealItem>
            <p className="text-sm font-medium text-ink/50 dark:text-white/50">
              Not sure what {meta.label.toLowerCase()} means for a referral?{" "}
              <Link
                href={`/service-levels/${hospital.serviceLevel}`}
                className="font-bold text-primary hover:text-primary-deep dark:text-primary-light"
              >
                See what this service level covers →
              </Link>
            </p>
          </RevealItem>
        </RevealGroup>
      </section>
    </div>
  );
}
