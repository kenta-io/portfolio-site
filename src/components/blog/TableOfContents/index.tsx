import { TocEntry } from "@/lib/markdown";
import clsx from "clsx";

type TableOfContentsProps = {
  entries: TocEntry[];
};

export function TableOfContents({ entries }: TableOfContentsProps) {
  if (entries.length === 0) return null;

  return (
    <nav className="border border-border bg-card p-5" aria-label="目次">
      <div className="font-heading mb-3 text-xs uppercase tracking-[0.28em] text-accent">
        目次
      </div>
      <ul className="flex flex-col gap-2">
        {entries.map((entry) => (
          <li key={entry.id} className={clsx(entry.depth === 3 && "pl-4")}>
            <a
              href={`#${entry.id}`}
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
