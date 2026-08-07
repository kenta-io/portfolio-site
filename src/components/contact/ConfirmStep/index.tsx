import { INQUIRY_TYPES, type ContactFormValues } from "@/lib/contactSchema";

type ConfirmStepProps = {
  values: ContactFormValues;
  isSubmitting: boolean;
  onBack: () => void;
  onConfirm: () => void;
};

export function ConfirmStep({
  values,
  isSubmitting,
  onBack,
  onConfirm,
}: ConfirmStepProps) {
  const inquiryLabel =
    INQUIRY_TYPES.find((type) => type.id === values.inquiryType)?.label ??
    values.inquiryType;

  const rows: Array<[string, string]> = [
    ["お問い合わせ種別", inquiryLabel],
    ["お名前", values.name],
    ["フリガナ", values.furigana || "（未入力）"],
    ["会社名 / 屋号", values.company || "（未入力）"],
    ["電話番号", values.phone || "（未入力）"],
    ["メールアドレス", values.email],
    ["お問い合わせ内容", values.message],
  ];

  return (
    <div className="flex flex-col gap-6 border border-border bg-card p-6 md:p-8">
      <div className="font-heading text-xs uppercase tracking-[0.2em] text-accent">
        入力内容の確認
      </div>

      <dl className="flex flex-col gap-4">
        {rows.map(([label, value]) => (
          <div key={label} className="border-b border-border pb-4">
            <dt className="font-heading mb-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {label}
            </dt>
            <dd className="text-sm whitespace-pre-wrap">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="font-heading flex-1 border border-border py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          修正する
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isSubmitting}
          className="font-heading flex-1 bg-accent py-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {isSubmitting ? "送信中..." : "送信する"}
        </button>
      </div>
    </div>
  );
}
