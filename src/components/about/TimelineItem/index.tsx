type CareerEntry = {
  period: string;
  role: string;
  company?: string;
  description: string;
};

export function TimelineItem({
  period,
  role,
  company,
  description,
}: CareerEntry) {
  return (
    <div className="relative pb-10 pl-8 last:pb-0 md:pl-10">
      <div
        className="absolute top-1.5 left-0 h-[9px] w-[9px] rounded-full border-2"
        style={{
          background: "var(--color-background)",
          borderColor: "rgba(0,200,150,0.4)",
        }}
      />
      <div className="absolute top-4 bottom-0 left-[4px] w-px bg-border" />

      <div className="border border-border bg-card p-4 md:p-6">
        <div className="font-heading mb-0.5 text-xs text-muted-foreground">
          {period}
        </div>
        <h3 className="font-heading text-base font-bold md:text-lg">{role}</h3>
        {company && (
          <div className="font-heading text-sm text-accent">{company}</div>
        )}
        <p className="mt-2 text-sm leading-[1.85] text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
