import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-sm font-bold uppercase tracking-[0.22em] text-accent"
        >
          KC.DEV
        </Link>
      </div>
    </header>
  );
}
