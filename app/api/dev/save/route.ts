import { NextRequest } from "next/server";
import { writeFileSync, mkdirSync, rmSync, existsSync } from "fs";
import { join } from "path";

export async function POST(request: NextRequest) {
  // 개발 모드에서만 동작
  if (process.env.NODE_ENV !== "development") {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const body = await request.json();
    const { category, level, slug, oldLevel, lesson } = body;

    if (!category || !level || !slug || !lesson) {
      return new Response("Missing required fields", { status: 400 });
    }

    const projectRoot = process.cwd();
    const newLessonDir = join(projectRoot, "data", "lessons", category, level, slug);
    
    // 레벨 변경 시 이전 디렉토리 삭제
    if (oldLevel && oldLevel !== level) {
      const oldLessonDir = join(projectRoot, "data", "lessons", category, oldLevel, slug);
      if (existsSync(oldLessonDir)) {
        rmSync(oldLessonDir, { recursive: true, force: true });
      }
    }

    // 새 디렉토리 생성
    mkdirSync(newLessonDir, { recursive: true });

    // ko.json 저장
    const koPath = join(newLessonDir, "ko.json");
    writeFileSync(koPath, JSON.stringify(lesson, null, 2), "utf-8");

    // en.json, ja.json이 없을 때만 ko 내용으로 복제 (기존 번역 보존)
    const enPath = join(newLessonDir, "en.json");
    const jaPath = join(newLessonDir, "ja.json");
    
    if (!existsSync(enPath)) {
      writeFileSync(enPath, JSON.stringify(lesson, null, 2), "utf-8");
    }
    
    if (!existsSync(jaPath)) {
      writeFileSync(jaPath, JSON.stringify(lesson, null, 2), "utf-8");
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error saving lesson:", error);
    return new Response("Internal error", { status: 500 });
  }
}