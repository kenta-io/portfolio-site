import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/contactSchema";

const VALID_INPUT = {
  name: "知念 健太",
  furigana: "",
  company: "",
  phone: "",
  email: "kenta@example.com",
  inquiryType: "job" as const,
  message: "お問い合わせ内容です。",
  agreedToPolicy: true,
};

describe("contactSchema", () => {
  it("accepts a fully valid submission", () => {
    expect(contactSchema.safeParse(VALID_INPUT).success).toBe(true);
  });

  it("rejects a missing name", () => {
    expect(contactSchema.safeParse({ ...VALID_INPUT, name: "" }).success).toBe(
      false,
    );
  });

  it("rejects an invalid email format", () => {
    expect(
      contactSchema.safeParse({ ...VALID_INPUT, email: "not-an-email" })
        .success,
    ).toBe(false);
  });

  it("rejects a missing message", () => {
    expect(
      contactSchema.safeParse({ ...VALID_INPUT, message: "" }).success,
    ).toBe(false);
  });

  it("rejects an unchecked privacy policy consent", () => {
    expect(
      contactSchema.safeParse({ ...VALID_INPUT, agreedToPolicy: false })
        .success,
    ).toBe(false);
  });

  it("rejects an invalid inquiry type", () => {
    expect(
      contactSchema.safeParse({ ...VALID_INPUT, inquiryType: "invalid" })
        .success,
    ).toBe(false);
  });
});
