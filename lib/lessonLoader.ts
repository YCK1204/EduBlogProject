import fs from "fs";
import path from "path";
import type { Lesson } from "@/lib/lessonTypes";
import { FOLDER_TO_LEVEL } from "@/lib/lessonTypes";

const LESSONS_DIR = path.join(process.cwd(), "data/lessons");
const LEVEL_FOLDERS = ["beginner", "intermediate", "advanced"] as const;

export interface RelatedEntry {
  slug: string;
  levelFolder: string;
  koTitle: string;
  enTitle: string;
  jaTitle: string;
}

export interface LessonCard {
  slug: string;
  levelFolder: string;
  level: "초급" | "중급" | "고급";
  tag: string;
  koTitle: string;
  enTitle: string;
  jaTitle: string;
  koSummary: string;
  enSummary: string;
  jaSummary: string;
}

function readJson(filePath: string): unknown | null {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function loadLesson(
  category: string,
  levelFolder: string,
  slug: string,
  lang: "ko" | "en" | "ja" = "ko"
): Lesson | null {
  const filePath = path.join(LESSONS_DIR, category, levelFolder, slug, `${lang}.json`);
  const raw = readJson(filePath);
  if (!raw) return null;
  const data = raw as Lesson;
  data.level = FOLDER_TO_LEVEL[levelFolder];
  return data;
}

function findLessonLevelFolder(category: string, slug: string): string | null {
  for (const lvl of LEVEL_FOLDERS) {
    const p = path.join(LESSONS_DIR, category, lvl, slug, "ko.json");
    if (fs.existsSync(p)) return lvl;
  }
  return null;
}

export function getAllLessons(category: string): Lesson[] {
  const lessons: Lesson[] = [];
  for (const lvl of LEVEL_FOLDERS) {
    const lvlDir = path.join(LESSONS_DIR, category, lvl);
    if (!fs.existsSync(lvlDir)) continue;
    const slugs = fs
      .readdirSync(lvlDir)
      .filter((f) => fs.statSync(path.join(lvlDir, f)).isDirectory());
    for (const slug of slugs) {
      const lesson = loadLesson(category, lvl, slug, "ko");
      if (lesson) lessons.push(lesson);
    }
  }
  return lessons;
}

export function buildLessonCards(category: string): LessonCard[] {
  const cards: LessonCard[] = [];
  for (const lvl of LEVEL_FOLDERS) {
    const lvlDir = path.join(LESSONS_DIR, category, lvl);
    if (!fs.existsSync(lvlDir)) continue;
    const slugs = fs
      .readdirSync(lvlDir)
      .filter((f) => fs.statSync(path.join(lvlDir, f)).isDirectory());
    for (const slug of slugs) {
      const ko = loadLesson(category, lvl, slug, "ko");
      if (!ko) continue;
      const en = loadLesson(category, lvl, slug, "en");
      const ja = loadLesson(category, lvl, slug, "ja");
      cards.push({
        slug,
        levelFolder: lvl,
        level: FOLDER_TO_LEVEL[lvl],
        tag: ko.tag,
        koTitle: ko.title,
        enTitle: en?.title ?? ko.title,
        jaTitle: ja?.title ?? en?.title ?? ko.title,
        koSummary: ko.summary,
        enSummary: en?.summary ?? ko.summary,
        jaSummary: ja?.summary ?? en?.summary ?? ko.summary,
      });
    }
  }
  return cards;
}

export function buildRelatedEntries(
  category: string,
  relatedSlugs: string[]
): RelatedEntry[] {
  return relatedSlugs
    .map((slug) => {
      const lvl = findLessonLevelFolder(category, slug);
      if (!lvl) return null;
      const ko = loadLesson(category, lvl, slug, "ko");
      if (!ko) return null;
      const en = loadLesson(category, lvl, slug, "en");
      const ja = loadLesson(category, lvl, slug, "ja");
      return {
        slug,
        levelFolder: lvl,
        koTitle: ko.title,
        enTitle: en?.title ?? ko.title,
        jaTitle: ja?.title ?? en?.title ?? ko.title,
      };
    })
    .filter((x): x is RelatedEntry => x !== null);
}
