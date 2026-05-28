"use client";

import { useEffect, useRef, useState } from "react";
import type { EditorLesson } from "@/lib/editorTypes";
import { LEVEL_LABELS } from "@/lib/editorTypes";

interface RelatedOption {
  category: string;
  level: string;
  slug: string;
  title: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "data-structures": "자료구조",
  "algorithms": "알고리즘",
  "cs-basics": "CS기초",
  "programming": "프로그래밍",
};

const LEVEL_KO: Record<string, string> = {
  beginner: "초급", intermediate: "중급", advanced: "고급",
};

interface Props {
  lesson: EditorLesson;
  onChange: (lesson: EditorLesson) => void;
}

export default function OverviewEditor({ lesson, onChange }: Props) {
  const [levelOpen, setLevelOpen] = useState(false);
  const [relatedOpen, setRelatedOpen] = useState(false);
  const [relatedOptions, setRelatedOptions] = useState<RelatedOption[]>([]);
  const [relatedHoverCat, setRelatedHoverCat] = useState<string | null>(null);
  const [relatedHoverLvl, setRelatedHoverLvl] = useState<string | null>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/dev/lessons")
      .then((r) => r.json())
      .then(setRelatedOptions)
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (relatedRef.current && !relatedRef.current.contains(e.target as Node)) setRelatedOpen(false);
      if (levelRef.current && !levelRef.current.contains(e.target as Node)) setLevelOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const addRelated = (slug: string) => {
    if (!lesson.relatedSlugs.includes(slug)) {
      onChange({ ...lesson, relatedSlugs: [...lesson.relatedSlugs, slug] });
    }
    setRelatedOpen(false);
  };

  const removeRelated = (slug: string) => {
    onChange({ ...lesson, relatedSlugs: lesson.relatedSlugs.filter((s) => s !== slug) });
  };

  const addTag = () => onChange({ ...lesson, tag: lesson.tag ? lesson.tag : "" });

  const categoriesInOptions = [...new Set(relatedOptions.map((o) => o.category))];
  const levelsInCat = relatedHoverCat
    ? [...new Set(relatedOptions.filter((o) => o.category === relatedHoverCat).map((o) => o.level))]
    : [];
  const slugsInLevel = relatedHoverCat && relatedHoverLvl
    ? relatedOptions.filter((o) => o.category === relatedHoverCat && o.level === relatedHoverLvl)
    : [];

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8 space-y-4">
      {/* 슬러그 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-400 w-20 shrink-0">slug</span>
        <input
          value={lesson.slug}
          onChange={(e) => onChange({ ...lesson, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
          placeholder="url-slug (예: linked-list)"
          className="flex-1 text-sm bg-transparent outline-none border-b border-zinc-200 dark:border-zinc-700 pb-0.5 text-zinc-700 dark:text-zinc-300 focus:border-amber-400"
        />
      </div>

      {/* 제목 */}
      <div>
        <input
          value={lesson.title}
          onChange={(e) => onChange({ ...lesson, title: e.target.value })}
          placeholder="레슨 제목..."
          className="w-full text-3xl font-bold bg-transparent outline-none text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
        />
        <textarea
          value={lesson.summary}
          onChange={(e) => onChange({ ...lesson, summary: e.target.value })}
          placeholder="요약 설명을 입력하세요..."
          className="w-full mt-2 text-base bg-transparent outline-none text-zinc-500 dark:text-zinc-400 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 resize-none"
          rows={2}
        />
      </div>

      {/* 메타 행 */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 태그들 */}
        <div className="flex flex-wrap items-center gap-2">
          {lesson.tag.split(",").filter(Boolean).map((tag, i) => (
            <span
              key={i}
              className="group/tag flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-300"
            >
              #{tag.trim()}
              <button
                onClick={() => {
                  const tags = lesson.tag.split(",").filter((_, j) => j !== i).join(",");
                  onChange({ ...lesson, tag: tags });
                }}
                className="hidden group-hover/tag:inline text-zinc-400 hover:text-red-400"
              >×</button>
            </span>
          ))}
          <button
            onClick={() => {
              const newTag = prompt("태그 입력:");
              if (newTag) onChange({ ...lesson, tag: lesson.tag ? `${lesson.tag},${newTag}` : newTag });
            }}
            className="px-2 py-0.5 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700 text-xs text-zinc-400 hover:border-amber-400 hover:text-amber-500 transition-colors"
          >+ 태그</button>
        </div>

        {/* 난이도 */}
        <div ref={levelRef} className="relative">
          <button
            onClick={() => setLevelOpen((o) => !o)}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {LEVEL_LABELS[lesson.level]} ▾
          </button>
          {levelOpen && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden">
              {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => { onChange({ ...lesson, level: lvl }); setLevelOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                    lesson.level === lvl
                      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600"
                      : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >{LEVEL_LABELS[lvl]}</button>
              ))}
            </div>
          )}
        </div>

        {/* 예상 시간 */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-zinc-400">⏱</span>
          <input
            value={lesson.estimatedTime}
            onChange={(e) => onChange({ ...lesson, estimatedTime: e.target.value })}
            className="text-xs bg-transparent outline-none text-zinc-500 dark:text-zinc-400 w-16 border-b border-transparent focus:border-zinc-300"
          />
        </div>
      </div>

      {/* 관련 레슨 */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-zinc-400">관련 레슨:</span>
        {lesson.relatedSlugs.map((slug) => {
          const opt = relatedOptions.find((o) => o.slug === slug);
          return (
            <span
              key={slug}
              className="group/rel flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-xs text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
            >
              {opt?.title ?? slug}
              <button
                onClick={() => removeRelated(slug)}
                className="hidden group-hover/rel:inline text-blue-400 hover:text-red-400"
              >×</button>
            </span>
          );
        })}

        {/* 관련 레슨 추가 — 3단 캐스케이딩 메뉴 */}
        <div ref={relatedRef} className="relative">
          <button
            onClick={() => setRelatedOpen((o) => !o)}
            className="px-2.5 py-0.5 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700 text-xs text-zinc-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
          >+ 관련 추가</button>

          {relatedOpen && (
            <div className="absolute top-full left-0 mt-1 z-50 flex gap-0 shadow-2xl rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
              {/* 1단: 카테고리 */}
              <div className="bg-white dark:bg-zinc-900 min-w-[8rem]">
                {categoriesInOptions.map((cat) => (
                  <button
                    key={cat}
                    onMouseEnter={() => { setRelatedHoverCat(cat); setRelatedHoverLvl(null); }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                      relatedHoverCat === cat
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        : "text-zinc-600 dark:text-zinc-300"
                    }`}
                  >
                    {CATEGORY_LABELS[cat] ?? cat} <span className="text-zinc-400">›</span>
                  </button>
                ))}
              </div>

              {/* 2단: 레벨 */}
              {relatedHoverCat && (
                <div className="bg-zinc-50 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 min-w-[6rem]">
                  {levelsInCat.map((lvl) => (
                    <button
                      key={lvl}
                      onMouseEnter={() => setRelatedHoverLvl(lvl)}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                        relatedHoverLvl === lvl
                          ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white"
                          : "text-zinc-600 dark:text-zinc-300"
                      }`}
                    >
                      {LEVEL_KO[lvl] ?? lvl} <span className="text-zinc-400">›</span>
                    </button>
                  ))}
                </div>
              )}

              {/* 3단: 슬러그 목록 */}
              {relatedHoverCat && relatedHoverLvl && (
                <div className="bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-700 min-w-[10rem] max-h-48 overflow-y-auto">
                  {slugsInLevel.map((opt) => (
                    <button
                      key={opt.slug}
                      onClick={() => addRelated(opt.slug)}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                        lesson.relatedSlugs.includes(opt.slug)
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                          : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {opt.title}
                      {lesson.relatedSlugs.includes(opt.slug) && <span className="ml-1">✓</span>}
                    </button>
                  ))}
                  {slugsInLevel.length === 0 && (
                    <p className="px-3 py-2 text-xs text-zinc-400">없음</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
