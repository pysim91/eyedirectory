import Link from "next/link";
import { ShieldCheck, Users, Search, CalendarCheck } from "lucide-react";
import Hero from "@/components/Hero";
import HospitalCard from "@/components/HospitalCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { ScanDivider } from "@/components/VisionScanLine";
import { RevealGroup, RevealItem } from "@/components/RevealOnScroll";
import { hospitals } from "@/data/hospitals";

const stats = [
  { label: "Partner hospitals", value: "200+" },
  { label: "Board-certified specialists", value: "1,400+" },
  { label: "Patient reviews", value: "38,000+" },
  { label: "Cities covered", value: "60+" },
];

const steps = [
  {
    title: "Search your condition or city",
    body: "Tell us what you need, whether that's LASIK, a pediatric exam, or retina care near you.",
    icon: Search,
  },
  {
    title: "Compare accredited hospitals",
    body: "Review specialties, ratings, accreditation, and accepted insurance side by side.",
    icon: ShieldCheck,
  },
  {
    title: "Book your appointment",
    body: "Choose a specialist and request an appointment directly from their profile.",
    icon: CalendarCheck,
  },
];

export default function HomePage() {
  const featured = hospitals.slice(0, 6);

  return (
    <>
      <Hero />

      <ScanDivider />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <RevealGroup>
          <RevealItem className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-section-header font-extrabold text-ink">
                Featured hospitals
              </h2>
              <p className="mt-3 max-w-xl text-lg font-medium text-ink/70">
                A sample of accredited hospitals from our directory, ranked by
                patient rating.
              </p>
            </div>
            <Link
              href="/hospitals"
              className="text-base font-bold text-primary hover:text-primary-deep"
            >
              View full directory →
            </Link>
          </RevealItem>

          <RevealItem className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((h) => (
              <HospitalCard key={h.slug} hospital={h} />
            ))}
          </RevealItem>
        </RevealGroup>
      </section>

      <section className="bg-sky px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <RevealGroup>
            <RevealItem>
              <h2 className="text-section-header font-extrabold text-ink">
                How booking works
              </h2>
            </RevealItem>
            <RevealItem className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-line bg-white p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    <step.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-base font-medium text-ink/70">
                    {step.body}
                  </p>
                </div>
              ))}
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <RevealGroup>
          <RevealItem>
            <h2 className="text-section-header font-extrabold text-ink">
              Trusted across the country
            </h2>
            <p className="mt-3 max-w-2xl text-lg font-medium text-ink/70">
              Every hospital in our directory is independently accredited by
              the Joint Commission or AAAHC before it's listed.
            </p>
          </RevealItem>

          <RevealItem className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-line bg-white p-6 text-center"
              >
                <div className="text-4xl font-extrabold text-primary">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-bold uppercase tracking-wide text-ink/50">
                  {s.label}
                </div>
              </div>
            ))}
          </RevealItem>

          <RevealItem className="mt-16">
            <h3 className="text-2xl font-extrabold text-ink">
              What patients are saying
            </h3>
            <div className="mt-6">
              <TestimonialCarousel />
            </div>
          </RevealItem>
        </RevealGroup>
      </section>

      <ScanDivider />

      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <RevealGroup>
          <RevealItem>
            <h2 className="mx-auto max-w-2xl text-section-header font-extrabold text-ink">
              Ready to see clearly?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-ink/70">
              Browse the full directory and find a specialist near you today.
            </p>
            <Link
              href="/hospitals"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-extrabold text-white transition-colors hover:bg-primary-deep"
            >
              <Users size={20} />
              Browse the Directory
            </Link>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
