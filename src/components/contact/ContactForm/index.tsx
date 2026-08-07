"use client";

import clsx from "clsx";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  ContactFormValues,
  contactSchema,
  INQUIRY_TYPES,
} from "@/lib/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { inquiryType: "job", agreedToPolicy: false },
  });

  const inquiryType = watch("inquiryType");
  const agreedToPolicy = watch("agreedToPolicy");

  const inputClassName =
    "w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60";

  return (
    <form
      onSubmit={handleSubmit((values) => console.log(values))}
      noValidate
      className="flex flex-col gap-5 border border-border bg-card p-6 md:p-8"
    >
      <div>
        <label className="font-heading mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
          お問い合わせ種別 *
        </label>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {INQUIRY_TYPES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setValue("inquiryType", id)}
              className={clsx(
                "border py-3 text-xs uppercase tracking-[0.1em] transition-all",
                inquiryType === id
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border text-muted-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Field label="お名前 *" error={errors.name?.message}>
        <input
          {...register("name")}
          placeholder="知念 健太"
          className={inputClassName}
        />
      </Field>

      <Field label="フリガナ" error={errors.furigana?.message}>
        <input
          {...register("furigana")}
          placeholder="チネン ケンタ"
          className={inputClassName}
        />
      </Field>

      <Field label="会社名 / 屋号（任意）" error={errors.company?.message}>
        <input
          {...register("company")}
          placeholder="株式会社Example"
          className={inputClassName}
        />
      </Field>

      <Field label="電話番号（任意）" error={errors.phone?.message}>
        <input
          {...register("phone")}
          placeholder="090-0000-0000"
          className={inputClassName}
        />
      </Field>

      <Field label="メールアドレス *" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          placeholder="email@example.com"
          className={inputClassName}
        />
      </Field>

      <Field label="お問い合わせ内容 *" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="はじめまして。フロントエンドエンジニアの募集についてお聞きしたく…"
          className={clsx(inputClassName, "resize-none")}
        />
      </Field>

      <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={agreedToPolicy}
          onChange={(e) => setValue("agreedToPolicy", e.target.checked)}
          className="mt-0.5"
        />
        <span>
          <Link href="/privacy-policy" className="text-accent hover:opacity-80">
            プライバシーポリシー
          </Link>
          に同意する *
        </span>
      </label>
      {errors.agreedToPolicy && (
        <p className="-mt-3 text-xs text-red-400">
          {errors.agreedToPolicy.message}
        </p>
      )}

      <button
        type="submit"
        className="font-heading w-full bg-accent py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-opacity hover:opacity-85 md:py-4"
      >
        送信する
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-heading mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
