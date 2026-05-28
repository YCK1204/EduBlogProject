"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "devnote_progress";

function getCompletedSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCompletedSlugs(slugs: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // localStorage 접근 불가 시 무시
  }
}

export function useProgress() {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);

  useEffect(() => {
    setCompletedSlugs(getCompletedSlugs());
  }, []);

  const markComplete = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      if (prev.includes(slug)) return prev;
      const next = [...prev, slug];
      saveCompletedSlugs(next);
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (slug: string) => completedSlugs.includes(slug),
    [completedSlugs]
  );

  return { markComplete, isComplete, completedSlugs };
}
