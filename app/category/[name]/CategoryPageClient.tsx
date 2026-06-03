"use client";

import { type CategorySlug } from "@/lib/categories";
import CategoryGrid from "@/components/CategoryGrid";
import { useLang } from "@/components/LanguageProvider";
import type { LessonCard } from "@/lib/lessonLoader";

interface Props {
  categorySlug: CategorySlug;
  initialCards: LessonCard[];
}

export default function CategoryPageClient({ categorySlug, initialCards }: Props) {
  const { t } = useLang();
  const categoryData = t.category[categorySlug];
  const categoryLabel = categoryData?.label ?? categorySlug;
  const categoryDescription = categoryData?.description ?? "";

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
          {categoryLabel}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          {categoryDescription}
        </p>
      </div>
      <CategoryGrid cards={initialCards} categorySlug={categorySlug} />
    </div>
  );
}