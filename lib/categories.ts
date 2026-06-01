export const SLUG_TO_LABEL: Record<string, string> = {
  "data-structures": "자료구조",
  "algorithms": "알고리즘",
  "cs-basics": "CS",
  "programming": "프로그래밍",
};

export const LABEL_TO_SLUG: Record<string, string> = {
  "자료구조": "data-structures",
  "알고리즘": "algorithms",
  "CS": "cs-basics",
  "프로그래밍": "programming",
};

export const CATEGORY_SLUGS = Object.keys(SLUG_TO_LABEL) as CategorySlug[];

export type CategorySlug = "data-structures" | "algorithms" | "cs-basics" | "programming";
