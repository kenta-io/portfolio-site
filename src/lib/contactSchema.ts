import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が誤っています"),
  message: z.string().min(1, "お問い合わせ内容を入力してください"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
