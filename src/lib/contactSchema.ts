import { z } from "zod";

export const INQUIRY_TYPES = [
  { id: "job", label: "採用・求人" },
  { id: "project", label: "受託案件" },
  { id: "chat", label: "技術相談" },
  { id: "other", label: "その他" },
] as const;

export const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  furigana: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が誤っています"),
  inquiryType: z.enum(["job", "project", "chat", "other"]),
  message: z.string().min(1, "お問い合わせ内容を入力してください"),
  agreedToPolicy: z.boolean().refine((value) => value === true, {
    message: "プライバシーポリシーへの同意が必要です",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
