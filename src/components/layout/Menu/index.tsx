"use client";

import Link from "next/link";

type MenuLink = { href: string; label: string };

type MenuProps = {
  links: MenuLink[];
  onNavigate: () => void;
};

export function Menu({ links, onNavigate }: MenuProps) {
  return (
    <nav className="border-t border-border lg:hidden">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-4 py-6 md:px-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className="font-heading border-b border-border py-3 text-sm uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
