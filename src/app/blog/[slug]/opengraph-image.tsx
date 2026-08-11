import { ImageResponse } from "next/og";

import { getBlogPost } from "@/lib/microcms";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  const title = post?.title ?? "知念健太 Portfolio";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#060a12",
        color: "#e8edf5",
      }}
    >
      <div
        style={{
          fontSize: 24,
          color: "#00c896",
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        知念健太 Portfolio — Blog
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          marginTop: 24,
          lineHeight: 1.3,
        }}
      >
        {title}
      </div>
    </div>,
    { ...size },
  );
}
