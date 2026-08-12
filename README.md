# 知念健太 Portfolio

React / Next.js / TypeScriptでの開発実績を紹介するポートフォリオサイトです。

**Live**: https://portfolio-site-nine-coral-57.vercel.app/ （Basic認証で保護されています）

## 概要

- 転職活動用に作成した個人のポートフォリオサイトです
- 検索エンジンにインデックスされないよう`noindex`とBasic認証を設定しています

## 主な機能

- **Home**：Three.js（react-three-fiber）によるネットワーク背景演出を含むトップページ
- **Skills**：技術スタック一覧とレーダーチャート表示（microCMSでコンテンツ管理）
- **Blog**：技術記事の一覧・詳細ページ（microCMSでコンテンツ管理、カテゴリ絞り込み・ページネーション対応）
- **About**：経歴・自己紹介
- **Contact**：3ステップ（入力→確認→完了）のお問い合わせフォーム。Cloudflare Turnstileによるボット対策付き（本サイトはポートフォリオのため、実際のメール送信は行っていません）
- **Privacy Policy**：個人情報保護法対応のプライバシーポリシー

## 技術スタック

| 分類           | 使用技術                     |
| -------------- | ---------------------------- |
| フレームワーク | Next.js (App Router)         |
| 言語           | TypeScript                   |
| UI             | React / Tailwind CSS         |
| 3D演出         | Three.js (react-three-fiber) |
| CMS            | microCMS                     |
| フォーム       | React Hook Form + zod        |
| ボット対策     | Cloudflare Turnstile         |
| テスト         | Vitest + Testing Library     |
| ホスティング   | Vercel                       |

## ローカルでの起動方法

```bash
npm install
cp .env.example .env.local

# .env.localに各種APIキー等を設定

npm run dev
```

## テスト・Lint

```bash
npm test # Vitest
npm run lint # ESLint
npm run typecheck # tsc --noEmit
```

## 開発について

Claude Codeを活用し実装サポートしてもらいながら作成しました。
