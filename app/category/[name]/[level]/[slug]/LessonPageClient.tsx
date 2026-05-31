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
  const { t } = useLang();

  return (
    <div className="py-4 space-y-4">
      <Breadcrumb
        items={[
          { label: t.common.home, href: "/" },
          { label: categoryLabel, href: `/category/${category}` },
          { label: koLesson.title },
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