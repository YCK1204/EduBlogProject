import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 관련 레슨 선택용: 카테고리/레벨별 슬러그 목록 반환
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "dev only" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const level = searchParams.get("level");

  const LESSONS_DIR = path.join(process.cwd(), "data/lessons");
  const categories = category ? [category] : fs.readdirSync(LESSONS_DIR);
  const levels = level ? [level] : ["beginner", "intermediate", "advanced"];

  const result: { category: string; level: string; slug: string; title: string }[] = [];

  for (const cat of categories) {
    for (const lvl of levels) {
      const dir = path.join(LESSONS_DIR, cat, lvl);
      if (!fs.existsSync(dir)) continue;
      const slugs = fs.readdirSync(dir).filter((s) =>
        fs.existsSync(path.join(dir, s, "ko.json"))
      );
      for (const slug of slugs) {
        try {
          const lesson = JSON.parse(
            fs.readFileSync(path.join(dir, slug, "ko.json"), "utf-8")
          );
          result.push({ category: cat, level: lvl, slug, title: lesson.title ?? slug });
        } catch {
          result.push({ category: cat, level: lvl, slug, title: slug });
        }
      }
    }
  }

  return NextResponse.json(result);
}
