import { notFound } from "next/navigation";
import { loadLesson, buildRelatedEntries, getAllLessons } from "@/lib/lessonLoader";
import { FOLDER_TO_LEVEL } from "@/lib/lessonTypes";
import { SLUG_TO_LABEL } from "@/lib/categories";
import LessonPageClient from "./LessonPageClient";

const CATEGORIES = ["data-structures", "algorithms", "cs-basics", "programming"] as const;
const LEVELS = ["beginner", "intermediate", "advanced"] as const;

interface Props {
  params: Promise<{ name: string; level: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { name: string; level: string; slug: string }[] = [];
  for (const cat of CATEGORIES) {
    for (const lvl of LEVELS) {
      const lessons = getAllLessons(cat).filter(
        (l) => l.level === FOLDER_TO_LEVEL[lvl]
      );
      for (const lesson of lessons) {
        params.push({ name: cat, level: lvl, slug: lesson.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { name, level, slug } = await params;
  const lesson = loadLesson(name, level, slug, "ko");
  if (!lesson) return {};
  return {
    title: `${lesson.title} | AIkido`,
    description: lesson.summary,
    openGraph: {
      title: lesson.title,
      description: lesson.summary,
      type: "article",
    },
  };
}

export default async function LessonPage({ params }: Props) {
  const { name, level, slug } = await params;

  if (!CATEGORIES.includes(name as (typeof CATEGORIES)[number])) notFound();
  if (!LEVELS.includes(level as (typeof LEVELS)[number])) notFound();

  const koLesson = loadLesson(name, level, slug, "ko");
  if (!koLesson) notFound();

  const enLesson = loadLesson(name, level, slug, "en");
  const jaLesson = loadLesson(name, level, slug, "ja");
  const relatedEntries = buildRelatedEntries(name, koLesson.relatedSlugs);

  const categoryLabel = SLUG_TO_LABEL[name] ?? name;

  return (
    <LessonPageClient 
      category={name}
      level={level}
      slug={slug}
      categoryLabel={categoryLabel}
      koLesson={koLesson}
      enLesson={enLesson || null}
      jaLesson={jaLesson || null}
      relatedEntries={relatedEntries}
    />
  );
}
