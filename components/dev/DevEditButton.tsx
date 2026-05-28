"use client";

import { useRouter } from "next/navigation";

interface Props {
  category: string;
  level: string;
  slug: string;
}

export default function DevEditButton({ category, level, slug }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/dev/editor?category=${category}&level=${level}&slug=${slug}&preview=true`)}
      className="fixed top-20 right-6 z-50 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-zinc-900 text-xs font-bold shadow-lg transition-colors"
      title="레슨 수정 (dev only)"
    >
      ✏️ 수정
    </button>
  );
}
