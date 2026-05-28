import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "dev only" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const level = searchParams.get("level");
  const slug = searchParams.get("slug");

  if (!category || !level || !slug) {
    return NextResponse.json({ error: "missing params" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "data/lessons", category, level, slug, "ko.json");
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const lesson = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(lesson);
}
