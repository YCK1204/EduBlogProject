"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string; flag: string }[] = [
  { value: "ko", label: "한국어", flag: "🇰🇷" },
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "ja", label: "日本語", flag: "🇯🇵" },
];

const FAB_LABEL: Record<Lang, string> = { ko: "한", en: "EN", ja: "日" };

export default function LangFAB() {
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

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      {/* 언어 옵션 (위쪽으로 펼침) */}
      {open && (
        <div className="flex flex-col gap-1.5 items-center">
          {OPTIONS.map(({ value, label, flag }) => (
            <button
              key={value}
              onClick={() => { setLang(value); setOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold shadow-lg border transition-all whitespace-nowrap
                ${lang === value
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white scale-105"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-500"
                }`}
            >
              <span>{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}

      {/* 메인 FAB 버튼 */}
      <button
        onClick={() => setOpen((o) => !o)}
        title="언어 선택"
        className={`w-12 h-12 rounded-full shadow-lg border flex items-center justify-center text-sm font-bold transition-all
          ${open
            ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white rotate-12"
            : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:shadow-xl dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:border-zinc-500"
          }`}
      >
        {FAB_LABEL[lang]}
      </button>
    </div>
  );
}
