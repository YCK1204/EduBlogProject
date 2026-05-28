import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/60">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-700 ring-1 ring-inset ring-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700">
            {post.category}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {post.readingTime}
          </span>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-white dark:group-hover:text-zinc-300">
          {post.title}
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-zinc-600 line-clamp-2 dark:text-zinc-400">
          {post.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-zinc-400 dark:text-zinc-500">
                #{tag}
              </span>
            ))}
          </div>
          <time className="text-xs text-zinc-400 dark:text-zinc-500">
            {post.date}
          </time>
        </div>
      </article>
    </Link>
  );
}
