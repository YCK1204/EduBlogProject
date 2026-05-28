import { MetadataRoute } from "next";
import { buildLessonCards } from "@/lib/lessonLoader";
import { CATEGORY_SLUGS } from "@/lib/categories";

const BASE_URL = "https://devnote.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lessonUrls: MetadataRoute.Sitemap = CATEGORY_SLUGS.flatMap((cat) =>
    buildLessonCards(cat).map((card) => ({
      url: `${BASE_URL}/category/${cat}/${card.levelFolder}/${card.slug}`,
      lastModified: new Date(),
    }))
  );

  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((cat) => ({
    url: `${BASE_URL}/category/${cat}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    ...categoryUrls,
    ...lessonUrls,
  ];
}
