"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { STRINGS, type Lang, type Strings } from "@/lib/i18n";

interface LangContextValue {
  lang: Lang;
  t: Strings;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "ko",
  t: STRINGS.ko,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "ko" || saved === "en" || saved === "ja") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem("lang", next);
    document.documentElement.lang = next;
  };

  return (
    <LangContext.Provider value={{ lang, t: STRINGS[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
