"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Lesson, Block, CodeBlock as CodeBlockType } from "@/lib/lessonTypes";
import type { RelatedEntry } from "@/lib/lessonLoader";
import CodeBlock from "@/components/CodeBlock";
import ThemedImage from "@/components/ThemedImage";
import { useLang } from "@/components/LanguageProvider";
import { useProgress } from "@/lib/useProgress";

const CATEGORY_NAV_KEY: Record<string, "dataStructures" | "algorithms" | "csBasics" | "programming"> = {
  "data-structures": "dataStructures",
  algorithms: "algorithms",
  "cs-basics": "csBasics",
  programming: "programming",
};

const PLACEHOLDER_PATTERNS = [
  { bg: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", size: "24px 24px" },
  { bg: "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 8px)", size: "8px 8px" },
  { bg: "repeating-linear-gradient(0deg, currentColor 0, currentColor 1px, transparent 0, transparent 16px)", size: "16px 16px" },
  { bg: "repeating-linear-gradient(90deg, currentColor 0, currentColor 1px, transparent 0, transparent 16px)", size: "16px 16px" },
];

const LEVEL_COLORS = {
  "초급": "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
  "중급": "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
  "고급": "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
};

interface Props {
  koLesson: Lesson;
  enLesson: Lesson | null;
  jaLesson: Lesson | null;
  category: string;
  relatedEntries: RelatedEntry[];
}

function renderBlock(block: Block, idx: number, lang: "ko" | "en" | "ja"): React.ReactNode {
  switch (block.type) {
    case "text":
      return <p key={idx} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{block.content}</p>;

    case "header": {
      const sizes: Record<1|2|3, string> = { 1: "text-2xl font-bold", 2: "text-xl font-bold", 3: "text-lg font-semibold" };
      const Tag = `h${block.level + 1}` as "h2" | "h3" | "h4";
      return <Tag key={idx} className={`${sizes[block.level]} text-zinc-900 dark:text-white mt-4`}>{block.content}</Tag>;
    }

    case "bold":
      return <p key={idx} className="text-sm leading-relaxed font-bold text-zinc-900 dark:text-white">{block.content}</p>;
    case "italic":
      return <p key={idx} className="text-sm leading-relaxed italic text-zinc-600 dark:text-zinc-400">{block.content}</p>;
    case "underbar":
      return <p key={idx} className="text-sm leading-relaxed underline text-zinc-600 dark:text-zinc-400">{block.content}</p>;
    case "strike":
      return <p key={idx} className="text-sm leading-relaxed line-through text-zinc-600 dark:text-zinc-400">{block.content}</p>;
    case "color":
      return <p key={idx} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400" style={{ color: block.color }}>{block.content}</p>;

    case "points":
      return (
        <ul key={idx} className="space-y-1 list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );

    case "ol":
      return (
        <ol key={idx} className="space-y-1 list-decimal list-inside text-sm text-zinc-600 dark:text-zinc-400">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );

    case "box":
      return (
        <div key={idx} className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 space-y-3">
          {block.blocks.map((b, i) => renderBlock(b, i, lang))}
        </div>
      );

    case "image": {
      const src = lang === "en" && block.srcEn ? block.srcEn : block.src;
      const alt = lang === "en" && block.altEn ? block.altEn : block.alt;
      
      return (
        <div key={idx} className="my-6">
          <ThemedImage
            src={src}
            alt={alt}
            width={block.width || 600}
            height={400}
            className="rounded-lg mx-auto"
          />
        </div>
      );
    }

    case "code":
      return <CodeBlock key={idx} code={block as CodeBlockType} />;

    default:
      return null;
  }
}

export default function LessonView({ koLesson, enLesson, jaLesson, category, relatedEntries }: Props) {
  const { lang, t } = useLang();
  
  // 표시 언어 → 폴백 ja → en → ko
  const lesson =
    lang === "ja"
      ? jaLesson ?? enLesson ?? koLesson
      : lang === "en"
        ? enLesson ?? koLesson
        : koLesson;
  
  const [activeStep, setActiveStep] = useState(1);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const sidebarItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { markComplete, isComplete } = useProgress();
  const completed = isComplete(koLesson.slug);

  const navKey = CATEGORY_NAV_KEY[category];
  const categoryLabel = navKey ? t.nav[navKey] : category;
  const categoryHref = `/category/${category}`;

  // 스크롤 기반 활성 스텝 감지
  useEffect(() => {
    const TRIGGER_OFFSET = 150;

    const handleScroll = () => {
      let current = lesson.steps[0]?.number ?? 1;
      for (let i = 0; i < lesson.steps.length; i++) {
        const el = stepRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= TRIGGER_OFFSET) {
          current = lesson.steps[i].number;
        }
      }
      setActiveStep(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lesson.steps]);

  // 활성 스텝이 바뀌면 사이드바의 해당 버튼을 자동으로 스크롤해서 보이게 함
  useEffect(() => {
    const idx = lesson.steps.findIndex((s) => s.number === activeStep);
    if (idx < 0) return;
    sidebarItemRefs.current[idx]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeStep, lesson.steps]);

  const scrollToStep = (num: number) => {
    const el = stepRefs.current[num - 1];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="flex gap-10">
      {/* 왼쪽 사이드바 */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24 flex flex-col" style={{ maxHeight: "calc(100vh - 7rem)" }}>
          <p className="mb-3 shrink-0 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Steps
          </p>
          <div className="overflow-y-auto space-y-1 pr-1">
            {lesson.steps.map((step, i) => (
              <button
                key={step.number}
                ref={(el) => { sidebarItemRefs.current[i] = el; }}
                onClick={() => scrollToStep(step.number)}
                className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  activeStep === step.number
                    ? "bg-zinc-100 dark:bg-zinc-800"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  activeStep === step.number
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
                }`}>
                  {step.number}
                </span>
                <span className={`text-sm leading-snug ${
                  activeStep === step.number
                    ? "font-semibold text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <div className="min-w-0 flex-1 space-y-6">
        {/* 챕터 헤더 */}
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${LEVEL_COLORS[koLesson.level]}`}>
              {t.lesson.level[koLesson.level]}
            </span>
            {koLesson.tag.split(",").filter(Boolean).map((tag, i) => (
              <span key={i} className="text-xs text-zinc-400 dark:text-zinc-500">#{tag.trim()}</span>
            ))}
            <span className="text-xs text-zinc-400 dark:text-zinc-500">{koLesson.estimatedTime}</span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {lesson.steps.length}{t.lesson.stepsCount}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{lesson.title}</h1>
          </div>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{lesson.summary}</p>

          <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-5 flex items-start justify-between gap-4">
            {relatedEntries.length > 0 ? (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {t.lesson.relatedTopics}
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedEntries.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/category/${category}/${rel.levelFolder}/${rel.slug}`}
                      className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
                    >
                      {lang === "ja" ? rel.jaTitle : lang === "en" ? rel.enTitle : rel.koTitle}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div />
            )}

            <nav className="flex flex-wrap gap-2 text-xs">
              <Link href={categoryHref} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                {categoryLabel}
              </Link>
              <span className="text-zinc-300 dark:text-zinc-600">•</span>
              <span className="text-zinc-500">{t.lesson.level[koLesson.level]}</span>
            </nav>
          </div>
        </section>

        {/* 스텝 목록 */}
        {lesson.steps.map((step, i) => {
          const pattern = PLACEHOLDER_PATTERNS[step.number % PLACEHOLDER_PATTERNS.length];
          return (
            <section
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
              id={`step-${step.number}`}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800"
            >
              <div className="p-8 space-y-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {step.number}. {step.title}
                </h2>
                <div className="space-y-3">
                  {step.blocks.map((block, j) => (
                    <div key={j}>{renderBlock(block, j, lang)}</div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* 완료 버튼 */}
        <div className="flex justify-center pt-8">
          <div className="text-center">
            <button
              onClick={() => markComplete(koLesson.slug)}
              className={`rounded-xl px-8 py-4 font-semibold text-sm transition-colors ${
                completed
                  ? "bg-green-500 text-white"
                  : "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              }`}
            >
              {completed ? (
                "✓ 완료됨"
              ) : (
                "완료 표시"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}