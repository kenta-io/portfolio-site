type CompleteStepProps = {
  onReset: () => void;
};

export function CompleteStep({ onReset }: CompleteStepProps) {
  return (
    <div className="flex flex-col items-center gap-5 border border-accent/25 bg-card p-8 text-center md:p-12">
      <div className="flex h-14 w-14 items-center justify-center border border-accent/30 md:h-16 md:w-16">
        <span className="text-2xl text-accent">✓</span>
      </div>
      <div>
        <h3 className="font-heading mb-2 text-lg font-bold md:text-xl">
          送信完了しました
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          入力内容を確認しました。
          <br />
          <span className="text-red-400">
            ※本サイトはポートフォリオのため、実際のメール送信は行われません。
            <br />
            ご連絡は「
            <a
              href="mailto:kkeenn.chinen@gmail.com"
              className="text-accent hover:opacity-80"
            >
              kkeenn.chinen@gmail.com
            </a>
            」まで直接お願いいたします。
          </span>
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="font-heading mt-2 border border-accent px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/10"
      >
        新しいメッセージを送る
      </button>
    </div>
  );
}
