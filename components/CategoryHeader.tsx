"use client";

import { useLang } from "@/components/LanguageProvider";
import type { CategorySlug } from "@/lib/categories";

interface Props {
  categorySlug: CategorySlug;
}

export default function CategoryHeader({ categorySlug }: Props) {
  const { t } = useLang();
  const catT = t.category[categorySlug as keyof typeof t.category];

  return (
    <section className="mb-10">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
        {catT?.label ?? categorySlug}
      </h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">
        {catT?.description ?? ""}
      </p>
    </section>
  );
}
