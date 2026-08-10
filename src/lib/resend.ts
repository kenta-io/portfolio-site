import { Resend } from "resend";

import { requireEnv } from "@/lib/env";
import type { ContactFormValues } from "@/lib/contactSchema";

let resend: Resend | undefined;

function getResendClient(): Resend {
  if (!resend) {
    resend = new Resend(requireEnv("RESEND_API_KEY"));
  }
  return resend;
}

export async function sendNotificationEmail(
  values: ContactFormValues,
): Promise<boolean> {
  const { error } = await getResendClient().emails.send({
    from: requireEnv("CONTACT_FROM_EMAIL"),
    to: requireEnv("CONTACT_NOTIFY_EMAIL"),
    subject: `【お問い合わせ】${values.name}様より`,
    text: `${values.message}\n\n連絡先: ${values.email}`,
  });
  return !error;
}

export async function sendConfirmationEmail(
  values: ContactFormValues,
): Promise<boolean> {
  const { error } = await getResendClient().emails.send({
    from: requireEnv("CONTACT_FROM_EMAIL"),
    to: values.email,
    subject: "お問い合わせを受け付けました",
    text: "お問い合わせいただきありがとうございます。内容を確認の上、担当よりご連絡いたします。",
  });
  return !error;
}
