# AGENTS.md

Next.js (App Router) + React + TypeScript + Tailwind CSS + microCMSで構築するポートフォリオサイトの開発ルール。

## ディレクトリ構成

`src/`ディレクトリを使用し、ソースコード（`app/`・`components/`・`lib/`等）とルート直下の設定ファイル（`next.config.ts`等）を分離する。`app/`はルーティング専念、UIロジックは`components/`へ。

```
src/
├── app/
│   ├── layout.tsx           # 共通レイアウト、metadataのデフォルト値、robots: noindex
│   ├── page.tsx              # トップページ
│   ├── favicon.ico           # favicon（静的画像、全ページ共通）
│   ├── apple-icon.png        # Appleタッチアイコン（静的画像）
│   ├── opengraph-image.png   # OGP画像（固定ページ用、静的画像）
│   ├── blog/
│   │   ├── page.tsx          # 一覧（searchParamsでcategoryを受け取る。検索機能はなし。別ルートは作らない）
│   │   ├── p/[current]/page.tsx        # ページネーション
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── opengraph-image.tsx     # 記事タイトルを動的にOGP画像化（ImageResponse）
│   ├── skills/ about/ contact/ privacy-policy/ ...
│
├── components/
│   ├── layout/     # Header, Footer, Menu
│   ├── ui/         # 汎用UIパーツ（Button, Tag等、特定機能に依存しない）
│   ├── blog/       # BlogCard, BlogList, CategoryFilter, Pagination, TableOfContents
│   ├── skills/     # SkillCategoryCard等（`/skills`と、トップページのSkillsプレビューで共用）
│   ├── contact/    # ContactForm, ConfirmStep, CompleteStep
│   └── three/      # HeroPanel, Scene（react-three-fiber。デスクトップ限定の静的装飾パネル、カルーセルではない）
│
├── lib/
│   ├── microcms.ts   # microCMSクライアント・型定義・取得関数
│   ├── env.ts         # requireEnv()（環境変数の一律検証）
│   ├── resend.ts       # メール送信処理
│   └── markdown.ts      # remark/rehypeパイプライン（Shikiハイライト等）
│
├── actions/    # Server Actions
├── hooks/ types/ constants/
└── middleware.ts   # Basic認証
public/            # src/の外、ルート直下
vitest.config.ts   # テスト設定（jsdom環境）
vitest.setup.ts    # @testing-library/jest-domのマッチャー等をimport
```

テストファイルはテスト対象と同じフォルダに`index.test.tsx` / `xxx.test.ts`として同居させる（例：`components/contact/ContactForm/index.test.tsx`、`lib/env.test.ts`）。

- favicon／apple-iconは静的画像（全ページ共通のため動的生成は不要）。faviconは`.ico`を使う（複数サイズを1ファイルに内包でき、ブラウザが`/favicon.ico`を明示タグなしで自動リクエストする挙動に対応するため）
- OGP画像はブログ記事のみ動的生成（記事タイトルを画像に焼き込む）、それ以外の固定ページは静的画像
- Tailwind CSSを採用する（`postcss.config.mjs`に`@tailwindcss/postcss`を組み込む。`create-next-app`実行時にTailwindを選択する）
- Next.jsのバージョンによりファイル名規約が異なる場合があるため、実装時に`node_modules/next/dist/docs/`で確認する

## 命名規則

- **ページ・レイアウト**：`{役割}Page` / `{役割}Layout`と役割が分かる名前にする（例：`ContactPage`、`RootLayout`）。固定の`Page`だとエラー時のスタックトレースやDevToolsで判別できない
- **通常のコンポーネント**：接尾辞なしのシンプルな名前（例：`Article`、`Button`）。役割は接尾辞ではなくフォルダ構成で示す
- ファイル・フォルダ：コンポーネントは`PascalCase`、ロジック（`lib/`等）は`camelCase`
- 変数・関数：`camelCase`（真偽値は`is`/`has`/`should`prefix）、型は`PascalCase`（`I`接頭辞は付けない）、定数は`UPPER_SNAKE_CASE`

## TypeScript

- `tsconfig.json`の`strict: true`を維持する。`any`は使わない（不明な型は`unknown`＋型ガード）
- 外部（API・フォーム入力等）から来る値は、受け取った時点でzod等により型を検証する
- exportする関数は戻り値の型を明示し、Propsの型はコンポーネントと同ファイルに定義する

## コンポーネント設計

- デフォルトはServer Component。`"use client"`はブラウザAPIや状態管理（`useState`等）が必要な箇所のみに限定する
- 1ファイル1コンポーネント。150〜200行を超えて肥大化したら分割を検討する
- `app/**/page.tsx`はルーティングとデータ取得の起点に専念させ、UIロジックは`components/`に置く

## スタイリング（Tailwind CSS）

- ユーティリティクラスを`className`に直接記述する。コンポーネントごとの`*.css`ファイルは基本的に作らない
- 色・余白・フォント等のデザイントークンは`globals.css`の`@theme`ブロックに定義し、`bg-background`のように意味のあるクラス名で参照できるようにする（ハードコードした値をあちこちに散らさない）
- 独自のキーフレームアニメーションも`@theme`内の`--animate-*`と`@keyframes`で一度だけ定義し、`animate-fade-up`のようなクラスとして呼び出す
- 1つの要素でクラスが長くなりすぎる場合は、`clsx`等でクラス名の出し分けを整理する（CSS側に切り出すのではなく、あくまでクラスの組み立て方を整理する）

## import順序

1. Reactおよび外部ライブラリ（`react`、`next/*`、`zod`等）
2. 内部モジュール（`@/lib/*`、`@/components/*`等のエイリアスパス）
3. 相対パス（`./`、`../`）

グループ間は空行で区切る。ESLintの`import/order`ルールで機械的に強制することを推奨。Tailwindはクラス名を`className`に直接書く方式のため、コンポーネントごとのスタイルimportは発生しない（`globals.css`はルートレイアウトで一度だけimportする）。

## コメント方針

「何をしているか」はコードで表現しコメントは書かない。コメントを書くのは「なぜそうしているか」が非自明な場合のみ（隠れた制約、特定のバグへの対処、仕様上の理由等）。

## エラーハンドリング

外部API（Resend、microCMS、Turnstile等）を呼ぶ処理は、**成功・失敗の両方の分岐を明示的に書く**。例外が飛ばなかったことをもって成功と判断しない。

```ts
// 避ける：JSONとして読めるかだけをチェックし、response.okを見ていない
try {
  await response.json();
} catch (e) {
  return { status: "error" };
}
return { status: "success" };   // ← エラーレスポンスでも成功扱いになる

// 推奨：SDKが返すエラー情報を明示的に分岐する
const { data, error } = await resend.emails.send({ /* ... */ });
if (error) {
  return { status: "error", message: "送信に失敗しました" };
}
return { status: "success" };
```

送信処理は`sendContactEmail()`のような1つの関数にまとめ、その中で必ずエラーチェックする（呼び出し側でのチェック漏れを構造的に防ぐ）。

## 環境変数

`process.env.X`を直接書かず、必ず共通関数`requireEnv()`を経由する。一部のサービスだけ検証されている状態を避けるため、使う外部サービス全て（microCMS、Resend、Turnstile、Basic認証）に一律で適用する。

```ts
// lib/env.ts
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}
```

`.env.example`（値はダミー、キー名だけ記載）をリポジトリに置き、必要な環境変数の一覧を可視化する。サイトのベースURLも`NEXT_PUBLIC_SITE_URL`のような環境変数に切り出し、`localhost`等をmetadataBase・canonical・sitemap・OGPにハードコードしない。

## フォーム

フォームは**React Hook Form + zod**で実装する。バリデーションルールはzodスキーマとして1箇所に宣言し、`zodResolver`経由でクライアント側の即時バリデーションにも、Server Action側の最終チェックにも同じスキーマを使い回す。

```ts
const contactSchema = z.object({
  lastname: z.string().min(1, "姓を入力してください"),
  email: z.string().email("メールアドレスの形式が誤っています"),
  message: z.string().min(1, "メッセージを入力してください"),
});
```

if文を個別に書き並べない。メール欄は`type="email"`にし、送信中は`formState.isSubmitting`でボタンを無効化して二重送信を防止する。

## アクセシビリティ

開閉系UI（メニュー、モーダル、アコーディオン）には`aria-expanded`等の適切なARIA属性を付与する。各ページ実装後、LighthouseのAccessibilityスコアを確認する。

## Git運用・セットアップ

プロジェクト開始時に以下を最初期のセットアップ手順に組み込む。

1. `npm install --save-dev husky lint-staged prettier`
2. `npx husky init` でGitのpre-commitフック（`.husky/pre-commit`）を作成
3. `package.json`に`lint-staged`の設定を追加し、コミット対象ファイルに`eslint --fix`と`prettier --write`を実行するよう指定
4. `.husky/pre-commit`に`npx lint-staged`を記述

これで`git commit`のたびに自動でlint／formatが走り、エラーがあればコミットがブロックされる。

`package.json`のscriptsには`dev`/`build`/`start`/`lint`に加えて以下を用意する。

```json
{
  "typecheck": "tsc --noEmit",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

`packageManager`（Corepackでのパッケージマネージャ固定）・`engines`（対応Node.jsバージョン）フィールドも設定し、GitHub Dependabotを有効化して依存関係の更新PRを自動作成させる。

コミットメッセージは**Conventional Commits形式**（`feat:`/`fix:`/`chore:`/`test:`/`style:`/`refactor:`）を採用し、「何を」ではなく「なぜ」が伝わる粒度で書く（例：`fix: 送信ボタンの二重送信を防止`）。

### ブランチ運用（決定）

1人開発だが、`main`に直接コミットせず**機能・ページ単位でブランチを切ってPRを作り、セルフレビューしてからマージする**（提出先企業がリポジトリを見る可能性があるため、実務でよくあるPRベースの型を保つ）。

- ブランチ命名はコミットメッセージと同じ接頭辞で揃える：`feat/blog-page`、`fix/contact-form-validation`、`chore/setup-eslint`
- Vercelはブランチ・PRごとにプレビューデプロイを自動発行するため、`main`（本番）にマージする前に画面を確認できる。`main`は常にデプロイ可能な状態を保つ
- マージは**Squash merge**（作業ブランチ上は細かいコミットでよいが、`main`側の履歴は機能単位でまとめる）
- 余力があれば、GitHub ActionsでPR作成時に`lint`/`typecheck`/`test`を自動実行するCIを追加する（必須ではない）

## テスト

- **ユニットテスト**：Vitest。ロジック単体（`requireEnv()`、zodバリデーションスキーマ等）を対象にする
- **コンポーネントテスト**：Vitest + React Testing Library（jsdom環境）。UIコンポーネントの振る舞いを対象にする
- E2Eテストは今回は導入しない

優先して書く対象：

1. `requireEnv()` — 環境変数が未設定の場合に例外を投げるか
2. お問い合わせフォームのzodバリデーションスキーマ — 正常系・異常系の入力パターン
3. `ContactForm` — 不正入力時にエラーメッセージが表示されるか、送信中はボタンが無効化され二重送信できないか
4. ブログのカテゴリ絞り込みロジック（`searchParams`からmicroCMSのクエリを組み立てる純粋関数部分）
5. `Menu` — 開閉時に`aria-expanded`が正しく切り替わるか

```json
{
  "test": "vitest run",
  "test:watch": "vitest"
}
```

Huskyのpre-commitフックにテスト実行を含めるかは実行時間次第で判断する（重くなるようならpre-commitはlintのみにし、テストはpush前やCIに任せる）。

## 実装時の確認習慣

- ページを実装したら、必ずブラウザで実際にクリックして全リンクを踏む（本文中のリンク、フッター、ヘッダーのナビゲーション等）。型チェックは見た目・リンク切れのバグを検出できない
- PC・タブレット・モバイルの各幅で見た目を目視確認する（画像の縦横比が崩れていないか等）
- 各ページを実装し終えたら、仕様書と見比べて表示項目に漏れがないか確認する（特にリスト・カード表示は表示項目を絞りすぎたり多すぎたりしやすい）

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
