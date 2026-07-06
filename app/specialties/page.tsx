import type { Metadata } from "next";
import Link from "next/link";
import { specialtiesList, specialtyCopy, getHospitalsBySpecialty } from "@/data/hospitals";
import { slugifySpecialty } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Specialties | Clarity",
  description: "Learn about eye care specialties and find hospitals that offer them.",
};

export default function SpecialtiesPage() {
  return (
    <div>
      <div className="border-b border-line bg-sky px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-section-header font-extrabold text-ink">
            Specialties
          </h1>
          <p className="mt-3 max-w-xl text-lg font-medium text-ink/70">
            Plain-language explanations of common eye conditions and
            treatments, and where to find them.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialtiesList.map((s) => {
            const count = getHospitalsBySpecialty(s).length;
            return (
              <RevealItem key={s}>
                <Link
                  href={`/specialties/${slugifySpecialty(s)}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-colors duration-300 hover:border-primary"
                >
                  <h2 className="text-xl font-bold text-ink">{s}</h2>
                  <p className="mt-2 text-base font-medium text-ink/70">
                    {specialtyCopy[s].tagline}
                  </p>
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-sm font-bold text-ink/50">
                      {count} {count === 1 ? "hospital" : "hospitals"}
                    </span>
                    <span className="text-sm font-bold text-primary transition-transform group-hover:translate-x-1">
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
