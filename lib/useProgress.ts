"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "aikido_progress";

function getCompletedSlugs(): { slugs: string[]; error?: string } {
  if (typeof window === "undefined") return { slugs: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { slugs: [] };
    const parsed = JSON.parse(raw);
    return { slugs: Array.isArray(parsed) ? parsed : [] };
  } catch (error) {
    console.warn('Failed to load progress from localStorage:', error);
    return { slugs: [], error: 'localStorage 읽기에 실패했습니다' };
  }
}

function saveCompletedSlugs(slugs: string[]): { success: boolean; error?: string } {
  if (typeof window === "undefined") return { success: false, error: 'Server environment' };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    return { success: true };
  } catch (error) {
    console.warn('Failed to save progress to localStorage:', error);
    return { success: false, error: 'localStorage 저장에 실패했습니다' };
  }
}

export function useProgress() {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>(() => {
    const { slugs } = getCompletedSlugs();
    return slugs;
  });
  const [error, setError] = useState<string | null>(() => {
    const { error: loadError } = getCompletedSlugs();
    return loadError || null;
  });

  const markComplete = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      if (prev.includes(slug)) return prev;
      const next = [...prev, slug];
      const { success, error: saveError } = saveCompletedSlugs(next);
      
      if (!success && saveError) {
        setError(saveError);
        // 저장 실패 시 UI 상태는 업데이트하지 않음
        return prev;
      }
      
      setError(null);
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (slug: string) => completedSlugs.includes(slug),
    [completedSlugs]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { markComplete, isComplete, completedSlugs, error, clearError };
}
