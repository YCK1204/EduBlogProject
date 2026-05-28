"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/LanguageProvider";

export default function SubNav() {
  const pathname = usePathname();
  const { t } = useLang();

  const NAV_LINKS = [
    { href: "/category/data-structures", label: t.nav.dataStructures },
    { href: "/category/algorithms", label: t.nav.algorithms },
    { href: "/category/cs-basics", label: t.nav.csBasics },
    { href: "/category/programming", label: t.nav.programming },
  ];

  return (
    <div className="border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="flex items-center justify-center">
        {NAV_LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`-mb-px border-b-2 px-4 py-3 text-sm transition-colors ${
                isActive
                  ? "border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
