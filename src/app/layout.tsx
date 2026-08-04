import type { Metadata } from "next";
import { Oxanium, Mulish } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-oxanium" });
const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });

export const metadata: Metadata = {
  title: { default: "知念健太 Portfolio", template: "%s | 知念健太 Portfolio" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${oxanium.variable} ${mulish.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
