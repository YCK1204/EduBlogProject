import { NextRequest } from "next/server";
import { getAllLessons } from "@/lib/lessonLoader";

export async function GET(request: NextRequest) {
  // 개발 모드에서만 동작
  if (process.env.NODE_ENV !== "development") {
    return new Response("Forbidden", { status: 403 });
  }

  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");

  if (!category) {
    return new Response("Missing category parameter", { status: 400 });
  }

  try {
    const lessons = getAllLessons(category);
    
    // slug만 반환 (에디터에서 관련 레슨 선택용)
    const slugs = lessons.map(lesson => lesson.slug);
    
    return Response.json({ slugs });
  } catch (error) {
    console.error("Error loading lessons:", error);
    return new Response("Internal error", { status: 500 });
  }
}