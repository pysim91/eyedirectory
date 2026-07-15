import type { Metadata } from "next";
import DirectoryExplorer from "@/components/DirectoryExplorer";

export const metadata: Metadata = {
  title: "Directory | Emergency Eye Care Directory",
  description: "Search and filter UK eye casualty and emergency ophthalmology services by service level, city, region, or postcode.",
};

export default function HospitalsPage({
  searchParams,
}: {
  searchParams: { q?: string; serviceLevel?: string };
}) {
  return (
    <div>
      <div className="border-b border-line bg-sky px-6 py-16 dark:border-white/10 dark:bg-sky-dark">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-section-header font-extrabold text-ink dark:text-white">
            Directory
          </h1>
          <p className="mt-3 max-w-xl text-lg font-medium text-ink/70 dark:text-white/70">
            Browse UK eye casualty and emergency ophthalmology services by
            service level, city, region, or postcode
          </p>
        </div>
      </div>
      <DirectoryExplorer
        initialQuery={searchParams.q ?? ""}
        initialServiceLevel={searchParams.serviceLevel ?? "All"}
      />
    </div>
  );
}
