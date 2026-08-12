"use server";

import { ContactFormValues, contactSchema } from "@/lib/contactSchema";
import { requireEnv } from "@/lib/env";

export type SendContactResult =
  { status: "success" } | { status: "error"; message: string };

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: requireEnv("TURNSTILE_SECRET_KEY"),
        response: token,
      }),
    },
  );
  const data = await res.json();
  return data.success === true;
}

export async function sendContactEmail(
  values: ContactFormValues,
  turnstileToken: string,
): Promise<SendContactResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", message: "入力内容に誤りがあります。" };
  }

  const isHuman = await verifyTurnstileToken(turnstileToken);
  if (!isHuman) {
    return {
      status: "error",
      message: "確認に失敗しました。もう一度お試しください。",
    };
  }

  return { status: "success" };
}
