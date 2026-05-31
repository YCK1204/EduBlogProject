import { notFound } from "next/navigation";
import { CATEGORY_SLUGS, SLUG_TO_LABEL, type CategorySlug } from "@/lib/categories";
import { buildLessonCards } from "@/lib/lessonLoader";
import CategoryPageClient from "./CategoryPageClient";

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((name) => ({ name }));
}

export async function generateMetadata({ params }: Props) {
  const { name } = await params;
  if (!CATEGORY_SLUGS.includes(name as CategorySlug)) return {};
  const label = SLUG_TO_LABEL[name] ?? name;
  return {
    title: `${label} | DevNote`,
    description: `${label} 강의 목록 — 초급부터 고급까지 단계별로 학습하세요.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params;

  if (!CATEGORY_SLUGS.includes(name as CategorySlug)) {
    notFound();
  }

  const cards = buildLessonCards(name);

  return <CategoryPageClient categorySlug={name as CategorySlug} initialCards={cards} />;
}
