import Link from "next/link";
import { serviceLevels } from "@/data/hospitals";
import { serviceLevelMeta } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white dark:border-white/10 dark:bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-extrabold">
              <img src="/icon.svg" alt="" className="h-9 w-9" />
              <span className="notranslate">Emergency Eye Care Directory</span>
            </Link>
            <p className="mt-4 max-w-sm text-base font-medium text-white/70">
              A UK-wide directory of eye casualty and emergency ophthalmology
              services, built for clinicians deciding where to refer a
              patient with an eye emergency
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/hospitals" className="text-base font-medium text-white/80 hover:text-white">
                  Directory
                </Link>
              </li>
              <li>
                <Link href="/service-levels" className="text-base font-medium text-white/80 hover:text-white">
                  Service Levels
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-base font-medium text-white/80 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
              Service Levels
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLevels.map((level) => (
                <li key={level}>
                  <Link
                    href={`/service-levels/${level}`}
                    className="text-base font-medium text-white/80 hover:text-white"
                  >
                    {serviceLevelMeta[level].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm font-medium text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Emergency Eye Care Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
