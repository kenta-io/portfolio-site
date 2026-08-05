"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "@/components/layout/Menu";

const NAV_LINKS = [
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-sm font-bold uppercase tracking-[0.22em] text-accent"
        >
          KC.DEV
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-heading text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-label="メニューを開閉する"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMobileMenuOpen && (
        <Menu links={NAV_LINKS} onNavigate={() => setIsMobileMenuOpen(false)} />
      )}
    </header>
  );
}
