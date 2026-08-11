import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#060a12",
        color: "#e8edf5",
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 16 }}>
        知念健太
      </div>
      <div style={{ fontSize: 32, color: "#00c896" }}>
        Frontend Engineer Portfolio
      </div>
    </div>,
    { ...size },
  );
}
