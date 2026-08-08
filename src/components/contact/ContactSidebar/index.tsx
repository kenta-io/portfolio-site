import Link from "next/link";
import { LuClock, LuGithub, LuMapPin } from "react-icons/lu";

const CONTACT_INFO = [
  {
    icon: LuMapPin,
    label: "Location",
    value: "東京都, 日本",
    note: "リモート・出社どちらも可",
  },
  {
    icon: LuClock,
    label: "Availability",
    value: "就職活動中",
    note: "2026年8月17日〜 稼働可能",
  },
];

const SOCIALS = [
  {
    icon: LuGithub,
    href: "https://github.com/kenta-io",
    label: "GitHub",
    handle: "@kenta-io",
  },
];

export function ContactSidebar() {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="border border-border bg-card p-5 md:p-7">
        <div className="font-heading mb-5 text-xs uppercase tracking-[0.28em] text-accent md:mb-6">
          Contact Info
        </div>
        <div className="flex flex-col gap-4">
          {CONTACT_INFO.map(({ icon: Icon, label, value, note }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-accent/20 bg-accent/[0.06] md:h-8 md:w-8">
                <Icon size={13} className="text-accent" />
              </div>
              <div className="min-w-0">
                <div className="font-heading mb-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </div>
                <div className="text-sm font-medium">{value}</div>
                <div className="font-heading mt-0.5 text-[11px] text-muted-foreground">
                  {note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border bg-card p-5 md:p-7">
        <div className="font-heading mb-5 text-xs uppercase tracking-[0.28em] text-accent md:mb-6">
          Social
        </div>
        <div className="flex flex-col">
          {SOCIALS.map(({ icon: Icon, href, label, handle }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-border py-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="flex items-center gap-3">
                <Icon size={15} />
                <span className="font-heading text-xs uppercase tracking-[0.15em]">
                  {label}
                </span>
              </div>
              <span className="text-xs">{handle}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
