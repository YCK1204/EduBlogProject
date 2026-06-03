"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

export default function LangDropdown() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = OPTIONS.find((o) => o.value === lang) ?? OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors bg-white dark:bg-zinc-900"
      >
        {current.label}
        <svg
          className={`w-3 h-3 transition-transform text-zinc-400 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[8rem] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
          {OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => { setLang(value); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                lang === value
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
