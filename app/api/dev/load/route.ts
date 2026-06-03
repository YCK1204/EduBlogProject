import { NextRequest } from "next/server";
import { loadLesson } from "@/lib/lessonLoader";

export async function GET(request: NextRequest) {
  // 개발 모드에서만 동작
  if (process.env.NODE_ENV !== "development") {
    return new Response("Forbidden", { status: 403 });
  }

  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const level = searchParams.get("level");
  const slug = searchParams.get("slug");

  if (!category || !level || !slug) {
    return new Response("Missing parameters", { status: 400 });
  }

  try {
    const lesson = loadLesson(category, level, slug, "ko");
    
    if (!lesson) {
      return new Response("Lesson not found", { status: 404 });
    }

    return Response.json(lesson);
  } catch (error) {
    console.error("Error loading lesson:", error);
    return new Response("Internal error", { status: 500 });
  }
}