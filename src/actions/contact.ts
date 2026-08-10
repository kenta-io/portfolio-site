"use server";

import { ContactFormValues, contactSchema } from "@/lib/contactSchema";
import { sendConfirmationEmail, sendNotificationEmail } from "@/lib/resend";

export type SendContactResult =
  { status: "success" } | { status: "error"; message: string };

export async function sendContactEmail(
  values: ContactFormValues,
): Promise<SendContactResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", message: "入力内容に誤りがあります。" };
  }

  const notifySucceeded = await sendNotificationEmail(parsed.data);
  if (!notifySucceeded) {
    return {
      status: "error",
      message: "送信に失敗しました。時間をおいて再度お試しください。",
    };
  }

  const confirmSucceeded = await sendConfirmationEmail(parsed.data);
  if (!confirmSucceeded) {
    return {
      status: "error",
      message: "送信に失敗しました。時間をおいて再度お試しください。",
    };
  }

  return { status: "success" };
}
