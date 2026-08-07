"use client";

import { ContactFormValues, contactSchema } from "@/lib/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => console.log(values))}
      noValidate
      className="flex flex-col gap-5 border border-border bg-card p-6 md:p-8"
    >
      <div>
        <label className="font-heading mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
          お名前 *
        </label>
        <input
          {...register("name")}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60"
          placeholder="知念 健太"
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="font-heading mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
          メールアドレス *
        </label>
        <input
          {...register("email")}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60"
          placeholder="email@example.com"
          type="email"
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="font-heading mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
          お問い合わせ内容 *
        </label>
        <textarea
          {...register("message")}
          rows={6}
          className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60"
          placeholder="はじめまして。フロントエンドエンジニアの募集についてお聞きしたく…"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
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
