"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Lesson, Block, CodeBlock as CodeBlockType } from "@/lib/lessonTypes";
import type { RelatedEntry } from "@/lib/lessonLoader";
import CodeBlock from "@/components/CodeBlock";
import EditableBlock from "@/components/EditableBlock";
import Toast, { useToast } from "@/components/Toast";
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
  category: string;
  relatedEntries: RelatedEntry[];
}

function renderBlock(block: Block, idx: number, lang: "ko" | "en"): React.ReactNode {
  switch (block.type) {
    case "text":
      return <p key={idx} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{block.content}</p>;

    case "header": {
      const sizes: Record<1|2|3, string> = { 1: "text-2xl font-bold", 2: "text-xl font-bold", 3: "text-lg font-semibold" };
      const Tag = `h${block.level + 1}` as "h2" | "h3" | "h4";
      return <Tag key={idx} className={`${sizes[block.level]} text-zinc-900 dark:text-white mt-4`}>{block.content}</Tag>;
    }

    case "bold":
      return <p key={idx} className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{block.content}</p>;

    case "italic":
      return <p key={idx} className="text-sm italic text-zinc-600 dark:text-zinc-400">{block.content}</p>;

    case "underbar":
      return <p key={idx} className="text-sm underline text-zinc-600 dark:text-zinc-400">{block.content}</p>;

    case "strike":
      return <p key={idx} className="text-sm line-through text-zinc-400">{block.content}</p>;

    case "color":
      return <p key={idx} className="text-sm" style={{ color: block.color }}>{block.content}</p>;

    case "points":
      return (
        <ul key={idx} className="space-y-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 p-5">
          {block.items.map((pt, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              {pt}
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol key={idx} className="space-y-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 p-5 list-decimal list-inside">
          {block.items.map((pt, j) => (
            <li key={j} className="text-sm text-zinc-700 dark:text-zinc-300">{pt}</li>
          ))}
        </ol>
      );

    case "box":
      return (
        <div key={idx} className="rounded-xl bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 p-5 space-y-3">
          {block.blocks.map((b, j) => renderBlock(b, j, lang))}
        </div>
      );

    case "image": {
      // Use language-specific image if available
      const src = lang === "en" && block.srcEn ? block.srcEn : block.src;
      const alt = lang === "en" && block.altEn ? block.altEn : block.alt;
      
      return (
        <div key={idx} style={{ width: `${block.width ?? 100}%`, marginLeft: "auto", marginRight: "auto" }} className="rounded-xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="w-full h-auto" />
        </div>
      );
    }

    case "code": {
      const { type, ...codeMap } = block as CodeBlockType & { type: string };
      return <CodeBlock key={idx} code={codeMap as Partial<Record<import("@/lib/lessonTypes").CodeLang, string>>} />;
    }

    default:
      return null;
  }
}

export default function LessonView({ koLesson, enLesson, category, relatedEntries }: Props) {
  const { lang, t } = useLang();
  const { toast, showToast, hideToast } = useToast();
  const [editableLesson, setEditableLesson] = useState<Lesson>(koLesson);
  const [editableEnLesson, setEditableEnLesson] = useState<Lesson | null>(enLesson);
  const lesson = lang === "en" && editableEnLesson ? editableEnLesson : editableLesson;
  const [activeStep, setActiveStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const saveKey = `lesson-${koLesson.slug}-ko`;
    const savedKoData = localStorage.getItem(saveKey);
    if (savedKoData) {
      try {
        setEditableLesson(JSON.parse(savedKoData));
      } catch (error) {
        console.error("저장된 한국어 데이터를 불러오는 중 오류:", error);
      }
    }

    if (enLesson) {
      const saveKeyEn = `lesson-${koLesson.slug}-en`;
      const savedEnData = localStorage.getItem(saveKeyEn);
      if (savedEnData) {
        try {
          setEditableEnLesson(JSON.parse(savedEnData));
        } catch (error) {
          console.error("저장된 영어 데이터를 불러오는 중 오류:", error);
        }
      }
    }
  }, [koLesson.slug, enLesson]);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const sidebarItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { markComplete, isComplete } = useProgress();
  const completed = isComplete(koLesson.slug);

  const navKey = CATEGORY_NAV_KEY[category];
  const categoryLabel = navKey ? t.nav[navKey] : category;
  const categoryHref = `/category/${category}`;

  // 스크롤 기반 활성 스텝 감지 — 뷰포트 상단 150px 기준선을 넘은 마지막 스텝을 활성화
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

  // Block editing functions
  const updateLessonData = (updater: (lesson: Lesson) => Lesson) => {
    if (lang === "en" && editableEnLesson) {
      setEditableEnLesson(updater(editableEnLesson));
    } else {
      setEditableLesson(updater(editableLesson));
    }
  };

  const handleDeleteBlock = (stepIndex: number, blockIndex: number) => {
    updateLessonData(lesson => ({
      ...lesson,
      steps: lesson.steps.map((step, i) => 
        i === stepIndex 
          ? { ...step, blocks: step.blocks.filter((_, j) => j !== blockIndex) }
          : step
      )
    }));
  };

  const handleMoveBlock = (stepIndex: number, fromIndex: number, toIndex: number) => {
    updateLessonData(lesson => ({
      ...lesson,
      steps: lesson.steps.map((step, i) => {
        if (i !== stepIndex) return step;
        
        const blocks = [...step.blocks];
        const [movedBlock] = blocks.splice(fromIndex, 1);
        const newToIndex = toIndex > fromIndex ? toIndex - 1 : toIndex;
        blocks.splice(Math.max(0, Math.min(newToIndex, blocks.length)), 0, movedBlock);
        
        return { ...step, blocks };
      })
    }));
  };

  const handleDuplicateBlock = (stepIndex: number, blockIndex: number) => {
    updateLessonData(lesson => ({
      ...lesson,
      steps: lesson.steps.map((step, i) => 
        i === stepIndex 
          ? { 
              ...step, 
              blocks: [
                ...step.blocks.slice(0, blockIndex + 1),
                JSON.parse(JSON.stringify(step.blocks[blockIndex])), // Deep copy
                ...step.blocks.slice(blockIndex + 1)
              ]
            }
          : step
      )
    }));
  };

  const handleCopyBlock = async (stepIndex: number, blockIndex: number) => {
    try {
      const blockToCopy = lesson.steps[stepIndex].blocks[blockIndex];
      const textToCopy = JSON.stringify(blockToCopy, null, 2);
      
      // Copy to clipboard using the modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      
      // Show success toast
      showToast('블록이 클립보드에 복사되었습니다', 'success');
      
    } catch (error) {
      console.error('클립보드 복사 중 오류가 발생했습니다:', error);
      showToast('클립보드 복사에 실패했습니다', 'error');
    }
  };

  const handleSaveChanges = () => {
    try {
      // Save to localStorage for demo purposes
      // In a real app, this would be an API call
      const saveKey = `lesson-${koLesson.slug}-${lang}`;
      const dataToSave = lang === "en" && editableEnLesson ? editableEnLesson : editableLesson;
      localStorage.setItem(saveKey, JSON.stringify(dataToSave));
      
      // Show success toast
      showToast("변경사항이 저장되었습니다!", "success");
    } catch (error) {
      console.error("저장 중 오류가 발생했습니다:", error);
      showToast("저장 중 오류가 발생했습니다.", "error");
    }
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
            <div className="flex items-center gap-2">
              {isEditMode && (
                <button
                  onClick={() => handleSaveChanges()}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  변경사항 저장
                </button>
              )}
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isEditMode
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {isEditMode ? "편집 완료" : "편집 모드"}
              </button>
            </div>
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
                      {lang === "en" ? rel.enTitle : rel.koTitle}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div />
            )}

            <div />
          </div>
        </section>

        {/* 모바일 전용 스텝 진행 표시 */}
        {(() => {
          const totalSteps = lesson.steps.length;
          const currentStep = lesson.steps.find((s) => s.number === activeStep);
          const progressPct = totalSteps > 0 ? (activeStep / totalSteps) * 100 : 0;
          return (
            <div className="lg:hidden rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {activeStep} / {totalSteps} 단계
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {Math.round(progressPct)}%
                </span>
              </div>
              {currentStep && (
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">
                  {currentStep.number}. {currentStep.title}
                </p>
              )}
              <div className="w-full h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-zinc-900 dark:bg-white transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          );
        })()}

        {/* 스텝 카드들 */}
        {lesson.steps.map((step, i) => {
          const pat = PLACEHOLDER_PATTERNS[i % PLACEHOLDER_PATTERNS.length];
          return (
            <section
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
              id={`step-${step.number}`}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className={`p-8 space-y-4 ${isEditMode ? 'pl-16' : ''}`}>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {step.number}. {step.title}
                </h2>
                <div className="space-y-3">
                  {step.blocks.map((block, j) => 
                    isEditMode ? (
                      <EditableBlock
                        key={`${step.number}-${j}`}
                        block={block}
                        blockIndex={j}
                        stepIndex={i}
                        lang={lang}
                        onDeleteBlock={handleDeleteBlock}
                        onMoveBlock={handleMoveBlock}
                        onDuplicateBlock={handleDuplicateBlock}
                        onCopyBlock={handleCopyBlock}
                        renderBlock={renderBlock}
                      />
                    ) : (
                      <div key={j}>{renderBlock(block, j, lang)}</div>
                    )
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {/* 하단 네비게이션 */}
        <div className="flex items-center justify-between py-6 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href={categoryHref}
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            {t.lesson.backToListPrefix}{categoryLabel}{t.lesson.backToListSuffix}
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {lesson.steps.length}{t.lesson.stepsCompleted}
            </span>
            <button
              onClick={() => markComplete(koLesson.slug)}
              disabled={completed}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                completed
                  ? "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 cursor-default"
                  : "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              }`}
            >
              {completed ? (
                <>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  완료됨
                </>
              ) : (
                "완료 표시"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onHide={hideToast}
      />
    </div>
  );
}
