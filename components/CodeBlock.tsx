"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import hljs from "highlight.js/lib/core";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import type { CodeLang } from "@/lib/lessonTypes";

type StepCode = Partial<Record<CodeLang, string>>;

hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("javascript", javascript);

const LANG_LABELS: Record<CodeLang, string> = {
  c: "C",
  cpp: "C++",
  csharp: "C#",
  python: "Python",
  java: "Java",
  javascript: "JavaScript",
};

const LANG_ORDER: CodeLang[] = ["c", "cpp", "csharp", "python", "java", "javascript"];

const HLJS_ALIAS: Record<CodeLang, string> = {
  c: "c",
  cpp: "cpp",
  csharp: "csharp",
  python: "python",
  java: "java",
  javascript: "javascript",
};

interface Props {
  code: StepCode;
}

export default function CodeBlock({ code }: Props) {
  const available = LANG_ORDER.filter((l) => code[l] !== undefined);
  const { t } = useLang();

  const [active, setActive] = useState<CodeLang>(() => available[0]);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLElement>(null);

  const currentLang = available.includes(active) ? active : available[0];
  const currentCode = code[currentLang] ?? "";

  // highlight.js 문법 강조 적용
  useEffect(() => {
    if (!codeRef.current) return;
    const result = hljs.highlight(currentCode, { language: HLJS_ALIAS[currentLang] });
    codeRef.current.innerHTML = result.value;
  }, [currentCode, currentLang]);

  // 드롭다운 외부 클릭 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (available.length === 0) return null;

  const handleSelect = (lang: CodeLang) => {
    setActive(lang);
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="mt-6 rounded-xl border border-zinc-700">
      {/* 헤더 */}
      <div className="relative flex items-center justify-between bg-zinc-800 px-4 py-2 border-b border-zinc-700 rounded-t-xl">
        {/* 언어 드롭다운 */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 text-xs font-medium rounded px-3 py-1.5 transition-colors border border-zinc-600"
          >
            {LANG_LABELS[currentLang]}
            <svg
              className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-1 z-50 min-w-[7rem] rounded-lg border border-zinc-600 bg-zinc-800 shadow-xl overflow-hidden">
              {available.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleSelect(lang)}
                  className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                    lang === currentLang
                      ? "bg-zinc-600 text-white"
                      : "text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {LANG_LABELS[lang]}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors px-2 py-1 rounded hover:bg-zinc-700"
        >
          {copied ? `✓ ${t.dev.copySuccess}` : t.dev.copy}
        </button>
      </div>

      {/* 코드 영역 */}
      <pre
        className="bg-zinc-900 text-zinc-200 text-xs leading-relaxed overflow-x-auto p-5 m-0 rounded-b-xl"
        style={{ fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace' }}
      >
        <code ref={codeRef} className={`language-${HLJS_ALIAS[currentLang]}`} />
      </pre>
    </div>
  );
}
