type ProficiencyBarProps = {
  level: number;
};

export function ProficiencyBar({ level }: ProficiencyBarProps) {
  return (
    <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/5">
      <div
        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-700 ease-out"
        style={{ width: `${level}%` }}
      ></div>
    </div>
  );
}
