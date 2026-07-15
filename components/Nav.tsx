"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Info } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import TextSizeControl from "@/components/TextSizeControl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const links = [
  { href: "/service-levels", label: "Service Levels" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur dark:border-white/10 dark:bg-ink/90">
      <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 bg-primary/10 px-4 py-1.5 text-center text-xs font-bold text-primary dark:bg-primary-light/10 dark:text-primary-light">
        <Info size={13} className="shrink-0" />
        <span>
          For minor conditions, consider asking the patient to self-refer to the{" "}
          <a
            href="https://primaryeyecare.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            Primary Eyecare Network
          </a>
          . Clinicians can also refer to the Primary Eyecare Network by emailing{" "}
          <a href="mailto:cnech.pecservices@nhs.net" className="underline hover:no-underline">
            cnech.pecservices@nhs.net
          </a>
        </span>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex min-w-0 flex-1 items-center gap-3 xl:flex-none">
          <img
            src="/nhs-logo.png"
            alt="NHS"
            className="notranslate hidden h-7 w-auto shrink-0 rounded-sm sm:block"
          />
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 whitespace-nowrap text-sm font-extrabold tracking-tight text-ink dark:text-white sm:text-base xl:text-lg"
            onClick={() => setOpen(false)}
          >
            <img src="/icon.svg" alt="" className="h-9 w-9 shrink-0" />
            <span className="notranslate truncate">Emergency Eye Care Directory</span>
          </Link>
        </div>

        <div className="hidden items-center gap-4 xl:flex">
          <Link
            href="/hospitals"
            className="whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-deep"
          >
            Find a Hospital
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-primary dark:hover:text-primary-light ${
                pathname === link.href
                  ? "text-primary dark:text-primary-light"
                  : "text-ink dark:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <TextSizeControl />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex items-center justify-center rounded-md p-2 text-ink dark:text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-white px-6 py-4 dark:border-white/10 dark:bg-ink xl:hidden">
          <div className="flex flex-col gap-4">
            <img
              src="/nhs-logo.png"
              alt="NHS"
              className="notranslate h-7 w-auto self-start rounded-sm sm:hidden"
            />
            <Link
              href="/hospitals"
              className="rounded-full bg-primary px-5 py-3 text-center text-lg font-bold text-white"
              onClick={() => setOpen(false)}
            >
              Find a Hospital
            </Link>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-ink dark:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-line pt-4 dark:border-white/10">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/50 dark:text-white/50">
                Text size
              </span>
              <TextSizeControl />
            </div>
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/50 dark:text-white/50">
                Translate this page
              </span>
              <LanguageSwitcher className="w-full [&>select]:w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
