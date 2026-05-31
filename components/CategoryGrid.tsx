"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { LessonCard } from "@/lib/lessonLoader";
import { useLang } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import { toDarkSrc } from "@/components/ThemedImage";

const IS_DEV = process.env.NODE_ENV === "development";

type Level = "전체" | "초급" | "중급" | "고급";

const PLACEHOLDER_PATTERNS = [
  "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
  "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
  "repeating-linear-gradient(0deg, currentColor 0, currentColor 1px, transparent 0, transparent 12px)",
  "repeating-linear-gradient(90deg, currentColor 0, currentColor 1px, transparent 0, transparent 12px)",
  "repeating-conic-gradient(currentColor 0% 25%, transparent 0% 50%)",
  "repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
  "radial-gradient(circle at 2px 2px, currentColor 1.5px, transparent 0)",
  "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
];

const PLACEHOLDER_SIZES = [
  "4px 4px", "6px 6px", "12px 12px", "12px 12px",
  "8px 8px", "6px 6px", "8px 8px", "20px 20px",
];

const LEVEL_COLORS: Record<"초급" | "중급" | "고급", string> = {
  초급: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
  중급: "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
  고급: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
};

interface Props {
  cards: LessonCard[];
  categorySlug: string;
}

export default function CategoryGrid({ cards, categorySlug }: Props) {
  const { lang, t } = useLang();
  const { theme } = useTheme();
  const router = useRouter();
  const [activeLevel, setActiveLevel] = useState<Level>("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const levels: Level[] = ["전체", "초급", "중급", "고급"];

  const levelLabel = (level: Level): string => {
    if (level === "전체") return t.filter.all;
    return t.lesson.level[level];
  };

  const filtered = cards.filter((card) => {
    const matchLevel = activeLevel === "전체" || card.level === activeLevel;
    const q = searchQuery.trim().toLowerCase();
    const title = lang === "ja" ? card.jaTitle : lang === "en" ? card.enTitle : card.koTitle;
    const summary = lang === "ja" ? card.jaSummary : lang === "en" ? card.enSummary : card.koSummary;
    const matchSearch =
      !q ||
      title.toLowerCase().includes(q) ||
      summary.toLowerCase().includes(q) ||
      card.tag.toLowerCase().includes(q);
    return matchLevel && matchSearch;
  });

  return (
    <div>
      {/* 필터 + 검색 */}
      <div className="flex items-center justify-between gap-4 mb-10">
        <div className="flex gap-2">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeLevel === level
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {levelLabel(level)}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.filter.searchPlaceholder}
          className="w-56 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
        />
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((card, idx) => {
          const patternIndex = idx % PLACEHOLDER_PATTERNS.length;
          const title = lang === "ja" ? card.jaTitle : lang === "en" ? card.enTitle : card.koTitle;
          const summary = lang === "ja" ? card.jaSummary : lang === "en" ? card.enSummary : card.koSummary;
          
          // 언어별 미리보기 이미지 선택
          let previewImage = lang === "ja" ? card.jaPreviewImage 
                           : lang === "en" ? card.enPreviewImage 
                           : card.koPreviewImage;
          
          // 테마에 맞는 이미지로 변환
          if (previewImage) {
            previewImage = theme === "dark" ? toDarkSrc(previewImage) : previewImage;
          }
          
          return (
            <div key={card.slug} className="relative group/card">
              <Link
                href={`/category/${categorySlug}/${card.levelFolder}/${card.slug}`}
                className="block"
              >
                <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group cursor-pointer h-full">
                  <div className="relative h-44 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                    {previewImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewImage}
                        alt={title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] text-zinc-900 dark:text-white"
                          style={{
                            backgroundImage: PLACEHOLDER_PATTERNS[patternIndex],
                            backgroundSize: PLACEHOLDER_SIZES[patternIndex],
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-black text-zinc-200 dark:text-zinc-700 select-none">
                            {card.tag.split(" ")[0]}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${LEVEL_COLORS[card.level]}`}>
                        {t.lesson.level[card.level]}
                      </span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">#{card.tag}</span>
                    </div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {summary}
                    </p>
                  </div>
                </article>
              </Link>

              {/* DEV 전용: 수정 버튼 */}
              {IS_DEV && (
                <button
                  onClick={() => router.push(
                    `/dev/editor?category=${categorySlug}&level=${card.levelFolder}&slug=${card.slug}`
                  )}
                  className="absolute top-2 right-2 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-zinc-900 text-xs font-bold shadow-lg"
                  title={t.dev.editLesson}
                >
                  ✏️ {t.dev.edit}
                </button>
              )}
            </div>
          );
        })}

        {/* DEV 전용: 새 레슨 추가 카드 */}
        {IS_DEV && (
          <button
            onClick={() => {
              const level = activeLevel === "전체" ? "beginner"
                : activeLevel === "초급" ? "beginner"
                : activeLevel === "중급" ? "intermediate"
                : "advanced";
              router.push(`/dev/editor?category=${categorySlug}&level=${level}`);
            }}
            className="rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-amber-400 dark:hover:border-amber-400 transition-colors flex flex-col items-center justify-center gap-3 h-64 group/add"
          >
            <span className="text-4xl text-zinc-300 dark:text-zinc-600 group-hover/add:text-amber-400 transition-colors">+</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500 group-hover/add:text-amber-500 transition-colors">
              {t.dev.addNewLesson}
            </span>
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-20 text-zinc-400 dark:text-zinc-500">
          {searchQuery.trim()
            ? `"${searchQuery}"${t.filter.noResults}`
            : t.filter.noLevel}
        </p>
      )}
    </div>
  );
}
