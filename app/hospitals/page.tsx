import type { Metadata } from "next";
import DirectoryExplorer from "@/components/DirectoryExplorer";

export const metadata: Metadata = {
  title: "Hospital Directory | Clarity",
  description: "Search and filter accredited eye hospitals by specialty, location, and insurance.",
};

export default function HospitalsPage({
  searchParams,
}: {
  searchParams: { q?: string; specialty?: string };
}) {
  return (
    <div>
      <div className="border-b border-line bg-sky px-6 py-16 dark:border-white/10 dark:bg-sky-dark">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-section-header font-extrabold text-ink dark:text-white">
            Hospital Directory
          </h1>
          <p className="mt-3 max-w-xl text-lg font-medium text-ink/70 dark:text-white/70">
            Browse accredited eye hospitals by specialty, city, or insurance.
          </p>
        </div>
      </div>
      <DirectoryExplorer
        initialQuery={searchParams.q ?? ""}
        initialSpecialty={searchParams.specialty ?? "All"}
      />
    </div>
  );
}
