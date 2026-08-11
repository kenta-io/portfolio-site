import type { Metadata } from "next";
import { Oxanium, Mulish } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { requireEnv } from "@/lib/env";
import { GoogleTagManager } from "@next/third-parties/google";

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-oxanium" });
const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });

export const metadata: Metadata = {
  title: { default: "知念健太 Portfolio", template: "%s | 知念健太 Portfolio" },
  robots: { index: false, follow: false },
  metadataBase: new URL(requireEnv("NEXT_PUBLIC_SITE_URL")),
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${oxanium.variable} ${mulish.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId={requireEnv("GTM_CONTAINER_ID")} />
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
