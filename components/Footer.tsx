import Link from "next/link";
import { Eye } from "lucide-react";
import { specialtiesList } from "@/data/hospitals";
import { slugifySpecialty } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white dark:border-white/10 dark:bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-extrabold">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                <Eye size={18} strokeWidth={2.5} />
              </span>
              Clarity
            </Link>
            <p className="mt-4 max-w-sm text-base font-medium text-white/70">
              A directory of accredited eye hospitals and specialists, built so
              patients can find the right care without the guesswork.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/hospitals" className="text-base font-medium text-white/80 hover:text-white">
                  Hospital Directory
                </Link>
              </li>
              <li>
                <Link href="/specialties" className="text-base font-medium text-white/80 hover:text-white">
                  Specialties
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
              Top Specialties
            </h3>
            <ul className="mt-4 space-y-3">
              {specialtiesList.slice(0, 4).map((s) => (
                <li key={s}>
                  <Link
                    href={`/specialties/${slugifySpecialty(s)}`}
                    className="text-base font-medium text-white/80 hover:text-white"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm font-medium text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Clarity Eye Directory. All rights reserved.</p>
          <p>Placeholder data for demonstration purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
