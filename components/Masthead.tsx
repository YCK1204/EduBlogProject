import Link from "next/link";

export default function Masthead() {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-center px-[10%] py-12">
        <Link
          href="/"
          className="text-6xl font-bold tracking-tight text-zinc-900 transition-colors hover:text-zinc-500 sm:text-7xl dark:text-white dark:hover:text-zinc-400"
        >
          DevNote
        </Link>
      </div>
    </div>
  );
}
