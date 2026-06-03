"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter, notFound } from "next/navigation";
import { Suspense } from "react";
import type { EditorLesson, EditorStep } from "@/lib/editorTypes";
import { newLesson } from "@/lib/editorTypes";
import BlockEditor from "@/components/dev/BlockEditor";
import OverviewEditor from "@/components/dev/OverviewEditor";
import DevPreview from "@/components/dev/DevPreview";

function EditorInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") ?? "data-structures";
  const level = searchParams.get("level") ?? "beginner";
  const slug = searchParams.get("slug"); // null이면 신규

  const [lesson, setLesson] = useState<EditorLesson>(() => {
    if (typeof window !== "undefined" && slug && process.env.NODE_ENV === "development") {
      const loadLessonFromLocalStorage = () => {
        const key = `editor_lesson_${category}_${level}_${slug}`;
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            const data = JSON.parse(stored);
            return data;
          } catch (e) {
            console.error("Failed to parse stored lesson data:", e);
          }
        }
        return null;
      };

      const data = loadLessonFromLocalStorage();
      if (data) {
        const steps: EditorStep[] = (data.steps ?? []).map((s: {
          number: number;
          title: string;
          blocks: unknown[];
        }) => ({
          id: crypto.randomUUID(),
          title: s.title ?? "",
          blocks: (s.blocks ?? []).map((b: unknown) => convertBlock(b)),
        }));
        return {
          slug: data.slug ?? slug,
          title: data.title ?? "",
          summary: data.summary ?? "",
          tag: data.tag ?? "",
          level:
            data.level === "초급"
              ? "beginner"
              : data.level === "중급"
                ? "intermediate"
                : data.level === "고급"
                  ? "advanced"
                  : (level as EditorLesson["level"]),
          relatedSlugs: data.relatedSlugs ?? [],
          steps: steps.length > 0 ? steps : [{ id: crypto.randomUUID(), title: "개요", blocks: [] }],
        };
      }
    }
    return newLesson(category, level);
  });

  const [activeStepId, setActiveStepId] = useState<string>(() => {
    const initialLesson = lesson || newLesson(category, level);
    return initialLesson.steps.length > 0 ? initialLesson.steps[0].id : "";
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(() => searchParams.get("preview") === "true");
  const [stepDragOver, setStepDragOver] = useState<number | null>(null);

  // Undo/Redo 히스토리 관리
  const [history, setHistory] = useState<EditorLesson[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [redoStack, setRedoStack] = useState<EditorLesson[]>([]);

  // 히스토리에 현재 상태 저장
  const saveToHistory = () => {
    const newHistory = [...history.slice(0, historyIndex + 1), lesson];

    // 히스토리 크기 제한 (최대 50개)
    if (newHistory.length > 50) {
      newHistory.splice(0, newHistory.length - 50);
    }

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setRedoStack([]); // redo 스택 초기화
  };

  // Undo 실행
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);

      // Redo 스택에 현재 상태 저장
      setRedoStack((prev) => [...prev, lesson]);

      // 이전 상태로 복원
      setLesson(history[newIndex]);
    }
  }, [historyIndex, history, lesson]);

  // Redo 실행
  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const lastRedo = redoStack[redoStack.length - 1];

      // 히스토리에 현재 상태 추가
      const newHistoryIndex = historyIndex + 1;
      const newHistory = [...history.slice(0, newHistoryIndex), lastRedo];
      setHistory(newHistory);
      setHistoryIndex(newHistoryIndex);

      // Redo 스택에서 제거
      setRedoStack((prev) => prev.slice(0, -1));

      // 상태 복원
      setLesson(lastRedo);
    }
  }, [redoStack, historyIndex, history]);

  // 키보드 단축키 이벤트 리스너
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z (Undo)
      if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Ctrl+Shift+Z (Redo)
      else if (e.ctrlKey && e.shiftKey && e.key === "Z") {
        e.preventDefault();
        handleRedo();
      }
      // Ctrl+Y (Redo alternative)
      else if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  const activeStep = lesson.steps.find((s) => s.id === activeStepId) ?? lesson.steps[0];

  const addStep = () => {
    saveToHistory();
    const step: EditorStep = { id: crypto.randomUUID(), title: "새 챕터", blocks: [] };
    const next = { ...lesson, steps: [...lesson.steps, step] };
    setLesson(next);
    setActiveStepId(step.id);
  };

  const updateStep = (id: string, patch: Partial<EditorStep>) => {
    saveToHistory();
    setLesson((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  };

  const removeStep = (id: string) => {
    saveToHistory();
    const next = lesson.steps.filter((s) => s.id !== id);
    setLesson((prev) => ({ ...prev, steps: next }));
    if (activeStepId === id) setActiveStepId(next[0]?.id ?? "");
  };

  const reorderSteps = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) return;
    saveToHistory();
    const next = [...lesson.steps];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(fromIdx < toIdx ? toIdx - 1 : toIdx, 0, moved);
    setLesson((prev) => ({ ...prev, steps: next }));
  };

  const save = async () => {
    if (!lesson.slug) {
      alert("slug를 입력하세요.");
      return;
    }
    if (!lesson.title) {
      alert("제목을 입력하세요.");
      return;
    }
    setSaving(true);
    try {
      const payload = lessonToJson(lesson);
      
      // 개발 모드에서는 localStorage에 저장 (임시 방편)
      if (process.env.NODE_ENV === "development") {
        const key = `editor_lesson_${category}_${lesson.level}_${lesson.slug}`;
        localStorage.setItem(key, JSON.stringify(payload));
        console.log("Lesson saved to localStorage (dev mode only)");
        alert("개발 모드에서는 localStorage에 임시 저장됩니다.\n실제 파일 저장을 위해서는 서버 구성이 필요합니다.");
      } else {
        alert("에디터는 개발 모드에서만 사용 가능합니다.");
        return;
      }
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.replace(`/dev/editor?category=${category}&level=${lesson.level}&slug=${lesson.slug}`);
    } catch (error) {
      console.error("Save error:", error);
      alert("저장 실패");
    } finally {
      setSaving(false);
    }
  };

  const saveAndExit = async () => {
    if (!lesson.slug || !lesson.title) {
      router.push(`/category/${category}`);
      return;
    }
    try {
      if (process.env.NODE_ENV === "development") {
        const payload = lessonToJson(lesson);
        const key = `editor_lesson_${category}_${lesson.level}_${lesson.slug}`;
        localStorage.setItem(key, JSON.stringify(payload));
        console.log("Lesson saved to localStorage before exit");
      }
    } catch {
      /* 저장 실패해도 이동 */
    }
    router.push(`/category/${category}/${lesson.level}/${lesson.slug}`);
  };

  return (
    <div className="relative flex-1 flex overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      {/* ── 좌측: Step 목록 ── */}
      <aside className="w-52 shrink-0 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Dev Editor</span>
            <button
              onClick={() => router.push(`/category/${category}`)}
              className="text-xs text-zinc-400 hover:text-zinc-600"
            >← 나가기</button>
          </div>
          <p className="text-xs text-zinc-400 truncate">{category} / {level}</p>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {lesson.steps.map((step, idx) => (
            <div
              key={step.id}
              draggable
              onDragStart={(e) => { e.dataTransfer.setData("text/step-index", String(idx)); }}
              onDragEnd={() => setStepDragOver(null)}
              onDragOver={(e) => { e.preventDefault(); setStepDragOver(idx); }}
              onDragLeave={() => setStepDragOver(null)}
              onDrop={(e) => {
                e.preventDefault();
                setStepDragOver(null);
                const fromIdx = Number(e.dataTransfer.getData("text/step-index"));
                reorderSteps(fromIdx, idx);
              }}
              onClick={() => setActiveStepId(step.id)}
              className={`group flex items-center gap-2 mx-2 px-2 py-2 rounded-lg cursor-pointer transition-colors ${
                stepDragOver === idx ? "border-t-2 border-blue-400" : ""
              } ${
                activeStepId === step.id
                  ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {/* 드래그 핸들 */}
              <div className="shrink-0 cursor-grab opacity-0 group-hover:opacity-40 hover:!opacity-80 transition-opacity select-none text-zinc-400">
                <svg width="6" height="10" viewBox="0 0 8 12" fill="currentColor">
                  <circle cx="2" cy="2" r="1.5"/><circle cx="6" cy="2" r="1.5"/>
                  <circle cx="2" cy="6" r="1.5"/><circle cx="6" cy="6" r="1.5"/>
                  <circle cx="2" cy="10" r="1.5"/><circle cx="6" cy="10" r="1.5"/>
                </svg>
              </div>
              <span className="text-xs text-zinc-400 w-4 shrink-0">{idx + 1}</span>
              <span className="text-sm flex-1 truncate">{step.title || "제목 없음"}</span>
              {lesson.steps.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); removeStep(step.id); }}
                  className="hidden group-hover:block text-zinc-300 hover:text-red-400 text-xs"
                >×</button>
              )}
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={addStep}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 text-xs text-zinc-500 hover:border-amber-400 hover:text-amber-500 transition-colors"
          >+ 챕터 추가</button>
        </div>
      </aside>

      {/* ── 우측: 편집 영역 ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 토글 버튼 바 */}
        <div className="shrink-0 flex items-center justify-between px-6 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          {/* Undo/Redo 버튼 */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title="실행 취소 (Ctrl+Z)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-current">
                <path d="M9 14l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 10h11a4 4 0 0 1 0 8h-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-1.5 rounded-lg text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title="다시 실행 (Ctrl+Shift+Z)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-current">
                <path d="M15 14l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 10H8a4 4 0 0 0 0 8h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={saveAndExit}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:border-red-400 hover:text-red-500 transition-all"
            >
              ✕ 수정 종료
            </button>
            <button
              onClick={save}
              disabled={saving}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                saved
                  ? "bg-green-500 text-white"
                  : "bg-amber-400 hover:bg-amber-500 text-zinc-900"
              } disabled:opacity-50`}
            >
              {saving ? "저장 중..." : saved ? "✓ 저장됨" : "저장"}
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:border-blue-400 hover:text-blue-500 transition-all"
            >
              <span>👁</span> 미리보기 OFF
            </button>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">
          <div style={{ padding: "2rem 10vw" }}>
            <OverviewEditor lesson={lesson} onChange={setLesson} />
            {activeStep && (
              <div>
                <input
                  value={activeStep.title}
                  onChange={(e) => updateStep(activeStep.id, { title: e.target.value })}
                  placeholder="챕터 제목..."
                  className="w-full text-xl font-bold bg-transparent outline-none text-zinc-800 dark:text-zinc-100 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-3 focus:border-amber-400"
                />
                <BlockEditor
                  blocks={activeStep.blocks}
                  onChange={(blocks) => updateStep(activeStep.id, { blocks })}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── 미리보기 오버레이 — absolute로 전체를 덮음 ── */}
      {showPreview && (
        <div className="absolute inset-0 z-20 flex flex-col bg-white dark:bg-zinc-950">
          <div className="shrink-0 flex items-center justify-end gap-2 px-6 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <button
              onClick={saveAndExit}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:border-red-400 hover:text-red-500 transition-all"
            >
              ✕ 수정 종료
            </button>
            <button
              onClick={() => setShowPreview(false)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              <span>👁</span> 미리보기 ON
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <DevPreview lesson={lesson} category={category} level={level} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function DevEditorPage() {
  // 개발 모드 전용. 프로덕션 정적 빌드에서는 에디터 UI를 노출하지 않는다.
  // (편집 백엔드 /api/dev/* 는 개발 서버에서만 동작하며 정적 export에 포함되지 않는다.)
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-zinc-400">로딩 중...</div>}>
      <EditorInner />
    </Suspense>
  );
}

// ── 유틸: 기존 JSON 블록(저장/렌더 스키마) → EditorBlock 변환 ──
function convertBlock(b: unknown): import("@/lib/editorTypes").EditorBlock {
  const block = b as Record<string, unknown>;
  switch (block.type) {
    case "text":     return { type: "text", content: String(block.content ?? "") };
    case "header":   return { type: "header", level: (Number(block.level) || 2) as 1 | 2 | 3, content: String(block.content ?? "") };
    case "bold":     return { type: "bold", content: String(block.content ?? "") };
    case "italic":   return { type: "italic", content: String(block.content ?? "") };
    case "underbar": return { type: "underbar", content: String(block.content ?? "") };
    case "strike":   return { type: "strike", content: String(block.content ?? "") };
    case "color":    return { type: "color", content: String(block.content ?? ""), color: String(block.color ?? "#ef4444") };
    case "points":   return { type: "ul", items: (block.items as string[] | undefined) ?? [] };
    case "ol":       return { type: "ol", items: (block.items as string[] | undefined) ?? [] };
    case "box":      return { type: "box", blocks: ((block.blocks as unknown[] | undefined) ?? []).map(convertBlock) };
    case "image":    return { 
      type: "image", 
      src: String(block.src ?? ""), 
      alt: String(block.alt ?? ""), 
      ...(block.width ? { width: Number(block.width) } : {}),
      ...(block.srcEn ? { srcEn: String(block.srcEn) } : {}),
      ...(block.altEn ? { altEn: String(block.altEn) } : {}),
      ...(block.srcJa ? { srcJa: String(block.srcJa) } : {}),
      ...(block.altJa ? { altJa: String(block.altJa) } : {})
    };
    case "code": {
      const langs = ["python", "javascript", "java", "cpp", "c", "csharp"]
        .filter((l) => block[l] != null)
        .map((l) => ({ lang: l as import("@/lib/editorTypes").CodeLang, code: String(block[l]) }));
      return { type: "code", langs: langs.length > 0 ? langs : [{ lang: "python", code: "" }] };
    }
    default: return { type: "text", content: JSON.stringify(b) };
  }
}

// ── 유틸: EditorLesson → 저장용 JSON(저장/렌더 스키마) ──
function lessonToJson(lesson: EditorLesson) {
  return {
    slug: lesson.slug,
    title: lesson.title,
    tag: lesson.tag,
    relatedSlugs: lesson.relatedSlugs,
    summary: lesson.summary,
    steps: lesson.steps.map((step, idx) => ({
      number: idx + 1,
      title: step.title,
      blocks: step.blocks.map(blockToJson).filter(Boolean),
    })),
  };
}

function blockToJson(block: import("@/lib/editorTypes").EditorBlock): unknown {
  switch (block.type) {
    case "text":     return { type: "text", content: block.content };
    case "header":   return { type: "header", level: block.level, content: block.content };
    case "bold":     return { type: "bold", content: block.content };
    case "italic":   return { type: "italic", content: block.content };
    case "underbar": return { type: "underbar", content: block.content };
    case "strike":   return { type: "strike", content: block.content };
    case "color":    return { type: "color", content: block.content, color: block.color };
    case "ul":       return { type: "points", items: block.items };
    case "ol":       return { type: "ol", items: block.items };
    case "box":      return { type: "box", blocks: block.blocks.map(blockToJson).filter(Boolean) };
    case "image":    return { 
      type: "image", 
      src: block.src, 
      alt: block.alt, 
      ...(block.width && block.width !== 100 ? { width: block.width } : {}),
      ...(block.srcEn ? { srcEn: block.srcEn } : {}),
      ...(block.altEn ? { altEn: block.altEn } : {}),
      ...(block.srcJa ? { srcJa: block.srcJa } : {}),
      ...(block.altJa ? { altJa: block.altJa } : {})
    };
    case "code": {
      const obj: Record<string, string> = { type: "code" };
      for (const { lang, code } of block.langs) obj[lang] = code;
      return obj;
    }
    default: return null;
  }
}
