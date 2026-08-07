export function ContactForm() {
  return (
    <form className="flex flex-col gap-5 border border-border bg-card p-6 md:p-8">
      <div>
        <label className="font-heading mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
          お名前 *
        </label>
        <input
          className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60"
          placeholder="知念 健太"
        />
      </div>
      <div>
        <label className="font-heading mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
          メールアドレス *
        </label>
        <input
          className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60"
          placeholder="email@example.com"
          type="email"
        />
      </div>
      <div>
        <label className="font-heading mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
          お問い合わせ内容 *
        </label>
        <textarea
          rows={6}
          className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60"
          placeholder="はじめまして。フロントエンドエンジニアの募集についてお聞きしたく…"
        />
      </div>
      <button
        type="submit"
        className="font-heading w-full bg-accent py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-opacity hover:opacity-85 md:py-4"
      >
        送信する
      </button>
    </form>
  );
}
