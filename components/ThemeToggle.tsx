"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      title={theme === "dark" ? "라이트 모드" : "다크 모드"}
      className="fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full border border-zinc-300 bg-white text-xs font-medium text-zinc-700 shadow-md transition-all hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
