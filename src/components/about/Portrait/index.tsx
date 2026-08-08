export function Portrait() {
  return (
    <div className="relative aspect-square w-full overflow-hidden border border-border bg-card">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="font-heading select-none text-5xl font-bold tracking-tight text-accent/20 md:text-6xl">
          KC
        </div>
        <div className="font-heading text-xs uppercase tracking-[0.35em] text-accent/30">
          知念 健太
        </div>
      </div>
    </div>
  );
}
