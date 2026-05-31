import fs from "fs";
import path from "path";
import type { Lesson, Block, ImageBlock } from "@/lib/lessonTypes";
import { FOLDER_TO_LEVEL } from "@/lib/lessonTypes";

const LESSONS_DIR = path.join(process.cwd(), "data/lessons");
const LEVEL_FOLDERS = ["beginner", "intermediate", "advanced"] as const;

function safeReadDir(dirPath: string): string[] {
  try {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath).filter((f) => {
      try {
        return fs.statSync(path.join(dirPath, f)).isDirectory();
      } catch {
        return false;
      }
    });
  } catch (error) {
    console.error(`Failed to read directory ${dirPath}:`, error);
    return [];
  }
}

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
  koPreviewImage: string | null;
  enPreviewImage: string | null;
  jaPreviewImage: string | null;
}

function readJson(filePath: string): { data: unknown | null; error?: string } {
  if (!fs.existsSync(filePath)) {
    return { data: null, error: 'File not found' };
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);
    return { data };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Failed to read/parse ${filePath}:`, message);
    return { data: null, error: `Parse error: ${message}` };
  }
}

export function loadLesson(
  category: string,
  levelFolder: string,
  slug: string,
  lang: "ko" | "en" | "ja" = "ko"
): Lesson | null {
  const filePath = path.join(LESSONS_DIR, category, levelFolder, slug, `${lang}.json`);
  const { data, error } = readJson(filePath);
  
  if (!data) {
    if (error && error !== 'File not found') {
      console.warn(`Failed to load lesson ${category}/${levelFolder}/${slug}/${lang}: ${error}`);
    }
    return null;
  }
  
  try {
    const lesson = data as Lesson;
    lesson.level = FOLDER_TO_LEVEL[levelFolder];
    return lesson;
  } catch (error) {
    console.error(`Invalid lesson structure for ${filePath}:`, error);
    return null;
  }
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
    const slugs = safeReadDir(lvlDir);
    
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
    const slugs = safeReadDir(lvlDir);
    
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
        koPreviewImage: extractFirstImage(ko, "ko"),
        enPreviewImage: extractFirstImage(en || ko, "en"),
        jaPreviewImage: extractFirstImage(ja || en || ko, "ja"),
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

// 레슨에서 첫 번째 이미지를 추출하는 함수
export function extractFirstImage(lesson: Lesson, lang: "ko" | "en" | "ja" = "ko"): string | null {
  function findImageInBlocks(blocks: Block[]): string | null {
    for (const block of blocks) {
      if (block.type === "image") {
        const imageBlock = block as ImageBlock;
        // 언어별 이미지가 있으면 우선 사용, 없으면 기본 이미지
        if (lang === "en" && imageBlock.srcEn) {
          return imageBlock.srcEn;
        }
        return imageBlock.src;
      }
      // 박스 블록 내부도 재귀적으로 검색
      if (block.type === "box") {
        const found = findImageInBlocks(block.blocks);
        if (found) return found;
      }
    }
    return null;
  }

  // 모든 스텝을 순회하며 첫 번째 이미지 찾기
  for (const step of lesson.steps) {
    const image = findImageInBlocks(step.blocks);
    if (image) return image;
  }

  return null;
}
