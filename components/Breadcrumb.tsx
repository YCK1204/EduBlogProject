import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-500 dark:text-zinc-400">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
