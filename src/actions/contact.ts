"use server";

import { ContactFormValues, contactSchema } from "@/lib/contactSchema";

export type SendContactResult =
  { status: "success" } | { status: "error"; message: string };

export async function sendContactEmail(
  values: ContactFormValues,
): Promise<SendContactResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", message: "入力内容に誤りがあります。" };
  }

  const isSendSuccessful = await simulateEmailSend(parsed.data);
  if (!isSendSuccessful) {
    return {
      status: "error",
      message: "送信に失敗しました。時間をおいて再度お試しください。",
    };
  }

  return { status: "success" };
}

async function simulateEmailSend(values: ContactFormValues): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return values.email.length > 0;
}
