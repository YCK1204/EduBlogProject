import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "dev only" }, { status: 403 });
  }

  const body = await req.json();
  const { category, level, slug, lesson, oldLevel } = body as {
    category: string;
    level: string;
    slug: string;
    lesson: unknown;
    oldLevel?: string;
  };

  if (!category || !level || !slug || !lesson) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "data/lessons", category, level, slug);
  fs.mkdirSync(dir, { recursive: true });

  const koPath = path.join(dir, "ko.json");
  const enPath = path.join(dir, "en.json");

  fs.writeFileSync(koPath, JSON.stringify(lesson, null, 2), "utf-8");

  // en.json이 없을 때만 ko 내용으로 복사 생성 (기존 영어 번역 보존)
  if (!fs.existsSync(enPath)) {
    fs.writeFileSync(enPath, JSON.stringify(lesson, null, 2), "utf-8");
  }

  // 난이도가 변경된 경우 기존 폴더 삭제
  if (oldLevel && oldLevel !== level) {
    const oldDir = path.join(process.cwd(), "data/lessons", category, oldLevel, slug);
    if (fs.existsSync(oldDir)) {
      fs.rmSync(oldDir, { recursive: true });
    }
  }

  return NextResponse.json({ ok: true });
}
