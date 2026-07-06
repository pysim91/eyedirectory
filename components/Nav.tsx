"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/hospitals", label: "Directory" },
  { href: "/specialties", label: "Specialties" },
  { href: "/#about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            <Eye size={18} strokeWidth={2.5} />
          </span>
          Clarity
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/hospitals"
            className="rounded-full bg-primary px-5 py-2.5 text-base font-bold text-white transition-colors hover:bg-primary-deep"
          >
            Find Care
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/hospitals"
              className="rounded-full bg-primary px-5 py-3 text-center text-lg font-bold text-white"
              onClick={() => setOpen(false)}
            >
              Find Care
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
