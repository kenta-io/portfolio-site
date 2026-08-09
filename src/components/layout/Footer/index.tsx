import Link from "next/link";
import { SiGithub } from "react-icons/si";

const FOOTER_LINKS = [
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const SOCIALS = [
  { icon: SiGithub, href: "https://github.com/kenta-io", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-6 md:py-7 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-4 md:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-heading text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          <Link
            href="/"
            className="font-heading text-sm font-bold uppercase tracking-[0.22em] text-accent"
          >
            KC.DEV
          </Link>

          <span className="font-heading text-xs text-muted-foreground">
            © 2026 知念健太
          </span>

          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
