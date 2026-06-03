"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/LanguageProvider";

export default function Header() {
  const pathname = usePathname();
  const { t, mounted } = useLang();

  // 하이드레이션 불일치 방지를 위해 서버와 동일한 기본값 사용
  const NAV_LINKS = [
    { href: "/category/data-structures", label: mounted ? t.nav.dataStructures : "자료구조" },
    { href: "/category/algorithms", label: mounted ? t.nav.algorithms : "알고리즘" },
    { href: "/category/cs-basics", label: mounted ? t.nav.csBasics : "CS 기초" },
    { href: "/category/programming", label: mounted ? t.nav.programming : "프로그래밍" },
  ];

  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="flex items-center justify-between px-[10%] py-4">
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight text-zinc-900 transition-colors hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
        >
          AIkido
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
