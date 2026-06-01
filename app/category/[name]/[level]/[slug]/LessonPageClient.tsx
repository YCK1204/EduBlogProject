"use client";

import { Lesson } from "@/lib/lessonTypes";
import { RelatedEntry } from "@/lib/lessonLoader";
import Breadcrumb from "@/components/Breadcrumb";
import DevEditButton from "@/components/dev/DevEditButton";
import LessonView from "@/components/LessonView";
import { useLang } from "@/components/LanguageProvider";

interface LessonPageClientProps {
  category: string;
  level: string;
  slug: string;
  categoryLabel: string;
  koLesson: Lesson;
  enLesson: Lesson | null;
  jaLesson: Lesson | null;
  relatedEntries: RelatedEntry[];
}

export default function LessonPageClient({
  category,
  level,
  slug,
  categoryLabel,
  koLesson,
  enLesson,
  jaLesson,
  relatedEntries,
}: LessonPageClientProps) {
  const { lang, t } = useLang();

  // 현재 언어에 맞는 레슨 선택
  const currentLesson = 
    lang === "ja" 
      ? jaLesson ?? enLesson ?? koLesson
      : lang === "en" 
        ? enLesson ?? koLesson
        : koLesson;

  // 카테고리별 다국어 레이블 가져오기
  const categoryData = t.category[category as keyof typeof t.category];
  const localizedCategoryLabel = categoryData?.label ?? categoryLabel;

  return (
    <div className="py-4 space-y-4">
      <Breadcrumb
        items={[
          { label: t.common.home, href: "/" },
          { label: localizedCategoryLabel, href: `/category/${category}` },
          { label: currentLesson.title },
        ]}
      />
      {process.env.NODE_ENV === "development" && (
        <DevEditButton category={category} level={level} slug={slug} />
      )}
      <LessonView
        koLesson={koLesson}
        enLesson={enLesson}
        jaLesson={jaLesson}
        category={category}
        relatedEntries={relatedEntries}
      />
    </div>
  );
}