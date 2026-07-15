"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "zh-CN", label: "中文（简体）" },
  { code: "nl", label: "Nederlands" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pl", label: "Polski" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
];

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setMounted(true);
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
    if (match) setLang(match[1]);
  }, []);

  function changeLanguage(code: string) {
    setLang(code);

    if (code === "en") {
      document.cookie = "googtrans=/en/en; path=/";
      document.cookie = `googtrans=/en/en; domain=.${window.location.hostname}; path=/`;
    } else {
      document.cookie = `googtrans=/en/${code}; path=/`;
      document.cookie = `googtrans=/en/${code}; domain=.${window.location.hostname}; path=/`;
    }

    const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  }

  if (!mounted) {
    return <div className={`h-10 w-10 ${className}`} aria-hidden="true" />;
  }

  return (
    <div className={`notranslate relative flex h-10 items-center ${className}`}>
      <Languages
        size={15}
        className="pointer-events-none absolute left-3 text-ink/60 dark:text-white/60"
      />
      <select
        value={lang}
        onChange={(e) => changeLanguage(e.target.value)}
        aria-label="Translate this page"
        className="h-10 appearance-none rounded-full border border-line bg-white py-0 pl-8 pr-3 text-sm font-bold text-ink transition-colors hover:border-primary focus:border-primary dark:border-white/10 dark:bg-ink dark:text-white dark:hover:border-primary-light dark:focus:border-primary-light"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
