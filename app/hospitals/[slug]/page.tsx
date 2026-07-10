import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck, Star, Calendar, CreditCard } from "lucide-react";
import { hospitals, getHospitalBySlug } from "@/data/hospitals";
import { picsum, slugifySpecialty } from "@/lib/utils";
import DoctorCard from "@/components/DoctorCard";
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
    title: `${hospital.name} | Clarity`,
    description: hospital.description,
  };
}

export default function HospitalDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const hospital = getHospitalBySlug(params.slug);
  if (!hospital) notFound();

  return (
    <div>
      <div className="border-b border-line bg-sky px-6 py-16 dark:border-white/10 dark:bg-sky-dark">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink/50 dark:text-white/50">
            <Link href="/hospitals" className="hover:text-primary dark:hover:text-primary-light">
              Directory
            </Link>
            <span>/</span>
            <span>{hospital.name}</span>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-primary dark:text-primary-light">
                <ShieldCheck size={16} />
                {hospital.accreditation}
              </div>
              <h1 className="mt-3 text-section-header font-extrabold text-ink dark:text-white">
                {hospital.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-base font-medium text-ink/60 dark:text-white/60">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {hospital.city}, {hospital.state}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star size={16} className="fill-primary text-primary" />
                  {hospital.rating} ({hospital.reviewCount} reviews)
                </span>
                <span>Founded {hospital.founded}</span>
              </div>
            </div>

            <a
              href="#book"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-extrabold text-white transition-colors hover:bg-primary-deep"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          <RevealItem className="relative col-span-2 row-span-2 h-64 overflow-hidden rounded-2xl md:h-full">
            <Image
              src={picsum(hospital.photoSeed, 800, 800)}
              alt={`${hospital.name} main building`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </RevealItem>
          {hospital.gallerySeeds.map((seed) => (
            <RevealItem key={seed} className="relative h-32 overflow-hidden rounded-2xl md:h-full">
              <Image
                src={picsum(seed, 400, 400)}
                alt={`${hospital.name} facility photo`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-16">
          <RevealItem>
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">About</h2>
            <p className="mt-3 max-w-3xl text-lg font-medium leading-relaxed text-ink/70 dark:text-white/70">
              {hospital.description}
            </p>
          </RevealItem>

          <RevealItem className="mt-6 flex flex-wrap gap-2">
            {hospital.specialties.map((s) => (
              <Link
                key={s}
                href={`/specialties/${slugifySpecialty(s)}`}
                className="tag-pill bg-sky hover:border-primary dark:bg-sky-dark dark:hover:border-primary-light"
              >
                {s}
              </Link>
            ))}
          </RevealItem>

          <RevealItem className="mt-6 flex items-center gap-2 text-base font-medium text-ink/70 dark:text-white/70">
            <CreditCard size={18} className="text-primary dark:text-primary-light" />
            Accepts: {hospital.insuranceAccepted.join(", ")}
          </RevealItem>
        </RevealGroup>

        <ScanDivider />

        <RevealGroup className="mt-16">
          <RevealItem>
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">Our specialists</h2>
          </RevealItem>
          <RevealItem className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {hospital.doctors.map((doc) => (
              <DoctorCard key={doc.name} doctor={doc} />
            ))}
          </RevealItem>
        </RevealGroup>

        <ScanDivider />

        <RevealGroup className="mt-16">
          <RevealItem>
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">Patient reviews</h2>
          </RevealItem>
          <RevealItem className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {hospital.reviews.map((r, i) => (
              <div key={i} className="rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-surface">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <Star key={idx} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-3 text-base font-medium leading-snug text-ink dark:text-white">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-bold text-ink/50 dark:text-white/50">{r.author}</p>
              </div>
            ))}
          </RevealItem>
        </RevealGroup>

        <ScanDivider />

        <RevealGroup className="mt-16">
          <RevealItem>
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">Location</h2>
          </RevealItem>
          <RevealItem className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-line bg-sky dark:border-white/10 dark:bg-sky-dark">
            <div className="flex flex-col items-center gap-2 text-ink/40 dark:text-white/40">
              <MapPin size={32} />
              <span className="text-sm font-bold uppercase tracking-wider">
                Map placeholder &middot; {hospital.city}, {hospital.state}
              </span>
            </div>
          </RevealItem>
        </RevealGroup>

        <RevealGroup id="book" className="mt-16 scroll-mt-24 rounded-2xl bg-ink px-8 py-14 text-center dark:bg-surface">
          <RevealItem>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
              <Calendar size={22} />
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-white">
              Ready to book with {hospital.name}?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base font-medium text-white/70">
              Request an appointment and a care coordinator will confirm
              availability within one business day.
            </p>
            <button
              type="button"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-extrabold text-white transition-colors hover:bg-primary-deep"
            >
              Book Appointment
            </button>
          </RevealItem>
        </RevealGroup>
      </section>
    </div>
  );
}
