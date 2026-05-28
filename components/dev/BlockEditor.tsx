"use client";

import { useRef, useState, useCallback } from "react";
import type { EditorBlock, CodeLang } from "@/lib/editorTypes";
import { ALL_LANGS, LANG_LABELS } from "@/lib/editorTypes";

interface Props {
  blocks: EditorBlock[];
  onChange: (blocks: EditorBlock[]) => void;
  isInsideBox?: boolean;
}

const SLASH_MENU = [
  { cmd: "/text", label: "텍스트", desc: "일반 단락" },
  { cmd: "/header1", label: "제목 1", desc: "가장 큰 제목" },
  { cmd: "/header2", label: "제목 2", desc: "중간 제목" },
  { cmd: "/header3", label: "제목 3", desc: "작은 제목" },
  { cmd: "/bold", label: "굵게", desc: "Bold 텍스트" },
  { cmd: "/italic", label: "기울임", desc: "Italic 텍스트" },
  { cmd: "/underbar", label: "밑줄", desc: "Underline 텍스트" },
  { cmd: "/strike", label: "취소선", desc: "Strikethrough 텍스트" },
  { cmd: "/color", label: "색상", desc: "텍스트 색상 지정 (#hex)" },
  { cmd: "/ul", label: "목록 (•)", desc: "순서 없는 목록" },
  { cmd: "/ol", label: "목록 (1.)", desc: "순서 있는 목록" },
  { cmd: "/box", label: "박스", desc: "강조 박스 컨테이너" },
  { cmd: "/code", label: "코드", desc: "언어별 코드 블록" },
  { cmd: "/image", label: "이미지", desc: "드래그앤드롭 이미지" },
];

function newBlock(cmd: string): EditorBlock | null {
  switch (cmd) {
    case "/text": return { type: "text", content: "" };
    case "/header1": return { type: "header", level: 1, content: "" };
    case "/header2": return { type: "header", level: 2, content: "" };
    case "/header3": return { type: "header", level: 3, content: "" };
    case "/bold": return { type: "bold", content: "" };
    case "/italic": return { type: "italic", content: "" };
    case "/underbar": return { type: "underbar", content: "" };
    case "/strike": return { type: "strike", content: "" };
    case "/color": return { type: "color", content: "", color: "#ef4444" };
    case "/ul": return { type: "ul", items: [""] };
    case "/ol": return { type: "ol", items: [""] };
    case "/box": return { type: "box", blocks: [] };
    case "/code": return { type: "code", langs: [{ lang: "python", code: "" }] };
    case "/image": return { type: "image", src: "", alt: "" };
    default: return null;
  }
}

export default function BlockEditor({ blocks, onChange, isInsideBox = false }: Props) {
  const [slashIdx, setSlashIdx] = useState<number | null>(null);
  const [slashQuery, setSlashQuery] = useState("");
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const update = (idx: number, block: EditorBlock) => {
    const next = [...blocks];
    next[idx] = block;
    onChange(next);
  };

  const remove = (idx: number) => {
    onChange(blocks.filter((_, i) => i !== idx));
  };

  const removeSelected = () => {
    onChange(blocks.filter((_, i) => !selected.has(i)));
    setSelected(new Set());
  };

  const insertAfter = (idx: number, block: EditorBlock) => {
    const next = [...blocks];
    next.splice(idx + 1, 0, block);
    onChange(next);
  };

  const filteredMenu = SLASH_MENU.filter(
    (m) => m.cmd.includes(slashQuery) || m.label.includes(slashQuery)
  );

  const handleKeyDown = (e: React.KeyboardEvent, idx: number, value: string) => {
    if (e.key === "Delete" && selected.size > 0) {
      e.preventDefault();
      removeSelected();
    }
    if (value.endsWith("/") || value.includes("/")) {
      const slashPos = value.lastIndexOf("/");
      setSlashIdx(idx);
      setSlashQuery(value.slice(slashPos + 1));
    }
  };

  const handleSlashSelect = (cmd: string, idx: number) => {
    const block = newBlock(cmd);
    if (!block) return;
    insertAfter(idx, block);
    setSlashIdx(null);
    setSlashQuery("");
  };

  const toggleSelect = (e: React.MouseEvent, idx: number) => {
    if (!e.shiftKey && !e.ctrlKey && !e.metaKey) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleBlockDrop = (e: React.DragEvent, toIdx: number) => {
    e.preventDefault();
    setDragOver(null);

    // 블록 순서 변경
    const fromStr = e.dataTransfer.getData("text/block-index");
    if (fromStr !== "") {
      const fromIdx = Number(fromStr);
      if (fromIdx === toIdx) return;
      const next = [...blocks];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(fromIdx < toIdx ? toIdx - 1 : toIdx, 0, moved);
      onChange(next);
      return;
    }

    // 이미지 파일 드롭
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const imageBlock: EditorBlock = { type: "image", src: ev.target?.result as string, alt: "" };
        const next = [...blocks];
        next.splice(toIdx, 0, imageBlock);
        onChange(next);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div ref={containerRef} className={`space-y-1 ${isInsideBox ? "" : "min-h-[200px]"}`}>
      {blocks.map((block, idx) => (
        <div key={idx} className="group/block flex items-start gap-1">
          {/* 드래그 핸들 */}
          <div
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/block-index", String(idx));
              const el = blockRefs.current[idx];
              if (el) e.dataTransfer.setDragImage(el, 16, 16);
            }}
            className="mt-2.5 shrink-0 w-4 flex justify-center cursor-grab opacity-0 group-hover/block:opacity-40 hover:!opacity-80 transition-opacity select-none text-zinc-400 dark:text-zinc-500"
            title="드래그해서 순서 변경"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
              <circle cx="2" cy="2" r="1.5"/><circle cx="6" cy="2" r="1.5"/>
              <circle cx="2" cy="6" r="1.5"/><circle cx="6" cy="6" r="1.5"/>
              <circle cx="2" cy="10" r="1.5"/><circle cx="6" cy="10" r="1.5"/>
            </svg>
          </div>

          {/* 블록 콘텐츠 */}
          <div
            ref={(el) => { blockRefs.current[idx] = el; }}
            onClick={(e) => toggleSelect(e, idx)}
            className={`relative flex-1 group/item rounded-lg transition-all ${
              selected.has(idx) ? "ring-2 ring-amber-400 bg-amber-50/10" : ""
            } ${dragOver === idx ? "border-t-2 border-blue-400" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(idx); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={(e) => handleBlockDrop(e, idx)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); remove(idx); }}
              className="absolute -right-2 -top-2 z-10 hidden group-hover/item:flex w-5 h-5 items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
            >×</button>

            <BlockItem
              block={block}
              idx={idx}
              onUpdate={(b) => update(idx, b)}
              onKeyDown={(e, v) => handleKeyDown(e, idx, v)}
              onSlashMenu={slashIdx === idx ? filteredMenu : null}
              onSlashSelect={(cmd) => handleSlashSelect(cmd, idx)}
              onDrop={(file) => {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  update(idx, { type: "image", src: ev.target?.result as string, alt: "" });
                };
                reader.readAsDataURL(file);
              }}
            />
          </div>
        </div>
      ))}

      {/* + 블록 추가 버튼 */}
      <div className="relative">
        <button
          onClick={() => {
            onChange([...blocks, { type: "text", content: "" }]);
            setSlashIdx(blocks.length);
          }}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors py-2 px-1"
        >
          <span className="text-lg leading-none">+</span> 블록 추가 또는 '/' 입력
        </button>
      </div>

      {selected.size > 0 && (
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-zinc-400">{selected.size}개 선택됨</span>
          <button onClick={removeSelected} className="text-xs text-red-500 hover:text-red-600">삭제</button>
          <button onClick={() => setSelected(new Set())} className="text-xs text-zinc-400 hover:text-zinc-600">취소</button>
        </div>
      )}
    </div>
  );
}

interface ItemProps {
  block: EditorBlock;
  idx: number;
  onUpdate: (b: EditorBlock) => void;
  onKeyDown: (e: React.KeyboardEvent, value: string) => void;
  onSlashMenu: typeof SLASH_MENU | null;
  onSlashSelect: (cmd: string) => void;
  onDrop: (file: File) => void;
}

function BlockItem({ block, onUpdate, onKeyDown, onSlashMenu, onSlashSelect, onDrop }: ItemProps) {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<CodeLang>(
    block.type === "code" ? (block.langs[0]?.lang ?? "python") : "python"
  );
  const [isDragging, setIsDragging] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleResizeStart = useCallback((e: React.MouseEvent, side: "left" | "right") => {
    e.preventDefault();
    e.stopPropagation();
    if (block.type !== "image") return;
    const containerWidth = imageContainerRef.current?.offsetWidth ?? 0;
    if (!containerWidth) return;
    const startX = e.clientX;
    const startWidth = block.width ?? 100;

    const onMouseMove = (ev: MouseEvent) => {
      const deltaPercent = ((ev.clientX - startX) / containerWidth) * 100;
      const newWidth = Math.max(20, Math.min(100, Math.round(
        side === "right" ? startWidth + deltaPercent * 2 : startWidth - deltaPercent * 2
      )));
      onUpdate({ ...block, width: newWidth });
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [block, onUpdate]);

  if (block.type === "text") {
    return (
      <div className="relative">
        <textarea
          value={block.content}
          onChange={(e) => onUpdate({ ...block, content: e.target.value })}
          onKeyDown={(e) => onKeyDown(e, block.content)}
          placeholder="텍스트를 입력하거나 '/' 로 블록 추가..."
          className="w-full resize-none bg-transparent text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 outline-none min-h-[2.5rem] leading-relaxed"
          rows={Math.max(2, block.content.split("\n").length)}
        />
        <SlashMenu menu={onSlashMenu} onSelect={onSlashSelect} />
      </div>
    );
  }

  if (block.type === "header") {
    const sizes = { 1: "text-2xl font-bold", 2: "text-xl font-bold", 3: "text-lg font-semibold" };
    return (
      <input
        value={block.content}
        onChange={(e) => onUpdate({ ...block, content: e.target.value })}
        onKeyDown={(e) => onKeyDown(e, block.content)}
        placeholder={`제목 ${block.level}`}
        className={`w-full bg-transparent outline-none text-zinc-900 dark:text-white ${sizes[block.level]}`}
      />
    );
  }

  if (block.type === "bold") {
    return (
      <input
        value={block.content}
        onChange={(e) => onUpdate({ ...block, content: e.target.value })}
        className="w-full bg-transparent outline-none text-sm font-bold text-zinc-900 dark:text-white"
        placeholder="굵은 텍스트..."
      />
    );
  }

  if (block.type === "italic") {
    return (
      <input
        value={block.content}
        onChange={(e) => onUpdate({ ...block, content: e.target.value })}
        className="w-full bg-transparent outline-none text-sm italic text-zinc-700 dark:text-zinc-300"
        placeholder="기울임 텍스트..."
      />
    );
  }

  if (block.type === "underbar") {
    return (
      <input
        value={block.content}
        onChange={(e) => onUpdate({ ...block, content: e.target.value })}
        className="w-full bg-transparent outline-none text-sm underline text-zinc-700 dark:text-zinc-300"
        placeholder="밑줄 텍스트..."
      />
    );
  }

  if (block.type === "strike") {
    return (
      <input
        value={block.content}
        onChange={(e) => onUpdate({ ...block, content: e.target.value })}
        className="w-full bg-transparent outline-none text-sm line-through text-zinc-500 dark:text-zinc-400"
        placeholder="취소선 텍스트..."
      />
    );
  }

  if (block.type === "color") {
    return (
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={block.color}
          onChange={(e) => onUpdate({ ...block, color: e.target.value })}
          className="w-8 h-8 rounded cursor-pointer border border-zinc-300"
        />
        <input
          value={block.content}
          onChange={(e) => onUpdate({ ...block, content: e.target.value })}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: block.color }}
          placeholder="색상 텍스트..."
        />
      </div>
    );
  }

  if (block.type === "ul" || block.type === "ol") {
    return (
      <div className="space-y-1">
        {block.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-zinc-400 text-sm mt-0.5 shrink-0">
              {block.type === "ul" ? "•" : `${i + 1}.`}
            </span>
            <input
              value={item}
              onChange={(e) => {
                const items = [...block.items];
                items[i] = e.target.value;
                onUpdate({ ...block, items });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const items = [...block.items];
                  items.splice(i + 1, 0, "");
                  onUpdate({ ...block, items });
                }
                if (e.key === "Backspace" && item === "" && block.items.length > 1) {
                  e.preventDefault();
                  const items = block.items.filter((_, j) => j !== i);
                  onUpdate({ ...block, items });
                }
              }}
              className="flex-1 bg-transparent outline-none text-sm text-zinc-800 dark:text-zinc-200"
              placeholder="항목 입력..."
            />
          </div>
        ))}
        <button
          onClick={() => onUpdate({ ...block, items: [...block.items, ""] })}
          className="text-xs text-zinc-400 hover:text-zinc-600 ml-5"
        >+ 항목 추가</button>
      </div>
    );
  }

  if (block.type === "box") {
    return (
      <div className="rounded-xl bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 p-4">
        <BlockEditor
          blocks={block.blocks}
          onChange={(bs) => onUpdate({ ...block, blocks: bs })}
          isInsideBox
        />
      </div>
    );
  }

  if (block.type === "code") {
    const activeCode = block.langs.find((l) => l.lang === activeTab)?.code ?? "";
    const usedLangs = new Set(block.langs.map((l) => l.lang));
    const availableLangs = ALL_LANGS.filter((l) => !usedLangs.has(l));

    return (
      <div className="rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden">
        {/* 탭 헤더 */}
        <div className="flex items-center gap-0 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-300 dark:border-zinc-700 overflow-x-auto">
          {block.langs.map(({ lang }) => (
            <div key={lang} className="flex items-center">
              <button
                onClick={() => setActiveTab(lang)}
                className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  activeTab === lang
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-b-2 border-amber-400"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >{LANG_LABELS[lang]}</button>
              <button
                onClick={() => {
                  const langs = block.langs.filter((l) => l.lang !== lang);
                  const next = langs.length > 0 ? langs : [{ lang: "python" as CodeLang, code: "" }];
                  onUpdate({ ...block, langs: next });
                  setActiveTab(next[0].lang);
                }}
                className="text-zinc-400 hover:text-red-400 text-xs px-1"
              >×</button>
            </div>
          ))}

          {/* 언어 추가 */}
          <div className="relative ml-1">
            <button
              onClick={() => setShowLangMenu((o) => !o)}
              className="px-2 py-2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >+ 언어</button>
            {showLangMenu && (
              <div className="absolute top-full left-0 z-50 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl overflow-hidden mt-1 min-w-[8rem]">
                {availableLangs.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onUpdate({ ...block, langs: [...block.langs, { lang, code: "" }] });
                      setActiveTab(lang);
                      setShowLangMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                  >{LANG_LABELS[lang]}</button>
                ))}
                {availableLangs.length === 0 && (
                  <p className="px-3 py-2 text-xs text-zinc-400">모든 언어 추가됨</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 코드 입력 */}
        <textarea
          value={activeCode}
          onChange={(e) => {
            const langs = block.langs.map((l) =>
              l.lang === activeTab ? { ...l, code: e.target.value } : l
            );
            onUpdate({ ...block, langs });
          }}
          className="w-full bg-zinc-950 text-green-400 font-mono text-sm p-4 outline-none resize-none min-h-[8rem]"
          placeholder={`${LANG_LABELS[activeTab]} 코드 입력...`}
          rows={Math.max(4, activeCode.split("\n").length + 1)}
          spellCheck={false}
        />
      </div>
    );
  }

  if (block.type === "image") {
    const width = block.width ?? 100;
    const dropZone = (
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file?.type.startsWith("image/")) onDrop(file);
        }}
        className={`rounded-xl border-2 border-dashed transition-colors ${
          isDragging
            ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20"
            : "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900"
        } p-4`}
      >
        {block.src ? (
          <div className="space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.src} alt={block.alt} className="w-full h-auto rounded-lg object-contain" />
            <div className="flex gap-2 items-center">
              <input
                value={block.alt}
                onChange={(e) => onUpdate({ ...block, alt: e.target.value })}
                placeholder="이미지 설명 (alt)..."
                className="flex-1 text-xs bg-transparent outline-none text-zinc-500 border-b border-zinc-300 dark:border-zinc-700 pb-0.5"
              />
              <button
                onClick={() => onUpdate({ ...block, src: "", alt: "", width: 100 })}
                className="text-xs text-red-400 hover:text-red-500 shrink-0"
              >제거</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <span className="text-3xl">🖼️</span>
            <p className="text-sm text-zinc-500">이미지를 드래그앤드롭 하거나</p>
            <label className="cursor-pointer text-xs text-amber-500 hover:text-amber-600 underline">
              파일 선택
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onDrop(file);
                }}
              />
            </label>
            <input
              value={block.src}
              onChange={(e) => onUpdate({ ...block, src: e.target.value })}
              placeholder="또는 이미지 URL 직접 입력..."
              className="mt-1 w-full max-w-sm text-xs text-center bg-transparent outline-none border-b border-zinc-300 dark:border-zinc-700 pb-0.5 text-zinc-500"
            />
          </div>
        )}
      </div>
    );

    if (!block.src) return dropZone;

    return (
      <div ref={imageContainerRef} className="relative group/img">
        {/* 좌측 핸들 */}
        <div
          className="absolute top-0 bottom-0 flex items-center justify-center z-10 cursor-ew-resize"
          style={{ left: `calc(${(100 - width) / 2}% - 12px)`, width: "24px" }}
          onMouseDown={(e) => handleResizeStart(e, "left")}
        >
          <div className="w-1.5 h-10 rounded-full bg-blue-400 opacity-0 group-hover/img:opacity-80 transition-opacity shadow-sm" />
        </div>

        {/* 이미지 (width% 폭, 가운데 정렬) */}
        <div style={{ width: `${width}%`, marginLeft: "auto", marginRight: "auto", position: "relative" }}>
          {dropZone}
          {/* 너비 표시 */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-zinc-400 whitespace-nowrap pointer-events-none">
            {width < 100 ? `${width}%` : ""}
          </div>
        </div>

        {/* 우측 핸들 */}
        <div
          className="absolute top-0 bottom-0 flex items-center justify-center z-10 cursor-ew-resize"
          style={{ right: `calc(${(100 - width) / 2}% - 12px)`, width: "24px" }}
          onMouseDown={(e) => handleResizeStart(e, "right")}
        >
          <div className="w-1.5 h-10 rounded-full bg-blue-400 opacity-0 group-hover/img:opacity-80 transition-opacity shadow-sm" />
        </div>
      </div>
    );
  }

  return null;
}

function SlashMenu({ menu, onSelect }: { menu: typeof SLASH_MENU | null; onSelect: (cmd: string) => void }) {
  if (!menu) return null;
  return (
    <div className="absolute left-0 top-full z-50 mt-1 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
      {menu.length === 0 ? (
        <p className="px-3 py-2 text-xs text-zinc-400">일치하는 블록 없음</p>
      ) : (
        menu.map((item) => (
          <button
            key={item.cmd}
            onMouseDown={(e) => { e.preventDefault(); onSelect(item.cmd); }}
            className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <span className="text-xs font-mono text-amber-500 w-20 shrink-0">{item.cmd}</span>
            <span className="text-xs text-zinc-600 dark:text-zinc-300">{item.desc}</span>
          </button>
        ))
      )}
    </div>
  );
}
