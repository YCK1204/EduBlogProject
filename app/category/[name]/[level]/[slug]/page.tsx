import { notFound } from "next/navigation";
import { loadLesson, buildRelatedEntries, getAllLessons } from "@/lib/lessonLoader";
import { FOLDER_TO_LEVEL } from "@/lib/lessonTypes";
import { SLUG_TO_LABEL } from "@/lib/categories";
import LessonView from "@/components/LessonView";
import Breadcrumb from "@/components/Breadcrumb";
import DevEditButton from "@/components/dev/DevEditButton";

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
    title: `${lesson.title} | DevNote`,
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
  const relatedEntries = buildRelatedEntries(name, koLesson.relatedSlugs);

  const categoryLabel = SLUG_TO_LABEL[name] ?? name;

  return (
    <div className="py-4 space-y-4">
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: categoryLabel, href: `/category/${name}` },
          { label: koLesson.title },
        ]}
      />
      {process.env.NODE_ENV === "development" && (
        <DevEditButton category={name} level={level} slug={slug} />
      )}
      <LessonView
        koLesson={koLesson}
        enLesson={enLesson}
        category={name}
        relatedEntries={relatedEntries}
      />
    </div>
  );
}
