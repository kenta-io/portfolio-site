import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "本サイトの個人情報の取り扱いについて説明しています。",
  alternates: { canonical: "/privacy-policy" },
};

const SECTIONS = [
  {
    number: "01",
    title: "アクセス解析ツールについて",
    paragraphs: [
      "当サイトでは、サイトの利用状況を把握しコンテンツ改善に役立てることを目的として、Google社が提供するアクセス解析ツール「Google Analytics」を利用しています。",
      "Google Analyticsは、Cookieを利用して情報を収集しますが、氏名・住所・メールアドレス・電話番号など、個人を特定する情報は含まれません。収集される情報には、閲覧ページ・滞在時間・デバイス情報等が含まれ、Google社のプライバシーポリシーに基づいて管理されます。",
      "この機能はブラウザでCookieを無効にすることで収集を拒否できます。また、Google社が提供する「Google アナリティクス オプトアウト アドオン」を利用することでも収集を停止できます。",
    ],
    link: {
      label: "Google社のプライバシーポリシー",
      href: "https://policies.google.com/privacy?hl=ja",
    },
  },
  {
    number: "02",
    title: "お問い合わせフォームについて",
    paragraphs: [
      "当サイトのお問い合わせフォームでは、お名前・フリガナ・会社名・電話番号・メールアドレス・お問い合わせ種別・お問い合わせ内容をご入力いただく仕様になっています（フリガナ・会社名・電話番号は任意項目です）。",
      "本サイトはポートフォリオであるため、送信フォームは実際にはメール等での送受信を行わないデモ動作です。ご入力いただいた内容が保存されたり、実際のお問い合わせ対応に使用されたりすることはありません。実際のご連絡はkkeenn.chinen@gmail.comまで直接お願いいたします。",
    ],
  },
  {
    number: "03",
    title: "プライバシーポリシーの変更について",
    paragraphs: [
      "本ポリシーの内容は、法令の改正や当サイトの運営状況等に応じて、予告なく変更する場合があります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を持つものとします。",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-border pt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:px-8 lg:py-16">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
          />

          <div className="font-heading mb-4 text-xs uppercase tracking-[0.32em] text-accent">
            Legal
          </div>
          <h1 className="font-heading mb-6 text-[36px] font-bold leading-[1.1] md:text-[48px]">
            プライバシーポリシー
          </h1>

          <p className="max-w-[640px] text-sm leading-[1.9] text-muted-foreground md:text-base">
            知念健太（以下「当サイト運営者」）は、本ウェブサイト（以下「当サイト」）における利用者の皆様の情報の取り扱いについて、以下の通りプライバシーポリシーを定めます。
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="space-y-12 md:space-y-16">
            {SECTIONS.map(({ number, title, paragraphs, link }) => (
              <div key={number}>
                <div className="font-heading mb-3 text-xs uppercase tracking-[0.32em] text-accent">
                  {number}
                </div>
                <h2 className="mb-4 text-xl font-bold md:mb-5 md:text-2xl">
                  {title}
                </h2>
                <div className="space-y-4">
                  {paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm leading-[1.9] text-muted-foreground md:text-base"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                {link && (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-accent underline transition-opacity hover:opacity-80"
                  >
                    {link.label} →
                  </a>
                )}
              </div>
            ))}

            <div className="border-t border-border pt-8">
              <p className="font-heading text-xs tracking-[0.15em] text-muted-foreground">
                制定日：2026年8月1日
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
