export default function PrivacyPolicyPage() {
  return (
    <section className="border-b border-border pt-16">
      <div className="mx-auto max-w-[840px] px-4 py-10 md:px-6 md:py-14 lg:px-8 lg:py-16">
        <div className="font-heading mb-3 text-xs tracking-[0.32em] text-accent uppercase">
          Legal
        </div>
        <h1 className="font-heading mb-8 text-3xl font-bold md:mb-10 md:text-4xl">
          プライバシーポリシー
        </h1>

        <p className="mb-12 text-sm leading-[1.9] text-muted-foreground md:text-base">
          知念健太（以下「当サイト運営者」）は、本ウェブサイト（以下「当サイト」）における利用者の皆様の情報の取り扱いについて、以下の通りプライバシーポリシーを定めます。
        </p>

        <div className="space-y-12">
          <div>
            <h2 className="font-heading mb-4 text-xl font-bold">
              アクセス解析ツールについて
            </h2>
            <div className="space-y-4 text-sm leading-[1.9] text-muted-foreground md:text-base">
              <p>
                当サイトでは、サイトの利用状況を把握しコンテンツ改善に役立てることを目的として、Google社が提供するアクセス解析ツール「Google
                Analytics」を利用しています。
              </p>
              <p>
                Google
                Analyticsは、Cookieを利用して情報を収集しますが、氏名・住所・メールアドレス・電話番号など、個人を特定する情報は含まれません。収集される情報には、閲覧ページ・滞在時間・デバイス情報等が含まれ、Google社のプライバシーポリシーに基づいて管理されます。
              </p>
              <p>
                この機能はブラウザでCookieを無効にすることで収集を拒否できます。また、Google社が提供する「Google
                アナリティクス オプトアウト
                アドオン」を利用することでも収集を停止できます。
              </p>
              <p>
                Google社のプライバシーポリシーについては、以下をご覧ください。
                <br />
                <a
                  href="https://policies.google.com/privacy?hl=ja"
                  className="text-accent underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://policies.google.com/privacy?hl=ja
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-heading mb-4 text-xl font-bold">
              お問い合わせフォームについて
            </h2>
            <div className="space-y-4 text-sm leading-[1.9] text-muted-foreground md:text-base">
              <p>
                当サイトのお問い合わせフォームでは、お問い合わせへの対応のために、お名前・フリガナ・会社名・電話番号・メールアドレス・お問い合わせ種別・お問い合わせ内容をご入力いただいております（フリガナ・会社名・電話番号は任意項目です）。
              </p>
              <p>
                ご入力いただいた個人情報は、お問い合わせへの対応という目的以外には利用せず、法令に基づく場合を除き、ご本人の同意なく第三者に提供することはありません。
              </p>
              <p>
                フォームの送受信には、メール配信サービス「Resend」を利用しています。
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-heading mb-4 text-xl font-bold">
              プライバシーポリシーの変更について
            </h2>
            <p className="text-sm leading-[1.9] text-muted-foreground md:text-base">
              本ポリシーの内容は、法令の改正や当サイトの運営状況等に応じて、予告なく変更する場合があります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を持つものとします。
            </p>
          </div>
        </div>

        <p className="mt-12 text-xs text-muted-foreground">
          制定日：2026年8月1日
        </p>
      </div>
    </section>
  );
}
