import Link from "next/link";
import { Search, ShieldCheck, Phone } from "lucide-react";
import Hero from "@/components/Hero";
import { ScanDivider } from "@/components/VisionScanLine";
import { RevealGroup, RevealItem } from "@/components/RevealOnScroll";
import { hospitals, serviceLevels, serviceLevelCopy, getHospitalsByServiceLevel } from "@/data/hospitals";
import { serviceLevelMeta } from "@/lib/utils";

const steps = [
  {
    title: "Search by postcode, city, or region",
    body: "Find the nearest or most relevant eye casualty service in seconds",
    icon: Search,
  },
  {
    title: "Check the service level",
    body: "Walk-in, booked-referral only, or no dedicated emergency eye cover — know before you send a patient",
    icon: ShieldCheck,
  },
  {
    title: "Contact directly to refer",
    body: "Call or email using the listed details and any referral instructions on the service's page",
    icon: Phone,
  },
];

export default function HomePage() {
  const countsByLevel = Object.fromEntries(
    serviceLevels.map((l) => [l, getHospitalsByServiceLevel(l).length])
  );

  return (
    <>
      <Hero />

      <ScanDivider />

      <section className="bg-sky px-6 py-24 dark:bg-sky-dark">
        <div className="mx-auto max-w-7xl">
          <RevealGroup>
            <RevealItem>
              <h2 className="text-section-header font-extrabold text-ink dark:text-white">
                How to use this directory
              </h2>
            </RevealItem>
            <RevealItem className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-line bg-white p-8 dark:border-white/10 dark:bg-surface"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    <step.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-base font-medium text-ink/70 dark:text-white/70">
                    {step.body}
                  </p>
                </div>
              ))}
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl scroll-mt-12 px-6 py-24">
        <RevealGroup>
          <RevealItem>
            <h2 className="text-section-header font-extrabold text-ink dark:text-white">
              A UK-wide picture, at a glance
            </h2>
            <p className="mt-3 max-w-2xl text-lg font-medium text-ink/70 dark:text-white/70">
              {hospitals.length} sites across England, Scotland, Wales, and
              Northern Ireland, each categorised by how a patient can
              actually be seen
            </p>
          </RevealItem>

          <RevealItem className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {serviceLevels.map((level) => (
              <Link
                key={level}
                href={`/service-levels/${level}`}
                className="group rounded-2xl border border-line bg-white p-6 transition-colors hover:border-primary dark:border-white/10 dark:bg-surface dark:hover:border-primary-light"
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${serviceLevelMeta[level].dot}`} />
                  <span className="text-sm font-bold uppercase tracking-wide text-ink/50 dark:text-white/50">
                    {serviceLevelMeta[level].label}
                  </span>
                </div>
                <div className="mt-3 text-4xl font-extrabold text-primary dark:text-primary-light">
                  {countsByLevel[level]}
                </div>
                <p className="mt-2 text-sm font-medium text-ink/60 dark:text-white/60">
                  {serviceLevelCopy[level].tagline}
                </p>
              </Link>
            ))}
          </RevealItem>

          <RevealItem className="mt-12 rounded-2xl border border-line bg-sky p-6 dark:border-white/10 dark:bg-sky-dark">
            <ul className="space-y-2 text-sm font-medium leading-relaxed text-ink/80 dark:text-white/80">
              <li className="flex gap-2">
                <span className="text-primary dark:text-primary-light">•</span>
                Data adapted from the UK Eye Casualty Services map,
                originally created by Jonathan Than (Consultant
                Ophthalmologist at Milton Keynes NHS Foundation Trust) and
                maintained by Ayesha Karimi (ST6 Ophthalmology Resident -
                Kent, Surrey, Sussex Deanery)
              </li>
              <li className="flex gap-2">
                <span className="text-primary dark:text-primary-light">•</span>
                Website designed and created by Peng Sim (Vitreoretinal
                Fellow at Guy&apos;s and St Thomas&apos; NHS Foundation
                Trust)
              </li>
            </ul>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
