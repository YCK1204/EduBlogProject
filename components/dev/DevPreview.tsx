"use client";

import type { EditorLesson, EditorBlock } from "@/lib/editorTypes";
import { LANG_LABELS, LEVEL_LABELS } from "@/lib/editorTypes";
import { SLUG_TO_LABEL } from "@/lib/categories";
import { useState, useEffect } from "react";
import ThemedImage from "@/components/ThemedImage";

interface Props {
  lesson: EditorLesson;
  category: string;
  level: string;
}

const LEVEL_COLORS: Record<string, string> = {
  beginner: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
  intermediate: "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
  advanced: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
};

export default function DevPreview({ lesson, category, level }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [slugTitleMap, setSlugTitleMap] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/dev/lessons")
      .then((r) => r.json())
      .then((list: { slug: string; title: string }[]) => {
        const map: Record<string, string> = {};
        for (const item of list) map[item.slug] = item.title;
        setSlugTitleMap(map);
      })
      .catch(() => {});
  }, []);

  const scrollToStep = (i: number) => {
    setActiveStep(i);
    const el = document.getElementById(`preview-step-${i}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-zinc-950">
      <div style={{ padding: "1rem 10vw 3rem" }}>

        {/* 브레드크럼 — 원본 페이지와 동일 */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 mb-4">
          <span>홈</span>
          <span>/</span>
          <span>{SLUG_TO_LABEL[category] ?? category}</span>
          <span>/</span>
          <span className="text-zinc-600 dark:text-zinc-300 font-medium">{lesson.title || "(제목 없음)"}</span>
        </nav>

        {/* 원본 LessonView와 동일: aside + div.min-w-0.flex-1 안에 메타 헤더와 스텝 카드 모두 포함 */}
        <div className="flex gap-10">

          {/* 사이드바 — 원본 LessonView의 aside와 동일 */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-8 flex flex-col" style={{ maxHeight: "calc(100vh - 7rem)" }}>
              <p className="mb-3 shrink-0 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Steps
              </p>
              <div className="overflow-y-auto space-y-1 pr-1">
                {lesson.steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToStep(i)}
                    className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      activeStep === i
                        ? "bg-zinc-100 dark:bg-zinc-800"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      activeStep === i
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                        : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
                    }`}>
                      {i + 1}
                    </span>
                    <span className={`text-sm leading-snug ${
                      activeStep === i
                        ? "font-semibold text-zinc-900 dark:text-white"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}>
                      {s.title || "제목 없음"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* 메인 콘텐츠 — 원본 LessonView의 div.min-w-0.flex-1.space-y-6과 동일 */}
          <div className="min-w-0 flex-1 space-y-6">

            {/* 메타 헤더 카드 — 원본과 동일하게 flex 안에 위치 */}
            <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${LEVEL_COLORS[lesson.level]}`}>
                  {LEVEL_LABELS[lesson.level]}
                </span>
                {lesson.tag.split(",").filter(Boolean).map((tag) => (
                  <span key={tag} className="text-xs text-zinc-400 dark:text-zinc-500">
                    #{tag.trim()}
                  </span>
                ))}
                {lesson.estimatedTime && (
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">{lesson.estimatedTime}</span>
                )}
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {lesson.steps.length}개 스텝
                </span>
              </div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                {lesson.title || <span className="text-zinc-300">(제목 없음)</span>}
              </h1>
              {lesson.summary && (
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{lesson.summary}</p>
              )}

              {/* 구분선 + 관련 항목 — 원본 LessonView와 동일 */}
              <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-5">
                {lesson.relatedSlugs.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      관련 항목
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {lesson.relatedSlugs.map((slug) => (
                        <span
                          key={slug}
                          className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                        >
                          {slugTitleMap[slug] ?? slug}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 모든 스텝을 원본처럼 순서대로 렌더링 — 스크롤로 탐색 */}
            {lesson.steps.map((s, i) => (
              <section
                key={s.id}
                id={`preview-step-${i}`}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-4"
              >
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {i + 1}. {s.title}
                </h2>
                <div className="space-y-4">
                  {s.blocks.map((block, j) => (
                    <PreviewBlock key={j} block={block} />
                  ))}
                  {s.blocks.length === 0 && (
                    <p className="text-sm text-zinc-300 dark:text-zinc-600 italic">블록이 없습니다.</p>
                  )}
                </div>
              </section>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewBlock({ block }: { block: EditorBlock }) {
  const [activeLang, setActiveLang] = useState(0);

  switch (block.type) {
    case "text":
      return (
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
          {block.content}
        </p>
      );

    case "header": {
      const Tag = `h${block.level}` as "h1" | "h2" | "h3";
      const sizes = { 1: "text-2xl font-bold", 2: "text-xl font-bold", 3: "text-lg font-semibold" };
      return (
        <Tag className={`${sizes[block.level]} text-zinc-900 dark:text-white mt-4`}>
          {block.content}
        </Tag>
      );
    }

    case "bold":
      return <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{block.content}</p>;

    case "italic":
      return <p className="text-sm italic text-zinc-600 dark:text-zinc-400">{block.content}</p>;

    case "underbar":
      return <p className="text-sm underline text-zinc-600 dark:text-zinc-400">{block.content}</p>;

    case "strike":
      return <p className="text-sm line-through text-zinc-400">{block.content}</p>;

    case "color":
      return <p className="text-sm" style={{ color: block.color }}>{block.content}</p>;

    case "ul":
      return (
        <ul className="space-y-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 p-5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="space-y-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 p-5 list-decimal list-inside">
          {block.items.map((item, i) => (
            <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300">{item}</li>
          ))}
        </ol>
      );

    case "box":
      return (
        <div className="rounded-xl bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 p-5 space-y-3">
          {block.blocks.map((b, i) => <PreviewBlock key={i} block={b} />)}
        </div>
      );

    case "code": {
      const lang = block.langs[activeLang] ?? block.langs[0];
      if (!lang) return null;
      return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          <div className="flex bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 overflow-x-auto">
            {block.langs.map(({ lang: l }, i) => (
              <button
                key={l}
                onClick={() => setActiveLang(i)}
                className={`px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  activeLang === i
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >{LANG_LABELS[l]}</button>
            ))}
          </div>
          <pre className="bg-zinc-950 text-green-400 font-mono text-sm p-4 overflow-x-auto">
            <code>{lang.code || "// 코드 없음"}</code>
          </pre>
        </div>
      );
    }

    case "image":
      if (!block.src) {
        return (
          <div className="rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 h-32 flex items-center justify-center text-zinc-300 text-sm">
            이미지 없음
          </div>
        );
      }
      return (
        <div style={{ width: `${block.width ?? 100}%`, marginLeft: "auto", marginRight: "auto" }} className="rounded-xl overflow-hidden">
          <ThemedImage src={block.src} alt={block.alt} className="w-full h-auto" />
        </div>
      );

    default:
      return null;
  }
}
