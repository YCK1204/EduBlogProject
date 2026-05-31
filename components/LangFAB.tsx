"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import type { Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "ko", label: "한" },
  { value: "en", label: "EN" },
  { value: "ja", label: "日" },
];

export default function LangFAB() {
  const { lang, setLang, t } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
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
      {/* 설정 옵션 (위쪽으로 펼침) */}
      {open && (
        <div className="flex flex-col gap-1.5 items-center">          
          {/* 언어 옵션들 */}
          {OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => { setLang(value); setOpen(false); }}
              className={`w-12 h-8 rounded-full text-sm font-semibold shadow-lg border transition-all flex items-center justify-center
                ${lang === value
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white scale-105"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-500"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* 테마 토글 버튼 */}
      <button
        onClick={toggleTheme}
        title={theme === "dark" ? t.theme.switchToLight : t.theme.switchToDark}
        className="w-12 h-12 rounded-full shadow-lg border flex items-center justify-center transition-all bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:shadow-xl dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:border-zinc-500"
      >
        {theme === "dark" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4"/>
            <path d="m12 2 0 2"/>
            <path d="m12 20 0 2"/>
            <path d="m4.93 4.93 1.41 1.41"/>
            <path d="m17.66 17.66 1.41 1.41"/>
            <path d="m2 12 2 0"/>
            <path d="m20 12 2 0"/>
            <path d="m6.34 17.66-1.41 1.41"/>
            <path d="m19.07 4.93-1.41 1.41"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>

      {/* 메인 FAB 버튼 (언어) */}
      <button
        onClick={() => setOpen((o) => !o)}
        title={t.lesson.language}
        className={`w-12 h-12 rounded-full shadow-lg border flex items-center justify-center text-sm font-bold transition-all
          ${open
            ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white rotate-90"
            : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:shadow-xl dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:border-zinc-500"
          }`}
      >
        {OPTIONS.find(opt => opt.value === lang)?.label || "한"}
      </button>
    </div>
  );
}
