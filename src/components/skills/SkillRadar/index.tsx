"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const RADAR_DATA = [
  { subject: "HTML/CSS", value: 85 },
  { subject: "JavaScript", value: 85 },
  { subject: "React", value: 55 },
  { subject: "TypeScript", value: 55 },
  { subject: "Next.js", value: 50 },
  { subject: "Nest.js", value: 45 },
];

export function SkillRadar() {
  return (
    <div className="border border-border bg-card p-5 md:p-6">
      <div className="font-heading mb-1 text-xs uppercase tracking-[0.28em] text-accent">
        Skill Balance
      </div>
      <div className="font-heading mb-4 text-xs text-muted-foreground">
        言語・技術別レーダー
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={RADAR_DATA} outerRadius={80}>
          <PolarGrid stroke="rgba(0,200,150,0.12)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#6b7a94", fontSize: 11 }}
          />
          <Radar
            dataKey="value"
            stroke="#00c896"
            fill="#00c896"
            fillOpacity={0.12}
            strokeWidth={1.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
