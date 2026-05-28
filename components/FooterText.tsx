"use client";

import { useLang } from "@/components/LanguageProvider";

export default function FooterText() {
  const { t } = useLang();
  return (
    <p className="text-sm text-zinc-400 dark:text-zinc-500">
      {t.footer.copyright}
    </p>
  );
}
