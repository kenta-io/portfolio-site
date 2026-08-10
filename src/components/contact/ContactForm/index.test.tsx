import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/contact/ContactForm";

vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: ({ onSuccess }: { onSuccess?: (token: string) => void }) => {
    onSuccess?.("test-turnstile-token");
    return null;
  },
}));

describe("ContactForm", () => {
  it("shows a validation error when submitting with a blank required field", async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "確認画面へ進む" }));

    expect(
      await screen.findByText("お名前を入力してください"),
    ).toBeInTheDocument();
  });

  it("shows a validation error for an invalid email format", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText("知念 健太"), {
      target: { value: "テスト太郎" },
    });
    fireEvent.change(screen.getByPlaceholderText("email@example.com"), {
      target: { value: "not-an-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: "確認画面へ進む" }));

    expect(
      await screen.findByText("メールアドレスの形式が誤っています"),
    ).toBeInTheDocument();
  });

  it("requires privacy policy consent before proceeding", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText("知念 健太"), {
      target: { value: "テスト太郎" },
    });
    fireEvent.change(screen.getByPlaceholderText("email@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/はじめまして/), {
      target: { value: "お問い合わせ内容です" },
    });
    fireEvent.click(screen.getByRole("button", { name: "確認画面へ進む" }));

    expect(
      await screen.findByText("プライバシーポリシーへの同意が必要です"),
    ).toBeInTheDocument();
  });
});
