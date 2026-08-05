export type SkillCategory =
  "コーディング" | "フロントエンド" | "バックエンド" | "ツール";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  years: string;
  level: number;
  description: string;
  featured: boolean;
  order: number;
};

export async function getSkills(): Promise<Skill[]> {
  return MOCK_SKILLS;
}

const MOCK_SKILLS: Skill[] = [
  {
    id: "html-css",
    name: "HTML/CSS",
    category: "コーディング",
    level: 88,
    years: "3年",
    description:
      "現職での約3年の実務経験。サイト制作の中心となるマークアップ・スタイリング。",
    featured: false,
    order: 1,
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "コーディング",
    level: 85,
    years: "3年",
    description: "現職での約3年の実務経験。DOM操作からAPI連携まで幅広く使用。",
    featured: false,
    order: 2,
  },
  {
    id: "php",
    name: "PHP",
    category: "コーディング",
    level: 78,
    years: "3年",
    description: "WordPressサイトのカスタマイズ・保守運用で使用。",
    featured: false,
    order: 3,
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "コーディング",
    level: 80,
    years: "3年",
    description: "採用サイト・LP制作でのテーマカスタマイズ・運用保守。",
    featured: false,
    order: 4,
  },
  {
    id: "react",
    name: "React",
    category: "フロントエンド",
    level: 60,
    years: "5ヶ月",
    description:
      "SES案件でのフロントエンド開発。コンポーネント設計・状態管理。",
    featured: false,
    order: 5,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "フロントエンド",
    level: 55,
    years: "5ヶ月",
    description: "SES案件でApp Routerを用いたプロダクション開発を経験。",
    featured: false,
    order: 6,
  },
  {
    id: "typescript-fe",
    name: "TypeScript",
    category: "フロントエンド",
    level: 58,
    years: "5ヶ月",
    description: "SES案件のフロントエンド開発で型安全な実装を経験。",
    featured: false,
    order: 7,
  },
  {
    id: "nestjs",
    name: "Nest.js",
    category: "バックエンド",
    level: 50,
    years: "5ヶ月",
    description: "SES案件で予約関連サービスのバックエンド開発を担当。",
    featured: false,
    order: 8,
  },
  {
    id: "typescript-be",
    name: "TypeScript",
    category: "バックエンド",
    level: 52,
    years: "5ヶ月",
    description: "SES案件のバックエンド開発で型安全な実装を経験。",
    featured: false,
    order: 9,
  },
  {
    id: "git",
    name: "Git / GitHub",
    category: "ツール",
    level: 82,
    years: "日常使用",
    description: "ブランチ運用・コードレビュー等、日常的な開発フローで使用。",
    featured: false,
    order: 10,
  },
  {
    id: "figma",
    name: "Figma",
    category: "ツール",
    level: 78,
    years: "日常使用",
    description: "デザインのコード化・仕様確認で日常的に使用。",
    featured: false,
    order: 11,
  },
  {
    id: "claude-code",
    name: "Claude Code",
    category: "ツール",
    level: 80,
    years: "日常使用",
    description: "実装支援・デザインのソースコード化・学習効率化に活用。",
    featured: true,
    order: 12,
  },
  {
    id: "slack",
    name: "Slack",
    category: "ツール",
    level: 75,
    years: "日常使用",
    description: "社内外とのコミュニケーションで日常的に使用。",
    featured: false,
    order: 13,
  },
  {
    id: "adobe",
    name: "Adobe",
    category: "ツール",
    level: 65,
    years: "日常使用",
    description: "画像・素材の調整等で使用。",
    featured: false,
    order: 14,
  },
  {
    id: "asana",
    name: "Asana",
    category: "ツール",
    level: 70,
    years: "日常使用",
    description: "タスク・進行管理で使用。",
    featured: false,
    order: 15,
  },
];
